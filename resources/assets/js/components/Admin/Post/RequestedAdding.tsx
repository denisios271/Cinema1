import * as React from 'react';
import Api from '../../../lib/Api';
import RequestedLayer, { iEvents, } from '../Layers/Requested';
import iPost from '../../../interfaces/iPost';

export default class RequestedAdding extends React.Component {
    render() {
        return <RequestedLayer prefix="post" createElement={(v: iPost, events: iEvents) => (
            <div className="card mb-3" key={v.id}>
                <div className="card-body">
                    <h5 className="card-title">({v.id}) {v.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Теги: {v.tags}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Uri: {v.alt_name}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Keywords: {v.keywords}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Постер: {v.poster}</h6>
                    <p className="card-text">{v.full_story}</p>
                    {v.categories.map(category =>
                        <span key={`category-${category.id}`} className="badge badge-primary m-2 p-2">
                            {/* {category.name} ({category.id}) */}
                            ({category.id})
                        </span>
                    )}
                    <h6 className="card-subtitle mb-2 text-muted">Добавлена: {v.created_at}</h6>
                    <a href="" onClick={e => { e.preventDefault(); events.acceptAdding(v.id) }} className="btn btn-success mr-3">Подтвердить!</a>
                    <a href="" onClick={e => { e.preventDefault(); events.declineAdding(v.id) }} className="btn btn-danger">Отменить!</a>
                </div>
            </div>
        )} send = {() => Api.get(`post/requested/adding`)} />
    }
}