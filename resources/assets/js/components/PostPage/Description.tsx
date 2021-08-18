import * as React from 'react';

export default (description: string) => (
    <div className="info-block fullstory-description">
        <h2>
            Описание:
        </h2>
        <div className="row">
            <div className="col fs-body" dangerouslySetInnerHTML={{ __html: description }}>
            </div>
        </div>
    </div>
);
