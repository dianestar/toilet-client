const info = {
	nickname: '',
	imgUrl: '',
	email: '',
};

export const PROFILE_INFO = 'PROFILE_INFO';

//action
export const profile = (data) => {
	return {
		type: PROFILE_INFO,
		data,
	};
};

//reducer
const profileInfo = (state = info, action) => {
	switch (action.type) {
		case PROFILE_INFO:
			localStorage.removeItem("persist:root");
			return {
				...state,
				nickname: action.data.nickname,
				imgUrl: action.data.imgUrl,
				email: action.data.email,
			};
		default:
			return state;
	}
};

export default profileInfo;
