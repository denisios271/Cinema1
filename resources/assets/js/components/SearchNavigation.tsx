import * as React from 'react';
import { Link, } from 'react-router-dom';

interface iNavigationItemProps {
    active: boolean,
    link: string,
    number: number,
}

class NavigationItem extends React.Component<iNavigationItemProps> {
    render() {
        let additionalClass = this.props.active === true ? "active" : "";
        return (
            <li className = {`page-item ${additionalClass}`}>
                <Link to = {`${this.props.link}${this.props.number}`} className = "page-link">
                    {this.props.number}
                </Link>
            </li>
        );
    }
}

interface iNavigationProps {
    currentPage: number,
    maxPage: number,
    link: string,
}

interface iNavigationState {
    currentPage: number,
    maxPage: number,
}

export default class Navigation extends React.Component<iNavigationProps, iNavigationState> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            maxPage: 0
        }
    }

    render() {
        let navigation: JSX.Element[] = [];

        if (this.props.maxPage > 1) {
            navigation = [];
            for (let i = 1; i <= this.props.maxPage; i++){
                let active = (this.props.currentPage == i) ? true : false;
                navigation.push(
                    <NavigationItem
                        key = {i}
                        active = {active}
                        number = {i}
                        link = {this.props.link}
                    />
                );
            }
        }

        return(
            <nav aria-label="Навигация по поиску">
                <ul className="pagination">
                    {navigation}
                </ul>
            </nav>
        );
    }
}