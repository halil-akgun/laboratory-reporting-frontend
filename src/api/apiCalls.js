import axios from "axios";

export const register = (body) => {
    return axios.post('/users/save', body);
} // export: to make it accessible from outside

export const changeLanguage = language => {
    axios.defaults.headers['Accept-Language'] = localStorage.getItem('lang') || language;
}

export const login = creds => {
    return axios.post('/auth', creds);
}

export const logout = () => {
    return axios.post('/logout2');
}

export const getUsers = (page = 0, size = 5) => {
    return axios.get(`/users/getAllUsers?page=${page}&size=${size}&sort=name,surname,id,ASC`);
}

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Bearer ${token}`;
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

export const getAllReports = (page = 0, sortColumn = 'fileNumber', sortOrder = 'ASC', myReports = '') => {
    return axios.get(`/reports/getAllReports?page=${page}&size=10&sort=${sortColumn},${sortOrder}&myReports=${myReports}`);
}

export const searchInReports = (page = 0, sortColumn = 'fileNumber', sortOrder = 'ASC', searchTerm, startDate, endDate, myReports = null) => {
    return axios.get(`/reports/searchInReports?page=${page}&size=10&sort=${sortColumn},${sortOrder}&searchTerm=${searchTerm}&startDate=${startDate}&endDate=${endDate}&myReports=${myReports}`);
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
