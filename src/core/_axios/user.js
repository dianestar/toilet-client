import Api, { METHOD } from './interceptor';

export const GET_USERS = (token) => {
	return Api({
		method: METHOD.GET,
		url: 'users',
		headers: { Authorization: `Bearer ${token}` },
	});
};
