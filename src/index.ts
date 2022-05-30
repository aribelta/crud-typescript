import {Sequelize} from 'sequelize';
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { initModels,Product, ProductCreationAttributes, Order, OrderCreationAttributes } from './models/init-models';
import prodSolver from './view/product';
import orderSolve from './view/order';
import OrderDetails from './view/orderdetail';


const typeProd = readFileSync("./src/schema/prod.graphql").toString('utf-8');
const typeOrder = readFileSync("./src/schema/order.graphql").toString('utf-8');
const typeDetail = readFileSync("./src/schema/orderdetail.graphql").toString('utf-8');

dotenv.config();
console.log(process.env);

const sequelize = new Sequelize(
	process.env.DB_NAME as string, 
	process.env.DB_USER as string, 
	process.env.DB_PASS as string, {
		host: process.env.DB_HOST as string,
		dialect: 'mysql'
});

initModels(sequelize);

var delMessage = {
	message: "Berhasil Hapus Data",
  };

// import models into sequelize instance
const server = new ApolloServer({
    typeDefs : [typeProd,typeOrder, typeDetail],
    resolvers : [prodSolver,orderSolve, OrderDetails],
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
