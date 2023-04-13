import http from ".";

export const getRating = async () => {
    const userId = localStorage.getItem('hiragana');
    const { data } = await http.get(`/api/ratings?filters[userId][$eq]=${userId}&populate[0]=rating&populate[1]=rating.shop_item`)
    const rating = data.data;
    if (rating.length) return { id: rating[0].id, rating: rating[0].attributes.rating.map(item => ({ ...item, shop_item: item.shop_item.data.id })) }
    return { id: null, rating: [] }
}

const getRatingId = async () => {
    const userId = localStorage.getItem('hiragana');
    const { data } = await http.get(`/api/ratings?filters[userId]=${userId}`);
    return data.data[0].id;
}

export const updateRating = async (id, rating) => {
    const ratingId = id || await getRatingId();
    const userId = localStorage.getItem('hiragana');
    const res = await http.put(`/api/ratings/${ratingId}`, { data: { userId, rating } })
}

export const createRating = async () => {
    const userId = localStorage.getItem('hiragana');
    const { data } = await http.post(`/api/ratings/`, { data: { userId } })
    return data.data.id;
}