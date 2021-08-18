import React from 'react';
import { Link, } from 'react-router-dom';

import HashTag from './HashTag';
import List from './List';
import Form from './Form';
import Api from '../../../lib/Api';
import ReactLoading from 'react-loading';
import SeriesList from '../Series/List';

export default class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            fetching: false,
            opened: [],
        };
    }
    
    search(e) {
        e.preventDefault();
        this.setState({
            fetching: true,
        });
        Api.get(`search/name/${e.target.value}/1/20`).then(response => {
            this.setState({
                posts: response.data,
                fetching: false,
            });
            response.data.forEach(v => {
                $(`#series-list-${v.id}-modal`).on('hide.bs.modal', e => {
                    this.openClickHandler(v.id);
                    $('.modal-backdrop').remove();
                });
            });
        }).catch(error => {
            this.setState({
                fetching: false,
            });
        });
    }

    openClickHandler(id) {
        if (!this.state.opened.find(val => val == id)) {
            this.setState({
                opened: [...this.state.opened, id],
            });
            return;
        }
        this.setState({
            opened: this.state.opened.filter(v => v != id),
        });

    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <input className={`form-control ${(!this.state.fetching && !this.state.posts.length) && 'is-invalid'}`} type="text" onChange={this.search.bind(this)}
                        placeholder="Синий экзорцист" />
                    <div className="invalid-feedback">
                        По данному запросу не найдено серий
                    </div>
                    <small className="text-muted">
                        Введите название релиза
                    </small>
                </div>
                {this.state.fetching ? (
                    <div className="col">
                        <center>
                            <ReactLoading
                                type="spinningBubbles"
                                color="#333"
                                delay={0}
                                height="100"
                                width="100"
                            />
                        </center>
                    </div>
                ) : this.state.posts.map(v =>
                    <div key={v.id} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 mt-3">
                    
                        <SeriesList isOpen = {!!this.state.opened.find(val => val == v.id)} postId = {v.id} />

                        <div className="card">
                            <img className="card-img-top" src={v.poster} alt="Card image cap" />
                            <div className="card-body">
                                <div className="card-title">{v.title}</div>
                                <Link to={`/admin/post/edit/${v.id}`} className="btn btn-block btn-warning">
                                    Редактировать
                                </Link>
                                {!v.requested_removing && (
                                    <Link to={`/admin/post/remove/${v.id}`} className="btn btn-block btn-danger">
                                        Запросить удаление
                                    </Link>
                                )}
                                <Link to={`/admin/series/add-to-post/${v.id}`} className="btn btn-block btn-success">
                                    Добавить серию
                                </Link>
                                {/* <a data-toggle="modal" data-target={`#series-list-${v.id}-modal`} href="" className="btn btn-block btn-info">
                                    Список серий
                                </a> */}
                                <button onClick={() => this.openClickHandler(v.id)} className="btn btn-block btn-info">
                                    Список серий
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
