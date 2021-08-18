import * as React from 'react';
import { Link } from 'react-router-dom';

interface iProps {
    /** It's like 'Succesfully changed!' or 'Added!' */
    title: string,

    /** Resource title (name) */
    message: string,

    /** Object for printing it's data (not - filtering! will be printed all fields!) */
    object: any,

    /** Non - required field - will be printed in card-footer. It's the link */
    uri?:  string,

    /** Non - required field - array of strings - ignoring fields before render */
    hiddenFields?: string[],

    /** If admin/moder clicks on btn 'edit' - he will be redirect to this uri */
    editUri?: string,
}

/**
 * Used only for drawing information about resource.
 */
export default class ResourceInfoCard extends React.Component<iProps> {
    renderValue(value) {
        const type = typeof(value);
        if (type == 'string' || type == 'number') {
            return value;
        }
        return JSON.stringify(value);
    }

    renderTableContent() {
        const hiddenFields = this.props.hiddenFields || [];

        if (typeof(this.props.object) == 'object' && this.props.object !== null) {
            return (
                <div className="card-body">
                    {this.props.title}
                    <br />
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Поле</td>
                                <td>Значение</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.props.object).filter(objKey => hiddenFields.indexOf(objKey) == -1)
                                .map((objKey, num) =>
                                <tr key={num}>
                                    <td>{objKey}</td>
                                    <td>{this.renderValue(this.props.object[objKey])}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div className="card-body">
                Хммм... Произошло что-то страненькое!
                <br />Сюда должен был передаться объект, но пришло что-то иное...
                <br />Я отправил дополнительные данные в консоль!
                <br /><h3>Напиши админу.</h3>
            </div>
        );
    }

    render() {
        if (this.props.object === null) {
            return <p>Для показа данных объекта - он должен быть передан.</p>;
        }
        if (typeof(this.props.object) != 'object') {
            console.error('Sent non - object to Admin.ResourceInfoCard.jsx', this.props.object);
        }

        const existUri = !!this.props.uri;
        const existUpdatingUri = !!this.props.editUri;

        return (
            <div className="card card-success">
                <h4 className="card-header">
                    {this.props.message}
                </h4>

                {this.renderTableContent()}

                {(existUri || existUpdatingUri) && (
                    <div className="card-footer text-muted d-flex justify-content-between align-content-center">
                        {existUri && (
                            <a href={this.props.uri} target="_blank">{this.props.uri}</a>
                        )}
                        {existUpdatingUri && (
                            <Link to={this.props.editUri} className="btn btn-warning">Редактировать</Link>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
