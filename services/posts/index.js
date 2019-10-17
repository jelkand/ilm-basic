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
  context: ({ req }) => {
    // client sends in a stateless JWT
    const mockAuth = req.headers.authorization || ''
    // verify user
    console.log('mockAuth', mockAuth)
    // add the user to the context
    return { dataService: mockDataService, mockAuth }
  },
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Running the post service at ${url}`)
})
