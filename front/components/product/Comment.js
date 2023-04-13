import Image from "next/future/image";
import { useContext, useState } from "react";
import { useReplyContext } from "../../context/replyContext";

function Comment({ reply, commentArea, parentId }) {
    const {replyData, setReplyData} = useReplyContext();
    const nestedComments = (reply.attributes.comments?.data || []).map(comment => {
        return <Comment key={comment.id} parentId={parentId} reply={comment} commentArea={commentArea} type="child" />
    })

    const replyClick = () => {
        setReplyData({id: parentId, user: reply.attributes.user, replyTo: reply.id})
        commentArea.current.scrollIntoView();
    }
    
    return (
        <div>
            <div className="replies-item">
                <div className="replies-img">
                    <Image src="/static/images/replies-user.jpg" alt="user photo" className="replies-img__image" width={56} height={56}></Image>
                    
                </div>
                <div className="replies-user">
                    <div className="replies-user__name">{reply.attributes.user}</div>
                    <div className="replies-user__date">{new Date(reply.attributes.date).toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", hour12: false })}</div>
                    {reply.attributes.reply?.data ? <div className="replied-comment">
                        <span className="replied-comment-user">@{reply.attributes.reply.data.attributes.user},</span>
                        <span className="replied-comment-body">{reply.attributes.reply.data.attributes.commentBody}</span>
                        </div> : null}
                    <p className="replies-user__comment">{reply.attributes.commentBody}</p>
                    <button className="replies-user__reply" onClick={replyClick}>Reply</button>
                </div>
            </div>
            <div style={{ marginLeft: "80px" }}>
                {nestedComments}
            </div>

        </div>
    );
}

export default Comment;