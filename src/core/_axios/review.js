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
    });
};

export const GET_USER_REVIEWS = () => {
    return Api({
        method: METHOD.GET,
        url: "reviews",
    });
};

export const DELETE_REVIEW = (id) => {
    return Api({
        method: METHOD.DELETE,
        url: `reviews/delete/${id}`
    })
}