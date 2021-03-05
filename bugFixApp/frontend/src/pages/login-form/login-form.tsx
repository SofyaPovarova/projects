import React, {useState} from "react";
import {StoreContext, UserContext} from "../../App";
import Store from "../../store/store";
import "./login-form.scss";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const store = React.useContext(StoreContext) as Store;
    const {user, setUser} = React.useContext(UserContext);

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: any) => {
        e.preventDefault();
        setUserCredentials(e.target.name === "email"
            ? {...userCredentials, email: e.target.value}
            : {...userCredentials, password: e.target.value})
    }

    const handleSubmit = async () => {
        setSubmitted(true);
        debugger
        if (userCredentials.email && userCredentials.password) {
            store
                .login(userCredentials.email, userCredentials.password)
                .then(result => {
                    localStorage.setItem("email", result.user?.email || '')
                    result.user && setUser(result.user)
                    store.setLoggedUser(result.user)
                    alert(result.msg)
                })

        }
    }

    return (
        <div className="inner-container">
            <div className="box">
                <div className="input-group">
                    <input
                        value={userCredentials.email}
                        onChange={handleChange}
                        type="text"
                        id="email"
                        name="email"
                        className="login-input"
                        placeholder="Email"/>
                </div>

                <div className="input-group">
                    <input
                        value={userCredentials.password}
                        onChange={handleChange}
                        type="password"
                        id="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"/>
                </div>

                <button
                    disabled={user !== undefined}
                    onClick={handleSubmit}
                    type="button"
                    id="login"
                    className="login-btn">Login
                </button>
            </div>
            {user && <div className="go">
                <label htmlFor="go">Go and fix 🐞🐞🐞</label>
                <Link className="goBtn" to="/bugs" id="go">➡️</Link>
            </div>}
        </div>
    )
};

export default LoginForm;