import * as React from 'react';

interface iProps {
    done(): void,
}

export default class Video extends React.Component<iProps> {
    render() {
        return (
            <div className='text-center d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100'>
                {this.props.children}
                <div style={{
                    fontSize: '0.8rem',
                    position: 'absolute',
                    bottom: 40,
                    cursor: 'pointer',
                    opacity: 0.4,
                }} onClick={this.props.done}>
                    Пропустить...
                </div>
            </div>
        );
    }
}
