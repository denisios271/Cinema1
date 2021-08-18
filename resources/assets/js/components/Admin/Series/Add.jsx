import React from 'react';

import Form from './Form';
import Api from '../../../lib/Api';
import SendingLayer from '../Layers/Sending';

export default class SeriesAdd extends React.Component {
    render() {
        return <SendingLayer form = {Form} fileName = 'Admin.Post.Add.jsx'
            send = {data => Api.post(`series`, { ...data, post_id: this.props.match.params.postId, })}
            formData = {{ successMessage: "Серия успешно добавлена!", }}/>;
    }
}
