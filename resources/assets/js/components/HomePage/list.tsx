import * as React from 'react';
import iPost from '../../interfaces/iPost';
import * as $ from 'jquery';
import PostPreview from '../Post/Preview';
import Slider from "react-slick";
import confSlider from '../../lib/Yan/sliderConf';

interface iProps {
    id: string,
    posts: iPost[],

    needSubline?: boolean,
    smallList?: boolean,
}

interface iState {
    width: number,
}

export default class List extends React.Component<iProps, iState> {
    state = {
        width: window.innerWidth,
    };

    componentWillMount() {
        $(window).bind('resize', this.widthChangeHandler);
    }

    componentWillUnmount() {
        $(window).unbind('resize', this.widthChangeHandler);
    }

    widthChangeHandler = e => {
        this.setState({
            width: window.innerWidth,
        });
    }

    render() {
        let content = this.props.posts.map((v, i) => (
            <PostPreview key={v.id} poster={v.poster} link={`/post/${v.alt_name}`} />
        ));

        if (!this.props.posts.length) {
            return null;
        }
        return (
            <div className="content-row content-row-main-page">
                <div className="relizes-row">
                    <Slider {...confSlider}>
                        {content}
                    </Slider>
                </div>
                {!!this.props.needSubline && <div className="content-row__line"></div>}
            </div>
        );
    }
}