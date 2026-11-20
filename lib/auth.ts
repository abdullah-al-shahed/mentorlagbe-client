import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string)
const db = client.db(process.env.DB_NAME)

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  user: {
    modelName: "users",
    additionalFields: {
      role: { type: "string", defaultValue: "student", input: true },
      phone: { type: "string", required: false },
      bio: { type: "string", required: false },
      plan: { type: "string", defaultValue: "free", input: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // sign-up এ কেউ admin হতে পারবে না
        before: async (user) => ({
          data: {
            ...user,
            role: user.role === "tutor" ? "tutor" : "student",
            plan: "free",
          },
        }),
      },
    },
  },
})