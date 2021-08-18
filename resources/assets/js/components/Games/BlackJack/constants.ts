export enum PAGES {
    Loading,
    FirstVideo,
    SelectOpponent,
    SecondVideo,
    VoiceUserChoice,
    ThirdVideo,
    CubeRotating,
    Table,
};

export const DELAY = 300;
export const CARD_HEIGHT_TO_CARD_WIDTH = 1.23616524; // card's height / card's width
export const CARDS_COUNT = 22; // 0, 1, 2, ..., 22, 21

export const CHANGE_INITIAL_LOADING = 'GAME.21.CHANGE_INITIAL_LOADING';
export const CHANGE_PAGE = 'GAME.21.CHANGE_PAGE';
export const RECEIVE_GAME = 'GAME.21.RECEIVE_GAME';
export const RECEIVE_GIVEN_CARDS = 'GAME.21.RECEIVE_GIVEN_CARDS';
export const RECEIVE_CARDS = 'GAME.21.RECEIVE_CARDS';
export const SHOW_CARD = 'GAME.21.SHOW_CARD';
export const RESET_DATA = 'GAME.21.RESET_DATA';
export const UPDATE_CARD_DETAILS = 'GAME.21.UPDATE_CARD_DETAILS';
export const STAND_GAME = 'GAME.21.STAND_GAME';