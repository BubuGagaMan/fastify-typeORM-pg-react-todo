// @TODO - figure out the types for app, ops
export default async function exampleRoute(app, opts) {
    app.get("/exampleRoute", async (_request, reply) => {
        return { data: "some data" };
    });
}
