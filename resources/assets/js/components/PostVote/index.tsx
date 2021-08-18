import * as React from 'react';
import { connect } from "react-redux";
import iGlobalState from "../../interfaces/iGlobalState";
import {
    key as postVoteKey,
    iState as iPostVoteState
  } from "./reducers";
import { vote } from "./actions";
import { iState as iPostState, key as postReduserKey } from "../PostPage/reducers";
import { key as authKey } from "../Auth/reducers";
  interface iProps {
    vote: any,
    voteState: any,
    post: any,
    user: any,
}

interface iState {
    transparentFromStarCount: number,
}

 class PostVote  extends React.Component<iProps, iState>{
    constructor(props){
        super(props);
        this.state = {
            transparentFromStarCount: null,
        }
    }

    leftVoteHandler = (e) => {
        e.preventDefault();
        // if(this.props.userVote){
        //     return;
        // };

        let userVote = parseInt(e.target.getAttribute('data-vote_value'));
        this.props.vote(this.props.post.id, userVote);
    }

    mouseEnterHandler = (i) => {
        if(this.props.voteState) return;
        this.setState({
            transparentFromStarCount: i
        });
    }

    mouseLeaveHandler = (i) => {
        if(this.props.voteState) return;
        this.setState({
            transparentFromStarCount: null
        });
    }

    middleVoteValue = () => {
        if(!this.props.voteState || !this.props.post ) return null;
        let releaseVotes = this.props.voteState.votes.filter(cur => {
            return cur.post_id === this.props.post.id ? true : false;
        });

        return releaseVotes[0] != undefined ?
            // middle value for all votes off this release
            (releaseVotes.reduce((sum, cur)=>{
                return cur.post_id === this.props.post.id ? sum + cur.vote : sum;
            },0) / releaseVotes.length).toFixed(1)
            : null;
    }

    userVote = () => {
        if(!this.props.user || !this.props.voteState || !this.props.post) return null;

        let votes = this.props.voteState.votes;
        let userId = this.props.user.id;

        let userVoteObj = votes.filter(vote=>{
            // current user vote for this release
            if(vote.user_id === userId && vote.post_id === this.props.post.id) return true;
         })[0];
        // console.log(userVoteObj, 'USER VOTE !!!');
        return userVoteObj ? userVoteObj.vote : null;
    }

    render(){
        // console.log(this.props.voteState, 'VOTES');
        // console.log(this.props.post.id, 'POST ID');
        const middleVoteValue = this.middleVoteValue();
        const userVote = this.userVote();
        return (
            <div className="vote relize__vote">
                <div className="vote__title">
                    Оценка релиза
                </div>
                <div className="vote__overflow">

                    <div className="vote__header">
                        <div className="vote__user-vote">
                            {middleVoteValue !== null ? 
                                `Средняя оценка ${middleVoteValue}`
                                : ''
                            }
                        </div>
                        {userVote !== null? `Ваша оценка ${userVote}`:' Жжет на ...' }
                    </div>

                    <div className="vote__stars-cont">
                        {[1,2,3,4,5].map((i,k)=>{
                            let votedClass    = ( userVote && i <= userVote ) ? 'vote__star-voted' : '';
                            let isStarWithSmallVoteRateFromUser = ( userVote && i > userVote ) ? 'vote__star-smallVoteRateFromUser' : '';
                            let canVoteClass  = 
                                !this.props.user || // show vote animation for not logged users
                                ((this.props.user && this.props.user.id) && i > userVote) ? 
                                'vote__star-canVote'
                                : '';
                            return(
                                <div className={`vote__star ${votedClass} ${canVoteClass} ${isStarWithSmallVoteRateFromUser}`}
                                    style={this.state.transparentFromStarCount != null && i > this.state.transparentFromStarCount ? {opacity: 0.3} : {} }
                                    data-vote_value={i}
                                    key = {k}
                                    onClick={this.leftVoteHandler}
                                    onMouseEnter={this.mouseEnterHandler.bind(this,i)}
                                    onMouseLeave={this.mouseLeaveHandler.bind(this,i)}>
                                </div>
                                
                            );
                        })}
                    </div>
                </div>
            </div>
            // <div>test</div>
        )
    }
}

export default connect(
    (state: iGlobalState) => ({
        voteState: state[postVoteKey],
        post: state[postReduserKey].data,
        user: state[authKey].userData,
      }),
      (dispatchEvent: any) => ({
        vote: (postId: number, voteRate: number) => dispatchEvent(vote(postId, voteRate)),
      })
)(PostVote)