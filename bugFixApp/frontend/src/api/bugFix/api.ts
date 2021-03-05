import {AuthApi, GoodAppApi, UsersApi} from "../interface";
import APIUser from "./api-users";
import APIAuth from "./api-auth";

class GoodAppAPI implements GoodAppApi {
    users: UsersApi;
    auth: AuthApi;

    constructor() {
        this.users = new APIUser();
        this.auth = new APIAuth();
    }
}

export default GoodAppAPI;