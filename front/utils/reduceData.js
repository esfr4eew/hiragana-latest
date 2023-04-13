export const reducer = (data) => {
    const carouselImages = data.attributes.TopBanner.bannerBg.data.map(item => ({ url: item.attributes.url, width: item.attributes.width, height: item.attributes.height }));
    const topBanner = data.attributes.TopBanner;
    const exclusive = { title: data.attributes.exclusiveTitle, images: Object.keys(data.attributes.ExclusiveImages).filter(key => key !== 'id').map(key => ({ src: data.attributes.ExclusiveImages[key].data.attributes.url, width: data.attributes.ExclusiveImages[key].data.attributes.width, height: data.attributes.ExclusiveImages[key].data.attributes.height })), links: [data.attributes.exlusiveLink1, data.attributes.exlusiveLink2] }
    const trending = data.attributes.TrendingItems.shop_items.data.map((item) => ({ id: item.id, name: item.attributes.name, price: item.attributes.price, src: item.attributes.logo.data.attributes.url, width: item.attributes.logo.data.attributes.width, height: item.attributes.logo.data.attributes.height }));
    const categories = { title: data.attributes.categoriesTitle, items: data.attributes.CategoriesItems.categories.data.map(item => ({ id: item.id, src: item.attributes.image.data.attributes.url, name: item.attributes.name })) };
    const instagram = { title: data.attributes.instagramTitle, items: data.attributes.InstagramItems.instagram_posts.data.map(item => ({ id: item.id, src: item.attributes.image.data.attributes.url, href: item.attributes.imageLink })) }
    // const reviews = { title: data.attributes.reviewsTitle, items: data.attributes.ReviewList.comments.data.map(item => ({ id: item.id, name: item.attributes.user, body: item.attributes.commentBody })) }
    return {
        carouselImages, topBanner, exclusive, trending, categories, instagram
    }
    // return {
    //     carouselImages, topBanner, exclusive, trending, categories, instagram, reviews
    // }
}