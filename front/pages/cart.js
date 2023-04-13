import Footer from "../components/Footer";
import Header from "../components/Header";
import CartItems from "../components/cart/CartItems"
import Sidebar from "../components/cart/Sidebar";
import { useCartContext } from "../context/cartContext";
import Error from "../components/Error";

function Cart() {
    const { cartData } = useCartContext();

    return (
        <div>
            <Header />
            <main>
                {cartData && cartData.cartItems.length ? <div className="cart">
                    <div className="container">
                        <div className="row">
                            <CartItems />
                            <Sidebar />
                        </div>
                    </div>
                </div> : <Error text="Cart is empty" />}
            </main>
            <Footer />
        </div>
    );
}

export default Cart;