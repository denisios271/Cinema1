import * as React from 'react';
import { connect } from 'react-redux';
import List from './list';
import iGlobalState from '../../interfaces/iGlobalState';
import { key, iState } from './reducers';
import SeoWrapper from '../Wrappers/Seo';
import iArticle from '../../interfaces/iArticle';
import { Link } from 'react-router-dom';
import iPost from '../../interfaces/iPost';
import iPaginate from '../../interfaces/iPaginate';
import Api from '../../lib/Api';

interface iProps {
    latestPosts: iState,
    article: iArticle,
}

interface iComponentState {
    announcement: iPost[],
}

class HomePage extends React.Component<iProps, iComponentState> {
    state = {
        announcement: [],
    };

    componentDidMount() {
        Api.get<iPaginate<iPost>>('search/category/announcement/1/2').then(posts => {
            this.setState({
                announcement: posts.data,
            });
        }).catch(null);
    }
    
    render() {
        return (
            <SeoWrapper title='FireDub.Net - новинки Аниме и Дорам' description='Смотреть аниме и дорамы онлайн в хорошем качестве без регистрации'>
                <List id={`popular-collection`} posts={this.props.latestPosts.popularPosts} needSubline />
                <List id={`new-collection`} posts={this.props.latestPosts.newPosts} />
                <div className="content-row">
                    <div className="content-bottom">
                        <div className="content-bottom__news">
                            {!!this.props.article && (
                                <div className="text-news-main">
                                    <Link to={`/article/${this.props.article.uri}`} className="text-news-main__header">
                                        {this.props.article.title}
                                    </Link>
                                    <div className="text-news-main__short_text" dangerouslySetInnerHTML={{
                                        __html: `${this.props.article.content.substr(0, 115)}...`,
                                    }}>
                                    </div>
                                    <Link to={`/article/${this.props.article.uri}`}>Читать дальше</Link>
                                </div>
                            )}
                        </div>
                        <div className="content-bottom__relize-soon">
                            <div className="relize-soon">

                                {this.state.announcement.map((v,k) =>
                                    <div key={k} className="relize-soon__cont">
                                        <div className="relize">
                                            <div className="relize__max-size">
                                                <Link to={`/post/${v.alt_name}`}>
                                                    <div className="relize__image-cont relize-sizes">
                                                        <img className="relize__image relize-sizes__image" src={v.poster} alt={v.poster} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="relize-soon__header-soon"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </SeoWrapper>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        latestPosts: state[key],
        article: state.articles.popularArticles[0],
    })
)(HomePage);