const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
// const Interpreter = requie('./interpreter')

const code = `
fn calculate(a, b, c){

  var output = 0

  for (var i = 0; i < 30; i=i+1){
    output = output + i
  }


}
calculate(5, 2, 7)
`

const tokens = new Tokenizer(code).tokenize();
console.log('tokensss', tokens)

const ast = new Parser(tokens).parse();

console.log('ast yhnn', JSON.stringify(ast, null, 2));

// const output = new Interpreter(ast).run();

// console.log(output)


/*

const code = `
fn calculate(a, b, c){
  var transferFee = 10

  var a = 4 + 5

  if (a + b + c + a == 20){
    var e = 22
  }

  var output = 0

  for (var i = 0; i < 30; i=i+1){
    output = output + i
  }

}
calculate(5, 2, 7);
`

*/