import { Link } from "react-router"
import PageContainer from "../components/PageContainer/PageContainer"
import { IoMdAddCircleOutline } from "react-icons/io"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card/Card"
import { MdOutlineRefresh } from "react-icons/md"
import { Flip, toast } from "react-toastify"
import { SearchContext } from "../SearchContext"
import { PiSortAscendingBold, PiSortDescendingBold } from "react-icons/pi"

const Products = () => {
    const { search } = useContext(SearchContext)
    const [filtered, setFiltered] = useState([])
    const [items, setItems] = useState("")
    const [deletedId, setDeleted] = useState(0)
    const [rotate, setRotate] = useState(0)
    const [rotateSort, setRotateSort] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [sort, setSort] = useState("newest")
    useEffect(() => {
        axios.get("https://vica.website/api/items", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json"
            }
        })
            .then(res => {
                setItems(sort == "newest" ? res.data.reverse() : res.data)
                setFiltered(res.data)
                setRefresh(false)
            })
            .catch(err => console.log(err))
    }, [deletedId, refresh, sort])
    useEffect(() => {
        if (search.trim() === "") {
            setFiltered(items)
        }
        else {
            setFiltered(items.filter(item => {
                return (
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
            }))
        }
    }, [search, items])
    return (
        <PageContainer title="All Products" className="relative">
            <div className="absolute right-5 top-20 flex gap-2.5 items-center justify-center">
                <button onClick={() => {
                    toast.info(sort == 'newest' ? "Sorting from oldest..." : "Sorting from newest...", {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: localStorage.getItem("mode") === "true" ? "dark" : "light",
                        transition: Flip,
                    });
                    setRotateSort(prev => prev + 180)
                    setRefresh(true)
                    setSort(sort == "newest" ? "oldest" : "newest")
                }} className="text-white text-lg  bg-primary duration-300 hover:bg-hover-primary md:px-3 w-[38px] h-[38px] md:py-2.5 px-2.5 py-2.5 rounded-lg cursor-pointer">
                    <PiSortAscendingBold className="duration-700 ease-in-out" style={{ transform: `rotate(${rotateSort}deg)` }} />  </button>
                <button onClick={() => {
                    setRefresh(true)
                    setRotate(prev => prev + 360)
                    toast.info('Upadting Products...', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: localStorage.getItem("mode") === "true" ? "dark" : "light",
                        transition: Flip,
                    });
                }} className="text-white text-lg bg-primary duration-300 hover:bg-hover-primary md:px-3 w-[38px] h-[38px] md:py-2.5 px-2.5 py-2.5 rounded-lg cursor-pointer">
                    <MdOutlineRefresh className="duration-700 ease-in-out"
                        style={{ transform: `rotate(${rotate}deg)` }} /></button>
                <Link to="/add-product" className=" flex items-center justify-center rounded-lg gap-2 font-medium text-white text-lg bg-primary duration-300 hover:bg-hover-primary md:px-4 md:py-1.5 px-2.5 py-2.5"><IoMdAddCircleOutline /><span className="hidden md:block">Create Product</span></Link>
            </div>
            <div className="mt-9 flex  justify-start items-center gap-4 flex-wrap">
                {!items || refresh ? (
                    <p className="dark:text-white duration-300 absolute top-[55%] left-[57%] transform-[translate(-50%,-50%)] md:text-4xl text-2xl text-center font-bold animation-loading ">Loading Products...</p>
                ) : items.length === 0 || filtered.length === 0 ? (
                    <p className="dark:text-white duration-300   absolute top-[55%] left-[57%] transform-[translate(-50%,-50%)] md:text-4xl text-2xl text-center font-bold">No products found</p>
                ) : (
                    filtered.map((item, index) => (
                        <Card key={index} item={item} setDeleted={setDeleted} />
                    ))
                )}
            </div>
        </PageContainer>
    )
}
export default Products
