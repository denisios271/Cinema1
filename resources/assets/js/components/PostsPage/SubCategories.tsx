import * as React from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading';
import { requestCategory, requestPosts } from './actions';
import iGlobalState from '../../interfaces/iGlobalState';
import { key, iState } from './reducers';
import { key as categoriesKey, iState as iCategoriesState } from '../Categories/reducers';
import { Link } from 'react-router-dom';

interface iProps {
    posts: iState,
    categories: iCategoriesState,
    path: string,
}

class SubCategories extends React.Component<iProps> {
    render() {
        const categoryPrefix = '/category/';
        const categoryLocationIndex = this.props.path.indexOf(categoryPrefix);
        
        // we should show it only at category page
        if (categoryLocationIndex < 0) {
            return null;
        }

        // ok, let's get our current category!
        const categoryUri = this.props.path.substr(categoryLocationIndex + categoryPrefix.length);

        // if we haven't categories - we don't need to show something
        if (!this.props.categories.isLoaded || !this.props.categories.data.length) {
            return null;
        }

        // we have categories & we're on category page - we can show subcategories
        const categories = this.props.categories.data.filter(v => v.alt_name == categoryUri);

        // if we didn't find current category
        if (!categories.length) {
            return null;
        }

        // ok, there is a category
        const category = categories[0];

        // has this category subcategories?
        let subCategories = this.props.categories.data.filter(v => v.parentid == category.id);

        // is there at least 1 subcategory?
        if (!subCategories.length) {
            return null;
        }

        // okey, well, if there are sooo many categories - we need to show limited count
        subCategories = subCategories.slice(0, 15);

        // very good! we have subcategories and we can show them!
        return (
            <div className="after-menu__middle-type-button after-menu__type-button after-menu-category">
                {subCategories.map((v, i) =>
                    <Link key={v.id} to={`/category/${v.alt_name}`} className="type-button__href">{v.name}</Link>
                )}
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        posts: state[key],
        categories: state[categoriesKey],
    })
)(SubCategories);