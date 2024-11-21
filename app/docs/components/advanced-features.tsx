export function AdvancedFeatures() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <h2>Advanced Features</h2>

      <h3>Request Management</h3>
      <div className="space-y-4">
        <div>
          <h4>Environment Variables</h4>
          <p>
            Manage different environments (Development, Staging, Production):
          </p>
          <ul>
            <li>Create environment-specific variables</li>
            <li>Switch environments easily</li>
            <li>Share environments with team</li>
          </ul>
        </div>

        <div>
          <h4>Request Chaining</h4>
          <p>
            Use data from one request in another:
          </p>
          <ul>
            <li>Extract values from responses</li>
            <li>Dynamic variables in URLs</li>
            <li>Conditional request execution</li>
          </ul>
        </div>

        <div>
          <h4>Batch Operations</h4>
          <p>
            Work with multiple requests efficiently:
          </p>
          <ul>
            <li>Run multiple requests sequentially</li>
            <li>Compare responses</li>
            <li>Export results in bulk</li>
          </ul>
        </div>
      </div>

      <h3>Collection Features</h3>
      <div className="space-y-4">
        <div>
          <h4>Organization</h4>
          <ul>
            <li>Create folders and subfolders</li>
            <li>Tag and categorize requests</li>
            <li>Search and filter collections</li>
          </ul>
        </div>

        <div>
          <h4>Sharing & Collaboration</h4>
          <ul>
            <li>Export collections as JSON</li>
            <li>Import shared collections</li>
            <li>Version control integration</li>
          </ul>
        </div>
      </div>

      <h3>Response Handling</h3>
      <div className="space-y-4">
        <div>
          <h4>Response Visualization</h4>
          <ul>
            <li>JSON tree viewer</li>
            <li>Response formatting</li>
            <li>Syntax highlighting</li>
          </ul>
        </div>

        <div>
          <h4>Response Analysis</h4>
          <ul>
            <li>Response time tracking</li>
            <li>Size analysis</li>
            <li>Header inspection</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4>Pro Tips</h4>
        <ul>
          <li>Use keyboard shortcuts for faster navigation</li>
          <li>Set up request templates for common patterns</li>
          <li>Configure auto-save for request drafts</li>
          <li>Enable response caching for faster testing</li>
        </ul>
      </div>
    </div>
  )
} 