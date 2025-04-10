import React from "react";
import { ArticlesList } from "../components/ArticlesList";
import { articles } from "./article-content";

export const ArticlesPage = () => {
    return (
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles} />
        </>
    )
}