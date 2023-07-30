// 1. Call method

let myname = {
  fname: "Subhajit",
  lname: "Karar",
  printName: function () {
    console.log(this.fname + " " + this.lname);
  },
};
//normal function calling
myname.printName();

let cricName = {
  fname: "Sachin",
  lname: "Tendulkar",
};

// function borrowing
myname.printName.call(cricName);

//Or if we keep the same function outside
let printMyFulllname = function (homeTown, state) {
  let result = this.fname + " " + this.lname;
  if (homeTown) result += " from " + homeTown;
  if (state) result += " , " + state;
  return result;
};
// pass the object as 1st param in call function,
// 2nd param can be your choice
console.log(
  "Call method => ",
  printMyFulllname.call(cricName, "Mumbai", "Maharashtra")
);
console.log("Call method => ", printMyFulllname.call(myname, "WB"));

// 2. Apply Method
// only diffrenence from call method is passing the arguments in differnt way or in array format:

console.log(
  "Apply method => ",
  printMyFulllname.apply(cricName, ["Mumbai", "Maharashtra"])
);
console.log("Apply method => ", printMyFulllname.apply(myname, ["WB"]));

//3. bind method (keep a copy of function and invoke it later)
// Similar way like call only difference is store as function and invoke later when needed.
console.log(
  "bind method(function) => ",
  printMyFulllname.bind(cricName, "Mumbai", "Maharashtra")
);

let printMyFunction = printMyFulllname.bind(cricName, "Mumbai", "Maharashtra");
console.log("bind method(invoke) => ", printMyFunction());

//4. polyfill of bind

Function.prototype.myBind = function (...args) {
  let obj = this;
  let params = args.slice(1);
  return function (...arg2) {
    return obj.apply(args[0], [...params, ...arg2]);
  };
};

let printMyFunction2 = printMyFulllname.myBind(cricName, "Mumbai");
console.log("My Bind - polyfill => ", printMyFunction2("Maharashtra"));
