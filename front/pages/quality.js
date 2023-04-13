import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner"
import Thanks from "../components/Thanks"
import axios from "axios";


function ItemQuality({ data }) {
    const banner = { title: data.attributes.itemqualityTitle, description: data.attributes.description, src: data.attributes.imageRight.data.attributes.url, width: data.attributes.imageRight.data.attributes.width, height: data.attributes.imageRight.data.attributes.height }
    const thanks = { href: data.attributes.contactLink, src: data.attributes.imageDown.data.attributes.url }
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
    const { data } = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/api/itemquality-page?populate=*')

    return { props: { data: data.data } }
}

export default ItemQuality;