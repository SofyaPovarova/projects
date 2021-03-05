import {AuthApi} from "../interface";
import {User} from "../../types/user";
import toAppUser from "../adapters";
import axios from "axios";

export default class APIAuth implements AuthApi {
    async login(email: string, password: string, adapter?: any): Promise<{ msg: string, user?: User }> {
        const response = await axios.post("/user/login", `email=${email}&password=${password}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });


        return {
            msg: response.data.msg,
            user: response.data.user ? toAppUser(response.data.user) : undefined
        }
    }

    async logout(): Promise<void> {
        const response = await axios.get("/user/logout", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    async register(name: string, email: string, password: string): Promise<string> {
        const response =
            await axios.post("/user/add", `name=${name}&email=${email}&password=${password}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        return response.data.msg
    }


}