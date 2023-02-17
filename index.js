import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { books, users } from "./database/mock"

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  # graphql
  # This "Book" type defines the queryable fields for every book in our data source.

  type Book {
    title: String
    author: String
  }

  type User {
    name: String
    email: String
    projects: [Project]
  }

  type Project {
    title: String
    active: Boolean
    members: [User]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.

  type Query {
    books: [Book],
    users: [User]
  }
`

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    users: () => users,
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
