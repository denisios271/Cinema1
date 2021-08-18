import * as React from 'react';
import ReactLoading from 'react-loading';
import iGame from '../../../../interfaces/BlackJack/iGame';

interface iProps {
    done(): void,
    game: iGame,
}

export default class CubeRotating extends React.Component<iProps> {
    componentDidMount() {
        $('#sound-cards-wrapper').fadeOut(0);
    }

    render() {
        const isNormalCards = this.props.game.is_user_have_positive_cards;
        const side: number = (isNormalCards ? [2, 4, 6] : [1, 3, 5])[Math.round(Math.random() * 3)];
        return (
            <div className='text-center d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100'>
                <audio src={`/sound/bj/cat/cube-${Math.round(Math.random() * 3)}.wav`} autoPlay></audio>
                <button id='btn' className='btn btn-outline-secondary btn-lg' onClick={() => {
                    $('#btn').fadeOut(400, () => {
                        $('#sound-cards-wrapper').fadeIn(400, () => {
                            ($('#sound-cards')[0] as HTMLAudioElement).play();
                        });
                        ($('#sound-cube')[0] as HTMLAudioElement).play();
                    });
                }}>Кинуть кубик!</button>
                <div id='sound-cards-wrapper'>
                    Вам выпало <b>{side}</b>
                </div>
                <audio id='sound-cards'
                    src={`/sound/bj/god/your-cards-${isNormalCards ? 'normal' : 'revert'}.wav`}
                    onEnded={() => $('#sound-cards-wrapper').fadeOut(400, () => this.props.done())}></audio>
                <audio id='sound-cube' src="/sound/bj/cube.wav"></audio>
            </div>
        );
    }
}
