import * as React from 'react';
import SearchForm from '../QuickSearchForm';

export default class Main extends React.Component {
    render() {
        return (
            <div className = "block">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 text-center">
                        <h1>Поиск</h1>
                    </div>
                    <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                        <div className="row">
                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 text-right">
                                    <label htmlFor="name">Поиск по имени:</label>
                                </div>
                                <div className="col-xs-8 col-sm-8">
                                    <div className="row">
                                        <SearchForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}