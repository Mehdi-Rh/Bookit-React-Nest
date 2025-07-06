import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { apiFetch } from '@/data/api';
import { toast } from 'react-toastify';
import { redirect } from 'react-router';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const { json, response } = await apiFetch(`/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), password: password.trim() }),
    });

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      toast.error(json.error);
    } else if (response.ok) {
      // save the user to the local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the useCoontext
      dispatch({ type: 'LOGIN', payload: json });
      toast.success('Registered and logged in successfuly!');
      redirect('/login');
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
