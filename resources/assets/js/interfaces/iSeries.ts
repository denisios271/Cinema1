import iSeriesContent from './iSeriesContent';
import iType from './iType';
import iPost from './iPost';

export default interface iSeries {
    id: number,
    post_id: number,
    name: string,
    type_id: number,
    created_at: string,
    updated_at: string,
    requested_removing: number,
    requested_removing_user: number|null,
    requested_adding: number,
    requested_adding_user: number|null,

    players?: iSeriesContent[],
    type?: iType,
    post?: iPost,
}