import * as React from 'react';

interface iProps {
    selectAI(): void,
    // selectUser(): void,
}

interface iState {
    showButtons: boolean,
    enableButtons: boolean,
}

export default class SelectOpponent extends React.Component<iProps, iState> {
    state = {
        showButtons: false,
        enableButtons: false,
    };

    render() {
        const btnClasses: string[] = [];

        if (!this.state.enableButtons) {
            btnClasses.push('disabled');
        }

        if (this.state.showButtons) {
            btnClasses.push('show');
        } else {
            btnClasses.push('hide');
        }

        return (
            <div className='text-center d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100'>
                <audio id="sound-god-welcome" src='/sound/bj/god/welcome.wav' autoPlay onEnded={e => {
                    this.setState({
                        showButtons: true,
                    }, () => {
                        setTimeout(() => {
                            ($('#sound-god-ask')[0] as HTMLAudioElement).play();
                        }, 500);
                    });
                }} />
                <audio id="sound-god-ask" src='/sound/bj/god/ask.wav' onEnded={e => this.setState({ enableButtons: true })} />

                <button onClick={this.state.enableButtons ? () => {
                        this.setState({
                            showButtons: false,
                        }, () => {
                            setTimeout(() => {
                                this.props.selectAI();
                            }, 500);
                        });
                    } : null}
                    className={`btn btn-outline-secondary btn-lg mb-3 fade in ${btnClasses.join(' ')}`}>
                    Боги (ИИ)
                </button>

                <button className={`btn btn-outline-secondary btn-lg mt-3 disabled fade in ${btnClasses.join(' ')}`}>
                    Смерды (игрок)
                </button>
            </div>
        );
    }
}
