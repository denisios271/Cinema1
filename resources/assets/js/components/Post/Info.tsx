import * as React from 'react';
import { connect } from 'react-redux';
import iGlobalState from '../../interfaces/iGlobalState';
import { Link } from 'react-router-dom';
import { key as postReduserKey, iState as iPostState } from '../PostPage/reducers';

interface iProps {
    path: string,
    post: iPostState,
}

class PostInfo extends React.Component<iProps> {
    render() {
        const postPrefix = '/post/';
        const postLocationIndex = this.props.path.indexOf(postPrefix);
        
        // we should show it only at post page
        if (postLocationIndex < 0) {
            return null;
        }

        if (this.props.post.isFetching || this.props.post.error) {
            return null;
        }

        const post = this.props.post.data;

        if (!post) {
            return null;
        }

        return (
            <div className="after-menu__cont">
                <div className="after-menu__relize-name-cont">
                    <div className="after-menu__relize-name">
                        <h1>{post.title}</h1>
                    </div>
                </div>
                <div className="after-menu__types-buttons3 after-menu__types">
                    <div className="after-menu__left-cont">
                        <div className="after-menu__left-type-button after-menu__type-button">
                            <a className="type-button__href-single type-button__href">
                                {post.voicers && post.voicers.length > 18 ? 'MVO' : post.voicers}
                            </a>
                        </div>
                    </div>

                    <div className="after-menu__right-cont">
                        <div className="after-menu__right-type-button after-menu__type-button">
                            <a className="type-button__href-single type-button__href">
                                {post.voicers && post.voicers.length > 18 ? 'MVO' : post.voicers}
                            </a>
                        </div>
                    </div>

                    <div className="after-menu__middle-type-button after-menu__type-button">
                        {post.categories.map((v,i) =>
                            <Link key = {i} to={`/category/${v.alt_name}`} className="type-button__href">{v.name}</Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        post: state[postReduserKey],
    })
)(PostInfo);