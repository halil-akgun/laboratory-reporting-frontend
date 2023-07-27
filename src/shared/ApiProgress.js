import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApiProgress = (apiMethod, apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)

    useEffect(() => {
        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (method, url, inProgress) => {
            if (url.startsWith(apiPath) && method === apiMethod) {
                setPendingApiCall(inProgress);
            }
        }

        const registerInterceptors = () => {
            /* This code is used to monitor the status of API requests
            made using Axios and update the UI accordingly. */
            requestInterceptor = axios.interceptors.request.use(request => {
                const { url, method } = request;
                updateApiCallFor(method, url, true);
                return request;
            }); // runs when a request is sent
            responseInterceptor = axios.interceptors.response.use(response => {
                const { url, method } = response.config;
                updateApiCallFor(method, url, false);
                return response;
            }, // runs when a response is received
                error => {
                    const { url, method } = error.config;
                    updateApiCallFor(method, url, false);
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
    }, [apiPath, apiMethod]);

    return pendingApiCall;
};
