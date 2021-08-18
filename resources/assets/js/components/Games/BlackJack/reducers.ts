import createReducer from '../../../lib/createReducer';
import * as c from './constants';
import * as a from './actions';
import iGame from '../../../interfaces/BlackJack/iGame';
import iGivenCard from '../../../interfaces/BlackJack/iGivenCard';
import iAction from '../../../interfaces/iAction';
import iCard from '../../../interfaces/BlackJack/iCard';

export interface iState {
    currentPage: c.PAGES,
    game: iGame|null,
    givenCards: iGivenCard[],
    showedCards: iGivenCard[],
    cards: iCard[],
    isInitialLoadingActive: boolean,
    cardDetails: iGivenCard|null,
}

const initialState: iState = {
    currentPage: c.PAGES.Loading,
    game: null,
    givenCards: [],
    showedCards: [],
    cards: [],
    isInitialLoadingActive: true,
    cardDetails: null,
};

export let reducer = createReducer(initialState, {
    [c.CHANGE_INITIAL_LOADING]: (state, action: a.iChangeInitialLoading) => ({
        ...state,
        isInitialLoadingActive: !action.isFinished,
    }),
    [c.CHANGE_PAGE]: (state, action: a.iChangePage) => {
        return {
            ...state,
            currentPage: action.page,
        };
    },
    [c.RECEIVE_GAME]: (state, action: a.iReceiveGame) => {
        return {
            ...state,
            game: action.game,
        };
    },
    [c.RECEIVE_GIVEN_CARDS]: (state, action: a.iReceiveGivenCards) => {
        return {
            ...state,
            givenCards: action.cards,
        };
    },
    [c.SHOW_CARD]: (state, action: a.iShowCard) => {
        return {
            ...state,
            showedCards: [
                ...state.showedCards,
                action.card,
            ],
        };
    },
    [c.RECEIVE_CARDS]: (state, action: a.iReceiveCards) => ({
        ...state,
        cards: action.cards,
    }),
    [c.RESET_DATA]: (state, action: iAction) => {
        return initialState;
    },
    [c.UPDATE_CARD_DETAILS]: (state, action: a.iUpdateCardDetails) => ({
        ...state,
        cardDetails: action.newCard,
    }),
    [c.STAND_GAME]: (state, action: iAction) => ({
        ...state,
        game: {
            ...state.game,
            is_user_standed: 1,
        },
    })
});

export const key = `games.21`;