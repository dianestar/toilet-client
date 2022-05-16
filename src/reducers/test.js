const initialState = {
    num: 0,
    content: "default",
};

export const PLUS_NUM = "PLUS_NUM";
export const MINUS_NUM = "MINUS_NUM";

export const plusNum = (data) => {
    return {
        type: PLUS_NUM,
        data,
    }
};

export const minusNum = (data) => {
    return {
        type: MINUS_NUM,
        data,
    }
}

const test = (state = initialState, action) => {
    switch (action.type) {
        case PLUS_NUM:
            return {
                ...state,
                num: state.num + action.data,
            };
        case MINUS_NUM:
            return {
                ...state,
                num: state.num - action.data,
            };
        default:
            return state;
    }
};

export default test;