import axios from "axios"
import { useState } from "react"
import { IoTrashOutline } from "react-icons/io5"
import { Link } from "react-router"
import { Flip, toast, ToastContainer } from "react-toastify"

const Card = ({ item, setDeleted }) => {
    //delete confirm screen state
    const [confirm, setConfirm] = useState(false)
    const deleteItem = (id) => {
        axios.delete(`https://vica.website/api/items/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json"
            }
        })
            .then(res => {
                setConfirm(!confirm)
                setDeleted(id)
                toast.success('Product deleted successfully', {
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
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className={`bg-[#2a2a2aaa] fixed w-full h-full left-0 top-0 z-50 ${confirm ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity duration-300`}>
                <div className="w-[350px] h-[180px] bg-white dark:bg-[#273144] dark:text-white m-auto rounded-bl-xl rounded-br-xl p-10 flex flex-col justify-center items-center">
                    <p className="text-center text-xl mb-8 font-medium">Are you sure you want to delete this product?</p>
                    <div className="flex justify-between w-[200px]">
                        <button onClick={() => setConfirm(!confirm)} className="bg-[#e2eaf8]  dark:bg-[#4c566a] px-6 py-1.5 rounded-lg cursor-pointer font-medium">No</button>
                        <button onClick={() => deleteItem(item.id)} className="bg-red-700 text-white px-6 py-1.5 rounded-lg cursor-pointer font-medium">Yes</button>
                    </div>
                </div>
            </div>
            <div className="bg-white w-[245px] h-[295px] rounded-lg p-4 shadow-lg duration-300 dark:bg-[#273144] card-animation hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <img className="rounded-lg mx-auto w-[150px] h-[150px]" src={item.image_url} alt="" />
                        <h1 className="text-xl font-bold mt-4 mb-2 duration-300 dark:text-white">{item.name}</h1>
                        <p className="text-primary font-medium text-sm">${item.price}</p>
                        <div className="flex justify-between items-center mt-3">
                            <Link to={`/edit/${item.id}`} className="flex justify-center items-center bg-[#e2eaf8] dark:text-white dark:bg-[#4c566a] w-35 text-xs px-5 py-1.5 rounded-4xl cursor-pointer duration-300 hover:bg-[#a2abbb7b]">Edit Product</Link>
                            <IoTrashOutline onClick={() => setConfirm(!confirm)} className="text-2xl dark:text-white cursor-pointer duration-300 hover:text-red-600" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
