import closeWithGrace from 'close-with-grace';
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
closeWithGrace(async ({ signal, err, manual }) => {
    if (err) {
        app.log.error({ err }, 'server closing with error');
    }
    else {
        app.log.info(`${signal} received, server closing`);
    }
    await app.close();
});
// error example
// setTimeout(() => {
//     throw new Error('test')
// }, 1000)
app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
