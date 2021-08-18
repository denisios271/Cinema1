import * as React from 'react';

interface iProps {
    title: string,
}

export default class Header extends React.Component<iProps> {
    render() {
        return (
            <h1 className = "fs-title">
                {this.props.title}
            </h1>
        );
    }
}