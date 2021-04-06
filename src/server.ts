// Configuring the enviroment variables
require('dotenv').config();

// Dependency Imports
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

// Relative Imports
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGODB_URI || '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MOngoDB Conected');
		return server.listen({ port: PORT });
	})
	.then((res) => {
		console.log(`server running at ${res.url}`);
	})
	.catch((err) => {
		console.log(`error starting server`);
		console.log(`Stack: ${err}`);
	});
