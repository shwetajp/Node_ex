// console.log("hello world");
// var a = 10;
// var b = 10;
// var c = a + b;
// console.log(c);

// ..........................creating Http services............

// var http = require("http");
// http
//   .createServer(function (req, res) {
//     res.write("Hello world,testing");
//     res.end();
//   })
//   .listen(8080);

//..........creating modules in node...........

// var calc = require("./calc.js");
// result = calc.add(4, 5);
// result1 = calc.sum([2, 1, 4, 5, 7]);
// console.log(result1);

// ....................File system in node........
//To read: fs(filename,encoding,callback function i.e function(error,data))
// write file fs(filename,data,encoding,calback)
const fs = require("fs");
fs.readFile("calc.js", 'utf8', function (error, data) {
  console.log(data);
});

fs.writeFile("result.txt","welcome to node","utf8",(err)=>{
    if(err){
        console.log("error");
    } else {
        console.log("file created")
    }
})