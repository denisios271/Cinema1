import { RECEIVE_CATEGORIES } from './constants';
import iCategory from '../../interfaces/iCategory';

export interface iReceiveCategories {
    categories: iCategory[],
}
export function receiveCategories(categories: iCategory[]) {
    return {
        type: RECEIVE_CATEGORIES,
        categories,
    };
}