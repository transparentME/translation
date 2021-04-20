const content = `
  V8 release v4.5
  v8发布4.5版本
  Published 17 July 2015 · Tagged with release
  发布于2015年7月17日 标签：发布
  Roughly every six weeks, we create a new branch of V8 as part of our release process.
  Each version is branched from V8’s Git master immediately before Chrome branches for a Chrome Beta milestone.
  Today we’re pleased to announce our newest branch, V8 version 4.5, which will be in beta until it is released in coordination with Chrome 45 Stable.
  V8 v4.5 is filled with all sorts of developer-facing goodies, so we’d like to give you a preview of some of the highlights in anticipation of the release in several weeks.
  粗略的算，每6周，我们都会创建一个新的v8分来用来作为我们发布流程的一部分。
  每个版本都是在切出Chrome的Bete里程碑分支之前，立即从V8的git主分支切出来的。
  今天，我们很开心的宣布，我们最新的分支，v8 4.5版本，并且在它能与Chrome 45的稳定版本很好的协作并发布之前，都将会一直处于测试阶段。
  v8的4.5版本充斥了面向开发者的好东西，因此，我们想给你们透露一些在未来几周的发布中的一些高光点。

  Improved ECMAScript 2015 (ES6) support
  V8 v4.5 adds support for several ECMAScript 2015 (ES6) features.
  ECMAScript 2015（es6）支持的提升
  v8 v4.5版本中添加了对部分ECMAScript 2015 (ES6)特性的支持。

  Arrow functions
  With the help of Arrow Functions it is possible to write more streamlined code.
  箭头函数
  有了箭头函数的帮助，写更流线型（更新型）的代码就成为可能。

  const data = [0, 1, 3];
  // Code without Arrow Functions
  // 不用箭头函数写的代码
  const convertedData = data.map(function(value) { return value * 2; });
  console.log(convertedData);
  // Code with Arrow Functions
  // 利用箭头函数写的代码
  const convertedData = data.map(value => value * 2);
  console.log(convertedData);

  The lexical binding of 'this' is another major benefit of arrow functions.
  As a result, using callbacks in methods gets much easier.
  this的词法绑定也是箭头函数所带来的另一个主要好处。
  这使在方法中使用回调变的更加简单。

  class MyClass {
    constructor() { this.a = 'Hello, '; }
    hello() { setInterval(() => console.log(this.a + 'World!'), 1000); }
  }

  const myInstance = new MyClass();
  myInstance.hello();

  Array/TypedArray functions
  All of the new methods on Arrays and TypedArrays that are specified in ES2015 are now supported in V8 v4.5.
  They make working with Arrays and TypedArrays more convenient.
  Among the methods added are Array.from and Array.of.
  Methods which mirror most Array methods on each kind of TypedArray were added as well.

  Array/TypedArray函数
  所有在ES2015中详细说明的Array 和 TypedArray上的新方法，现在在v8的4.5版本中都将得到支持。
  这使得使用Array 和 TypedArrays更方便。
  Array.from 和 Array.of 就添加到了方法之中。
  Array上的大多数方法，都镜像添加到了每个类型的TypedArray上。

  Object.assign
  Object.assign enables developers to quickly merge and clone objects.
  Object.assign使得开发者可以快速合并且克隆对象。

  const target = { a: 'Hello, ' };
  const source = { b: 'world!' };
  // Merge the objects.
  // 合并对象
  Object.assign(target, source);
  console.log(target.a + target.b);
  This feature can also be used to mix in functionality.
  这一特性也同样可以用于在功能上混入。（没译好）

  More JavaScript language features are “optimizable”
  For many years, V8’s traditional optimizing compiler, Crankshaft, has done a great job of optimizing many common JavaScript patterns.
  However, it never had the capability to support the entire JavaScript language, and using certain language features in a function — such as try/catch and with — would prevent it from being optimized.
  V8 would have to fall back to its slower, baseline compiler for that function.
  更多的js语言特性都是可优化的
  很多以来，v8的传统的优化编译器，也就是Crankshaft，一直在对优化很多常见的js模式做大量的工作。
  但是，他却从无法支持整个js语言，并且当在函数内使用了某些特定的语言特性，例如try/catch 和 with，就会导致语句无法优化。
  因此，v8就不得不回滚到他的更慢的基线编译器来处理那个函数。

  One of the design goals of V8’s new optimizing compiler, TurboFan, is to be able to eventually optimize all of JavaScript, including ECMAScript 2015 features.
  In V8 v4.5, we’ve started using TurboFan to optimize some of the language features that are not supported by Crankshaft: for-of, class, with, and computed property names.
  v8的新优化编译器，TurboFan的设计目标之一，就是为了能够最终优化所有js，包括ECMAScript 2015特性。
  在v8 4.5版本中，我们已经开始使用TurboFan来优化部分Crankshaft所不支持的语言特性：for-of, class, with, 和 computed property names
  Here is an example of code that uses 'for-of', which can now be compiled by TurboFan:
  下面是现在用TurboFan编译过的for-of的代码：

  const sequence = ['First', 'Second', 'Third'];
  for (const value of sequence) {
    // This scope is now optimizable.
    // 这部分现在是可优化的。
    const object = {a: 'Hello, ', b: 'world!', c: value};
    console.log(object.a + object.b + object.c);
  }
  Although initially functions that use these language features won't reach the same peak performance as other code compiled by Crankshaft, TurboFan can now speed them up well beyond our current baseline compiler.
  Even better, performance will continue to improve quickly as we develop more optimizations for TurboFan.

  V8 API

  Please check out our summary of API changes.
  This document gets regularly updated a few weeks after each major release.
  请查看我们API改变的汇总。
  这个文档也会定期地在每一次主要发布之后更新几个星期。
  Developers with an active V8 checkout can use git checkout -b 4.5 -t branch-heads/4.5 to experiment with the new features in V8 v4.5.
  Alternatively you can subscribe to Chrome's Beta channel and try the new features out yourself soon.
`
function V8ReleaseV4_5() {
  return (
    <pre className="V8ReleaseV4_5">
      {content}
    </pre>
  );
}

export default V8ReleaseV4_5;