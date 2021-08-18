import * as React from 'react';

interface iProps {
    title: string,
}

export default class Block extends React.Component<iProps> {
    render() {
        return(
            <div className = "col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 block">
                <div className = "row">
                    <div className = "col">
                        <h4>
                            {this.props.title}
                        </h4>
                    </div>
                </div>
                <div className = "row block-data">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
