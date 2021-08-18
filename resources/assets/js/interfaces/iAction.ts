export default interface iAction {
    /** Action's type - needs for reducers */
    type: string,

    /** Any data you need to transfer into reducers */
    [key: string]: any,
}