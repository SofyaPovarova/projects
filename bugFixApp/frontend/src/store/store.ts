import {User} from "../types/user";
import {GoodAppApi} from "../api/interface";
import GoodAppAPI from "../api/bugFix/api";

export default class Store {
    api: GoodAppApi
    public loggedUser?: User = undefined

    constructor() {
        this.api = new GoodAppAPI()
    }

    async login(email: string, password: string): Promise<{ msg: string, user?: User }> {
        return await this.api.auth.login(email, password)
    }

    async getUsers(): Promise<Array<User>> {
        try {
            return  await this.api.users.getList();
        } catch (e) {
            return [];
        }
    }

    setLoggedUser(user: User | undefined) {
        this.loggedUser = user
        debugger
    }

    async register(name: string, email: string, password: string) {
        return await this.api.auth.register(name, email, password)
    }

    async logout() {
        await this.api.auth.logout()
    }

    async addBug(user: User) {
        await this.api.users.addBug(user)

    }

    async getStoredUser(): Promise<User | undefined> {
        const storedUserEmail = localStorage.getItem("email")
        if (storedUserEmail === '' || storedUserEmail === null) {
            return undefined
        }

        try {
            return await this.api.users.getUserByEmail(storedUserEmail);
        } catch (e) {
            return
        }
    }
}