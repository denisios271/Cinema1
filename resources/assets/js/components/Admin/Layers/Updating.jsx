import React from 'react';
import ReactLoading from 'react-loading';

import SendingLayer from './Sending';

/**
 * Updating layer - using for:
 * * shows list of resources -> (resourceList component)
 * * shows loading resource ->
 * * shows editing form -> (form component)
 * 
 * If resourceId is set to null - show List component.
 * Else will be executed loadResource promise and after that shown editing form.
 * 
 * @param {string} fileName Console's message for server's response (successed/failed)
 * @param {mixed|null} resourceId Used just for selecting what to render - 'resourcesList' or 'form'
 * 
 * @param {React.Component} resourcesList Resources list for rendering if resourceId === null
 * @param {React.Component} form Editing form for rendering
 * 
 * @param {function} createFormData Function to create form data. Param - resource object (loaded from server)
 * @param {function} createSendingPromise Function to create sending promise (for editing). Param - resource object
 * @param {function} loadResource Promise for getting resoruces list from server.
 */
export default class Updating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            resource: null,
        };
    }

    loadResource(props) {
        this.setState({
            isFetching: true,
        });
        props.loadResource().then(response => {
            console.info(`${props.fileName}:loadResource()`, response);
            this.setState({
                resource: response,
                isFetching: false,
            });
        }).catch(error => {
            console.error(`${props.fileName}:loadResource()`, error);
            this.setState({
                resource: null,
                isFetching: false,
            });
        });
    }

    componentDidMount() {
        if (this.props.resourceId !== null) {
            this.loadResource(this.props);
        }
    }

    componentWillReceiveProps(next) {
        if (next.resourceId !== null) {
            this.loadResource(next);
        }
    }

    render() {
        if (this.props.resourceId === null) {
            let ResourcesList = this.props.resourcesList;
            return <ResourcesList />;
        }
        if (this.state.isFetching) {
            return (
                <center>
                    <ReactLoading type="spinningBubbles"
                        color="#333" delay={0} height="100" width="100" />
                </center>
            );
        }

        const formData = this.props.createFormData(this.state.resource);
        const sendingPromise = this.props.createSendingPromise(this.state.resource);
        return (
            <SendingLayer form = {this.props.form} fileName = {this.props.fileName}
                send = {sendingPromise} formData = {formData} />
        );
    }
}
