import MarkdownTransfer from '../../components/MarkdownTransfer'
const Preface = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
const content = `
Preface
前言

Parsing (syntactic analysis) is one of the best understood branches of computer science.
在计算机科学领域中，编译（语法分析）是最广为人知的分支之一。
Parsers are already being used extensively in a number of disciplines: in computer science (for compiler construction, database interfaces, self-describing data-bases, artificial intelligence), in linguistics (for text analysis, corpora analysis, machine translation,
编译器也早已经被广泛运用于许多科目中，比如：计算机科学（编译器构建，数据库接口，自描述数据库, 人工智能），在语言学（文本分析、语料分析、机器翻译、圣经文本分析），在文件准备和转换，在化学式排列，或染色体识别中。
textual analysis of biblical texts), in document preparation and conversion, in typesetting chemical formulae and in chromosome recognition, to name a few;
they can be used (and perhaps are) in a far larger number of disciplines.
而他们可以（也许已经）被更多更广的科目所运用。
It is therefore surprising that there is no book which collects the knowledge about parsing and explains it to the non-specialist.
但让人意外的是，到现在还没有一本可以将编译的知识介绍给非专业的人的书。

Part of the reason may be that parsing has a name for being “difficult”.
原因之一或许是大家提到编辑，就会想到另外一个词：难；
In discussing the Amsterdam Compiler Kit and in teaching compiler construction, it has, however, been our experience that seemingly difficult parsing techniques can be explained in simple terms, given the right approach. 
在我们讨论Amsterdam编译工具和指导编译构建的过程中，发现看起来困难的编译技术，通过合适的方式，就可以用简介的术语解释清楚。
The present book is the result of these considerations.
本书也就是这些考虑因素的结果。
This book does not address a strictly uniform audience. 
此书的受众人群并没有严格条件

On the contrary, while writing this book, we have consistently tried to imagine giving a course on the subject to a diffuse mixture of students and faculty members of assorted faculties, sophisticated laymen, the avid readers of the science supplement of the large newspapers, etc.
相反，我们在编写这本书的适合，我们不断地在试着给不同专业的、不同学院、不同领域的（意译）学生、教工们，工作多年的人、各大报刊的科学类增刊的书迷们上一他们从未上过的一课。
Such a course was never given;
之前从未有过这样的一门课程。

a diverse audience like that would be too uncoordinated to convene at regular intervals, which is why we wrote this book, to be read, studied, perused or consulted wherever or whenever desired.
各行各业的人群会在陆陆续续的聚集到一起，随时随地地阅读它、学习它、预习、咨询（翻阅它），这就是我们想编写这本书的原因。
Addressing such a varied audience has its own difficulties (and rewards).
那么受众人群这么广，那就一定有它自己的困难（与回报）。
Although no explicit math was used, it could not be avoided that an amount of mathematical thinking should pervade this book. 
尽管没有使用详尽的数学，但在这本书里无可避免的会用到大量的数学思维。
Technical terms pertaining to parsing have of course been explained in the book, but sometimes a term on the fringe of the subject has been used without definition.
这本书内与编译有关的技术术语是肯定会被解释的，但书中可能会使用一些没有给予定义的一些学科的边角术语。
Any reader who has ever attended a lecture on a non-familiar subject knows the phenomenon.
参加过自己本不太熟悉的学习的课程的人，一定深有同感。

He skips the term, assumes it refers to something reasonable and hopes it will not recur too often.
讲课人会跳过一些术语，他假定他是有依据的，并且不希望太频繁的被提起。
And then there will be passages where the reader will think we are elaborating the obvious (this paragraph may be one such place).
并且也会有一些让读者认为我们在详细的解释一些显而易见的问题的段落（此时这个段落或许就是如此）。
The reader may find solace in the fact that he does not have to doodle his time away or stare out of the window until the lecturer progresses.
但是至少读者们无需在涂涂画画中，或者无聊到看着窗外来打发时间。

On the positive side, and that is the main purpose of this enterprise, we hope that by means of a book with this approach we can reach those who were dimly aware of the existence and perhaps of the usefulness of parsing but who thought it would forever be hidden behind phrases like:
积极的一面就是，我们这么做的主要目的是希望，通过这本书，我们可以让那些对编译有一点点兴趣的人，或者对编辑的功能有一点了解的、或者觉得编译很有用的人会因为下面的公式而不再想去了解的人们，离得更近。

Let be a mapping VN → 2(VN∪VT)* and a homomorphism ...

No knowledge of any particular programming language is required.
对任何编程语言都不了解也无妨。

The book contains two or three programs in Pascal, which serve as actualizations only and play a minor role in the explanation.
本书包含两到三个用于实现的Pascal程序，但也只是占解析中的很小一部分内容。
What is required, though, is an understanding of algorithmic thinking, especially of recursion.
尽管如此，算法思维，特别是递归的知识，是必须的。
Books like Learning to program by Howard Johnston (Prentice-Hall, 1985) or Programming from first principles by Richard Bornat (Prentice-Hall 1987) provide an adequate background (but supply more detail than required).
像是Howard Johnston (Prentice-Hall, 1985)写的《学习编程》，或者Richard Bornat (Prentice-Hall 1987)写的《编程第一课》中都提供了充足的知识（也提供了许多需求之外的细节）
Pascal was chosen because it is about the only programming language more or less widely available outside computer science environments.
选择Pascal的原因，是因为这个编程语言或多或少的被广泛运用在计算机科学之外的环境中。
The book features an extensive annotated bibliography.
本书的特点之一是有很广的附说明的资料目录；
The user of the bibliography is expected to be more than casually interested in parsing and to possess already a reasonable knowledge of it, either through this book or otherwise.
这个资料目录的使用对象，不论是通过这本书或者是其他途径，希望可以对编译感兴趣，并已经掌握了一定的编译知识。
The bibliography as a list serves to open up the more accessible part of the literature on the subject to the reader;
资料资料作为在这个学科里打开读者们的眼界与通道。（译得不好）
the annotations are in terse technical prose and we hope they will be useful as stepping stones to reading the actual articles.
我们希望那些简单的技术注解会是阅读真正文章的垫脚石。
On the subject of applications of parsers, this book is vague.
在编译应用这个主题上，这本书表述的比较模糊。
Although we suggest a number of applications in Chapter 1, we lack the expertise to supply details.
尽管我们在第一章节里推荐了许多应用，但是我们在细节上还是缺少一些专业知识。
It is obvious that musical compositions possess a structure which can largely be described by a grammar and thus is amenable to parsing, but we shall have to leave it to the musicologists to implement the idea.
很显然，音乐创作很大程度上可以被称之为语法建构，也可以被编译，但我们还是希望将它交给音乐家来完成。
It was less obvious to us that behaviour at corporate meetings proceeds according to a grammar, but we are told that this is so and that it is a subject of socio-psychological research.
但企业会议的言行举止也是依照语法来的，这点很少有人发现，但是我们被告知是如此，这也是社会心理研究的主题之一。

Acknowledgements
感谢
We thank the people who helped us in writing this book.
感谢那些帮助我们完整编写这本书的人。
Marion de Krieger has retrieved innumerable books and copies of journal articles for us and without her effort the annotated bibliography would be much further from completeness.
Marion de Krieger为了这本书检索了无数的书籍和报刊文章的副本，没有她的帮助，资料目录将不会像现在这么完整。
Ed Keizer has patiently restored peace between us and the pic|tbl|eqn|psfig|troff pipeline, on the many occasions when we abused, overloaded or just plainly misunderstood the latter.

Leo van Moergestel has made the hardware do things for us that it would not do for the uninitiated.
Leo van Moergestel帮忙搞定了难搞地硬件设施问题。
We also thank Erik Baalbergen, Frans Kaashoek, Erik Groeneveld, Gerco Ballintijn, Jaco Imthorn, and Egon Amada for their critical remarks and contributions.
我们同样也感谢Erik Baalbergen, Frans Kaashoek, Erik Groeneveld, Gerco Ballintijn, Jaco Imthorn, and Egon Amada，感谢他们的批评性评论和贡献。
The rose at the end of Chapter 2 is by Arwen Grune.
第二章节的尾部的玫瑰花是出自于Arwen Grune。

Ilana and Lily Grune typed parts of the text on various occasions.
We thank the Faculteit Wiskunde en Informatica of the Vrije Universiteit for the use of the equipment.
我们感谢the Faculteit Wiskunde en Informatica of the Vrije Universiteit提供设备的使用。
In a wider sense, we extend our thanks to the hundreds of authors who have been so kind as to invent scores of clever and elegant algorithms and techniques for us to exhibit.
我们希望将我们感谢传递给所有作者们，他们发明了需有聪明且优雅的算法与技术，以供我们展示。
We hope we have named them all in our bibliography.
我们希望我们在我们的参考目录中提到他们所有人。

Dick Grune
Ceriel J.H. Jacobs
Amstelveen/Amsterdam, July 1990; Sept 1998
`

export default Preface