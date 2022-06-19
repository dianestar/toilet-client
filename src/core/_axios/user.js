import Api, { METHOD } from './interceptor';

export const GET_USERS = () => {
	return Api({
		method: METHOD.GET,
		url: 'users',
	});
};

export const PATCH_USERS = (form) => {
	return Api({
		method: METHOD.PATCH,
		url: 'users/modify_nickname',
		data: form,
	});
};

export const PATCH_MODIFY_PASSWORD = (form) => {
	return Api({
		method: METHOD.PATCH,
		url: 'users/modify_password',
		data: form,
	});
};
