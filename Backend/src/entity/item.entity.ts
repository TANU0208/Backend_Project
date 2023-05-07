import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/db';
import { ItemAttributes } from '../constants/Models.const';

interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {}

class ItemEntity extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public id!: number;
  public title!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ItemEntity.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'items',
    sequelize,
  }
);

export { ItemEntity };
