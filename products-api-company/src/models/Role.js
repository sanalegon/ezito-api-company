import { Schema, model } from "mongoose"

export const ROLES = ["user", "admin", "moderator"] // Arreglo que me servira para verifySignup

const roleSchema = new Schema(
    {
        name: String
    }, 
    {
        versionKey: false
    }
);

export default model("Role", roleSchema);