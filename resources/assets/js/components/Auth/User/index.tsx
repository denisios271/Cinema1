import * as React from 'react';
import { Route, Switch, } from 'react-router';
import ReactLoading from 'react-loading';
import Profile from './Profile';
import FavoriteArticle from './Favorite/Article';
import FavoritePost from './Favorite/Post';
import { Link, } from 'react-router-dom';
import iUser from '../../../interfaces/iUser';

interface iProps {
    isFetching: boolean,
    data: iUser,
    logout(): void,
}

export default class User extends React.Component<iProps> {
    renderMenuItems() {
        return (
            <>
                <ul className="tabs user-tabs styled_header">
                    <div className="user__header styled_header">Личный кабинет</div>
                    <Link className="tab type-button__href type-button__href-user" to="/profile">Профиль</Link>
                    <Link className="tab type-button__href type-button__href-user" to="/profile/favorite/posts">Избранные сериалы</Link>
                    <Link className="tab type-button__href type-button__href-user" to="/profile/favorite/articles">Избранные новости</Link>
                    
                </ul>
            </>
        );
    }

    renderCardContent(title: string, component: JSX.Element) {
        return (
            <div className="card user_info">
                <div className="card-body">
                    <h2 className="user_info__header">{title}</h2>
                    {component}
                </div>
            </div>
        );
    }

    render() {
        if (this.props.isFetching) {
            return (
                <div className="row">
                    <div className="col"></div>
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-6">
                            <ReactLoading
                                type="spinningBubbles"
                                color="#333"
                                delay={0}
                                height="100"
                                width="100"
                            />
                        </div>
                    <div className="col"></div>
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-12">
                    {this.props.data.user_group < 4?
                        <div className="admin__menu">
                            Админ-Меню {this.props.data.user_group < 4 && <Link className="button_styled" to = {`/admin`}>(Админка)</Link>}
                        </div>
                        : ""
                    }
                    <br/>
                    {this.renderMenuItems()}
                </div>
                <div className="col-12">
                    <Switch>
                        <Route exact path="/profile" component={() => this.renderCardContent('Профиль', <Profile user={this.props.data} />)} />
                        <Route path="/profile/favorite/articles" component={() => this.renderCardContent('Избранные статьи', <FavoriteArticle />)} />
                        <Route path="/profile/favorite/posts" component={() => this.renderCardContent('Избранные сериалы', <FavoritePost />)} />
                    </Switch>
                </div>
                <div className="user__footer">
                    <div className="user__footer-href-overflow">
                        <a className="tab user__footer-href button_styled" onClick={this.props.logout.bind(this)}>Выход</a>
                    </div>
                </div>
                <div className="clear_both"></div>
            </div>
        );
    }
}