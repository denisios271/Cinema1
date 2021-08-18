import * as React from 'react';
import Friends from '../Friends';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                {/* <Friends /> */}
                <div className = "row">
                    <div className = "col text-center">
                        <p className = "copyright footer__header1">© <a href = "/">FireDub</a> 2016 - 2018</p>
                        <p className = "copyright-info footer__header1">Все материалы на этом сайте продублированы из источников свободного распространения и предназначены только для домашнего ознакомления. Все права на представленные материалы принадлежат их авторам. Администрация сайта не несёт ответственности за представленный материал и его любое использование.</p>
                    </div>
                </div>
            </footer>
        );
    }
}