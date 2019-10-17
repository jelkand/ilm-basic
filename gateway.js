const { ApolloServer } = require('apollo-server')
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway')
// cheating for demo purposes--in the real world (TM) we'd use a rest call or a protected query
const { sessionToJWT } = require('./services/users/auth')

const PORT = 3000

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('authorization', context.jwt)
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:3001/graphql' },
    { name: 'posts', url: 'http://localhost:3002/graphql' },
  ],
  buildService({ url }) {
    return new AuthenticatedDataSource({ url })
  },
})

;(async () => {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    debug: true,
    context: ({ req }) => {
      // client sends in a stateful session token
      const token = req.headers.authorization || ''

      // reach out to our auth service, validate stateful token
      // convert to a stateless token that expires in a few seconds
      const jwt = sessionToJWT(token)
      console.log('jwt', jwt)

      // add the token to the context
      return { jwt }
    },
  })

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`Gateway ready at ${url}`)
  })
})()
