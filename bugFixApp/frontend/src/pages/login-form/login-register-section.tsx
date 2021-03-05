import React, {useState} from "react";
import {StoreContext} from "../../App";
import Store from "../../store/store";
import {User} from "../../types/user";
import "./login-form.scss";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

const LoginRegisterForm = () => {
    const store = React.useContext(StoreContext) as Store;

    const [first, setFirst] = useState(true)
    const [u, setU] = useState({} as User)

    async function login() {
        store.getUsers().then(u => setU(u[0]))
    }

    return (
        <div className="root-container">
            <div className="box-controller">
                <div
                    id="loginTab"
                    className={"controller " + (first
                        ? "selected-controller"
                        : "")}
                    onClick={() => setFirst(true)}>
                    Login
                </div>
                <div
                    className={"controller " + (!first
                        ? "selected-controller"
                        : "")}
                    onClick={() => setFirst(false)}>
                    Register
                </div>
            </div>

            <div className="box-container">
                {first && <LoginForm/>}
                {!first && <RegisterForm/>}
            </div>
        </div>
    )
};

export default LoginRegisterForm;