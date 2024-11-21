'use client'

export function SettingsDocs() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <h2>Settings & Configuration</h2>

      <h3>AI Provider Settings</h3>
      <h4>API Keys Configuration</h4>
      <p>
        Configure your AI provider API keys in the settings:
      </p>
      <ul>
        <li>
          <strong>OpenAI API Key</strong> - For GPT-3.5/GPT-4 (format: sk-...)
        </li>
        <li>
          <strong>Google API Key</strong> - For Gemini Pro (format: AIzaSy...)
        </li>
        <li>
          <strong>Anthropic API Key</strong> - For Claude (format: sk-ant-...)
        </li>
        <li>
          <strong>Groq API Key</strong> - For Groq (format: gsk-...)
        </li>
      </ul>

      <h4>Provider Selection</h4>
      <p>
        Choose your default AI provider based on your needs:
      </p>
      <ul>
        <li>
          <strong>GPT-4</strong> - Best quality, higher cost
        </li>
        <li>
          <strong>GPT-3.5</strong> - Good balance of quality and cost
        </li>
        <li>
          <strong>Gemini Pro</strong> - Excellent performance, good pricing
        </li>
        <li>
          <strong>Claude</strong> - Strong technical understanding
        </li>
      </ul>

      <h3>Documentation Settings</h3>
      <h4>Generation Options</h4>
      <ul>
        <li>
          <strong>Temperature</strong> - Adjust AI creativity (0.0 - 1.0)
          <ul>
            <li>Lower (0.0-0.3): More precise, factual</li>
            <li>Medium (0.3-0.7): Balanced</li>
            <li>Higher (0.7-1.0): More creative</li>
          </ul>
        </li>
        <li>
          <strong>Max Tokens</strong> - Control response length
          <ul>
            <li>Minimum: 1000 tokens</li>
            <li>Recommended: 2000-4000 tokens</li>
            <li>Maximum: Based on provider</li>
          </ul>
        </li>
      </ul>

      <h4>Content Customization</h4>
      <ul>
        <li>
          <strong>Auto-generate</strong> - Enable automatic documentation
        </li>
        <li>
          <strong>Include Examples</strong> - Add request/response examples
        </li>
        <li>
          <strong>Example Count</strong> - Number of examples (1-5)
        </li>
        <li>
          <strong>Output Format</strong> - Markdown, OpenAPI, or both
        </li>
      </ul>

      <h3>Application Settings</h3>
      <h4>History Management</h4>
      <ul>
        <li>
          <strong>Save History</strong> - Enable/disable request history
        </li>
        <li>
          <strong>History Size</strong> - Maximum number of saved requests
        </li>
        <li>
          <strong>Auto-clear</strong> - Clear history periodically
        </li>
      </ul>

      <h4>Theme Settings</h4>
      <ul>
        <li>
          <strong>Theme Mode</strong> - Light, Dark, or System
        </li>
        <li>
          <strong>Color Scheme</strong> - UI color preferences
        </li>
        <li>
          <strong>Font Size</strong> - Adjust text display
        </li>
      </ul>
    </div>
  )
} 