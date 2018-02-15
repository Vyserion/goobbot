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
exports.handleCommand = (dataManager, command) => __awaiter(this, void 0, void 0, function* () {
    // command.originalMessage.channel.send('command got to plugin');
    let results = yield dataManager.query("SELECT NOW()");
    try {
        console.log(results[0]);
        command.originalMessage.channel.send('hello ' + JSON.stringify(results[0]));
    }
    catch (e) {
        console.log(e);
    }
    return;
});
//# sourceMappingURL=commandHandler.js.map