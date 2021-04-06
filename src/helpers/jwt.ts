import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface JwtPayload {
	id: string;
	email: string;
	username: string;
}

export function generateToken(user: IUser) {
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			username: user.username,
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '1h' }
	);
}
