import { TNote, TTodo } from 'types/note';
import sequelize from '../config/db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface NoteModel
  extends Model<InferAttributes<NoteModel>, InferCreationAttributes<NoteModel>>,
    TNote {}

export const Note = sequelize.define<NoteModel>('note', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  parentId: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT },
  notesPerPage: { type: DataTypes.INTEGER, defaultValue: 0 },
  userId: { type: DataTypes.INTEGER },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  deletedAt: { type: DataTypes.DATE },
  sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  homeHidden: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
});

export interface ToDoModel
  extends Model<InferAttributes<ToDoModel>, InferCreationAttributes<ToDoModel>>,
    TTodo {}

export const ToDo = sequelize.define<ToDoModel>('todo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  noteId: {
    type: DataTypes.UUID,
    unique: true,
  },
  completionDate: { type: DataTypes.DATE },
  createdAt: { type: DataTypes.DATE },
  userId: { type: DataTypes.INTEGER },
  updatedAt: { type: DataTypes.DATE },
});

// Define the association between Todo and Note
ToDo.belongsTo(Note, {
  foreignKey: 'noteId',
  as: 'note',
});
