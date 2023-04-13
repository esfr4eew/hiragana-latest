import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";

function Comments({id, commentArea}) {
    const [replies, setReplies] = useState(null);
    const [commentsCount, setCommentsCount] = useState(2);
    const [ascendingSort, setAscendingSort] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/comments?filters[shop_item]=${id}&populate[0]=comments&populate[1]=comment&populate[2]=comments.comments&populate[3]=comments.reply`);
            setReplies(newestSort(data.data));
        }
        fetchComments();
    }, [id, commentsCount])

    const showAll = () => {
        setCommentsCount(replies.length)
    }

    const newestSort = (replies) => {
        return replies.sort((a, b) => {
            return new Date(b.attributes.date) - new Date(a.attributes.date)
        })
    }

    const oldestSort = (replies) => {
        return replies.sort((a, b) => {
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
            {replies && <div className="container">
                <div className="row">
                    <div className="col-12 offset-0 offset-sm-1 col-sm-11 ">
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
                    <div className="col-12 offset-0 offset-sm-1 col-sm-11">
                        <div className="replies-list">
                            {replies.filter(item => !item.attributes.comment.data).slice(0, commentsCount).map(reply => {
                                return <Comment parentId={reply.id} reply={reply} key={reply.id} commentArea={commentArea}/>
                            })}
                        </div>
                        {commentsCount === 2 && replies.length > commentsCount && <button className="replies__more" onClick={showAll}>Show more</button>}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Comments;