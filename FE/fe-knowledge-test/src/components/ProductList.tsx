import React, { useEffect } from 'react'
import ProductCard from './ProductCard'


interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }

const ProductList = () => {
    const [products, setProducts] = React.useState<Product[]>([]);

    const getProducts = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, [])

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">

        {
            products.map((product, index) => {
                
                return (
                    <ProductCard description={product.description} id={product.id} name={product.name} price={product.price} key={index} />
                )
            })
        }

    </div>
  )
}

export default ProductList