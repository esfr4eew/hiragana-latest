import { createContext, useContext,  useState } from "react";

const ReplyContext = createContext();

export const ReplyContextWrapper = ({children}) => {
    const [replyData, setReplyData] = useState(null);
    return (
        <ReplyContext.Provider value={{ replyData, setReplyData }}>
            {children}
        </ReplyContext.Provider>
    )
}

export const useReplyContext = () => useContext(ReplyContext);