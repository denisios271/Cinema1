import * as React from 'react';
import ReactLoading from 'react-loading';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="flex jc-center ai-center my-3">
                <ReactLoading
                    type="spinningBubbles"
                    color="#333"
                    delay={500}
                    width={100}
                    height={100}
                />
            </div>
        );
    }
}
