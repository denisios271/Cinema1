import * as React from 'react';
import Api from '../../../lib/Api';

export interface iEvents {
    acceptAdding: (id: number) => void,
    declineAdding: (id: number) => void,
    acceptRemoving: (id: number) => void,
    declineRemoving: (id: number) => void,
}

interface iProps {
    send: () => Promise<any>,
    prefix: string,
    createElement: (item: any, events: iEvents) => JSX.Element,
}

interface iState {
    isFetching: boolean,
    items: any[],
}

export default class RequestedLayer extends React.Component<iProps, iState> {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            items: [],
        };
        this.acceptAdding = this.acceptAdding.bind(this);
        this.declineAdding = this.declineAdding.bind(this);
        this.acceptRemoving = this.acceptRemoving.bind(this);
        this.declineRemoving = this.declineRemoving.bind(this);
    }

    componentDidMount() {
        this.send();
    }

    acceptAdding(id: number) {
        Api.post(`${this.props.prefix}/id/${id}/accept/adding`).then(r => {
            this.send();
            alert(`Ресурс (${id}) успешно добавлен на сайт.`);
        }).catch((err: any) => {
            this.send();
            alert(`Произошла ошибка: ${err.status}. ${err.error}`);
        });
    }

    declineAdding(id: number) {
        Api.delete(`${this.props.prefix}/id/${id}/accept`).then(r => {
            this.send();
            alert(`Ресурс (${id}) удален (добавление не подтверждено).`);
        }).catch((err: any) => {
            this.send();
            alert(`Произошла ошибка: ${err.status}. ${err.error}`);
        });
    }

    acceptRemoving(id: number) {
        Api.delete(`${this.props.prefix}/id/${id}/accept`).then(r => {
            this.send();
            alert(`Ресурс (${id}) успешно удален.`);
        }).catch((err: any) => {
            this.send();
            alert(`Произошла ошибка: ${err.status}. ${err.error}`);
        });
    }

    declineRemoving(id: number) {
        Api.post(`${this.props.prefix}/id/${id}/decline/removing`).then(r => {
            this.send();
            alert(`Ресурс (${id}) не был удален (удаление отклонено).`);
        }).catch((err: any) => {
            this.send();
            alert(`Произошла ошибка: ${err.status}. ${err.error}`);
        });
    }

    send() {
        this.setState({
            isFetching: true,
            items: [],
        });

        this.props.send().then((response: any[]) => {
            this.setState({
                isFetching: false,
                items: response,
            });
        }).catch((error) => {
            alert(`Произошла неизвестная ошибка. Код ошибки - ${error.status}. Сообщение ошибки отправлено в консоль. ${error.error}`);
            this.setState({
                isFetching: false,
                items: [],
            });
        });
    }

    render() {
        if (this.state.isFetching) {
            return <div className="text-center">Loading...</div>;
        }
        if (!this.state.items.length) {
            return <div className="alert alert-warning">Нет ресурсов</div>
        }

        let createElement = this.props.createElement;

        return (
            <div className="row">
                <div className="col">
                    {this.state.items.map(v => createElement(v, {
                        acceptAdding: this.acceptAdding,
                        acceptRemoving: this.acceptRemoving,
                        declineAdding: this.declineAdding,
                        declineRemoving: this.declineRemoving,
                    }))}
                </div>
            </div>
        );
    }
}
