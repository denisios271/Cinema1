import * as React from 'react';
import { connect, } from 'react-redux';
import iArticle from '../../interfaces/iArticle';
import { iState, } from './reducers';
import Page from './Details';
import * as actions from './actions';
import ReactLoading from 'react-loading';
import * as favoriteActions from '../Favorites/actions';
import { iState as iFavoriteState } from '../Favorites/reducers';
import { load } from './Api';

export interface iProps {
    state: iState,
    load: (uri: string) => void,
    addToFavorite: (postId: number) => void,
    removeFromFavorite: (postId: number) => void,
    match: {
        params: {
            uri: string|null,
            [key: string]: any,
        },
    },
    favorites: iFavoriteState,
}

class ArticlePage extends React.Component<iProps> {
    load(props: iProps) {
        if (props.match.params.uri) {
            props.load(props.match.params.uri);
        }
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillUpdate(props: iProps) {
        if (this.props.match.params.uri != props.match.params.uri) {
            this.load(props);
        }
    }

    render() {
        const { state, }= this.props;
        if (state.isFetching) {
            return <ReactLoading
                type="spinningBubbles"
                color="#333"
                delay={0}
                height={100}
                width={100}
            />;
        }

        if (state.article === null) {
            return (
                <section className="row">
                    <div className="col">
                        <div className="alert alert-danger">
                            Странно... Мы не нашли данную статью. Или, возможно, произошла какая - то ошибка. Напишите администратору сайта и мы решим ее вместе!
                        </div>
                    </div>
                </section>
            );
        }

        const isFavorite = this.props.favorites.articles.filter(v => v.id == state.article.id).length > 0;

        return <Page article={state.article} />;
    }
}

interface iGlobalStore {
    article: iState,
    favorite: iFavoriteState,
    [key: string]: any,
}

export default connect(
    (state: iGlobalStore) => ({
        state: state.article,
        favorites: state.favorite,
    }),
    (dispatchEvent: any) => ({
        load: (uri: string) => dispatchEvent(load(uri)),
        addToFavorite: (postId: number) => dispatchEvent(favoriteActions.addPostToFavorite(postId)),
        removeFromFavorite: (postId: number) => dispatchEvent(favoriteActions.removePostFromFavorite(postId)),
    })
)(ArticlePage);