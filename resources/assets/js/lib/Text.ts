export default class Text {
    static removeHtml(html: string): string {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    static cutForDescription(text: string): string {
        const nextLineSymbols = /\r?\n|\r/g;
        const manySpaces = / {2,}/g;
        const spacesAtTheEnd = /( +)$/g;
        const maxLength = 322;
        text = text.split(nextLineSymbols)[0].replace(nextLineSymbols, '').replace(manySpaces, ' ');
        if (text.substr(0, maxLength) != text) {
            text = `${text.substr(0, maxLength).replace(spacesAtTheEnd, '')}...`;
        } else {
            text = text.substr(0, maxLength);
        }
        return text;
    }
}