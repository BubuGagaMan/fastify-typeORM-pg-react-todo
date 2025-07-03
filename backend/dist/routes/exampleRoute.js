// @TODO - figure out the types for app, ops
//@TODO - find out how to type the request/reply
export default async function exampleRoute(app, opts) {
    app.get("/exampleRoute", async (_request, reply) => {
        return { data: "some data" };
    });
    const postSchema = {
        schema: {
            body: {
                type: 'object',
                properties: {
                    label: { type: 'string' },
                    value: { type: 'number' }
                },
                required: ['label', 'value']
            }
        }
    };
    app.post('/exampleRoute', postSchema, async (request, reply) => {
        const { label, value } = request.body;
        // ...db query...
        return { label, value };
    });
}
