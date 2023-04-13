import http from "."

export const updateCoupon = async (coupon) => {
    const res = await http.put(`/api/coupons/${coupon.id}`, { data: { ...coupon.attributes, isActive: false } })
}