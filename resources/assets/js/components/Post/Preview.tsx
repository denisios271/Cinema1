import * as React from 'react';
import { Link } from 'react-router-dom';

interface iProps {
    poster: string,
    link: string,
}

export default class PostPreview extends React.Component<iProps> {
    render() {
        return (
            <div className="relize relizes-row__relize">
                <div className="relize__max-size">
                    <Link to={this.props.link} className="relize__href">
                        <div className="relize__image-cont relize-sizes">
                            <img className="relize__image relize-sizes__image" src={this.props.poster} alt={this.props.poster} />
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}