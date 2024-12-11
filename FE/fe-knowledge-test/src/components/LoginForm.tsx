import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { setCookie } from 'nookies';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email dan kata sandi harus diisi');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Email atau kata sandi salah');
      }

      const data = await response.json();

      if (rememberMe) {
        setCookie(null, 'authToken', data.access_token, { maxAge: 24 * 60 * 60, path: '/' });
      } else {
        setCookie(null, 'authToken', data.access_token, { path: '/' });
      }

      window.location.href = '/';

    } catch (error: any) {
      setError(error.message || 'Terjadi kesalahan saat login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="text-center block py-8">Masukkan email dan kata sandi</span>
      <div className="flex flex-col gap-4 h-full">
        <Input
          label="Email"
          placeholder="tegarardirohman@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Kata Sandi"
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="w-full flex gap-3 mb-5">
          <input
            aria-label="ingat saya"
            type="checkbox"
            name="ingat saya"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember" className="cursor-pointer">
            Ingat saya
          </label>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button onClick={() => {}} text="Masuk" variant="primary" type="submit" />
      </div>
    </form>
  );
};

export default LoginForm;
