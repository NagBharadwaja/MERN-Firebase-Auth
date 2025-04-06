import { useState } from "react"

export const AddComment = ({ onAddComment }) => {
    const [userName, setUserName] = useState("");
    const [comment, setComment] = useState("");

    const handleUserName = (e) => { setUserName(e.target.value) };
    const handleComment = (e) => { setComment(e.target.value) };

    const handleCommentSubmit = () => {
        setUserName("");
        setComment("");
        onAddComment({
            postedBy: userName,
            text: comment
        })
    }

    return (
        <div>
            <input id="user" placeholder="User" type="text" value={userName} onChange={handleUserName} />
            <br/>
            <input id="comment" type="text" placeholder="Comment" value={comment} onChange={handleComment} />
            <br/>
            <button onClick={handleCommentSubmit}>Submit</button>
        </div>
    )
}