import * as React from 'react';
import iType from '../../../interfaces/iType';

interface iProps {
    types: iType[],
    selectedType: number,

    type_changed(type: number),
    smartChangePlayer(),
}

export default class Types extends React.Component<iProps> {
    constructor(props) {
        super(props);
        this.handleTypeChanged = this.handleTypeChanged.bind(this);
    }

    handleTypeChanged(e) {
        this.props.type_changed(e.target.value);
        this.props.smartChangePlayer();
    }

    componentWillMount() {
        let types = [];
        for(let id in this.props.types) types.push(id);
        this.props.type_changed(types[0]);
        this.props.smartChangePlayer();
    }

    render() {
        return(
            <select className="player__choice-list" onChange = {this.handleTypeChanged} value = {this.props.selectedType}>
                {this.props.types.map((v, i) => (
                    <option key = {i} value = {v.id} className="player__choice-item">
                        {v.title}
                    </option>
                ))}
            </select>
        );
    }
}