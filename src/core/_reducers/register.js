const userInfo = {
	email: '',
	password: '',
	checkPassword: '',
};

export const SAVE_USER = 'SAVE_USER';

export const saveUser = (data) => {
	return {
		type: SAVE_USER,
		data,
	};
};

const register = (state = userInfo, action) => {
	switch (action.type) {
		case SAVE_USER:
			return {
				...state,
				email: action.data.email,
				password: action.data.password,
				checkPassword: action.data.checkPassword,
			};
		default:
			return state;
	}
};

export default register;
