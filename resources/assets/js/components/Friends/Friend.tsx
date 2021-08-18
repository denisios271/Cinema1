import * as React from 'react';

interface iProps {
    href: string,
    name: string,
}

export default class Friend extends React.Component<iProps> {
    render() {
        return(
            <div className="col-xs-12 col-sm-12">
                <a target="_blank" href={this.props.href} title={this.props.name} className="friend">{this.props.name}</a>
            </div>
        );
    }
}