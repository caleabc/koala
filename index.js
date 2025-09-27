const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const Interpreter = require('./interpreter')

const code = `
var num = 5

fn calc(){

  var num = 8
  log("num is 8", num)

  if (1 < 2){
    var num = 10
    log("num is 10", num)

    if (1 < 5){
      var num = 32
      log("num is 32", num)

      if (1 < 7){
        var num = 44
        log("num is 44", num)

        return 9090
      }
    }
  }
}

var r = calc()

log("r is 9090", r)

fn calc1(){

  var num = 8
  log("num is 8", num)

  if (1 < 2){
    var num = 10
    log("num is 10", num)

    if (1 < 5){
      var num = 32
      log("num is 32", num)

      if (1 < 7){
        var num = 44
        log("num is 44", num)

        if (2 < 5){
          var a = 2

          if (2 < 3){
            return a + 32

            if (1 < 55){
              log("--- end ---")
            }
          }
        }
      }
    }
  }
}

var aa = calc1()

log("aa is 34", aa)
`

const tokens = new Tokenizer(code).tokenize();
const tree = new Parser(tokens).parse();

// console.log("tree ikmn", JSON.stringify(tree, null, 2));

const output = new Interpreter(tree).run();

/*
fn calc(){
  for (var i = 0; i < 3; i = i + 1){
    var i = 55 // This must throw error because i is already declared in for loop or i is already declared in the same scope

    var digit = 12345
  }
}
calc()



var numnum = 30

fn calc5(){
  return 400
}

fn calculate(){
  var num = 5

  fn calc1(){
    log("num is 5", num)

    num = 100
    log("num is 100", num)

    fn calc11(){
      num = 155555
      log("num is 155555", num)

      for (var i = 0; i < 10; i=i+1){
        if (1 < 2){
          var digit = 50123456
          log("digit is 50123456", digit)

          var num = 88
          log("num is 88", num)
        }
      }

      log("num is 100", num)

      if (1 < 2){
        if (5 < 9){
          var digit = 5 + calc5()
          log("digit is 405", digit)
        }
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







var numnum = 30

fn calc5(){
  return 400
}

fn calculate(){
  var num = 5

  fn calc1(){
    log("num is 5", num)

    num = 100
    log("num is 100", num)

    fn calc11(){
      num = 155555
      log("num is 155555", num)

      for (var i = 0; i < 10; i=i+1){
        if (1 < 2){
          var digit = 50123456
          log("digit is 50123456", digit)
        }
      }

      if (1 < 2){
        if (5 < 9){
          var digit = 5 + calc5()
          log("digit is 405", digit)
        }
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
*/


