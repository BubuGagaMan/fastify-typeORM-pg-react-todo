import fastify from "fastify";

interface opts {
    logger?: {
        transport: {
            target: string
        }
    } | boolean
}

const opts: opts = {}

if (process.stdout.isTTY) {
    opts.logger = {
        transport: {
            target: 'pino-pretty'
        }
    }
} else {
    opts.logger = true
}

const app = fastify(opts);

app.get("/ping", async (_request, _reply) => {
  return "pong\n";
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if(err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});
