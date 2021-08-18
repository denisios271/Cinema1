import React from 'react';
import { Link, } from 'react-router-dom';

import Api from '../../../lib/Api';
import ReactLoading from 'react-loading';

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            fetching: false,
            opened: [],
            activePage: 1,
            isFinished: false,
        };

        this.list = this.list.bind(this);
    }

    componentDidMount() {
        this.list();
        $(window).on("scroll", () => {
            if (!this.state.isFinished && !this.state.fetching) {
                var scrollHeight = $(document).height();
                var scrollPosition = $(window).height() + $(window).scrollTop();
                if ((scrollHeight - scrollPosition) / scrollHeight <= 30) {
                    this.setState({
                        activePage: this.state.activePage + 1,
                    }, this.list);
                }
            }
        });
    }
    
    list() {
        this.setState({
            fetching: true,
        });
        Api.get(`article/list/new/${this.state.activePage}/20`).then(response => {
            this.setState({
                articles: [ ...this.state.articles, ...response.data, ],
                fetching: false,
            });
        }).catch(error => {
            this.setState({
                fetching: false,
                isFinished: true,
            });
        });
    }

    render() {
        return (
            <div className="row">
                {!this.state.articles.length ? (
                    <div className="col-xs-12 col-sm-12">
                        <div className="alert alert-warning">
                            Нет новостей
                        </div>
                    </div>
                ) : this.state.articles.map(v =>
                    <div key={v.id} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">{v.title} ({v.id})</div>
                                <Link to={`/admin/article/edit/${v.id}`} className="btn btn-block btn-warning">
                                    Редактировать
                                </Link>
                                {!v.requested_removing && (
                                    <Link to={`/admin/article/remove/${v.id}`} className="btn btn-block btn-danger">
                                        Запросить удаление
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
