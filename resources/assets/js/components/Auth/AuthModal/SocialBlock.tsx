import * as React from 'react';

interface iProps {
    icon: string,
    title: string,

    login(): void,
}

export default class SocialsBlock extends React.Component<iProps> {
    render() {
        return (
            <div className="col-xs-12 col-sm-12 my-1">
                <div onClick={this.props.login} className={`py-1 px-1 social-block social-block-${this.props.icon}`}>
                    <img src = {`/images/social/${this.props.icon}-2.png`} className="social-block-icon" />
                    <div className="social-block-text">{this.props.title}</div>
                </div>
            </div>
        );
    }
}