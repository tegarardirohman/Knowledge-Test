import React, { useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { getCookie } from "@/app/utils/cookieUtil";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetSelectedItem } from "@/redux/productSlice";

const ProductForm = () => {

    const [productId, setProductId] = React.useState(0);
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [mode, setMode] = React.useState("create");


    const dispatch = useDispatch();
    const selectedItem = useSelector((state: any) => state.product.selectedItem);

    useEffect(() => {
        if (selectedItem) {
            setProductId(selectedItem.id);
            setName(selectedItem.name);
            setPrice(selectedItem.price);
            setDescription(selectedItem.description);
            setMode("update");
        } else {
            setProductId(0);
            setName("");
            setPrice(0);
            setDescription("");
            setMode("create");
        }
    }, [selectedItem]);


    const addProduct = async () => {

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getCookie("authToken")}`,
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    description: description,
                }),
            });


            if(response.ok) {
                alert("Produk ditambahkan");
                window.location.reload();
            } else {
                alert("Gagal menambahkan produk");
            }

        } catch (error) {
            console.log(error);
            alert("Gagal menambahkan produk");
        }
    }

    const updateProduct = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getCookie("authToken")}`,
                },
                body: JSON.stringify({
                    id: productId,
                    name: name,
                    price: price,
                    description: description,
                }),
            });


            if(response.ok) {
                alert("Produk diupdate");
                window.location.reload();
            } else {
                alert("Gagal memperbarui produk");
            }

        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit ditekn");

        // validate
        if (!name || !price || !description) {
            alert("Semua kolom harus diisi");
            return;
        }

        if (mode === "create") {
            addProduct();
        } else {
            updateProduct();
        }
    };

    const handleReset = () => {
        dispatch(resetSelectedItem());
    }



  return (
    <div className="w-full bg-white rounded-lg py-12 px-12 sticky top-0">
      <h1 className="text-2xl text-center font-semibold"> {mode === "create" ? "Add New Product" : `Update Product id-${productId}` }</h1>

      {/* form */}
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          label="Name"
          type="text"
        />
        <Input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Product price"
          label="price"
          type="number"
        />

        <div className="w-full">
          <label htmlFor="#desc">Deskripsi</label>
          <textarea
            id="#desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div className="w-full flex justify-between gap-8">
          <Button text="reset" variant="secondary" onClick={handleReset} />
          <Button text={mode === "create" ? "Add" : "Update"} type="submit" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
