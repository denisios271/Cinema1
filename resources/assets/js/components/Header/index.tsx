import * as React from 'react';
import { Link, } from 'react-router-dom';
import QuickSearchForm from '../QuickSearchForm';

interface iState {
    mobileMenuShow: boolean,
}

export default class Header extends React.Component<{}, iState> {
    constructor(props) {
        super(props);
        this.state = {
            mobileMenuShow: false,
        };
    }

    mobileMenuToggleHandler() {
        this.setState({
            mobileMenuShow: !this.state.mobileMenuShow,
        });
    }

    renderImage(): string {
        const d = new Date;

        // is new year?
        if (d.getMonth() == 11 || d.getMonth() == 0) {
            return `/images/header-ny.png`;
        }
        
        return `/images/template/header_bg.jpg`;
    }

    render() {
        return (
            <div className="header">
                <div className="header__block-top">
                    
                    <div className="header__bg-cont">
                        <Link to="/">
                            <img className="header__bg" src={this.renderImage()} />
                        </Link>
                    </div>

                    <div className="header__control-row">
                        <QuickSearchForm />
                        <div className="left-bar">
                            <Link to="/profile" className="left-bar__account-href-cont hasHoverBottomAnimate">
                                <div className="left-bar__account-href">
                                    Личный кабинет
                                </div>
                            </Link>

                            <div className="left-bar__microphone hasHoverBottomAnimate">
                                <Link to="#">
                                    <img src="/images/template/micro.png" className="left-bar__microphone-image" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="navigation__mobile_control" onClick={this.mobileMenuToggleHandler.bind(this)}>
                    Меню
                </div>
                <div className={`navigation ${this.state.mobileMenuShow?`navigation-show`:``}`}>
                    <div className="navigation__item hasHoverBottomAnimate hasMenuTypeAnimation">
                        <Link to="/category/anime">Аниме</Link>
                    </div>
                    <div className="navigation__item hasHoverBottomAnimate hasMenuTypeAnimation">
                        <Link to="/category/drama">Дорамы</Link>
                    </div>
                    <div className="navigation__item hasHoverBottomAnimate hasMenuTypeAnimation">
                        <Link to="/category/new">Новинки</Link>
                    </div>
                    <div className="navigation__item hasHoverBottomAnimate hasMenuTypeAnimation">
                        <Link to="/articles">Новости</Link>
                    </div>
                    <div className="navigation__item hasHoverBottomAnimate hasMenuTypeAnimation">
                        <Link to="/category/announcement">Анонсы</Link>
                    </div>
                    {/* <div className="navigation__item hasHoverBottomAnimate hasMenuTypeAnimation">
                        <Link to="orders-table.html">Стол заказов</Link>
                    </div> */}
                    <div className="navigation__item hasHoverBottomAnimate hasMenuTypeAnimation">
                        <Link to="/about">О нас</Link>
                    </div>

                </div>
            </div>
        );
    }
}
