const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const mockDataService = require('./dataService/mockDataService')

const PORT = 3002

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
  context: { dataService: mockDataService },
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Running the post service at ${url}`)
})
