import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import * as $ from 'jquery';

import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from "../Header";
import Footer from "../Footer";

import AdminPage from '../Admin/index';
import AdminPostsList from '../Admin/Post/List';
import AdminPostAdd from '../Admin/Post/Add';
import AdminPostEdit from '../Admin/Post/Edit';
import AdminPostRemove from '../Admin/Post/Remove';
import AdminPostsRequestedAdding from '../Admin/Post/RequestedAdding';
import AdminPostsRequestedRemoving from '../Admin/Post/RequestedRemoving';
import AdminArticleList from '../Admin/Article/List';
import AdminArticleAdd from '../Admin/Article/Add';
import AdminArticleEdit from '../Admin/Article/Edit';
import AdminArticleRemove from '../Admin/Article/Remove';
import AdminArticleRequestedAdding from '../Admin/Article/RequestedAdding';
import AdminArticleRequestedRemoving from '../Admin/Article/RequestedRemoving';
import AdminSeriesList from '../Admin/Series/List';
import AdminSeriesAdd from '../Admin/Series/Add';
import AdminSeriesEdit from '../Admin/Series/Edit';
import AdminSeriesRemove from '../Admin/Series/Remove';
import AdminSeriesRequestedAdding from '../Admin/Series/RequestedAdding';
import AdminSeriesRequestedRemoving from '../Admin/Series/RequestedRemoving';

import Loading from '../Loading';
import ReactLoading from 'react-loading';
import iGlobalState from '../../interfaces/iGlobalState';
import { History } from 'history';

interface iMenuItemProps {
    id: string,
    title: string,
    items: iMenuItem[],
}

interface iMenuItem {
    title: string,
    uri: string
}

class MenuItem extends React.Component<iMenuItemProps> {
    componentDidMount() {
        $('.header__block-top').hide();
        $('body').append('<link id="bootstrap-css" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">');
    }

    componentWillUnmount() {
        $('.header__block-top').show();
        $('body #bootstrap-css').remove();
    }
    
    render() {
        return (
            <div className="dropdown">
                <a className="dropdown-toggle list-group-item list-group-item-action"
                    href="#"
                    role="button"
                    id={`admin-menu-dd-${this.props.id}`}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ borderRadius: 0, }}>
                    {this.props.title}
                </a>

                <div className="dropdown-menu" aria-labelledby={`admin-menu-dd-${this.props.id}`}>
                    {this.props.items.map((v, i) =>
                        <Link className="dropdown-item" key={i} to={v.uri}>
                            {v.title}
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

interface iWrapperProps {
    state: iGlobalState,
    history: History,
}

interface iWrapperState {
    hasError: boolean,
    error: null|string,
    info: null|any,
}

class Wrapper extends React.Component<iWrapperProps, iWrapperState> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null,
        };
        this.clearError = this.clearError.bind(this);
    }

