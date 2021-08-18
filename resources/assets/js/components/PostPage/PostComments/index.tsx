import * as React from 'react';
import Comment from './Comment';
import AddComment from './AddComment';
import iPostComment from '../../../interfaces/iPostComment';

interface iProps {
    addComment: (text: string) => void,
    comments: iPostComment[],
}

interface iState {
    sortType: 'id',
}


export default class PostComments extends React.Component<iProps, iState> {
    constructor(props) {
        super(props);
        this.state = {
            sortType: 'id',
        };
    }

    render() {
        let sortFn: (first: iPostComment, second: iPostComment) => number;
        switch (this.state.sortType) {
            case 'id':
                sortFn = (a, b) => a.id >= b.id ? -1 : 1;
                break;

            default:
                sortFn = (a, b) => a.id >= b.id ? -1 : 1;
                break;
        }

        let comments = this.props.comments.sort(sortFn);

        return (
            <div className="comments">
                <div className="description-header">
                    <div className="description-header__text">
                        Комментарии:
                    </div>
                </div>
                <hr />
                <AddComment addComment={this.props.addComment} />
                {comments.map(el => <Comment comment={el} key={el.id} />)}
            </div>
        )
    }
}
