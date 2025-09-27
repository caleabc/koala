/*

The below testcases will not throw any error

*/

let t1 = `
var num = 5
var name = "ben"
var total = 22 + 3 - 2 + 6 - 4
`

let t2 = `
if (2 < 5){
  var num = 5
  log(5 == num)
}
`

let t3 = `
fn calc(){
  return 400
}

var currentTotal = 5 + calc()
log(405 == currentTotal)

fn calc(num1, num2){
  var fee = num1 + num2
  return 400 + fee
}

var total = 5 + calc(10, 1)
log(416 == total)
`

// Adding two for loop in the same function that both uses "i" as init
let t4 = `
fn calc(){
  for (var i = 0; i < 10; i = i + 1){
    if (1 < 2){
      var digit = 12345
      log(12345 == digit)
    }
  }

  for (var i = 0; i < 10; i = i + 1){
    var digit = 12345
    log(12345 == digit)
  }
}
calc()
`

let t5 = `
var num = 5

fn calc(){
  log(5 == num)

  var num = 8
  log(8 == num)

  if (1 < 2){
    var num = 10
    log(10 == num)
  }

  log(8 == num)

  num = 20
  log(20 == num)
}
calc()

log(5 == num)
`

let t6 = `
var num = 5
log(5 == num)

fn calc(){
  var num = 8
  log(8 == num)
}
calc()
`

let t7 = `
var num = 5
log(5 == num)

fn calc(){
    var num = 8
    log(8 == num)

    for (var i = 0; i < 5; i = i + 1){
        var digit = 50
        log(50 == digit)
    }
}
calc()
`

let t8 = `
var num = 5
log(5 == num)

fn calc(){
    var num = 8
    log(8 == num)

    for (var i = 0; i < 5; i = i + 1){
        if (1 < 2){
            var digit = 10
            log(10 == digit)

            if (5 < 9){
                var digit = 20
                log(20 == digit)
            }
        }

        for (var j = 0; j < 3; j = j + 1){
            var digit = 100
            log(100 == digit)
        }
    }

    log("----------------------------------------")

    for (var i = 0; i < 5; i = i + 1){
        if (1 < 2){
            var digit = 10
            log(10 == digit)

            if (5 < 9){
                var digit = 20
                log(20 == digit)
            }
        }

        for (var j = 0; j < 3; j = j + 1){
            var digit = 100
            log(100 == digit)
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
    log(5 == num)

    num = 100
    log(100 == num)

    fn calc11(){
      num = 155555
      log(155555 == num)

      for (var i = 0; i < 10; i = i + 1){
        if (1 < 2){
          var digit = 12345
          log(12345 == digit)

          var num = 88
          log(88 == num)
        }
      }

      log(155555 == num)

      if (1 < 2){
        if (5 < 9){
          var digit = 5 + calc5()
          log(405 == digit)
        }
      }

      if (1 < 2){
        var digit = 50
        log(50 == digit)
      }
    }
    calc11()
  }
  calc1()

  log(155555 == num)

  return 5
}
calculate()

fn verify(){
  var num = 8080
  log(8080 == num)
  return 5 + num
}
verify()
`

let t10 = `
fn calc(){
  for (var i = 0; i < 3; i = i + 1){
    var digit = 12345
    log(12345 == digit)
  }
}
calc()
`

let t11 = `
fn calc(){
  for (var i = 0; i < 3; i = i + 1){

    var digit = 12
    log(12 == digit)

    for (var j = 0; j < 3; j = j + 1){
      var digit = 13
      log(13 == digit)

      if (1 < 2){
        var digit = 14
        log(14 == digit)
      }

      for (var k = 0; k < 3; k = k + 1){        
        var digit = 15
        log(15 == digit)
      }
    }
  }
}
calc()
`

let t12 = `
fn calc(num1, num2){
  for (var i = 0; i < 3; i = i + 1){
    if (1 < 2){
      var digit = 5 + num1 + num2
      log(8 == digit)
    }
  }
}
calc(1, 2)
`

let t13 = `
var num = 5

fn calc(){

  var num = 8
  log(8 == num)

  if (1 < 2){
    var num = 10
    log(10 == num)

    if (1 < 5){
      var num = 32
      log(32 == num)

      if (1 < 7){
        var num = 44
        log(44 == num)

        return 9090
      }
    }
  }
}

var r = calc()

log(9090 == r)

fn calc1(){

  var num = 8
  log(8 == num)

  if (1 < 2){
    var num = 10
    log(10 == num)

    if (1 < 5){
      var num = 32
      log(32 == num)

      if (1 < 7){
        var num = 44
        log(44 == num)

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

log(34 == aa)
`

const Tokenizer = require('./tokenizer')
const Parser = require('./parser')
const Interpreter = require('./interpreter')

let testCases = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13]

for (let i=0; i<testCases.length; i++){

  console.log(`==================== Test Case ${i + 1} ====================`)

  const tokens = new Tokenizer(testCases[i]).tokenize();
  const tree = new Parser(tokens).parse();
  const output = new Interpreter(tree).run();

  console.log(`==================== Test Case ${i + 1} ====================`)
  console.log("")
  console.log("")
  console.log("")
  console.log("")
}

/*

Below testcases will throw error

*/

// This must throw error because num1 is already declared in the same scope
let t100 = `
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

// This must throw error because k is already declared in for loop or k is already declared in the same scope
let t101 = `
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

// This must throw error because i is already declared in for loop or i is already declared in the same scope
let t102 = `
fn calc(){
  for (var i = 0; i < 3; i = i + 1){
    var i = 55

    var digit = 12345
  }
}
calc()
`

console.log("----------------------------------------------------")
console.log("This section of testing is for code that throw error")
console.log("----------------------------------------------------")

testCases = [t100, t101, t102]

for (let i=0; i<testCases.length; i++){

  console.log(`==================== Test Case ${i + 1} ====================`)

  try {
    const tokens = new Tokenizer(testCases[i]).tokenize();
    const tree = new Parser(tokens).parse();
    const output = new Interpreter(tree).run();
  } catch (error) {
    console.log("--- PASSED ---")
  }

  console.log(`==================== Test Case ${i + 1} ====================`)
  console.log("")
  console.log("")
  console.log("")
  console.log("")
}


