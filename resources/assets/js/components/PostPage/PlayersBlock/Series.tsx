import * as React from 'react';
import iSeries from '../../../interfaces/iSeries';

interface iProps {
    series: iSeries[],
    selectedNumber: number,

    seria_changed(episode: number),
    smartChangePlayer(),
}

export default class Series extends React.Component<iProps> {
    constructor(props) {
        super(props);
        this.handleSeriaChanged = this.handleSeriaChanged.bind(this);
    }

    handleSeriaChanged(i) {
        this.props.seria_changed(i);
        // this.props.seria_changed(parseInt(e.target.value));
        this.props.smartChangePlayer();
    }

    render() {
        return(
            <div className = "form-group sereis">
                <h4>Серии: </h4>
                <div className="player__series-list">
                    {this.props.series.map((v, i) => (
                        <div key={i}
                            className={`player__series ${this.props.selectedNumber == i ? 'selectedSeries':''}`}
                            onClick = {this.handleSeriaChanged.bind(this, i)}>
                            {i+1}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}