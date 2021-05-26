const content = `
你的js也可以是ts

从过去到将来，都有需要不同语法写出的js的编译器。ts和他们不同之处在于，你的js也可以是ts。看下看这个图。
ts 包含 js next； js next 包含 js today

但是，这确实意味着你需要学习js（好消息是，你只需要学会js就行了）。
ts所做的也只是为了使你的js文件变得更标准化。我们可以看看其他语言是怎么做的；
    1. 提供新的语法并不能帮助捕获bug，但是可能可以帮到你写出可读性更好，更少bug；（例如： coffeescript）
    2. 创造一门新的语言让你与运行时和团队（communities）抽离，如果它已经有了让人熟悉的特性，这可能让你更加容易的上手。（例如： Dart 和java / C#devs 更接近）

ts其实是带有文档的js而已；

JSNext is open to interpretation - not everything proposed for the next version of JS actually makes it to browsers. 
TypeScript only adds support for proposals once they reach stage 3.

使js更棒

ts会尽可能让你远离那些你一般不会去使用的js的部分（这部分你不需要记住）：
[] + []; // JavaScript will give you "" (which makes little sense), TypeScript will error

//
// other things that are nonsensical in JavaScript
// - don't give a runtime error (making debugging hard)
// - but TypeScript will give a compile time error (making debugging unnecessary)
//
{} + []; // JS : 0, TS Error
[] + {}; // JS : "[object Object]", TS Error
{} + {}; // JS : NaN or [object Object][object Object] depending upon browser, TS Error
"hello" - 1; // JS : NaN, TS Error

function add(a,b) {
return
    a + b; // JS : undefined, TS Error 'unreachable code detected'
}

总而言之，ts是lint过的js；只是相比起其他的没有类型信息linter，做的更好；

你仍然要学习js

使用ts还是需要写js，因此，关于js你还是需要了解，我们接下来会继续讨论。

备注：ts是js的超集，只是带有可以被编译器或者IDE使用的而已；


相等

在js中，需要特别注意‘==’与‘===’的不同。因为js希望弹性的去应对变成的error，‘==‘会对两个对比的变量做类型转换；例如将字符串转换成数字类型，比如说这样：

console.log(5 == "5"); // true   , TS Error
console.log(5 === "5"); // false , TS Error

但是，js这样的选择，也不是总是合适的（ideal）；例如，在下面这个例子中，第一个语句是false，因为，“”和“0”都是字符串，但是很明显并不相等。但是，在第二个例子中，0 和 “”都是“假”，被认为是相等；
上面的两个例子如果使用“===”，得到的都会是false；

console.log("" == "0"); // false
console.log(0 == ""); // true

console.log("" === "0"); // false
console.log(0 === ""); // false

备注：在ts中，string == number 和 string === number都会导致编译时错误，所以你一般没必要担心；

那么既然== 和 === 是如此，那么 ！= 和 ！==也是一样；
高级技巧：除非在null的情况下，一般使用 === 和！==， 这点我们之后会继续说明；Always use === and !== except for null checks

结构性相等

如果你想对比两个对象的结构性是否相等，使用 == 或者 === 都没效；

console.log({a:123} == {a:123}); // False
console.log({a:123} === {a:123}); // False

做这样的操作，可以使用npm中的deep-equal的包

import * as deepEqual from "deep-equal";
console.log(deepEqual({a:123},{a:123})); // True

但是，通常你不需要深层次对比，只需要对比某个属性值就行了，比如说"id”

type IdDisplay = {
    id: string,
    display: string
}

const list: IdDisplay[] = [
    {
        id: 'foo',
        display: 'Foo Select'
    },
    {
        id: 'bar',
        display: 'Bar Select'
    },
]
const fooIndex = list.map(i => i.id).indexOf('foo');
console.log(fooIndex); // 0

References(引用)

js中的任何对象（包括函数，数组，正则等），都是引用；

var foo = {};
var bar = foo; // bar is a reference to the same object

foo.baz = 123;
console.log(bar.baz); // 123

引用对象的相等问题

var foo = {};
var bar = foo; // bar is a reference
var baz = {}; // baz is a *new object* distinct from "foo"

console.log(foo === bar); // true
console.log(foo === baz); // false

Null 和 undefined

js（引申到ts），null 和 undefined 是bottom types（底部形态）；他们所表示的意义不同；
undefined 表示还没有初始化；
null 表示现在还不能使用；

对这两者的检查

js中你不得不处理这两种情况，有意思的是，在js中，null 和 undefiend 在使用 == 做对比的时候，只有他们都是两两相等的；
// Both null and undefined are only `==` to themselves and each other:
console.log(null == null); // true (of course)
console.log(undefined == undefined); // true (of course)
console.log(null == undefined); // true


// You don't have to worry about falsy values making through this check
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false

如果你不用区分他们两，推荐使用 == null 来判断undefined 或者 null。
function foo(arg: string | null | undefined) {
    if (arg != null) {
        // arg must be a string as `!=` rules out both null and undefined. 
    }
}

你当然可以使用 == undefined，但是 == null 更方便，更简短；
但有一个例外的情况，根级undefined的值我们以后来讨论；

检查根部undefined的值

还记得我说你应该使用==null的那件事儿吧。你肯定记得嘛（我才刚说完嘛）；不要将它用在根级上。在严格模式喜爱，如果你声明了一个变量foo，且foo = undefined，你将会得到ReferenceError并且这个调用栈会被释放；
你应该使用严格模式，实际上当你在使用模块的时候，ts编译器会帮你加上严格模式“use strict”；这些我会在后面的章节提到，你现在不必非常清除；

因此，为了确认这个变量是否被定义来，或者不是在全局环境的情况下，你一般会使用typeof；
if (typeof someglobal !== 'undefined') {
    // someglobal is now safe to use
    console.log(someglobal);
}

谨慎显式的使用undefined

因为ts会让你分离式（与你的值不在同一个位置）的编辑你的结构，就像这样；
function foo(){
    // if Something
    return {a:1,b:2};
    // else
    return {a:1,b:undefined};
}

你应该使用类型说明

function foo():{a:number,b?:number}{
    // if Something
    return {a:1,b:2};
    // else
    return {a:1};
}

Node 中的回调函数

node中的回调函数，例如(err,somethingElse)=>{ /* something */ }，如果没有错误的话，会将err赋值为null。
一般你可以使用truthy 检查；
fs.readFile('someFile', 'utf8', (err,data) => {
    if (err) {
        // do something
    } else {
        // no error
     }
});

当你在设计你自己的API的时候，为了统一性，你也可以使用null；但为了你的API好，你应该像promise看齐，这样你就不需要因为没有error值而烦恼了。（你应该用.then .catch来解决）

不要用undefined来作为有效值；

可以看看这个不好的例子：
function toInt(str: string) {
    return str ? parseInt(str) : undefined;
}

这样写会更好一些：
function toInt(str: string): { valid: boolean, int?: number } {
    const int = parseInt(str);
    if (isNaN(int)) {
        return { valid: false };
    } else {
        return { valid: true, int };
    }
}

JSON和序列化

json标准支持编译null但是不接收undefined；当json编译一个对象，且这个对象的某个属性值为null的时候，这个属性会被涵盖到这个字符串中，且值为null；相反如果值是undefined 的话，那这个属性不会被包含在其中了；
JSON.stringify({willStay: null, willBeGone: undefined}); // {"willStay":null}

总而言之，基于json的数据库是支持null但是不支持undefined的；
Since attributes set to null are encoded, you can transmit the intent to clear an attribute by setting its value to null before encoding and transmitting the object to a remote store.
Setting attribute values to undefined can save on storage and transmission costs, as the attribute names will not be encoded. However, this can complicate the semantics of clearing values vs. absent values.

最后的思考：

ts团队不使用null；
Douglas Crockford认为null不是个好注意，因为我们将全都会使用undefined；。

但是nodejs的代码库用null来作为标准的error的参数来表示，现在没有可使用的值。我个人认为不用在意去区别二者，因为多数项目使用的库对这件事都有不一样的意见；


this

在一个函数内this是什么，都是由这个函数是如何被调用的来决定的；
一般我们称之为“执行上下文”；

这是一个例子：

function foo() {
    console.log(this);
}

foo(); // logs out the global e.g. "window' in browsers
let bar = {
    foo
}
bar.foo(); // Logs out "bar" as "foo" was called on "bar"

因此，小心的使用this，如果你希望调用关系不影响this的话，你可以使用箭头函数；

闭包：

js最棒的一点就是闭包；js的函数可以获取任何在这个函数外部的变量。闭包用这个例子来解释是最贴切不过了；
function outerFunction(arg) {
    var variableInOuterFunction = arg;

    function bar() {
        console.log(variableInOuterFunction); // Access a variable from the outer scope
    }

    // Call the local function to demonstrate that it has access to arg
    bar();
}

outerFunction("hello closure"); // logs hello closure!

你可以看到，内部的函数是可以从外部环境拿到变量（variableInOuterFunction）的；
闭包这个概念，就显得简单明了；

精彩的部分来了：内部的这个函数，可以在外部函数返回之后，仍能获取外部函数的变量。
这是因为，变量仍被内部函数引用，并且不依赖外部函数，我们再来看这个例子；

function outerFunction(arg) {
    var variableInOuterFunction = arg;
    return function() {
        console.log(variableInOuterFunction);
    }
}

var innerFunction = outerFunction("hello closure!");

// Note the outerFunction has returned
innerFunction(); // logs hello closure!

闭包好在哪儿？

它能让你很方便的就操控？（compose）了一个对象，例如，可以隐藏模块


function createCounter() {
    let val = 0;
    return {
        increment() { val++ },
        getVal() { return val }
    }
}

let counter = createCounter();
counter.increment();
console.log(counter.getVal()); // 1
counter.increment();
console.log(counter.getVal()); // 2

从更高的层面来说，也是因为闭包，才有了nodejs（虽然现在对你来说似乎没联想到什么，但是最终会的）

// Pseudo code to explain the concept
server.on(function handler(req, res) {
    loadData(req.id).then(function(data) {
        // the "res" has been closed over and is available
        res.send(data);
    })
});

数字

无论你在任何编程语言中操作数字，你都要了解这门语言是如何处理数字的。下面我会列举一些在js中，处理数字时需要着重了解的地方

核心类型
js中只有一种数字类型。它是双精度64位的数字类型；下面我会讨论它的一些限制，和处理这些限制的推荐的解决办法；

小数
和那些有双浮点数字类型的语言一样，你应该了解，二进制浮点数字它的小数相加得到的答案，并不是准确的；比如说下面这个例子：
console.log(.1 + .2); // 0.30000000000000004

整数
正数的上下限是由内置的 Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER所限定的；
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER});
// {max: 9007199254740991, min: -9007199254740991}

Safe in this context refers to the fact that the value cannot be the result of a rounding error.
The unsafe values are +1 / -1 away from these safe values and any amount of addition / subtraction will round the result.

console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true!
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2); // true!

console.log(Number.MAX_SAFE_INTEGER);      // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);  // 9007199254740992 - Correct
console.log(Number.MAX_SAFE_INTEGER + 2);  // 9007199254740992 - Rounded!
console.log(Number.MAX_SAFE_INTEGER + 3);  // 9007199254740994 - Rounded - correct by luck
console.log(Number.MAX_SAFE_INTEGER + 4);  // 9007199254740996 - Rounded!

可以使用es6中的Number.isSafeInteger来判断数字的安全性；
// Safe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true

// Unsafe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false

// Because it might have been rounded to it due to overflow
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 10)); // false

js终将会支持bigInt，如果你高精度的整数，可以使用下面这个big.js中提高的方法；

big.js

无论你用计算来完成财务上的计算（例如 GST计算），可以用像big.js这个样库，它是用来：
完美的完成小数计算；

Safe out of bound integer values
安装也非常的简单
    npm install big.js @types/big.js
上个例子：
    import { Big } from 'big.js';

    export const foo = new Big('111.11111111111111111111');
    export const bar = foo.plus(new Big('0.00000000000000000001'));

// To get a number:
    const x: number = Number(bar.toString()); // Loses the precision

不要在需要计算的ui（charts，canvas）上使用这个库；

NaN
当数字通过计算之后，得到的并不是有效的数字时，js会返回NaN；
console.log(Math.sqrt(-1)); // NaN

请使用Number.isNaN来判断这个数值是不是NaN；
不要用== 或者 ===；

无穷小

在数字中，表示最小非0的值可以用Number.MIN_VALUE来表示
console.log(Number.MIN_VALUE);  // 5e-324

比这个值更小的"underflow values"，都将会转换成0；
console.log(Number.MIN_VALUE / 10);  // 0

Further intuition: 
比Number.MAX_VALUE更大的数，将会转换成INFINITY；
比Number.MIN_VALUE更小的数，将会转换成0；

真
js里也有真这个概念，一个参数/语句被放在特定的位置，例如（if条件句中、&&、||），可以被认定为true的；
以下是在js中被认定为真例子；
除了0之外的数字都被认定为真；
如果不为真，则被认定为假；

显示表示

！！能将一个值，被转换成boolean值，
`