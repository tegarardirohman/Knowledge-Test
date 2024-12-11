"use client";

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [loginMode, setLoginMode] = useState(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="w-full h-screen bg-gray-200 text-black flex flex-col md:flex-row items-center justify-end gap-4 p-4">

      <div className="w-full h-full">
        <Image src="/undraw_winners_re_wr1l.svg" alt="auth" className="object-cover w-full h-full" width={1600} height={1600} />
      </div>

      <div className="w-full md:w-2/5 h-full bg-white py-12 px-8 md:px-20 rounded-3xl">
        <h1 className="text-2xl text-center font-semibold">
          {loginMode ? "Login" : "Register"}
        </h1>

        {loginMode ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}

        <div className="text-center py-8">
          {
            loginMode ? (
              <p className="text-sm">Belum punya akun? <span className="font-semibold cursor-pointer" onClick={() => setLoginMode(!loginMode)}>Daftar</span></p>
            ) : (
              <p className="text-sm">Sudah punya akun? <span className="font-semibold cursor-pointer" onClick={() => setLoginMode(!loginMode)}>Masuk</span></p>
            )
          }

        </div>


      </div>
    </div>
  );
};

export default page;
