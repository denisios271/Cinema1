import * as React from 'react';
import { connect } from 'react-redux';
import { Link, } from 'react-router-dom';
import Loading from '../Loading';
import { iState } from './reducers';
import iGlobalState from '../../interfaces/iGlobalState';

const colors = [
    'info',
    'secondary',
    'dark',
    'danger',
    'primary',
    'warning',
    'success',
    'light',
];

interface iProps {
    categories: iState,
}

class Categories extends React.Component<iProps> {
    getColor(id) {
        const parentIds = this.props.categories.data.filter(v => v.parentid == 0).map(v => v.id);
        let ids = {};
        
        parentIds.forEach((id, i) => {
            ids[id] = i;
        });
        return colors[ids[id]];
    }

    render() {
        if (!this.props.categories.isLoaded) {
            return <Loading />;
        }

        return (
            <div>
                <div className="row">
                    <div className="col">
                        {this.props.categories.data.filter(v => v.parentid == 0).map(v => (
                            <Link key={v.id} to={`/category/${v.alt_name}`} className={`badge p-2 m-1 badge-${this.getColor(v.id)}`}>
                                {v.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    {this.props.categories.data.filter(v => v.parentid != 0).map(v => (
                        <Link key={v.id} to={`/category/${v.alt_name}`} className={`badge p-2 m-1 badge-${this.getColor(v.parentid)}`}>
                            {v.name}
                        </Link>
                    ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        categories: state.categories,
    })
)(Categories);