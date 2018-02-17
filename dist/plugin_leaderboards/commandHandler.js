"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../core/dataManager");
exports.handleCommand = (command) => __awaiter(this, void 0, void 0, function* () {
    let results = yield dataManager_1.DataManager.query("SELECT NOW()");
    command.originalMessage.channel.send('hello ' + JSON.stringify(results[0]));
    return;
});
//# sourceMappingURL=commandHandler.js.map