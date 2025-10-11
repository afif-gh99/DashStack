
const PageContainer = ({ children, title }) => {
    return (
        <div className="min-h-screen  pl-24 md:pl-62 pr-5 py-20 bg-[#f5f6fa] dark:bg-dark-bg duration-300">
            <h1 className="md:text-3xl text-2xl font-semibold dark:text-white duration-300">{title}</h1>
            {children}
        </div>
    )
}

export default PageContainer
