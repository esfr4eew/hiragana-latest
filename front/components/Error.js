import Link from "next/link";

function Error({ text }) {
    return (
        <div className="error-container">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex flex-column align-items-center justify-content-center error-wrapper">
                        <p className="error-text">{text}</p>
                        <Link href={"/categories"}>
                            <span className="error-link">Back to product page</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;