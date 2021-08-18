import * as React from 'react';

interface iState {
    hasError: boolean,
    error: null|string,
    info: null|any,
}

export default class ErrorBoundary extends React.Component<null, iState> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null,
        };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({
            hasError: true,
            error,
            info,
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="alert alert-danger">
                    Произошло что - то странненькое... Отправька это админу.
                    <br />Error: {JSON.stringify(this.state.error)}
                    <br />Info: {JSON.stringify(this.state.info)}
                </div>
            );
        }
        return this.props.children;
    }
}