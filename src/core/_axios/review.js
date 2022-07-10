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

export const GET_TOILET_REVIEWS =(form) => {
    return Api({
        method: METHOD.POST,
        url: "reviews/toilet",
        data: form,
    });
};

export const DELETE_IMAGE = (form) => {
    return Api({
        method: METHOD.POST,
        url: "reviews/photo_delete",
        data: form,
    });
};

export const DELETE_REVIEW = (id) => {
    return Api({
        method: METHOD.DELETE,
        url: `reviews/delete/${id}`,
    });
};

export const REVIEW_DELETE_REQUEST = (form) => {
    return Api({
        method: METHOD.POST,
        url: "reviews/report",
        data: form,
    });
};

export const PATCH_REVIEW = (form) => {
    return Api({
        method: METHOD.PATCH,
        url: "reviews/modify",
        data: form,
    });
};