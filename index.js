const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const Interpreter = require('./interpreter')

const code = `
var heyvar = 5001

fn verify(id){
  var vv = 12
  return vv
}

var aa = 5
var ab = "hey"
var ac = aa
var ad = verify()

fn getLocation(){
  var myLocation = 'Davao City'
  return myLocation
}

fn calculate(a, b){
  var num = 77

  fn calc2(){
    var price = 100
    var num = 1
    return price + num
  }
  calc2()

  return num + a + b + heyvar + calc2()
}
log(calculate(5, 2))

fn getTotal(){
  return heyvar + heyvar
}
var r = getTotal()
log(r)
`

const tokens = new Tokenizer(code).tokenize();
const ast = new Parser(tokens).parse();
const output = new Interpreter().run(ast);

/*
var heyvar = 554

fn verify(id){
  var vv = 12
  return vv
}

var aa = 5
var ab = "hey"
var ac = aa
var ad = verify()

fn getLocation(){
  var myLocation = 'Davao City'
  return myLocation
}

fn calculate(a, b){
  var num = 77

  fn calc2(){
    var price = 100
    var num = 1
    return price + num
  }
  calc2()

  return num + a + b + heyvar
}
calculate(5, 2)

fn getTotal(){
  return heyvar + num
}
var r = getTotal()







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


