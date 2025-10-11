import { useNavigate, useParams } from "react-router"
import PageContainer from "../components/PageContainer/PageContainer"
import ProductForm from "../components/ProductForm/ProductForm"
import { use, useEffect, useState } from "react"
import axios from "axios"
import { Flip, toast } from "react-toastify"

const EditProduct = () => {
    const [newProduct, setNew] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [item, setItem] = useState({})
    const param = useParams()
    useEffect(() => {
        axios.get(`https://vica.website/api/items/${param.id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setLoading(false)
            setItem(res.data)
        }).catch(err => console.log(err))
    }, [])
    useEffect(() => {
        if (!loading) {
            axios.post(`https://vica.website/api/items/${param.id}`, {
                name: newProduct.name ? newProduct.name : item.name,
                price: newProduct.price ? newProduct.price : item.price,
                image: newProduct.image ? newProduct.image : item.image,
                _method: "PUT"
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            }
            ).then(res => {
                navigate('/products')
                toast.success('Product updated successfully', {
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
            }).catch(err => console.log(err))
        }
    }, [newProduct])
    const inputs = [
        {
            name: "name",
            type: "text",
            label: "Product Name:",
            placeholder: "Enter Product Name",
            value: item.name
        },
        {
            name: "price",
            type: "number",
            label: "Product Price:",
            placeholder: "Enter Product Price",
            value: item.price
        },
        {
            name: "image",
            type: "file",
            label: "Upload Product Image",
            url: item.image_url
        },
    ]
    const date = item.updated_at && item.updated_at.split("T")[0]
    const time = item.updated_at && item.updated_at.split("T")[1].split(".")[0]

    return (
        <PageContainer >
            {loading ? (
                <p className="text-center text-xl font-semibold dark:text-white animation-loading ">Loading product details...</p>
            ) : (
                <ProductForm
                    btn="Update"
                    inputs={inputs}
                    setNew={setNew}
                    date={date}
                    time={time}
                />
            )}
        </PageContainer>
    )
}

export default EditProduct
