import MarkdownTransfer from '../../../../components/MarkdownTransfer'
const Presets = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
const content = `
Presets
预设
Don't want to assemble your own set of plugins?
不想组成你自己的插件吗？
No problem! Presets can act as an array of Babel plugins or even a sharable options config.
没问题！预设可以被使用是一组Babel插件或者可分享的选项配置。
Official Presets
官方预设
We've assembled some for common environments:
我们现在已经为常见的环境聚合了一些预设：
@babel/preset-env
@babel/preset-flow
@babel/preset-react
@babel/preset-typescript
Many other community maintained presets are available on npm!
许多其他社区都会将他们维护的预设发布在npm上。
Stage-X (Experimental Presets)
X阶段 体验版预设
Any transforms in stage-x presets are changes to the language that haven't been approved to be part of a release of JavaScript (such as ES6/ES2015).
任何在x阶段的预设，
Subject to change
These proposals are subject to change so use with extreme caution, especially for anything pre stage-3.

We plan to update stage-x presets when proposals change after each TC39 meeting when possible.

The TC39 categorizes proposals into the following stages:

Stage 0 - Strawman: just an idea, possible Babel plugin.
Stage 1 - Proposal: this is worth working on.
Stage 2 - Draft: initial spec.
Stage 3 - Candidate: complete spec and initial browser implementations.
Stage 4 - Finished: will be added to the next yearly release.
For more information, be sure to check out the current TC39 proposals and its process document.

The TC39 stage process is also explained in detail across a few posts by Yehuda Katz (@wycatz) over at thefeedbackloop.xyz: Stage 0 and 1, Stage 2, Stage 3

Creating a Preset
创建一个预设
To make your own preset, you just need to export a config.
创建你自己的预设，你只需要输出一个配置文件。
It could just return an array of plugins..
他可以返回一个包含插件的数组
module.exports = function() {
  return {
    plugins: [
      "pluginA",
      "pluginB",
      "pluginC",
    ]
  };
}

Copy
Presets can contain other presets, and plugins with options.
预设可以包含其他预设，与包含配置的插件。
module.exports = () => ({
  presets: [
    require("@babel/preset-env"),
  ],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});

Copy
For more info, check out the babel handbook section on presets.
想了解更多信息，可以查看babel手册中的预设部分
Preset Paths
预设路径
If the preset is on npm, you can pass in the name of the preset and babel will check that it's installed in node_modules
如果预设只是在npm，你可以直接在预设中传入他们名称，babel会确认他是否有安装在node_modules里
{
  "presets": ["babel-preset-myPreset"]
}

Copy
You can also specify an relative/absolute path to your presets.
可以在你的预设中传入相对/绝对路径预设。
{
  "presets": ["./myProject/myPreset"]
}

Copy
Preset Shorthand
预设简写
If the name of the package is prefixed with babel-preset-, you can use a shorthand:
预设的名字如果是以babel-preset-开头，你可以这样简写：
{
  "presets": [
    "myPreset",
    "babel-preset-myPreset" // equivalent
  ]
}

Copy
This also works with scoped packages:
scoped包也是如此
{
  "presets": [
    "@org/babel-preset-name",
    "@org/name" // equivalent
  ]
}

Copy
Preset Ordering
Preset ordering is reversed (last to first).
预设的执行顺序也是反向的（从队尾到队首）
{
  "presets": [
    "a",
    "b",
    "c"
  ]
}

Copy
Will run in the following order: c, b, then a.
运行顺序是：c,b,a
This was mostly for ensuring backwards compatibility, since most users listed "es2015" before "stage-0".
这是最大程度的确保，向后兼容，因为大多数用户都将es2015 放在 stage-0之前。
Preset Options
预设选项
Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.
插件和预设都可以通过在数组包裹名称和配置对象的方式实现。
For specifying no options, these are all equivalent:
以下这些写法，都是一样的。
{
  "presets": [
    "presetA",
    ["presetA"],
    ["presetA", {}],
  ]
}

Copy
To specify an option, pass an object with the keys as the option names.
明确制定配置，需要传入一个对象，然后配置名作为key值
{
  "presets": [
    ["@babel/preset-env", {
      "loose": true,
      "modules": false
    }]
  ]
}
`



export default Presets