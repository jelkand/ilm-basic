const { gql } = require('apollo-server')

const schema = gql`
  extend type Query {
    user(id: ID!): User
  }
  type User @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String
  }
`

module.exports = schema
