import axios from "axios";
import Image from "next/future/image";
import { useEffect, useState } from "react";

function Replies() {
    const [replies, setReplies] = useState([]);
    const [commentsCount, setCommentsCount] = useState(3);
    const [ascendingSort, setAscendingSort] = useState(false); 

    useEffect(() => {
        const fetchComments = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST + '/api/comments?populate=*'}`);
            setReplies(newestSort(data.data));
        }
        fetchComments();
    }, [])

    const showAll = () => {
        setCommentsCount(replies.length)
    }

    const newestSort = (replies) => {
        return replies.sort((a,b) => {
            return new Date(b.attributes.date) - new Date(a.attributes.date)
        })
    }

    const oldestSort = (replies) => {
        return replies.sort((a,b) => {
            return new Date(a.attributes.date) - new Date(b.attributes.date)
        })
    }

    const newestSortClick = () => {
        setReplies(newestSort(replies))
        setAscendingSort(false)
    }

    const oldestSortClick = () => {
        setReplies(oldestSort(replies))
        setAscendingSort(true)
    }

    return (
        <div className="replies">
            {replies.length > 0 && <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="replies-count">
                            <div className="replies-count__count">{replies.length}</div>
                            <div className="replies-count__sign">replies</div>
                        </div>
                        <div className="replies-sort">
                            <div className="replies-sort__title">Sort by</div>
                            <button className={`replies-sort__item ${!ascendingSort ? "replies-sort__item--active" : ""}`} onClick={newestSortClick}>Newest</button>
                            <button className={`replies-sort__item ${ascendingSort ? "replies-sort__item--active" : ""}`} onClick={oldestSortClick}>Oldest</button>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="replies-list">
                            {replies.slice(0, commentsCount).map(reply => {
                                return (
                                    <div className="replies-item" key={reply.id}>
                                        <div className="replies-img">
                                            <Image src="/static/images/replies-user.jpg" alt="user photo" className="replies-img__image" width={50} height={50}></Image>
                                            
                                        </div>
                                        <div className="replies-user">
                                            <div className="replies-user__name">{reply.attributes.user}</div>
                                            <div className="replies-user__date">{new Date(reply.attributes.date).toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", hour12: false })}</div>
                                            <p className="replies-user__comment">{reply.attributes.commentBody}</p>
                                            <button className="replies-user__reply">Reply</button>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        {commentsCount === 3 && <button className="replies__more" onClick={showAll}>Show more</button>}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Replies;