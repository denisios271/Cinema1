import * as React from 'react';
import Video from '../Video';

interface iProps {
    done(): void,
}

export default class ThirdVideo extends React.Component<iProps> {
    render() {
        return (
            <Video done={this.props.done}>
                <video src='/video/bj/video-3.mp4' autoPlay muted onEnded={this.props.done} width='100%'></video>
            </Video>
        );
    }
}
