import * as React from 'react';

interface iProps {
    trailer_url: string,
}

interface iState {
    showModal: boolean,
}

export default class Trailer extends React.Component<iProps, iState> {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    render() {
        if (!this.props.trailer_url) {
            return null;
        }
        return (
            <div className = "row">
                <div className = "col">
                    <button className = "btn btn-secondary btn-trailer btn-block" data-toggle="modal" data-target="#exampleModal">
                        <i className="fa fa-video-camera"></i><b>Смотреть трейлер</b>
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" src={this.props.trailer_url}></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}