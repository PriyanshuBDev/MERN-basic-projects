const z = require("zod");

const CardSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  interests: z.array(z.string()),
  social: z.object({
    linkedin: z.string().url(),
    twitter: z.string().url(),
  }),
});

const AdminSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});

module.exports = {
  CardSchema,
  AdminSchema,
};
