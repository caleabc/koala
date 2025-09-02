const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const Interpreter = require('./interpreter')

const code = `
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
    log(num)

    fn calc11(){
      num = 105
      log(num)

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

  log(num)

  return 5
}
calculate()

fn verify(){
  var num = 8080
  log(num)
  return 5 + num
}
verify()








fn verify(){
  var num = 8080
  log(num)
  return 5 + num
}
verify()

var id = "hnbvfdcv"

var heyvar = 5001

fn verify(id){
  var vv = 12
  return vv
}

var aa = 5
var ab = "hey Ben you are cool btw."
var ac = aa
var ad = verify()

fn getLocation(){
  var myLocation = 'Davao City'
  return myLocation
}

fn calculate(a, b){
  var num = 77

  heyvar = 1000000
  log(5000000)
  log(heyvar)

  fn calc2(){
    var price = 100
    var num = 1
    return price + num
  }
  calc2()

  return num + a + b + 5 + calc2()
}
log(calculate(5, 2))

fn getTotal(){
  if (10 > 2){
    log('Yes 10 is greater')
  }

  if (heyvar > aa){
    log('Yes heyvar is greater. I will be looged')

    if (heyvar > aa){
      log('I am a nested if statement')
    }
  }
  
  return heyvar + heyvar
}
var r = getTotal()
log(r)

log(ab)

log(heyvar)



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


