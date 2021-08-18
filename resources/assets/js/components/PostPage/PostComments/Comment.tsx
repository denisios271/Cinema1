
import * as React from 'react';
import iPostComment from '../../../interfaces/iPostComment';
import { connect } from 'react-redux';
import iGlobalState from '../../../interfaces/iGlobalState';
import { key as authKey } from '../../Auth/reducers';
import iUser from '../../../interfaces/iUser';
import Api, { iError } from '../../../lib/Api';
import Alert from '../../Alert';
import RequestFailureAlert from '../../Alert/RequestFailure';
// import defaultImageSrc from ...  ???


interface iProps {
    comment: iPostComment,
    user: iUser,
}

class Comment extends React.Component<iProps> {
    muteUser = (minutes: number = 0) => {
        Api.post(`admin/mute-user/${minutes}`, {
            user_id: this.props.comment.user_id,
        }).then(() => Alert(`${this.props.comment.user.name} MUTED for ${minutes ? `${minutes} minutes` : ''}`)).catch(RequestFailureAlert);
    }

    unmuteUser = () => {
        Api.post(`admin/unmute-user`, {
            user_id: this.props.comment.user_id,
        }).then(() => Alert(`${this.props.comment.user.name} UNMUTED`)).catch(RequestFailureAlert);
    }

    render() {
        let defaultImage = "/images/avatars/noname.png";

        // let img = this.props.comment.user.foto == null ? defaultImage : this.props.comment.img;
        let img = defaultImage;

        return (
            <div className="comment__overflow">
                <div className="comment__avatar">
                    <div className="avatar">
                        <div className="avatar__overflow">
                            <img className="avatar__image" src={img} />
                        </div>
                    </div>
                </div>
                <div className="comment__commentText commentText__text">
                    <div className="commentText__data">
                        <div className="commentText__author">
                            {this.props.comment.user.name}
                        </div>
                        <div className="commentText__date">
                            {this.props.comment.created_at}
                            {this.props.user && this.props.user.user_group < 4 && (
                                <div>
                                    <button onClick={e => this.muteUser()}>Mute</button>
                                    <button onClick={e => this.unmuteUser()}>UnMute</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="commentText__text">
                        {this.props.comment.body}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: iGlobalState) => ({
        user: state[authKey].userData,
    })
)(Comment);
