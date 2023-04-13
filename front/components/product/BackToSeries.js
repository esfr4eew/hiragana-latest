import Link from "next/link";
import { useEffect, useState } from "react";
import { useShopItemsContext } from "../../context/shopItemsContext";

function BackToSeries({ id }) {
    const { shopItems } = useShopItemsContext();
    const [ href, setHref ] = useState('');

    useEffect(() => {
        const url = shopItems && shopItems.length && shopItems.find(item => item.id == id).attributes.subcategory.data.attributes.category.data.id;
        setHref(url);
    }, [shopItems, id])
    
    return (
        <Link href={`/categories?id=${href}`}>
            <button className="to-series-button">back to series {href}</button>
        </Link>
    );
}

export default BackToSeries;