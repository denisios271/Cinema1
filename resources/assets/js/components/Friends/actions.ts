import Api from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import { RECEIVE_FRIENDS } from './constants';
import iFriend from '../../interfaces/iFriend';
import iAction from '../../interfaces/iAction';

export function loadFriends() {
    return dispatch => {
        const localDataKey = `friends`;
        const localData = LocalStorage.load<iFriend[]>(localDataKey);
        if (localData) {
            dispatch(receiveFriends(localData));
        }
        Api.get<iFriend[]>('friends').then(r => {
            dispatch(receiveFriends(r));
            LocalStorage.save(localDataKey, r);
        }).catch(console.error);
    };
}

export interface iReceiveFriends extends iAction {
    friends: iFriend[],
}
export function receiveFriends(friends: iFriend[]): iReceiveFriends {
    return {
        type: RECEIVE_FRIENDS,
        friends,
    };
}