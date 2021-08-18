import React from 'react';

import List from './List';
import Form from './Form';
import Api from '../../../lib/Api';
import UpdatingLayer from '../Layers/Updating';

export default class ArticleEdit extends React.Component {
    render() {
        const { id, } = this.props.match.params;
        return <UpdatingLayer form = {Form} fileName = 'Admin.Article.Edit.jsx'
            loadResource = {() => Api.get(`article/id/${id}`)}
            resourceId = {id} resourcesList = {List}
            createFormData = {article => ({ article, successMessage: "Новость успешно обновлена!", })}
            createSendingPromise = {article => (data => Api.put(`article/id/${article.id}`, data))}/>;
    }
}
