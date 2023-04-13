import axios from "axios";
import { useRef, useState } from "react";
import { useReplyContext } from "../../context/replyContext";

function NewReply({ id, commentArea }) {
    const { replyData, setReplyData } = useReplyContext();
    const user = useRef(null);
    const email = useRef(null);
    const commentBody = useRef(null);

    const addComment = async (e) => {
        e.preventDefault();
        const res = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/api/comments', {
            data: { user: user.current.value, email: email.current.value, commentBody: commentBody.current.value, date: new Date(), shop_item: id, comment: replyData?.id, reply: replyData?.replyTo, productId: id }
        })
        window.location.reload()
    }

    return (
        <div className="replynew">
            <div className="container">
                <div className="row">
                    <div className="col-9 offset-0 offset-sm-1 " ref={commentArea}>
                        <div className="replynew__title">Leave a reply</div>
                        <p className="replynew__desc">
                            Want to join the discussion?
                            <br />
                            feel free to contribute
                        </p>
                        {replyData &&
                            <div className="replynew-replied-container">
                                <button className="replynew-replied-user">{replyData.user}</button>
                                <button onClick={() => setReplyData(null)} className="replynew-replied-cancel">
                                </button>
                            </div>}
                        <form className="replynew-form" onSubmit={addComment}>
                            <textarea className="replynew-form__area" ref={commentBody}></textarea>
                            <label className="replynew-form__label">
                                <input type="text" className="replynew-form__input" required ref={user} />
                                <span className="replynew-form__title">Name <span>*</span></span>
                            </label>
                            <label className="replynew-form__label">
                                <input type="text" className="replynew-form__input" required ref={email} />
                                <span className="replynew-form__title">Email <span>*</span> </span>
                            </label>
                            <button type="submit" className="replynew-form__submit">Post comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewReply;