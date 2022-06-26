import Api, { METHOD } from './interceptor';

export const AROUND_TOILET = (form) => {
	return Api({
		method: METHOD.POST,
		url: "toilets/around_toilet",
        data: form,
	});
};
