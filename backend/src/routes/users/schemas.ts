const schemas = {
  post: {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string", minLength: 4, maxLength: 24 },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
        additionalProperties: false,
        required: ["username", "password", "email"],
      },
    },
  },
};

export default schemas