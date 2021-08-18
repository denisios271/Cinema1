import React from 'react';

import Form from './Form';
import Api from '../../../lib/Api';
import SendingLayer from '../Layers/Sending';

export default class ArticleAdd extends React.Component {
    render() {
        return <SendingLayer form = {Form} fileName = 'Admin.News.Add.jsx'
            send = {data => Api.post(`article`, data)}
            formData = {{ successMessage: "Новость успешно добавлена!", }}/>;
    }
}
