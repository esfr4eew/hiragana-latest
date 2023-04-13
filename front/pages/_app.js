import 'bootstrap/dist/css/bootstrap.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/main.sass'
import { ShopItemsWrapper } from '../context/shopItemsContext';
import { CartContextWrapper } from "../context/cartContext"
import { TotalSumWrapper } from '../context/totalSum';
import { RatingContextWrapper } from '../context/ratingContext';
import { useEffect } from 'react';
// import { auth } from '../auth';
import { auth } from "../http/auth"

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    async function userAuth() {
      await auth();
    }
    userAuth();
  }, [])

  return (
    <CartContextWrapper>
      <ShopItemsWrapper>
        <TotalSumWrapper>
          <RatingContextWrapper>
            <Component {...pageProps} />
          </RatingContextWrapper>
        </TotalSumWrapper>
      </ShopItemsWrapper>
    </CartContextWrapper>
  )
}

export default MyApp
