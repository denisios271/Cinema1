import React from 'react';

export default class HashTag extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hashtags: '',
            hashtagsArray: props.value,
        };
        this.addNewWord = this.addNewWord.bind(this);
    }

    onChanged(e) {
        let value = e.target.value.replace(/[^a-zA-Z0-9а-яА-Я,_\- ]/g, "")
            .replace(/-{2,}/g, '-')
            .replace(/_{2,}/g, '_')
            .replace(/,{2,}/g, ',');
        
        if (!this.props.space) {
            value = value.replace(/ /g, '');
        }

        this.setState({
            hashtags: value,
        });
    }

    onKeyPressTagsHandler(e) {
        if (e.key == 'Enter') {
            this.addNewWord();
        }
    }

    addNewWord() {
        let newArray = this.state.hashtagsArray.slice();
        newArray.push(this.state.hashtags);

        this.setState({
            hashtagsArray: newArray,
            hashtags: '',
        });

        this.props.onChange(newArray);
    }

    removeTagsItem(i) {
        const arr = this.state.hashtagsArray;
        arr.splice(i, 1);
        this.setState({
            hashtagsArray: arr,
        });
        this.props.onChange(arr);
    }

    render() {
        return(
            <div className={this.props.className}>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <div className="input-group mb-3">
                    <input
                        onChange={this.onChanged.bind(this)}
                        onKeyPress={this.onKeyPressTagsHandler.bind(this)} value={this.state.hashtags}
                        type="text"
                        placeholder={this.props.placeholder}
                        id={this.props.id}
                        className={`form-control ${!!this.props.error && 'is-invalid'}`}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={e => this.addNewWord()}>
                            +
                        </button>
                    </div>
                </div>
                <small className="form-text text-muted">Нажмите Enter или на кнопочку "+" после введеного слова.</small>
                <div className="invalid-feedback">
                    {!!this.props.error && this.props.error}
                </div>
                <div>
                    {this.state.hashtagsArray.map((v,i) =>
                        <span key={i} className="badge badge-dark m-1 p-2">{v} <a href="" onClick={e => {this.removeTagsItem(i); e.preventDefault();}}>X</a></span>
                    )}
                </div>
            </div>
        );
    }
}
