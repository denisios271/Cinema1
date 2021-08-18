import * as React from 'react';

interface iState {
    placeholderText: string,
    placeholderNow: string,
    commentText: string,

    userTest: any,
}

interface iProps {
    addComment: (text: string) => void,
}


export default class AddComment extends React.Component<iProps, iState>{
    private textarea: HTMLInputElement;

    constructor(props){
        super(props);
        const placeHolderText = 'Присоеденитесь к диалогу...';

        this.state = {
            placeholderText: placeHolderText,
            placeholderNow: placeHolderText,
            commentText: "",
            userTest: {
                name: 'Test',
                img: null,
            },
        }
    }

    onFocusHandler = () => {
        if( this.state.commentText != '' ) return;
        this.setState({
            placeholderNow: '',
        });
    }

    onBlurHandler = () => {
        if( this.state.commentText == '' ){
            this.setState({
                placeholderNow: this.state.placeholderText
            });
        }
    }

    clearInnerHTML( elem ){
        elem.innerHTML = "";
        return null;
    }

    addCommentHandler = (e) => {
        let commentText = this.state.commentText;

        this.clearInnerHTML(this.refs.textarea);
        this.setState({
            commentText: "",
        });

        this.props.addComment(commentText);
    }

    onInputHandler = (e) => {
        this.setState({
            commentText: e.target.innerText.trim()
        });
    }


    render(){
        return(
            <div className="comment__overflow">
                <div className="comment__avatar">
                    <div className="avatar">
                        <div className="avatar__overflow">
                            <img className="avatar__image" src="/images/avatars/noname.png" alt="avatar"/>
                        </div>
                    </div>
                </div>
                <div className="comment__add-comment add-comment">
                    <div className="add-comment__textarea-overflow">
                        <div className="add-comment__textarea-placeholder">
                            {this.state.placeholderNow}
                        </div>
                        <div className="add-comment__textarea"
                            ref = "textarea"
                            onFocus = {this.onFocusHandler}
                            onBlur  = {this.onBlurHandler}
                            onInput = {this.onInputHandler}
                            contentEditable={true}
                            >
                        </div>
                    </div>
                    <div className="add-comment__bottom ">
                        <div className={`add-comment__button
                                        ${this.state.commentText == '' ? 'add-comment__button-disable' : ''}`}
                            onClick={this.addCommentHandler}>
                            Опубликовать
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}