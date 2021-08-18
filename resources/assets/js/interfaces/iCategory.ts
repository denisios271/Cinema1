import iPostsCategories from './iPostsCategories';

export default interface iCategory {
    id: number,
    parentid: number,
    name: string,
    alt_name: string,
    descr: string|null,
    keywords: string|null,
    created_at: string,
    updated_at: string,
    requested_removing: number,
    requested_removing_user: number|null,
    requested_adding: number,
    requested_adding_user: number|null,

    // ----------------------------
    // Laravel's attributes

    posts?: iPostsCategories[],
}