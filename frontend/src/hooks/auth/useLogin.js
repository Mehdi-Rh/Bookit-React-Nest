import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { apiFetch } from '@/data/api';
import { toast } from 'react-toastify';
import { redirect } from 'react-router';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password, setLoading) => {
    setIsLoading(true);
    setError(null);

    const { json, response } = await apiFetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password: password.trim() }),
    });

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      toast.error('Incorrect credentials');
    } else if (response.ok) {
      // save the user to the local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the useCoontext
      dispatch({ type: 'LOGIN', payload: json });
      redirect('/');

      toast.success('Logged in successfully!');
      setIsLoading(false);
    }
    setLoading(false);
  };

  return { login, isLoading, error };
};
