import PostResolvers from './posts';
import UserResolvers from './users';
import CommentResolvers from './comments';

export const resolvers = {
	Post: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length,
	},
	Query: {
		...UserResolvers.Query,
		...PostResolvers.Query,
		...CommentResolvers.Query,
	},
	Mutation: {
		...UserResolvers.Mutation,
		...PostResolvers.Mutation,
		...CommentResolvers.Mutation,
	},
};
