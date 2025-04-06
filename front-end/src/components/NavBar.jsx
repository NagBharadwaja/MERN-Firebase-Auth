import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../useUser";

export const NavBar = () => {
    const { isLoading, user } = useUser();
    const navigate = useNavigate();

    const handleSignOut = e => {
        signOut(getAuth());
        navigate("/login");
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
                {
                    isLoading
                    ? <li>Loading...</li>
                    : (
                        <>
                            {
                                user &&
                                <li style={{ color: 'white'}}>Logged in as {user.email}</li>
                            }
                            {
                                user
                                ? <button onClick={handleSignOut}>Sign Out</button>
                                : <button onClick={e => navigate("/login")}>Sign In</button>
                            }
                        </>
                    )
                }
            </ul>
        </nav>
    )
}