import React, {useEffect} from 'react';
import './App.scss';
import Store from "./store/store";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import FixingBugsPage from "./pages/fixing-bugs/fixing-bugs-page";
import LoginRegisterForm from "./pages/login-form/login-register-section";
import {User} from "./types/user";

export const StoreContext = React.createContext<Store>({} as Store);

export const UserContext = React.createContext({
    bugsInSession: 0,
    addBug: () => {
    },
    user: {} as (User | undefined),
    setUser: (user: User | undefined) => {
    }
})

const App = () => {
    const store = new Store();

    const [users, setUsers] = React.useState([] as User[]);
    const [bugsInSession, setBugs] = React.useState(0);

    const [userState, setUserState] = React.useState<User | undefined>()
    useEffect(() => {
        store.getStoredUser().then(u => {
            setUserState(u)
        })
    }, []);

    const addBug = () => setBugs(bugsInSession + 1)
    const dddd = (user: User | undefined) => setUserState(user)

    let userContext = {
        bugsInSession: bugsInSession,
        addBug: addBug,
        user: userState,
        setUser: dddd
    }


    return (
        <StoreContext.Provider value={store}>
            <UserContext.Provider value={userContext}>
                <Router>
                    <div>
                        <Switch>
                            <Route path={"/auth"}>
                                <LoginRegisterForm/>
                                {/*<Statistics/>*/}
                            </Route>
                            {<Route path={"/bugs"}>
                                <FixingBugsPage/>
                            </Route>
                            }
                        </Switch>
                    </div>
                </Router>
            </UserContext.Provider>
        </StoreContext.Provider>
    );
}
export default App;
