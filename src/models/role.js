import db from "mongoose";

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = db.Schema({
  name: String,
});

const Role = db.model("Role", roleSchema);

export default Role;
