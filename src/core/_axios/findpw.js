import Api, { METHOD } from "./interceptor";

export const POST_REDIRECT = (form) => {
    return Api({
        method: METHOD.POST,
        url: "users/redirect",
        data: form,
    });
}

export const PATCH_RESET_PASSWORD = (form) => {
    return Api({
        method: METHOD.PATCH,
        url: "users/reset_password",
        data: form,
    });
}