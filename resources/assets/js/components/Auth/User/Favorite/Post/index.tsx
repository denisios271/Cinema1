import * as React from 'react';
import { connect } from 'react-redux';
import iGlobalState from '../../../../../interfaces/iGlobalState';
import { key, iState } from '../../../../Favorites/reducers';
import { Link } from 'react-router-dom';

interface iProps {
    favorite: iState,
}

class FavoritePost extends React.Component<iProps> {
    render() {
        return (
            <div>
                {this.props.favorite.posts.length ? this.props.favorite.posts.map(v =>
                    <div key={v.id}>
                        <br/>
                        <Link to={`/post/${v.post.alt_name}`}>
                            {v.post.title}
                            <br/><p dangerouslySetInnerHTML={{ __html: `${v.post.full_story.substr(0, 300)}...`}}></p>
                        </Link>
                        <br/>
                    </div>
                ) : (
                    <div className="alert alert-warning">Нет избранных сериалов</div>
                )}
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        favorite: state[key],
    })
)(FavoritePost);