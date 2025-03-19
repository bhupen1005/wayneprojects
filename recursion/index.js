console.log("Hello, world!");

//  when a function calls itself, it is called a recursive function.
// it creates a call stack or recursive stack

// function a(n) {
//   console.log(n);
//   a(n - 1);
// }

// a(10);

// we need to add a base case to stop the recursive function
function a(n) {
  if (n === 0) {
    return;
  }
  console.log(n);
  a(n - 1);
  console.log(n);
}

a(3);
a(10);


// How to identify when to use recursion

//Step 1: Identify the subproblem, Smaller version of the problem
//Step 2: Trust that the recursive call will solve the subproblem
//Step 3: Link the subproblem solution to the original problem
//Step 4: Identify the base case


// Call Stack looks like this
// a(10) // go first in the stack
// a(9) // go second in the stack
// a(8) // go third in the stack
// a(7) // go fourth in the stack
// a(6) // go fifth in the stack
// a(5) // go sixth in the stack
// a(4) // go seventh in the stack
// a(3) // go eighth in the stack
// a(2) // go nineth in the stack
// a(1) // go tenth in the stack
// a(0) // base case

321123
5432112345

