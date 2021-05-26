const content = `
深入typescript

开始学习typescirpt

  Typescript 编译成javascript。（在浏览器中或是服务器中）执行的正是javascript，因此你将会需要以下帮助：
  typescript 编译器(oss可以在github中和npm中获取)
  typescript编辑器（你当然可以使用笔记本，我使用的是vscode并安装了我写的一个扩展包，同时，许多其他的IDE也同样支持他。）

typescript版本

  在这本书中，我们除了使用稳定的typescript编译器之外，还将会展示许多新功能，这可能并不会明确到某个版本号。我越来越推荐大家去使用nightly的版本。因为这样编译器测试包会随着时间，发现更多的bugs
  你可以使用 npm install typescript@next -g 来安装；

  现在命令行tsc将会安装最新的版本。需要IDE也都支持。
  例如：
    你可以通过创建.vscode/setting.json，并加入一下内容，这样可以让vscode来使用这个版本；
        {
              "typescript.tsdk": "./node+modules/typescript/lib"
        }
获取源代码
    本书内的源码都可以在https://github.com/basarat/typescript-book/tree/master/code仓库中找到。
    大多数的代码释例都可以复制到vscode中，并且你可以操作他们；
    有一些代码释例需要额外安装包；例如npm的一些模块，对于这样的情况，在展示代码之前，我们将会提供代码释例的链接；
    
为什么选择typescript?

    typescript有两个主要的目标：
        1. 为javascript提供选择性类型系统
        2. 为从未来的javascript版本到现有的javascript引擎的角度发出，提供计划好的一些特性；

typescript 的类型系统
    你可能在想：为什么要给javascript增加类型？
    Types（类型）一直以来都是为提高代码的质量与可读性添砖加瓦。大型团队（例如：谷歌，微软，脸书）一直以来持续的证明这个结论。明确表示：
    1. 当需要重构的时候，types能提供敏捷度；它能让编译器在编译器时，就能捕获到错误，而不是等到运行时才确定；
    2. types也是一种很好的记录形式；函数签名是论点，而函数体则是论据；

    当然，types也似乎显得有点“过于“隆重（形式化）了，而Typescript所做的，则是为了让这个门槛尽可能的低一些，它是这么做的：

javascript也可以是typescript
    
    typescript为你的js代码提供编译时间，就算给它命名也没什么大不了的。最棒的是types是一个可选项。
    即使.js文件改名为.ts文件，ts会提供有效的，且等同于原本js文件给你的东西。ts其实更是一个带有严格但可选的类型检查功能的js的超集；

types也可以是隐式的
    为了能在开发阶段，在消耗尽可能小的生产率的开销下，ts会试着推测类型信息，并提供给你类型安全。例如，在下面这个例子中，ts会直接foo是number类型，并且会在第二行提示错误；
    var foo = 123;
    foo = '456'; // Error: cannot assign string to number

    // Is foo a number or a string?

    这个类型推测已经是非常有帮助的。如果你写出像这个例子中一样的代码，那么，在接下来的代码中，你肯定没办法确定，foo到底是一个数字类型，还是字符串类型。这样的情况时常在大型的多文件的代码库中出现。
    我们之后也会继续深挖类型推测的规则。

types也可是显式的
    我们之前提到过，ts会尽可能安全的
    当然，你也可以使用注释：
        1. 帮助编译器，或者更重要的是，写在那些重要文件中，那么下一个必须要读你代码的人，就会明白你在做什么（有可能下一个也会是你自己）
        2. 编译器所接收到的，也就是你当时所想的，也就是它应该看到的。那也是你对代码的理解搭配上算法分析（这部分是由编译器完成）
    ts使用在其他选择性注释语言中流行的‘添加后缀类型’来做注释；
    var foo: number = 123;

    因此，如果你写的不符合这个类型，编译器就会报错；
    var foo: number = '123'; // Error: cannot assign a string to a number
    
    我们会在之后的章节里面讨论ts支持的注释语法的所有细节；

types 是有结构的

    在一些语言里（特别是名义上有“类型“语言中），静态类型是基于一些没必要的“仪式”。
    因为尽管你知道代码能够正常工作，但是语法仍要会迫使你copy stuff around.
    这也是为什么对于C#来说，automapper是必不可少的。而在ts中，因为我们尤其希望js的开发者使用方便，对他们造成最小的认知超载，因此ts是有结构的。
    这也意味着，duck typing是第一级语言结构。我们来看下面这个例子。
    function iTakePoint2D 可以接收任何参数。

    interface Point2D {
        x: number;
        y: number;
    }
    interface Point3D {
        x: number;
        y: number;
        z: number;
    }
    var point2D: Point2D = { x: 0, y: 10 }
    var point3D: Point3D = { x: 0, y: 10, z: 20 }
    function iTakePoint2D(point: Point2D) { /* do something */ }

    iTakePoint2D(point2D); // exact match okay
    iTakePoint2D(point3D); // extra information okay
    iTakePoint2D({ x: 0 }); // Error: missing information y

类型错误不能阻止js转译
    为了方便把js代码移植到ts，即使有编译报错，ts还是会尽可能的转译出有效的js代码。
    例如：
    var foo = 123;
    foo = '456'; // Error: cannot assign a string to a number
    将会转译成：
    var foo = 123;
    foo = '456';

    因此你可以逐步的把js代码升级到ts；

types可以是循序渐进的

    之前ts的主要设计目标是，让用户可以安全且方便在ts中使用现有的js库；ts用声明的方法完成这件事；
    ts给用户提供了一个浮动率，这个是用来衡量，你愿意花费多少功夫在声明上。你在这上面花的功夫越多，那么类型安全型和代码越智能；
    为大多数流行的js库所写的定义已经写好，列在这https://github.com/DefinitelyTyped/DefinitelyTyped，主要是为了：
        1. 定义文件已经存在；
        2. 或者你至少有大量很棒的ts声明模版已经存在；
    
    我们快速的在例子中看一下，你应该怎么编写你的声明文件。默认情况下，ts希望你能在使用一个变量之前，要声明它。
    $('.awesome').show(); // Error: cannot find name "$"
    
    快速修复一下这个问题，你可以告诉ts，这里确实有一个东西没，叫$ 
    declare var $: any;
    $('.awesome').show(); // Okay!

    如果除此之外，还能提供更多系信息来防止报错的话，你这样这样做：

    declare var $: {
        (selector:string): any;
    };
    $('.awesome').show(); // Okay!
    $(123).show(); // Error: selector needs to be a string

    我们之后会讨论如何为现有的js代码创建ts定义的细节。

未来的js => 现在

    ts提供了很多为了现在的js引擎（只支持es5等）所在es6语法中出现的新特性。ts团队也一直在积极添加这些新特性并且随着时间的推移，功能也会越来越多，同时，我们也会将它覆盖到它本身的章节中。
    这里提供一个class的例子；

    class Point {
        constructor(public x: number, public y: number) {
        }
        add(point: Point) {
            return new Point(this.x + point.x, this.y + point.y);
        }
    }

    var p1 = new Point(0, 10);
    var p2 = new Point(10, 20);
    var p3 = p1.add(p2); // { x: 10, y: 30 }
    
    再看看这个可爱箭头函数
    
    var inc = x => x+1;

总结

    在这个章节里，我们表明了ts的设计目标和动机。我们还将深入挖掘ts的更多细节。
`