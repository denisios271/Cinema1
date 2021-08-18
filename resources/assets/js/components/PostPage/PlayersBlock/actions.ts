import { SERIES } from './constants';
import LocalStorage from '../../../lib/LocalStorage';
import iGlobalState from '../../../interfaces/iGlobalState';
import iAction from '../../../interfaces/iAction';

export function smartChangePlayer() {
    return (dispatch, getState) => {
        const post = (getState() as iGlobalState).post.data;
        const seriesState = (getState() as iGlobalState).series;
        const series = post.series.filter(v => v.type_id == seriesState.activeType);
        let selectedPlayer = 0;
        if (series.length) {
            // we believe there are series
            const seria = series[seriesState.activeNumber]; // our active seria
            selectedPlayer = LocalStorage.load(`Post/${post.id}/player`);
            if (!selectedPlayer) {
                // save default player
                // we have index 0, but need player id
                selectedPlayer = 0;
                const player = seria.players[0]; // believe there are players
                LocalStorage.save(`Post/${post.id}/player`, player.player_id); // we want to save player details id
            } else {
                // select player from array (we have player's id (details), but need index)
                const playerIndex = seria.players.findIndex(v => v.player_id == selectedPlayer); // believe there are players
                if (playerIndex != -1) {
                    // found player
                    // need to update player to found
                    selectedPlayer = playerIndex;
                } else {
                    // just display first
                    const player = seria.players[0]; // believe there are players
                    selectedPlayer = 0;
                }
            }
        }
        dispatch(changeSeriesPlayer(selectedPlayer));
    }
}

export interface iChangeSeriesType extends iAction {
    activeType: number,
}
export function changeSeriesType(activeType: number) {
    return (dispatch, getState) => {
        const id = (getState() as iGlobalState).post.data.id;
        LocalStorage.save(`Post/${id}/selected/type`, activeType);
        LocalStorage.save(`Post/${id}/selected/series`, 0);

        dispatch({
            type: SERIES.CHANGE_TYPE,
            activeType,
        });
    }
}

export interface iChangeSeriesNumber extends iAction {
    activeNumber: number,
}
export function changeSeriesNumber(activeNumber: number) {
    return (dispatch, getState) => {
        const id = (getState() as iGlobalState).post.data.id;
        LocalStorage.save(`Post/${id}/selected/series`, activeNumber);

        dispatch({
            type: SERIES.CHANGE_SERIA,
            activeNumber,
        });
    }
}

export interface iChangeSeriesPlayer extends iAction {
    activePlayer: number,
}
export function changeSeriesPlayer(activePlayer: number) {
    return (dispatch, getState) => {
        const post = (getState() as iGlobalState).post.data;
        const seriesState = (getState() as iGlobalState).series;
        const series = post.series.filter(v => v.type_id == seriesState.activeType);
        if (series.length) {
            // we believe there are series
            const seria = series[seriesState.activeNumber]; // our active seria

            // save default player
            // we have index 0, but need player id
            const player = seria.players[activePlayer]; // believe there are players
            if (player) {
                LocalStorage.save(`Post/${post.id}/player`, player.player_id); // we want to save player details id
            }
        }

        LocalStorage.save(`Post/${post.id}/selected/player`, activePlayer);
        dispatch({
            type: SERIES.CHANGE_PLAYER,
            activePlayer,
        });
    }
}