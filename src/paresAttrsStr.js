export default function parseAttrsStr(attrsStr) {
    if (attrsStr == undefined) {
        return [];
    }
    let isInQuote = false;
    let point = 0;
    let result = [];
    for (let i = 0; i < attrsStr.length; i++) {
        let char = attrsStr[i];
        if (char == '"') {
            isInQuote = !isInQuote;
        } else if (char == ' ' && !isInQuote) {
            console.log(1)
            if (!/^\s*$/.test(attrsStr.substring(point, i))) {
                result.push(attrsStr.substring(point, i).trim());
            }
            point = i;
        }
    }
    result.push(attrsStr.substring(point).trim());
    result = result.map(item => {
        const matchArr = item.match(/^(.+)="(.+)"$/);
        return {
            name: matchArr[1],
            value: matchArr[2]
        }
    })
    return result;
}