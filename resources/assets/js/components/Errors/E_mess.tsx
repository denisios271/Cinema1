import * as React from 'react';

interface iProps {
    error: string,
}

export default class E_mess extends React.Component<iProps> {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <div className="alert alert-danger">
                        Ошибка: <b>{this.props.error}</b>
                    </div>
                </div>
            </div>
        );
    }

}