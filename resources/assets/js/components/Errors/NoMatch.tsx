import * as React from 'react';

export default class NoMatch extends React.Component {
    render() {
        document.title = 'Страница не найдена - FireDub.Net';
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 text-center">
                    <h1>Страница не найдена</h1>
                </div>
                <div className="col-xs-12 col-sm-12 text-center">
                    <img src="/images/404_Ryuk.gif" className="img-thumbnail" />
                </div>
                <div className="col-xs-12 col-sm-12 text-center mt-3">
                    Привет! Тут у нас произошла какая - то ошибочка...
                    <br />Скорее всего страничка данная не найдена, однако ты не переживай!
                    <br />Скорее всего это просто ошибочка в адресе странцы!
                    <br />Но если эта ошибка произошла по нашей ошибочке, например, неправильная ссылочка.
                    <br />Напиши админу <a href="mailto:tokiseven3@gmail.com">на почту</a> или через <a href="//vk.com/tokiseven" target="_blank">vk.com</a>
                </div>
            </div>
        );
    }
}