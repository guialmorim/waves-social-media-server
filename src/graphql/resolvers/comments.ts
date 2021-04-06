import { AuthenticationError, UserInputError } from 'apollo-server';

import Post, { IPost } from '../../models/Post';
import { checkAuth } from '../../util/checkAuth';

export default {
	Query: {},
	Mutation: {
		async createComment(_, { postId, body }, context) {
			const { username } = checkAuth(context);
			if (body.trim() === '') {
				throw new UserInputError('Comentário vazio', {
					errors: {
						body: 'corpo do comentário não pode estar vazio',
					},
				});
			}

			const post: IPost = await Post.findById(postId);

			if (post) {
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});
				await post.save();
				return post;
			} else throw new UserInputError('Post não encontrado');
		},
		async deleteComment(_, { postId, commentId }, context) {
			const { username } = checkAuth(context);
			const post: IPost = await Post.findById(postId);
			if (post) {
				const commentIndex = post.comments.findIndex(
					(com) => com._id == commentId
				);

				if (commentIndex < 0)
					throw new UserInputError('Comentario não encontrado');

				if (post.comments[commentIndex].username === username) {
					post.comments.splice(commentIndex, 1);
					await post.save();
					return post;
				} else throw new AuthenticationError('Ação não permitida');
			} else throw new UserInputError('Post não encontrado');
		},
		async likePost(_, { postId }, context) {
			const { username } = checkAuth(context);
			const post: IPost = await Post.findById(postId);
			if (post) {
				if (post.likes.find((like) => like.username === username)) {
					// // Post already liked, unlike it
					post.likes = post.likes.filter((like) => like.username !== username);
				} else {
					// // Not liked, like it
					post.likes.push({
						username,
						createdAt: new Date().toISOString(),
					});
				}
				await post.save();
				return post;
			} else throw new UserInputError('Post não encontrado');
		},
	},
};
