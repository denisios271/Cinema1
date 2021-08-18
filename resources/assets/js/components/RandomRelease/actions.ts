import Api from '../../lib/Api';
import { RECEIVE_RANDOM_RELEASE } from './constants';
import iAction from '../../interfaces/iAction';
import iPost from '../../interfaces/iPost';

export function loadRandomRelease() {
    return dispatch => {
        Api.get<iPost>('post/random').then(r => {
            dispatch(receiveRandomRelease(r));
        }).catch(console.error);
    };
}

export interface iReceiveRandomRelease extends iAction {
    release: iPost,
}
export function receiveRandomRelease(release: iPost): iReceiveRandomRelease {
    return {
        type: RECEIVE_RANDOM_RELEASE,
        release,
    };
}

export function resetRandomRelease() {
    return receiveRandomRelease(null);
}