import * as React from 'react';
import PostsPage from '.';
import { match } from 'react-router';

interface iProps {
    match: match<{ value: string, page_num: string }>,
}

export default class PostsBySearching extends React.Component<iProps> {
    render() {
        return <PostsPage field='search'
            value={this.props.match.params.value} page_num={this.props.match.params.page_num} />;
    }
}
