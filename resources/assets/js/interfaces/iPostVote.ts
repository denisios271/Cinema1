export default interface iPostVote {
    id: number,
    user_id: number,
    post_id: number,
    vote: number,
    is_old: number,
    created_at: string,
    updated_at: string,
}