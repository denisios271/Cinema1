import * as React from 'react';
import iArticle from '../../interfaces/iArticle';
import ArticlePreview from '../Article/Preview';
import SeoWrapper from '../Wrappers/Seo';

export interface iProps {
    articles: iArticle[],
    title: string,
    seo?: boolean,
}

export default class List extends React.Component<iProps> {
    componentDidMount() {
        if (this.props.seo) {
            document.title = 'Каталог релизов - FireDub.Net';
        }
    }

    render(): JSX.Element {
        const { articles, title, } = this.props;
        return (
            <SeoWrapper title="Статьи - FireDub.Net">
                <div className="news-container">
                    {articles.length ? (
                        articles.map(article => <ArticlePreview key={article.id} article={article} />)
                    ) : (
                        <div className="alert alert-danger">
                            Статей нет
                        </div>
                    )}
                </div>
            </SeoWrapper>
        );
    }
}
