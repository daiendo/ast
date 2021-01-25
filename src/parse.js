import parseAttrsStr from './paresAttrsStr';
export default function parse(templateString) {
    let index = 0;
    let rest = '';
    let startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
    let endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
    let wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
    let stack1 = [];
    let stack2 = [{ 'children': [] }];
    while (index < templateString.length - 1) {
        rest = templateString.substring(index);
        if (startRegExp.test(rest)) {
            let tag = rest.match(startRegExp)[1];
            let attrsStr = rest.match(startRegExp)[2];
            stack1.push(tag);
            stack2.push({ 'tag': tag, 'children': [] ,attrs:parseAttrsStr(attrsStr)})
            let attrsStrLength = attrsStr ? attrsStr.length : 0;
            index += tag.length + 2 + attrsStrLength;
        } else if (endRegExp.test(rest)) {
            let tag = rest.match(endRegExp)[1];
            let pop_tag = stack1.pop();
            if (tag == pop_tag) {
                let pop_arr = stack2.pop();
                if (stack2.length > 0) {
                    stack2[stack2.length - 1].children.push(pop_arr);
                }
            } else {
                throw new Error('标签未闭合');
            }
            index += tag.length + 3;
        } else if (wordRegExp.test(rest)) {
            let word = rest.match(wordRegExp)[1]
            if (!/^\s+$/.test(word)) {
                stack2[stack2.length - 1].children.push({ 'text': word, 'type': 3 })
            }
            index += word.length;
        }
        else {
            index++;
        }
    }
    return stack2[0].children[0];
}