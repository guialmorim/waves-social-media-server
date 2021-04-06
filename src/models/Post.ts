import { model, Schema, Document } from 'mongoose';

// interfaces
import { IComment } from './Comment';
import { ILike } from './Like';
import { IUser } from './User';

export interface IPost extends Document {
	body: string;
	username: string;
	createdAt: string;
	comments: IComment[];
	likes: ILike[];
	user: IUser;
}

const PostSchema = new Schema<IPost>({
	body: String,
	username: String,
	createdAt: String,
	comments: [
		{
			id: String,
			body: String,
			username: String,
			createdAt: String,
		},
	],
	likes: [
		{
			id: String,
			username: String,
			createdAt: String,
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
});

export default model('Post', PostSchema);
