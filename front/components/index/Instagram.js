import Image from "next/image";

function Instagram({ instagram }) {
    return (
        <div className="follow">
            <h2 className="follow__title">${instagram.title}</h2>
            <div className="follow-items">
                {instagram.items && instagram.items.map(item => {
                    return (
                        <a href={item.href} className="follow__link" key={item.id}>
                            <Image src={process.env.NEXT_PUBLIC_API_HOST + item.src} alt="insta image" className="follow__image" layout='fill'></Image>
                        </a>
                    )
                })}
            </div>
        </div>
    );
}

export default Instagram;