import * as React from 'react';
import Content from './content';
import Error from './error';
import { connect } from 'react-redux';
import Loading from '../Loading';
import { requestCategory, requestPosts } from './actions';
import iGlobalState from '../../interfaces/iGlobalState';
import { key, iState } from './reducers';
import { key as categoriesKey, iState as iCategoriesState } from '../Categories/reducers';
import SeoWrapper from '../Wrappers/Seo';

interface iProps {
    posts: iState,
    categories: iCategoriesState,
    field: string,
    value: string,
    page_num: string,

    requestCategory(value: string, page_num: number): void,
    requestPosts(value: string, page_num: number): void,
}

class Search extends React.Component<iProps> {
    loadData(field, value, page_num) {
        if (this.props.posts.isFetching) {
            return null;
        }
        let func = field == 'category' ? this.props.requestCategory : this.props.requestPosts;
        func(value, page_num);
    }

    loadDataByProps(propsObj) {
        const field = propsObj.field || '';
        const value = propsObj.value || '';
        const pageNum = propsObj.page_num || 1;
        this.loadData(field, value, pageNum);
    }

    componentWillMount() {
        this.loadDataByProps(this.props);
    }

    componentWillUpdate(next: iProps) {
        let changedUri = next.value != this.props.value;
        changedUri = changedUri || next.page_num != this.props.page_num;
        if (changedUri) {
            this.loadDataByProps(next);
        }
    }

    render() {
        if (this.props.posts.isFetching) {
            return <Loading />;
        }
        if (!this.props.posts.data) {
            return null;
        }
        let searchTitle = this.props.value;
        if (this.props.field == 'category') {
            const availableCategories = this.props.categories.data.filter(v => v.alt_name == this.props.value);
            if (availableCategories.length) {
                const category = availableCategories[0];
                searchTitle = category.name;
            }
        }

        const params = {
            field: this.props.field,
            value: this.props.value
        };
        const data = this.props.posts.data
        
        let title_tag = [];
        title_tag.push(searchTitle);
        if (this.props.field != 'category') {
            title_tag.push(`Поиск`);
        }
        if (data.current_page > 1) {
            title_tag.push(`Страница ${data.current_page}`);
        }
        title_tag.push(`FireDub.Net`);

        const meta = {
            title: title_tag.join(' - '),
            meta: {
                charset: 'utf-8',
                name: {
                    description: 'FireDub, FireDub.Net, firedub, firedub.net, firedub net, фаердаб, Аниме онлайн, скачать аниме бесплатно, аниме сезон, лучшее аниме, смотреть лучшее аниме, аниме 2 сезон, аниме 1 сезон, бесплатное скачать аниме, смотреть аниме онлайн бесплатно отаку, онгоинг',
                    keywords: 'firedub, firedub.net, firedub net, фаердаб, аниме онлайн, скачать аниме бесплатно, аниме сезон, лучшее аниме, смотреть лучшее аниме, аниме 2 сезон, аниме 1 сезон, бесплатное скачать аниме, смотреть аниме онлайн бесплатно отаку, онгоинг'
                }
            }
        };

        let metaTitle = ``;
        let metaDescription = ``;
        if (params.field == 'category') {
            const currentCategory = this.props.categories.data.find(v => v.alt_name == params.value);
            if (currentCategory) {
                if (currentCategory.parentid) {
                    const parentCategory = this.props.categories.data.find(v => v.id == currentCategory.parentid);
                    metaTitle = `${parentCategory.name} в жанре ${currentCategory.name} смотреть онлайн`;
                    metaDescription = `Смотреть онлайн ${parentCategory.name} в жанре ${currentCategory.name}`;
                } else {
                    metaTitle = `${currentCategory.name} смотреть онлайн`;
                    metaDescription = `Смотреть онлайн ${currentCategory.name}`;
                }
            }
        } else {
            metaTitle = `${params.value} смотреть онлайн`;
            metaDescription = `Смотреть онлайн ${params.value}`;
        }
        if (data.current_page > 1) {
            metaTitle += ` страница ${data.current_page}`;
        }

        return (
            <section className="row">
                <div className="col">
                    <SeoWrapper title={metaTitle} description={metaDescription}>
                        {
                            data.data.length > 0 ?
                            <Content
                                data = {data.data}
                                field = {params.field}
                                value = {params.value}
                                maxPage = {data.last_page}
                                currentPage = {data.current_page}
                                h1_title = {searchTitle}
                            />
                            :
                            <Error value = {params.value} field = {params.field} />
                        }
                    </SeoWrapper>
                </div>
            </section>
        );
    }
}


export default connect(
    (state: iGlobalState) => ({
        posts: state[key],
        categories: state[categoriesKey],
    }),
    (dispatchEvent: any) => ({
        requestCategory: (value: string, page_num: number) => dispatchEvent(requestCategory(value, page_num)),
        requestPosts: (value: string, page_num: number) => dispatchEvent(requestPosts(value, page_num)),
    })
)(Search);