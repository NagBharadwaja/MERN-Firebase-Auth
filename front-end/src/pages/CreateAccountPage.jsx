import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onCreateAccount = async () => {
        if (password !== confirmPassword) {
            setError("Password and Confirm Password do no match");
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
            {error && <p>{error}</p>}
            <h1>Create Account</h1>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} /><br/><br/>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} /><br/><br/>
            <input type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} /><br/><br/>
            <button onClick={onCreateAccount}>Login</button><br/><br/>
            <Link to="/login">Already have an account? Login</Link>
        </>
    )
}