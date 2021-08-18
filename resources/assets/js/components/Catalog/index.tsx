import * as React from 'react';
import Categories from '../Categories';
import QSF from '../QuickSearchForm';
import SeoWrapper from '../Wrappers/Seo';

export default class Catalog extends React.Component {
    render() {
        return (
            <SeoWrapper title='Каталог релизов - FireDub.Net'>
                <section className="row">
                    <div className="col">
                        <h2>Быстрый поиск</h2>
                        <QSF />
                    </div>
                </section>
                <section className="row">
                    <div className="col">
                        <h2>Категории</h2>
                        <Categories />
                    </div>
                </section>
            </SeoWrapper>
        );
    }
}
