import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { UserContext } from "../UserContext"
import axios from "axios"
import { Flip, toast, ToastContainer } from "react-toastify"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const LogIn = ({ title, sub, btn, LoginInputs }) => {
    const [info, setInfo] = useState({})
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const sendData = (event) => {
        event.preventDefault()
        setLoading(true)
        setData(info)
    }
    useEffect(() => {
        if (data.email) {
            axios.post("https://vica.website/api/login", data, {
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => {
                toast.success("You have been logged in successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: localStorage.getItem("mode") === "true" ? "dark" : "light",
                    transition: Flip,
                })
                navigate('/products')
                localStorage.setItem("token", res.data.token)
                setUser(res.data.user)
            })
                .catch(err => {
                    setLoading(false)
                    const serverMsg = err.response?.data?.msg;
                    toast.error(serverMsg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Flip,
                    });
                    console.log(err)
                })
        }
    }, [data])
    return (
        <div className=' bg-[url(/assets/Images/signBg.png)] h-screen bg-cover font-noto flex justify-center items-center px-8 py-8'>
            <div className=" bg-[#3899e856] backdrop-blur-lg w-[450px]  md:p-6 p-4  rounded-2xl shadow-[0_60px_60px_rgba(0,0,0,0.5)] box-animation opacity-0 scale-95">
                <div className="text-center md:mb-10 mb-4">
                    <h1 className=" font-bold md:text-2xl text-lg text-white mb-1">{title}</h1>
                    <p className=" text-sub-color md:text-sm text-xs">{sub}</p>
                </div>
                <form onSubmit={(event) => sendData(event)} className="flex flex-col justify-between items-center h-[400px]">
                    <div className="flex flex-col w-full gap-9">
                        {LoginInputs.map((input, index) => {
                            return (
                                <div className="flex flex-col w-full gap-2.5" key={index}>
                                    <label className="text-sub-color font-medium text-sm md:text-base ">{input?.title}</label>
                                    <input
                                        onChange={(event) => (setInfo({ ...info, [input.name]: event.target.value }))}
                                        name={input?.name}
                                        className="bg-[#5caaea1d] text-white backdrop-blur-lg md:px-5 py-2 px-3 rounded-lg border border-[#5caaea] text-sm md:text-base outline-primary"
                                        type={input?.type} placeholder={input?.placeholder}
                                        required
                                        disabled={loading ? true : false}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex items-center flex-col">
                        <div className="outline-primary flex justify-center  flex-1 bg-primary text-white  rounded-lg  font-bold w-[300px]  ">
                            <div className={`flex justify-center items-center gap-2.5 ${loading ? "block" : "hidden"}`}>
                                <AiOutlineLoading3Quarters className="text-[24px] animate-spin" />
                                <p className="w-full py-2.5">please wait...</p>
                            </div>
                            <input type="submit" value={btn} className={`${loading ? "hidden" : "block"} outline-primary w-[300px] block bg-primary text-white  py-2.5 rounded-lg  font-bold hover:bg-hover-primary cursor-pointer duration-300`} />
                        </div>
                        <p className="text-sub-color mt-2 text-sm">Don't have an account? <Link to="/" className="underline text-primary font-bold">Create Account</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn
