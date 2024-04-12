import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { UserType } from "../types/user";

interface UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
    UserType {}

export const User = sequelize.define<UserModel>("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});
