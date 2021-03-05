import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import ApplicationDataProviders from './providers/ApplicationDataProviders';
import IApplicationConfiguration from "./core/IApplicationCofiguration";
import AppRoutes from "./routes/AppRoutes";

export default class App {
    private static app: App;
    private expApp: Express;
    private dataProviders: ApplicationDataProviders;

    public static getInstance(): App {
        return App.app;
    }

    constructor(private config: IApplicationConfiguration) {
        this.config = config;
        this.expApp = express();
        App.app = this;
    }

    run(): void {
        var cors = require('cors');
        this.expApp.use(cors());

        this.expApp.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'chuckorris',
            cookie: {maxAge: 3600000}
        }));
        this.expApp.use(express.urlencoded({extended: true}));

        this.expApp.use((req: Request, res: Response, next: NextFunction) => {
            res.contentType('application/x-www-form-urlencoded');
            res.header("Access-Control-Allow-Origin", '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
        });
        this.dataProviders = new ApplicationDataProviders();

        let appRouter = new AppRoutes();
        appRouter.mount(this.expApp);

        this.expApp.listen(this.config.port, () => {
            console.log("Server run on port: " + this.config.port);
        });
    }
    get providers(): ApplicationDataProviders {
        return this.dataProviders;
    }
}
