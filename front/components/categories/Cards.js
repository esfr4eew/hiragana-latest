import Image from "next/future/image";
import { useState } from "react";
import Card from "./Card";

function Cards({ items, sorts }) {
    const [selectedSort, setSelectedSort] = useState(0);
    const [isAscendingPriceSort, setIsAscendingPriceSort] = useState(false);

    const popularitySort = () => {
        setSelectedSort(0);
        sorts.popularitySort(items)
    }
    const priceSort = () => {
        setSelectedSort(1);
        isAscendingPriceSort ? sorts.priceSortDesc(items) : sorts.priceSortAsc(items);
        setIsAscendingPriceSort(!isAscendingPriceSort);
    }

    return (
        <div className="col-7 col-md-9 category-cards">
            <div className="category-sort">
                <div className="category-sort__title">Sort By</div>
                <button className={`category-sort__select ${selectedSort === 0 ? "category-sort__select--active" : ""}`} onClick={popularitySort}>popularity</button>
                <button className={`category-sort__select category-sort__price ${selectedSort === 1 ? "category-sort__select--active" : ""}`} onClick={priceSort}>
                    <span>price</span>
                    <Image src="/static/images/triangle.png" className={`category-sort__icon ${isAscendingPriceSort ? "category-sort__icon--rotate" : ""}`} alt="sort" width={5} height={5}></Image>
                </button>
            </div>
            <div className="category-cards">
                <div className="row">
                    {items && items.map(item => <Card item={item} key={item.attributes.uid} />)}
                </div>
            </div>
            {/* <div className="cards-pagination">
                <a href="#" className="cards-pagination__item cards-pagination__item--active">1</a>
                <a href="#" className="cards-pagination__item">2</a>
                <a href="#" className="cards-pagination__item">3</a>
                <span>...</span>
                <a href="#" className="cards-pagination__item">21</a>
            </div> */}
        </div>
    );
}

export default Cards;