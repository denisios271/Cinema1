import * as React from 'react';
import { connect } from 'react-redux';
import iGlobalState from '../../interfaces/iGlobalState';
import Api from '../../lib/Api';
import iPost from '../../interfaces/iPost';
import { Link } from 'react-router-dom';
import { key as postReduserKey, iState as iPostState } from '../PostPage/reducers';
import iPaginate from '../../interfaces/iPaginate';


interface iProps {
    path: string,
    post: iPostState,

}

interface iState {
    newPosts: iPost[],
    recommendedPosts: iPost[],
}


const sidebarRelease = (release: iPost, key: number,  type: '' | 'new' | 'recommend') => {
    let voicers:any = release.voicers ? release.voicers.split(", ") : [];

    return (
        <div key = {key} className={`side-bar-left__promote-relize`}>
            <div className="promote-relize">
                {/* {type == 'releasePoster' ? voicers.map((v:string,i:number)=>(voicerBlock(v,i))):""} */}
                <div className="promote-relize__max-size">
                        <Link to={`/post/${release.alt_name}`}>
                            <div className={`promote-relize__image-cont relize-sizes }`}>
                                <img className="promote-relize__image relize-sizes__image" src={release.poster} />
                            </div>
                        </Link>
                    {type == 'new' ? (
                        <div className="promote-relize__header promote-relize__header-new"></div>
                    ) : type == 'recommend' ? (
                        <div className="promote-relize__header promote-relize__header-reccomend"></div>
                    ) : null}
                </div>
                
            </div>
            
        </div>
    );
};

class Sidebar extends React.Component<iProps, iState> {
    state = {
        newPosts: [],
        recommendedPosts: [],
    };

    componentDidMount() {
        Api.get<iPaginate<iPost>>('search/category/new/1/2').then(posts => {
            this.setState({
                newPosts: posts.data,
            });
        }).catch(null);

        Api.get<iPaginate<iPost>>('search/category/recommended/1/2').then(posts => {
            this.setState({
                recommendedPosts: posts.data,
            });
        }).catch(null);
    }

    // addPostVoteHander = (vote: number) => {
    //     // this.props.vote(this.props.post.data.id, vote);
    // }

    // renderReleasePoster( key = 1000 ) {
    //     if (this.props.post.isFetching || this.props.post.error) {
    //         return null;
    //     }

    //     const post = this.props.post.data;
    //     if (!post) {
    //         return null;
    //     }

    //     // const votes = this.props.voteState.votes.filter(v => v.post_id == this.props.post.data.id);
    //     // const vote = votes.length ? votes[0] : null;

    //     // return sidebarRelease(post, key, 'releasePoster', {
    //     //     f: this.addPostVoteHander,
    //     //     vote: vote ? vote.vote : 5,
    //     //     userVote: vote ? vote.vote : null,
    //     // });
    // }

    renderLeftSideBarPosts(){
        return (
            <>
                {this.state.newPosts.map((v, key) => sidebarRelease(v, key, 'new'))}
                {this.state.recommendedPosts.map((v, key) => sidebarRelease(v, key, 'recommend'))}
                <div className="side-bar-left__banner-2x3">
                    <div className="banner-2x3">
                        <div className="banner-2x3__max-size">
                            <div className="banner-2x3__image-cont">
                                <img className="banner-2x3__image" src="/images/template/banner2x3.png" />
                            </div>
                        </div>
                    </div>
                </div>	
            </>
        )
    }
    
    render() {
        // const postPrefix = '/post/';
        // const postLocationIndex = this.props.path.indexOf(postPrefix);
        // const isPostPage = postLocationIndex !== -1 ? true : false;

        return (
            // <div className={`side-bar-left ${isPostPage ? `side-bar-left-postPage` : `` }`}>
            //     { isPostPage ? // we should show it only at post page
            //         this.renderReleasePoster() 
            //         : this.renderLeftSideBarPosts()
            //     }
            // </div>
            <div className={`side-bar-left`}>
                { this.renderLeftSideBarPosts() }
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        post: state[postReduserKey],

    })
)(Sidebar);