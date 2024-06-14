"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
const storeclients = new Map();
const chatmaps = new Map();
function hasMutualMapping(sid, rid) {
    return chatmaps.get(sid) === rid && chatmaps.get(rid) === sid;
}
function runMutualFunction(sid, rid) {
    if (hasMutualMapping(sid, rid)) {
        console.log(`Running function for mutual mapping between ${sid} and ${rid}`);
        // Add the logic for the function you want to run here
    }
    else {
        console.log(`Mutual mapping not found between ${sid} and ${rid}`);
    }
}
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        var _a, _b;
        const parsedData = JSON.parse(data);
        if (parsedData.type == "delete") {
            storeclients.delete(parsedData.id);
            chatmaps.delete(parsedData.sid);
            chatmaps.delete(parsedData.rid);
        }
        if (parsedData.type == "signup") {
            storeclients.set(parsedData.id, ws);
            // console.log("this is the sid while signup" + parsedData.sid);
            // console.log("this is the rid while signup" + parsedData.rid);
            if (parsedData.sid && parsedData.rid) {
                chatmaps.set(parsedData.sid, parsedData.rid);
                console.log(chatmaps);
            }
            if (storeclients.get(parsedData.id) && storeclients.get(parsedData.id).readyState === ws_1.WebSocket.OPEN) {
                // console.log("accessed the websocket")
                (_a = storeclients.get(parsedData.id)) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ senddata: parsedData.id, msg: "Yayy! your connection is successful" }));
            }
            // console.log("stored");
        }
        else if (parsedData.type == "message") {
            // console.log("not stored");
            if (storeclients.get(parsedData.rid)) {
                // console.log(parsedData)
            }
            if (storeclients.get(parsedData.rid) && storeclients.get(parsedData.rid).readyState === ws_1.WebSocket.OPEN) {
                console.log("back to reciever");
                runMutualFunction(parsedData.sid, parsedData.rid);
                // console.log(storeclients)
                if (chatmaps.get(parsedData.sid) === parsedData.rid && chatmaps.get(parsedData.rid) === parsedData.sid) {
                    (_b = storeclients.get(parsedData.rid)) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({ sendmessage: parsedData.text }));
                }
            }
        }
    });
    ws.send(JSON.stringify({ message: 'Received your data!' }));
});
