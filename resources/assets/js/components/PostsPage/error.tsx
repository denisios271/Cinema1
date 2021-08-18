import * as React from 'react';
import { Link, } from 'react-router-dom';

interface iProps {
    field: string,
    value: string,
}

export default class Error extends React.Component<iProps> {
    render() {
        const title = (this.props.field == 'category' ? 'Поиск по категории: ' : 'Поиск по имени: ' ) + this.props.value;
        return (
            <div className = "block">
                <h1 className="main-header">
                    <Link to = {"/" + this.props.field + "/" + this.props.value}>
                        {title}
                    </Link>
                </h1>
                <div className="alert alert-danger">
                    Извините, по вашему запросу публикаций не найдено.
                </div>
            </div>
        );
    }
}