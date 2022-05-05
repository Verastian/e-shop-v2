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

  passRules: (pass) => {
    const // minMaxLength = /^[\s\S]{8,32}$/,
      upper = /[A-Z]/,
      lower = /[a-z]/,
      number = /[0-9]/,
      special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (
      // minMaxLength.test(pass) &&
      upper.test(pass) &&
      lower.test(pass) &&
      number.test(pass) &&
      special.test(pass)
    ) {
      return true;
    }

    return false;
  },
};
