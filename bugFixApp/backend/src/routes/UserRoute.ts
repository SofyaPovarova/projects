import IApplicationRoute from "../core/IApplicationRoute";
import App from "../App";
import UserController from "../contollers/UserController";
import AuthController from "../contollers/AuthController";
import {Request, Response} from "express";

const UserRoute: IApplicationRoute = {
    createRouter(router) {
        let app = App.getInstance();
        let AuthCtrl = new AuthController(app);
        let UserCtrl = new UserController(app);

        return router()
            .use(AuthController.validateSession)
            .get('/', (req: Request, res: Response) => {
                UserCtrl.findAll((err: any, data: any) => {
                    res.send({users: data});
                });
            })
            .post('/add', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    UserCtrl.create(req.body, (newData: any) => {
                        res.send({userCreated: newData});
                    }, (msg, code) => {
                        res.send({message: msg, code: code});
                    });
                }
            })
            .post('/update-bugs', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    UserCtrl.updateBugs(req.body, req.session.userId, (msg: string) => {
                        res.send({message: msg, code: 200});
                    }, (msg, code) => {
                        res.send({message: msg, code: code});
                    })
                }
            })
            .post('/login', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({message:"Empty body request", code: 400});
                } else {
                    console.log(`email ${req.body.email}`)
                    AuthCtrl.login(req, res);
                }
            })
            .get(
                '/logout',
                AuthCtrl.logout
            );
    }
};

export default UserRoute;