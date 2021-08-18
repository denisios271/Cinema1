import * as React from 'react';
import iGame from '../../../../interfaces/BlackJack/iGame';

interface iProps {
    done(): void,
    game: iGame,
}

/**
 * TODO: when will be done multiplayer - set autoplay based on game type
 */
export default class VoiceUserChoice extends React.Component<iProps> {
    render() {
        return (
            <div className='text-center d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100'>
                <audio src='/sound/bj/god/user-selects-ai.wav' autoPlay={true} onEnded={this.props.done} />
                <audio src='/sound/bj/god/user-selects-user.wav' autoPlay={false} onEnded={this.props.done} />
            </div>
        );
    }
}
