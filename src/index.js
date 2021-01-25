import parse from './parse'
let templateString = `<div>
                        <h3 class="dai" id="end">daiend</h3>
                        <ul>
                            <li>A</li>
                            <li>B</li>
                            <li>C</li>
                        </ul>
                    </div>`
let ast =  parse(templateString)
console.log(ast)