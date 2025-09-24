let t1 = `
var a = 5
`

let t2 = `
var a = "hey"
`

let t3 = `
var a = true
`

let t4 = `
var a = false
`

let t5 = `
var a = 5 + 3 + 2 - 4 + 4
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
