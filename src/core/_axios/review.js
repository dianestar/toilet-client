import Api, { METHOD } from './interceptor';

export const POST_REVIEW = (form) => {
    return Api({
        method: METHOD.POST,
        url: "reviews/additional",
        data: form,
    });
};

export const POST_IMAGE = (form) => {
    return Api({
        method: METHOD.POST,
        url: "reviews/upload",
        data: form,
        headers: {"Content-Type": "multipart/form-data"},
    })
}