// src/hooks/auth/useFormStatus.ts
import { useState } from 'react';

export function useFormStatus() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  return { error, setError, loading, setLoading };
}
