const content = `
Building V8 with GN
用GN构建V8

V8 is built with the help of GN.（https://gn.googlesource.com/gn/+/master/docs/） GN is a meta build system of sorts, as it generates build files for a number of other build systems. 
V8的构建需要GN的帮助。GN是一个“集合构建系统”，它生成了许多其他构建系统的构建文件。
How you build therefore depends on what “back-end” build system and compiler you’re using.
因此，究竟是如何构建是由你所使用的“后端”构建系统和编译器所决定的。
The instructions below assume that you already have a checkout of V8 and that you have installed the build dependencies.
以下内容是在假设你已经拉取v8分支，且也已经安装所需依赖的前提下，所需要做的操作。
More information on GN can be found in Chromium’s documentation（https://www.chromium.org/developers/gn-build-configuration） or GN’s own docs（https://gn.googlesource.com/gn/+/master/docs/）.
可以在Chromium的文档或GN的文档中，找到关于GN的更多信息。

Building V8 from source involves three steps:
通过源码构建V8，包含以下3步：
1. generating build files
生成构建文件
2. compiling
编译
3. running tests
跑测试

There are two workflows for building V8:
构建V8，有两个工作流：
the convenience workflow using a helper script called gm that nicely combines all three steps
一个方便的工作流，即用一个称之为gm的辅助脚本，可以以一种友好的方式将所有的这3步结合起来。
the raw workflow, where you run separate commands on a lower level for each step manually
另一个生硬（！！）工作流，就需要你一步一步手动地将每一步命令行独立运行。
Building V8 using gm (the convenience workflow)
利用gm构建（比较方便的一种工作流）
gm is a convenience all-in-one script that generates build files, triggers the build and optionally also runs the tests. 
gm是一种方便的、可生成构建文件的多合一脚本，它可以触发构建并且可以选择性的运行测试。
It can be found at tools/dev/gm.py in your V8 checkout.
你可以在你的v8分支中tools/dev/gm.py这个地址中找到。
We recommend adding an alias to your shell configuration:
我们建议你在你的shell配置中增加一条alias。
alias gm=/path/to/v8/tools/dev/gm.py
You can then use gm to build V8 for known configurations, such as x64.release:
这样你就可以使用gm去构建v8, 例如x64版本：
gm x64.release
To run the tests right after the build, run:
可以在构建之后，跑一下测试，运行：
gm x64.release.check
gm outputs all the commands it’s executing, making it easy to track and re-execute them if necessary.
gm输出的所有命令都是在有必要的时候，能尽可能的简单的追踪或者重启服务。
gm enables building the required binaries and running specific tests with a single command:
gm可使得构建所需的二进制文件和运行特定测试这一切，都只需要简单的一行命令就得以完成：
gm x64.debug mjsunit/foo cctest/test-bar/*


Building V8: the raw, manual workflow
构建V8：以一种生硬的，手动工作流
Step 1: generate build files
第一步：生成构建文件
There are several ways of generating the build files:
有一下几种方式生成构建文件：

The raw, manual workflow involves using gn directly.
这种生硬、手动的工作流其中包含直接使用gn。
A helper script named v8gen streamlines the process for common configurations.
有个辅助脚本（v8gen）将通用配置的步骤流程化了。
Generating build files using gn
用gn生成构建文件。
Generate build files for the directory out/foo using gn:
使用gn为out/foo的路径文件生成构建文件。
gn args out/foo

This opens an editor window for specifying the gn arguments.
这个命令会打开一个编译器窗口，用来说明gn的一些参数。
Alternatively, you can pass the arguments on the command line:
或者，你可以在命令行中输入参数：
gn gen out/foo --args='is_debug=false target_cpu="x64" v8_target_cpu="arm64" use_goma=true'
This generates build files for compiling V8 with the arm64 simulator in release mode using goma for compilation.
这个命令会生成构建出在发布模式下用arm64模拟器所编译v8的文件；（TODO：这句译的不好，了解更深后回头看下）
For an overview of all available gn arguments, run:
运行下面的命令可使得展示所有gn可用的参数的概览：
gn args out/foo --list

Generate build files using v8gen
通过v8gen生成构建文件
The V8 repository includes a v8gen convenience script to more easily generate build files for common configurations. 
v8的仓库，包含了一个v8gen便携脚本，它可更方便地生成通用配置的构建文件。
We recommend adding an alias to your shell configuration:
我们建议你在你的shell配置中添加一个alias
alias v8gen=/path/to/v8/tools/dev/v8gen.py
Call v8gen --help for more information.
调用v8gen --help可以获取更多信息哦。
List available configurations (or bots from a master):
这个列表可用的配置，可以通过v8gen list来查看。
v8gen list

v8gen list -m client.v8
Build like a particular bot from the client.v8 waterfall in folder foo:
v8gen -b 'V8 Linux64 - debug builder' -m client.v8 foo

Step 2: compile V8
To build all of V8 (assuming gn generated to the x64.release folder), run:
编译整个v8（假设gn已经在x64.release 文件中生成了）
ninja -C out/x64.release
To build specific targets like d8, append them to the command:
用于构建特定文件（目标），例如d8，输入一下命令
ninja -C out/x64.release d8

Step 3: run tests
测试
You can pass the output directory to the test driver.
你可以将输出的目录丢给测试驱动程序。
Other relevant flags are inferred from the build:

tools/run-tests.py --outdir out/foo
You can also test your most recently compiled build (in out.gn):
你当然也可以测试你最近编辑的构建文件
tools/run-tests.py --gn
Build issues? File a bug at v8.dev/bug or ask for help on v8-users@googlegroups.com.
构建遇到问题？可以在（https://v8.dev/bug）提出问题，或着发邮件给我们v8-users@googlegroups.com获得帮助。
`