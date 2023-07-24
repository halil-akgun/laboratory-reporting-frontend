import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)

    useEffect(() => {
        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (url, inProgress) => {
            if (url.startsWith(apiPath)) {
                setPendingApiCall(inProgress);
            }
        }

        const registerInterceptors = () => {
            /* This code is used to monitor the status of API requests
            made using Axios and update the UI accordingly. */
            requestInterceptor = axios.interceptors.request.use(request => {
                updateApiCallFor(request.url, true);
                return request;
            }); // runs when a request is sent
            responseInterceptor = axios.interceptors.response.use(response => {
                updateApiCallFor(response.config.url, false);
                return response;
            }, // runs when a response is received
                error => {
                    updateApiCallFor(error.config.url, false);
                    throw error;
                }); // runs when an error is received
        }

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }

        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        }
    }, []);

    return pendingApiCall;
};
