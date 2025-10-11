import { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import { FaPowerOff } from "react-icons/fa"
import { IoSearchOutline, IoSunnySharp } from 'react-icons/io5'
import { NavLink, useNavigate } from "react-router"
import { UserContext } from '../../UserContext'
import { MdDarkMode } from 'react-icons/md'
import axios from 'axios'
import { Flip, toast } from 'react-toastify'
import { SearchContext } from '../../SearchContext'

const NavBar = ({ links, setDark, dark }) => {
    const { setSearch } = useContext(SearchContext)
    const { user } = useContext(UserContext)
    const [confirm, setConfirm] = useState(false)
    const navigate = useNavigate()
    //prevent user from trying access to the main page without sign up or log in
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!user || !token) {
            toast.warn('You need to log in first to continue', {
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
            navigate("/login")
        }
    }, [user, navigate])
    const logOut = () => {
        axios.post("https://vica.website/api/logout", {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json"
            }
        }).then(res => {
            toast.success("You have been logged out successfully", {
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
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate("/login")
        })
    }
    return (
        <>
            <div className='dark:text-white relative z-50'>
                <div className={`bg-[#2a2a2aaa] fixed w-full h-full left-0 top-0 z-50 ${confirm ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity duration-300`}>
                    <div className="w-[350px] h-[180px] bg-white dark:bg-[#273144] dark:text-white m-auto rounded-bl-xl rounded-br-xl p-10 flex flex-col justify-center items-center">
                        <p className="text-center text-xl mb-8 font-medium">Are you sure you want to logout?</p>
                        <div className="flex justify-between w-[200px]">
                            <button onClick={() => setConfirm(!confirm)} className="bg-[#e2eaf8] dark:bg-[#4c566a] px-6 py-1.5 rounded-lg cursor-pointer font-medium">No</button>
                            <button onClick={() => logOut()} className="bg-red-700 text-white px-6 py-1.5 rounded-lg cursor-pointer font-medium">Yes</button>
                        </div>
                    </div>
                </div>
                <div className='bg-white md:pl-65 pl-30 pr-5 py-3.5 w-full h-14 fixed top-0 flex gap-3 justify-between items-center duration-300 dark:bg-darknav-bg'>
                    <div className="flex items-center relative">
                        <IoSearchOutline className='absolute left-3' />
                        <input
                            onInput={(event) => { setSearch(event.target.value) }}
                            className='px-9 py-1.5 bg-gray-50 outline-none focus:w-[260px] md:focus:w-120 dark:bg-[#333c50] duration-300 w-18 md:w-64 rounded-2xl border-2 border-gray-400' type="text" placeholder="Search a Product ..." />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <img className='w-11 h-11 rounded-full' src={user?.profile_image_url} alt="" />
                        <div className='md:block hidden'>
                            <h3 className='font-bold '>{`${user?.first_name}  ${user?.last_name}`}</h3>
                            <p className='text-xs text-gray-500'>{user?.user_name}</p>
                        </div>
                        <span className='font-black'>|</span>
                        <span onClick={() => {
                            setDark(prev => {
                                const newMode = !prev
                                localStorage.setItem("mode", newMode ? true : false)
                                return newMode
                            })
                        }}
                            className='text-[28px] duration-300 cursor-pointer hover:transform-[scale(1.1)]'
                        >
                            {dark ? <IoSunnySharp /> : <MdDarkMode />}
                        </span>
                    </div>
                </div>
                <nav className="  md:py-5 px-1 py-3 bg-white  flex  h-screen md:w-55 w-16  fixed righ-0 flex-col justify-between gap-10 duration-300 dark:bg-darknav-bg">
                    <h1 className=" md:px-4 md:text-[30px] text-lg font-extrabold dark:text-white duration-300"><span className="text-primary">Dash</span>Stack</h1>
                    <div className="flex flex-col gap-10 md:px-7 px-3 flex-1 overflow-hidden">
                        <ul className="text-md flex flex-col gap-3">
                            {links.map((link, index) => {
                                return (
                                    <NavLink
                                        key={index}
                                        to={link.url}
                                        end
                                        className={({ isActive }) =>
                                            `nav-item flex justify-start items-center gap-6 relative md:w-[160px] w-10 p-1.5 md:p-4 rounded-lg duration-300 hover:bg-[#97979726] ${isActive ? "active" : ""}`
                                        }>
                                        <span className="tag hidden bg-primary w-1.5 md:h-12 h-[36px] absolute md:left-[-28px] -left-3 rounded-[0_50px_50px_0]"></span>
                                        <span className="text-2xl">{link.icon}</span>
                                        <span>{link.title}</span>
                                    </NavLink>)
                            })}
                        </ul>
                    </div>
                    <button onClick={() => setConfirm(!confirm)} className="flex justify-center items-center md:gap-5 bg-primary mx-auto text-white px-3 md:w-44 w-12 h-12 rounded-lg font-medium hover:bg-hover-primary duration-300 cursor-pointer text-lg"><span><FaPowerOff /></span><span className='md:block hidden'>Log Out</span> </button>
                </nav>
            </div>
        </>
    )
}

export default NavBar
