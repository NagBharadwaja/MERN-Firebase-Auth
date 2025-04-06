export const CommentsList = ({ comments }) => {
    return (
        <div>
            <br/>
            Comments:
            {
                comments.map(comment => {
                    const { postedBy, text } = comment;
                    return (
                        <div key={text}>
                            <h4>{postedBy}</h4>
                            <p>{text}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}