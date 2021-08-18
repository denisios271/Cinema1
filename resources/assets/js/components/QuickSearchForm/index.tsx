import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

interface iState {
    _value: string,
    isSubmitted: boolean,
}

export default class QuickSearchForm extends React.Component<{}, iState> {
    state = {
        _value: '',
        isSubmitted: false,
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        this.setState({
            _value: value,
        });
    }

    formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({
            isSubmitted: true,
        });
        setTimeout(() => {
            this.setState({
                isSubmitted: false,
            });
        }, 1);
    }

    render() {
        if (this.state.isSubmitted) {
            return <Redirect push to={`/search/${this.state._value}`} />
        }

        return (
            <form className="search" onSubmit={this.formSubmitHandler}>
                <Link to={`/search/${this.state._value}`} className="search__loop-icon"></Link>
                <input
                    className="search__input"
                    value={this.state._value}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}