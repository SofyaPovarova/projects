"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../model/entities");
const SecurityService_1 = require("../services/SecurityService");
class UserController {
    constructor(app) {
        this.app = app;
        this.userProviderInstance = this.app.providers.user;
    }
    findAll(onLoad) {
        this.userProviderInstance.select({}, onLoad);
    }
    findByEmail(email, onLoad, onError) {
        this.userProviderInstance.findOne({ email: email }, (err, data) => {
            if (err) {
                onError(err.message, 500);
            }
            else {
                let result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }
    updateBugs(data, id, onUpdate, onError) {
        this.findByEmail(data.email, (user) => {
            console.log(user._id);
            console.log("bugsNew");
            console.log(id);
            if (user && user._id === id) {
                console.log("bugsNew");
                const bugsNew = (parseInt(user.fixedBugs) + parseInt(data.bugs)).toString();
                console.log(bugsNew);
                this.userProviderInstance.update({ _id: user._id }, Object.assign(Object.assign({}, user), { fixedBugs: bugsNew }));
                onUpdate(`User ${user.email} fixed ${bugsNew} bugs`);
            }
            else {
                onError(`${data.bugs} bugs weren't added to user ${data.email}`, 500);
            }
        }, onError);
    }
    create(data, onCreate, onError) {
        let emailPattern = /[a-z0-9_-]{4,}@[a-z0-9_-]{3,}\.[a-z]{2,3}$/;
        if (!emailPattern.test(data.email)) {
            onError("Incorrect email value", 400);
        }
        else if (!data.password.length) {
            onError("Empty password", 400);
        }
        else {
            this.findByEmail(data.email, (result) => {
                if (!result) {
                    let user = new entities_1.default();
                    user.name = data.name || data.email;
                    user.email = data.email;
                    user.password = SecurityService_1.default.generatePasswordHash(data.password);
                    this.userProviderInstance.create(user, (err, newData) => {
                        if (err !== null) {
                            onError(err.message, 500);
                        }
                        else {
                            onCreate(newData);
                        }
                    });
                }
                else {
                    onError("The user is already exists", 400);
                }
            }, onError);
        }
    }
    removeById(id, onRemove) {
        this.userProviderInstance.delete({ _id: id }, onRemove);
    }
    updateById(id, newData, onUpdate) {
        this.userProviderInstance.update({ _id: id }, newData, onUpdate);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map