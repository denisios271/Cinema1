import * as React from 'react';
import SocialBlock from './SocialBlock';

export interface iSocialAuths {
    vk(): void,
}

interface iProps {
    isFetching: boolean,
    socialAuths: iSocialAuths,
}

export default class SocialsBlock extends React.Component<iProps> {
    render() {
        return (
            <div className="row my-auto" style={{ position: 'relative' }}>
                <SocialBlock login = {this.props.socialAuths.vk} title = "Вконтакте" icon = "vk" />
                {/* <SocialBlock login = {this.props.socialsAuth.google} title = "Google+" icon = "google" /> */}

                {this.props.isFetching && (
                    <div style = {{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.2)',
                        position: 'absolute'
                    }}></div>
                )}
            </div>
        );
    }
}