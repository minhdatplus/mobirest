export function useFormValidation() {
  return {
    validateField: (value: string, rules: ValidationRule[]) => {
      const results = rules.map(rule => rule.validate(value))
      return {
        isValid: results.every(r => r.valid),
        errors: results.filter(r => !r.valid).map(r => r.message)
      }
    },
    validateForm: (values: Record<string, any>) => {
      // Form-level validation logic
    }
  }
} 