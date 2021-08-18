import React from 'react';

import List from './List';
import Api from '../../../lib/Api';
import RemovingLayer from '../Layers/Removing';

export default class SeriesRemove extends React.Component {
    render() {
        const seriesId = this.props.match.params.seriesId || null;
        return <RemovingLayer remove = {() => Api.delete(`series/id/${seriesId}`)}
            getResource = {() => Api.get(`series/id/${seriesId}`)} fileName = 'Admin.Series.Remove.jsx'
            resourceId = {seriesId} resourcesList = {List}/>;
    }
}
