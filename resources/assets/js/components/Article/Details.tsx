import * as React from 'react';
import iArticle from '../../interfaces/iArticle';
import SeoWrapper from '../Wrappers/Seo';
import Text from '../../lib/Text';
import { Link } from 'react-router-dom';

export interface iProps {
    article: iArticle,
}

export default class Article extends React.Component<iProps> {
    render() {
        const { article } = this.props;
        let metaDescription = article.content;
        metaDescription = Text.removeHtml(metaDescription);
        metaDescription = Text.cutForDescription(metaDescription);

        return (
            <SeoWrapper title={article.title} description={metaDescription}>
                <div className="news">
                    <div className="info__description-overflow text-center">
                        <div className="info__description">
                        
                            <div className="news__header news-header">
                                <div className="news-header__avatar-square avatar-square">
                                    <a>
                                        <div className="avatar-square__img-cont">
                                            <img className="avatar-square__img" src="/images/avatars/noname.png" alt="noname.png" />
                                        </div>
                                        <div className="avatar-square__name href_with_hover_bottom_line">
                                            {article.publisher ? article.publisher.name : 'Загружается...'}
                                        </div>
                                    </a>
                                </div>

                                <div className="news-header__info info">
                                    <div className="info__name">
                                        {article.title}
                                        <br/><u>{article.created_at.split(' ')[0]}</u>
                                    </div>
                                </div>

                            </div>

                            <div className="news__inner news-inner">
                                <div className="news-inner__cont">
                                    <div className="news-inner__text" dangerouslySetInnerHTML={{__html: article.content}}>
                                    </div>
                                    <div className="news-inner__share share"></div>
                                </div>
                                <div className="news-inner__kirin">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>




                {/* <section>
                    <div className="article">
                        <div className="row">
                            <div className="col">
                                <h1 className="fs-title article__title">
                                    {article.title}
                                </h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <ul className="breadcrumb article__tags">
                                    {article.hashtags.split(', ').map((v, i) =>
                                        <li key={i} className="breadcrumb-item">
                                            <a>#{v}</a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col">
                                <p className="lead article__content" dangerouslySetInnerHTML={{__html: article.content}}></p>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col">
                                <p className="article__info">
                                    <small>Опубликовано {article.created_at}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </section> */}
            </SeoWrapper>
        );
    }
}
