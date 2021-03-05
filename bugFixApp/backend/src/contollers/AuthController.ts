import UserDataProvider from "../providers/UserDataProvider";
import App from "../App";
import {Request, Response, NextFunction} from "express";
import SecurityService from "../services/SecurityService";
import {Session, SessionData} from "express-session";

type TypeIntersection = Request & Session

export default class AuthController {
    private userDataProvider: UserDataProvider;

    constructor(private  app: App) {
        this.userDataProvider = this.app.providers.user;
    }

    login(req: Request, res: Response) {

        const email = req.body.email;
        console.log(`b ${email}`)

        const password = req.body.password;

        this.userDataProvider.findOne({email: email}, (err, user) => {
            if (err) {
                res.send(500);
            } else {
                if (!user) {
                    res.send({msg: `No user with email ${email}`, code: 400});
                } else if (!SecurityService.validatePasssword(password, user.password)) {
                    res.send({msg: 'Incorrect password', code: 400});
                } else {
                    user.lastVisit = Date.now().toString();
                    this.userDataProvider.update({id: user._id}, user)
                    req.session.userId = user._id;
                    res.send({msg: "Welcome!", user: user, code: 200})
                }
            }
        })
    }

    logout(req: Request, res: Response) {
        let session = req.session;
        if (!session) {
            res.sendStatus(400);
        } else {
            session.destroy(() => {
                res.send({msg:'Logout success'});
            });
        }
    }

    static validateSession(req: Request, res: Response, next: NextFunction) {
        let session = req.session;
        if (~['/login', '/add'].indexOf(req.path)) {
            if (session.userId === undefined) {
                next();
            } else {
                res.send({msg: 'Session was opened already', code: 406});
            }
        } else {
            if (session.userId !== undefined) {
                next();
            } else {
                res.sendStatus(401);
            }
        }
    }
}