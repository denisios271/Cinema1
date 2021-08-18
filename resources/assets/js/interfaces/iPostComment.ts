import iPost from './iPost';
import iUser from './iUser';

export default interface iPostComment {
    id: number,
    post_id: number,
    user_id: number,
    body: string,
    created_at: string,
    updated_at: string,
    user: iUser,
    post?: iPost,
}