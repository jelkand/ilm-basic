const { gql } = require('apollo-server')

const schema = gql`
  type Post @key(fields: "id") {
    id: ID!
    user: User!
    body: String!
  }
  extend type User @key(fields: "id") {
    id: ID! @external
    posts: [Post]!
  }
`

module.exports = schema
