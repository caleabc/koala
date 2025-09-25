let t1 = `
var num = 5
var name = "ben"
var total = 22 + 3 - 2 + 6 - 4
`

let t2 = `
if (2 < 5){
  log("2 is less than 5")

  var num = 5
  log("num is 5", num)
}
`

let t3 = `
fn calc(){
  return 400
}

var total = 5 + calc()
log("total is 405", total)
`

let t4 = `
fn calc(){
  for (var i = 0; i < 10; i = i + 1){
    if (1 < 2){
      var digit = 12345
      log("digit is 12345", digit)
    }
  }

  for (var i = 0; i < 10; i = i + 1){
    var digit = 12345
    log("digit is 12345", digit)
  }
}
calc()
`

let t5 = `
var num = 5

fn calc(){
    log("num is 5", num)

    var num = 8
    log("num is 8", num)

    if (1 < 2){
        var num = 10
        log("num is 10", num)
    }

    num = 20
    log("num is 20", num)
}
calc()

log("num is 5", num)
`

let t6 = `
var num = 5
log("num is 5", num)

fn calc(){
    var num = 8
    log("num is 8", num)
}
calc()
`

let t7 = `
var num = 5
log("num is 5", num)

fn calc(){
    var num = 8
    log("num is 8", num)

    for (var i = 0; i < 5; i = i + 1){
        var digit = 50
        log("digit is 50", digit)
    }
}
calc()
`

let t8 = `
var num = 5
log("num is 5", num)

fn calc(){
    var num = 8
    log("num is 8", num)

    for (var i = 0; i < 5; i = i + 1){
        if (1 < 2){
            var digit = 10
            log("digit is 10", digit)

            if (5 < 9){
                var digit = 20
                log("digit is 20", digit)
            }
        }

        for (var j = 0; j < 3; j = j + 1){
            var digit = 100
            log("digit is 100", digit)
        }
    }

    log("----------------------------------------")

    for (var i = 0; i < 5; i = i + 1){
        if (1 < 2){
            var digit = 10
            log("digit is 10", digit)

            if (5 < 9){
                var digit = 20
                log("digit is 20", digit)
            }
        }

        for (var j = 0; j < 3; j = j + 1){
            var digit = 100
            log("digit is 100", digit)
        }
    }
}
calc()
`

let t9 = `
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

      for (var i = 0; i < 10; i = i + 1){
        if (1 < 2){
          var digit = 12345
          log("digit is 12345", digit)

          var num = 88
          log("num is 88", num)
        }
      }

      log("num is 155555", num)

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
`

let t10 = `
fn calc(){
  for (var i = 0; i < 3; i = i + 1){
    var digit = 12345
  }
}
calc()
`

// This must throw error because i is already declared in for loop or i is already declared in the same scope
let t11 = `
fn calc(){
  for (var i = 0; i < 3; i = i + 1){
    var i = 55

    var digit = 12345
  }
}
calc()
`

let t12 = `
fn calc(){
  for (var i = 0; i < 3; i = i + 1){

    var digit = 12
    log("digit is 12", digit)

    for (var j = 0; j < 3; j = j + 1){
      var digit = 13
      log("digit is 13", digit)

      if (1 < 2){
        var digit = 14
        log("digit is 14", digit)
      }

      for (var k = 0; k < 3; k = k + 1){        
        var digit = 15
        log("digit is 15", digit)
      }
    }
  }
}
calc()
`

// This must throw error because k is already declared in for loop or k is already declared in the same scope
let t13 = `
fn calc(){
  for (var i = 0; i < 3; i = i + 1){

    var digit = 12
    log("digit is 12", digit)

    for (var j = 0; j < 3; j = j + 1){
      var digit = 13
      log("digit is 13", digit)

      if (1 < 2){
        var digit = 14
        log("digit is 14", digit)
      }

      for (var k = 0; k < 3; k = k + 1){
        var k = 5

        var digit = 15
        log("digit is 15", digit)
      }
    }
  }
}
calc()
`

let t14 = `
fn calc(num1, num2){
  for (var i = 0; i < 3; i = i + 1){
    if (1 < 2){
      var digit = 5 + num1 + num2
      log("digit is 8", digit)
    }
  }
}
calc(1, 2)
`
// This must throw error because num1 is already declared in the same scope
let t15 = `
fn calc(num1, num2){
  var num1 = 500

  for (var i = 0; i < 3; i = i + 1){
    if (1 < 2){
      var digit = 5 + num1 + num2
      log("digit is 8", digit)
    }
  }
}
calc(10, 10)
`

let testCases = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15]

const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const Interpreter = require('./interpreter')

for (let i=0; i<testCases.length; i++){

  console.log(`==================== Test Case ${i + 1} ====================`)

  try {
    const tokens = new Tokenizer(testCases[i]).tokenize();
    const tree = new Parser(tokens).parse();
    const output = new Interpreter(tree).run();
  } catch (error) {
    console.error("error", error.message);
  }

  console.log(`==================== Test Case ${i + 1} ====================`)
  console.log("")
  console.log("")
  console.log("")
}

