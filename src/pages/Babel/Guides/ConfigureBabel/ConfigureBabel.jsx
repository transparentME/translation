import MarkdownTransfer from '../../../../components/MarkdownTransfer'
const ConfigureBabel = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
const content = `
Configure Babel
配置Babel
Babel can be configured! Many other tools have similar configs: ESLint (.eslintrc), Prettier (.prettierrc).
Babel是可配置的！与其他工具有着相似的配置：ESLint (.eslintrc), Prettier (.prettierrc).
All Babel API options are allowed. However, if the option requires JavaScript, you may want to use a JavaScript configuration file.
所有Babel 的API 参数都是可配置的。但是如果参数要求传入的是js，那么你可能需要写Js配置文件。

What's your use case?
你的使用场景是什么？
You are using a monorepo?
你在使用单一仓库？
You want to compile node_modules?
你想编译node-modules？
babel.config.json is for you!
那babel.config.json就很适合你辣～

You have a configuration that only applies to a single part of your project?
你的配置只需要应用在你项目的某一个部分？
.babelrc.json is for you!
.babelrc.json就很适合你！

Guy Fieri is your hero?
Guy Fieri 是你的偶像？
We recommend using the babel.config.json format. Babel itself is using it.
我们推荐使用babel.config.json模式。babel本身也是用这个呢。

babel.config.json
Create a file called babel.config.json with the following content at the root of your project (where the package.json is).
你在项目的根目录下，也就是package.json所在的文件夹下，创建一个叫“babel.config.json”，内容如下: 
{
  "presets": [...],
  "plugins": [...]
}

module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}

Check out the babel.config.json documentation to see more configuration options.
可以去babel.config.json文档了解更多配置项。

.babelrc.json
Create a file called .babelrc.json with the following content in your project.
在你的项目下，创建一个叫.babelrc.json，内容如下。
{
  "presets": [...],
  "plugins": [...]
}

Check out the .babelrc documentation to see more configuration options.
可以去.babelrc文档了解更多配置项。


package.json
Alternatively, you can choose to specify your .babelrc.json config from within package.json using the babel key like so:
或者，你可以在package.json中添加babel关键词，选择你特定的配置，内容如下:
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}

JavaScript configuration files
js配置文件
You can also write babel.config.json and .babelrc.json files using JavaScript:
你同样也可以用js写你的babel.config.json和.babelrc.json文件；

const presets = [ ... ];
const plugins = [ ... ];

module.exports = { presets, plugins };

You are allowed to access any Node.js APIs, for example a dynamic configuration based on the process environment:
你也可以使用所有Node.js 的API，例如，基于现有运行环境创建的动态配置文件。
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };

You can read more about JavaScript configuration files in the dedicated documentation
你可以在更了解更多js配置文件的信息

Using the CLI (@babel/cli)
babel --plugins @babel/plugin-transform-arrow-functions script.js

Check out the babel-cli documentation to see more configuration options.
去babel-cli文档了解更多配置选项。
Using the API (@babel/core)
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});

Check out the babel-core documentation to see more configuration options.
可以在babel-core文档中了解更多配置项
Print effective configs
打印有效配置
You can tell Babel to print effective configs on a given input path
你可以让Babel将有效配置打印到指定输入路径上。
# *nix or WSL
BABEL_SHOW_CONFIG_FOR=./src/myComponent.jsx npm start

$env:BABEL_SHOW_CONFIG_FOR = ".\src\myComponent.jsx"; npm start

BABEL_SHOW_CONFIG_FOR accepts both absolute and relative file paths. If it is a relative path, it will be resolved from cwd.
BABEL_SHOW_CONFIG_FOR接受相对文件路径与绝对文件路径。如果接受的是相对路径，（it will be resolved from cwd.）
Once Babel processes the input file specified by BABEL_SHOW_CONFIG_FOR, Babel will print effective configs to the console.
Babel只要开始处理在BABEL_SHOW_CONFIG_FOR所指的输入文件，它就会将有效的配置项打印到控制台中。
Here is an example output:
例子输出如下:
Babel configs on "/path/to/cwd/src/index.js" (ascending priority):
config /path/to/cwd/babel.config.json
{
  "sourceType": "script",
  "plugins": [
    "@foo/babel-plugin-1"
  ],
  "extends": "./my-extended.js"
}

config /path/to/cwd/babel.config.json .env["test"]
{
  "plugins": [
    [
      "@foo/babel-plugin-3",
      {
        "noDocumentAll": true
      },
    ]
  ]
}

config /path/to/cwd/babel.config.json .overrides[0]
{
  "test": "src/index.js",
  "sourceMaps": true
}

config /path/to/cwd/.babelrc
{}

programmatic options from @babel/cli
{
  "sourceFileName": "./src/index.js",
  "presets": [
    "@babel/preset-env"
  ],
  "configFile": "./my-config.js",
  "caller": {
    "name": "@babel/cli"
  },
  "filename": "./src/index.js"
}

Babel will print effective config sources ordered by ascending priority. Using the example above, the priority is:
Babel会根据升序优先排序来打印有效配置来源。如果使用上面的例子，优先级如下：
babel.config.json < .babelrc < programmatic options from @babel/cli

In other words, babel.config.json is overwritten by .babelrc, and .babelrc is overwritten by programmatic options.
换句话说，babel.config.json会被.babelrc覆盖，.babelrc会被语法选项覆盖。
For each config source, Babel prints applicable config items (e.g. overrides and .env) in the order of ascending priority.

Generally each config sources has at least one config item -- the root content of configs.
一般来说，每个配置来源至少有一个配置 -- 配置项的根内容。
If you have configured overrides or env, Babel will not print them in the root, but will instead output a separate config item titled as .overrides[index], where index is the position of the item.
如果你已经设置了覆盖值或env，Babel就不会在根路径上打印他们，取而代之的是将各个配置项单独输出到以.overrides[index]命名的配置中，其中index指的是item所在的位置。
This helps determine whether the item is effective on the input and which configs it will override.
这样可帮助判断是否
If your input is ignored by ignore or only, Babel will print that this file is ignored.

How Babel merges config items
Babel是如何合并配置项的
For each config items mentioned above, Babel applies Object.assign on options except for plugins and presets, which is concatenated by Array#concat. For example
上面所配置每个配置项，Babel会将Object.assign应用与除plugin与presets之外的配置项。
const config = {
  plugins: [["plugin-1a", { loose: true }], "plugin-1b"],
  presets: ["preset-1a"],
  sourceType: "script"
}

const newConfigItem = {
  plugins: [["plugin-1a", { loose: false }], "plugin-2b"],
  presets: ["preset-1a", "preset-2a"],
  sourceType: "module"
}

BabelConfigMerge(config, newConfigItem);
// returns
({
  plugins: [
    ["plugin-1a", { loose: false }],
    "plugin-1b",
    ["plugin-1a", { loose: false }],
    "plugin-2b"
  ], // new plugins are pushed
  presets: [
    "preset-1a",
    "preset-1a",
    "preset-2b"
  ], // new presets are pushed
  sourceType: "module" // sourceType: "script" is overwritten
})
`
export default ConfigureBabel;
