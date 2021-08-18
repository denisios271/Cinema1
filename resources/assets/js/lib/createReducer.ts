import iAction from '../interfaces/iAction';
import iReducerMap from '../interfaces/iReducerMap';

export default function createReducer<T>(initialState: T, reducerMap: iReducerMap<T>): (state: T, action: iAction) => T {
    return (state: T = initialState, action: iAction) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action) : state;
    };
}