import iSeries from "../interfaces/iSeries";
import iEcho from "../interfaces/iEcho";
import { NotificationManager } from 'react-notifications';
import iPost from "../interfaces/iPost";

declare let Echo: iEcho;

export function bind() {
    Echo.channel(`Release.Global`).listen<{episode: iSeries, post: iPost}>(`.episode.created`, d => {
        NotificationManager.info(d.episode.name, 'На сайт добавлена новая серия!', 4000, () => {
            window.location.href = `/post/${d.post.alt_name}`;
        });
    });
}
