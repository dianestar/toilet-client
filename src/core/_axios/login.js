import Api, { METHOD } from './interceptor';

export const POST_LOGIN = (form) => {
	return Api({
		method: METHOD.POST,
		url: 'users/login',
		data: form,
	});
};

export const REDIRECT_KAKAO = () => {
	return Api({
		method: METHOD.get,
		url: `auth/kakao/redirect`,
	});
};
