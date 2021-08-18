import React from 'react';

import Form from './Form';
import Api from '../../../lib/Api';
import UpdatingLayer from '../Layers/Updating';

export default class SeriesEdit extends React.Component {
    render() {
        const { seriesId, } = this.props.match.params;
        return <UpdatingLayer form={Form} fileName='Admin.Series.Edit.jsx'
            loadResource={() => Api.get(`series/id/${seriesId}`)}
            resourceId={seriesId} resourcesList={null}
            createFormData={series => ({ series, successMessage: "Серия успешно обновлена!", })}
            createSendingPromise={series => (data => Api.put(`series/id/${series.id}`, data))} />;
    }
}
