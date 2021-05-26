import MarkdownTransfer from '../../../../components/MarkdownTransfer'
const Documentation = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
const content = `
  Documentation
  文档

  V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. 
  V8是谷歌，用c++开发的开源高性能javascript（下文都将简称：js）、webassembly 引擎。
  It is used in Chrome and in Node.js, among others.
  它被用于Chrome、Node与其他的一些环境中。
  This documentation is aimed at C++ developers who want to use V8 in their applications, as well as anyone interested in V8’s design and performance. 
  这篇文档的目标群体是：想要在自己的应用中使用v8的c++开发者们，与任何对v8的设计和性能感兴趣的人们。
  This document introduces you to V8, while the remaining documentation shows you how to use V8 in your code and describes some of its design details, 
  这篇文档会通过现有文档介绍如何在你的代码中使用v8、阐述一些设计细节，
  as well as providing a set of JavaScript benchmarks for measuring V8’s performance.
  同时，提供一系列用来衡量v8性能的js基准测试；

  About V8
  关于v8

  V8 implements ECMAScript and WebAssembly, and runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors. 
  v8是用来执行ECMAScript和WebAssembly，并可运行在Windows 7及更高版本、macOS 10.12+ 和使用x64、IA-32、ARM或MIPS处理器的Linux系统中。
  V8 can run standalone, or can be embedded into any C++ application.
  V8可独立运行，也可嵌入任何C++应用中运行。

  V8 compiles and executes JavaScript source code, handles memory allocation for objects, and garbage collects objects it no longer needs. 
  V8能编译、执行js源码，分配对象存储空间和垃圾回收；
  V8’s stop-the-world, generational, accurate garbage collector is one of the keys to V8’s performance.
  v8的stop-the-world，新旧生代的处理方式，与垃圾回收的精准收集机制是v8性能的关键之一。

  JavaScript is commonly used for client-side scripting in a browser, being used to manipulate Document Object Model (DOM) objects for example.
  js是被广泛用于浏览器客户侧的脚本语言，例如：它可用来操作DOM对象。
  The DOM is not, however, typically provided by the JavaScript engine but instead by a browser. 
  DOM是典型的由浏览器，而非javascript引擎提供的对象。

  The same is true of V8 — Google Chrome provides the DOM. 
  对v8来说也是如此，DOM是由Google Chrome提供。
  V8 does however provide all the data types, operators, objects and functions specified in the ECMA standard.
  尽管如此，V8也提供了所有ECMA标准中列举的所有数据类型、操作符、对象以及函数方法。

  V8 enables any C++ application to expose its own objects and functions to JavaScript code. 
  v8让任意C++应用都可以暴露应用自己的对象和方法给js代码。
  It’s up to you to decide on the objects and functions you would like to expose to JavaScript.
  因此，到底哪些对象和函数要暴露给js，这都有你来决定。
`
export default Documentation;