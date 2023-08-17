import axios from "axios";

export const register = (body) => {
    return axios.post('/users/save', body);
} // export: to make it accessible from outside

export const changeLanguage = language => {
    axios.defaults.headers['Accept-Language'] = localStorage.getItem('lang') || language;
}

export const login = creds => {
    return axios.post('/auth', {}, { auth: creds });
}

export const getUsers = (page = 0, size = 5, username, password) => {
    return axios.get(`/users/getAllUsers?page=${page}&size=${size}&sort=name,surname,id,ASC`, { auth: { username, password } });
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else delete axios.defaults.headers['Authorization'];
}

export const getUser = username => {
    return axios.get(`/users/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/users/${username}`, body);
}

export const saveReport = (body) => {
    return axios.post('/reports/save', body);
}

export const getAllReports = (page = 0, sortColumn = 'fileNumber', sortOrder = 'ASC', myReports = '', username, password) => {
    return axios.get(`/reports/getAllReports?page=${page}&size=10&sort=${sortColumn},${sortOrder}&myReports=${myReports}`, { auth: { username, password } });
}

export const searchInReports = (page = 0, sortColumn = 'fileNumber', sortOrder = 'ASC', searchTerm, startDate, endDate, myReports = null, username, password) => {
    return axios.get(`/reports/searchInReports?page=${page}&size=10&sort=${sortColumn},${sortOrder}&searchTerm=${searchTerm}&startDate=${startDate}&endDate=${endDate}&myReports=${myReports}`, { auth: { username, password } });
}

export const deleteUser = (username, keepReports) => {
    return axios.delete(`/users/delete/${username}?keepReports=${keepReports}`);
}

export const getReport = (id) => {
    return axios.get(`/reports/getReport/${id}`);
}

export const updateReport = (id, removeImage, body) => {
    return axios.put(`/reports/updateReport/${id}?removeImage=${removeImage}`, body);
}

export const deleteReport = (id) => {
    return axios.delete(`/reports/delete/${id}`);
}
