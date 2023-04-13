import http from ".";

export const getCartItems = async () => {
    const userId = localStorage.getItem('hiragana');
    const { data } = await http.get(`/api/carts?filters[userId][$eq]=${userId}&populate[0]=cartItems.shop_item&populate[1]=cartItems.shop_item.sizes&populate[2]=cartItems.shop_item.logo`)
    if (data.data.length) return { cartItems: data.data[0].attributes.cartItems.map(item => ({ id: item.id, quantity: item.quantity, size: item.size, shop_item: item.shop_item.data.id })), cartId: data.data[0].id };
    return { cartItems: [], cartId: null }
}

export const createCart = async (userId) => {
    const { data } = await http.post("/api/carts", { data: { userId } })
    return { cartItems: [], cartId: data.data.id }
}

const getCartId = async () => {
    const userId = localStorage.getItem('hiragana');
    const { data } = await http.get(`/api/carts?filters[userId]=${userId}`);
    if (!data.data[0]?.id) {
        const { data } = await http.post("/api/carts", { data: { userId } })
        return data.data.id;
    }
    return data.data[0]?.id
}

export const editCart = async (userId, cartId, cartItems) => {
    let id = cartId || await getCartId();
    await http.put(`/api/carts/${id}`, { data: { userId, cartItems } });
}

export const clearCart = async () => {
    const userId = localStorage.getItem('hiragana');
    let id = await getCartId();
    await http.put(`/api/carts/${id}`, { data: { userId, cartItems: [] } });
}

export const initCartData = async () => {
    const userId = localStorage.getItem('hiragana');
    const cartData = await getCartItems(userId);
    return { userId, cartData };
}