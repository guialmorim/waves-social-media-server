import { AuthenticationError } from 'apollo-server';

import { JwtPayload } from '../../helpers/jwt';
import Post, { IPost } from '../../models/Post';
import { checkAuth } from '../../util/checkAuth';

export default {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find().sort({ createdAt: -1 });
				return posts;
			} catch (error) {
				throw new Error(error);
			}
		},
		async getPost(_, { postId }) {
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error('Post not found');
				}
			} catch (error) {
				throw new Error(error);
			}
		},
	},
	Mutation: {
		async createPost(_, { body }, context) {
			const user: JwtPayload = checkAuth(context);

			if (body.trim() === '') {
				throw new Error('corpo do post não pode ser vazio');
			}

			const newPost: IPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
			});
			const post = await newPost.save();
			return post;
		},
		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);
			try {
				const post: IPost = await Post.findById(postId);
				if (user?.username === post?.username) {
					await post.delete();
					return 'Post deletado com sucesso';
				} else {
					throw new AuthenticationError('Ação não permitida');
				}
			} catch (error) {
				throw new Error(error);
			}
		},
	},
};
