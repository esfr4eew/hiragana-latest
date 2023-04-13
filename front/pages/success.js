import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";

function Success() {
    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 mx-auto">
                            <div style={{ background: "url('/static/images/success-bg.png') no-repeat center", padding: "110px 0", margin: "50px 0", textAlign: "center" }}>
                                <div>
                                    <Image src="/static/images/check.png" alt="category 1" className="category-shop__image" width={34} height={34}></Image>
                                </div>
                                <h1 className="text-white text-uppercase my-2" style={{fontSize: "24px"}}>The order has been sent</h1>
                                <p className="text-white" style={{ fontSize: "15px" }}>We will contact you to confirm the order!</p>
                                <Link href="/categories">
                                    <button className="order-confirm__button" style={{ border: "none", padding: "12px 16px" }}>go to the directory</button>
                                </Link>
                            </div>
                            {/* success */}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Success;