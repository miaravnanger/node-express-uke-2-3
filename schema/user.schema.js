const z = require("zod");
const { v4: uuid } = require("uuid");

const UserSchema = z.object({
  id: z.uuidv4().default(uuid()),
  email: z.email(),
  password: z.string(),
  role: z.enum(["user", "admin"]).default("user"),
  lastLoggedIn: z.number().min(Date.now()).nullable().default(null),
});

module.exports = {
  UserSchema,
};
