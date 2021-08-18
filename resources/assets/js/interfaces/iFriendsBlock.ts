import iFriend from "./iFriend";

export default interface iFriendsBlock {
    id: number,
    title: string,

    data?: iFriend[],
}