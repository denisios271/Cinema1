import iAction from './iAction';

export default interface iReducerMap<T> {
    /**
     * Key is an action's unique string (constant stored in `constants` files).
     * Value is a function (callback) - will be called with params - current state and action.
     * You should return new state instance.
     * 
     * @param {any} state Current state. Shouldn't be changed.
     * @param {iAction} action Here stored any sent params.
     * @returns {any} New state instance.
     */
    [actionType: string]: (state: T, action: iAction) => T,
}