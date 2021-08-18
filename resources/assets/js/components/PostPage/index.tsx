import * as React from "react";
import { match } from "react-router-dom";
import { connect } from "react-redux";
import { requestPost, loadComments } from "./actions";
import * as favoriteActions from "../Favorites/actions";

import E_mess from "../Errors/E_mess";
import Loading from "../Loading";

import PlayersBlock from "./PlayersBlock";
import iGlobalState from "../../interfaces/iGlobalState";
import { iState as iPostState, key as postReduserKey } from "./reducers";
import {
    iState as iFavoriteState,
    key as favoriteReduserKey
} from "../Favorites/reducers";
import { key as authKey } from "../Auth/reducers";
import SeoWrapper from "../Wrappers/Seo";
import Text from "../../lib/Text";
import iUser from "../../interfaces/iUser";
import PostComments from "./PostComments";
import iPostComment from "../../interfaces/iPostComment";
import Api, { iError } from "../../lib/Api";
import Alert from "../Alert";
import Trailer from "./Trailer";
import PostVote from "../PostVote";

interface iProps {
    post: iPostState;

    favorites: iFavoriteState;
    match: match<{ alt_name: string }>;
    user: iUser;

    requestPost(altName): void;
    addToFavorite(postId): void;
    removeFromFavorite(postId): void;
    loadComments(postId: number): void;
}

interface iState {
    canToggle: boolean;
    descHidden: boolean;
}

class Full extends React.Component<iProps, iState> {
    public refs: {
        info__description: HTMLInputElement;
    };
    public descriptionHeight = 200;

    constructor(props) {
        super(props);

        this.state = {
            canToggle:
                window.innerWidth < 768 &&
                    this.props.post.data != null &&
                    this.props.post.data.full_story.length > 100
                    ? true
                    : false,
            descHidden: true
        };
    }

    componentWillReceiveProps() {
        // at first, in there is props.post.data == null only in mobile o_O version ?
        // but it's need to check if description gas to much length and need to add toggle slide
        if (!this.state.canToggle) {
            this.setState({
                canToggle:
                    window.innerWidth < 768 &&
                        this.props.post.data != null &&
                        this.props.post.data.full_story.length > 100
                        ? true
                        : false
            });
        }
    }

    loadPost(altName: string) {
        if (this.props.post.isFetching) {
            return null;
        }
        if (
            this.props.post.data === null ||
            this.props.post.data.alt_name != altName
        ) {
            try {
                this.props.requestPost(altName);
            } catch (e) {
                throw e;
            }
        }
    }

    onDescClickHandler() {
        if (!this.state.canToggle) {
            return null;
        }
        this.setState({
            descHidden: !this.state.descHidden
        });
    }

    componentWillMount() {
        this.loadPost(this.props.match.params.alt_name);
    }

    componentWillUpdate(next) {
        if (next.match.params.alt_name != this.props.match.params.alt_name) {
            this.loadPost(next.match.params.alt_name);
        }
    }

    addCommentHandler = (text: string) => {
        Api.post<iPostComment>(`post/comment`, {
            post_id: this.props.post.data.id,
            body: text
        })
            .then(r => {
                this.props.loadComments(r.post_id);
            })
            .catch((e: iError) => {
                if (e.status == 403) {
                    // user is muted
                    Alert("Вам заблокирован чат на некоторое время.");
                } else {
                    Alert(e.error);
                }
            });
    };

