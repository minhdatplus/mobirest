export function Customization() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <h2>Customization & Settings</h2>

      <h3>Interface Customization</h3>
      <div className="space-y-4">
        <div>
          <h4>Theme Settings</h4>
          <ul>
            <li>
              <strong>Color Themes</strong>
              <ul>
                <li>Light Mode - Clean, bright interface</li>
                <li>Dark Mode - Reduced eye strain</li>
                <li>System Theme - Matches your OS</li>
              </ul>
            </li>
            <li>
              <strong>Layout Options</strong>
              <ul>
                <li>Adjustable panel sizes</li>
                <li>Collapsible sections</li>
                <li>Response view preferences</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h4>Editor Preferences</h4>
          <ul>
            <li>Font size and family</li>
            <li>Tab size and behavior</li>
            <li>Line numbers</li>
            <li>Word wrap settings</li>
          </ul>
        </div>
      </div>

      <h3>Behavior Settings</h3>
      <div className="space-y-4">
        <div>
          <h4>Request Settings</h4>
          <ul>
            <li>Default headers</li>
            <li>Timeout duration</li>
            <li>Follow redirects</li>
            <li>SSL verification</li>
          </ul>
        </div>

        <div>
          <h4>Response Handling</h4>
          <ul>
            <li>Auto-formatting preferences</li>
            <li>Maximum response size</li>
            <li>Preview mode settings</li>
          </ul>
        </div>
      </div>

      <h3>Storage & History</h3>
      <div className="space-y-4">
        <div>
          <h4>History Management</h4>
          <ul>
            <li>History retention period</li>
            <li>Auto-clear options</li>
            <li>Export formats</li>
          </ul>
        </div>

        <div>
          <h4>Cache Settings</h4>
          <ul>
            <li>Cache duration</li>
            <li>Storage limits</li>
            <li>Clear cache options</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4>Keyboard Shortcuts</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">General</p>
            <ul className="text-sm">
              <li><kbd>Ctrl</kbd> + <kbd>Enter</kbd> - Send Request</li>
              <li><kbd>Ctrl</kbd> + <kbd>S</kbd> - Save Request</li>
              <li><kbd>Ctrl</kbd> + <kbd>N</kbd> - New Request</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Editor</p>
            <ul className="text-sm">
              <li><kbd>Ctrl</kbd> + <kbd>Space</kbd> - Auto Complete</li>
              <li><kbd>Ctrl</kbd> + <kbd>F</kbd> - Find</li>
              <li><kbd>Ctrl</kbd> + <kbd>/</kbd> - Toggle Comment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 