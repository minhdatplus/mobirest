import { GeneratedDocumentation } from '@/lib/types/ai-documentation'

export function generateMarkdown(doc: GeneratedDocumentation): string {
  let markdown = `# ${doc.title || 'API Documentation'}\n\n`
  markdown += `${doc.description || ''}\n\n`
  
  if (!doc.endpoints || doc.endpoints.length === 0) {
    markdown += `No endpoints documented.\n`
    return markdown
  }

  doc.endpoints.forEach(endpoint => {
    if (!endpoint) return

    markdown += `## ${endpoint.method || 'UNKNOWN'} ${endpoint.endpoint || 'UNKNOWN'}\n\n`
    markdown += `${endpoint.description || 'No description available'}\n\n`

    if (endpoint.parameters?.length) {
      markdown += `### Parameters\n\n`
      markdown += `| Name | Type | Required | Description |\n`
      markdown += `|------|------|----------|-------------|\n`
      endpoint.parameters.forEach(param => {
        markdown += `| ${param.name} | ${param.type} | ${param.required ? 'Yes' : 'No'} | ${param.description} |\n`
      })
      markdown += `\n`
    }

    if (endpoint.requestBody) {
      markdown += `### Request Body\n\n`
      markdown += `\`\`\`json\n${JSON.stringify(endpoint.requestBody, null, 2)}\n\`\`\`\n\n`
    }

    if (endpoint.responses?.length) {
      markdown += `### Responses\n\n`
      endpoint.responses.forEach(response => {
        markdown += `#### ${response.statusCode}\n\n`
        markdown += `${response.description || 'No description'}\n\n`
        if (response.schema) {
          markdown += `\`\`\`json\n${JSON.stringify(response.schema, null, 2)}\n\`\`\`\n\n`
        }
      })
    }

    if (endpoint.examples?.length) {
      markdown += `### Examples\n\n`
      endpoint.examples.forEach((example, index) => {
        markdown += `#### Example ${index + 1}\n\n`
        if (example.request) {
          markdown += `Request:\n\`\`\`json\n${JSON.stringify(example.request, null, 2)}\n\`\`\`\n\n`
        }
        if (example.response) {
          markdown += `Response:\n\`\`\`json\n${JSON.stringify(example.response, null, 2)}\n\`\`\`\n\n`
        }
      })
    }
  })

  return markdown
}

export function generateOpenAPI(doc: GeneratedDocumentation): object {
  const paths: Record<string, any> = {}
  
  doc.endpoints.forEach(endpoint => {
    const path = endpoint.endpoint
    const method = endpoint.method.toLowerCase()
    
    if (!paths[path]) paths[path] = {}
    
    paths[path][method] = {
      summary: endpoint.description,
      parameters: endpoint.parameters?.map(param => ({
        name: param.name,
        in: 'query', // or 'path', 'header', etc.
        required: param.required,
        schema: {
          type: param.type
        },
        description: param.description
      })),
      requestBody: endpoint.requestBody && {
        content: {
          'application/json': {
            schema: endpoint.requestBody
          }
        }
      },
      responses: endpoint.responses.reduce((acc, response) => {
        acc[response.statusCode] = {
          description: response.description,
          content: {
            'application/json': {
              schema: response.schema
            }
          }
        }
        return acc
      }, {} as Record<string, any>)
    }
  })

  return {
    openapi: '3.0.0',
    info: {
      title: doc.title,
      description: doc.description,
      version: doc.version
    },
    paths
  }
} 