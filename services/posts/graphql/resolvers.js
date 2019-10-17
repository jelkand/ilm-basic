const resolvers = {
  Post: {
    __resolveReference: (object, { dataService }) =>
      dataService.posts.find(post => post.id === object.id),
    user: post => ({ __typename: 'User', id: post.userId }),
  },
  User: {
    posts: ({ id }, args, { dataService }) =>
      dataService.posts.filter(post => post.userId === id),
  },
}

module.exports = resolvers
