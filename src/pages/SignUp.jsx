import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { Flip, toast, ToastContainer } from "react-toastify"
import { UserContext } from "../UserContext"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
const SignUp = ({ title, sub, btn, Signinputs }) => {
    //update the profile photo
    const navigate = useNavigate()
    const [info, setInfo] = useState({})
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(UserContext)
    const sendData = (event) => {
        event.preventDefault()
        if (info.password == info.password_confirmation) {
            setData(info)
            setLoading(true)
        }
        else {
            toast.error('Password do not match', {
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
        }
    }
    useEffect(() => {
        if (data.first_name) {
            setLoading(true)
            axios.post("https://vica.website/api/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    localStorage.setItem("token", res.data.data.token)
                    setUser(res.data.data.user)
                    toast.success('Your account created successfuly', {
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
                    navigate('/products')
                })
                .catch(err => {
                    setLoading(false)
                    const serverMsg = err.response?.data?.message;
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
    const [profile, setProfile] = useState('/assets/Images/profileIcon.png')
    const handleImageChange = (event) => {
        const newImg = URL.createObjectURL(event.target.files[0])
        setProfile(newImg)
        setInfo({ ...info, "profile_image": event.target.files[0] })
    }
    //json array if inputs
    return (
        <div className=' bg-[url(/assets/Images/signBg.png)] min-h-screen bg-cover font-noto flex justify-center items-center px-8 py-8 '>
            <div className=" bg-[#3899e856] backdrop-blur-lg   md:w-[800px] md:p-6 p-4  rounded-2xl shadow-[0_60px_60px_rgba(0,0,0,0.5)] box-animation opacity-0 scale-95">
                <div className="text-center md:mb-6 mb-4">
                    <h1 className=" font-bold md:text-2xl text-lg text-white mb-1">{title}</h1>
                    <p className=" text-sub-color md:text-sm text-xs">{sub}</p>
                </div>
                <form onSubmit={(event) => sendData(event)} className="flex justify-between items-center flex-wrap gap-3">
                    <div className="flex flex-col items-center flex-[100%] ">
                        <label htmlFor="profile" className="cursor-pointer">
                            <img src={profile} alt="profile" className="md:w-30 md:h-30 w-25 h-25  rounded-full mt-2 border-3 border-primary p-1 hover:transform-[scale(1.1)] duration-300" />
                        </label>
                        <input onChange={handleImageChange} id="profile" name="profile_image" type="file" accept="image/*" hidden disabled={loading ? true : false} />
                    </div>
                    {Signinputs.map((input, index) => {
                        return (
                            <div className={`${input.type == "text" ? " md:flex-[1_1_calc(33.33%_-_10px)]" : input.type == "email" ? "md:flex-[1_1_100%]" : input.type == "password" ? "md:flex-[1_1_45%]" : ""}
                            flex flex-col w-full gap-2.5
                            `} key={index}>
                                <label className="text-sub-color font-medium text-sm md:text-base">{input?.title}</label>
                                <input
                                    onChange={(event) => (setInfo({ ...info, [input.name]: event.target.value }))}
                                    name={input.name}
                                    className="bg-[#5caaea1d] text-white backdrop-blur-lg md:px-5 py-2 px-3 rounded-lg border border-[#3c9be8] text-sm md:text-base outline-primary"
                                    type={input?.type} placeholder={input?.placeholder}
                                    required
                                    disabled={loading ? true : false}
                                />
                            </div>
                        )
                    })}
                    <div className="outline-primary flex justify-center  flex-1 bg-primary text-white  rounded-lg  font-bold   ">
                        <div className={`flex justify-center items-center gap-2.5 ${loading ? "block" : "hidden"}`}>
                            <AiOutlineLoading3Quarters className="text-[24px] animate-spin" />
                            <p className="w-full py-2.5">please wait...</p>
                        </div>
                        <input type="submit" value={btn} className={`${loading ? "hidden" : "block"} w-full py-2.5 rounded-lg cursor-pointer hover:bg-hover-primary duration-300`} />
                    </div>
                </form>
                <div className="flex justify-center items-center flex-col mt-4">
                    <p className="text-sub-color mt-2 text-sm">Already have an account? <Link to="login" className="underline text-primary font-bold">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
