import Api, { METHOD } from './interceptor';

export const POST_LOGIN = (form) => {
	return Api({
		method: METHOD.POST,
		url: 'users/login',
		data: form,
	});
};
