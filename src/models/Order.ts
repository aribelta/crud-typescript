import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OrderDetail, OrderDetailId } from './OrderDetail';

export interface OrderAttributes {
  id: number;
  transcode: string;
  created: Date;
}

export type OrderPk = "id";
export type OrderId = Order[OrderPk];
export type OrderOptionalAttributes = "id";
export type OrderCreationAttributes = Optional<OrderAttributes, OrderOptionalAttributes>;

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  id!: number;
  transcode!: string;
  created!: Date;

  // Order hasMany OrderDetail via Order_id
  orderdetails!: OrderDetail[];
  getOrderdetails!: Sequelize.HasManyGetAssociationsMixin<OrderDetail>;
  setOrderdetails!: Sequelize.HasManySetAssociationsMixin<OrderDetail, OrderDetailId>;
  addOrderdetail!: Sequelize.HasManyAddAssociationMixin<OrderDetail, OrderDetailId>;
  addOrderdetails!: Sequelize.HasManyAddAssociationsMixin<OrderDetail, OrderDetailId>;
  createOrderdetail!: Sequelize.HasManyCreateAssociationMixin<OrderDetail>;
  removeOrderdetail!: Sequelize.HasManyRemoveAssociationMixin<OrderDetail, OrderDetailId>;
  removeOrderdetails!: Sequelize.HasManyRemoveAssociationsMixin<OrderDetail, OrderDetailId>;
  hasOrderdetail!: Sequelize.HasManyHasAssociationMixin<OrderDetail, OrderDetailId>;
  hasOrderdetails!: Sequelize.HasManyHasAssociationsMixin<OrderDetail, OrderDetailId>;
  countOrderdetails!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Order {
    return Order.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transcode: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
