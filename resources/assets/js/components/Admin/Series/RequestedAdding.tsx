import * as React from 'react';
import Api from '../../../lib/Api';
import RequestedLayer, { iEvents, } from '../Layers/Requested';
import iSeries from '../../../interfaces/iSeries';

export default class RequestedAdding extends React.Component {
    render() {
        return <RequestedLayer prefix="series" createElement={(v: iSeries, events: iEvents) => (
            <div className="card mb-3" key={v.id}>
                <div className="card-body">
                    <h5 className="card-title">({v.id}) {v.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Тип серии: {v.type_id}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Id поста: {v.post_id}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Добавлена: {v.created_at}</h6>
                    {v.players.map(player =>
                        <p key={`player-${player.id}`}>
                            {player.player.title} ({player.id}): {player.url}
                        </p>
                    )}
                    <a href="" onClick={e => { e.preventDefault(); events.acceptAdding(v.id) }} className="btn btn-success mr-3">Подтвердить!</a>
                    <a href="" onClick={e => { e.preventDefault(); events.declineAdding(v.id) }} className="btn btn-danger">Отменить!</a>
                </div>
            </div>
        )} send = {() => Api.get(`series/requested/adding`)} />
    }
}