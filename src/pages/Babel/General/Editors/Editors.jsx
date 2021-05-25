import MarkdownTransfer from '../../../../components/MarkdownTransfer'
const Editors = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

const content = `
editors
编辑器

Syntax Highlighting
语法高亮

These days, many popular editors support ES2015+ syntax highlighting out of the box, while some require installing additional extensions.
近期，许多流行的编辑器支持ES2015以及更新版的语法高亮，但某些编辑器前提是需要安装额外的扩展包。
This guide should help you get the syntax highlighting to work.
这个指引会指导你使用语法高亮。
If you're looking for more advanced integrations, you may want to take a look at the Setup （https://babeljs.io/setup）guide.
如果你还在寻找更多高级集成工具，你可能想了解一下安装指引。
Tip: The font used on the screenshot above is FiraCode.
提醒: 上屏幕截图中所使用的字体是FiraCode。

Atom
Install language-babel package and follow the instructions.
依照下面的指引，安装language-babel包
Sublime Text 3
First, install Package Control. Then install Babel package from the Package Control menu and follow the instructions.

Vim
Install the vim-javascript plugin, which brings both improved syntax highlighting and indentation support for JavaScript to Vim.

Another option is to use yajs.vim with es.next.syntax.

Visual Studio Code
Install the vscode-language-babel extension and follow the instructions.

There seems to be one other way to get the syntax highlighting working and you can learn more about it in the Visual Studio Code docs.

WebStorm
WebStorm now ships with support for ES2015+ without requiring the installation of any additional extensions. You may, however, need to enable it.
`

export default Editors