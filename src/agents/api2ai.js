import * as yaml from 'js-yaml';
/**
 * ### API2AI
 * <img width="350px"  src="https://i.imgur.com/AvFLGdR.png" />
 * 
 * Translates any website's OpenAPI.yml file to LLM agent tool
 * LangChain.js function format
 * 
 * [List of public apis](https://github.com/public-apis/public-apis)
 * [publicapis](https://publicapis.dev/category/business)
 *
 * @param {string} fileContents - OpenAPI YAML file contents
 * @returns {Array} Array of tool use function objects
 * @category Generate
 * @example
 *  const fileContents = fs.readFileSync(yamlPath, 'utf8');
 * const tools = convertOpenAPIToAgentTools(fileContents);
 * 
 * 
 */
export function convertOpenAPIToAgentTools(fileContents) {
    // Read the YAML file
    const openAPISpec = yaml.load(fileContents);

    // Array to store translated tools
    const translatedTools = [];

    // Function to convert parameter schema to tool parameter schema
    function convertParameterSchema(parameter) {
        const schema = parameter.schema || {};
        return {
            type: schema.type || 'string',
            description: parameter.description || '',
            ...(schema.enum ? { enum: schema.enum } : {}),
            ...(schema.default !== undefined ? { default: schema.default } : {})
        };
    }

    // Iterate through paths
    Object.entries(openAPISpec.paths || {}).forEach(([path, pathItem]) => {
        Object.entries(pathItem).forEach(([method, operation]) => {
            // Create a tool function for each operation
            const toolFunctionSchema = {
                type: "function",
                function: {
                    name: operation.operationId || 
                          `${method.toUpperCase()}_${path.replace(/[\/{}]/g, '_').replace(/^_/, '')}`,
                    description: operation.summary || operation.description || "",
                    parameters: {
                        type: "object",
                        properties: {},
                        required: []
                    }
                }
            };

            // Process parameters
            if (operation.parameters) {
                operation.parameters.forEach(parameter => {
                    const paramName = parameter.name;
                    toolFunctionSchema.function.parameters.properties[paramName] = 
                        convertParameterSchema(parameter);
                    
                    // Mark as required if needed
                    if (parameter.required) {
                        toolFunctionSchema.function.parameters.required.push(paramName);
                    }
                });
            }

            // Process request body if exists
            if (operation.requestBody) {
                const contentType = Object.keys(operation.requestBody.content)[0];
                const bodySchema = operation.requestBody.content[contentType].schema;

                if (bodySchema.properties) {
                    Object.entries(bodySchema.properties).forEach(([propName, propSchema]) => {
                        toolFunctionSchema.function.parameters.properties[propName] = {
                            type: propSchema.type || 'string',
                            description: propSchema.description || ''
                        };

                        // Add to required if in required array
                        if (bodySchema.required && bodySchema.required.includes(propName)) {
                            toolFunctionSchema.function.parameters.required.push(propName);
                        }
                    });
                }
            }

            translatedTools.push(toolFunctionSchema);
        });
    });

    // Also process any schemas in components
    if (openAPISpec.components && openAPISpec.components.schemas) {
        Object.entries(openAPISpec.components.schemas).forEach(([schemaName, schemaDefinition]) => {
            const toolFunctionSchema = {
                type: "function",
                function: {
                    name: schemaName,
                    description: schemaDefinition.description || "",
                    parameters: {
                        type: "object",
                        properties: {},
                        required: []
                    }
                }
            };

            // Handle schema properties
            if (schemaDefinition.properties) {
                Object.entries(schemaDefinition.properties).forEach(([propName, propDetails]) => {
                    toolFunctionSchema.function.parameters.properties[propName] = {
                        type: propDetails.type || 'string',
                        description: propDetails.description || ''
                    };

                    // Add to required if marked as required
                    if (schemaDefinition.required && schemaDefinition.required.includes(propName)) {
                        toolFunctionSchema.function.parameters.required.push(propName);
                    }
                });
            }

            translatedTools.push(toolFunctionSchema);
        });
    }

    return translatedTools;
}

