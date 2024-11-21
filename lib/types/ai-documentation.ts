interface APIEndpointDoc {
  endpoint: string
  method: string
  description: string
  parameters?: {
    name: string
    type: string
    required: boolean
    description: string
  }[]
  requestBody?: {
    type: string
    properties: Record<string, {
      type: string
      description: string
      example: any
    }>
  }
  responses: {
    statusCode: number
    description: string
    schema: {
      type: string
      properties: Record<string, {
        type: string
        description: string
        example: any
      }>
    }
  }[]
  examples: {
    request: {
      headers?: Record<string, string>
      body?: any
    }
    response: {
      status: number
      body: any
    }
  }[]
}

interface GeneratedDocumentation {
  title: string
  description: string
  version: string
  endpoints: APIEndpointDoc[]
}

export type { APIEndpointDoc, GeneratedDocumentation } 