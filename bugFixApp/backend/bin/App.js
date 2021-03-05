"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
const ApplicationDataProviders_1 = require("./providers/ApplicationDataProviders");
const AppRoutes_1 = require("./routes/AppRoutes");
class App {
    constructor(config) {
        this.config = config;
        this.config = config;
        this.expApp = express();
        App.app = this;
    }
    static getInstance() {
        return App.app;
    }
    run() {
        var cors = require('cors');
        this.expApp.use(cors());
        this.expApp.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'chuckorris',
            cookie: { maxAge: 3600000 }
        }));
        this.expApp.use(express.urlencoded({ extended: true }));
        this.expApp.use((req, res, next) => {
            res.contentType('application/x-www-form-urlencoded');
            res.header("Access-Control-Allow-Origin", '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.dataProviders = new ApplicationDataProviders_1.default();
        let appRouter = new AppRoutes_1.default();
        appRouter.mount(this.expApp);
        this.expApp.listen(this.config.port, () => {
            console.log("Server run on port: " + this.config.port);
        });
    }
    get providers() {
        return this.dataProviders;
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map