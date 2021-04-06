interface ErrorObject {
	general?: string;
	username?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

export const validateRegisterInput = (
	username: string,
	email: string,
	password: string,
	confirmPassword: string
) => {
	const errors: ErrorObject = {};

	if (username.trim() === '') {
		errors.username = 'Username não pode ser vazio';
	}

	if (password === '') {
		errors.password = 'A senha não pode ser vazia';
	} else if (password !== confirmPassword) {
		errors.password = 'As senhas devem ser iguais';
	}

	if (email.trim() === '') {
		errors.email = 'Email não pode ser vazio';
	} else {
		const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!email.match(regEx)) {
			errors.email = 'Endereço de email inválido';
		}
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

export const validateLoginInput = (username: string, password: string) => {
	const errors: ErrorObject = {};

	if (username.trim() === '') {
		errors.username = 'Username não pode ser vazio';
	}

	if (password === '') {
		errors.password = 'A senha não pode ser vazia';
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
