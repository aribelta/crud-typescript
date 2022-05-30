import { Product, ProductCreationAttributes} from '../models/init-models'

var delMessage = {
	message: "Berhasil Hapus Data",
  };
const prodSolver = {
  Query: {
        GetAllProduct: async() => await Product.findAll(),
    },
	Mutation: {
		GetDetailProduct: async(_parent:any, args:any) => {
			return await Product.findByPk(args.id);
		},
		CreateProduct: async(_parent: any, args:any) => {
			const now = new Date();
			const newProduct: ProductCreationAttributes =  {
				name: args.name,
				stock: args.stock,
				price: args.price,
				created: now.toDateString(),
			}
			return await Product.create(newProduct);
		},
		UpdateProduct: async (_parent: any,args: any) => {
			const now = new Date();
			const updateProduct: ProductCreationAttributes = {
			  name: args.name,
			  stock: args.stock,
			  price: args.price,
			  created: now.toDateString(),
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
	}
}

export default prodSolver;