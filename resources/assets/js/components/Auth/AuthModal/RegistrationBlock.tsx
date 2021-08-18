import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import ReactLoading from 'react-loading';

interface iProps {
    isFetching: boolean,

    register(name: string, email: string, password: string): void,
}

interface iState {
    nickname: string,
    email: string,
    password: string,
    passwordRepeat: string,
}

export default class RegistrationBlock extends React.Component<iProps, iState> {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            email: "",
            password: "",
            passwordRepeat: "",
        };
        this.changedNickname = this.changedNickname.bind(this);
        this.changedEmail = this.changedEmail.bind(this);
        this.changedPassword = this.changedPassword.bind(this);
        this.changedPasswordRepeat = this.changedPasswordRepeat.bind(this);
    }

    changedNickname(event) {
        this.setState({
            nickname: event.target.value,
        });
    }
    
    changedEmail(event) {
        this.setState({
            email: event.target.value,
        });
    }
    
    changedPassword(event) {
        this.setState({
            password: event.target.value,
        });
    }
    
    changedPasswordRepeat(event) {
        this.setState({
            passwordRepeat: event.target.value,
        });
    }

    submit(event) {
        if (!this.props.isFetching) {
            this.props.register(this.state.nickname, this.state.email, this.state.password);
        }
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.submit.bind(this)}>
                <FormGroup>
                    <Label for="input-nickname">Имя</Label>
                    <Input type="text" name="nickname" id="input-nickname" placeholder="TokiSeven" value={this.state.nickname} onChange={this.changedNickname} />
                </FormGroup>
                <FormGroup>
                    <Label for="input-email-reg">Email</Label>
                    <Input type="email" name="email" id="input-email-reg" placeholder="firedub@email.com" value={this.state.email} onChange={this.changedEmail} />
                </FormGroup>
                <FormGroup>
                    <Label for="input-password-reg">Пароль</Label>
                    <Input type="password" name="password" id="input-password-reg" placeholder="********" value={this.state.password} onChange={this.changedPassword} />
                </FormGroup>
                <FormGroup>
                    <Label for="input-password-repeat">Повторите пароль</Label>
                    <Input valid={(this.state.password == this.state.passwordRepeat).toString()} type="password" name="password-repeat" id="input-password-repeat" placeholder="********" value={this.state.passwordRepeat} onChange={this.changedPasswordRepeat} />
                </FormGroup>
                <FormGroup>
                    {this.props.isFetching ? (
                        <div className="text-center block-center">
                            <ReactLoading
                                type="spinningBubbles"
                                color="#333"
                                delay={0}
                                height="100"
                                width="100"
                            />
                        </div>
                    ) : (
                        <Button className="button_styled" type="submit" color="success">Регистрация</Button>
                    )}
                </FormGroup>
            </Form>
        );
    }
}