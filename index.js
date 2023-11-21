const { ApolloServer } = require("apollo-server"); // Import Apollo Server from apollo-server
const { importSchema } = require("graphql-import"); // Import importSchema method from graphql-import
const EtherDataSource = require("./datasource/ethDatasource"); // Import EtherDataSource class 

const typeDefs = importSchema("./schema.graphql"); // Import schema from schema.graphql file

require("dotenv").config(); // Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance for an address
      dataSources.ethDataSource.etherBalanceByAddress(), 

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest ether price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get average block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({ // Create Apollo Server instance
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Pass EtherDataSource instance to dataSources
  }), 
});

server.timeout = 0; 

server.listen("9000").then(({ url }) => { // Start Apollo Server on port 9000
  console.log(`🚀 Server ready at ${url}`); 
});