const content = `
Checking out the V8 source code
获取V8源码
This document explains how to check out the V8 source code locally. 
这篇文档会介绍如果获取v8源码
If you just want to browse the source online, use these links:
如果你想在线浏览源码，可以查看这次链接：

browse                (https://chromium.googlesource.com/v8/v8/)
browse bleeding edge  (https://chromium.googlesource.com/v8/v8/+/master)
changes               (https://chromium.googlesource.com/v8/v8/+log/master)


Using Git
使用git

V8’s Git repository is located at https://chromium.googlesource.com/v8/v8.git, with an official mirror on GitHub: https://github.com/v8/v8.
v8项目的git仓库地址是(https://chromium.googlesource.com/v8/v8.git), github的官方镜像地址是(https://github.com/v8/v8)
Don’t just git clone either of these URLs! if you want to build V8 from your checkout, instead follow the instructions below to get everything set up correctly.
但是不要clone这些地址！如果你想构建v8项目，就跟着接下来的指引来做吧～

Instructions
指引
1. On Linux or macOS, first install Git and then depot_tools.
Linux 或 macOS操作系统，需要先安装git和depot_tools(https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up)

On Windows, follow the Chromium instructions (for Googlers, for non-Googlers) to install Visual Studio, Debugging tools for Windows, and depot_tools (which on Windows includes Git).
Windows操作系统，依照Chromium的指引(gooler、非googler(https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#Setting-up-Windows))，安装Visual Studio, Windows操作系统可用来debug，和depot_tools(在Windows操作系统中，已经包含git)

2. Update depot_tools by executing the following into your terminal/shell. On Windows, this has to be done in the Command Prompt (cmd.exe), as opposed to PowerShell or others.
在你的终端或shell中，输入以下操作，以用来更新 depot_tools；Windows操作系统中，需要在命令提示符(cmd.exe)中完成这些操作，命令提示符是与PowerShell与其他命令行不同的终端。

gclient

3. For push access, you need to setup a .netrc file with your Git password:
往后有可能你需要push代码，你需要建立一个后缀为.netrc的文件，并将你的git密码记录在上面。

Go to https://chromium.googlesource.com/new-password and log in with your committer account (usually an @chromium.org account). 
用你的提交账号(通常是@chromium.org账号)登陆这个页面。
Note: creating a new password doesn’t automatically revoke any previously-created passwords. 
注意: 创建新密码并不会自动让之前创建的密码失效。
Please make sure you use the same email as the one set for git config user.email.
确保你所用的邮箱和git设置的邮箱是同一个邮箱哦。
Have a look at the big, grey box containing shell commands. Paste those lines into your shell.
然后在那个包含shell命令行的大灰盒子里，粘贴以下命令吧～
Now, get the V8 source code, including all branches and dependencies:
现在，就可以获取V8源码、所有分支和依赖了：
mkdir ~/v8
cd ~/v8
fetch v8
cd v8

After that you’re intentionally in a detached head state.
这样，会处于分离头指针状态。
Optionally you can specify how new branches should be tracked:
或者你可以明确制定如何追踪新分支

git config branch.autosetupmerge always
git config branch.autosetuprebase always
Alternatively, you can create new local branches like this (recommended):
或者推荐你像这样创建一个新的本地分支
git new-branch fix-bug-1234
Staying up-to-date
Update your current branch with git pull. Note that if you’re not on a branch, git pull won’t work, and you’ll need to use git fetch instead.
用git pull命令来获取当前分支的最新代码。谨记：git pull只有当你现在在某一个分支上时，才会有用哦，不然你就应该用git fetch命令了。
git pull
Sometimes dependencies of V8 are updated. You can synchronize those by running:
当v8的依赖已经更新了，那么你可以通过一下操作来同步一下：
gclient sync
Sending code for reviewing

git cl upload
Committing
提交
You can use the CQ checkbox on codereview for committing (preferred).
你可以使用代码走查的CQ checkbox来提交（推荐）。
See also the chromium instructions for CQ flags and troubleshooting.
同样也可以浏览chromium指引来了解CQ flag 和 调试。
If you need more trybots than the default, add the following to your commit message on Gerrit (e.g. for adding a nosnap bot):
如果你需要更多的trybot(不知道是啥?), 那么将下面的备注加到你的提交信息上。（Gerrit是什么）(是为了添加一个nosnap机器人)
CQ_INCLUDE_TRYBOTS=tryserver.v8:v8_linux_nosnap_rel

To land manually, update your branch:
手动定位，更新你的分之
git pull --rebase origin

Then commit using
提交使用
git cl land

Try jobs
This section is only useful for V8 project members.
这部分只对v8项目成员有用。
Creating a try job from codereview
在codereview添加一个try job。
Upload a CL to Gerrit.
上传一个CL到Gerrit
git cl upload

Try the CL by sending a try job to the try bots like this:
发送一个"下面的命令"的try job到try bots，以尝试CL
git cl try

Wait for the try bots to build and you get an email with the result.
然后等try bots帮你构建，结果会通过邮件的方式发给你。
You can also check the try state at your patch on Gerrit.
你也可以通过在Gerrit中你的patch上确认try的状态。
If applying the patch fails you either need to rebase your patch or specify the V8 revision to sync to:
如果失败了，你可以rebase你的patch，或者明确具体你想同步的v8版本：
git cl try --revision=1234
Creating a try job from a local branch
在本地分支中创建一个try job
Commit some changes to a git branch in the local repo.
向本地仓库的一个git分支提交一些变更
Try the change by sending a try job to the try bots like this:
你可以尝试通过发送一个try job到try bots来提一个变更（！！）
git cl try
Wait for the try bots to build and you get an email with the result.
然后等try bots帮你构建，结果会通过邮件的方式发给你。
Note: There are issues with some of the replicas at the moment. Sending try jobs from codereview is recommended.
备注：现在的副本里还有一些问题。因此，我们还是推荐发送try jobs；

Useful arguments
一些有用的参数
The revision argument tells the try bot what revision of the code base is used for applying your local changes to.
try bot通过版本参数知道你本地的修改应用在哪个版本的代码上。
Without the revision, V8’s LKGR revision is used as the base.
如果没有传版本号，那么就以v8LKGR版本为base；
git cl try --revision=1234
To avoid running your try job on all bots, use the --bot flag with a comma-separated list of builder names. Example:
为了避免在所有bots上跑你的try job，用，隔开你的构建名称与--bot的标记
git cl try --bot=v8_mac_rel
Viewing the try server
git cl try-results
Source code branches
There are several different branches of V8;
现在有几个v8的不同分支；
if you're unsure of which version to get, you most likely want the up-to-date stable version.
如果你不确定自己应该选择哪个分支，可能最适合你的就是获取最新的稳定版本。
Have a look at our Release Process for more information about the different branches used.
你也可以看看我们的发布流程，以获取更多关于不同分支的用途和其他信息。
You may want to follow the V8 version that Chrome is shipping on its stable (or beta) channels, see https://omahaproxy.appspot.com/.
也许你想关注Chrome现在正在使用的稳定（测试版）的v8版本，可以在这里了解更多（https://omahaproxy.appspot.com/）
`