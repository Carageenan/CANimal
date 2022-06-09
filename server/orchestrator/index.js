const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const urlUser = "https://canimal-services-users.herokuapp.com";
const urlProduct = "https://canimal-services-app.herokuapp.com";
const PORT = process.env.PORT || 4000;
const redis = require("./config/redis.js");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
    createdAt: String
    updatedAt: String
    idSQL: Int
  }

  type Image {
    id: ID
    productId: Int
    imgUrl: String
    createdAt: String
    updatedAt: String
  }

  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: Int
    userMongoId: String
    createdAt: String
    updatedAt: String
    author: User
    Images: [Image]
  }

  type Category {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    users: [User]
    user(id: ID): User
    products(page: String, size: String, search: String, filter: String): [Product]
    product(id: ID): Product
    productByCategory(category: String): [Product]
    categories: [Category]
  }

  type Mutation {
    createUser(username: String, email: String, password: String, phoneNumber: String, address: String): String
    deleteUser(id: ID): String
    createProduct(name: String, description: String, price: Int, mainImg: String, categoryId: Int, anotherImg: String): String
    updateProduct(id: ID, name: String, description: String, price: Int, mainImg: String, categoryId: Int, anotherImg: String): String
    deleteProduct(id: ID): String
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: async () => {
      try {
        const userCache = await redis.get("userCache");
        if (userCache) {
          return JSON.parse(userCache);
        } else {
          const response = await axios.get(`${urlUser}/user`);
          const data = response.data;
          redis.set("userCache", JSON.stringify(data));
          return response.data;
        }
      } catch (error) {
        return error;
      }
    },
    user: async (_, args) => {
      try {
        const response = await axios.get(`${urlUser}/user/${args.id}`);
        console.log(response.data);
        return response.data;
      } catch (error) {
        return error;
      }
    },
    products: async (_, args) => {
      const { filter, page, size } = args;
      if (filter && filter !== "") {
        const response = await axios.get(`${urlProduct}/product?page=${+page}&size=${+size}&filter=${filter}`);
        return response.data;
      } else {
        const productsCache = await redis.get("productsCache");
        if (productsCache) {
          return JSON.parse(productsCache);
        } else {
          const response = await axios.get(`${urlProduct}/product`);
          const data = response.data;
          redis.set("productsCache", JSON.stringify(data));
          return response.data;
        }
      }
    },
    product: async (_, args) => {
      try {
        const response = await axios.get(`${urlProduct}/product/${args.id}`);
        const author = await axios.get(`${urlUser}/user/${response.data.userMongoId}`);
        return { ...response.data, author: author.data };
      } catch (error) {
        return error;
      }
    },
    productByCategory: async (_, args) => {
      try {
        const response = await axios.get(`${urlProduct}/product/category/${args.category}`);
        return response.data;
      } catch (error) {
        return error;
      }
    },
    categories: async () => {
      const categoriesCache = await redis.get("categoriesCache");
      if (categoriesCache) {
        return JSON.parse(categoriesCache);
      } else {
        const response = await axios.get(`${urlProduct}/category`);
        const data = response.data;
        redis.set("categoriesCache", JSON.stringify(data));
        return response.data;
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const response = await axios({
          method: "POST",
          url: `${urlUser}/user`,
          data: {
            username: args.username,
            email: args.email,
            password: args.password,
            phoneNumber: args.phoneNumber,
            address: args.address,
          },
        });
        return "Success add User";
      } catch (error) {
        return "Something went wrong";
      }
    },
    deleteUser: async (_, args) => {
      try {
        const response = await axios({
          method: "DELETE",
          url: `${urlUser}/user/${args.id}`,
        });
        return "Success delete User";
      } catch (error) {
        return "Something went wrong";
      }
    },
    createProduct: async (_, args) => {
      try {
        const response = await axios({
          method: "POST",
          url: `${urlProduct}/product`,
          data: {
            name: args.name,
            description: args.description,
            price: args.price,
            mainImg: args.mainImg,
            categoryId: args.categoryId,
            anotherImg: args.anotherImg,
          },
        });
        return "Success add Product";
      } catch (error) {
        return "Something went wrong";
      }
    },
    updateProduct: async (_, args) => {
      try {
        const response = await axios({
          method: "PUT",
          url: `${urlProduct}/product/${args.id}`,
          data: {
            name: args.name,
            description: args.description,
            price: args.price,
            mainImg: args.mainImg,
            categoryId: args.categoryId,
            anotherImg: args.anotherImg,
          },
        });
        return "Success update Product";
      } catch (error) {
        return "Something went wrong";
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const response = await axios({
          method: "DELETE",
          url: `${urlProduct}/product/${args.id}`,
        });
        return "Success delete Product";
      } catch (error) {
        return "Something went wrong";
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
