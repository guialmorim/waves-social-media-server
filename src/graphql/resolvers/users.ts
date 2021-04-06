import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';

import {
	validateLoginInput,
	validateRegisterInput,
} from '../../util/validators';
import User, { IUser } from '../../models/User';
import { generateToken } from '../../helpers/jwt';

export default {
	Query: {},
	Mutation: {
		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('errors', { errors });
			}

			const user: IUser = await User.findOne({ username });

			if (!user) {
				errors.general = 'Usuario não encontrado';
				throw new UserInputError('Usuario não encontrado', { errors });
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				errors.general = 'Credenciais Inválidas';
				throw new UserInputError('Credenciais Inválidas', { errors });
			}

			const token = generateToken(user);

			return {
				//@ts-ignore
				...user._doc,
				token,
			};
		},
		async register(
			_,
			{ registerInput: { username, email, password, confirmPassword } }
		) {
			// validate user data
			const { errors, valid } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('errors', {
					errors,
				});
			}
			// Make sure user doesnt already exists
			const user = await User.findOne({ username });

			if (user) {
				throw new UserInputError('Usuário já existe', {
					errors: {
						username: 'Este nome de usuário ja existe',
					},
				});
			}

			// Hash password and create auth token
			password = await bcrypt.hash(password, 12);

			const newUser: Document & IUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const userDoc = await newUser.save();

			const token = generateToken(userDoc);

			return {
				//@ts-ignore
				...userDoc._doc,
				token,
			};
		},
	},
};
