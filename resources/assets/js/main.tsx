/**
 * @author Vladimir Ryabtsev
 * @file This is an entry point for application
 * @copyright Vladimir Ryabtsev 2016
 */

 // this should fix issues with network for old IE browsers
require('es6-promise').polyfill();
require('isomorphic-fetch');
import 'babel-polyfill';
import 'slick-carousel';
import YanInit from './lib/Yan/init';
YanInit();

// import all notifications for site (like new episode)
import "./notifications";

// import all base react things
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, } from 'react-router'; 
import { BrowserRouter, } from 'react-router-dom';

// import all pages
import DefaultWrapper from "./components/Wrappers/Default";
import AdminWrapper from "./components/Wrappers/Admin";
import GameWrapper from "./components/Wrappers/Game";

// import everything standart data for redux things
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, Store} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducer from './reducers';

// middleware that logs actions
const shouldShowReduxLogger = !(process.env.NODE_ENV === 'production') && 0;
const loggerMiddleware = createLogger({ predicate: (getState, action) => shouldShowReduxLogger });

// redux's store configuration and it's creation
function configureStore() {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware,
        ),
    );
    return createStore<iGlobalState>(reducer.reducers, reducer.initialStates, enhancer);
}
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store)

// import all actions
import { loadFriends, } from './components/Friends/actions';
import { loadCategories, } from './components/Categories/Api';
import { initialization as homePageInitialization } from './components/HomePage/actions';
import { hiddenCheckLogin, } from './components/Auth/actions';
import { loadTeamInformation, } from './components/About/Api';
import { initialLoading, } from './components/Admin/actions';
import * as articlesActions from './components/Articles/actions';
import * as favoriteActions from './components/Favorites/actions';
import * as blackJackActions from './components/Games/BlackJack/actions';
import { initialLoading as initialLoadingPostVotes } from './components/PostVote/actions';
import iGlobalState from "./interfaces/iGlobalState";
import { any } from 'prop-types';

// initial events
setTimeout(() => {
    store.dispatch<any>(loadFriends());
    store.dispatch<any>(loadCategories());
    store.dispatch<any>(homePageInitialization());
    store.dispatch<any>(hiddenCheckLogin());
    store.dispatch<any>(loadTeamInformation());
    store.dispatch<any>(initialLoading());
    store.dispatch<any>(articlesActions.loadPopular());
    store.dispatch<any>(articlesActions.load());
    store.dispatch<any>(favoriteActions.loadEverything());
    store.dispatch<any>(blackJackActions.init());
    store.dispatch<any>(initialLoadingPostVotes());
}, 0);

interface iApplicationProps {
    store: Store<iGlobalState>,
}

class Application extends React.Component<iApplicationProps> {
    render() {
        return (
            <Provider store={this.props.store}>
                <BrowserRouter>
                    <Switch>
                        <Route path = "/admin" component = {AdminWrapper} />
                        <Route path = "/game" component = {GameWrapper} />
                        <Route path = "/" component = {DefaultWrapper} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<Application store = {store} />, document.getElementById('app'));