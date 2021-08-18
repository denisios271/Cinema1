import * as React from 'react';
import { Link, } from 'react-router-dom';

interface iProps {
    link: string,
    name: string,
}

export default class GenresItem extends React.Component<iProps> {
    render() {
        return (
            <Link to={this.props.link} title={this.props.name}>
                <span className="genres-item">
                    {this.props.name}
                </span>
            </Link>
        );
    }
}
