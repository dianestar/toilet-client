import Api, { METHOD } from './interceptor';

export const GET_USERS = () => {
	return Api({
		method: METHOD.GET,
		url: 'users',
	});
};
