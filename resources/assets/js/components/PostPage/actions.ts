import { changeSeriesNumber, changeSeriesPlayer, changeSeriesType, smartChangePlayer } from './PlayersBlock/actions';
import { RECEIVE_POST, FETCHING_POST, RECEIVE_ERROR, RECEIVE_COMMENTS } from './constants';
import Api from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import iPost from '../../interfaces/iPost';
import iAction from '../../interfaces/iAction';
import iPaginate from '../../interfaces/iPaginate';
import iPostComment from '../../interfaces/iPostComment';

const commentsLoadingInterval = 5000; // should be set in ms, the default value is 5 seconds
let commentsInterval: any = null; // webpack and ts are doing here something strange - so just 'any'

export function requestPost(altName: string) {
    return dispatch => {
        const localKey = `Post/${altName}`;
        const localData = LocalStorage.load<iPost>(localKey);
        if (localData) {
            dispatch(smartPostReceiving(localData));
        } else {
            dispatch(fetchingPost());
        }
        Api.get<iPost>(`post/alt_name/${altName}`).then(r => {
            dispatch(smartPostReceiving(r));
            LocalStorage.save(localKey, r);
            dispatch(loadComments(r.id));

            // let's `restart` our automatically comments function
            if (commentsInterval) {
                clearInterval(commentsInterval);
            }
            commentsInterval = setInterval(() => {
                dispatch(loadComments(r.id));
            }, commentsLoadingInterval);
        }).catch(e => {
            dispatch(receiveError(e.error));
        });
    };
}

export function smartPostReceiving(post: iPost) {
    return dispatch => {
        dispatch(receivePost(post));
        const selected = {
            type: LocalStorage.load(`Post/${post.id}/selected/type`),
            series: LocalStorage.load(`Post/${post.id}/selected/series`),
            player: LocalStorage.load(`Post/${post.id}/selected/player`),
        };

        // is type was saved & it's not null & it exists in current all types
        const isValidSelectedType = selected.type && selected.type != 0 && post.seriesTypes.find(v => v.id == selected.type);
        if (isValidSelectedType) {
            dispatch(changeSeriesType(selected.type));
        } else {
            dispatch(changeSeriesType(post.seriesTypes[0].id));
        }

        const isValidSelectedEpisode = isValidSelectedType && selected.series;
        if (isValidSelectedEpisode) {
            dispatch(changeSeriesNumber(selected.series));
        } else {
            dispatch(changeSeriesNumber(0));
        }

        const isValidSelectedPlayer = isValidSelectedEpisode && selected.player;
        if (isValidSelectedPlayer) {
            dispatch(changeSeriesPlayer(selected.player));
        } else {
            dispatch(smartChangePlayer());
        }
    };
}

export function loadComments(postId: number) {
    return dispatchEvent => {
        Api.get<iPaginate<iPostComment>>(`post/comments/${postId}`).then(r => {
            dispatchEvent(receiveComments(r));
        }).catch(console.error);
    };
}

export function fetchingPost() {
    return {
        type: FETCHING_POST,
    };
}

export interface iReceivePost extends iAction {
    post: iPost,
}
export function receivePost(post: iPost) {
    return {
        type: RECEIVE_POST,
        post,
    };
}

export function resetPost() {
    return receivePost(null);
}

export interface iReceiveError extends iAction {
    error: string,
}
export function receiveError(error: string) {
    return {
        type: RECEIVE_ERROR,
        error,
    };
}

export interface iReceiveComments extends iAction {
    comments: iPaginate<iPostComment>,
}
export function receiveComments(comments: iPaginate<iPostComment>): iReceiveComments {
    return {
        type: RECEIVE_COMMENTS,
        comments
    };
}