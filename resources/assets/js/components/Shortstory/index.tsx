import * as React from 'react';
import { Link } from 'react-router-dom';

interface iProps {
    poster: string,
    full_link: string,
    title: string,
}

export default class Shortstory extends React.Component<iProps> {
    render() {
        let poster = "";
        if (this.props.poster) {
            poster = this.props.poster.replace('<img src="http://4anime.su', "").replace('<img src="', "").replace('" />', "");
        }
        
        return (
            <div className="shortstory">
                <Link to={this.props.full_link} title={this.props.title}>
                    <img src = {poster} alt = {this.props.title} />
                </Link>
            </div>
        );
    }
}