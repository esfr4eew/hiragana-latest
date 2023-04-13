import { createContext, useContext, useState } from "react"

const TotalSumContext = createContext();

export const TotalSumWrapper = ({ children }) => {
    const [ total, setTotal ] = useState(0);
    return (
        <TotalSumContext.Provider value={{ total, setTotal }}>
            {children}
        </TotalSumContext.Provider>
    )
}

export const useTotalSumContext = () => useContext(TotalSumContext);