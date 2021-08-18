import * as React from 'react';
import Api from '../../../lib/Api';
import RequestedLayer, { iEvents, } from '../Layers/Requested';
import iArticle from '../../../interfaces/iArticle';

export default class RequestedAdding extends React.Component {
    render() {
        return <RequestedLayer prefix="article" createElement={(v: iArticle, events: iEvents) => (
            <div className="card mb-3" key={v.id}>
                <div className="card-body">
                    <h5 className="card-title">({v.id}) {v.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Теги: {v.hashtags}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Uri: {v.uri}</h6>
                    <p className="card-text">{v.content}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Добавлена: {v.created_at}</h6>
                    <a href="" onClick={e => { e.preventDefault(); events.acceptAdding(v.id) }} className="btn btn-success mr-3">Подтвердить!</a>
                    <a href="" onClick={e => { e.preventDefault(); events.declineAdding(v.id) }} className="btn btn-danger">Отменить!</a>
                </div>
            </div>
        )} send = {() => Api.get(`article/requested/adding`)} />
    }
}