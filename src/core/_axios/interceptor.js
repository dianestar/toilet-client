import axios from 'axios';

const instance = axios.create({
	baseURL: "http://3.35.184.107:5000/api/",
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers = {
				Authorization: `Bearer ${token}`,
			};
		}

		return config;
	},
	(err) => Promise.reject(err),
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		if (err.response.status === 401) {
			const token = localStorage.getItem('access_token');
			if (token) {
				localStorage.removeItem('access_token');
				return;
			}
			return;
		}
	},
);

export const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

export default instance;
