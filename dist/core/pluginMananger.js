"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPluginMessage = (message) => {
    if (message.startsWith(process.env.PREFIX))
        return true;
    return false;
};
exports.handlePluginMessage = (message) => {
    message = stripPrefix(message);
    let plugin = getPlugin(message);
    if (!isPluginValid(plugin)) {
        // TODO: Do some message handling for missing plugin
    }
    // TODO: Parse arguments
    // TODO: Send to plugin handler
};
function stripPrefix(message) {
    return message.substr(process.env.PREFIX.length);
}
;
function getPlugin(message) {
    return message.split(' ')[0];
}
;
function isPluginValid(plugin) {
    return true;
}
;
function buildMessageObject() {
}
;
//# sourceMappingURL=pluginMananger.js.map