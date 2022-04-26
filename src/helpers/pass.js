import bcrypt from "bcryptjs";

export default {
  encryptPass: async (pass) => {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(pass, salt);
    } catch (error) {
      console.error(error);
    }
  },
  comparePass: async (pass, recivedPass) => {
    try {
      return await bcrypt.compare(pass, recivedPass);
    } catch (error) {
      console.error(error);
    }
  },
};
