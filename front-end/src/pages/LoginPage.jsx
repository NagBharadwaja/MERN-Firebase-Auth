import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onLoginSubmit = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
            {error && <p>{error}</p>}
            <h1>Login</h1>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/><br/>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/><br/>
            <button onClick={onLoginSubmit}>Login</button><br/><br/>
            <Link to="/create-account">Don't have an account? Create one here</Link>
        </>
    )
}