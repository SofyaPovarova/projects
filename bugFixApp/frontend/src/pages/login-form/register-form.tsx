import React, {useEffect, useState} from "react";
import {StoreContext, UserContext} from "../../App";
import Store from "../../store/store";
import {User} from "../../types/user";
import "./login-form.scss";

const RegisterForm = () => {
    const store = React.useContext(StoreContext) as Store;

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: any) => {
        e.preventDefault();
        setUserData(e.target.name === "email"
            ? {...userData, email: e.target.value}
            : e.target.name === "name"
                ? {...userData, name: e.target.value}
                : {...userData, password: e.target.value})
    }

    const handleSubmit = async () => {
        setSubmitted(true);
        if (userData.email && userData.password) {
            store
                .register(userData.name, userData.email, userData.password)
                .then(result => {
                    alert(result)
                })

        }
    }

    return (
        <div className="inner-container">
            <div className="box">
                <div className="input-group">
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        className="login-input"
                        placeholder="Name"/>
                </div>

                <div className="input-group">
                    <input
                        onChange={handleChange}
                        type="text"
                        name="email"
                        className="login-input"
                        placeholder="Email"/>
                </div>

                <div className="input-group">
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"/>
                </div>

                <button
                    onClick={handleSubmit}
                    type="button"
                    className="login-btn">Register</button>

            </div>
        </div>
    )
};

export default RegisterForm;