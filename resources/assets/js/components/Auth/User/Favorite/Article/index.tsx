import * as React from 'react';
import { connect } from 'react-redux';
import iGlobalState from '../../../../../interfaces/iGlobalState';
import { key, iState } from '../../../../Favorites/reducers';
import { Link } from 'react-router-dom';

interface iProps {
    favorite: iState,
}

class FavoriteArticle extends React.Component<iProps> {
    render() {
        return (
            <div>
                {this.props.favorite.articles.length ? this.props.favorite.articles.map(v =>
                    <div key={v.id}>
                        <br/>
                        <Link to={`/article/${v.uri}`}>
                            {v.title}
                            <p>{v.short_content}</p>
                        </Link>
                        <br/>
                    </div>
                ) : (
                    <div className="alert alert-warning">Нет избранных статей</div>
                )}
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        favorite: state[key],
    })
)(FavoriteArticle);