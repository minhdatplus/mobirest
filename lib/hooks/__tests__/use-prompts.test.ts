import { renderHook, act } from '@testing-library/react';
import { usePrompts } from '../use-prompts';
import { db } from '@/lib/db';

describe('usePrompts', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  it('should load prompts', async () => {
    const { result } = renderHook(() => usePrompts());
    expect(result.current.isLoading).toBe(true);
    // ... more tests
  });
}); 