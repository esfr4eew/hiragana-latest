import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Comments from "../../components/product/Comments";
import Item from "../../components/product/Item";
import Recommend from "../../components/product/Recommend";
import { useRouter } from 'next/router'
import NewReply from "../../components/product/NewReply";
import { ReplyContextWrapper } from "../../context/replyContext";
import { useRef, useEffect, useState } from "react";
import BackToSeries from "../../components/product/BackToSeries";
import Loading from "../../components/Loading"
import { useShopItemsContext } from "../../context/shopItemsContext";

function Product() {
    const router = useRouter()
    const { id } = router.query
    const commentArea = useRef(null);
    const { shopItems } = useShopItemsContext();
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (shopItems) {
            const current = shopItems.find(item => item.id == id)
            setProduct(current);
        }
    }, [shopItems, id])

    return (
        <ReplyContextWrapper>
            <>
                <Header />
                {product ? <main>
                    <div className="good-page">
                        <Item id={id} product={product} />
                        <Comments id={id} commentArea={commentArea} />
                        <NewReply id={id} commentArea={commentArea} />
                        <Recommend />
                        <BackToSeries id={id} />
                    </div>
                </main> : <Loading />}
                <Footer />
            </>
        </ReplyContextWrapper>
    );
}

export default Product;