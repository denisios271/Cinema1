import * as c from './constants';
import Api, { iError } from '../../lib/Api';
import iPostVote from '../../interfaces/iPostVote';
import iAction from '../../interfaces/iAction';
import { key as reduxKey } from './reducers';
import iGlobalState from '../../interfaces/iGlobalState';

export function initialLoading() {
    return dispatchEvent => {
        dispatchEvent(loadActiveVotes());
    }
}

export function loadActiveVotes() {
    return dispatchEvent => {
        Api.get<iPostVote[]>(`post/active-votes`).then(response => {
            console.log(response, 'get active voice response');
            dispatchEvent(receiveVotes(response));
        }).catch(console.error);
    }
}

export function vote(post_id: number, vote: number) {
    return (dispatchEvent, getState) => {
        Api.post<iPostVote>(`post/vote`, {
            post_id,
            vote
        }).then(response => {
            const state = (getState() as iGlobalState)[reduxKey];
            dispatchEvent(receiveVotes([
                ...state.votes,
                response,
            ]));

            // it's good to know always up-to-date data
            dispatchEvent(loadActiveVotes());
        }).catch((e: iError) => alert(e.error));
    }
}

export interface iReceiveVotes extends iAction {
    votes: iPostVote[],
}
export function receiveVotes(votes: iPostVote[]): iReceiveVotes {
    return {
        type: c.RECEIVE_ACTIVE_VOTES,
        votes,
    };
}