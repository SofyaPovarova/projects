"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor() {
        let date = Date.now().toString();
        this.created = date;
        this.lastVisit = date;
        this.fixedBugs = "0";
    }
}
exports.default = User;
//# sourceMappingURL=entities.js.map