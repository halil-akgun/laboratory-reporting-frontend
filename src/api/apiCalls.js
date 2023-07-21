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

export const getUsers = () => {
    return axios.get('/users/getUsers');
}