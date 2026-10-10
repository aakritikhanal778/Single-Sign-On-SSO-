import mongoose from "mongoose";

console.log("User.js loaded");
console.log("User Model ReadyState:", mongoose.connection.readyState);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;