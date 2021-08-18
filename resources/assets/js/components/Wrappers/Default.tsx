import { Route, Switch, RouteComponentProps } from 'react-router';

import * as React from 'react';
import { withRouter, } from 'react-router';
import { ConnectedRouterProps, } from 'react-router-redux';
import Api from '../../lib/Api';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';

import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";

import HomePage from "../HomePage";
import Full from "../PostPage";
import PostsByCategory from '../PostsPage/PostsByCategory';
import PostsBySearching from '../PostsPage/PostsBySearching';
import NoMatch from "../errors/NoMatch";
import Auth from '../Auth';
import About from '../About';
import Catalog from '../Catalog';
import ArticlesPage from '../Articles/Newest';
import ArticlePage from '../Article';
import BlackJackGame from '../Games/BlackJack';
import Sidebar from '../Sidebar';
import SubCategories from '../PostsPage/SubCategories';
import PostInfo from '../Post/Info';

interface iState {
    hasError: boolean,
    error: Error|null,
    info: React.ErrorInfo|null,
}

class Wrapper extends React.Component<ConnectedRouterProps<any>, iState> {
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

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        Api.post(`issue/website`, {
            title: error.toString(),
            description: info.componentStack,
        }).then(null).catch(null);
        this.setState({
            hasError: true,
            error,
            info,
        });
    }

    clearError(): void {
        this.setState({
            hasError: false,
            error: null,
            info: null,
        });
    }

    canRenderSidebar(): boolean {
        // return location.pathname === '/' || location.pathname.indexOf('/post/') >= 0;
        return location.pathname === '/';
    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                <PostInfo path={this.props.history.location.pathname} />
                <SubCategories path={this.props.history.location.pathname} />
                <main className="main-container">
                    {this.canRenderSidebar() && <Sidebar path={this.props.history.location.pathname} />}
                    <div className={this.canRenderSidebar() ? 'content' : 'content-full-size'}>
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
                                <Route exact path = "/" component = {HomePage} />
                                <Route path = "/post/:alt_name" component = {Full} />
                                <Route path = "/category/:value/:page_num?" component = {PostsByCategory} />
                                <Route path = "/search/:value/:page_num?" component = {PostsBySearching} />
                                <Route path = "/profile(/*)" component = {Auth} />
                                <Route path = "/about(/*)" component = {About} />
                                <Route path = "/catalog" component = {Catalog} />
                                <Route path = "/articles" component = {ArticlesPage} />
                                <Route path = "/article/:uri" component = {ArticlePage} />
                                <Route path = "/game" component = {BlackJackGame} />
                                <Route path = "*" component = {NoMatch} />
                            </Switch>
                        )}
                    </div>
                </main>
                <Footer />
                <NotificationContainer />
            </div>
        );
    }
}

export default withRouter(Wrapper);