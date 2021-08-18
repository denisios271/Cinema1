import * as c from './constants';
import iAction from '../../../interfaces/iAction';
import Api, { iError } from '../../../lib/Api';
import iCard from '../../../interfaces/BlackJack/iCard';
import iGame from '../../../interfaces/BlackJack/iGame';
import iGivenCard from '../../../interfaces/BlackJack/iGivenCard';
import iGlobalState from '../../../interfaces/iGlobalState';
import { key, iState } from './reducers';
import WrapperHelper from './WrapperHelper';

interface iResponse {
    game: iGame,
    cards: iGivenCard[],
    allCards: iCard[],
}

let cardsQueue: iGivenCard[] = [];
let cardsQueueOnFinished: () => void = null;

export function getRandom(a: any[]) {
    return a[Math.floor(Math.random() * a.length)];
}

export const CARD_DELAY = 500; // ms

export function getSound(card: iCard) {
    const soundName = `${card.id}-${Math.floor(Math.random() * card.sounds_count) + 1}.mp3`;
}

export function playCardClick() {
    ($('#sound-card-clicked')[0] as HTMLAudioElement).play();
}

export function hideBJ(done = null, time = c.DELAY) {
    let dom = $('.bj__game-wrapper');
    if (dom[0]) {
        $('.bj__game-wrapper').fadeOut(time, () => setTimeout(() => done ? done() : null, c.DELAY / 2));
    } else {
        done();
    }
}

export function showBJ(done = null, time = c.DELAY * 2) {
    let dom = $('.bj__game-wrapper');
    if (dom[0]) {
        $('.bj__game-wrapper').fadeIn(time, () => setTimeout(() => done ? done() : null, c.DELAY / 2));
    } else {
        done();
    }
}

export function init() {
    return dispatchEvent => {
        Api.get('blackjack/games/current').then((r: iResponse) => {
            // hideBJ(() => {
                dispatchEvent(receiveGame(r.game));
                dispatchEvent(receiveGivenCards(r.cards));
                dispatchEvent(receiveCards(r.allCards));
                dispatchEvent(changePage(c.PAGES.Table));
                // hideBJ(showBJ, 50);
                r.cards.forEach(v => dispatchEvent(showCard(v)));
            // });
        }).catch(e => {
            dispatchEvent(changePage(c.PAGES.FirstVideo));
        });
    }
}

export function playGame() {
    return dispatchEvent => {
        Api.post('blackjack/games').then((r: iResponse) => {
            dispatchEvent(receiveGame(r.game));
            dispatchEvent(receiveGivenCards(r.cards));
            dispatchEvent(receiveCards(r.allCards));
            cardsQueue.push(...r.cards);
        }).catch((e: iError) => {
            alert(e.error);
        });
    }
}

export function checkUserScoreAndFinish() {
    return (dispatchEvent, getState) => {
        const cards = (getState() as iGlobalState)[key].givenCards;
        if (userScore(cards) >= 21) {
            // if user can't stand - we should start game's finishing timeout
            dispatchEvent(finishGame(cards));
        }
    }
}

export enum Winner {
    Draw, User, Opponent, Error
}

export function getWinner(isUserCardsNormal: boolean, cards: iGivenCard[]): Winner {
    let uScore = userScore(cards);
    let oScore = opponentScore(cards);

    if (isUserCardsNormal) {
        oScore *= -1;
    } else {
        uScore *= -1;
    }

    // who's winner?
    if ((oScore > 21 && uScore > 21) || oScore == uScore) {
        return Winner.Draw;
    } else if (oScore > 21 || oScore < uScore) {
        return Winner.User;
    } else if (uScore > 21 || oScore > uScore) {
        return Winner.Opponent;
    } else {
        return Winner.Error;
    }
}

export function finishGame(cards: iGivenCard[]) {
    return (dispatchEvent, getState) => {
        const isUserCardsNormal = (getState() as iGlobalState)[key].game.is_user_have_positive_cards;
        const winner = getWinner(isUserCardsNormal, cards);
        if (winner == Winner.Draw) {
            alert('Ничья!');
            dispatchEvent(resetData());
            dispatchEvent(changePage(c.PAGES.FirstVideo));
        } else {
            const person = getRandom(['cat']);
            const direction = isUserCardsNormal ? 'normal' : 'reverse';
            const i = getRandom([0, 1, 2]);
            const event = winner == Winner.User ? 'won' : 'lost';
            let audio = new Audio(`/sound/bj/${person}/${direction}-${event}-${i}.wav`);
            audio.onended = () => {
                if (winner == Winner.User) {
                    alert('Вы победили!');
                } else {
                    alert('Вы проиграли!');
                }
                dispatchEvent(resetData());
                dispatchEvent(changePage(c.PAGES.FirstVideo));
            };
            audio.play();
        }
    }
}

export function userScore(cards: iGivenCard[]) {
    return calculateScore(cards.filter(v => !v.is_server));
}

export function opponentScore(cards: iGivenCard[]) {
    return calculateScore(cards.filter(v => v.is_server));
}

export function calculateScore(cards: iGivenCard[]): number {
    return cards.reduce((sum, v) => v.card.rank + sum, 0);
}

export interface iChangePage extends iAction {
    page: c.PAGES,
}
export function changePage(page: c.PAGES): iAction {
    return {
        type: c.CHANGE_PAGE,
        page,
    };
}

