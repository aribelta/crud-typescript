import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderDetailAttributes {
  id: number;
  productid: number;
  quantity: number;
  price: number;
  Order_id: number;
}

export type OrderDetailPk = "id";
export type OrderDetailId = OrderDetail[OrderDetailPk];
export type OrderDetailOptionalAttributes = "id";
export type OrderDetailCreationAttributes = Optional<OrderDetailAttributes, OrderDetailOptionalAttributes>;

export class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> implements OrderDetailAttributes {
  id!: number;
  productid!: number;
  quantity!: number;
  price!: number;
  Order_id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof OrderDetail {
    return OrderDetail.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'OrderDetail',
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
      {
        name: "fk_OrderDetail_Order_idx",
        using: "BTREE",
        fields: [
          { name: "Order_id" },
        ]
      },
    ]
  });
  }
}
