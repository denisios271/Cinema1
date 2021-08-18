import * as React from 'react';
import { Link, } from 'react-router-dom';
import iUser from '../../../../interfaces/iUser';

interface iProps {
    user: iUser,
}

export default class Profile extends React.Component<iProps> {
    renderLabel(title, value) {
        return (
            <div className="form-group user__info-group info-group">
                <p className="info-group__title">{title}</p>
                <p className="info-group__value">{value}</p>
            </div>
        );
    }

    render() {
        // need to recheck all team avatars 
        // let userAvatarImg = this.props.user.foto ? this.props.user.foto : "/images/avatars/noname.png";
        let userAvatarImg = "/images/avatars/noname.png";

        return (
            <div className="user">
                <div className="user__avatar-overflow">
                    <div className="user__avatar">
                        <div className="avatar">
                            <div className="avatar__overflow">
                                <img className="avatar__image" src={userAvatarImg} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user__info">
                    {this.renderLabel('Ваш никнейм', this.props.user.name)}
                    {this.renderLabel('Ваш email', this.props.user.email)}
                    {!!this.props.user.fullname && this.renderLabel('Ваше реальное', this.props.user.fullname)}
                    {this.renderLabel('Дата регистрации', this.props.user.created_at)}
                    {this.renderLabel('Дата последней авторизации', this.props.user.updated_at)}
                </div>
            </div>
        );
    }
}