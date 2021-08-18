import * as React from 'react';

interface iProps {
    url: string,
    descr?: string,
}

export default class Svg extends React.Component<iProps> {
    render() {
        const descr = (this.props.descr) ? this.props.descr : "Ваш браузер не поддерживает SVG.";
        return(
            <object type = "image/svg+xml" data = {"/images/" + this.props.url}>
                {descr}
            </object>
        );
    }
}