const content = `
    GUI and IDE setup
安装GUI和IDE
The V8 source code can be browsed online with Chromium Code Search.
v8的源码可以在线浏览（https://source.chromium.org/chromium/chromium/src/+/master:v8/）
This project’s Git repository may be accessed using many other client programs and plug-ins.
这个项目的git仓库可以通过其他客户程序和插件获得。
See your client’s documentation for more information.
查看客户文档获得更多信息。

Visual Studio Code and clangd
VScode与clangd
For instructions how to set up VSCode for V8, see this document.
可以查看这个文档（https://docs.google.com/document/d/1BpdCFecUGuJU5wN6xFkHQJEykyVSlGN8B9o3Kz2Oes8/edit#）了解如何在vscode中配置v8
This is currently (2021) the recommended setup.
这是2021最新的推荐安装教程。

Eclipse（这个没用过，就不翻译了）
For instructions how to set up Eclipse for V8, see this document. Note: as of 2020, indexing V8 with Eclipse does not work well.

Visual Studio Code and cquery
VSCode and cquery provide good code navigation capabilities. It offers “go to definition” as well as “find all references” for C++ symbols and works quite well. This section describes how to get a basic setup on a *nix system.

Install VSCode
Install VSCode in your preferred way. The rest of this guide assumes that you can run VSCode from the command line via the command code.

Install cquery
Clone cquery from cquery in a directory of your choice. We use CQUERY_DIR="$HOME/cquery" in this guide.

git clone https://github.com/cquery-project/cquery "$CQUERY_DIR"
cd "$CQUERY_DIR"
git submodule update --init
mkdir build
cd build
cmake .. -DCMAKE_BUILD_TYPE=release -DCMAKE_INSTALL_PREFIX=release -DCMAKE_EXPORT_COMPILE_COMMANDS=YES
make install -j8
If anything goes wrong, be sure to check out cquery’s getting started guide.

You can use git pull && git submodule update to update cquery at a later time (don't forget to rebuild via cmake .. -DCMAKE_BUILD_TYPE=release -DCMAKE_INSTALL_PREFIX=release -DCMAKE_EXPORT_COMPILE_COMMANDS=YES && make install -j8).

Install and configure cquery-plugin for VSCode
Install the cquery extension from the marketplace in VSCode. Open VSCode in your V8 checkout:

cd v8
code .
Go to settings in VSCode, for example, via the shortcut Ctrl + ,.

Add the following to your workspace configuration, replacing YOURUSERNAME and YOURV8CHECKOUTDIR appropriately.

"settings": {
  "cquery.launch.command": "/home/YOURUSERNAME/cquery/build/release/bin/cquery",
  "cquery.cacheDirectory": "/home/YOURUSERNAME/YOURV8CHECKOUTDIR/.vscode/cquery_cached_index/",
  "cquery.completion.include.blacklist": [".*/.vscache/.*", "/tmp.*", "build/.*"],
  […]
}
Provide compile_commands.json to cquery
The last step is to generate a compile_commands.json to cquery. This file will contain the specific compiler command lines used to build V8 to cquery. Run the following command in the V8 checkout:

ninja -C out.gn/x64.release -t compdb cxx cc > compile_commands.json
This needs to be re-executed from time to time to teach cquery about new source files. In particular, you should always re-run the command after a BUILD.gn was changed.

Other useful settings
The auto-closing of parenthesis in Visual Studio Code does not work that well. It can be disabled with

"editor.autoClosingBrackets": false
in the user settings.

The following exclusion masks help avoid unwanted results when using search (Ctrl+Shift+F):

"files.exclude": {
  "**/.vscode": true,  // this is a default value
},
"search.exclude": {
  "**/out*": true,     // this is a default value
  "**/build*": true    // this is a default value
},
`