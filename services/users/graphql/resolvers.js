const resolvers = {
  Query: {
    user: (parent, { id }, { dataService }) =>
      dataService.users.find(user => user.id === id),
  },
  User: {
    __resolveReference: ({ id }, { dataService }) =>
      dataService.users.find(loan => loan.id === id),
  },
}

module.exports = resolvers
