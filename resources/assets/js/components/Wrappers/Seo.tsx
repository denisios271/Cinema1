import * as React from 'react';
import MetaTags from 'react-meta-tags';

interface iProps {
    title: string,
    description?: string,
    keywords?: string,
}

export default class SeoWrapper extends React.Component<iProps> {
    render() {
        return (
            <>
                <MetaTags>
                    <title>{this.props.title}</title>
                    <meta name="description" content={this.props.description} />
                    <meta name="keywords" content={this.props.keywords ||  'FireDub, FireDub.Net, firedub, firedub.net, firedub net, фаердаб, Аниме онлайн, скачать аниме бесплатно, аниме сезон, лучшее аниме, смотреть лучшее аниме, аниме 2 сезон, аниме 1 сезон, бесплатное скачать аниме, смотреть аниме онлайн бесплатно отаку, онгоинг, о команде, команда, о проекте, проект, о нас, мы, о фаердабе'} />
                </MetaTags>
                {this.props.children}
            </>
        );
    }
}