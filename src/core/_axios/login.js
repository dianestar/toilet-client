import Api, { METHOD } from './interceptor';

export const POST_LOGIN = (form) => {
	return Api({
		method: METHOD.POST,
		url: 'users/login',
		data: form,
	});
};

export const KAKAO_LOGIN = (code) => {
	return Api({
		method: METHOD.GET,
		url: `auth/kakao/redirect${code}`,
	});
};
