import iPlayers from "./iPlayers";

export default interface iSeriesContent {
    id: number,
    seria_id: number,
    player_id: number,
    url: string,
    created_at: string,
    updated_at: string,

    player?: iPlayers,
}