const z = require("zod");

const userSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(5),
});

module.exports = userSchema;
