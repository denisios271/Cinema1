import * as React from 'react';
import iPost from '../../../interfaces/iPost';

export interface KeywordsProps {
    item: iPost,
}

export default class Keywords extends React.Component<KeywordsProps> {
    render() {
        let item = this.props.item;
        let tags: string[] = [];

        if (item.keywords) {
            tags.push(...item.keywords.split(','));
        }
        if (item.voicers) {
            tags.push(...item.voicers.split(', '));
        }
        if (item.translaters) {
            tags.push(...item.translaters.split(', '));
        }

        return(
            <div>
                {tags.map((v: string, i: number) => (
                    <span key={i} className="badge badge-info m-1 p-2">
                        #{v}
                    </span>
                ))}
            </div>
        );
    }
}