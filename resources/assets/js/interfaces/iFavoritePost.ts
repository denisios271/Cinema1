import iUser from "./iUser";
import iPost from "./iPost";

export default interface iFavoritePost {
    /** Unique identifier */
    id: number,

    /** Post's identifier */
    post_id: number,

    /** User's identifier */
    user_id: number,

    /** When created - string */
    created_at: string,

    /** When updated - string */
    updated_at: string,

    // ----------------------------
    // Laravel's attributes

    /** User instance (can not exist) */
    user?: iUser,

    /** Post instance (can not exist) */
    post?: iPost,
}