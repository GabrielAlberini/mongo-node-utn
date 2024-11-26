import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true }
  },
  {
    versionKey: false
  }
)

userSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(error)
  } else {
    next(error)
  }
})

const User = mongoose.model("User", userSchema)

export { User }