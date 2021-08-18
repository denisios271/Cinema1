import React from 'react';

import Api from '../../../lib/Api';
import List from './List';
import RemovingLayer from '../Layers/Removing';

export default class PostRemove extends React.Component {
    render() {
        const postId = this.props.match.params.postId || null;
        return <RemovingLayer remove = {() => Api.delete(`post/id/${postId}`)}
            getResource = {() => Api.get(`post/id/${postId}`)} fileName = 'Admin.Post.Remove.jsx'
            resourceId = {postId} resourcesList = {List}/>;
    }
}
