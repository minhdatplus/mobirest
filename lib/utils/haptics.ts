export const hapticFeedback = {
  light: () => navigator.vibrate?.(10),
  medium: () => navigator.vibrate?.(20),
  heavy: () => navigator.vibrate?.(30),
  error: () => navigator.vibrate?.([50, 100, 50]),
  success: () => navigator.vibrate?.([10, 50, 10])
} 