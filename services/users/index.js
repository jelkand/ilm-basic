const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const mockDataService = require('./dataService/mockDataService')

const PORT = 3001

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
    // try to retrieve a user with the token
    console.log('mockAuth', mockAuth)
    // add the user to the context
    return { dataService: mockDataService, mockAuth }
  },
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Running the user service at ${url}`)
})
