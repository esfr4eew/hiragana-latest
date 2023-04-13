import axios from "axios";
import Image from "next/future/image";
import { useEffect, useState } from 'react';

function Reviews() {
    const [reviews, setReviews] = useState([])
    const [listLen, setListLen] = useState(4);

    useEffect(() => {
        const fetchComments = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST + '/api/comments?populate[0]=shop_item&populate[1]=shop_item.logo'}`);
            setReviews(newestSort(data.data));
        }
        fetchComments();
    }, [])

    const newestSort = (replies) => {
        return replies.sort((a, b) => {
            return new Date(b.attributes.date) - new Date(a.attributes.date)
        })
    }

    function getImage(item) {
        const path = process.env.NEXT_PUBLIC_API_HOST + item?.attributes?.shop_item?.data?.attributes?.logo?.data?.attributes?.url
        return path || '/static/images/review-item-1.jpg';
    }

    return (
        <div className="reviews">
            <div className="container">
                <h2 className="section__title reviews__title">last reviews
                </h2>
                <div className="row">
                    {reviews.length && reviews.slice(0, listLen).map(item => {
                        let path = getImage(item);
                        return (
                            <figure className="col-6 col-sm-4 col-md-3 review" key={item.id}>
                                <div className="review-container">
                                        <Image src={path} alt="review item" className="review__image" width={230} height={230}></Image>
                                        {/* <Image src="/static/images/review-item-1.jpg" alt="review item" className="review__image" width={230} height={230}></Image> */}
                               
                                </div>

                                <figcaption className="review-desc">
                                    <div className="review-user">
                                        <Image src="/static/images/review-user-1.jpg" alt="review user photo"
                                            className="review-user__image" width={25} height={25}></Image>
                                        <span className="review-user__name">{item.attributes.user}</span>
                                    </div>
                                    <p className="review-desc__comment">
                                        {item.attributes.commentBody}
                                    </p>
                                </figcaption>
                            </figure>
                        )
                    })}
                </div>

                {listLen === 4 && <button className="reviews__button" onClick={() => setListLen(reviews.length)}>show more</button>}
            </div>
        </div>
    );
}

export default Reviews;