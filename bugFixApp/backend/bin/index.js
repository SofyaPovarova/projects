"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
try {
    new App_1.default({
        port: 8080,
        applicationName: 'Example Application'
    }).run();
}
catch (e) {
    console.error(e.message);
}
//# sourceMappingURL=index.js.map