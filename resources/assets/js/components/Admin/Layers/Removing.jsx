import React from 'react';
import ReactLoading from 'react-loading';

import ErrorBoundary from '../../ErrorBoundary';
import ResourceInfoCard from '../ResourceInfoCard';

/**
 * @param {string} fileName File's name to print in console
 * @param {function} getResource Promise to getting resource's data
 * @param {function} remove Promise for removing item, then() & catch() will be called automatically
 * @param {mixed|null} resourceId Resource's identifier to select what to render
 * @param {React.Component} resourcesList Resources list will be rendered of resourceId === null
 */
export default class Removing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            resource: null,
        };
    }

    goHome() {
        window.location = '/admin';
    }

    sendRequest() {
        this.props.remove().then(response => {
            console.info(`${this.props.fileName}:sendRequest()`, response);
            alert('Ресурс был отправлен на удаление. Дождитесь подтверждения администратора.');
            this.goHome();
        }).catch(error => {
            console.error(`${this.props.fileName}:sendRequest()`, error);
            alert('Произошла ошибка. Подробные данные находятся в консоли.' + error.error);
        });
    }

    loadResource(props) {
        this.setState({
            dataLoading: true,
        });
        props.getResource().then(response => {
            console.info(`${props.fileName}:loadResource()`, response);
            this.setState({
                resource: response,
                dataLoading: false,
            });
        }).catch(error => {
            console.error(`${props.fileName}:loadResource()`, error);
            this.setState({
                resource: null,
                dataLoading: false,
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
        if (this.state.dataLoading) {
            return (
                <center>
                    <ReactLoading type="spinningBubbles" color="#333" delay={0} height="100" width="100" />
                </center>
            );
        }
        return (
            <ErrorBoundary>
                <ResourceInfoCard message='Вы уверены что хотите удалить ресурс?'
                    title='Данные ресурса' object = {this.state.resource}
                    hiddenFields = {['categories', 'publisher', 'seriesGroupedByTypes', 'seriesTypes', 'series', 'players']}/>
                <button onClick={this.sendRequest.bind(this)} className="btn btn-block mt-3 btn-danger">Да! (Удалить)</button>
                <button onClick={this.goHome.bind(this)} className="btn btn-block mt-3 btn-warning">Нет! (Я передумал)</button>
            </ErrorBoundary>
        );
    }
}
