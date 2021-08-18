import React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'react-ckeditor-component';

import HashTag from '../Post/HashTag';
import ReactLoading from 'react-loading';
import ResourceInfoCard from '../ResourceInfoCard';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        const { article, } = props;
        this.state = {
            title: article ? article.title : '',
            uri: article ? article.uri : '',
            hashtags: article ? article.hashtags.split(', ') : [],
            content: article ? article.content : '',
        };

        this.onChanged = this.onChanged.bind(this);
        this.send = this.send.bind(this);
    }

    onChanged(e) {
        const name = e.target.name;
        let value = e.target.value;

        if (name == 'hashtags') {
            value = value.replace(/[^a-zA-Z0-9а-яА-Я,_\-]/g, "")
                .replace(/-{2,}/g, '-')
                .replace(/_{2,}/g, '_')
                .replace(/,{2,}/g, ',');
        }

        this.setState({
            [name]: value,
        });

        if ((name == 'title' || name == 'uri') && !this.props.article) {
            this.setState({
                uri: value.replace(/ /g, '-')
                    .replace(/[^a-zA-Z0-9\-]/g, "")
                    .replace(/-{2,}/g, '-')
                    .replace(/^-|-$/g, '')
                    .toLowerCase(),
            });
        }
    }

    send(e) {
        e.preventDefault();
        const state = this.state;
        this.props.submit({
            title: state.title,
            uri: state.uri,
            hashtags: state.hashtags,
            content: state.content,
        });
    }

    render() {
        const inputErrors = this.props.inputErrors;

        if (this.props.successObject) {
            return <ResourceInfoCard
                message = {this.props.successMessage}
                title = "Данные статьи:"
                object = {this.props.successObject}
                uri = {`/article/${this.props.successObject.uri}`}
                editUri = {`/admin/article/edit/${this.props.successObject.id}`}
            />;
        }

        return (
            <div className="form-horizontal">
                <div className="row">

                    <div className={`form-group col-xs-12 col-sm-4`}>
                        <label htmlFor="input_title">Название</label>
                        <input onChange={this.onChanged} value={this.state.title}
                            type="text" name="title" placeholder="Синий экзорцист" id="input_title"
                            className={`form-control ${!!inputErrors.title && 'is-invalid'}`}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.title && inputErrors.title}
                        </div>
                    </div>

                    <div className='form-group col-xs-12 col-sm-4'>
                        <label htmlFor="input_uri">Название (url)</label>
                        <input onChange={this.onChanged} value={this.state.uri}
                            type="text" name="uri" placeholder="ao-no-exorcist" id="input_uri"
                            className={`form-control ${!!inputErrors.uri && 'is-invalid'}`}
                            readOnly={!!this.props.article}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.uri && inputErrors.uri}
                        </div>
                    </div>

                    <HashTag title="Хештеги" onChange={arr => this.setState({ hashtags: arr })}
                        id="input_hashtags" className="form-group col-xs-12 col-sm-4"
                        placeholder="2017,Кисимото Атускирович,ololo,vk" space
                        error={inputErrors.hashtags} value={this.state.hashtags}
                    />

                    <div className="form-group col-xs-12 col-sm-12">
                        <label htmlFor="input_uri">Контент (50 - 3000 символов)</label>
                        <CKEditor
                            content={this.state.content}
                            events={{
                                "change": (e) => this.setState({ content: e.editor.getData(), })
                            }}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.content && inputErrors.content}
                        </div>
                    </div>

                    {!!this.state.title && !!this.state.uri && !!this.state.hashtags.length &&
                        <div className="form-group">
                            {this.props.isFetching ? (
                                <center>
                                    <ReactLoading
                                        type="spinningBubbles"
                                        color="#333"
                                        delay={0}
                                        height="100"
                                        width="100"
                                    />
                                </center>
                            ) : (
                                <button className="btn btn-primary" type="submit" onClick={this.send}>
                                    Отправить
                                </button>
                            )}
                        </div>
                    }

                </div>
            </div>
        );
    }
}
