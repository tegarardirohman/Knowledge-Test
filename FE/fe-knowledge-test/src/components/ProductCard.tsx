import Image from 'next/image'
import React from 'react'
import Button from './Button'

import { useDispatch } from 'react-redux'
import { setSelectedItem } from '@/redux/productSlice'
import ModalDetailProduct from './ModalDetailProduct'
import ModalDeleteProduct from './ModalDeleteProduct'
import { getCookie } from '@/app/utils/cookieUtil'

interface ProductCardProps {
    id: number,
    name: string,
    price: number,
    description: string
}

const ProductCard : React.FC<ProductCardProps> = ({id, name, price, description}) => {

    const dispatch = useDispatch()


    const [modalDelete, setModalDelete] = React.useState(false);
    const [modalDetail, setModalDetail] = React.useState(false);

    const deleteProduct = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getCookie("authToken")}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            alert("Produk berhasil dihapus");
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            alert("Produk gagal dihapus");
        })
    }


    const handleUpdate = () => {
        dispatch(setSelectedItem({
            id,
            name,
            price,
            description
        })) // store selected item in redux
    }

    const handleDelete = () => {
        setModalDetail(false);
        setModalDelete(true);
    }

    const handleModalDetail = () => {
        setModalDetail(true);
        setModalDelete(false);
    }


  return (

    <>
    <ModalDetailProduct isOpen={modalDetail} onClose={() => setModalDetail(false)} product={{name, price, description}} />
    <ModalDeleteProduct isOpen={modalDelete} onClose={() => setModalDelete(false)} onDelete={deleteProduct} product={{id, name, price, description}} />
    
    <div className='border rounded-md p-4 bg-white w-full'>
        <div className="w-full aspect-square bg-gray-300">
            <Image src={"/alpukat.jpg"} alt="product" width={500} height={500} />
        </div>

        <h3 className='font-semibold py-2'>{name}</h3>
        <p className='font-semibold text-sm'>Rp. {price}</p>

        <div className="w-full flex justify-between gap-2 pt-4">
            <Button onClick={handleDelete} text="Delete" variant="danger" />
            <Button onClick={handleUpdate} text="Update" variant="secondary" />
            <Button onClick={handleModalDetail} text="Detail" />
        </div>
        
    </div>
    
    </>
  )
}

export default ProductCard