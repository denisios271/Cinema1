import * as React from 'react';
import iCard from '../../../interfaces/BlackJack/iCard';
import { playCardClick } from './actions';
import CardHelper from './CardHelper';

interface iProps {
    card: iCard,
    isGivenForUser?: boolean,
    isGivenForOpponent?: boolean,

    onClick(): void,
}

export default class Card extends React.Component<iProps> {
    state = {
        isHidden: true,
        angle: 0,
    };

    showFront = () => this.setState({ isHidden: false });
    showBack = () => this.setState({ isHidden: true });

    updateWidth = () => {
        this.forceUpdate();
    }

    componentDidMount() {
        this.setState({
            angle: Math.random() * 360,
        });
        $(window).on('resize', this.updateWidth);
    }

    componentWillUnmount() {
        $(window).off('resize', this.updateWidth);
    }

    render() {
        const { card } = this.props;
        const { width, margin } = CardHelper.calculateMarginAndWidth(CardHelper.calculateWidth());
        let cardStyles: string[] = [];

        const isGiven = this.props.isGivenForUser || this.props.isGivenForOpponent;

        cardStyles = cardStyles.map(v => `bj__card_type-${v}`);

        return (
            <div className={`bj__card ${cardStyles.join(' ')}`} style={{
                transform: `rotateZ(${this.state.angle}deg)`,
                width,
                margin: margin / 2,
            }}>
                {isGiven ? null : (
                    <a onClick={() => {
                        playCardClick(); this.props.onClick();
                    }}>
                        <img src="/images/game/bj/card-back.png"
                            alt="Рубашка"
                            className="img-fluid"
                            onMouseEnter={this.showFront}
                        />
                    </a>
                )}
            </div>
        );
    }
}