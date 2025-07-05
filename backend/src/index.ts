import closeWithGrace from "close-with-grace";
import { buildApp } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

interface opts {
  logger?:
    | {
        transport: {
          target: string;
        };
      }
    | boolean;
}

const opts: opts = {};

if (process.stdout.isTTY) {
  opts.logger = {
    transport: {
      target: "pino-pretty",
    },
    //level: 'info
  };
} else {
  opts.logger = true;
}

const app = await buildApp(opts);

const port: number = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

closeWithGrace(async ({ signal, err, manual }) => {
  if (err) {
    app.log.error({ err }, "server closing with error");
  } else {
    app.log.info(`${signal} received, server closing`);
  }
  await app.db.destroy()
  await app.close();
});

// error example
// setTimeout(() => {
//     throw new Error('test')
// }, 1000)

app.listen({ port, host }, (err, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
