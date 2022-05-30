import { OrderDetail } from "../models/OrderDetail";

const OrderDetails = {
    Query: {
        OrderDetail: async() => await OrderDetail.findAll(),
    }
}

export default OrderDetails;