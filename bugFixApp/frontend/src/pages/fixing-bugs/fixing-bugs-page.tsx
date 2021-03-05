import React from "react";
import "./fixing-bugs-page.css";
import Bug from "./bug";
import {StoreContext, UserContext} from "../../App";
import Store from "../../store/store";
import {Link} from "react-router-dom";


export function generateText(name: string | undefined, sum: number): JSX.Element {
     return name
        ? <p className="info">{`🗿 ${name} fixed ${sum} bugs!`}</p>
        : <p className="info">{"🗿 Please "}<Link to="/auth">login</Link> first!</p>
}

const FixingBugsPage = () => {
    const {bugsInSession, user, setUser} = React.useContext(UserContext);
    const store = React.useContext(StoreContext) as Store;

    const handleSubmitLogout = async () => {
        store.logout().then(result => {
            setUser(undefined)
            alert("Logout")
        })
    }

    const sum = user ? +user.fixedBugs + +bugsInSession.valueOf() : 0
    return (
        <div className="container">
            <div className="paper">
                {generateText(user?.name, sum)}
            </div>

            {user && <button
                onClick={handleSubmitLogout}
                type="button"
                id="logout"
                className="login-btn logout"><Link to="/auth">Logout</Link></button>
            }
            <div className="bugsArea">
                <Bug/>
            </div>

        </div>
    )
}

export default FixingBugsPage;
