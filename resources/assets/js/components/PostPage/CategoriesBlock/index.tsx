import * as React from 'react';
import { Link, } from 'react-router-dom';
import iCategory from '../../../interfaces/iCategory';

interface iProps {
    categories: iCategory[],
}

export default class CategoriesBlock extends React.Component<iProps> {
    render() {
        return (
            <ul className = "breadcrumb">
                {this.props.categories.map((v, i) => 
                    <li key = {v.id} className = "breadcrumb-item">
                        <Link to = {"/category/" + v.alt_name}>
                            {v.name}
                        </Link>
                    </li>
                )}
            </ul>
        );
    }
}