/*

koala - A programming language engine

.
.
.

How to create a variable
------------------------
var age = 5
var name = 'Ben'

How to create an array
----------------------
var nums = [2,5,1,1,9]
var cities = ['Cebu', 'Davao', 'Batangas']

How to create an object or dictionary
-------------------------------------
var price = {milk:10, bread:20, cookies:8, coffee:7, pancake: 14}
var capitalCity = {philippines:'Manila', amerika:'Washington DC', japan:'Tokyo'}

How to create a function
------------------------
fn calculate(a, b){
  var serviceFee = 53

  return a + b + serviceFee
}

fn greet(name){
  return 'Hello ' + name + '!'
}

fn verify(id){
  var record = {azxc:true, hgbn:true, mntt:true}

  if (record.isFound(id) == true){
    print('ID is valid')

    
  }
}

Conditional
-----------
var num1 = 4
var num2 = 20
var target = 40

if (num1 < num2){
  print('num1 has a smaller value')
} else {
  print('num1 has a larger value')
}

if (num1 < num2){
  print('num1 has a smaller value')
}

if (num1 + num2 == target){
  print('Yayyy, you guess the target number')
}

if (num1 + num2 == target && target / 2 == num1 + num1){
  print('Yayyy, you guess the target number')
}

Loop
----
var nums = [2,1,55,4,9]
for (var i = 0; i < nums.length(); i++){
  print(nums[i])

  var num1 = 100
  var num2 = 200

  print(nums[i] + num1 + num2)
}


*/