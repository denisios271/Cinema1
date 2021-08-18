import React from 'react';

import ErrorBoundary from '../../ErrorBoundary';

/**
 * Layer for sending data to server via POST & PUT methods.
 * Also will render form component.
 * 
 * @param {React.Component} form Form for rendering
 * @param {function} send Promise for sending data. Works like this.props.send(data)...
 * @param {string} fileName Console's message for server's response (successed/failed).
 * @param {object} formData Data for form component. Should looks like { propsName: propsValue, }. Default to {}.
 */
export default class Sending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            inputErrors: {},
            successObject: null,
        };
    }

    send(data) {
        this.setState({
            isFetching: true,
        });
        const state = this.state;
        this.props.send(data).then(response => {
            console.info(`(SendingLayer) ${this.props.fileName}:send()`, response);
            this.setState({
                isFetching: false,
                successObject: response,
            });
        }).catch(error => {
            console.error(`(SendingLayer) ${this.props.fileName}:send()`, error);
            if (error.status == 422) {
                // error validation error
                const errors = error.data;
                alert(`Некоторые поля не прошли проверку: ${Object.keys(errors).join(', ')}.`);
                this.setState({
                    inputErrors: errors,
                });
            } else {
                alert(`Произошла неизвестная ошибка. Код ошибки - ${error.status}. ${error.error}`);
            }
            this.setState({
                isFetching: false,
            });
        });
    }

    render() {
        const Form = this.props.form;
        const props = this.props.formData || {};
        return (
            <ErrorBoundary>
                <Form successObject = {this.state.successObject} isFetching = {this.state.isFetching}
                    inputErrors = {this.state.inputErrors} submit = {this.send.bind(this)} {...props} />
            </ErrorBoundary>
        );
    }
}
