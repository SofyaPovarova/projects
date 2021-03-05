"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserDataProvider_1 = require("./UserDataProvider");
class ApplicationDataProviders {
    constructor() {
        this.storage = ApplicationDataProviders.getProviders()
            .map(provider => new provider());
    }
    getInstanceProvider(type) {
        let items = this.storage.filter(provider => (provider instanceof type));
        return items.length > 0 ? items[0] : null;
    }
    get user() {
        return this.getInstanceProvider(UserDataProvider_1.default);
    }
    static getProviders() {
        return [
            UserDataProvider_1.default
        ];
    }
}
exports.default = ApplicationDataProviders;
//# sourceMappingURL=ApplicationDataProviders.js.map