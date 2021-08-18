import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import ReactLoading from 'react-loading';

interface iProps {
    isFetching: boolean,
    sendingRecoveryEmailStatus: boolean|null,

    sendRecoveryEmail(email: string): void,
}

interface iState {
    email: string,
}

export default class ResetPasswordBlock extends React.Component<iProps, iState> {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    }

    submit(event) {
        if (this.props.isFetching) {
            this.props.sendRecoveryEmail(this.state.email);
        }
        event.preventDefault();
    }

    render() {
        if (this.props.sendingRecoveryEmailStatus === true) {
            return (
                <div className="alert alert-success">
                    Ссылка для восстановления пароля была отправлена на почту!
                </div>
            );
        }
        return (
            <Form onSubmit={this.submit.bind(this)}>
                <FormGroup>
                    <Label for="input-email">Почта</Label>
                    <Input type="email" name="email" id="input-email" placeholder="email@gmail.com" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
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
                        <Button className="button_styled" color="primary">Восстановить</Button>
                    )}
                </FormGroup>
            </Form>
        );
    }
}