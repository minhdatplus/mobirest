'use client'

export function GettingStartedDocs() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <h2>Getting Started with MobireST</h2>
      
      <h3>Making Your First Request</h3>
      <p>
        MobireST makes it easy to test and document your APIs. Here's how to make your first request:
      </p>
      <ol>
        <li>
          <strong>Select HTTP Method</strong> - Choose from GET, POST, PUT, DELETE, or PATCH depending on your API endpoint.
        </li>
        <li>
          <strong>Enter URL</strong> - Input the full URL of your API endpoint (e.g., https://api.example.com/users).
        </li>
        <li>
          <strong>Add Headers</strong> - Click "Add Header" to include any necessary HTTP headers like Authorization or Content-Type.
        </li>
        <li>
          <strong>Add Request Body</strong> - For POST/PUT/PATCH requests, enter your JSON request body in the editor.
        </li>
        <li>
          <strong>Send Request</strong> - Click the "Send Request" button to execute your API call.
        </li>
      </ol>

      <h3>Understanding the Interface</h3>
      <h4>Request Section</h4>
      <ul>
        <li>
          <strong>Method Selector</strong> - Dropdown to choose HTTP method
        </li>
        <li>
          <strong>URL Input</strong> - Field for API endpoint URL
        </li>
        <li>
          <strong>Headers Editor</strong> - Add/remove request headers
        </li>
        <li>
          <strong>Body Editor</strong> - JSON editor for request body (POST/PUT/PATCH)
        </li>
      </ul>

      <h4>Response Section</h4>
      <ul>
        <li>
          <strong>Status Badge</strong> - Shows HTTP status code and text
        </li>
        <li>
          <strong>Response Time</strong> - Request execution duration
        </li>
        <li>
          <strong>Response Body</strong> - Formatted JSON response
        </li>
        <li>
          <strong>Documentation</strong> - AI-generated API documentation
        </li>
      </ul>

      <h3>Working with Collections</h3>
      <p>
        Collections help you organize and save your API requests for future use:
      </p>
      <ul>
        <li>
          <strong>Save Request</strong> - Click "Save" to add current request to a collection
        </li>
        <li>
          <strong>Organize</strong> - Group related requests in named collections
        </li>
        <li>
          <strong>Quick Access</strong> - Load saved requests with a single click
        </li>
        <li>
          <strong>Import/Export</strong> - Share collections with your team
        </li>
      </ul>

      <h3>Request History</h3>
      <p>
        MobireST automatically tracks your request history:
      </p>
      <ul>
        <li>
          <strong>Recent Requests</strong> - View your last 6 requests
        </li>
        <li>
          <strong>Quick Replay</strong> - Click any history item to reload it
        </li>
        <li>
          <strong>Status Tracking</strong> - Visual indicators for request success/failure
        </li>
      </ul>
    </div>
  )
} 