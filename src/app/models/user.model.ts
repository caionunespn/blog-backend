import {Schema, model, Types, Document, Model} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {APP_SECRET} from "../../utils/config";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String
  },
  contacts: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

UserSchema.methods.checkPassword = function(password: string) {
  return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, APP_SECRET || "");
}

UserSchema.set("toObject", { flattenMaps: true });

interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  bio: string;
  contacts: Types.Map<string>;
}

export interface IUser extends IUserSchema {
  generateToken(): string;
  checkPassword(password: string): boolean;
}

UserSchema.pre<IUser>("save", async function(next) {
  if(this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

UserSchema.methods.toJSON = function () {
  const user: IUser = this.toObject();
  delete user.password;
  return user;
}

UserSchema.statics.checkIfEmailIsAvailable = async function (email: string) {
  return this.findOne({email}).exec();
}

export interface IUserModel extends Model<IUser> {
  checkIfEmailIsAvailable(email: string): Promise<IUser>
}

export default model<IUser, IUserModel>("User", UserSchema);