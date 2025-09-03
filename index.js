const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const Interpreter = require('./interpreter')

const code = `
var numnum = 30

fn calculate(){
  var num = 5

  fn calc1(){
    log("num is 5", num)

    num = 100
    log("num is 100", num)

    fn calc11(){
      num = 155555
      log("num is 155555", num)

      if (1 < 2){
        var digit = 5
        log("digit is 5", digit)
      }

      if (1 < 2){
        var digit = 50
        log("digit is 50", digit)
      }
    }
    calc11()
  }
  calc1()

  log("num is 155555", num)

  return 5
}
calculate()

fn verify(){
  var num = 8080
  log("num is 8080", num)
  return 5 + num
}
verify()
`

const tokens = new Tokenizer(code).tokenize();
const tree = new Parser(tokens).parse();

// console.log("tree ikmn", JSON.stringify(tree, null, 2));

const output = new Interpreter(tree).run();

/*
var numnum = 30

fn calculate(){
  var num = 5

  fn calc1(){
    num = 100
    log("num is 100", num)

    fn calc11(){
      num = 105
      log("num is 105", num)

      if (1 < 2){
        var digit = 5
        log(digit)
      }

      if (1 < 2){
        var digit = 50
        log(digit)
      }
    }
    calc11()
  }
  calc1()

  log("num is 105", num)

  return 5
}
calculate()

fn verify(){
  var num = 8080
  log("num is 8080", num)
  return 5 + num
}
verify()
*/


