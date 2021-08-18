import * as React from 'react';
import SeoWrapper from '../../Wrappers/Seo';
import { connect } from 'react-redux';
import iGlobalState from '../../../interfaces/iGlobalState';
import { key, iState } from './reducers';
import { key as authKey } from '../../Auth/reducers';
import * as c from './constants';
import { changePage, playGame, hit, stand, updateCardDetails, animateCards, hideBJ, showBJ } from './actions';
import LoadingScreen from './Screens/Loading';
import FirstVideo from './Screens/FirstVideo';
import SelectOpponent from './Screens/SelectOpponent';
import SecondVideo from './Screens/SecondVideo';
import VoiceUserChoice from './Screens/VoiceUserChoice';
import ThirdVideo from './Screens/ThirdVideo';
import CubeRotating from './Screens/CubeRotating';
import TableScreen from './Screens/Table';
import { Link } from 'react-router-dom';
import iCard from '../../../interfaces/BlackJack/iCard';
import iGivenCard from '../../../interfaces/BlackJack/iGivenCard';

interface iProps {
    state: iState,
    isLoggedIn: boolean,

    changePage(page: c.PAGES): void,
    playGame(): void,
    hit(gameId: number): void,
    stand(gameId: number): void,
    updateCardDetails(card: iGivenCard|null): void,
    animateCards(): void,
}

class Game extends React.Component<iProps> {
    renderBody() {
        if (!this.props.isLoggedIn) {
            return (
                <div className='text-center d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100'>
                    <Link to='/profile'>Пожалуйтса, войдите в аккаунт</Link>
                </div>
            );
        }
        const { state } = this.props;
        const p = c.PAGES;
        switch (state.currentPage) {
            case p.Loading: return <LoadingScreen />;
            case p.FirstVideo: return <FirstVideo done={() => this.props.changePage(p.SelectOpponent)} />
            case p.SelectOpponent: return <SelectOpponent selectAI={() => {
                this.props.playGame();
                this.props.changePage(p.SecondVideo);
            }} />
            case p.SecondVideo: return <SecondVideo done={() => this.props.changePage(p.VoiceUserChoice)} />
            case p.VoiceUserChoice: return <VoiceUserChoice game={state.game} done={() => this.props.changePage(p.ThirdVideo)} />
            case p.ThirdVideo: return <ThirdVideo done={() => this.props.changePage(p.CubeRotating)} />
            case p.CubeRotating: return <CubeRotating game={state.game} done={() => {
                this.props.changePage(p.Table);
            }} />
            case p.Table: return state.game ? <TableScreen
                userCards={state.showedCards.filter(v => !v.is_server)}
                opponentCards={state.showedCards.filter(v => v.is_server)}
                game={state.game}
                hit={() => this.props.hit(state.game.id)}
                stand={() => this.props.stand(state.game.id)}
                cards={state.cards}
                cardDetails={state.cardDetails}
                hideCard={() => {
                    this.props.updateCardDetails(null);
                }}
            /> : <LoadingScreen />;
            default: return <LoadingScreen />;
        }
    }

    componentDidMount() {
        setInterval(() => {
            let playingAudio: any = document.getElementById('bj-audio-background');
            let stoppedAudio: any = document.getElementById('bj-audio-game-background');
            if (this.props.state.currentPage == c.PAGES.Table) {
                let temp = playingAudio;
                playingAudio = stoppedAudio;
                stoppedAudio = temp;
            }
            if (stoppedAudio && stoppedAudio.pause) {
                stoppedAudio.pause();
            }
            if (playingAudio && playingAudio.play) {
                playingAudio.volume = 0.3;
                if (playingAudio.paused) {
                    playingAudio.play();
                }
            }
        }, 500);
    }

    render() {
        return (
            <div className="bj">
                <audio id='bj-audio-background' src="/sound/bj/background.wav" autoPlay loop></audio>
                <audio id='bj-audio-game-background' src="/sound/bj/game-background.mp3" loop></audio>
                <video autoPlay={true} loop={true} muted={true} style={{
                    width: '100%',
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    zIndex: -100,
                }}>
                    <source src="/video/smoke.mp4" />
                </video>
                {this.renderBody()}
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        state: state[key],
        isLoggedIn: state[authKey].isLogged,
    }),
    (dispatchEvent: any) => ({
        changePage: (page: c.PAGES) => dispatchEvent(changePage(page)),
        playGame: () => dispatchEvent(playGame()),
        hit: (gameId: number) => dispatchEvent(hit(gameId)),
        stand: (gameId: number) => dispatchEvent(stand(gameId)),
        updateCardDetails: (card: iGivenCard|null) => dispatchEvent(updateCardDetails(card)),
        animateCards: () => dispatchEvent(animateCards()),
    })
)(Game);
