import { useEffect, useState } from "react"
import PageContainer from "../components/PageContainer/PageContainer"
import ProductForm from "../components/ProductForm/ProductForm"
import axios from "axios"
import { useNavigate } from "react-router"
import { Flip, toast } from "react-toastify"

const AddProduct = () => {
    const [newProduct, setNew] = useState({})
    const navigate = useNavigate()
    const inputs = [
        {
            name: "name",
            type: "text",
            label: "Product Name:",
            placeholder: "Enter Product Name"
        },
        {
            name: "price",
            type: "number",
            label: "Product Price:",
            placeholder: "Enter Product Price"
        },
        {
            name: "image",
            type: "file",
            label: "Upload Product Image",
        },
    ]
    useEffect(() => {
        if (newProduct.name) {
            axios.post("https://vica.website/api/items", newProduct, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                navigate("/products")
                toast.success('Product added successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: localStorage.getItem("mode") === "true" ? "dark" : "light",
                    transition: Flip,
                });
            }
            ).catch(err => console.log(err))
        }
    }, [newProduct])
    return (
        <PageContainer title="Create Product">
            <ProductForm
                inputs={inputs}
                btn="Create"
                setNew={setNew}
            />
        </PageContainer>
    )
}

export default AddProduct
