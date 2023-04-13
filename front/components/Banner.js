import Image from "next/future/image";

function Banner({ banner }) {
    return (
        <div className="moneyback">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 moneyback-info shipping-info">
                        <h1 className="moneyback-info__title">{banner.title}</h1>
                        <span className="moneyback-info__divider"></span>
                        {banner.description && banner.description.map(item => {
                            return (
                                <div className="moneyback-info__answer shipping-info__answer" key={item.id}>
                                    <span>{item.regularPart}</span> <span className="shipping-info--red">{item.coloredPart}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{paddingBottom: "50%"}} className="col-md-6 moneyback-shipping-bg"></div>
                </div>
            </div>
            <div className="col-md-6 moneyback-image-container">
                <Image src={process.env.NEXT_PUBLIC_API_HOST + banner.src} className="shipping-image" alt="banner" width={banner.width} height={banner.height}></Image>
                
            </div>
        </div>
    );
}

export default Banner;