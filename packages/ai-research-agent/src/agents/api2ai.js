import * as yaml from 'js-yaml';
import { z } from 'zod';

/**
 * ### API2AI 
 * 
 * Translates any website's OpenAPI.yml file to LLM agent tool
 * format with Zod schemas for validation, and returns the content
 * of a tools.js file that exports these tools
 * 
 * [List of public apis](https://github.com/public-apis/public-apis)
 * [public apis](https://publicapis.dev/category/business)
 *
 * @param {string} fileContents - OpenAPI YAML file contents
 * @returns {string} Content of tools.js file with exported tools
 * @category Generate
 * @example
 * const fileContents = fs.readFileSync(yamlPath, 'utf8');
 * const toolsFileContent = convertOpenAPIToAgentTools(fileContents);
 * fs.writeFileSync('tools.js', toolsFileContent);
 */
export function convertOpenAPIToLangChainTools(fileContents) {
    const openAPISpec = yaml.load(fileContents);
    const tools = [];

    function convertToZodSchema(schema, isRequired = false) {
        if (!schema) return 'z.string()';

        let zod = '';
        switch (schema.type) {
            case 'string':
                if (schema.enum) {
                    zod = `z.enum([${schema.enum.map(v => '"' + v + '"').join(', ')}])`;
                } else if (schema.format === 'email') {
                    zod = 'z.string().email()';
                } else if (schema.format === 'uri') {
                    zod = 'z.string().url()';
                } else if (schema.format === 'date') {
                    zod = 'z.string().datetime()';
                } else {
                    zod = 'z.string()';
                    if (schema.minLength) zod += `.min(${schema.minLength})`;
                    if (schema.maxLength) zod += `.max(${schema.maxLength})`;
                    if (schema.pattern) zod += `.regex(/${schema.pattern}/)`;
                }
                break;
            case 'number':
            case 'integer':
                zod = schema.type === 'integer' ? 'z.number().int()' : 'z.number()';
                if (schema.minimum !== undefined) zod += `.min(${schema.minimum})`;
                if (schema.maximum !== undefined) zod += `.max(${schema.maximum})`;
                break;
            case 'boolean':
                zod = 'z.boolean()';
                break;
            case 'array':
                zod = `z.array(${convertToZodSchema(schema.items, false)})`;
                if (schema.minItems) zod += `.min(${schema.minItems})`;
                if (schema.maxItems) zod += `.max(${schema.maxItems})`;
                break;
            case 'object':
                if (schema.properties) {
                    const props = Object.entries(schema.properties).map(([key, prop]) => {
                        const req = schema.required?.includes(key);
                        const propSchema = convertToZodSchema(prop, req);
                        return `    ${key}: ${req ? propSchema : `${propSchema}.optional()`}`;
                    }).join(',\n');
                    zod = `z.object({\n${props}\n  })`;
                } else {
                    zod = 'z.object({})';
                }
                break;
            default:
                zod = 'z.string()';
        }

        if (schema.default !== undefined) {
            const def = typeof schema.default === 'string' ? `"${schema.default}"` : schema.default;
            zod += `.default(${def})`;
        }

        if (!isRequired && !zod.includes('.optional()') && !zod.includes('.default(')) {
            zod += '.optional()';
        }

        return zod;
    }

    function generateTool(name, desc, schema, pathInfo, op) {
        const baseUrl = openAPISpec.servers?.[0]?.url || 'https://api.example.com';
        const { method, path } = pathInfo;
        
        const pathParams = [];
        const queryParams = [];
        const headerParams = [];
        const bodyProps = [];

        if (op.parameters) {
            op.parameters.forEach(p => {
                if (p.in === 'path') pathParams.push(p.name);
                else if (p.in === 'query') queryParams.push(p.name);
                else if (p.in === 'header') headerParams.push(p.name);
            });
        }

        if (op.requestBody) {
            const contentType = Object.keys(op.requestBody.content)[0];
            const bodySchema = op.requestBody.content[contentType]?.schema;
            if (bodySchema?.properties) {
                bodyProps.push(...Object.keys(bodySchema.properties));
            }
        }

        const func = `async (params) => {
    const baseUrl = "${baseUrl}";
    let url = "${path}";
    
    ${pathParams.map(p => `url = url.replace('{${p}}', encodeURIComponent(params.${p}));`).join('\n    ')}
    
    const queryParams = new URLSearchParams();
    ${queryParams.map(p => `if (params.${p} !== undefined) queryParams.set('${p}', params.${p});`).join('\n    ')}
    const headers = {
      'Content-Type': 'application/json',
      ${headerParams.map(p => `'${p}': params.${p},`).join('\n      ')}
    };
    ${bodyProps.length ? `const bodyData = {};
    ${bodyProps.map(p => `if (params.${p} !== undefined) bodyData.${p} = params.${p};`).join('\n    ')}
    if (Object.keys(bodyData).length > 0) {
      opts.body = JSON.stringify(bodyData);
    }` : ''}
    
    const fullUrl = baseUrl + url + (queryParams.toString() ? '?' + queryParams.toString() : '');
    
    try {
      const response = await fetch(fullUrl, {
      method: '${method.toUpperCase()}',
      headers,
    });
      
      if (!response.ok) 
        throw new Error(\`HTTP error! status: \${response.status}, statusText: \${response.statusText}\`);
      
      const contentType = response.headers.get('content-type');
      return contentType?.includes('application/json') 
        ? await response.json() 
        : await response.text();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }`;

        return { name, description: desc, schema, func };
    }

    Object.entries(openAPISpec.paths || {}).forEach(([path, pathItem]) => {
        Object.entries(pathItem).forEach(([method, op]) => {
            if (['get', 'post', 'put', 'patch', 'delete'].includes(method.toLowerCase())) {
                const name = op.operationId || 
                      `${method.toLowerCase()}_${path.replace(/[\/{}]/g, '_').replace(/^_+|_+$/g, '')}`;

                const desc = op.summary || op.description || `${method.toUpperCase()} ${path}`;

                const allProps = {};
                const required = [];

                if (op.parameters) {
                    op.parameters.forEach(p => {
                        allProps[p.name] = p.schema || { type: 'string' };
                        if (p.required) required.push(p.name);
                    });
                }

                if (op.requestBody) {
                    const contentType = Object.keys(op.requestBody.content)[0];
                    const bodySchema = op.requestBody.content[contentType]?.schema;

                    if (bodySchema?.properties) {
                        Object.entries(bodySchema.properties).forEach(([propName, propSchema]) => {
                            allProps[propName] = propSchema;
                            if (bodySchema.required?.includes(propName)) {
                                required.push(propName);
                            }
                        });
                    }
                }

                let schema;
                if (Object.keys(allProps).length === 0) {
                    schema = 'z.object({})';
                } else {
                    const props = Object.entries(allProps).map(([key, prop]) => {
                        const isReq = required.includes(key);
                        const propSchema = convertToZodSchema(prop, isReq);
                        return `    ${key}: ${propSchema}`;
                    }).join(',\n');
                    schema = `z.object({\n${props}\n  })`;
                }

                const tool = generateTool(name, desc, schema, { method, path }, op);
                tools.push(tool);
            }
        });
    });

    const apiTitle = openAPISpec.info?.title || 'API';
    const apiVersion = openAPISpec.info?.version || '1.0.0';
    const apiDesc = openAPISpec.info?.description || 'Generated API tools';

    return `/**Generated API Tools from ${apiTitle} v${apiVersion}
${apiDesc} */

import { z } from 'zod';
import { tool } from "@langchain/core/tools";

${tools.map(t => `
export const ${t.name} = tool(
${t.func},
{
  name: "${t.name}",
  description: "${t.description.replace(/"/g, '\\"')}",
  schema: ${t.schema}
});`).join('')}

export const tools = [${tools.map(t => t.name).join(', ')}];

export const toolsMap = {
${tools.map(t => `  "${t.name}": ${t.name}`).join(',\n')}
};
`;
}