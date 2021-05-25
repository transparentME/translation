import MarkdownTransfer from '../../../../components/MarkdownTransfer'
const V8ReleaseV9_0 = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
export default V8ReleaseV9_0;

const content = `
V8 release v9.0
V8 发布9.0版本
Published 17 March 2021 · Tagged with release
发布于2021年3月17日 标签：发布
Every six weeks, we create a new branch of V8 as part of our release process. Each version is branched from V8’s Git master immediately before a Chrome Beta milestone. Today we’re pleased to announce our newest branch, V8 version 9.0, which is in beta until its release in coordination with Chrome 90 Stable in several weeks. V8 v9.0 is filled with all sorts of developer-facing goodies. This post provides a preview of some of the highlights in anticipation of the release.

JavaScript
RegExp match indices
正则匹配索引

Starting in v9.0, developers may opt into getting an array of the start and end positions of matched capture groups in regular expression matches.
This array is available via the .indices property on match objects when the regular expression has the /d flag.

从9.0版本开始，开发者们可以在正则表达式匹配中选择...
当正则表达式拥有/d标志的时候，匹配对象的.indices属性获取
const re = /(a)(b)/d;      // Note the /d flag.
const m = re.exec('ab');
console.log(m.indices[0]); // Index 0 is the whole match.
// → [0, 2]
console.log(m.indices[1]); // Index 1 is the 1st capture group.
// → [0, 1]
console.log(m.indices[2]); // Index 2 is the 2nd capture group.
// → [1, 2]
Please see our explainer for an in-depth dive.
可以在我们的详细说明中了解更多。

Faster super property access
Accessing super properties (for example, super.x) has been optimized by using V8’s inline cache system and optimized code generation in TurboFan.
With these changes, super property access is now closer to being on par with regular property access, as can be seen from the graphs below.

更快速的访问super属性
访问super属性（例如，super.x）的这一方法通过使用v8的内联缓存系统与TurboFan生成的优化代码 已经做到优化了。
也随着这些改变，super属性访问现在已经接近于常规属性的访问，正如下图中所表示的一样。

Compare super property access to regular property access, optimized
对比super属性访问与常规属性访问，与优化后情况

Please see the dedicated blog post（https://v8.dev/blog/fast-super） for more details.
可以去这篇详细的文章总去

for ( async of disallowed（查一下）
A grammar ambiguity（https://github.com/tc39/ecma262/issues/2034） was recently discovered and fixed（https://chromium-review.googlesource.com/c/v8/v8/+/2683221） in V8 v9.0.
最近发现的语法歧义在v8的9.0版本中已经修复。

The token sequence for ( async of now no longer parses.

WebAssembly
Faster JS-to-Wasm calls
更快捷的Js到wasm的调用

V8 uses different representations for the parameters of WebAssembly and JavaScript functions.
For this reason, when JavaScript calls an exported WebAssembly function, the call goes through a so-called JS-to-Wasm wrapper, responsible for adapting parameters from JavaScript land to WebAssembly land as well as adapting results in the opposite direction.
Unfortunately, this comes with a performance cost, which meant that calls from JavaScript to WebAssembly were not as fast as calls from JavaScript to JavaScript.
To minimize this overhead the JS-to-Wasm wrapper can now be inlined at the call site, simplifying the code and removing this extra frame.

WebAssembly 和 javascript 函数的参数，v8使用了不同的标示来标记。
也因为这个原因，当js调用一个由webAssembly暴露出来的函数，调用会通过一个所谓的Js-to-Wasm包裹器，用于adapting（适配）从js传递到webassembly的参数，同时也将会将结果方向的做适配。
但是，这会导致性能开销，它无法快速到像js调用js一样。
为了最小化这个问题，在调用点inline js-to-wasm包裹器，这样可以简化代码并移除这个多余的frame（框架？）。

Let’s say we have a WebAssembly function to add two double floating point numbers, like this:
比方说我们有一个webassembly的函数用于将两个双浮点数相加，比如：

double addNumbers(double x, double y) {
  return x + y;
}
and say we call that from JavaScript to add some vectors (represented as typed arrays):
然后我们在js中调用，将两个向量（vectors）想起来，（用typed arrays表示）:
const addNumbers = instance.exports.addNumbers;

function vectorSum(len, v1, v2) {
  const result = new Float64Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = addNumbers(v1[i], v2[i]);
  }
  return result;
}

const N = 100_000_000;
const v1 = new Float64Array(N);
const v2 = new Float64Array(N);
for (let i = 0; i < N; i++) {
  v1[i] = Math.random();
  v2[i] = Math.random();
}

// Warm up.
for (let i = 0; i < 5; i++) {
  vectorSum(N, v1, v2);
}

// Measure.
console.time();
const result = vectorSum(N, v1, v2);
console.timeEnd();
On this simplified microbenchmark, we see the following improvements:
在这个简化的微基准测试，我们可以发现下面的几个提升：

Microbenchmark comparison

The feature is still experimental and can be enabled through the --turbo-inline-js-wasm-calls flag.

这个特性仍在实验中，可以通过 --turbo-inline-js-wasm-calls 来使用。

For more details, see the design document（https://docs.google.com/document/d/1mXxYnYN77tK-R1JOVo6tFG3jNpMzfueQN1Zp5h3r9aM/edit）.

如果想了解更多，可以了解这个设计文档。

V8 API
V8 API
Please use git log branch-heads/8.9..branch-heads/9.0 include/v8.h to get a list of the API changes.

可以通过git log branch-heads/8.9..branch-heads/9.0 include/v8.h来获取API改变列表。

Developers with an active V8 checkout can use git checkout -b 9.0 -t branch-heads/9.0 to experiment with the new features in V8 v9.0.
Alternatively you can subscribe to Chrome’s Beta channel and try the new features out yourself soon.
有有效v8分支的开发者们可以使用git checkout -b 9.0 -t branch-heads/9.0来体验V8 v9.0中的新特性。
或者你可以订阅Chrome的Beta channel并且自己尝试体验新的分支
`