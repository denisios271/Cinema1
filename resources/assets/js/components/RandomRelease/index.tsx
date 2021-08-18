import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import iGlobalState from '../../interfaces/iGlobalState';
import { key } from './reducers';
import iPost from '../../interfaces/iPost';

interface iProps {
    randomRelease: iPost,
    loaded: boolean,
}

class RandomRelease extends React.Component<iProps> {
    render() {
        if (!this.props.loaded || !this.props.randomRelease) {
            return null;
        }

        let val = this.props.randomRelease;
        let poster = val.poster.replace('<img src="http://4anime.su', "").replace('<img src="', "").replace('" />', "");

        return (
            <div className="col block_content">
                <div className="row">
                    <div className = "short-random">
                        <div className = "short-images">
                            <Link to = {"/post/"  + val.alt_name} title = {val.title}>
                                <img src={poster} className="img-fluid rounded" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        randomRelease: state[key].data,
        loaded: state[key].isLoaded,
    })
)(RandomRelease);