import {createHmac} from "crypto";

export default class SecurityService {
    static generatePasswordHash(password: string): string {
        let secretWord = 'chuckorris';
        return createHmac('sha1', secretWord).update(password).digest('hex');
    }

    static validatePasssword(password: string, hash: string) {
        return this.generatePasswordHash(password) === hash;
    }
}