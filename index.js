const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
// const Interpreter = requie('./interpreter')

const code = `
fn calculate(a, b, c){
  var transferFee = 10
  
}
calculate(5, 2, 7);
`

const tokens = new Tokenizer(code).tokenize();
console.log('tokensss', tokens)

const ast = new Parser(tokens).parse();
console.log('ast ghjk', ast)

// const output = new Interpreter(ast).run();

// console.log(output)


