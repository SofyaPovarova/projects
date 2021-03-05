import {UsersApi} from "../interface";
import {User} from "../../types/user";
import toAppUser from "../adapters";
import axios from "axios";

export default class APIUser implements UsersApi {
    async getList(): Promise<Array<User>> {
        const response = await axios.get("/user", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const users: Array<User> = response.data.users;

        return users.map((user: any) => (toAppUser(user)));
    }

    async getUserByEmail(storedUserEmail: string): Promise<User | undefined> {
        const users = await this.getList()

        return users.filter(user => user.email === storedUserEmail)[0];
    }

    async addBug(user: User): Promise<void> {
       await axios.post("/user/update-bugs", `bugs=1&email=${user.email}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

}
