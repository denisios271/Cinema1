import * as React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../SearchNavigation';
import Shortstory from '../Shortstory';
import iPost from '../../interfaces/iPost';
import PostPreview from '../Post/Preview';
import Slider from "react-slick";
import confSlider from '../../lib/Yan/sliderConf';

interface iProps {
    data: iPost[],
    maxPage: number,
    currentPage: number,
    field: string,
    value: string,
    h1_title: string,
}

export default class Content extends React.Component<iProps> {
    constructor(props) {
        super(props);
        this.getPagination = this.getPagination.bind(this);
    }

    getPagination() {
        if (this.props.maxPage <= 1) {
            return null;
        }
        return (
            <div className="pages">
                <Navigation
                    maxPage={this.props.maxPage}
                    currentPage={this.props.currentPage}
                    link={`/${this.props.field}/${this.props.value}/`}
                />
            </div>
        );
    }

    render() {
        let content=this.props.data.map((val, i) => (
            <PostPreview key={val.id} poster={val.poster} link={`/post/${val.alt_name}`} />
        ));
        let statusString = `${this.props.h1_title} смотреть онлайн`;
        return (
            <div className="content content-category">
                <div className="content-row">
                    <div className="relizes-row">
                        <Slider {...confSlider}>
                            {content.slice(0, content.length / 2)}
                        </Slider>
                    </div>
                </div>
                <div className="content-row-category__line">
                    <div className="content-row-category__line-before"></div>
                    <div className="content-row-category__header">{statusString}</div>
                    <div className="content-row-category__line-after"></div>
                </div>
                <div className="content-row">
                    <div className="relizes-row">
                        <Slider {...confSlider}>
                            {content.slice(content.length / 2)}
                        </Slider>
                    </div>
                </div>
                <div className="content-row">
                    <div className="relizes-row">
                        {this.getPagination()}
                    </div>
                </div>
            </div>
        );
    }
}