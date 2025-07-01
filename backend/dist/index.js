import { buildApp } from "./app.js";
const opts = {};
if (process.stdout.isTTY) {
    opts.logger = {
        transport: {
            target: 'pino-pretty'
        }
        //level: 'info
    };
}
else {
    opts.logger = true;
}
const app = await buildApp(opts);
app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
