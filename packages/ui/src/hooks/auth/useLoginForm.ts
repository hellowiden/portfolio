// src/hooks/auth/useLoginForm.ts
import { useState } from 'react';

export function useLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return { formData, handleChange };
}
