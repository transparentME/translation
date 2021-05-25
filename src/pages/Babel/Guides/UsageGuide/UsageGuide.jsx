import MarkdownTransfer from '../../../../components/MarkdownTransfer'
const UsageGuide = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
const content = `
Usage Guide
使用指引
There are quite a few tools in the Babel toolchain that try to make it easy for you to use Babel whether you're an "end-user" or building an integration of Babel itself.
Babel的工具链中，有很多工具，这样不论你是“端用户”，或者是要将Babel本身集成，都可以让你在使用Babel时更简单；

This will be a quick introduction to those tools and you can read more about them in the "Usage" section of the docs.
下面将会快速介绍一下这些功能，如果你对某个部分感兴趣，你可以在文档的“使用说明”部分了解详情。
If you're using a framework, the work of configuring Babel might be different or actually already handled for you. 
如果你在使用框架，那么不同的框架对配置Babel的操作都不一样，甚至是框架已经帮你处理好了Babel的配置。
Check out our interactive setup guide instead.
可以去我们交互式安装指引页面了解更多（https://babeljs.io/setup.html）。

Overview
概览
This guide will show you how to compile your JavaScript application code that uses ES2015+ syntax into code that works in current browsers.
这篇指引将会展示如何将你所写的ES2015+语法的js应用代码编译成现有的浏览器可执行的代码。
That will involve both transforming new syntax and polyfilling missing features.
其中包括转译新语法和补全缺失特性。

The entire process to set this up involves:
完整流程其中包含:

1. Running these commands to install the packages:
运行以下这些命令以安装包:
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill

2.Creating a config file named babel.config.json (requires v7.8.0 and above) in the root of your project with this content:
在你项目的根目录下新建一个名为：babel.config.json的配置文件:(Babel v7.8.0或更高版本)
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5",
      }
    ]
  ]
}

The browsers list above is just an arbitrary example. You will have to adapt it for the browsers you want to support.
上面的浏览器列表只是一个任意的例子。你需要调整成你所希望支持浏览器信息。
Or babel.config.js if you are using an older Babel version
如果你现在使用旧版本的Babel，那么需要新建的文件名则为：“babel.config.js”。

const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      "corejs": "3.6.4",
    },
  ],
];

module.exports = { presets };

3. And running this command to compile all your code from the src directory to lib:
运行下面这个命令，就能将src路径下你所有的代码编译到lib中；
./node_modules/.bin/babel src --out-dir lib

You can use the npm package runner that comes with npm@5.2.0 to shorten that command by replacing ./node_modules/.bin/babel with npx babel
你可以使用npm@5.2.0自带的npm包运行器，可将上面的 ./node_modules/.bin/babel 简略替换成 npx babel

Read on for a step-by-step explanation of how this works and an introduction to each of the tools used.
继续阅读下面的解释，可以了解它是如果功能，与每个所使用的工具的大致介绍。
Basic usage with CLI
基本用法（CLI）
All the Babel modules you'll need are published as separate npm packages scoped under @babel (since version 7). 
所有你所需要使用的Babel（从7.0.0版本开始）的模块，都会单独发布到npm包管理器中的@Babel下；（@Babel解释一下）；
This modular design allows for various tools each designed for a specific use case. 
这种模块设计方式使得每个（这里翻译的不好）
Here we'll look at @babel/core and @babel/cli.
接下来我们来看看@babel/core 和 @babel/cli

Core Library
核心库
The core functionality of Babel resides at the @babel/core module. After installing it:
Babel的核心功能都在@Babel/core这个模块中；
npm install --save-dev @babel/core

you can require it directly in your JavaScript program and use it like this:
你可以像下面这样👇在你们的js项目中直接引用并使用它：
const babel = require("@babel/core");

babel.transform("code", optionsObject);

As an end-user though, you'll probably want to install other tools that serve as an interface to @babel/core and integrate well with your development process. 
尽管你是一个“端用户”，你仍有可能需要安装其他工具以作为@babel/core的接口，以与你的开发流程有良好的集成；

Even so, you might still want to check its documentation page to learn about the options, most of which can be set from the other tools as well.
因此，你仍可能要看这个文档，了解一些配置项，这些选项大部分也可以在其他功能上进行配置；
CLI tool
@babel/cli is a tool that allows you to use babel from the terminal. Here's the installation command and a basic usage example:
@babel/cli是一个可以让你在终端使用babel的工具。下面是它的安装命令以及一个基本使用示例：
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib

This will parse all the JavaScript files in the src directory, apply any transformations we have told it to, and output each file to the lib directory.
这样，Babel将会把src路径下所有的javascript文件，根据我们所应用的所有转译配置进行转译，并将每一个文件的结果输出到lib路径之下。
Since we haven't told it to apply any transformations yet, the output code will be identical to the input (exact code styling is not preserved).
因为现在我们还没有给它配置任何转译项，所以现在输出的代码和转译之前的代码是一模一样的。（真正代码的样式不会被保存）
We can specify what transformations we want by passing them as options.
我们可以通过传递我们特定需要转译的配置的选项；
We used the --out-dir option above. 
在上面所用的“--out-dir”选项。
You can view the rest of the options accepted by the cli tool by running it with --help. 
你们可以通过cli工具并运行--help，查看其他cli工具可用的一些配置项。
But the most important to us right now are --plugins and --presets.
但，现在对于我们来说，最重要的两个配置项是 --plugins 和 --presets

Plugins & Presets
Transformations come in the form of plugins, which are small JavaScript programs that instruct Babel on how to carry out transformations to the code. 
转译结果是由组成的插件控制的，这些插件都是指引Babel如何输出转译结果的js项目。
You can even write your own plugins to apply any transformations you want to your code.
你当然可以用你自己所写的插件来决定你所希望你的代码的输出结果。
To transform ES2015+ syntax into ES5 we can rely on official plugins like @babel/plugin-transform-arrow-functions:
我们可以使用官方的插件，例如：@babel/plugin-transform-arrow-functions，将ES2015乃至更高版本语法转译成ES5语法。
npm install --save-dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions

Now any arrow functions in our code will be transformed into ES5 compatible function expressions:
好了，现在我们代码的所有箭头函数都将会被转译成ES5兼容的函数表达式
const fn = () => 1;

// converted to
// 转换成

var fn = function fn() {
  return 1;
};

That's a good start! But we also have other ES2015+ features in our code that we want transformed. 
这是个好的开始！但是代码中，仍有其他的ES2015，甚至更高版本所拥有的特性，需要被转译。
Instead of adding all the plugins we want one by one, we can use a "preset" which is just a pre-determined set of plugins.
与其把所有的插件一个个添加到项目中去，我们可以用一个“preset”，它是一个“pre-determined”的一系列的插件。
Just like with plugins, you can create your own presets too to share any combination of plugins you need.
和插件一样，你们也可以创建你自己的presets，去“share”你所需要的插件的集合。
For our use case here, there's an excellent preset named env.
就我们现在的场景来说，这个叫env的preset就是个超级棒preset。
npm install --save-dev @babel/preset-env

./node_modules/.bin/babel src --out-dir lib --presets=@babel/env

Without any configuration, this preset will include all plugins to support modern JavaScript (ES2015, ES2016, etc.).But presets can take options too.
如果没有添加任何配置，这个preset会将所有用于支持现代版本的js（ES2015、ES2016等等）所需要的插件都包括进来，presets同样也可以设置选项。
Rather than passing both cli and preset options from the terminal, let's look at another way of passing options: configuration files.
除了在终端同时给cli和preset的选项传递配置项之外，我们可以用另一种方式来传递配置项: 配置文件。

Configuration
配置
There are a few different ways to use configuration files depending on your needs.
现有一些不同的方式，根据你的需求去使用配置文件。
Be sure to read our in-depth guide on how to configure Babel for more information.
你需要阅读深入指导：如何配置Babel，以了解更多信息。
For now, let's create a file called babel.config.json (requires v7.8.0 and above) with the following content:
现在，我们创建一个名为: babel.config.json(Babel版本是V7.8.0以上)文件，其中包括以下内容:
{
"presets": [
  [
  "@babel/env",
    {
      "targets": {
        "edge": "17",
        "firefox": "60",
        "chrome": "67",
        "safari": "11.1"
        }
      }
    ]
  ]
}

Now the env preset will only load transformation plugins for features that are not available in our target browsers.
这样，env 的preset将只会加载编译那些目标浏览器所不支持的那些特性的插件。
We're all set for syntax. Let's look at polyfills next.
这样，语法部分就大功告成了，接下来我们来了解polyfills。

Polyfill
🚨 As of Babel 7.4.0, this package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):
自Babel 7.4.0版本起，这个包就已经被废弃了，
import "core-js/stable";
import "regenerator-runtime/runtime";

The @babel/polyfill module includes core-js and a custom regenerator runtime to emulate a full ES2015+ environment.
@babel/polyfill模块包含core-js和一个自定义的再生器运行时环境用来模仿一个完整的ES2015+的环境。
This means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (when used alongside the regenerator plugin). 
这意味着，你可以使用新加入内置功能（对象），比如：Promise 或者 WeakMap, 静态方式，比如：Array.from 或者Object.assign，来替代Array.prototype.includes，生成器函数（翻译？？？？）
The polyfill adds to the global scope as well as native prototypes like String in order to do this.
polyfill像原生原型，例如：String，一样被添加到global环境（范围）中。
For library/tool authors this may be too much.

If you don't need the instance methods like Array.prototype.includes you can do without polluting the global scope altogether by using the transform runtime plugin instead of @babel/polyfill.
如果你不需要实例方法（Array.prototype.includes），你可以不用污染全局的同时，使用transform runtime plugin，而不需要使用@babel/polyfill
To go one step further, if you know exactly what features you need polyfills for, you can require them directly from core-js.
更甚是，如果你明确地知道你所需要的polyfill的特性，你可以直接从core-js中引进来。
Since we're building an application we can just install @babel/polyfill:
因为我正在创建一个应用，因此我们可以仅安装@babel/polyfill
npm install --save @babel/polyfill

Note the --save option instead of --save-dev as this is a polyfill that needs to run before your source code.
注意：使用--save 而非 --save-dev，因为这个polyfill需要在你的源码之前运行。
Now luckily for us, we're using the env preset which has a "useBuiltIns" option that when set to "usage" will practically apply the last optimization mentioned above where you only include the polyfills you need.
幸运的是，我们现在所使用的env preset有一个useBuiltIns的选项，当你把他的值设置为“useage”时，它会特别地在你所需要引入polyfill的地方，将它的最近优化发版本引入进来。

With this new option the configuration changes like this:
新的配置项如下面这样配置：

{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
      }
    ]
  ]
}

Babel will now inspect all your code for features that are missing in your target environments and include only the required polyfills. 
Babel会监控你所有的代码中，你的目标环境中所缺失的特性，并且只引入那些你所需要的polyfills。

For example this code:
例如这行代码：
Promise.resolve().finally();

would turn into this (because Edge 17 doesn't have Promise.prototype.finally):
将转译成这样（因为Edge 17中并没有Promise.prototype.finally）
require("core-js/modules/es.promise.finally");

Promise.resolve().finally();

If we weren't using the env preset with the "useBuiltIns" option set to "usage" we would've had to require the full polyfill only once in our entry point before any other code.
如果我们刚刚并没有将env preset中配置useBuiltIns这个选项的值，设置为"usage", 那么我们现在就需要在运行任何代码之前（entry point），就引入整个polyfill进来。
Summary
总结
We used @babel/cli to run Babel from the terminal, @babel/polyfill to polyfill all the new JavaScript features, and the env preset to only include the transformations and polyfills for the features that we use and that are missing in our target browsers.
@babel/cli可以让我们在终端上运行Babel，@babel/polyfill可以满足所有新的js的特性，env preset可帮我们引入只是我们需要使用到的，但目标环境中缺失的那些特性的polyfill；
For more information on setting up Babel with your build system, IDE, and more, check out our interactive setup guide.
想了解更多基于你的构建系统、IDE上安装Babel，或者更多详情，可以查看我们的交互式安装指引。
`

export default UsageGuide;