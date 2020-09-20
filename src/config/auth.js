const jwt_decode = require('jwt-decode');

export const isAuthenticated = () => localStorage.getItem("TOKEN_KEY") !== null;

export const isAdmin = () => {
    if (isAuthenticated()) {
        const token = jwt_decode(getToken());
        if (token.user.role === "admin") {
            return true;
        }
    }
    return false;
}

export const isManager = () => {
    if (isAuthenticated()) {
        const token = jwt_decode(getToken());
        if (token.user.role === "admin" || token.user.role === "manager") {
            return true;
        }
    }
    return false;
}

export const getToken = () => localStorage.getItem("TOKEN_KEY");

export const decodeToken = () => {
    if (localStorage.getItem("TOKEN_KEY"))
        return jwt_decode(localStorage.getItem("TOKEN_KEY"));
    return null;
};