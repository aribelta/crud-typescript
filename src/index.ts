import {Sequelize} from 'sequelize';
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { initModels,Product, ProductCreationAttributes, Order, OrderCreationAttributes } from './models/init-models';
import {v4 as uuidv4} from 'uuid';




const typeProd = readFileSync("./src/schema/prod.graphql").toString('utf-8');
const typeOrder = readFileSync("./src/schema/order.graphql").toString('utf-8');

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

const resolvers = {
    Query: {
        GetAllProduct: async() => await Product.findAll(),
		GetAllOrder: async() => await Order.findAll(),
    },
	Mutation: {
		GetDetailProduct: async(_parent:any, args:any) => {
			return await Product.findByPk(args.id);
		},
		CreateProduct: async(_parent: any, args:any) => {
			const now = new Date();
			
			const newProduct: ProductCreationAttributes = await {
				name: args.name,
				stock: args.stock,
				price: args.price,
				created: now,
			}
			return  Product.create(newProduct);
		},
		UpdateProduct: async (_parent: any,args: any) => {
			const now = new Date();
			const updateProduct: ProductCreationAttributes = {
			  name: args.name,
			  stock: args.stock,
			  price: args.price,
			  created: now,
			};
			const updatedata = await Product.update(updateProduct, {
			  where: {
				id: args.id,
			  },
			});
	  
			if (!updatedata) return "Tidak Menemukan Data";
			return updatedata;
		  },
		DeleteProduct: async(_parent:any, args:any) => {
			
			const delProduct = await Product.destroy({
				where: {
					id: args.id,
				}
			});
			if(!delProduct) return "Id Tidak Ditemukan";
			return delMessage;
		},
		CreateOrder: async(_parent:any, args:any) => {
			const now = new Date();
			const createOrders: OrderCreationAttributes = await {
				transcode: uuidv4(),
				created : now
			}
			return Order.create(createOrders);
		}
	}

}

// import models into sequelize instance
const server = new ApolloServer({
    typeDefs : [typeProd, typeOrder],
    resolvers,
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
