import * as React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from './actions';
import AuthModal from './AuthModal';
import User from './User';
import iGlobalState from '../../interfaces/iGlobalState';
import { key, iState } from './reducers';

interface iProps {
    state: iState,
    loginViaVk(): void,
    logout(): void,
    login(email: string, password: string): void,
    register(name: string, email: string, password: string): void,
    sendRecoveryEmail(email: string): void,
    clearErrorMessage(): void,
}

class Auth extends React.Component<iProps> {
    render() {
        let socialAuths = {
            vk: this.props.loginViaVk,
        };
        const state = this.props.state;
        if (state.isLogged) {
            return <User
                    logout={this.props.logout}
                    data = {state.userData}
                    isFetching = {state.isFetching}
                    />;
            } else {
                return <AuthModal
                    login={this.props.login}
                    register={this.props.register}
                    sendRecoveryEmail={this.props.sendRecoveryEmail}
                    errorMessage={state.errorMessage}
                    clearErrorMessage={this.props.clearErrorMessage}
                    socialAuths={socialAuths}
                    isFetching = {state.isFetching}
                    sendingRecoveryEmailStatus={state.sendingRecoveryEmailStatus}
                />;
        }
    }
}

export default connect(
    (state: iGlobalState) => ({
        state: state[key],
    }),
    (dispatchEvent: any) => ({
        loginViaVk: () => dispatchEvent(ActionCreators.loginViaVk()),
        logout: () => dispatchEvent(ActionCreators.logout()),
        login: (email: string, password: string) => dispatchEvent(ActionCreators.login(email, password)),
        register: (name: string, email: string, password: string) => dispatchEvent(ActionCreators.register(name, email, password)),
        sendRecoveryEmail: (email: string) => dispatchEvent(ActionCreators.sendRecoveryEmail(email)),
        clearErrorMessage: () => dispatchEvent(ActionCreators.clearErrorMessage()),
    })
)(Auth);