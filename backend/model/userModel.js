import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    telp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Static signup method for /register
userSchema.statics.signUp = async function (name, email, password) {
  // Validation
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

userSchema.statics.updatePassword = async function (id, oldPassword, newPassword, retypePassword) {
  // Validation
  if (!oldPassword || !newPassword || !retypePassword) {
    throw Error("All fields must be filled");
  }

  const user = await this.findById(id);

  if (!user) {
    throw Error("User not found");
  }

  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw Error("Password not strong enough");
  }

  if (newPassword !== retypePassword) {
    throw Error("New Password doesn't match");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  user.password = hash;
  await user.save();

  return user;
};


export const User = mongoose.model("User", userSchema);
