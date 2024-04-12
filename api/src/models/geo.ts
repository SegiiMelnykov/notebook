import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { LanguageType, CountryType } from "../types/geo";

interface LanguageModel
  extends Model<
      InferAttributes<LanguageModel>,
      InferCreationAttributes<LanguageModel>
    >,
    LanguageType {}

export const Language = sequelize.define<LanguageModel>("language", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  code: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  nativeName: { type: DataTypes.STRING },
});

interface CountryModel
  extends Model<
      InferAttributes<CountryModel>,
      InferCreationAttributes<CountryModel>
    >,
    CountryType {}

export const Country = sequelize.define<CountryModel>("country", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
  code: { type: DataTypes.STRING },
  iso: { type: DataTypes.STRING },
});
