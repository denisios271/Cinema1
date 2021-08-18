import * as React from 'react';
import Field from './field';
import Description from '../Description';
import iPost from '../../../interfaces/iPost';

interface iProps {
    item: iPost,
}

export default class Fields extends React.Component<iProps> {
    render() {
        let item = this.props.item;
        let N = 0;
        let fields = [];

        // if (item.year) fields.push(["Выпуск", item.year, "year"]);
        if (item.voicers) fields.push(["Русская озвучка", item.voicers, "voicers"]);
        if (item.translaters) fields.push(["Русский перевод", item.translaters, "translaters"]);
        if (item.timers) fields.push(["Таймер", item.timers, "timer"])
        // if (item.type) fields.push(["Тип", item.type, "time"]);
        // if (item.author) fields.push(["Режиссер", item.author, "author"]);
        // if (item.seriesCount) fields.push(["Колличество серий", item.seriesCount, "series_count"]);
        // if (item.manga) fields.push(["Манга", item.manga, "manga"]);
        // if (item.editor) fields.push(["Сценарист", item.editor, "editor"]);
        // if (item.roles) fields.push(["В ролях", item.roles, "in_roles"]);

        let fieldsDom = fields.map((val, i) => {
            N++;
            return <Field
                key = {i}
                name = {val[0]}
                title = {val[1]}
                svg = {val[2]}
                n = {N} />;
        });

        return(
            <div>
                <Description description = {item.full_story} />
                {fieldsDom}
            </div>
        );
    }
}