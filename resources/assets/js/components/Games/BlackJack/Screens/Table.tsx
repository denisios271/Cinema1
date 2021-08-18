import * as React from 'react';
import iGivenCard from '../../../../interfaces/BlackJack/iGivenCard';
import Card from '../Card';
import iGame from '../../../../interfaces/BlackJack/iGame';
import iCard from '../../../../interfaces/BlackJack/iCard';
import { userScore, hideBJ, showBJ } from '../actions';
import WrapperHelper from '../WrapperHelper';

interface iProps {
    game: iGame,
    opponentCards: iGivenCard[],
    userCards: iGivenCard[],
    cards: iCard[],
    cardDetails: iGivenCard,
    hideCard(): void,

    hit(): void,
    stand(): void,
}

export default class TableScreen extends React.Component<iProps> {
    isCardGivenToUser = (card: iCard) => this.props.userCards.filter(uc => Math.abs(uc.card.rank) == card.rank).length > 0;

    isCardGivenToOpponent = (card: iCard) => this.props.opponentCards.filter(uc => Math.abs(uc.card.rank) == card.rank).length > 0;

    isCardGiven = (card: iCard) => {
        return this.isCardGivenToUser(card) || this.isCardGivenToOpponent(card);
    }

    renderAllCards() {
        return (
            <div className="bj_cards-wrapper" style={{ display: 'inline-block', marginLeft: WrapperHelper.calculatePadding() / 2 }}>
                {this.props.cards.filter(v => v.rank >= 0 && !this.isCardGiven(v)).map(v => <Card key={v.id}
                    isGivenForUser={false}
                    isGivenForOpponent={false}
                    card={v}
                    onClick={() => this.props.hit()}
                />)}
            </div>
        );
    }

    renderCardDetails() {
        const card = this.props.cardDetails;
        const leftCards = 6 - (card.is_server ? this.props.opponentCards.length : this.props.userCards.length);
        return (
            <div className="row text-center mt-5">
                <div className="col-4">
                    <img src={`/images/game/bj/cards/${card.card.rank}.png`}
                        alt={card.card.title}
                        className="img-fluid"
                    />
                    <button className="btn btn-block btn-danger" onClick={this.props.hideCard}>Закрыть</button>
                </div>
                <div className="col">
                    <h5>{card.card.title} ({card.card.rank})</h5>
                    <h6 className='text-danger' style={{
                        textShadow: '0 0px 25px white',
                    }}>Карта выдана <b>{card.is_server ? 'Богам' : 'Вам'}</b> (осталось карт: {leftCards})</h6>
                    <p dangerouslySetInnerHTML={{ __html: card.card.description }}></p>
                </div>
            </div>
        );
    }

    renderUserActions() {
        const g = this.props.game
        if (!g.is_user_standed && g.cards.filter(v => !v.is_server).length < 6 && userScore(g.cards) < 21) {
            return <button className="btn btn-danger mb-3" onClick={this.props.stand.bind(this)}>Закончить игру</button>;
        }

        return null;
    }

    renderTable() {
        const userScore = this.props.userCards.reduce((s, c) => s + c.card.rank, 0);
        const opponentScore = this.props.opponentCards.reduce((s, c) => s + c.card.rank, 0);
        return (
            <div className="bj__table">
                <div className='mb-1 text-center'>
                    {userScore} / {opponentScore}
                    <br/><small>(Ваш счет / Счет опонента)</small>
                </div>
                <div className='mb-1 text-center'>
                    Ваши карты: <b>{this.props.game.is_user_have_positive_cards ? 'Нормальные' : 'Обратные'}</b>
                </div>
                {this.props.cardDetails !== null ? null : this.renderUserActions()}
                {this.props.cardDetails !== null ? this.renderCardDetails() : this.renderAllCards()}
            </div>
        );
    }

    componentDidMount() {
        hideBJ(() => showBJ(), 0);
        $('.bj_cards-wrapper').ready(() => this.forceUpdate());
        $('.bj_cards-wrapper').resize(() => this.forceUpdate());
    }

    componentDidUpdate(props: iProps) {
        const newCD = this.props.cardDetails;
        const oldCD = props.cardDetails;
        const gameLoaded = !props.game && this.props.game;
        if (newCD != oldCD || gameLoaded) {
            hideBJ(() => showBJ(), 50);
        }
    }

    render() {
        let uAdminCardPrefix: string;
        let uAdminCardSpeaking: string;
        let uAdminCardWaiting: string;

        let oAdminCardPrefix: string;
        let oAdminCardSpeaking: string;
        let oAdminCardWaiting: string;

        if (this.props.game.is_user_have_positive_cards) {
            uAdminCardPrefix = `normal`;
            oAdminCardPrefix = `reverse`;
        } else {
            uAdminCardPrefix = `reverse`;
            oAdminCardPrefix = `normal`;
        }

        uAdminCardSpeaking = `${uAdminCardPrefix}-speking`;
        uAdminCardWaiting = `${uAdminCardPrefix}-waiting`;

        oAdminCardSpeaking = `${oAdminCardPrefix}-speking`;
        oAdminCardWaiting = `${oAdminCardPrefix}-waiting`;

        return (
            <div className="bj__game-wrapper">

                <audio id='sound-card-clicked' src="/sound/bj/card-clicked.mp3"></audio>

                <div className="bj__sidebar mt-5">
                    <div className="bj__topbar">
                        <img src={`/images/game/bj/admin/${uAdminCardWaiting}.gif`} alt="admin.gif" width="200px" />
                    </div>
                    <img src="/images/game/bj/candle.gif" alt="candle.gff" className="bj__candle" />
                </div>

                {this.renderTable()}

                <div className="bj__sidebar mt-5">
                    <div className="bj__topbar">
                        <img src={`/images/game/bj/admin/${oAdminCardWaiting}.gif`} alt="admin.gif" width="200px" />
                    </div>
                    <img src="/images/game/bj/candle.gif" alt="candle.gff" className="bj__candle" />
                </div>

            </div>
        );
    }
}