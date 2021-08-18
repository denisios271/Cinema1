import * as constants from './constants';
import Api from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import iAction from '../../interfaces/iAction';
import iPost from '../../interfaces/iPost';
import iPaginate from '../../interfaces/iPaginate';

export function loadPosts(title) {
    return dispatch => {
        let uri = `search/name/${title}/1/10/`;

        let localDataKey = `QuickSearchForm-${title}`;
        let localData = LocalStorage.load<iPost[]>(localDataKey);

        if (localData) {
            dispatch(receivePosts(localData));
        }
        Api.get<iPaginate<iPost>>(uri).then(r => {
            dispatch(receivePosts(r.data));
            LocalStorage.save(localDataKey, r.data);
        }).catch(console.error);
    };
}

export interface iReceivePosts extends iAction {
    posts: iPost[],
}
export function receivePosts(posts: iPost[]) {
    return {
        type: constants.RECEIVE_POSTS,
        posts,
    };
}

export function resetPosts() {
    return receivePosts([]);
}
