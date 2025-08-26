import { describe, it, expect } from 'vitest';
import { convertOpenAPIToLangChainTools } from "../src/index.js"
import fs from 'fs'

describe('api2ai', () => {
  it('should convert', async () => {
    
    var fileContents = fs.readFileSync('../../apps/docs/openapi-docs.yml')

    const toolsFileContent = convertOpenAPIToLangChainTools(fileContents);
   fs.writeFileSync('./test/data/tools.js', toolsFileContent);
    
    // Verify document content
    expect(toolsFileContent).toBeDefined(); // Sample file contains Lorem ipsum text
  }, 40000);
});