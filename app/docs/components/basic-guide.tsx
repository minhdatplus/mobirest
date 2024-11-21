export function BasicGuide() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <h2>Getting Started with MobireST</h2>
      
      <h3>What is MobireST?</h3>
      <p>
        MobireST is a powerful yet easy-to-use tool for testing and documenting APIs. Whether you're a developer, tester, or product manager, MobireST helps you work with APIs without writing code.
      </p>

      <h3>Quick Start Guide</h3>
      <div className="steps-container space-y-6">
        <div className="step">
          <h4>Step 1: Making Your First API Call</h4>
          <ol>
            <li>
              <strong>Choose Your Method</strong>
              <p>Click the dropdown and select GET, POST, PUT, or DELETE</p>
              <div className="text-sm bg-muted p-2 rounded">
                💡 Tip: Start with GET requests as they're the safest to test with
              </div>
            </li>
            <li>
              <strong>Enter the URL</strong>
              <p>Type or paste your API endpoint URL (e.g., https://api.example.com/users)</p>
            </li>
            <li>
              <strong>Send Request</strong>
              <p>Click the "Send Request" button to see the response</p>
            </li>
          </ol>
        </div>

        <div className="step">
          <h4>Step 2: Understanding Responses</h4>
          <ul>
            <li>
              <strong>Status Code Colors</strong>
              <ul>
                <li>🟢 Green (200-299): Success</li>
                <li>🔵 Blue (300-399): Redirection</li>
                <li>🟡 Yellow (400-499): Client Error</li>
                <li>🔴 Red (500-599): Server Error</li>
              </ul>
            </li>
            <li>
              <strong>Response Time</strong>: Shows how fast the API responded
            </li>
            <li>
              <strong>Response Body</strong>: The actual data returned
            </li>
          </ul>
        </div>

        <div className="step">
          <h4>Step 3: Working with Headers</h4>
          <p>Headers are like special instructions for your API request:</p>
          <ul>
            <li>
              <strong>Common Headers</strong>:
              <ul>
                <li>Content-Type: application/json</li>
                <li>Authorization: Bearer your-token-here</li>
              </ul>
            </li>
            <li>
              <strong>Adding Headers</strong>: Click "Add Header" and fill in the key-value pairs
            </li>
          </ul>
        </div>

        <div className="step">
          <h4>Step 4: Sending Data (POST/PUT)</h4>
          <p>When you need to send data to an API:</p>
          <ul>
            <li>Select POST or PUT method</li>
            <li>Add your JSON data in the Request Body section</li>
            <li>Use the "Format JSON" button to check your formatting</li>
          </ul>
          <div className="text-sm bg-muted p-2 rounded">
            💡 Tip: Always test with sample data before using real data
          </div>
        </div>
      </div>

      <h3>Saving Your Work</h3>
      <div className="features-grid">
        <div className="feature">
          <h4>Collections</h4>
          <p>Group related requests together:</p>
          <ul>
            <li>Click "Save" after making a request</li>
            <li>Name your collection (e.g., "User API Tests")</li>
            <li>Access saved requests anytime</li>
          </ul>
        </div>

        <div className="feature">
          <h4>History</h4>
          <p>Automatically tracks your recent requests:</p>
          <ul>
            <li>View your last 6 requests</li>
            <li>Click to reload any previous request</li>
            <li>Clear history when needed</li>
          </ul>
        </div>
      </div>

      <h3>Common Use Cases</h3>
      <div className="use-cases">
        <div className="case">
          <h4>Testing an API Endpoint</h4>
          <ol>
            <li>Enter the endpoint URL</li>
            <li>Add any required headers</li>
            <li>Send request and check response</li>
            <li>Save successful requests for later</li>
          </ol>
        </div>

        <div className="case">
          <h4>Debugging Issues</h4>
          <ol>
            <li>Check status codes and error messages</li>
            <li>Verify request headers and body</li>
            <li>Compare with working examples</li>
            <li>Use history to track changes</li>
          </ol>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4>Next Steps</h4>
        <p>Once you're comfortable with the basics, explore:</p>
        <ul>
          <li>Advanced Features tab for more capabilities</li>
          <li>AI Features for automated documentation</li>
          <li>Customization options to fit your workflow</li>
        </ul>
      </div>
    </div>
  )
} 