// function Student() {
//     this.id = 30;
//     this.getId = function () { return this.id; };
// }
// function createstudent() {
//     if (new.target !== undefined) {
//         if (typeof Student != "undefined")
//             createStudent = function () { return new Student(); };
//         else
//             createstudent = () => { return { id: 35, getId: function () { return this.id; } } };
//     }
//     else
//         createStudent = function () {
//             return {
//                 id: 40, getId: function () { return this.id; }
//             };
//         };
//     return createstudent();
// }
// var student1 = new createStudent();
// document.write(student1.id + "<br>");

var fun1 = (new Function("x", "y=2", "return x*y;"))(4);
var fun2 = (function (x) {
    if (typeof x != "function") return function () { return x + 1; };
    else
        return x;
})(fun1);
function fun3(x) { return x + 99; }
var x = fun1;
var y = fun2(fun3(3));
document.write(x + "<br>");
document.write(y + "<br>");

var addrs = { addr1: "handan", addr2: "fenglin", addr3: "jiangwan", addr4: "zhangjiang" };
addrs.addr1 = "addr4";
addrs[addrs.addr1] = 2;
document.write(addrs["addr" + addrs.addr4] + "<br>");

class Student {
    constructor(id) { this.id = id; }
    getId() { return this.id; }
}
Student.prototype.name = "zdl";
class UStudent extends Student {
    constructor(id, name) {
        super(id);
        this.name = name;

    }
    getId() { return super.getId(); }
    getName() { return this.name; }
}
var s1 = new UStudent("992407", "zd11");
var s2 = new UStudent("992408", "zd12");
s1.name = null;
delete s1.name;
delete s2.name;
s1.name = "zd13";
document.write(s2.name + "<br>");

// let attr1 = Symbol("attr");
// let attr2 = Symbol("attr");
// let attr3 = Symbol.for("attr");
// let attr4 = Symbol.for("attr");
// document.write((attr1 === attr2) + "<br>");
// document.write((attr3 === attr4) + "<br>");

var i = 1;
let j = 2;
k = 3;
function f1() {
    i = 4;
    j = 5;
    var k = 6;
    { var i = 7; let j = 8; k = 9; }
}
f1();
s = i * j * k;
document.write(i, ' ', j, ' ', k + "<br>");
document.write(s + "<br>");

