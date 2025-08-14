const Tokenizer = require('./tokenizer')
// const Parser = require('./parser')
// const Interpreter = requie('./interpreter')

const code = `
fn calculate(a, b){
  var transferFee = 10

  return a + b + transferFee
}
calculate(5, 2);
`

const tokens = new Tokenizer(code).tokenize();

console.log('tokensss', tokens)
// const ast = new Parser(tokens).parse();
// const output = new Interpreter(ast).run();

console.log(output)


