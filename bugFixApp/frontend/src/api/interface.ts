import {User} from "../types/user";

export interface UsersApi {
     getList(): Promise<Array<User>>
     addBug(user: User): Promise<void>;
     getUserByEmail(storedUserEmail: string): Promise<User | undefined>;
}

export interface AuthApi {
     register: (name: string, email: string, password: string) => Promise<string>
     login: (email: string, password: string, adapter?: any) => Promise<{  msg: string, user?: User  }>
     logout(): Promise<void>;
}

export interface GoodAppApi {
     users: UsersApi
     auth: AuthApi
}