    getNormalElement() {
        const post = this.props.post.data;
        const height = this.state.descHidden
            ? `${this.descriptionHeight}px`
            : "5000px";
        const descStyles = {
            maxHeight: height
        };

        const getWorkerList = str => {
            if (!str) return "";

            return str.split(",").map((worker, key) => {
                return (
                    <div className="voicer" key={key}>
                        {worker.trim()}
                    </div>
                );
            });
        };


        // const isFavorite = this.props.favorites.posts.filter(v => v.post_id == post.id).length > 0;

        // <Trailer trailer_url = {post.trailer} />
        // <Fields item = {post} />
        // {isFavorite ? (
        //     <button className={`btn btn-block btn-danger ${this.props.favorites.isFetching && `disabled`}`}
        //         onClick={() => this.props.favorites.isFetching ? null : this.props.removeFromFavorite(post.id)}>
        //         Удалить из избранного
        //     </button>
        // ) : (
        //     <button className={`btn btn-block btn-warning ${this.props.favorites.isFetching && `disabled`}`}
        //         onClick={() => this.props.favorites.isFetching ? null : this.props.addToFavorite(post.id)}>
        //         Добавить в избранное
        //     </button>
        // )}
        // <Keywords item={post} />
        // console.log(this.props.post, "POST");
        const release = this.props.post.data;
        const { trailer } = release;
        return (
            <div className="content content-relize">
                <div className="postPage__topSection">
                    <div className="postPage__posterSection">
                        <div className="relize relize-postPage">
                            <div className="relize__max-size relize__max-size-postPage">
                                <div className="relize__image-cont relize-sizes">
                                    <PostVote />
                                    <img
                                        className="relize__image relize-sizes__image"
                                        src={release.poster}
                                        alt={`Постер релиза ${release.title}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relize__voicers">
                            <div className="info__description-overflow">
                                <div className={`info__description info__description-relize`}>
                                    <div className="relize__voicersHead">Релиз озвучивали:</div>
                                    <div className="relize__voicersList">
                                        {getWorkerList(release.voicers)}
                                    </div>
                                    {release.timers ? (
                                        <div>
                                            <div className="relize__voicersHead">
                                                Работа со звуком:
                                            </div>
                                            <div className="relize__voicersList">
                                                {getWorkerList(release.timers)}
                                            </div>
                                        </div>
                                    ) : (
                                            ""
                                        )}
                                    {release.translaters ? (
                                        <div>
                                            <div className="relize__voicersHead">Перевод:</div>
                                            <div className="relize__voicersList">
                                                {getWorkerList(release.translaters)}
                                            </div>
                                        </div>
                                    ) : (
                                            ""
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="postPage__playerSection">
                        <PlayersBlock isAuthed={!!this.props.user} />
                    </div>
                </div>

                {/* <div className="content-row"> */}
                <div className="description-header relize__descriptionHeader">
                    <div className="description-header__text">Описание:</div>
                    {/* </div> */}
                </div>
                <div className="relize__bottom">
                    <div className="relize__description info__description-overflow">
                        <div
                            ref="info__description"
                            style={
                                this.state.descHidden && this.state.canToggle ? descStyles : {}
                            }
                            className={`info__description info__description-relize ${
                                this.state.descHidden && this.state.canToggle
                                    ? `info__description-canToggle`
                                    : ``
                                }`}
                            onClick={this.onDescClickHandler.bind(this)}
                            dangerouslySetInnerHTML={{ __html: `<p>${post.full_story}</p>` }}
                        />
                    </div>
                </div>

                <PostComments
                    addComment={this.addCommentHandler}
                    comments={
                        this.props.post && this.props.post.comments
                            ? this.props.post.comments.data
                            : []
                    }
                />

                {/* <div className="postPage__header">Смотреть онлайн</div> */}
            </div>
        );
    }

    render() {
        if (this.props.post.isFetching) {
            return <Loading />;
        }
        if (this.props.post.error) {
            return <E_mess error={this.props.post.error} />;
        }
        if (!this.props.post.data) {
            return null;
        }

        const post = this.props.post.data;
        // console.log(post, "POST DATA");
        const category = post.categories.find(v => !v.parentid);

        let metaDescription = `Смотреть онлайн ${category.name} ${post.title} - ${
            post.full_story
            }`;
        metaDescription = Text.removeHtml(metaDescription);
        metaDescription = Text.cutForDescription(metaDescription);
        return (
            <section>
                <SeoWrapper
                    title={`${category.name} ${post.title} смотреть онлайн`}
                    description={metaDescription}
                    keywords={post.keywords}
                >
                    {this.getNormalElement()}
                </SeoWrapper>
            </section>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        post: state[postReduserKey],
        favorites: state[favoriteReduserKey],
        user: state[authKey].userData
    }),
    (dispatchEvent: any) => ({
        requestPost: altName => dispatchEvent(requestPost(altName)),
        addToFavorite: postId =>
            dispatchEvent(favoriteActions.addPostToFavorite(postId)),
        removeFromFavorite: postId =>
            dispatchEvent(favoriteActions.removePostFromFavorite(postId)),
        loadComments: (postId: number) => dispatchEvent(loadComments(postId))
    })
)(Full);
