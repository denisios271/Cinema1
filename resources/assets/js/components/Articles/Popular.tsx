import * as React from 'react';
import * as actions from './actions';
import { iState } from './reducers';
import { connect } from 'react-redux';
import * as $ from 'jquery';
import ArticlesList from './List';

export interface ArticlesProps {
    state: iState,
}

class PopularArticles extends React.Component<ArticlesProps> {
    render() {
        const articles = this.props.state.popularArticles;
        return <ArticlesList articles={articles} title="Популярные статьи" />;
    }
}

interface iGlobalState {
    articles: iState,
    [key: string]: any,
}

export default connect(
    (state: iGlobalState) => ({ state: state.articles }),
)(PopularArticles);