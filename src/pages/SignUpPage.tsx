import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../api/auth';
import { useNavigate } from '@tanstack/react-router';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../hooks/AuthContext';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setAuth(data.data.access_token, email);
      navigate({ to: '/' });
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Registration failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        className="block w-full p-2 mb-2 border"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="block w-full p-2 mb-2 border"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Signing up...' : 'Register'}
      </button>

      {mutation.isError && (
        <ErrorMessage
          message={
            mutation.error?.response?.data?.message || 'Something went wrong'
          }
        />
      )}
    </form>
  );
};

export default SignupPage;
