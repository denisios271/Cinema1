import React from 'react';
import { connect } from 'react-redux';

import HashTag from './HashTag';
import ReactLoading from 'react-loading';
import ResourceInfoCard from '../ResourceInfoCard';

class Form extends React.Component {
    constructor(props) {
        super(props);
        const { post, } = props;
        this.state = {
            title: post ? post.title : '',
            alt_name: post ? post.alt_name : '',
            trailer: post ? post.trailer : '',
            poster: post ? post.poster : '',
            poster_author: post ? post.poster_author : '',
            full_story: post ? post.full_story : '',
            has_public_access: post ? post.has_public_access : 1,
            categories: post ? post.categories.map(v => v.id) : [],

            keywords: post ? post.keywords.split(', ') : [],
            voicers: post ? post.voicers.split(', ') : [],
            translaters: post ? post.translaters.split(', ') : [],
            timers: post ? (post.timers ? post.timers.split(', ') : []) : [],
            hashtags: post ? post.tags.split(', ') : [],
        };
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

        if (name == 'title') {
            this.setState({
                alt_name: value.replace(/ /g, '-')
                    .replace(/[^a-zA-Z0-9\-]/g, "")
                    .replace(/-{2,}/g, '-')
                    .replace(/^-|-$/g, '')
                    .toLowerCase(),
            });
        }
        
        if (name == 'alt_name') {
            this.setState({
                alt_name: value.replace(/ /g, '-')
                    .replace(/[^a-zA-Z0-9\-]/g, "")
                    .replace(/-{2,}/g, '-')
                    .replace(/^-|-$/g, '')
                    .toLowerCase(),
            });
        }
    }

    getColorByItem(item, isForParent = false) {
        const { categories, } = this.props;
        const colors = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
        ];
        const parentIds = categories.filter(v => v.parentid == 0).map(v => v.id);

        const checkingField = isForParent ? 'id' : 'parentid';

        const position = parentIds.findIndex(v => v == item[checkingField]);

        if (this.state.categories.indexOf(item.id) != -1) {
            return 'link';
        }

        if (position == -1 || position >= colors.length) {
            return 'link';
        }

