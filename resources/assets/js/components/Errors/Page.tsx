import * as React from 'react';
import Api from '../../lib/Api';

export interface ErrorPageProps {
    /** Error title (h1 tag) */
    title: string,

    /** Errors (array or string) */
    message: string[]|string,
}

export default class Page extends React.Component<ErrorPageProps> {
    componentDidMount() {
        Api.post('issues/website', {
            title: this.props.title,
            description: Array.isArray(this.props.message) ? this.props.message.join(' ') : this.props.message,
        });
    }
    
    render() {
        document.title = this.props.title;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="col-xs-12 col-sm-12 alert alert-danger mt-3">
                    Произошла ошибка на странице.
                    {Array.isArray(this.props.message) ? (
                        <ul>
                            {this.props.message.map((err: string, num: number) => (
                                <li key={num}>
                                    {err}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        this.props.message
                    )}
                    <br />Напиши админу <a href="mailto:tokiseven3@gmail.com">на почту</a> или через <a href="//vk.com/tokiseven" target="_blank">vk.com</a>
                </div>
            </div>
        );
    }
}