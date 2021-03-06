import Api, { METHOD } from "./interceptor";

export const POST_USERS_REGISTER = (form) => {
    return Api({
        method: METHOD.POST,
        url: "users/register",
        data: form,
    });
};

export const POST_USERS_UPLOAD = (form) => {
    return Api({
        method: METHOD.POST,
        url: "users/upload",
        data: form,
    });
};

export const CHECK_EMAIL = (form) => {
    return Api({
        method: METHOD.POST,
        url: "users/check_email",
        data: form,
    });
};