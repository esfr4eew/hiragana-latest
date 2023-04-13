import { useCartContext } from "../../context/cartContext";

function Order({ total, products }) {
    const { coupon } = useCartContext();
    return (
        <div className="row">
            <div className="col-sm-6 col-12">
                <div className="order-info">
                    <h1 className="checkout__title">YOUR ORDER</h1>
                    <div className="order-table">
                        <div className="order-table__row order-table__row--header">
                            <span className="order-table__field">Product</span>
                            <span className="order-table__field">Total</span>
                        </div>
                        {products && products.map(product => {
                            return (
                                <div className="order-table__row" key={product.id}>
                                    <span className="order-table__field">{product.shop_item.data.attributes.name}</span>
                                    <span className="order-table__field order-table__field--price">{product.price}</span>
                                </div>
                            )
                        })}
                        {coupon && <div className="order-table__row">
                            <span className="order-table__field">COUPON</span>
                            <span className="order-table__field order-table__field--price">-{coupon.attributes.discountValue}</span>
                        </div>}
                        <div className="order-table__row">
                            <span className="order-table__field">SUBTOTAL</span>
                            <span className="order-table__field order-table__field--price">{total}</span>
                        </div>
                        <div className="order-table__row">
                            <span className="order-table__field">TOTAL</span>
                            <span className="order-table__field order-table__field--price">{total}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;