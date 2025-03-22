// src/hooks/auth/useAgreement.ts
import { useState } from 'react';

export function useAgreement() {
  const [agreed, setAgreed] = useState(false);
  const toggleAgreement = () => setAgreed((prev) => !prev);
  return { agreed, toggleAgreement };
}
