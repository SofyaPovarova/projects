"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const UserController_1 = require("../contollers/UserController");
const AuthController_1 = require("../contollers/AuthController");
const UserRoute = {
    createRouter(router) {
        let app = App_1.default.getInstance();
        let AuthCtrl = new AuthController_1.default(app);
        let UserCtrl = new UserController_1.default(app);
        return router()
            .use(AuthController_1.default.validateSession)
            .get('/', (req, res) => {
            UserCtrl.findAll((err, data) => {
                res.send({ users: data });
            });
        })
            .post('/add', (req, res) => {
            if (!req.body) {
                res.send({ msg: "Empty body request", code: 400 });
            }
            else {
                UserCtrl.create(req.body, (newData) => {
                    res.send({ userCreated: newData });
                }, (msg, code) => {
                    res.send({ message: msg, code: code });
                });
            }
        })
            .post('/update-bugs', (req, res) => {
            if (!req.body) {
                res.send({ msg: "Empty body request", code: 400 });
            }
            else {
                UserCtrl.updateBugs(req.body, req.session.userId, (msg) => {
                    res.send({ message: msg, code: 200 });
                }, (msg, code) => {
                    res.send({ message: msg, code: code });
                });
            }
        })
            .post('/login', (req, res) => {
            if (!req.body) {
                res.send({ message: "Empty body request", code: 400 });
            }
            else {
                console.log(`email ${req.body.email}`);
                AuthCtrl.login(req, res);
            }
        })
            .get('/logout', AuthCtrl.logout);
    }
};
exports.default = UserRoute;
//# sourceMappingURL=UserRoute.js.map