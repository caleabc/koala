const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const Interpreter = require('./interpreter')

const code = `
var heyvar = 554

fn calculate(a, b){
  var num = 77
  return num + a + b
}
calculate(5, 2)
`

const tokens = new Tokenizer(code).tokenize();
const ast = new Parser(tokens).parse();

// console.log('ast yhnn', JSON.stringify(ast, null, 2));

const output = new Interpreter(ast).run();

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