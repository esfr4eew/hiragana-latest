import Image from "next/future/image";
import Link from "next/link";

function Categories({ categories }) {
    return (
        <div className="category-shop">
            <div className="container">
                <h2 className="section__title">{categories.title}
                </h2>
                <div className="row">
                    {categories.items && categories.items.map(item => {
                        return (
                            <div className="col-6 col-sm-4 col-md-3 category-shop__item" key={item.id}>
                                <Link href={"/categories?id=" + item.id}>
                                    <a className="category-shop__link">
                                        <Image src={process.env.NEXT_PUBLIC_API_HOST + item.src} alt="category" className="category-shop__image" width={156} height={156}></Image>
                                        
                                        <span className="category-shop__desc">${item.name}</span>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}

                    <div className="col-6 col-sm-4 col-md-3 category-shop__item">
                        <Link href="/categories">
                            <a className="category-shop__link">
                                <Image src="/static/images/category-shop-all.jpg" alt="category 1" className="category-shop__image"  width={156} height={156}></Image>
                                <span className="category-shop__desc">All categories</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;