import iUser from './iUser';

export default interface iArticle {
    id: number,
    user_id: number,
    title: string,
    uri: string,
    hashtags: string,
    created_at: string,
    updated_at: string,
    requested_removing: number,
    requested_removing_user: number|null,
    requests: number,
    content: string,
    short_content: string,

    publisher?: null|iUser,
}