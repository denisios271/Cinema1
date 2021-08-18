import * as React from 'react';
import * as actions from './actions';
import { iState } from './reducers';
import { connect } from 'react-redux';
import * as $ from 'jquery';

export interface ArticlesProps {
    state: iState,
    load: () => void,
}

class Articles extends React.Component<ArticlesProps> {
    render() {
        return (
            <div className="news">
                <h1 className="main-header">
                    Новости
                </h1>
                {this.props.state.articles.length ? this.props.state.articles.map(v =>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{v.title}</h5>
                            <p className="card-text">{v.content}</p>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-danger">
                        Новостей нет
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    (state: any) => ({ state: state.articles }),
    (dispatch: any) => ({
        load: () => dispatch(actions.load()),
    })
)(Articles);