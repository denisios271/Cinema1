import { combineReducers } from 'redux';
import { routerReducer, RouterState, } from 'react-router-redux'

/**
 * Here you can import all your special reducers with it's initials states
 */
import * as posts from './components/PostsPage/reducers';
import * as post from './components/PostPage/reducers';
import * as series from './components/PostPage/PlayersBlock/reducers';
import * as categories from './components/Categories/reducers';
import * as friends from './components/Friends/reducers';
import * as randomRelease from './components/RandomRelease/reducers';
import * as HomePage from './components/HomePage/reducers';
import * as QuickSearchForm from './components/QuickSearchForm/reducers';
import * as Auth from './components/Auth/reducers';
import * as Team from './components/About/reducers';
import * as Admin from './components/Admin/reducers';
import * as Articles from './components/Articles/reducers';
import * as Article from './components/Article/reducers';
import * as Favorite from './components/Favorites/reducers';
import * as BlackJackGame from './components/Games/BlackJack/reducers';
import * as postVote from './components/PostVote/reducers';

/**
 * It helps to IDE's highlighting
 */
export interface iGlobalState {
    [posts.key]: posts.iState,
    [post.key]: post.iState,
    [series.key]: series.iState,
    [categories.key]: categories.iState,
    [friends.key]: friends.iState,
    [randomRelease.key]: randomRelease.iState,
    [HomePage.key]: HomePage.iState,
    [QuickSearchForm.key]: QuickSearchForm.iState,
    [Auth.key]: Auth.iState,
    [Team.key]: Team.iState,
    [Admin.key]: Admin.iState,
    [Articles.key]: Articles.iState,
    [Article.key]: Article.iState,
    [Favorite.key]: Favorite.iState,
    [BlackJackGame.key]: BlackJackGame.iState,
    [postVote.key]: postVote.iState,
    routing: RouterState,
}

/**
 * Init collector for joining all reducers & initial states
 * Should have { key: value } where:
 * `key` is a key in store (we can grab current state using this key)
 * `value` is an imported object from our components
 */
let collector: any[] = [
    posts,
    post,
    series,
    categories,
    friends,
    randomRelease,
    HomePage,
    QuickSearchForm,
    Auth,
    Team,
    Admin,
    Articles,
    Article,
    Favorite,
    BlackJackGame,
    postVote,
];

/**
 * Let's fill all reducers & initial states
 */
let reducers: any = {};
let initialStates: any = {};
collector.forEach(v => {
    reducers[v.key] = v.reducer;
    initialStates[v.key] = v.initialState;
});

/**
 * Fill all special reducers or initial states
 */
reducers.routing = routerReducer;

/**
 * Combine all reducers via special function (from redux)
 */
reducers = combineReducers(reducers);

/**
 * And export what we have
 */
export { reducers, initialStates };
