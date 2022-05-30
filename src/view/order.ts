
import {Order,OrderCreationAttributes} from '../models/init-models';
import {v4 as uuidv4} from 'uuid';

const orderSolve = {
   Query: {
   GetAllOrder: async () => await Order.findAll(),
   },
   Mutation: {
    CreateOrder: async(_parent: any, args:any) => {
        const now = new Date();
        const newOrder: OrderCreationAttributes = await {
           transcode: uuidv4(),
           created: now.toDateString()
        }
        return  Order.create(newOrder);
    },
   }
}
export default orderSolve;