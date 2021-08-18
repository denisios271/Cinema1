import * as React from 'react';
import { connect } from 'react-redux';
import Block from '../Footer/Block';
import Friend from './Friend';
import iGlobalState from '../../interfaces/iGlobalState';
import { iState, key } from './reducers';

interface iProps {
    friends: iState,
}

class Friends extends React.Component<iProps> {
    render() {
        return (
            <div className="row">
                {this.props.friends.data.map((v, i) => (
                    <Block key={i} title={v.title}>
                        {v.data.map((v2, i2) => (
                            <Friend key={i2} href={v2.uri} name={v2.title} />
                        ))}
                    </Block>
                ))}
            </div>
        );
    }
}

export default connect(
    (state: iGlobalState) => ({
        friends: state[key],
    })
)(Friends);