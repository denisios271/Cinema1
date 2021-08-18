import Api, { iError } from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import iArticle from '../../interfaces/iArticle';
import { receive, beginFetching, stopFetching, receiveError } from './actions';

export function load(uri: string) {
    return dispatch => {
        const localKey = `Article/${uri}`;
        const localData = LocalStorage.load(localKey);
        if (localData) {
            dispatch(receive(localData));
        } else {
            dispatch(beginFetching());
        }
        Api.get<iArticle>(`article/uri/${uri}`).then(r => {
            dispatch(receive(r));
            dispatch(stopFetching());
            LocalStorage.save(localKey, r);
        }).catch((e: iError) => {
            dispatch(receiveError(e.error));
        });
    };
}