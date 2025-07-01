"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const opts = {};
if (process.stdout.isTTY) {
    opts.logger = {
        transport: {
            target: 'pino-pretty'
        }
    };
}
else {
    opts.logger = true;
}
const app = (0, fastify_1.default)(opts);
app.get("/ping", async (_request, _reply) => {
    return "pong\n";
});
app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
