import { ApolloServer } from 'apollo-server-micro'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import connectToPostgres from '../../../models/index';

const db = connectToPostgres();

console.log("after getting db in api");

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default apolloServer.createHandler({ path: '/api/graphql' })

