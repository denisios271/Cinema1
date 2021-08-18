import iFriendsBlock from "./iFriendsBlock";

export default interface iFriend {
    id: number,
    friends_block_id: number,
    title: string,
    uri: string,

    friends_block?: iFriendsBlock,
}