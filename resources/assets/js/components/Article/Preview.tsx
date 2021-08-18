import * as React from 'react';
import { Link, } from 'react-router-dom';
import iArticle from '../../interfaces/iArticle';

export interface iProps {
    article: iArticle,
}

export default class Preview extends React.Component<iProps> {
    render() {
        const { article } = this.props;
        return (
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
                                <div className="info__news-props">
                                    <span className="news-props__tag ">
                                        {article.hashtags.split(', ').map((v, i) =>
                                            <a key={i} className="href_with_hover_bottom_line">
                                                #{v}{i == 0 || i == article.hashtags.split(', ').length - 1 ? `` : ` `}
                                            </a>
                                        )}
                                    </span>
                                    <br/>
                                    <span className="news-props__date">
                                        <span className="date__header">
                                            Дата публикации:
                                        </span>
                                        <span className="date__data">
                                            {article.created_at.split(' ')[0]}
                                        </span>
                                    </span>
                                </div>

                                <Link to={`/article/${article.uri}`} className="info__name">
                                    {article.title}
                                </Link>
                            </div>

                        </div>

                        <div className="news__inner news-inner">
                            <div className="news-inner__img">
                                {/* <img src="/images/template/bublik.jpg" alt="" /> */}
                            </div>
                            <div className="news-inner__cont">
                                <div className="news-inner__text">
                                    {article.short_content}
                                    <br/>
                                    <br/>
                                    <p style={{ fontSize: 18 }}>
                                        <Link to={`/article/${article.uri}`}>Читать полностью</Link>
                                    </p>
                                </div>
                                <div className="news-inner__share share"></div>
                            </div>
                            <div className="news-inner__kirin">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
