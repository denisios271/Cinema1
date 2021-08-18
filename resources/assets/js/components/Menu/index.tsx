import * as React from 'react';
import { Link, } from 'react-router-dom';

export default class Menu extends React.Component {
    render() {
        return (
            <ul id="menu" className="nav nav-fill">
                <li className="nav-item"><Link className="nav-link" to = "/">Главная</Link></li>
                <li className="nav-item"><Link className="nav-link" to = "/articles">Новости</Link></li>
                <li className="nav-item"><Link className="nav-link" to = "/category/anime">Аниме</Link></li>
                <li className="nav-item"><Link className="nav-link" to = "/category/drama">Дорамы</Link></li>
                <li className="nav-item"><Link className="nav-link" to = "/catalog">Каталог</Link></li>
                <li className="nav-item"><Link className="nav-link" to = "/about">О нас</Link></li>
                <li className="nav-item">
                    <a className="nav-link" target="_blank"
                        href = "//vk.com/firedub_net?w=product-134724965_1032284%2Fquery">
                        Помощь проекту
                    </a>
                </li>
            </ul>
        );
    }
}