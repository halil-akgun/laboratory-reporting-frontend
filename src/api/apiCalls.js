import axios from "axios";

export const register = (body) => {
    return axios.post('/assistants/save', body);
} // export: to make it accessible from outside

export const changeLanguage = language => {
    axios.defaults.headers['Accept-Language'] = language;
}