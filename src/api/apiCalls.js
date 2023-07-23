import axios from "axios";

export const register = (body) => {
    return axios.post('/users/save', body);
} // export: to make it accessible from outside

export const changeLanguage = language => {
    axios.defaults.headers['Accept-Language'] = language;
}

export const login = creds => {
    return axios.post('/auth', {}, { auth: creds });
}

export const getUsers = (page = 0, size = 5, username, password) => {
    return axios.get(`/users/getUsers?page=${page}&size=${size}`, { auth: { username, password } });
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else delete axios.defaults.headers['Authorization'];
}
