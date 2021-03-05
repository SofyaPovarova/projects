import React, {useEffect} from "react";
import {User} from "./types/user";
import {StoreContext} from "./App";
import Store from "./store/store";

const UsersList: React.FC = () => {
    const store = React.useContext(StoreContext) as Store;
    const [users, setUsers] = React.useState([] as User[]);

    useEffect(() => {
        store.getUsers().then(u => setUsers(u))
    }, []);

    return (
        <div className="users">
            {users.map((user: User) => <p className="email">{user.fixedBugs}</p>)}
        </div>
    )
}

export default UsersList;
