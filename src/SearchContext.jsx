//Create context to store the search value to send it to the products page
import { createContext, useState } from "react";

export const SearchContext = createContext()
export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState("")
    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}
