import * as constants from './constants';
import iAction from '../../interfaces/iAction';
import iTeamMember from '../../interfaces/iTeamMember';

export interface iReceiveTeamInformation extends iAction {
    aboutMessage: string,
    teamArray: iTeamMember[],
}
export function receiveTeamInformation(aboutMessage: string, teamArray: iTeamMember[]) {
    return {
        type: constants.RECEIVE_TEAM_INFO,
        aboutMessage,
        teamArray,
    };
}

export interface iReceiveError extends iAction {
    errorMessage: string,
}
export function receiveError(errorMessage) {
    return {
        type: constants.RECEIVE_TEAM_INFO,
        errorMessage
    };
}
