import Image from "next/future/image";
import Link from "next/link";

function Trending({ trending }) {
    return (
        <div className="trending">
            <div className="container">
                <h2 className="section__title">trending stickers</h2>
                <div className="trending-items">
                    {trending.length && trending.map(item => {
                        return (
                            <figure className="trending__item" key={item.id}>
                                <div className="trending__image-container">
                                    <Image src={process.env.NEXT_PUBLIC_API_HOST + item.src} alt="no good racing" className="trending__image" width={item.width} height={item.height}></Image>
                                    
                                </div>
                                <Link href={"/products/" + item.id}>
                                    <figcaption className="trending-caption">
                                        <div className="trending-caption__title">{item.name}</div>
                                        <div className="trending-caption__price">{item.price}</div>
                                    </figcaption>
                                </Link>
                            </figure>
                        )
                    })}

                </div>
            </div>
        </div>
    );
}

export default Trending;