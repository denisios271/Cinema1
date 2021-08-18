import * as React from 'react';
import RegistrationBlock from './RegistrationBlock';
import LoginBlock from './LoginBlock';
import SocialsBlock, { iSocialAuths } from './SocialsBlock';
import ResetPasswordBlock from './ResetPasswordBlock';
import SeoWrapper from '../../Wrappers/Seo';
import * as tabs from 'tabs';


interface iProps {
    errorMessage: string|null,
    isFetching: boolean,
    sendingRecoveryEmailStatus: boolean|null,

    login(email: string, password: string): void,
    register(name: string, email: string, password: string): void,
    sendRecoveryEmail(email: string): void,
    clearErrorMessage(): void,

    socialAuths: iSocialAuths,
}

export default class AuthModal extends React.Component<iProps> {
    getErrors() {
        if (this.props.errorMessage === null) {
            return null;
        }

        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick = {this.props.clearErrorMessage}>
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.errorMessage}
            </div>
        );
    }

    componentDidMount() {
        let container = document.querySelector('.tab-container');
        tabs(container);
    }

    render() {
        return (
            <div id = "profile-block">
                <SeoWrapper title='Личный кабинет'>
                    <br/>
                    <div className="row">
                        <div className = "col-xs-12 col-sm-12">
                            <h1 style={{ textAlign: 'center' }}>Личный кабинет</h1>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className = "col"></div>
                        <div className = "col-xs-12 col-sm-12 col-md-10 col-lg-6">
                            <div className = "tab-container">
                                <div className="tabs">
                                    <a className="tab active">
                                        Вход
                                    </a>
                                    <a className="tab">
                                        Регистрация
                                    </a>
                                    <a className="tab">
                                        Восстановить пароль
                                    </a>
                                </div>

                                <br />
                                {this.getErrors()}

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-7 vertical-divider-right">
                                        <div className="tab-panes">
                                            <div className="tab-pane active">
                                                <LoginBlock
                                                    login={this.props.login}
                                                    isFetching={this.props.isFetching}
                                                />
                                            </div>
                                            <div className="tab-pane">
                                                <RegistrationBlock
                                                    register={this.props.register}
                                                    isFetching={this.props.isFetching}
                                                />
                                            </div>
                                            <div className="tab-pane">
                                                <ResetPasswordBlock
                                                    sendingRecoveryEmailStatus={this.props.sendingRecoveryEmailStatus}
                                                    sendRecoveryEmail={this.props.sendRecoveryEmail}
                                                    isFetching={this.props.isFetching}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col text-center">
                                        <div className="row mb-2">
                                            <div className="col">
                                                Или войти через:
                                            </div>
                                        </div>
                                        <SocialsBlock socialAuths = {this.props.socialAuths} isFetching={this.props.isFetching} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "col"></div>
                    </div>
                </SeoWrapper>
            </div>
        );
    }
}