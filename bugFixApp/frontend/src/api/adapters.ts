import {User} from "../types/user";

export default function toAppUser(user: any): User {
    return {
        created: user.created || 0,
        email: user.email || "",
        id: user.id || "",
        lastVisit: user.lastVisit || 0,
        name: user.name || "",
        password: user.password || "",
        fixedBugs: user.fixedBugs || 0
    }
}