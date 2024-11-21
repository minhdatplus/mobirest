export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Command/Ctrl + / for help
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        showShortcutsDialog()
      }
      // Command/Ctrl + K for quick actions
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        showQuickActions()
      }
    }
    
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [])
} 