export default class User {
    _id: string;
    email: string;
    password: string;

    name: string;
    created: string;
    lastVisit: string;
    fixedBugs: string;

    constructor() {
        let date = Date.now().toString();
        this.created = date;
        this.lastVisit = date;
        this.fixedBugs = "0";
    }
}