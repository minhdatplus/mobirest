export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

import { Method, Header } from '@/lib/stores/classic-form-store'

const methodsWithBody: Method[] = ["POST", "PUT", "PATCH"]

export class RequestValidator {
  validateUrl(url: string): ValidationResult {
    const errors: string[] = []
    
    if (!url) {
      errors.push("URL is required")
      return { isValid: false, errors }
    }

    try {
      new URL(url)
    } catch {
      errors.push("Invalid URL format")
      return { isValid: false, errors }
    }

    return { isValid: true, errors }
  }

  validateHeaders(headers: Header[], method: Method): ValidationResult {
    const errors: string[] = []
    
    // Check for duplicate headers
    const headerKeys = headers.map(h => h.key.toLowerCase())
    const duplicates = headerKeys.filter((key, index) => 
      headerKeys.indexOf(key) !== index
    )
    
    if (duplicates.length > 0) {
      errors.push(`Duplicate headers found: ${duplicates.join(', ')}`)
    }

    // Validate required headers for methods with body
    if (methodsWithBody.includes(method)) {
      const hasContentType = headers.some(h => 
        h.key.toLowerCase() === 'content-type' && h.value
      )
      
      if (!hasContentType) {
        errors.push("Content-Type header is required for requests with body")
      }
    }

    return { isValid: errors.length === 0, errors }
  }

  validateBody(body: string, method: Method): ValidationResult {
    const errors: string[] = []
    
    if (!methodsWithBody.includes(method)) {
      return { isValid: true, errors }
    }

    if (!body.trim()) {
      errors.push("Request body is required")
      return { isValid: false, errors }
    }

    try {
      JSON.parse(body)
    } catch (e) {
      errors.push("Invalid JSON format in body")
      return { isValid: false, errors }
    }

    return { isValid: true, errors }
  }

  validateRequest(request: {
    url: string
    method: Method
    headers: Header[]
    body?: string
  }): ValidationResult {
    const errors: string[] = []
    
    const urlValidation = this.validateUrl(request.url)
    const headerValidation = this.validateHeaders(request.headers, request.method)
    const bodyValidation = this.validateBody(request.body || '', request.method)

    return {
      isValid: urlValidation.isValid && headerValidation.isValid && bodyValidation.isValid,
      errors: [
        ...urlValidation.errors,
        ...headerValidation.errors,
        ...bodyValidation.errors
      ]
    }
  }
} 