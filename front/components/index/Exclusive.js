import Image from "next/future/image";

function Exclusive({ exclusive }) {
    return (
        <div className="cards">
            <div className="cards-container">
                <h1 className="cards__title">
                    {exclusive.title}
                </h1>
                <div className="cards__body">
                    {exclusive.images && exclusive.images.map(({ src, width, height }, i) => {
                        return (
                            <div className="exclusive-container" key={src}>
                                <a href={exclusive.links[i]}>
                                    <Image src={process.env.NEXT_PUBLIC_API_HOST + src} alt="exclusive car" className="cards__image" width={width} height={height}></Image>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Exclusive;