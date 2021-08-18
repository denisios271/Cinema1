export default interface iPaginate<T> {
    /** Array of requested data */
    data: T[],
    
    /** Just current page */
    current_page: number,
    
    /** Last page number (like 13) */
    last_page: number,

    /** Items per page (maximum items) */
    per_page: number,

    /** In general it's the start item's index on the page */
    from: number,
    
    /** In general it's the last item's index on the page */
    to: number,
    
    /** Count of all items */
    total: number,
    
    /** Looks like http://localhost/api/article/list/new?page=1 */
    first_page_url: string,

    /** Looks like http://localhost/api/article/list/new?page=13 */
    last_page_url: string,
    
    /** Looks like http://localhost/api/article/list/new?page=3 if current_page == 2 */
    next_page_url: string,
    
    /** Looks like http://localhost/api/article/list/new?page=1 if current_page == 2 */
    prev_page_url: null,
    
    /** Looks like http://localhost/api/article/list/new (without query param) */
    path: string,
}