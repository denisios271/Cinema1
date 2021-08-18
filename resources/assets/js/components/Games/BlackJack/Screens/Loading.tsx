import * as React from 'react';
import ReactLoading from 'react-loading';

export default class LoadingScreen extends React.Component {
    render() {
        return (
            <div className='text-center d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100'>
                <ReactLoading
                    type="spinningBubbles"
                    color="#eee"
                    delay={0}
                    width={100}
                    height={100}
                />
            </div>
        );
    }
}
