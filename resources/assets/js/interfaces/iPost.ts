import iUser from "./iUser";
import iSeries from "./iSeries";
import iType from "./iType";
import iCategory from "./iCategory";

export default interface iPost {
    id: number,
    created_at: string,
    updated_at: string,
    publisher: number,
    full_story: string,
    title: string,
    keywords: string|null,
    alt_name: string,
    tags: string|null,
    poster: string|null,
    trailer: string|null,
    voicers: string|null,
    translaters: string|null,
    timers: string|null,
    requested_removing: number,
    requested_removing_user: number|null,
    requests: number,
    requested_adding: number,
    requested_adding_user: number|null,
    has_public_access: number,

    // ----------------------------
    // Laravel's attributes

    // publisher?: iUser, // TODO: what can we do with this? it's similar to publisher id...
    series?: iSeries[],
    categories?: iCategory[],
    seriesTypes?: iType[],
}