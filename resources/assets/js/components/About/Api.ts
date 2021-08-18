import * as constants from './constants';
import Api from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import iTeamMember from '../../interfaces/iTeamMember';
import { receiveTeamInformation } from './actions';

interface iResponse {
    about: string,
    team: iTeamMember[],
}

export function loadTeamInformation() {
    return dispatch => {
        const localDataKey = `team`;

        // do we have local data?
        const localData = LocalStorage.load<iResponse>(localDataKey);
        if (localData) {
            dispatch(receiveTeamInformation(localData.about, localData.team));
        }

        Api.get<iResponse>('team').then(r => {
            dispatch(receiveTeamInformation(r.about, r.team));
            // lets update local storage!
            LocalStorage.save(localDataKey, {
                about: r.about,
                team: r.team,
            });
        }).catch(console.error);
    }
}
