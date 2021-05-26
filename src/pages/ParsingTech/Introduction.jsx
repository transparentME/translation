import MarkdownTransfer from '../../components/MarkdownTransfer'
const Introduction = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

const content= `
Introduction
介绍

Parsing is the process of structuring a linear representation in accordance with a given grammar.
编译是一种依照既定语法的一种线性表达。
This definition has been kept abstract on purpose, to allow as wide an interpretation as possible.
这个定义一直以来是有意解释地如此抽象，就是为了可以被解释的更广义一些。
The “linear representation” may be a sentence, a computer program, a knitting pattern, a sequence of geological strata, a piece of music, actions in ritual behaviour, in short any linear sequence in which the preceding elements in some way restrict(（remarks：If there is no restriction, the sequence still has a grammar, but this grammar is trivial and uninformative. ） the next element.
这种线性表达可以是一句话，一个电脑程序，一个针织图案，地质层的一种物质，仪式中的一段音乐，一些行为，简单来说，任意一种线性的顺序，都可以被理解成是一个元素在某种方式上去限制了另外一个元素。
For some of the examples the grammar is well-known,
就拿众所周知的语法来举例吧，
for some it is an object of research and for some our notion of a grammar is only just beginning to take shape.

For each grammar, there are generally an infinite number of linear representations (“sentences”) that can be structured with it. 
对于每种语法来说，可以使用有无限多的线性表达（句子）以它来构建。
That is, a finite-size grammar can supply structure to an infinite number of sentences.
但是有限的语法可以用来组织无限多的语句。
This is the main strength of the grammar paradigm and indeed the main source of the importance of grammars:
语法范式的关键作用与语法的重要源自于：
they summarize succinctly the structure of an infinite number of objects of a certain class.
他们精简的总结了无限多的拥有某一种特定的类型的对象的结构。
There are several reasons to perform this structuring process called parsing.
其实有许多方案去表达“编译”构建过程：
One reason derives from the fact that the obtained structure helps us to process the object further.
原因之一是因为所得构建，能帮我们更好的处理对象（对象目标）。
When we know that a certain segment of a sentence in German is the subject, that information helps in translating the sentence.
也就是我们当我知道德语的一个语句中的某一个部分是一个主语，那就会有益于翻译句子。
Once the structure of a document has been brought to the surface, it can be converted more easily.
一旦一个文档的架构浮出水面，那么转译他就会变得更加方便。
A second is related to the fact that the grammar in a sense represents our understanding of the observed sentences:
第二是这个语法可以是我们对语句的一种理解的表达。
the better a grammar we can give for the movements of bees, the deeper our understanding of them is.
如果我们对蜜蜂的行为有了更好“语法”概述，那我们对他们的了解会更深刻。

A third lies in the completion of missing information that parsers, and especially error-repairing parsers, can provide.
第三主要归因于编译器，特别是错误修复编译，对于丢失信息的补全。
Given a reasonable grammar of the language, an error-repairing parser can suggest possible word classes for missing or unknown words on clay tablets.
错误补全编译器，可以基于一种有逻辑的语言的语法，以对那些泥板上丢失和未知的文字，给予可能的词进行推荐。
1.1 PARSING AS A CRAFT
编译手艺

Parsing is no longer an arcane art;
编译不再是神秘的艺术；
it has not been so since the early 70’s when Aho, Ullman, Knuth and many others put various parsing techniques solidly on their theoretical feet.
在70世纪的早期，当Aho, Ullman, Knuth还有其他人一起努力落实许多编译技术的时候，就已经不再神秘了。
It need not be a mathematical discipline either;
他也不也用成为一门数学学科；
the inner workings of a parser can be visualized, understood and modified to fit the application, with not much more than cutting and pasting strings.
编译器的内部工作方式可以通过切割与传递字符串来被实现，理解并修改成适合当前的应用中去。
There is a considerable difference between a mathematician’s view of the world and a computer-scientist’s.
数学家的世界观与计算机科学家的世界观有一个明显的区别：
To a mathematician all structures are static: they have always been and will always be;
对于一个数学家来说，一切结构都是静态的：这些结构过去如此，现在如此，将来也是如此。
the only time dependence is that we just haven’t discovered them all yet.
和时间唯一相关之处，是我们还没有把所有静态结构都找出来。 
The computer scientist is concerned with (and fascinated by) the continuous creation, combination, separation and destruction of structures: time is of the essence.
计算机科学家则是关心也着迷于不断的创造、结合、分离、销毁这个构造：时间是他们思考的因素之一（意译）
In the hands of a mathematician, the Peano axioms create the integers without reference to time,
在数学家这里，皮亚诺公理创造去整数，他们并不会参考时间，
but if a computer scientist uses them to implement integer addition, he finds they describe a very slow process, which is why he will be looking for a more efficient approach.
但如果一个计算机科学家利用公理来实现整数加法，他们会发现公理是一种比较慢（复杂）的方式表达的，那么计算机科学家将会去寻找一种更加高效的方式来完成它。
In this respect the computer scientist has more in common with the physicist and the chemist;
从这个方面来说，计算机科学家与物理学家、化学家有更多相似之处。
like these, he cannot do without a solid basis in several branches of applied mathematics, 
如此，他当然肯定需要对应用数学的一些分支有坚实的基础
but, like these,
但是，
he is willing (and often virtually obliged) to take on faith certain theorems handed to him by the mathematician.

Without the rigor of mathematics all science would collapse, but not all inhabitants of a building need to know all the spars and girders that keep it upright.
当然，如果没有严谨的数学，那么所有的科学将会崩塌，但并不是建筑里的所有居民需要了解是由帆桅杆和主梁让建筑屹立不倒。
Factoring off certain detailed knowledge to specialists reduces the intellectual complexity of a task, which is one of the things computer science is about.
通过分解某个对专家来说都是详细知识，以降低了一个任务的知识复杂度，这也就是计算机科学所要做的事情。

This is the vein in which this book is written:
本书的主要内容如下：
parsing for anybody who has parsing to do:
编译是给那些需要用到编译的人们的：
the compiler writer, the linguist, the data-base interface writer, the geologist or musicologist who want to test grammatical descriptions of their respective objects of interest, and so on.
编译器的作者，语言学家，数据库接口作者，地质学家或者音乐学家，那些想要测试他们感兴趣的对象的语法描述。
We require a good ability to visualize, some programming experience and the willingness and patience to follow non-trivial examples;
希望你可以很好的实现他们，拥有一些编程经验并且愿意且耐心的去完成一些不那么简单的例子；
there is nothing better for understanding a kangaroo than seeing it jump.
因为再也没有什么比直接看袋鼠跳跃更能了解袋鼠了。
We treat, of course, the popular parsing techniques, but we will not shun some weird techniques that look as if they are of theoretical interest only:
我们探讨流行的编译技术，但是我们不会回避看起来侧重与理论的怪异的技术。
they often offer new insights and a reader might find an application for them.
这些技术常常提供了新的视角或者读者可能可以找到适合他们的应用。（译的不好）

1.2 THE APPROACH USED
使用方式
This book addresses the reader at at least three different levels.
本书会至少从3个不同的层次向读者表达。
The interested non-computer scientist can read the book as “the story of grammars and parsing”;
感兴趣的非计算机科学家可以将此书作为“语法与编译的故事会来读”
he or she can skip the detailed explanations of the algorithms:
你可以跳过那些对算法的解释：
each algorithm is first explained in general terms.
每个算法将会先以”白话“的方式解释一遍。
The computer scientist will find much technical detail on a wide array of algorithms.
计算机科学家将会在各式各样的算法中寻找到许多技术细节。
To the expert we offer a systematic bibliography of over 400 entries, which is intended to cover all articles on parsing that have appeared in the readily available journals.
对与专家们来说，我们提供了一个系统性的包含超过400项的参考目录，这个目录旨在包含所有有关于编译，并出现在容易获取的报刊书籍中的文章。
Each entry is annotated, providing enough material for the reader to decide if the referred article is worth reading.
每个入口都带有注释，注释里都给读者提供了足够的材料来判断是否值得阅读该材料。
No ready-to-run algorithms have been given, except for the general context-free parser of Chapter 12.
除了在第十二章节中的无关上下文的编译器这一篇中，就没有什么需要马上运行的代码。
The formulation of a parsing algorithm with sufficient precision to enable a programmer to implement and run it without problems requires a considerable supporting mechanism that would be out of place in this book and in our experience does little to increase one’s understanding of the process involved.
一段高效精确的编译算法的公式可以使得一个程序来实现它，准确无误地运行它，是需要重要的支持原理来支持的，也许它没在这本书，或者是你的日常经验中。（翻译的不好。）
The popular methods are given in algorithmic form in most books on compiler construction.
流行方法在很多关于编译器架构的书中都有算法结构的表达。
The less widely used methods are almost always described in detail in the original publication, for which see Chapter 13.
那些受众人群较小的方法会在原版发表物上被详细描述，可以在第13章节找到答案。

1.3 OUTLINE OF THE CONTENTS
内容概要
Since parsing is concerned with sentences and grammars and since grammars are themselves fairly complicated objects, ample attention is paid to them in Chapter 2.
由于编译关注的是语句和语法，且语法又是相当复杂的对象，所以需要重点关注第二章。
Chapter 3 discusses the principles behind parsing and gives a classification of parsing methods.
第三章讨论编译背后的本质，并且分类编译方法。
In summary, parsing methods can be classified as top-down or bottom-up and as directional or non-directional;
总的来说，编译方式可以被分为，自顶而下或自下而上的，方向型（定向型）的或非方向型（定向型）的;
the directional methods can be further distinguished into deterministic and non-deterministic.
定向型方法也可被更细化的分为确定性的和非确定性的。
This scheme dictates the contents of the next few chapters.
这个组合也铺垫了接下来的几个章节的内容。
In Chapter 4 we treat non-directional methods, including Unger and CYK.
在第四章节中，我们会探讨非定向型方法，其中包括Unger与UYK。
Chapter 5 forms an intermezzo with the treatment of finite-state automata, which are needed in the subsequent chapters.
第五章，讲述了有限状态自动机的探讨，它在接下来的几个章节中会被用到。
Chapters 6 through 9 are concerned with directional methods.
第六章至第九章都是关注定向型方法。
Chapter 6 covers non-deterministic directional top-down parsers (recursive descent, Definite Clause Grammars),
第六章内包含非确定性定向型自顶向下的编译器（递归下降，确定子句语法）
Chapter 7 non-deterministic directional bottomup parsers (Earley).
第七章包含非确定性定向型自下而上的编译器(Earley)
Deterministic methods are treated in Chapters 8 (top-down: LL in various forms) and 9 (bottom-up: LR, etc.).
第八章用于探讨确定性方法（自顶向下：LL in various forms ）第九章探讨（自下向上：LR, etc.）
A combined deterministic/nondeterministic method (Tomita) is also described in Chapter 9.
第九章是介绍定向与非定向方法的结合体方法（Tomita）。
That completes the parsing methods per se.
以上是本书关于编译方法本身的所有内容。

Error handling for a selected number of methods is treated in Chapter 10.
第十章探讨了错误处理的选定的一些方法。
The comparative survey of parsing methods in Chapter 11 summarizes the properties of the popular and some less popular methods.
第十一章节中介绍的编译方法的对比研究，概述了流行和相对不那么流行的方法的内容。
Chapter 12 contains the full code in Pascal for a parser that will work for any context-free grammar, to lower the threshold for experimenting.
第十二章中包含Pascal的完整代码，可用与上下文无关的语法，降低体验的门槛。

1.4 THE ANNOTATED BIBLIOGRAPHY
参考书目
The annotated bibliography is presented in Chapter 13 and is an easily accessible supplement of the main body of the book.
第十三章列举了所有的参数书目，并且是本书主体内容的较为简单的获取方式。
Rather than listing all publications in alphabetic order, it is divided into fourteen named sections, each concerned with a particular aspect of parsing;
相比起以字母排序的方式列举所有出版物，这些参考书目被分成14个命名部分，每一个部分都是围绕一个编译的特定方面展开的。
inside the sections, the publications are listed chronologically.
每个部分，出版物都以年份的方式列举出来。
An author index replaces the usual alphabetic list.
以作者为索引
The section name plus year of publication, placed in brackets, are used in the text to refer to an author’s work.
文中通过在括号内展示书目章节的名称加上出版物的出版年份，以找到作者的著作。
For instance, the annotated reference to Earley’s publication of the Earley parser [CF 1970] can be found in the section CF at the position of the papers of 1970.
例如，注释表达的是Earley关于Earley编译方法的发表【CF 1970】就可以在CF部分的1970的论文部分找到。
Since the name of the first author is printed in bold letters, the actual reference is then easily located.
第一个作者的名称将会被加粗打印，因此参考书目的实际为止可以被很容易定位到。
`

export default Introduction
