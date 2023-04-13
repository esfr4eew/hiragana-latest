import Link from "next/link";

function Banner({banner}) {
    return (
        <div className="feedback-header" style={{ background: 'no-repeat center/cover url(' + process.env.NEXT_PUBLIC_API_HOST + banner.src + ')' }}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-7 col-9">
                        <div className="feedback-banner">
                            <h1 className="feedback-banner__title">{banner.title}</h1>
                            <p className="feedback-banner__desc">{banner.description}</p>
                            <Link href="/categories">
                                <a className="feedback-banner__link">shop</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;