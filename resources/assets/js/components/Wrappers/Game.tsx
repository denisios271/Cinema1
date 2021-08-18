import { Route, Switch, Redirect } from 'react-router';

import * as React from 'react';
import { ConnectedRouterProps, } from 'react-router-redux';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';

import Menu from "../Menu";
import BlackJackGame from '../Games/BlackJack';

export default class GameWrapper extends React.Component<ConnectedRouterProps<any>> {
    render() {
        return (
            <div id="games">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
                <Switch>
                    <Redirect exact from="/game" to="/game/blackjack" />
                    <Route path = "/game/blackjack" component = {BlackJackGame} />
                </Switch>
                <div className="text-center fixed-bottom bg-dark">
                    <Link to='/'>Главная страница</Link>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}
