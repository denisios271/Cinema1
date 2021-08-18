import iUser from "./iUser";
import iArticle from "./iArticle";

export default interface iFavoriteArticle {
    id: number,
    article_id: number,
    user_id: number,
    created_at: string,
    updated_at: string,

    user?: iUser,
    article?: iArticle,
}