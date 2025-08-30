const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const Interpreter = require('./interpreter')

const code = `
var heyvar = 554

fn verify(id){
  var vv = 12
  return vv
}

fn getLocation(){
  var myLocation = 'Davao City'
  return myLocation
}

fn calculate(a, b){
  var num = 77

  fn calc2(){
    var price = 100
    return price + num
  }
  calc2()

  return num + a + b + heyvar
}

calculate(5, 2)
`

const tokens = new Tokenizer(code).tokenize();
const ast = new Parser(tokens).parse();
// console.log('ast yhnn', JSON.stringify(ast, null, 2));

const output = new Interpreter().run(ast);


/*

heyvar = heyvar + a

fn payment(currency, quantity){
  var cu = 15
  return cu
}

fn calc2(){
    var price = 100
    return price + num
  }
  calc2()

*/


