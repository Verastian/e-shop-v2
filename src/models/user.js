import db from "mongoose";

const userSchema = db.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  /*  isAdmin: {
    type: Boolean,
    default: false,
  }, */
  roles: [
    {
      type: db.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  ],
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const User = db.model("User", userSchema);

export default User;
