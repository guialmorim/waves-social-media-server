import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
	username: string;
	password: string;
	email: string;
	createdAt: string;
}

const UserSchema = new Schema<IUser>({
	username: String,
	password: String,
	email: String,
	createdAt: String,
});

export default model('User', UserSchema);
