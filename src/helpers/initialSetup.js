// import bcrypt from "bcryptjs";
import Role from "../models/role";

export default {
  createRoles: async () => {
    try {
      // We check if there are any documents.
      const isRoles = await Role.estimatedDocumentCount();
      // if there is any role, we return
      if (isRoles > 0) {
        return;
      }

      //create default Roles
      const values = await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "admin" }).save(),
        new Role({ name: "sales" }).save(),
      ]);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  },
};
