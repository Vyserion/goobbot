"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const logger_1 = require("../../core/logger");
beforeEach(() => {
    // Suppress all logging during testing.
    logger_1.default.transports[0].level = "emerg";
});
describe("Logging setup", () => { });
//# sourceMappingURL=logger.spec.js.map