        return colors[position];
    }

    handleCategoryClick(id) {
        let newArray = this.state.categories.slice();
        let position = newArray.indexOf(id);

        if (position == -1) {
            newArray.push(id);

            // let's push also parent category
            const selectedCategory = this.props.categories.find(v => v.id == id);
            if (selectedCategory.parentid && newArray.indexOf(selectedCategory.parentid) == -1) {
                newArray.push(selectedCategory.parentid);
            }
        } else {
            newArray.splice(position, 1);

            const selectedCategories = this.props.categories.filter(v => v.parentid == id);
            for (let selectedCategory of selectedCategories) {
                let position = newArray.indexOf(id);
                if (position != -1) {
                    newArray.splice(position, 1);
                }
            }
        }

        newArray = newArray.sort((v1, v2) => v1 > v2);
        this.setState({
            categories: newArray,
        });
    }

    send(e) {
        e.preventDefault();
        const state = this.state;
        let data = {
            title: state.title,
            full_story: state.full_story,
            keywords: state.keywords,
            alt_name: state.alt_name,
            tags: state.hashtags,
            poster: state.poster,
            trailer: state.trailer,
            voicers: state.voicers,
            translaters: state.translaters,
            timers: state.timers,
            categories: state.categories,
            has_public_access: state.has_public_access,
        };

        const keys = Object.keys(data);
        keys.forEach(key => {
            let val = data[key];

            let isNull = !val;
            let isEmptyArray = Array.isArray(val) && !val.length;

            if (isNull || isEmptyArray) {
                delete data[key];
            }
        });

        this.props.submit(data);
    }

    render() {
        const { categories, } = this.props;
        const inputErrors = this.props.inputErrors;

        if (this.props.successObject) {
            return <ResourceInfoCard
                message = {this.props.successMessage}
                title = "Данные релиза:"
                object = {this.props.successObject}
                uri = {`/post/${this.props.successObject.alt_name}`}
                editUri = {`/admin/post/edit/${this.props.successObject.id}`}
            />;
        }

        return (
            <form className="form-horizontal">
                <div className="row">

                    <div className={`form-group col-xs-12 col-sm-4`}>
                        <label htmlFor="input_title">Название</label>
                        <input onChange={this.onChanged.bind(this)} value={this.state.title}
                            type="text" name="title" placeholder="Синий экзорцист" id="input_title"
                            className={`form-control ${!!inputErrors.title && 'is-invalid'}`}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.title && inputErrors.title}
                        </div>
                    </div>

                    <div className="form-group col-xs-12 col-sm-4">
                        <label htmlFor="input_alt_name">Название (url)</label>
                        <input onChange={this.onChanged.bind(this)} value={this.state.alt_name}
                            type="text" name="alt_name" placeholder="ao-no-exorcist" id="input_alt_name"
                            className={`form-control ${!!inputErrors.alt_name && 'is-invalid'}`}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.alt_name && inputErrors.alt_name}
                        </div>
                    </div>

                    <HashTag title="Ключевые слова" onChange={arr => this.setState({ keywords: arr })}
                        id="input_keywords" className="form-group col-xs-12 col-sm-4"
                        placeholder="2017,Кисимото Атускирович,ololo,vk" space
                        error={inputErrors.keywords} value={this.state.keywords}
                    />
                    
                    <div className="form-group col-xs-12 col-sm-4">
                        <label htmlFor="input_trailer">Трейлер</label>
                        <input onChange={this.onChanged.bind(this)} value={this.state.trailer}
                            type="text" name="trailer" placeholder="https://www.youtube.com/embed/ktvTqknDobU" id="input_trailer"
                            className={`form-control ${!!inputErrors.trailer && 'is-invalid'}`}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.trailer && inputErrors.trailer}
                        </div>
                    </div>

                    <div className="form-group col-xs-12 col-sm-4">
                        <label htmlFor="input_poster">Постер</label>
                        <input onChange={this.onChanged.bind(this)} value={this.state.poster}
                            type="text" name="poster" placeholder="https://pp.vk.me/c626916/v626916646/3c876/YnmIucACXCw.jpg" id="input_poster"
                            className={`form-control ${!!inputErrors.poster && 'is-invalid'}`}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.poster && inputErrors.poster}
                        </div>
                    </div>

                    <div className="form-group col-xs-12 col-sm-4">
                        <label htmlFor="input_poster_author">Автор постера</label>
                        <input onChange={this.onChanged.bind(this)} value={this.state.poster_author}
                            type="text" name="poster_author" placeholder="Demitra" id="input_poster_author"
                            className={`form-control ${!!inputErrors.poster_author && 'is-invalid'}`}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.poster_author && inputErrors.poster_author}
                        </div>
                    </div>
                    
                    <HashTag title="Озвучка" onChange={arr => this.setState({ voicers: arr })}
                        id="input_voicers" className="form-group col-xs-12 col-sm-4"
                        placeholder="Fretta, Мираль" space
                        error={inputErrors.voicers} value={this.state.voicers}
                    />
                    
                    <HashTag title="Перевод" onChange={arr => this.setState({ translaters: arr })}
                        id="input_translaters" className="form-group col-xs-12 col-sm-4"
                        placeholder="Aliance - Fansub" space
                        error={inputErrors.translaters} value={this.state.translaters}
                    />
                    
                    <HashTag title="Таймеры" onChange={arr => this.setState({ timers: arr })}
                        id="input_timers" className="form-group col-xs-12 col-sm-4"
                        placeholder="Calibri, Миша" space
                        error={inputErrors.timers} value={this.state.timers}
                    />
                    
                    <HashTag title="Хештеги (добавляйте года, различную полезную инфу)"
                        onChange={arr => this.setState({ hashtags: arr })} id="input_hashtags"
                        className="form-group col-xs-6 col-sm-6" placeholder="2017,Кисимото Атускирович,ololo,vk"
                        error={inputErrors.tags} value={this.state.hashtags}
                    />
                    
                    <div className="form-group col-xs-6 col-sm-6">
                        <label htmlFor="has_public_access">Должно показываться для неавторизованных пользователей? (АП)</label>
                        <select name="has_public_access" id="has_public_access" value={this.state.has_public_access}
                            className={`form-control ${!!inputErrors.has_public_access && 'is-invalid'}`}
                            onChange={this.onChanged.bind(this)}
                        >
                            <option value="1">Показывать для всех</option>
                            <option value="0">Скрывать от АП</option>
                        </select>
                        <div className="invalid-feedback">
                            {!!inputErrors.has_public_access && inputErrors.has_public_access}
                        </div>
                    </div>

                    <div className="form-group col-xs-12 col-sm-12">
                        <label htmlFor="input_full_story">Полное описание</label>
                        <textarea onChange={this.onChanged.bind(this)} value={this.state.full_story}
                            name="full_story" placeholder="Полное описание" id="input_full_story" rows="5"
                            className={`form-control ${!!inputErrors.full_story && 'is-invalid'}`}
                        ></textarea>
                        <div className="invalid-feedback">
                            {!!inputErrors.full_story && inputErrors.full_story}
                        </div>
                    </div>

                    <div className="form-group col-xs-12 col-sm-12">
                        <label htmlFor="input_categories">Категории</label>
                        <input onChange={this.onChanged.bind(this)} value={this.state.categories.join()}
                            type="text" name="categories" placeholder="1,2,3" id="input_categories" readOnly
                            className={`form-control ${!!inputErrors.categories && 'is-invalid'}`}
                        />
                        <div className="invalid-feedback">
                            {!!inputErrors.categories && inputErrors.categories}
                        </div>
                    </div>

                    <div className="form-group col-xs-12 col-sm-12">
                        <label htmlFor="input_full_story">Выберите категории</label>
                        <div id="categories_container">
                            <div className="row mb-3">
                                <div className="col">
                                    {categories.filter(v => v.parentid == 0).map(v =>
                                        <button key={v.id} onClick={e => { e.preventDefault(); this.handleCategoryClick(v.id); }} className={`btn btn-${this.getColorByItem(v, true)} m-1`}>{v.name}</button>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {categories.filter(v => v.parentid != 0).map(v =>
                                        <button key={v.id} onClick={e => { e.preventDefault(); this.handleCategoryClick(v.id); }} className={`btn btn-${this.getColorByItem(v)} m-1`}>{v.name}</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-xs-12 col-sm-12">
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
                            <button onClick={this.send.bind(this)} type="submit" className="btn btn-primary btn-block">
                                Отправить
                            </button>
                        )}
                    </div>

                </div>
            </form>
        );
    }
}

export default connect((state) => ({ categories: state.categories.data }))(Form);
