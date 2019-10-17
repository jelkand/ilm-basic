const { ApolloServer } = require('apollo-server')
const { ApolloGateway } = require('@apollo/gateway')

const PORT = 3000
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:3001/graphql' },
    { name: 'posts', url: 'http://localhost:3002/graphql' },
  ],
})

;(async () => {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    debug: true,
  })

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`Gateway ready at ${url}`)
  })
})()
