import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function Sidebar({ queryId, showSubcategory, subcatRefs }) {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST + '/api/categories?populate[0]=subcategories&populate[1]=subcategories.shop_items'}`)
            setCategories(data.data);
        }
        fetchCategories();
    }, [])

    return (
        <aside className="col-5 col-md-3">
            {categories && categories.map((category, i) => {
                return (
                    <Link href={"/categories?id=" + category.id} key={category.id}>
                        <details className="sidebar-category" open={queryId == category.id}>
                            <summary className="sidebar-category__name">{category.attributes.name}</summary>
                            <div className="sidebar-list">
                                {category.attributes.subcategories.data.map((subcategory, idx) => {
                                    return (
                                        <button className="sidebar-list__item" key={subcategory.id} ref={el => subcatRefs.current[subcategory.id] = el} onClick={() => showSubcategory(subcategory.id, idx)}>
                                            <span className="sidebar-list__name">{subcategory.attributes.name}</span> - <span
                                                className="sidebar-list__amount">{subcategory.attributes.shop_items.data.length}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </details>
                    </Link>
                )
            })}
        </aside>
    );
}

export default Sidebar;