export default interface iEcho {
    channel(channel: string): iEcho,
    private(channel: string): iEcho,
    listen<Response>(event: string, callback: (data: Response) => void): iEcho,
}