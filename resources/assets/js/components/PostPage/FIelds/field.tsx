import * as React from 'react';
import Svg from '../../Svg';

interface iProps {
    title: string,
    name: string,
    svg: string,
    n: number,
}

export default class Field extends React.Component<iProps> {
    render() {
        let gray = (!(this.props.n % 2)) ? "info-gray" : "";
        return(
            <div className="info">
                <div className={`info-block ${gray}`}>
                    <div className="info-svg"><Svg descr = {this.props.name} url = {`full/${this.props.svg}.svg`} /></div>
                    <div className="info-text"><b>{this.props.title}</b></div>
                </div>
            </div>
        );
    }
}