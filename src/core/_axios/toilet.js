import Api, { METHOD } from './interceptor';

export const AROUND_TOILET = (form) => {
	return Api({
		method: METHOD.POST,
		url: 'toilets/around_toilet',
		data: form,
	});
};

export const ADDITIONAL = (form) => {
	return Api({
		method: METHOD.POST,
		url: 'toilets/additional',
		data: form,
	});
};

export const TOILET_DELETE_REQUEST = (form) => {
	return Api({
		method: METHOD.POST,
		url: "toilets/report",
		data: form,
	});
};

export const GET_ONE_TOILET =(form) => {
	return Api({
		method: METHOD.POST,
		url: "toilets",
		data: form
	});
};