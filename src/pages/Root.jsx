import { Outlet } from "react-router"
import NavBar from "../components/NavBar/NavBar"
import { AiOutlineAppstore } from "react-icons/ai"
import { MdFavoriteBorder } from "react-icons/md"
import { BsListCheck } from "react-icons/bs"
import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
const links = [
    {
        icon: <AiOutlineAppstore />,
        title: "Products",
        url: "/products"
    },
    {
        icon: <MdFavoriteBorder />,
        title: "Favorites",
        url: "favorites"
    },
    {
        icon: <BsListCheck />,
        title: "Orders List",
        url: "orders"
    },
]
const Root = () => {
    const { user } = useContext(UserContext)
    const [dark, setDark] = useState(() => {
        const mode = localStorage.getItem("mode")
        return mode === "true";
    })
    return (
        <div className={`font-noto ${dark ? "dark" : ""}`}>
            <NavBar links={links} setDark={setDark} dark={dark} />
            <Outlet />
        </div>
    )
}

export default Root
