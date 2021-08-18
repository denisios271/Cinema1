import * as React from 'react';
import Video from '../Video';

interface iProps {
    done(): void,
}

export default class SecondVideo extends React.Component<iProps> {
    render() {
        return (
            <Video done={this.props.done}>
                <video src='/video/bj/video-2.mp4' autoPlay muted onEnded={this.props.done} width='100%'></video>
            </Video>
        );
    }
}
