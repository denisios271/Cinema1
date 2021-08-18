export default interface iCard {
    id: number,
    rank: number,
    title: string,
    description: string,
    /** Stores number (f.e. 7) - if u want to play sound - use `${card.rank}-${Math.floor(Math.random() * 7) + 1}` */
    sounds_count: number,
}