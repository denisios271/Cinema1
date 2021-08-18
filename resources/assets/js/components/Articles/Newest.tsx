import * as React from 'react';
import * as actions from './actions';
import { iState } from './reducers';
import { connect } from 'react-redux';
import * as $ from 'jquery';
import ArticlesList from './List';

export interface ArticlesProps {
    state: iState,
    load: () => void,
}

class NewestArticles extends React.Component<ArticlesProps> {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        const position = $(window).scrollTop() + $(window).height();
        const footerPosition = $(document).height() - $('#footer').innerHeight();
        const offset = 100;

        if(position > footerPosition - offset) {
            if (!this.props.state.isFetching && !this.props.state.isFinished) {
                this.props.load();
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const articles = this.props.state.articles;
        return <ArticlesList seo articles={articles} title="Новые статьи" />;
    }
}

interface iGlobalState {
    articles: iState,
    [key: string]: any,
}

export default connect(
    (state: iGlobalState) => ({ state: state.articles }),
    (dispatch: any) => ({
        load: () => dispatch(actions.load()),
    })
)(NewestArticles);