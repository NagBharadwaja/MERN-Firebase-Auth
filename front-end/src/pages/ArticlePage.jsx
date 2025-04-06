import React, { useState } from "react";
import axios from "axios";
import { useParams, useLoaderData } from "react-router-dom";
import { useUser } from "../useUser";
import { articles } from "./article-content";
import { CommentsList } from "../components/CommentsList";
import { AddComment } from "../components/AddComment";

export const articlePageLoader = async ({ params }) => {
    const { data } = await axios.get(`/api/articles/${params.name}`);
    const { upvotes, comments } = data;
    return {
        upvotes,
        comments
    }
}

export const ArticlePage = () => {
    const { name } = useParams();
    const { upvotes: initialUpvotes, comments: initComments } = useLoaderData();
    const { isLoading, user } = useUser();
    
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [comments, setComments] = useState(initComments);
    
    const article = articles.find(article => article.name === name);

    const handleUpvoteChange = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {}
        const { data } = await axios.post(`/api/articles/${name}/upvotes`, null, { headers });
        const { upvotes } = data;
        setUpvotes(upvotes);
    }

    const onAddComment = async ({ postedBy, text }) => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const { data } = await axios.post(`/api/articles/${name}/comments`, {
            postedBy,
            text
        },
        { headers });
        const { comments } = data;
        setComments(comments);
    }

    return (
        <>
            <h1>This is {article.title} page</h1>
            { user && <button onClick={handleUpvoteChange}>Upvote</button> }
            <p>This article has {upvotes} upvotes</p>
            {
                article.content.map(p => {
                    return (
                        <p key={p}>{p}</p>
                    )
                })
            }
            {
                user
                ? <AddComment onAddComment={onAddComment} />
                : <p>Log in to add a comment</p>
            }
            {
                comments.length 
                ? <CommentsList comments={comments} />
                : <></>
            }
        </>
    )
}