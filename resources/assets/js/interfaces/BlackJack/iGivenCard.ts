import iCard from "./iCard";

export default interface iGivenCard {
    id: number,
    user_id: number,
    game_id: number,
    card_id: number,
    created_at: string,
    updated_at: string,
    card: iCard,
    is_server: boolean,
}