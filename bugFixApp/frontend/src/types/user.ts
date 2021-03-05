export interface User {
    id: string;
    email: string;
    password: string;

    name: string;
    created: number;
    lastVisit: number;
    fixedBugs: number;
}