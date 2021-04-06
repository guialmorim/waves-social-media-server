import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { JwtPayload } from '../helpers/jwt';

export function checkAuth(context) {
	const authHeader = context.req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split('Bearer ')[1];
		if (token) {
			try {
				const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
				return user as JwtPayload;
			} catch (error) {
				throw new AuthenticationError('Token Invalido/Expirado');
			}
		}
		throw new Error("Token de autenticação deve ser 'Bearer [token]'");
	}
	throw new Error('Header de autorização deve ser fornecido');
}
