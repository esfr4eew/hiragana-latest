import Header from '../components/Header';
import Banner from '../components/feedback/Banner'
import Replies from '../components/feedback/Replies';
import NewReply from '../components/feedback/Newreply';
import Footer from '../components/Footer';
import axios from 'axios';

function Feedback({ data }) {
    const banner = { title: data.attributes.title, description: data.attributes.description, src: data.attributes.bannerBg.data.attributes.url };
    return (
        <div>
            <Header />
            <main>
                <Banner banner={banner} />
                <Replies />
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps() {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/api/feedback-page?populate=*')

    return { props: { data: data.data } }
}

export default Feedback;