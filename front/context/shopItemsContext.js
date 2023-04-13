import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ShopItemsContext = createContext();

export function ShopItemsWrapper({ children }) {
    const [shopItems, setShopItems] = useState([]);

    useEffect(() => {
        async function fetchShopItems() {
            let { data } = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/api/shop-items?populate[0]=logo&populate[1]=subcategory&populate[2]=subcategory.category&populate[3]=imageList&populate[4]=comments&populate[5]=description&populate[6]=sizes&pagination[pageSize]=200');
            setShopItems(data.data);
        }
        fetchShopItems();
    }, [])
    
    return (
        <ShopItemsContext.Provider value={{shopItems}}>
            {children}
        </ShopItemsContext.Provider>
    );
}

export function useShopItemsContext() {
    return useContext(ShopItemsContext);
}