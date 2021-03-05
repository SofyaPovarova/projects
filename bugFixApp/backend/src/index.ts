import App from "./App";
import { Session } from 'express-session'

try {
    new App({
        port: 8080,
        applicationName: 'Example Application'
    }).run();
} catch (e) {
    console.error(e.message);
}


declare module 'express-session' {
    interface Session {
        userId: string;
    }
}