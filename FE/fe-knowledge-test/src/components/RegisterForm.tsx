import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    if (!email || !name || !gender || !password || !confirmPassword) {
      setError("Semua kolom harus diisi");
      return;
    }

    if (password !== confirmPassword) {
      setError("Kata sandi dan konfirmasi kata sandi tidak cocok");
      return;
    }

    setError(""); // Reset error
    setLoading(true);

    // Kirim request ke API
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          gender,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registrasi berhasil:", data);
      } else {
        setError(data.message || "Terjadi kesalahan saat registrasi");
      }
    } catch (error) {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="text-center block py-8">Silahkan mengisi form berikut</span>
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
          label="Nama"
          placeholder="John Doe"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* input radio */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-4">Jenis Kelamin</label>
          <div className="flex items-center gap-8 w-full">
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                id="laki-laki"
                value="Laki-laki"
                className="mr-2 cursor-pointer"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Laki-laki"}
              />
              <label htmlFor="laki-laki" className="cursor-pointer">Laki-laki</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                id="perempuan"
                value="Perempuan"
                className="mr-2 cursor-pointer"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Perempuan"}
              />
              <label htmlFor="perempuan" className="cursor-pointer">Perempuan</label>
            </div>
          </div>
        </div>

        <Input
          label="Kata Sandi"
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Ulangi Kata Sandi"
          placeholder="********"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          text={loading ? "Mendaftar..." : "Daftar"}
          onClick={() => {}}
          variant="primary"
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
