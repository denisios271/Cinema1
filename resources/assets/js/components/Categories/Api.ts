import Api from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import iCategory from '../../interfaces/iCategory';
import { receiveCategories } from './actions';

export function loadCategories() {
    return dispatch => {
        const localDataKey = `categories`;
        const localData = LocalStorage.load<iCategory[]>(localDataKey);
        if (localData) {
            dispatch(receiveCategories(localData));
        }
        Api.get('category/all/').then((r: iCategory[]) => {
            dispatch(receiveCategories(r));
            LocalStorage.save(localDataKey, r);
        }).catch(console.error);
    };
}