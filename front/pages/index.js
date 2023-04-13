import Footer from "../components/Footer";
import Header from "../components/Header";
import Exclusive from "../components/index/Exclusive";
import TopBanner from "../components/index/Topbanner";
import Trending from '../components/index/Trending'
import Categories from '../components/index/Categories'
import Instagram from "../components/index/Instagram";
import Reviews from "../components/index/Reviews";
import axios from 'axios';
import { reducer } from "../utils/reduceData";

function Index({ data }) {
  const {carouselImages, topBanner, exclusive, trending, categories, instagram} = reducer(data);
  return (
    <div>
      <Header />
      <main className="main">
        <TopBanner carouselImages={carouselImages} topBanner={topBanner} />
        <Exclusive exclusive={exclusive} />
        <Trending trending={trending} />
        <Categories categories={categories} />
        <Instagram instagram={instagram} />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/api/index-page?populate[0]=TopBanner&populate[1]=TopBanner.bannerBg&populate[2]=HeaderLinks&populate[3]=ExclusiveImages&populate[4]=ExclusiveImages.exclusive1&populate[5]=ExclusiveImages.exclusive2&populate[6]=TrendingItems&populate[7]=TrendingItems.shop_items&populate[8]=TrendingItems.shop_items.logo&populate[9]=CategoriesItems&populate[10]=CategoriesItems.categories&populate[11]=CategoriesItems.categories.image&populate[12]=InstagramItems&populate[13]=InstagramItems.instagram_posts&populate[14]=InstagramItems.instagram_posts.image&populate[15]=ReviewList&populate[16]=ReviewList.comments')

  return { props: { data: data.data } }
}

export default Index;