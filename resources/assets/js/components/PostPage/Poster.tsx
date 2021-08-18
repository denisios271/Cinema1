import * as React from 'react';

export default (poster: string) => (
    <div className="row">
        <div className="col">
            <img src={poster} width="100%" />
        </div>
    </div>
);