import React from 'react';
import { connect } from 'react-redux';

import ReactLoading from 'react-loading';
import Api from '../../../lib/Api';
import ResourceInfoCard from '../ResourceInfoCard';

class SeriesForm extends React.Component {
    constructor(props) {
        super(props);
        const { series, } = props;
        let players = [];
        if (series) {
            series.players.forEach(player => {
                players[player.player_id] = player.url; 
            });
        }
        this.state = {
            name: series ? series.name : '',
            type_id: series ? series.type.id : 1,
            players,
        };
    }

    send(e) {
        e.preventDefault();
        const data = this.state;
        this.props.submit(data);
    }

    playerChanged(playerId, value) {
        let newObj = {};
        newObj[playerId] = value;
        this.setState({
            players: Object.assign({}, this.state.players, newObj),
        });
    }

    render() {
        const { types, players, } = this.props.info;
        const { inputErrors, } = this.props;

        if (this.props.successObject) {
            return <ResourceInfoCard message = {this.props.successMessage}
                title = "Данные серии:" object = {this.props.successObject} />;
        }

        return (
            <form className="form-horizontal">

                <div className='form-group row'>
                    <label htmlFor='title' className="col-xs-12 col-sm-4 col-md-3 col-lg-2 col-form-label">Название серии</label>
                    <div className="col">
                        <input
                            type="text" name='title' placeholder='Азазель - серия 1' id='title'
                            className={`form-control ${!!inputErrors.name && 'is-invalid'}`}
                            onChange={e => this.setState({ name: e.target.value, })} value={this.state.name}
                        />
                        <div className="invalid-feedback">
                            {inputErrors.name}
                        </div>                    
                    </div>
                </div>

                {players.map(player =>
                    <div key={player.id} className={`form-group row`}>
                        <label htmlFor={`player-input-${player.id}`}
                            className="col-xs-12 col-sm-4 col-md-3 col-lg-2 col-form-label">{player.title}</label>
                        <div className="col">
                            <input
                                type="text" name={`players[${player.id}]`} placeholder={`Ссылка с '${player.title}'`}
                                id={`player-input-${player.id}`}
                                className={`form-control ${!!inputErrors.players && 'is-invalid'}`}
                                onChange={e => this.playerChanged(player.id, e.target.value)} value={this.state.players[player.id] || ''}
                            />
                            <div className="invalid-feedback">
                                {inputErrors.players}
                            </div>
                        </div>
                    </div>
                )}

                <div className='form-group row'>
                    <label htmlFor='seriesType' className="col-xs-12 col-sm-4 col-md-3 col-lg-2 col-form-label">Тип серии</label>
                    <div className="col">
                        <select className="form-control" name="seriesType"
                            id="seriesType" onChange={e => this.setState({ type_id: e.target.value, })}
                            value={this.state.type_id}>
                            {types.map(type =>
                                <option key={type.id} value={type.id}>{type.title}</option>
                            )}
                        </select>
                    </div>
                </div>

                <div className='form-group row'>
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2"></div>
                    <div className="col">
                        {this.props.isFetching ? (
                            <center>
                                <ReactLoading
                                    type="spinningBubbles"
                                    color="#333"
                                    delay={0}
                                    height="100"
                                    width="100"
                                />
                            </center>
                        ) : (
                            <button onClick={this.send.bind(this)} className="btn btn-primary">
                                Отправить
                            </button>
                        )}
                    </div>
                </div>
            
            </form>
        );
    }
}

export default connect((state) => ({ info: state.admin.seriesInfo }))(SeriesForm);
