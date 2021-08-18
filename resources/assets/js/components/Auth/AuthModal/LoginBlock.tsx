import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import ReactLoading from 'react-loading';

interface iProps {
    isFetching: boolean,
    login(email: string, password: string): void,
}

interface iState {
    email: string,
    password: string,
}

export default class LoginBlock extends React.Component<iProps, iState> {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.changedEmail = this.changedEmail.bind(this);
        this.changedPassword = this.changedPassword.bind(this);
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

    submit(event) {
        if (!this.props.isFetching) {
            this.props.login(this.state.email, this.state.password);
        }
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.submit.bind(this)}>
                <FormGroup>
                    <Label for="input-email-login">Почта</Label>
                    <Input type="email" name="email" id="input-email-login" placeholder="yourmail@gmail.com" value={this.state.email} onChange={this.changedEmail} />
                </FormGroup>
                <FormGroup>
                    <Label for="input-password">Пароль</Label>
                    <Input type="password" name="password" id="input-password" placeholder="********" value={this.state.password} onChange={this.changedPassword} />
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
                        <Button className="button_styled" type="submit" color="primary">Войти</Button>
                    )}
                </FormGroup>
            </Form>
        );
    }
}