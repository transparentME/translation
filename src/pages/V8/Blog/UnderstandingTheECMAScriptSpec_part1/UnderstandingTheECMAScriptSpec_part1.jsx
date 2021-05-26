const content = `
发布于2020年2月3日 分类：ECMAScript

接下来，我们一起试着理解规范里的一个简单的函数的标示吧；

序言

即使你了解javascript，但当你阅读它的规范，也就是ECMAScript语言规范（以下会简称“规范”）可能还是会感觉很吓人。
至少我第一次看的时候，就是这种感觉。

现在我们通过一个实际的例子来了解了解它吧。
下面的代码展示来Object.prototype.hasOwnProperty的使用方式；

const o = { foo: 1 };
o.hasOwnProperty('foo'); // true
o.hasOwnProperty('bar'); // false

在这个例子中，o并没有一个叫hasOwnProperty的属性名，接下来就去查找它的原型链；在对象o原型链中找到了这个属性，即Object.prototype；

为了展示Object.prototype.hasOwnProperty是如何工作的，规范使用类伪代码来解释：

Object.prototype.hasOwnProperty(V)

当hasOwnProperty方法传入参数V，并被调用时，就会经历以下几步：

Let P be ? ToPropertyKey(V).
Let O be ? ToObject(this value).
Return ? HasOwnProperty(O, P).
…等等…

HasOwnProperty(O, P)

HasOwnProperty的抽象操作是用于判断这个对象（object）所是否拥有这个特定的属性值（key）；
返回的是一个布尔值；
这个抽象操作，需传入参数O与P后被调用，O表示待确定的对象（object），P则表示被特定的属性值（key）;
这一步抽象操作执行了以下操作：

声明： （O）是Object类型；
声明：  IsPropertyKey(P) 返回True；
Let desc be ? O.[[GetOwnProperty]](P).
If desc is undefined, return false.
返回 true；
但是，抽象步骤指的是什么呢？在[[]]中的是什么呢？为什么在函数前有个“？” ？这个声明意味着什么？

我们一起来进一步了解！

语言类型和规范类型
我们先从看起来比较相似的两个名次开始。
规范会使用那些我们已经在学习js过程中所了解到的一些值，比如：undefined，true，false等等；他们都是语言值（language value），这些语言类型值在规范中也有定义；

同时，规范内部也会使用语言值，例如，一个内部数据类型有可能是包含一个字段（a field），这个字段的值可能是true 也有可能是false；
相反，Javascript引擎（以后简称“js引擎”）内部往往不会使用语言值；
比如，如果js引擎是用C++写的，那它就会使用C++中的true 和false；
（并不是它内部用来表示js的true和false的标示）

除此之外，关于语言类型，规范中也使用的是规范的类型，这些类型都只会出现在规范中，在js语言中并不会出现；
js引擎不必（但是它还是可以）这么做；
在这篇博客文章中，我们将会了解规范类型的记录（包括他的子类型完工备案 its subtype Completion Record)

抽象操作
在ECMAScript规范中，抽象操作即是函数，定义他们的目的是为了能以简洁地方式描述规范；
js引擎也不用将他们当做真正的若干个函数，并在内部执行他们，因为他们并不能以js的调用函数的方式直接调用他们；

Internal slots 与内部方法
Internal slots 与内部方式都会被[[]]包裹他们的名字；
Internal slots 是js对象或是规范类型的数据成员（data member）组成；
他们是用来存储对象的状态；
内部方式则是js对象的成员函数（member functions）

例如，每个js对象都有一个internal slot[[Prototype]] 和一个内部方法[[GetOwnProperty]]
Internal slots和方法，js都无法获取。例如，你不能通过o.[[Prototype]]或者调用o.[[GetOwnProperty]]()得到对应的值或执行这个方法；
js引擎可以实现internal slot 或内部方式的获取和调用以用来引擎的内部使用，但是这不是必须的；

有时情况下，一些内部方法将调用委派给那些有着相似名称的抽象操作，比如在某些情况下普通对象的[[GetOwnProperty]]方法；

[[GetOwnProperty]](P)

当对象O的内部方法[[GetOwnProperty]]，传入属性值P被调用时，就会执行以下操作：
Return ! OrdinaryGetOwnProperty(O, P).
(在下一章节，我们会知道感叹号表示什么意思)

OrdinaryGetOwnProperty不是一个内部方法，它与任何对象都不相关；反而，它处理的那个对象是作为参数传入这个方法里的。

OrdinaryGetOwnProperty之所以“普通”，是“普通”在他处理的是普通对象。
ECMAScript对象可以是普通对象也可以是独特对象。
普通对象必须对一套称之为“核心的内部方法”有对应的默认行为，如果一个对象它违背了默认行为，则被称之为独特对象；

最被人所熟知的独特对象，就是数组，因为它的长度属性修改、设置等方法并不是以默认方法执行的：比如，设置一个数组的length属性可以通过删减数组内的成员来完成；

重要的内部方法如下：
完工记录（Completion Records）
问好和感叹号表示什么意思？要理解他们，则需要查看完工记录

完工记录是一种规格类型（只用于规格需要）。js引擎内部不需要与之对应的数据类型；

完工记录 
A Completion Record is a “record” — a data type which has a fixed set of named fields. A Completion Record has three fields:
完工记录需要有3个部分组成：
名称         描述
[[Type]]	值分别有：One of: normal, break, continue, return, 和throw. 除了normal之外的所有其他类型都是异常完成；
[[Value]]	这个值是在完成时产生的，例如，当函数返回了一个值或是异常；
[[Target]]	用于直接控制转换transfer（与这篇博文无关）

每个抽象操作都隐式的返回了一个完工记录。
即使看起来是某个抽象操作将返回一个简单类型，例如：布尔，它也是隐式地包裹一个类型值为：normal的完成记录；
要点1: 
Note 1: The spec is not fully consistent in this regard;
there are some helper functions which return bare values and whose return values are used as is, 
without extracting the value from the Completion Record.
This is usually clear from the context.

Note 2: The spec editors are looking into making the Completion Record handling more explicit.

如果算法丢出异常，这意味着它返回一个包含着[[Type]],且丢出一个[[Value]]值为异常对象的完成记录；
但，我们会忽略这个break，并继续执行并且暂时返回类型types；

ReturnIfAbrupt(argument) 会执行以下几步操作：

如果参数是异常的，就返回参数
If argument is abrupt, return argument
Set argument to argument.[[Value]].
That is, we inspect a Completion Record; if it’s an abrupt completion, we return immediately. Otherwise, we extract the value from the Completion Record.

ReturnIfAbrupt might look like a function call, but it’s not. It causes the function where ReturnIfAbrupt() occurs to return, not the ReturnIfAbrupt function itself. It behaves more like a macro in C-like languages.

ReturnIfAbrupt can be used like this:

Let obj be Foo(). (obj is a Completion Record.)
ReturnIfAbrupt(obj).
Bar(obj). (If we’re still here, obj is the value extracted from the Completion Record.)
And now the question mark comes into play: ? Foo() is equivalent to ReturnIfAbrupt(Foo()). Using a shorthand is practical: we don’t need to write the error handling code explicitly each time.

Similarly, Let val be ! Foo() is equivalent to:

Let val be Foo().
Assert: val is not an abrupt completion.
Set val to val.[[Value]].
Using this knowledge, we can rewrite Object.prototype.hasOwnProperty like this:

Object.prototype.hasOwnProperty(P)

Let P be ToPropertyKey(V).
If P is an abrupt completion, return P
Set P to P.[[Value]]
Let O be ToObject(this value).
If O is an abrupt completion, return O
Set O to O.[[Value]]
Let temp be HasOwnProperty(O, P).
If temp is an abrupt completion, return temp
Let temp be temp.[[Value]]
Return NormalCompletion(temp)
…and we can rewrite HasOwnProperty like this:

HasOwnProperty(O, P)

Assert: Type(O) is Object.
Assert: IsPropertyKey(P) is true.
Let desc be O.[[GetOwnProperty]](P).
If desc is an abrupt completion, return desc
Set desc to desc.[[Value]]
If desc is undefined, return NormalCompletion(false).
Return NormalCompletion(true).
We can also rewrite the [[GetOwnProperty]] internal method without the exclamation mark:

O.[[GetOwnProperty]]

Let temp be OrdinaryGetOwnProperty(O, P).
Assert: temp is not an abrupt completion.
Let temp be temp.[[Value]].
Return NormalCompletion(temp).
Here we assume that temp is a brand new temporary variable which doesn’t collide with anything else.

We’ve also used the knowledge that when a return statement returns something else than a Completion Record, it’s implicitly wrapped inside a NormalCompletion.

Side track: Return ? Foo()
The spec uses the notation Return ? Foo() — why the question mark?

Return ? Foo() expands to:

Let temp be Foo().
If temp is an abrupt completion, return temp.
Set temp to temp.[[Value]].
Return NormalCompletion(temp).
Which is the same as Return Foo(); it behaves the same way for both abrupt and normal completions.

Return ? Foo() is only used for editorial reasons, to make it more explicit that Foo returns a Completion Record.

Asserts
Asserts in the spec assert invariant conditions of the algorithms. They are added for clarity, but don't add any requirements to the implementation — the implementation doesn’t need to check them.

Moving on
We have built the understanding needed for reading the spec for simple methods like Object.prototype.hasOwnProperty and abstract operations like HasOwnProperty. They still delegate to other abstract operations, but based on this blog post we should be able to figure out what they do. We’ll encounter Property Descriptors, which is just another specification type.


Function call graph starting from Object.prototype.hasOwnProperty
Useful links
How to Read the ECMAScript Specification: a tutorial which covers much of the material covered in this post, from a slightly different angle.
`