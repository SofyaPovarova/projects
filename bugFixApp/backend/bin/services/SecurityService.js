"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class SecurityService {
    static generatePasswordHash(password) {
        let secretWord = 'chuckorris';
        return crypto_1.createHmac('sha1', secretWord).update(password).digest('hex');
    }
    static validatePasssword(password, hash) {
        return this.generatePasswordHash(password) === hash;
    }
}
exports.default = SecurityService;
//# sourceMappingURL=SecurityService.js.map