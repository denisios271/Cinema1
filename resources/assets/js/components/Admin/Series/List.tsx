import * as React from 'react';
import { Link, } from 'react-router-dom';

import Api from '../../../lib/Api';
import ReactLoading from 'react-loading';
import iSeries from '../../../interfaces/iSeries';
import Loading from '../../Loading';

interface iProps {
    isOpen: boolean,
    postId: number,
}

interface iState {
    series: iSeries[],
    fetching: boolean,
}

export default class SeriesList extends React.Component<iProps, iState> {
    state: iState = {
        series: [],
        fetching: true,
    };
    
    load = (postId: number) => {
        Api.get<{ series: iSeries[] }>(`post/id/${postId}`).then(res => {
            console.info('Admin.Series.List:load()', res);
            this.setState({
                series: res.series,
                fetching: false,
            });
        }).catch(err => {
            console.error('Admin.Series.List:load()', err);
            this.setState({
                fetching: false,
            });
        });
    }

    show = (postId: number) => {
        ($(`#series-list-${postId}-modal`) as any).modal('show');
        $(`#series-list-${postId}-modal`).addClass('show');
        $('body').append('<div class="modal-backdrop fade show"></div>');
    }
    
    hide = (postId: number) => {
        ($(`#series-list-${postId}-modal`) as any).modal('hide');
        $(`#series-list-${postId}-modal`).removeClass('show');
        $('.modal-backdrop').remove();
    }

    componentDidMount() {
        // this.load(this.props.postId);
    }

    componentWillReceiveProps(next: iProps) {
        if (next.isOpen != this.props.isOpen) {
            if (next.isOpen) {
                this.load(next.postId);
                this.show(next.postId);
            } else {
                this.hide(next.postId);
            }
        }
    }

    linkHandler = e => {
        this.hide(this.props.postId);
    }

    render() {
        return (
            <div className="modal fade" id={`series-list-${this.props.postId}-modal`} tabIndex={-1}
                role="dialog" aria-labelledby={`series-list-${this.props.postId}-modal-label`} aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`series-list-${this.props.postId}-modal-label`}>Список серий (Релиз {this.props.postId})</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.fetching ? (
                                <Loading />
                            ) : (
                                this.state.series.length ? (
                                    <div className="list-group">
                                        {this.state.series.map(v =>
                                            <li key={v.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                {v.name} ({v.type ? v.type.title : v.type_id})
                                                <div>
                                                    <span className="badge badge-primary badge-pill mr-3 ml-3 p-2">Плееров: {v.players.length}</span>
                                                    <a href={`/api/vk/wall/episode/${v.id}`} className="btn btn-primary mt-2" target="_blank">Опубликовать в ВК</a>
                                                </div>
                                                <div>
                                                    <Link className="btn btn-block btn-warning mb-2" onClick={this.linkHandler.bind(this)}
                                                        to = {`/admin/series/edit/${v.id}`}>Редактировать</Link>
                                                    <Link className="btn btn-block btn-danger" onClick={this.linkHandler.bind(this)}
                                                        to = {`/admin/series/remove/${v.id}`}>Удалить</Link>
                                                </div>
                                            </li>
                                        )}
                                    </div>
                                ) : (
                                    <div className="alert alert-danger">
                                        Нет серий
                                    </div>
                                )
                            )}
                        </div>
                        <div className="modal-footer">
                            <Link to={`/admin/series/add-to-post/${this.props.postId}`} className="btn btn-success"
                                onClick={this.linkHandler.bind(this)}>
                                Добавить новую серию
                            </Link>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