export interface iChangeInitialLoading extends iAction {
    isFinished: boolean,
}
export function changeInitialLoading(isFinished: boolean): iChangeInitialLoading {
    return {
        type: c.CHANGE_INITIAL_LOADING,
        isFinished,
    };
}

export function loadGames() {
    return dispatchEvent => {
        // Api.get('games/21/tables');
    }
}

export function hit(gameId: number) {
    return hitOrStand(gameId, 'hit');
}

export function stand(gameId: number) {
    return hitOrStand(gameId, 'stand');
}

export function hitOrStand(gameId: number, event: 'hit'|'stand') {
    return (dispatchEvent, getState) => {
        const cards = (getState() as iGlobalState)[key].givenCards;
        Api.post(`blackjack/games/${gameId}/${event}`).then((r: iGivenCard[]) => {
            const newCards = [...cards, ...r];
            dispatchEvent(receiveGivenCards(newCards));
            if (event == 'stand') {
                dispatchEvent(standGame());
            }
            cardsQueue.push(...r);
            cardsQueueOnFinished = () => {
                if (event == 'stand') {
                    dispatchEvent(finishGame(newCards));
                } else if (newCards.filter(v => !v.is_server).length >= 6) {
                    dispatchEvent(finishGame(newCards));
                }
            };
            dispatchEvent(animateCards());
        }).catch(e => alert(e.error));
    }
}

export function animateCards() {
    return dispatchEvent => {
        if (!cardsQueue.length) {
            if (cardsQueueOnFinished) {
                cardsQueueOnFinished();
            }
            return;
        }
        dispatchEvent(showCard(cardsQueue[0]));
        dispatchEvent(updateCardDetails(cardsQueue[0], true));
        cardsQueue = cardsQueue.slice(1);
    }
}

export interface iReceiveGame extends iAction {
    game: iGame,
}
export function receiveGame(game: iGame): iReceiveGame {
    return {
        type: c.RECEIVE_GAME,
        game,
    };
}

export interface iReceiveGivenCards extends iAction {
    cards: iGivenCard[],
}
export function receiveGivenCards(cards: iGivenCard[]): iReceiveGivenCards {
    return {
        type: c.RECEIVE_GIVEN_CARDS,
        cards,
    };
}

export interface iReceiveCards extends iAction {
    cards: iCard[],
}
export function receiveCards(cards: iCard[]): iReceiveCards {
    return {
        type: c.RECEIVE_CARDS,
        cards,
    };
}

export interface iShowCard extends iAction {
    card: iGivenCard,
}
export function showCard(card: iGivenCard): iShowCard {
    return {
        type: c.SHOW_CARD,
        card,
    };
}

export function resetData(): iAction {
    return {
        type: c.RESET_DATA,
    };
}

export function voiceCard() {
    return (dispatchEvent, getState) => {
        const state: iState = getState()[key];
        const { givenCards, game } = state;
        let uScore = userScore(givenCards);
        let oScore = opponentScore(givenCards);
        if (game.is_user_have_positive_cards) {
            oScore *= -1;
        } else {
            uScore *= -1;
        }

        if (uScore >= 15 && uScore <= 20) {
            const person = getRandom(['cat']);
            const direction = game.is_user_have_positive_cards ? 'normal' : 'reverse';
            const i = getRandom([0, 1, 2, 3, 4]);
            let audio = new Audio(`/sound/bj/${person}/${direction}-soon-win-${i}.wav`);
            audio.play();
        }

        if (uScore >= -20 && uScore <= -15) {
            const person = getRandom(['cat']);
            const direction = game.is_user_have_positive_cards ? 'normal' : 'reverse';
            const i = getRandom([0, 1, 2, 3, 4]);
            let audio = new Audio(`/sound/bj/${person}/${direction}-soon-lose-${i}.wav`);
            audio.play();
        }
    }
}

export function finishIfCan() {
    return (dispatchEvent, getState) => {
        const state: iState = getState()[key];
        const { givenCards, game } = state;
        const uCards = givenCards.filter(v => !v.is_server);
        const oCards = givenCards.filter(v => v.is_server);
        let uScore = userScore(givenCards);
        let oScore = opponentScore(givenCards);
        if (game.is_user_have_positive_cards) {
            oScore *= -1;
        } else {
            uScore *= -1;
        }

        if (uScore >= 21 || uCards.length >= 6) {
            return dispatchEvent(finishGame(givenCards));
        }

        if (oScore >= 17 || oCards.length >= 6) {
            return dispatchEvent(finishGame(givenCards));
        }
    }
}

export interface iUpdateCardDetails extends iAction {
    newCard: iGivenCard,
}
export function updateCardDetails(newCard: iGivenCard|null, shouldIgnoreQueue: boolean = false) {
    return dispatchEvent => {
        if (!shouldIgnoreQueue && !newCard) {
            if (cardsQueue.length) {
                return dispatchEvent(animateCards());
            }
            dispatchEvent(voiceCard());
            dispatchEvent(finishIfCan());
        }
        hideBJ(() => dispatchEvent({
            type: c.UPDATE_CARD_DETAILS,
            newCard,
        }));
    };
}

export function standGame(): iAction {
    return {
        type: c.STAND_GAME,
    };
}