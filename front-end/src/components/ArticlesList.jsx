import React from "react";
import { Link } from "react-router-dom";

export const ArticlesList = ({ articles }) => {
    return (
        <>
            {
                articles.map(article => {
                    return <p key={article.name}><Link to={`/articles/${article.name}`}>{article.title}</Link></p>
                })
            }
        </>
    )
}