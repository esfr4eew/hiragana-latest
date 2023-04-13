import Footer from "../components/Footer";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Thanks from "../components/Thanks"
import axios from "axios";

function Shipping({ data }) {
    const banner = { title: data.attributes.shippingTitle, description: data.attributes.description, src: data.attributes.imageRight.data.attributes.url, width: data.attributes.imageRight.data.attributes.width, height: data.attributes.imageRight.data.attributes.height }
    const thanks = { href: data.attributes.contactLink, src: data.attributes.imageDown.data.attributes.url, width: data.attributes.imageDown.data.attributes.width, height: data.attributes.imageDown.data.attributes.height }
    return (
        <div>
            <Header />
            <main>
                <Banner banner={banner} />
                <Thanks thanks={thanks} />
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps() {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/api/shipping-page?populate=*')

    return { props: { data: data.data } }
}

export default Shipping;