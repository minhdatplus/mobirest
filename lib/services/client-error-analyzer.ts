export class ClientErrorAnalyzer {
  analyzeError(error: any): ErrorAnalysis {
    // Phân tích lỗi dựa trên error object
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return {
        error: {
          type: 'network',
          code: 'NETWORK_ERROR',
          message: 'Failed to connect to server'
        },
        solutions: [
          {
            description: 'Check your internet connection',
            canAutoFix: false
          },
          {
            description: 'Verify the API endpoint URL is correct',
            canAutoFix: false
          },
          {
            description: 'Check if the server is accessible',
            canAutoFix: false
          }
        ]
      }
    }

    if (error.name === 'SyntaxError') {
      return {
        error: {
          type: 'validation',
          code: 'INVALID_JSON',
          message: 'Invalid JSON format in request body'
        },
        solutions: [
          {
            description: 'Format JSON data',
            canAutoFix: true,
            autoFix: () => {
              // Logic to format JSON
            }
          }
        ],
        commonPattern: true
      }
    }

    // Thêm các patterns lỗi khác...
    return {
      error: {
        type: 'unknown',
        code: 'UNKNOWN_ERROR',
        message: error.message
      },
      solutions: []
    }
  }
} 