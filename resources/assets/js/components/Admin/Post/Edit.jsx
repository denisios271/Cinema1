import React from 'react';

import List from './List';
import Form from './Form';
import Api from '../../../lib/Api';
import UpdatingLayer from '../Layers/Updating';

export default class PostEdit extends React.Component {
    render() {
        const { postId, } = this.props.match.params;
        return <UpdatingLayer form = {Form} fileName = 'Admin.Post.Edit.jsx'
            loadResource = {() => Api.get(`post/id/${postId}`)}
            resourceId = {postId} resourcesList = {List}
            createFormData = {post => ({ post, successMessage: "Релиз успешно обновлен!", })}
            createSendingPromise = {post => (data => Api.put(`post/id/${post.id}`, data))}/>;
    }
}
