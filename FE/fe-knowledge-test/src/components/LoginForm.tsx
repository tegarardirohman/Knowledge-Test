import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'

const LoginForm = () => {
  // State untuk menyimpan nilai input form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false) 
  const [error, setError] = useState('') 

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() 


    // Validasi input
    if (!email || !password) {
      setError('Email dan kata sandi harus diisi')
      return
    }

    // Kirim data ke API untuk login
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      })

      if (!response.ok) {
        throw new Error('Email atau kata sandi salah')
      }

      const data = await response.json()
      console.log('Login berhasil', data)

      // Simpan token atau redirect jika berhasil
      // Misalnya, simpan token di localStorage atau sesi
      localStorage.setItem('authToken', data.token)
      // Redirect ke halaman lain setelah login sukses
      window.location.href = '/dashboard'
    } catch (error) {
      setError("Email atau kata sandi salah");
    }
  }

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
            onChange={() => setRememberMe(!rememberMe)} // Toggle nilai rememberMe
          />
          <label htmlFor="remember" className="cursor-pointer">
            Ingat saya
          </label>
        </div>

        {/* Tampilkan pesan error jika ada */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button
          text="Masuk"
          variant="primary"
          type="submit"
          onClick={() => {}}
        />
      </div>
    </form>
  )
}

export default LoginForm
