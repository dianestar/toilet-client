import Api, { METHOD } from './interceptor';

export const POST_REVIEW = (form) => {
    return Api({
        method: METHOD.POST,
        url: "reviews/additional",
        data: form,
    });
};