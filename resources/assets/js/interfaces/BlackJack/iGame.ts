import iGivenCard from "./iGivenCard";

export default interface iGame {
    id: number,
    user_id: number,
    opponent_id: number|null,
    is_user_standed: number,
    is_opponent_standed: number,
    is_finished: number,
    created_at: string,
    updated_at: string,
    finished_date_timestamp: number|null,
    is_user_have_positive_cards: boolean,
    
    /** Set in special situations */
    cards?: iGivenCard[],
}