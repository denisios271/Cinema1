import * as React from 'react';
import iSeriesContent from '../../../interfaces/iSeriesContent';

interface iProps {
    players: iSeriesContent[],
    selectedPlayer: number,
    player_changed(value: number): void,
}

export default class Players extends React.Component<iProps> {
    constructor(props) {
        super(props);
        this.handlePlayerChanged = this.handlePlayerChanged.bind(this);
    }

    handlePlayerChanged(e) {
        this.props.player_changed(e.target.value);
    }

    render() {
        if (!this.props.players.length) {
            return null;
        }
        return (
            <div className = "form-group">
                <select className = "form-control" onChange = {this.handlePlayerChanged} value = {this.props.selectedPlayer}>
                    {this.props.players.map((v, i) => (
                        <option key = {i} value = {i}>
                            {v.player.title}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}