import gql from 'graphql-tag';

export const typeDefs = gql`
	type Post {
		_id: ID!
		body: String!
		username: String!
		createdAt: String!
		comments: [Comment]!
		likes: [Like]!
		likeCount: Int!
		commentCount: Int!
	}

	type User {
		_id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}

	type Comment {
		_id: ID!
		createdAt: String!
		username: String!
		body: String!
	}

	type Like {
		_id: ID!
		createdAt: String!
		username: String!
	}

	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): String!
		createComment(postId: String!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
		likePost(postId: ID!): Post!
	}
`;
