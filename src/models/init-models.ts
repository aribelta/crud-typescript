import type { Sequelize } from "sequelize";
import { Order as _Order } from "./Order";
import type { OrderAttributes, OrderCreationAttributes } from "./Order";
import { OrderDetail as _OrderDetail } from "./OrderDetail";
import type { OrderDetailAttributes, OrderDetailCreationAttributes } from "./OrderDetail";
import { Product as _Product } from "./Product";
import type { ProductAttributes, ProductCreationAttributes } from "./Product";

export {
  _Order as Order,
  _OrderDetail as OrderDetail,
  _Product as Product,
};

export type {
  OrderAttributes,
  OrderCreationAttributes,
  OrderDetailAttributes,
  OrderDetailCreationAttributes,
  ProductAttributes,
  ProductCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Order = _Order.initModel(sequelize);
  const OrderDetail = _OrderDetail.initModel(sequelize);
  const Product = _Product.initModel(sequelize);

  OrderDetail.belongsTo(Order, { as: "Order", foreignKey: "Order_id"});
  Order.hasMany(OrderDetail, { as: "orderdetails", foreignKey: "Order_id"});

  return {
    Order: Order,
    OrderDetail: OrderDetail,
    Product: Product,
  };
}
