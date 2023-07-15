import React, { Component } from 'react';
import axios from 'axios';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {

        // static displayName = 'ApiProgress(' + getDisplayName(WrappedComponent) + ')';
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

        state = {
            pendingApiCall: false
        }


        componentDidMount() {
            /* This code is used to monitor the status of API requests
            made using Axios and update the UI accordingly. */
            axios.interceptors.request.use(request => {
                this.updateApiCallFor(request.url, true);
                return request;
            }); // runs when a request is sent
            axios.interceptors.response.use(response => {
                this.updateApiCallFor(response.config.url, false);
                return response;
            }, // runs when a response is received
                error => {
                    this.updateApiCallFor(error.config.url, false);
                    throw error;
                }); // runs when an error is received
        }

        updateApiCallFor = (url, isProgress) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall: isProgress })
            }
        }


        render() {
            const { children } = this.props;
            const { pendingApiCall } = this.state;

            return <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />
            // {...this.props} = allows properties to pass to other layers
        }
    }

}
