"use client";

import LogoutButton from "@/components/LogoutButton";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-200 text-black gap-8 p-4 flex flex-col md:flex-row justify-between overflow-hidden">

      <div className="md:w-1/3 h-full relative">
        <ProductForm />
      </div>

        <div className="w-full">
          <ProductList />
        </div>


        <LogoutButton />
    </div>
  );
}