    componentWillMount() {
        this.props.history.listen(() => this.clearError());
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error,
            info,
        });
    }

    clearError() {
        this.setState({
            hasError: false,
            error: null,
            info: null,
        });
    }

    renderMenu() {
        const { auth, } = this.props.state;
        const userGroup = auth.userData.user_group;
        let menu = [];

        switch (userGroup) {
            case 1:
            case 2:
                menu.push(<MenuItem key="3" id="3" title="Список запрошенных ресурсов" items={[
                    { title: 'Новые релизы', uri: '/admin/posts/requested/adding', },
                    { title: 'Релизы на удаление', uri: '/admin/posts/requested/removing', },

                    { title: 'Новые серии', uri: '/admin/series/requested/adding', },
                    { title: 'Серии на удаление', uri: '/admin/series/requested/removing', },

                    { title: 'Новые статьи', uri: '/admin/article/requested/adding', },
                    { title: 'Статьи на удаление', uri: '/admin/article/requested/removing', },
                ]} />);
                menu.push(<MenuItem key="2" id="2" title="Статьи" items={[
                    { title: 'Просмотреть список статей', uri: '/admin/article/list/', },
                    { title: 'Добавить статью', uri: '/admin/article/add/', },
                    { title: 'Редактировать статью', uri: '/admin/article/list/', },
                    { title: 'Удалить статью', uri: '/admin/article/list/', },
                ]} />);
            case 3:
                menu.push(<MenuItem key="1" id="1" title="Релиз" items={[
                    { title: 'Просмотреть список релизов', uri: '/admin/post/list/', },
                    { title: 'Добавить релиз', uri: '/admin/post/add/', },
                    { title: 'Редактировать релиз', uri: '/admin/post/list/', },
                    { title: 'Удалить релиз', uri: '/admin/post/list/', },
                ]} />);
        }

        return (
            <div className="list-group">
                {menu}
            </div>
        );
    }

    renderLoading() {
        return (
            <div className="row">
                <div className="col"></div>
                    <div className="col-xs-12 col-sm-12 text-center block-center">
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

    renderError(error) {
        return (
            <div className="row">
                <div className="col"></div>
                    <div className="col-xs-12 col-sm-12 text-center block-center">
                        <h1>{error}</h1>
                    </div>
                <div className="col"></div>
            </div>
        );
    }

    renderContent() {
        const { admin, auth, } = this.props.state;

        if (auth.isFetching) {
            return this.renderLoading();
        }

        if (!auth.isLogged) {
            return this.renderError('Вы должны авторизоваться');
        }

        if (auth.userData.user_group >= 4) {
            return this.renderError('У вас нет прав для просмотра этого раздела.');
        }

        return(
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-3">
                    {this.renderMenu()}
                </div>
                <div className="col">
                    {this.state.hasError ? (
                        <section className="row">
                            <div className="col">
                                <h1>Произошла ошибка</h1>
                                <div className="alert alert-danger">
                                    {this.state.error.toString()}
                                <p><small>{this.state.info.componentStack}</small></p>
                                </div>
                                <div className="alert alert-warning">
                                    Если данная ошибка не пропала спустя какое - то время: отправьте администратору скриншот страницы.
                                </div>
                            </div>
                        </section>
                    ) : (
                        <Switch>
                            <Route exact path = "/admin" component = {AdminPage} />

                            <Route path = "/admin/post/list" component = {AdminPostsList} />
                            <Route path = "/admin/post/add" component = {AdminPostAdd} />
                            <Route path = "/admin/post/edit/:postId?" component = {AdminPostEdit} />
                            <Route path = "/admin/post/remove/:postId?" component = {AdminPostRemove} />
                            <Route path = "/admin/posts/requested/adding" component = {AdminPostsRequestedAdding} />
                            <Route path = "/admin/posts/requested/removing" component = {AdminPostsRequestedRemoving} />

                            <Route path = "/admin/article/list" component = {AdminArticleList} />
                            <Route path = "/admin/article/add" component = {AdminArticleAdd} />
                            <Route path = "/admin/article/edit/:id" component = {AdminArticleEdit} />
                            <Route path = "/admin/article/remove/:id" component = {AdminArticleRemove} />
                            <Route path = "/admin/article/requested/adding" component = {AdminArticleRequestedAdding} />
                            <Route path = "/admin/article/requested/removing" component = {AdminArticleRequestedRemoving} />

                            <Route path = "/admin/series/add-to-post/:postId" component = {AdminSeriesAdd} />
                            <Route path = "/admin/series/edit/:seriesId" component = {AdminSeriesEdit} />
                            <Route path = "/admin/series/remove/:seriesId" component = {AdminSeriesRemove} />
                            <Route path = "/admin/series/requested/adding" component = {AdminSeriesRequestedAdding} />
                            <Route path = "/admin/series/requested/removing" component = {AdminSeriesRequestedRemoving} />

                            <Route path = "/admin/*" exact render = {() => <Redirect to = '/admin' />} />
                        </Switch>
                    )}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header />
                <div className = "container-fluid">
                    <div className = "row">
                        <main className = "col-xs-12 col-sm-12 bg-light">
                            {this.renderContent()}
                        </main>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        state,
    })
)(Wrapper);