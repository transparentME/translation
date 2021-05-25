import MarkdownTransfer from '../../../../components/MarkdownTransfer'
const WhatIsBabel = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

const content = `
What is Babel?
Babel是什么？

Babel is a JavaScript compiler
Babel是一个Js的编译器
Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. 
Babel是一个主要可将es2015（以及甚至更高版本）的js代码转化为现有、或更老版本的浏览器或环境下，可使用的js代码（简言之就是向后兼容的代码）的一个工具链；
Here are the main things Babel can do for you:
Babel主要能做以下事项：

1.Transform syntax
  语法转化；
2.Polyfill features that are missing in your target environment (through @babel/polyfill)
  借助@babel/polyfill（用户类目下的 polyfill）模块，去实现你目标环境中，缺失的功能；
3.Source code transformations (codemods)
  源码转换（codemods）
4.And more! (check out these videos for inspiration)
  更多，可以看看这些视频，获得更多启发；（https://babeljs.io/videos.html）
// Babel Input: ES2015 arrow function
// Babel处理前: ES2015的箭头函数（补充：ES2015，也是我们常说的ES6）
[1, 2, 3].map((n) => n + 1);

// Babel Output: ES5 equivalent
// Babel处理后: 等价于ES5的函数
[1, 2, 3].map(function(n) {
  return n + 1;
});

For an awesome tutorial on compilers, check out the-super-tiny-compiler, which also explains how Babel itself works on a high level.
可以了解这个名叫“超小型编译器”的优秀编译器教程，它是从一个更高（更抽象的）角度来解释，Babel是如何工作的。
ES2015 and beyond
ES2015 与 更新版
Babel has support for the latest version of JavaScript through syntax transformers.
Babel通过语法转化的方式，以支持js的最新版本。
These plugins allow you to use new syntax, right now without waiting for browser support. Check out our usage guide to get started.
这些插件（通用 类目下的 插件 菜单中）能让你无需等待浏览器支持就能使用新的语法。那就从我们的使用手册开始了解吧～

JSX and React
Babel can convert JSX syntax! Check out our React preset to get started. 
Babel可以转译JSX语法啦！你可以直接跳转到React preset页开始了解哦。

Use it together with the babel-sublime package to bring syntax highlighting to a whole new level.
可以与babel-sublime包一起使用，这样语法高亮功能会上一个更高的台阶。
You can install this preset with
你可以通过下面的指令来安装这个preset。
npm install --save-dev @babel/preset-react

and add @babel/preset-react to your Babel configuration.
再把@babel/preset-react加到你的Babel的配置文件中。

export default React.createClass({
  getInitialState() {
    return { num: this.getRandomNumber() };
  },

  getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  },

  render() {
    return <div>
      Your dice roll:
      {this.state.num}
    </div>;
  }
});

Learn more about JSX
了解JSX的更多细节（https://facebook.github.io/jsx/）

Type Annotations (Flow and TypeScript)
类型注解（Flow 与 TypeScript）
Babel can strip out type annotations!
Babel可以剥离类型注解！
Check out either our Flow preset or TypeScript preset to get started.
你可以从Flow 或者 TS 的preset去了解更多；
Keep in mind that Babel doesn't do type checking; you'll still have to install and use Flow or TypeScript to check types.
但是，有一点要留意一定是Babel并不会做类型验证，因此，你还是需要安装并使用Flow 或者 TypeScript 来做类型校验。

You can install the flow preset with
你可以用下面这个指令安装flow preset
npm install --save-dev @babel/preset-flow

// @flow
function square(n: number): number {
  return n * n;
}

or the typescript preset with
或者用下面这个指令安装ts的preset
npm install --save-dev @babel/preset-typescript

function Greeter(greeting: string) {
    this.greeting = greeting;
}

Learn more about Flow and TypeScript
想更多了解Flow（https://flow.org/）和Ts（https://www.typescriptlang.org/），请点击链接

Pluggable
可插拔
Babel is built out of plugins. 
Babel就是由插件组成的。
Compose your own transformation pipeline using existing plugins or write your own. 
可以用现有的或者是你自己写的插件来编写你自己的转译流程（pipeline）
Easily use a set of plugins by using or creating a preset. 
使用preset或者写一个新的preset以简单方便的使用一系列的插件
Learn more →（通用类目下的 插件菜单）

Create a plugin on the fly with astexplorer.net or use generator-babel-plugin to generate a plugin template.
可以通过astexplorer.net（https://astexplorer.net/#/KJ8AjD6maa）创建一个插件或使用generator-babel-plugin（https://github.com/babel/generator-babel-plugin）来生成一个插件模版
// A plugin is just a function
// 一个插件就是一个函数而已
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}

Debuggable
可调试
Source map support so you can debug your compiled code with ease.
支持source map，方便你调试已编译的代码

Spec Compliant
符合规范
Babel tries to stay true to the ECMAScript standard, as much as reasonably possible. 
Babel会尽可能的与ECMAScript标准保持一致。
It may also have specific options to be more spec compliant as a tradeoff to performance.
甚至它可能还有一些特定选项，是符合规范但性能稍逊的权宜之计。

Compact
兼容
Babel tries using the least amount of code possible with no dependence on a bulky runtime.
Babel会尽可能地使用最精简的且不依赖于大的运行环境的代码；
This may be difficult to do in cases, and there are "loose" options for specific transforms that may tradeoff spec compliancy for readability, file size, and speed.
但在某些场景下，这是有难度的，并且为了某些特定的转换所存在的“宽松”选项，以用“可读性”、“文件大小”、“（读写）速度”以换取“符合规范”【这里需要找到证明，与现有原文不一致】`
export default WhatIsBabel;