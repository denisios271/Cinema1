import React from 'react';

import Api from '../../../lib/Api';
import List from './List';
import RemovingLayer from '../Layers/Removing';

export default class ArticleRemove extends React.Component {
    render() {
        const id = this.props.match.params.id || null;
        return <RemovingLayer remove = {() => Api.delete(`article/id/${id}`)}
            getResource = {() => Api.get(`article/id/${id}`)} fileName = 'Admin.Article.Remove.jsx'
            resourceId = {id} resourcesList = {List}/>;
    }
}
