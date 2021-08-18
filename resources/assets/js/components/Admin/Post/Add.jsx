import React from 'react';

import Form from './Form';
import Api from '../../../lib/Api';
import SendingLayer from '../Layers/Sending';

export default class PostAdd extends React.Component {
    render() {
        return <SendingLayer form = {Form} fileName = 'Admin.Post.Add.jsx'
            send = {data => Api.post(`post`, data)}
            formData = {{ successMessage: "Релиз успешно добавлен!", }}/>;
    }
}
