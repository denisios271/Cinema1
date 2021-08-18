import * as React from "react";
import { connect } from "react-redux";
import * as ActionCreators from "./actions";

import {
  key as postReducerKey,
  iState as iPostReducerState
} from "../reducers";
import {
  key as playersReducerKey,
  iState as iPlayersReducerState
} from "./reducers";

import Types from "./Types";
import Series from "./Series";
import Players from "./Players";
import iGlobalState from "../../../interfaces/iGlobalState";

interface iProps {
  post: iPostReducerState;
  series: iPlayersReducerState;
  isAuthed: boolean;

  changeSeriesType(activeType: number): void;
  changeSeriesNumber(activeNumber: number): void;
  changeSeriesPlayer(activePlayer: number): void;
  smartChangePlayer(): void;
}

class PlayersBlock extends React.Component<iProps> {
  componentDidMount() {
    let startFontSize = 10;

    let loop = setInterval(() => {
      let playerChoice: any = document.querySelector(".form-control");
      if (!document.querySelector(".form-control")) {
        clearInterval(loop);
        return null;
      }

      let marginFromLeftScreen =
        playerChoice.getBoundingClientRect().x ||
        playerChoice.getBoundingClientRect().left ||
        0;

      if (
        playerChoice.clientWidth + marginFromLeftScreen >
        window.innerWidth - 10
      ) {
        playerChoice.style.fontSize = --startFontSize / 10 + "em";
      } else {
        clearInterval(loop);
      }
    }, 50);
  }

  render() {
    if (!this.props.post.data) {
      return null;
    }
    if (!this.props.post.data.has_public_access && !this.props.isAuthed) {
      return (
        <div className="alert alert-warning">
          Видео удалено по просьбе правообладателя.
        </div>
      );
    }
    const post = this.props.post.data;
    const state = this.props.series;
    if (!post.series.length) {
      return (
        <div className="alert alert-danger player__alert">
          Пока еще нет серий =(
        </div>
      );
    }
    const allTypes = post.seriesTypes;
    const availableSeries = post.series.filter(
      v => state.activeType == v.type_id
    );
    let activeSeria = null;
    if (availableSeries.length) {
      activeSeria = availableSeries[state.activeNumber];
    }
    let availablePlayers = [];
    if (activeSeria) {
      availablePlayers = activeSeria.players;
    }
    let activePlayer = null;
    if (availablePlayers.length) {
      activePlayer = availablePlayers[state.activePlayer];
    }

    return (
      <div className="player__cont">
        <div className="player__choice">
          {/* <div className="player__choice-header">Смотреть онлайн</div> */}
          <div className="player__choice-list-cont">
            {allTypes.length > 1 && (
              <Types
                type_changed={this.props.changeSeriesType}
                smartChangePlayer={this.props.smartChangePlayer}
                types={allTypes}
                selectedType={state.activeType}
              />
            )}

            {availablePlayers.length > 1 && (
              <Players
                players={availablePlayers}
                player_changed={this.props.changeSeriesPlayer}
                selectedPlayer={state.activePlayer}
              />
            )}
            <div className="player__overflow-16x9">
              <div className="player">
                {activePlayer ? (
                  <iframe
                    allowFullScreen={true}
                    className="player__display"
                    src={activePlayer.url}
                    frameBorder={0}
                  />
                ) : (
                  <div className="alert alert-danger">
                    Нет плееров для данной серии.
                  </div>
                )}
              </div>
            </div>
            {availableSeries.length > 1 && (
              <Series
                series={availableSeries}
                seria_changed={this.props.changeSeriesNumber}
                smartChangePlayer={this.props.smartChangePlayer}
                selectedNumber={state.activeNumber}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: iGlobalState) => ({
    post: state[postReducerKey],
    series: state[playersReducerKey]
  }),
  (dispatchEvent: any) => ({
    changeSeriesType: (activeType: number) =>
      dispatchEvent(ActionCreators.changeSeriesType(activeType)),
    changeSeriesNumber: (activeNumber: number) =>
      dispatchEvent(ActionCreators.changeSeriesNumber(activeNumber)),
    changeSeriesPlayer: (activePlayer: number) =>
      dispatchEvent(ActionCreators.changeSeriesPlayer(activePlayer)),
    smartChangePlayer: () => dispatchEvent(ActionCreators.smartChangePlayer())
  })
)(PlayersBlock);
