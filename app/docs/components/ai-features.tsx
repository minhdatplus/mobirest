'use client'

export function AIFeatures() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <h2>AI-Powered Features</h2>

      <h3>Documentation Generator</h3>
      <p>
        The AI Documentation Generator automatically creates comprehensive API documentation from your requests and responses.
      </p>

      <h4>How It Works</h4>
      <ol>
        <li>
          <strong>Analysis</strong> - AI analyzes your request/response data
        </li>
        <li>
          <strong>Generation</strong> - Creates structured documentation including:
          <ul>
            <li>Endpoint description</li>
            <li>Request/response schemas</li>
            <li>Parameter details</li>
            <li>Example usage</li>
          </ul>
        </li>
        <li>
          <strong>Format</strong> - Outputs in Markdown or OpenAPI format
        </li>
      </ol>

      <h4>Best Practices</h4>
      <ul>
        <li>
          <strong>Complete Requests</strong> - Include all relevant headers and parameters
        </li>
        <li>
          <strong>Sample Data</strong> - Use representative data in requests
        </li>
        <li>
          <strong>Error Cases</strong> - Test both success and error scenarios
        </li>
        <li>
          <strong>Consistent Naming</strong> - Use clear, consistent parameter names
        </li>
      </ul>

      <h3>AI Providers</h3>
      <h4>Available Providers</h4>
      <ul>
        <li>
          <strong>GPT-4</strong>
          <ul>
            <li>Most advanced understanding</li>
            <li>Best for complex APIs</li>
            <li>Higher token limit</li>
          </ul>
        </li>
        <li>
          <strong>GPT-3.5 Turbo</strong>
          <ul>
            <li>Fast and efficient</li>
            <li>Good for standard APIs</li>
            <li>Cost-effective</li>
          </ul>
        </li>
        <li>
          <strong>Gemini Pro</strong>
          <ul>
            <li>High performance</li>
            <li>Large context window</li>
            <li>Good multilingual support</li>
          </ul>
        </li>
      </ul>

      <h4>Configuration Options</h4>
      <ul>
        <li>
          <strong>Temperature</strong> - Controls creativity vs precision
        </li>
        <li>
          <strong>Max Tokens</strong> - Limits response length
        </li>
        <li>
          <strong>Examples</strong> - Number of examples to generate
        </li>
        <li>
          <strong>Output Format</strong> - Markdown/OpenAPI preferences
        </li>
      </ul>

      <h3>Advanced Features</h3>
      <h4>Auto-Documentation</h4>
      <p>
        Enable automatic documentation generation after each successful request:
      </p>
      <ul>
        <li>Saves time on repetitive tasks</li>
        <li>Maintains consistent documentation</li>
        <li>Configurable output formats</li>
      </ul>

      <h4>Response Analysis</h4>
      <p>
        AI analyzes API responses to provide insights:
      </p>
      <ul>
        <li>Data structure detection</li>
        <li>Type inference</li>
        <li>Relationship identification</li>
        <li>Pattern recognition</li>
      </ul>
    </div>
  )
} 