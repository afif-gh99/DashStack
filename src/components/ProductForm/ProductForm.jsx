import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BsUpload } from "react-icons/bs"

const ProductForm = ({ btn, inputs, setNew, date, time }) => {
    //All product state
    const [Product, setProduct] = useState({})
    //Product image to show
    const [productImg, setImg] = useState(null)
    //loading state
    const [loading, setLoading] = useState(false)
    //show and store image
    const handelImage = (event) => {
        const productImage = URL.createObjectURL(event.target.files[0])
        setImg(productImage)
        setProduct({ ...Product, "image": event.target.files[0] })
    }
    const sendProduct = (event) => {
        event.preventDefault()
        setLoading(true)
        setNew(Product)

    }
    return (
        <form onSubmit={(event) => sendProduct(event)} className="mt-8 flex gap-14 items-start flex-wrap md:flex-nowrap md:flex-row flex-col  card-animation">
            <div className="flex flex-col flex-1/2 gap-6">
                {inputs?.filter((input) => input.type !== "file").map((input, index) => {
                    return (
                        <div key={index} className="relative flex flex-col gap-2.5 card-animation w-[240px] md:w-full">
                            <label className="dark:text-white duration-300">{input.label}</label>
                            <input
                                min="0"
                                onChange={(event) => { setProduct({ ...Product, [input.name]: event.target.value }) }}
                                className=" bg-[#f5f7ff] duration-300 dark:bg-darknav-bg dark:text-white md:px-5 py-2 px-3 rounded-lg border border-[#bebebe] dark:border-[#324a82]"
                                type={input?.type} placeholder={input?.placeholder} name={input?.name} defaultValue={input?.value || ""} required />
                            {input.type == "number" && <div className="absolute right-1.5 top-[39px] font-bold text-green-600 text-xl">$</div>}
                        </div>
                    )
                })}
                <div className="flex items-center gap-5">
                    <div className=" flex justify-center items-center bg-primary text-white w-[180px] h-10 rounded-lg  font-bold card-animation">
                        <AiOutlineLoading3Quarters className={`text-[24px] animate-spin ${loading ? "block" : "hidden"}`} />
                        <input type="submit" value={btn} className={`w-full h-full  text-white  rounded-lg  font-bold hover:bg-hover-primary cursor-pointer duration-300 ${loading ? "hidden" : "block"}`} />
                    </div>
                    {date && (
                        <div className="text-gray-500">
                            <p className="text-sm ">Last update:</p>
                            <p className="text-xs">{date} | {time}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-1/3 card-animation">
                {inputs?.filter((input) => input.type === "file").map((input, index) => {
                    return (
                        <div key={index} className="">
                            <label htmlFor="prodImg" className="cursor-pointer w-full ">
                                <input onChange={(event) => handelImage(event)} type={input?.type} name={input?.name} id="prodImg" accept="image/*" hidden />
                                <div className="overflow-hidden h-[200px] bg-[#f5f7ff] rounded-[20px] border-2 duration-300 dark:bg-darknav-bg dark:text-white  border-primary border-dashed flex flex-col justify-center items-center">
                                    <img className="w-[190px]" src={productImg || input?.url} alt="" />
                                    <BsUpload className={`text-[90px] text-primary ${input?.url || productImg ? "hidden" : ""}`} />
                                    <p className={`mt-5 ${input?.url || productImg ? "hidden" : ""}`}>{input?.label}</p>
                                </div>
                            </label>
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

export default ProductForm
