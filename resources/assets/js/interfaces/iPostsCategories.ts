import iPost from "./iPost";
import iCategory from "./iCategory";

export default interface iPostsCategories {
    id: number,
    post_id: number,
    category_id: number,

    post?: iPost,
    category?: iCategory,
}