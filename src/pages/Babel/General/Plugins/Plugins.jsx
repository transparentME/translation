import MarkdownTransfer from '../../../../components/MarkdownTransfer'
const Plugins = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
const content = `
Plugins
Babel is a compiler (source code => output code).
Babel是一个编译器（将源码输出成结果代码。）
Like many other compilers it runs in 3 stages: parsing, transforming, and printing.
和很多其他编译器一样，他执行时会有3个阶段：解析、编译、打印
Now, out of the box Babel doesn't do anything.
到现在为止，Babel还不会做任何事情。
It basically acts like const babel = code => code; by parsing the code and then generating the same code back out again.
他现在看起来就向是输入了的代码通过解析之后生成了一模一样的代码。

You will need to add plugins for Babel to do anything.
你需要向Babel里增加一些插件。
Instead of individual plugins, you can also enable a set of plugins in a preset.
除了单个的插件之外，你同样也可以在preset里添加一些plugins。

Transform Plugins
编译插件
These plugins apply transformations to your code.
这些插件可以编译你的代码
Transform plugins will enable the corresponding syntax plugin so you don't have to specify both.
编译插件将会引入相关的语法插件，这样你无需一一列举出来的。

ES3
member-expression-literals
property-literals
reserved-words

ES5
property-mutators
ES2015
arrow-functions
block-scoped-functions
block-scoping
classes
computed-properties
destructuring
duplicate-keys
for-of
function-name
instanceof
literals
new-target
object-super
parameters
shorthand-properties
spread
sticky-regex
template-literals
typeof-symbol
unicode-escapes
unicode-regex

ES2016
exponentiation-operator

ES2017
async-to-generator

ES2018
async-generator-functions
dotall-regex
named-capturing-groups-regex
object-rest-spread
optional-catch-binding
unicode-property-regex
Modules
modules-amd
modules-commonjs
modules-systemjs
modules-umd
Experimental
class-properties
class-static-block
decorators
do-expressions
export-default-from
export-namespace-from
function-bind
function-sent
logical-assignment-operators
nullish-coalescing-operator
numeric-separator
optional-chaining
partial-application
pipeline-operator
private-methods
throw-expressions
private-property-in-object
Minification
Check out our minifier based on Babel!

These plugins are in the minify repo.

inline-consecutive-adds
inline-environment-variables
member-expression-literals
merge-sibling-variables
minify-booleans
minify-builtins
minify-constant-folding
minify-dead-code-elimination
minify-flip-comparisons
minify-guarded-expressions
minify-infinity
minify-mangle-names
minify-numeric-literals
minify-replace
minify-simplify
minify-type-constructors
node-env-inline
property-literals
regexp-constructors
remove-console
remove-debugger
remove-undefined
simplify-comparison-operators
undefined-to-void
React
react-constant-elements
react-display-name
react-inline-elements
react-jsx
react-jsx-compat
react-jsx-self
react-jsx-source
Other
external-helpers
flow-strip-types
jscript
object-assign
object-set-prototype-of-to-assign
proto-to-assign
regenerator
runtime
strict-mode
typescript

Syntax Plugins
语法插件
These plugins only allow Babel to parse specific types of syntax (not transform).
这些插件只是让Babel解析特定类型的语法（而不转移）
NOTE: transform plugins automatically enable the syntax plugins.
备注：转移插件会自动启用语法插件。
So you don't need to specify the syntax plugin if the corresponding transform plugin is used already.
因此你无需列举特定的语法插件，如果已经使用了相关转译插件。
Alternatively, you can also provide any plugins option from the Babel parser:
同样，你也可以用过向Babel的解析器提供插件配置。
Your .babelrc:

{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}

Copy

Plugin/Preset Paths
插件/预设 路径
If the plugin is on npm, you can pass in the name of the plugin and babel will check that it's installed in node_modules
如果插件有发布到npm上，有传递插件的名称，babel将会确定它是否有被安装到node_modules中。
{
  "plugins": ["babel-plugin-myPlugin"]
}

Copy
You can also specify an relative/absolute path to your plugin.
你也可以通过相对/绝对路径的方式引入你们的插件。
{
  "plugins": ["./node_modules/asdf/plugin"]
}

Copy
Plugin Shorthand
插件简写
If the name of the package is prefixed with babel-plugin-, you can use a shorthand:
如果package的名字是以“babel-plugin-”开头，你可以向下面这样简写：
{
  "plugins": [
    "myPlugin",
    "babel-plugin-myPlugin" // equivalent
  ]
}

Copy
This also works with scoped packages:
scoped包也是如此:
{
  "plugins": [
    "@org/babel-plugin-name",
    "@org/name" // equivalent
  ]
}

Copy
Plugin Ordering
插件执行顺序
Ordering matters for each visitor in the plugin.

This means if two transforms both visit the "Program" node, the transforms will run in either plugin or preset order.
这意味着，如果两个转译模块都要访问Program节点，
Plugins run before Presets.
插件会比preset先运行。
Plugin ordering is first to last.
插件运行是从队首到队尾。
Preset ordering is reversed (last to first).
预设是则相反，从队尾到队首。
For example:

{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}

Copy
Will run transform-decorators-legacy then transform-class-properties.

It is important to remember that with presets, the order is reversed. The following:

{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}

Copy
Will run in the following order: @babel/preset-react then @babel/preset-env.

Plugin Options
插件选项
Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.
插件和预设都可以通过在数组包裹名称和配置对象的方式实现。
For specifying no options, these are all equivalent:
如果没有具体的配置，那他们就都是一样的。
{
  "plugins": ["pluginA", ["pluginA"], ["pluginA", {}]]
}

Copy
To specify an option, pass an object with the keys as the option names.
明确制定配置，需要传入一个对象，然后配置名作为key值
{
  "plugins": [
    [
      "transform-async-to-module-method",
      {
        "module": "bluebird",
        "method": "coroutine"
      }
    ]
  ]
}

Copy
Settings options for presets works exactly the same:
预设也是如此：
{
  "presets": [
    [
      "env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}

Copy
Plugin Development

Please refer to the excellent babel-handbook to learn how to create your own plugins.
可以参考“excellent babel-handbook”，去创建你自己的插件。
The simple plugin that reverses names (from the homepage):
一个反转文字的简单插件。
export default function() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split("")
          .reverse()
          .join("");
      },
    },
  };
}
`
export default Plugins