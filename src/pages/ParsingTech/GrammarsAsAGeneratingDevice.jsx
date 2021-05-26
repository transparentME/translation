import MarkdownTransfer from '../../components/MarkdownTransfer'

const content = `2.1 LANGUAGES AS INFINITE SETS
语言是一种无限的集合
In computer science as in everyday parlance, a “grammar” serves to “describe” a “language”.
在我们日常所提到的计算机科学中，“语法”就是用来“描述”一门“语言”的。
If taken on face value, this correspondence, however, is misleading, since the computer scientist and the native speaker mean slightly different things by the three terms.
如果从表面意思来看，多少有些误导人，因为计算机科学家和native speaker两种角色对这三个字的理解有些许的不同。
To establish our terminology and to demarcate the universe of discourse, we shall examine the above terms, starting with the last one.
为了证实我们的术语，或者去划分讨论范围，我们将验证上述术语，首先从最后一个开始。

2.1.1 Language
语言
To the larger part of mankind, language is first and foremost a means of communication, to be used almost unconsciously, certainly so in the heat of a debate.
对于绝大部分的人类来说，语言是第一个也是最重要的沟通方式之一，它不自觉地就会被使用，在激烈的辩论中也是如此。
Communication is brought about by sending messages, through air vibrations or through written symbols.
尽管空气震动或书写标志也可以，但沟通是用来传递信息主要方式。
Upon a closer look the language messages (“utterances”) fall apart into sentences, which are composed of words, which in turn consist of symbol sequences when written.
仔细观察语言信息（表达），每个句子都是由字词组成，而字词又是由符号序列而组成。
Languages can differ on all these three levels of composition.

The script can be slightly different, as between English and Irish, or very different, as between English and Chinese.
脚本可以如同英语与爱尔兰语之间的差别一样小，也可以如同英文与中文之间的差别一样大。
Words tend to differ greatly and even in closely related languages people call un cheval or ein Pferd, that which is known to others as a horse.

Differences in sentence structure are often underestimated;
语句结构之间的差别常常被低估；
even the closely related Dutch often has an almost Shakespearean word order: “Ik geloof je niet”, “I believe you not”, and unrelated languages readily come up with constructions like the Hungarian “Pénzem van”, “Money-my is”, where the English say “I have money”.

The computer scientist takes a very abstracted view of all this.
计算机科学家对于这一切都以一种高度抽象的角度来看待这一切。
Yes, a language has sentences, and these sentences possess structure;
是的，无数的语句组成了语言，而这些语句都有结构；
whether they communicate something or not is not his concern, but information may possibly be derived from their structure and then it is quite all right to call that information the meaning of the sentence.
他们是否讨论了什么都不是他所关心的事情，但是信息可能从他们的结构中来，而且你将那些信息称之为是这个语句想表达的含义，是很OK的。
And yes, sentences consist of words, which he calls tokens, each possibly carrying a piece of information, which is its contribution to the meaning of the whole sentence.
同样，语句是从词语构成，被他称之为tokens，每个token都可能携带一个信息，并且它构成了整个句子的表达的一部分。
But no, words cannot be broken down any further.
但是，字词就再不能被细分了。
The computer scientist is not worried by this.
计算机科学家不会纠结于这个。
With his love of telescoping solutions and multi-level techniques, he blithely claims that if words turn out to have structure after all, they are sentences in a different language, of which the letters are the tokens.
带着他对可伸缩方案和多层技术的热爱，他可以放心的表示，如果词语也有结构，那么在不同的语言中，句子中的字母就是token。

The practitioner of formal linguistics, henceforth called the formal-linguist (to distinguish him from the “formal linguist”, the specification of whom is left to the imagination of the reader) again takes an abstracted view of this.
形式语言学的从业者，也被称之为“形式语言学家”（这么称呼是为了将他与形式语言学从业者做区分，是为了留下一点想象空间给读者），对此也是以一个抽象的视角来看这个问题。
A language is a “set” of sentences, and each sentence is a “sequence” of “symbols”;
语言是是“一组”语句，每个语句也是标志的一系列排序。
that is all there is: no meaning, no structure, either a sentence belongs to the language or it does not.
没有含义，没有结构，也没有
The only property of a symbol is that it has an identity;
标示所唯一拥有的就是它的特性。
in any language there are a certain number of different symbols, the alphabet, and that number must be finite.
在任何一种语言中，都有许多不同的标志，字母，且他们的数量是有限的。
Just for convenience we write these symbols as a,b,c . . . , but ✆, ✈, ❑, . . . would do equally well, as long as there are enough symbols.
为了方便起见，我们可以写下这些标志a,b,c, 其实✆, ✈, ❑, 也是可以的，只要有足够多的标示。
The word sequence means that the symbols in each sentence are in a fixed order and we should not shuffle them.
文字顺序，可以理解为，在每一个语句中，都是以一种固定的顺序排列，并且我们不可随意更改这个顺序。
The word set means an unordered collection with all the duplicates removed;
词汇集合表达的是一种没有重复的无序的集合。
a set can be written down by writing the objects in it, surrounded by curly brackets.
集合可以通过花括号包围，并且把对对象都写在里面。
All this means that to the formal-linguist the following is a language: {a, b, ab, ba}, and so is {a, aa, aaa, aaaa, . . . } although the latter has notational problems that will be solved later.
这也就意味着，对于形式语言学家来说，以下就是一种语言：{a, b, ab, ba}，{a, aa, aaa, aaaa, . . . }也是，尽管后者有计数问题，但是我们在后面将会解决这个问题。
In accordance with the correspondence that the computer scientist sees between sentence/word and word/letter, the formal-linguist also calls a sentence a word and he says that “the word ab is in the language {a, b, ab, ba}”.
和计算机科学家们看语句与字，字与字母的关系一样，形式语言家同样也会表达，他说ab这个字，是在{a, b, ab, ba}这个语言中。（翻译的不好）
Now let’s consider the implications of these compact but powerful ideas.
现在我们思考这些精炼且强大的想法中所蕴含的含义。

To the computer scientist, a language is a probably infinitely large set of sentences, each composed of tokens in such a way that it has structure;
对于一个计算机科学家来说，一门语言可能是巨大的无限的语句的集合，每个语句都是又由许许多多的token以某种特定的构成方式所组成起来的。
the tokens and the structure cooperate to describe the semantics of the sentence, its “meaning” if you will.
tokens 和 结构共同描述了一个句子的语义，你也可能称之为“含义”。
Both the structure and the semantics are new, that is, were not present in the formal
结构与语义都是新的，也就是说，它并不是在形式模型上所呈现出来的。
model, and it is his responsibility to provide and manipulate them both.
（his没明白是什么）

To a computer scientist 3+4*5 is a sentence in the language of “arithmetics on single digits” (“single digits” to avoid having an infinite number of symbols), its structure can be shown, for instance, by inserting parentheses: (3+(4*5)) and its semantics is probably 23.
对于一个计算机科学家来说， 3+4*5 在个位数计算语言中是一个语句。（用个位数，是为了避免有无限个符号）, 在这里可以通过加入括号来看看他的结构：(3+(4*5))，并且他的语义是23.
To the linguist, whose view of languages, it has to be conceded, is much more normal than that of either of the above, a language is an infinite set of possibly interrelated sentences.
对于语言学家的语言观来说，是有取舍的，相比起上面相比更普通寻常一些，语言是无限组相互关联的语句组成的。
Each sentence consists, in a structured fashion, of words which have a meaning in the real world.
每个语句中对以一种结构化的方式，包含了许多字，且他们都在现实世界中有实际的意义。

Structure and words together give the sentence a meaning, which it communicates.
结构与字一起才赋予了在交流时的一个句子意义。
Words, again, possess structure and are composed of letters;
再提一次，词汇拥有结构，并是由字母组成的。
the letters cooperate with some of the structure to give a meaning to the word.
字母与结构一起，才能拼凑一个字的含义。
The heavy emphasis on semantics, the relation with the real world and the integration of the two levels sentence/word and word/letters are the domain of the linguist.
强调以下语义，与真实世界的联系、语句/词汇 和 词汇/字母之间的集合都是语义学中的领域。
“The circle spins furiously” is a sentence, “The circle sleeps red” is nonsense.
“圈圈在疯狂地旋转”是一个句子，“圈圈 睡觉 红的”是没有意义的。

The formal-linguist holds his views of language because he wants to study the fundamental properties of languages in their naked beauty;
形式语言家坚持他对语言的一些看法，是因为他希望可以学习语言基本性质的本身的美。
the computer scientist holds his because he wants a clear, well-understood and unambiguous means of describing objects in the computer and of communication with the computer, a most exacting communication partner, quite unlike a human;
而计算机科学家秉持了他的看法，是因为他想要一个清晰、易理解的、不含糊的方法来描述计算机领域的一些对象（事物），来与计算机交流，他也是一个苛刻的沟通对象，和人类很不一样。
and the linguist holds his view of language because it gives him a formal tight grip on a seemingly chaotic and perhaps infinitely complex object: natural language.
并且语义学持着他对语言的观点，因为它可以给看起来无序的，甚至是无限复杂的对象：自然语言，一个严格的扶手。


2.1.2 Grammars
语法
Everyone who has studied a foreign language knows that a grammar is a book of rules and examples which describes and teaches the language.
任何一个学习过一门外国语言的人都知道，语法都是一本讲规则和示例的书，他们分别是用来描述，和指导你学习语言。
Good grammars make a careful distinction between the sentence/word level, which they often call syntax or syntaxis, and the word/letter level, which they call grammar.
好的语法会仔细区分语句/词汇，也就是常说的语法与衔接，与词汇与字母的区别。
Syntax contains rules like “pour que is followed by the subjunctive, but parce que is not”;
句法包含像是“pour que应接虚拟语气而parce que则不行”的规定；
grammar contains rules like “the plural of an English noun is formed by appending an -s, except when the word ends in -s, -sh, -o, -ch or -x, in which case -es is appended, or when the word has an irregular plural.”
语法包含像是“英语名次表达复数时，后面应该接-s，但以-s, -sh, -o, -ch 或者 -x需要加上-es，或者有些名词有不规则复数变化”这样的规定。
We skip the computer scientist’s view of a grammar for the moment and proceed immediately to the formal-linguist’s one.
我们暂时忽略计算机科学家们对语法的观点，来看看形式语言家的观点。
His view is at the same time very abstract and quite similar to the above: a grammar is any exact, finite-size, complete description of the language, i.e., of the set of sentences.
他对此的观点很抽象且与上面的所述的很相似：语法就是对语言的一种严苛的、有限大小的、完整表述。
This is in fact the school grammar, with the fuzziness removed.
这是在学校所学的语法，并且没有那些模糊不清的部分。
Although it will be clear that this definition has full generality, it turns out that it is too general, and therefore relatively powerless.
尽管这个定义有普适性，但是也因为太泛，因此无法解释清楚。
It includes descriptions like “the set of sentences that could have been written by Chaucer”;
它包含了类似“这一系列语句本应该被Chaucer所写”。
platonically speaking this defines a set, but we have no way of creating this set or testing whether a given sentence belongs to this language.
这样的解释太过理想，但是却无法创造或验证，提供的话是否术语这个语言。
This particular example, with its “could have been” does not worry the formal-linguist, but there are examples closer to his home that do.

“The longest block of consecutive sevens in the decimal expansion of π” describes a language that has at most one word in it (and then that word will consist of sevens only), and as a definition it is exact, finite-size and complete.

One bad thing with it, however, is that one cannot find this word; suppose one finds a block of one hundred sevens after billions and billions of digits, there is always a chance that further on there is an even longer block.

And another bad thing is that one cannot even know if such a longest block exists at all.
It is quite possible that, as one proceeds further and further up the decimal expansion of π, one would find longer and longer stretches of sevens, probably separated by ever-increasing gaps.
A comprehensive theory of the decimal expansion of π might answer these questions, but no such theory exists.
For these and other reasons, the formal-linguists have abandoned their static, platonic view of a grammar for a more constructive one, that of the generative grammar: a generative grammar is an exact, fixed-size recipe for constructing the sentences in the language.
This means that, following the recipe, it must be possible to construct each sentence of the language (in a finite number of actions) and no others.
This does not mean that, given a sentence, the recipe tells us how to construct that particular sentence, only that it is possible to do so.
Such recipes can have several forms, of which some are more convenient than others.
The computer scientist essentially subscribes to the same view, often with the additional requirement that the recipe should imply how a sentence can be constructed.

2.1.3 Problems
The above definition of a language as a possibly infinite set of sequences of symbols, and of a grammar as a finite recipe to generate these sentences, immediately gives rise to two embarrassing questions:

1. How can finite recipes generate enough infinite sets of sentences?
    如果用有限方法来产生无限都的语句？
2. If a sentence is just a sequence and has no structure and if the meaning of a sentence derives, among other things, from its structure, how can we assess the meaning of a sentence?
    如果语句没有结构，只有顺序，那么当语句的意义来自于它的结构，那我们应该如何掌握语句的意思呢？
These questions have long and complicated answers, but they do have answers.
这两个问题都有又长又复杂的答案，但是他们有答案。
We shall first pay some attention to the first question and then devote the main body of this book to the second.
本书会适当关注第一个问题，但把主要的内容放在第二个问题上。

2.1.3.1 Infinite sets from finite descriptions
    有限的描述创造无限的语句
In fact there is nothing wrong with getting a single infinite set from a single finite description: “the set of all positive integers” is a very finite-size description of a definitely infinite-size set.
Still, there is something disquieting about the idea, so we shall rephrase our question: “Can all languages be described by finite descriptions?”.
但是，这个想法似乎有点让人不安，所以我们可以重述我们的问题："有限的描述是有可以叙述所有的语言的吗？"
As the lead-up already suggests, the answer is “No”, but the proof is far from trivial.

It is, however, very interesting and famous, and it would be a shame not to present at least an outline of it here.


2.1.3.2 Descriptions can be enumerated
The proof is based on two observations and a trick. The first observation is that descriptions can be listed and given a number.
This is done as follows.
First, take all descriptions of size one, that is, those of only one letter long, and sort them alphabetically.
This is the beginning of our list.
Depending on what, exactly, we accept as a description, there may be zero descriptions of size one, or 27 (all letters + space), or 128 (all ASCII characters) or some such;
this is immaterial to the discussion which follows.
Second, we take all descriptions of size two, sort them alphabetically to give the second chunk on the list, and so on for lengths 3, 4 and further.
This assigns a position on the list to each and every description.
Our description “the set of all positive integers”, for instance, is of size 32, not counting the quotation marks.
To find its position on the list, we have to calculate how many descriptions there are with less than 32 characters, say L. We then have to generate all descriptions of size 32, sort them and determine the position of our description in it, say P, and add the two numbers L and P.
This will, of course, give a huge number† but it does ensure that the description is on the list, in a well-defined position; see Figure 2.1.
{ descriptions of size 1 { descriptions of size 2 { descriptions of size 3 . . . . . {descriptions of size 31
L . . . . . . . . . . . . . . . . . . . . . . . {
descriptions of size 32
“the set of all positive integers”
P
Figure 2.1 List of all descriptions of length 32 or less
Two things should be pointed out here. The first is that just listing all descriptions
alphabetically, without reference to their lengths, would not do: there are already infin￾itely many descriptions starting with an “a” and no description starting with a higher ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† Some (computer-assisted) calculations tell us that, under the ASCII-128 assumption, the
number is 248 17168 89636 37891 49073 14874 06454 89259 38844 52556 26245 57755 89193
30291, or roughly 2.5*1067
.

letter could get a number on the list.
The second is that there is no need to actually do all this.
It is just a thought experiment that allows us to examine and draw conclusion about the behaviour of a system in a situation which we cannot possibly examine physically.
Also, there will be many nonsensical descriptions on the list;
it will turn out that this is immaterial to the argument.
The important thing is that all meaningful descriptions are on the list, and the above argument ensures that.

2.1.3.3 Languages are infinite bit-strings
We know that words (sentences) in a language are composed of a finite set of symbols;
this set is called quite reasonably the alphabet.
We will assume that the symbols in the alphabet are ordered.
Then the words in the language can be ordered too.
We shall indicate the alphabet by Σ.
Now the simplest language that uses alphabet Σ is that which consists of all words that can be made by combining letters from the alphabet.
For the alphabet Σ={a, b} we get the language { , a, b, aa, ab, ba, bb, aaa, . . . }.
We shall call this language Σ*, for reasons to be explained later;
for the moment it is just a name.
The set notation Σ* above started with “ { , a,”, a remarkable construction;
the first word in the language is the empty word, the word consisting of zero a’s and zero b’s.
There is no reason to exclude it, but, if written down, it may easily get lost, so we shall write it as ε (epsilon), regardless of the alphabet.
So, Σ*= {ε, a, b, aa, ab, ba, bb, aaa, . . . }.
In some natural languages, forms of the present tense of the verb “to be” are the empty word, giving rise to sentences of the form “I student”;
Russian and Hebrew are examples of this.
Since the symbols in the alphabet Σ are ordered, we can list the words in the language Σ*, using the same technique as in the previous section: First all words of size zero, sorted; then all words of size one, sorted; and so on.
This is actually the order already used in our set notation for Σ*.
The language Σ* has the interesting property that all languages using alphabet Σ are subsets of it.
That means that, given another possibly less trivial language over Σ, called L, we can go through the list of words in Σ* and put ticks on all words that are in L.
This will cover all words in L, since Σ* contains any possible word over Σ.
Suppose our language L is “the set of all words that contain more a’s than b’s”.
L={a, aa, aab, aba, baa, . . . }.
The beginning of our list, with ticks, will look as follows:
ε
✔ ab
✔ aa
ab
ba
bb
✔ aaa
✔ aab
✔ aba
abb
✔ baa
bab
bba
bbb
✔ aaaa
... ...
Given the alphabet with its ordering, the list of blanks and ticks alone is entirely sufficient to identify and describe the language.
For convenience we write the blank as a 0 and the tick as a 1 as if they were bits in a computer, and we can now write L=0101000111010001 . . . (and Σ*=1111111111111111 . . . ).
It should be noted that this is true for any language, be it a formal language like L, a programming language like Pascal or a natural language like English.
In English, the 1’s in the bit-string will be very scarce, since hardly any arbitrary sequence of words is a good English sentence (and hardly any arbitrary sequence of letters is a good English word, depending on whether we address the sentence/word level or the word/letter level).

2.1.3.4 Diagonalization
The previous section attaches the infinite bit-string 0101000111010001... to the description “the set of all the words that contain more a’s than b’s”.
In the same vein we can attach such bit-strings to all descriptions; some descriptions may not yield a language, in which case we can attach an arbitrary infinite bit-string to it.
Since all descriptions can be put on a single numbered list, we get, for instance, the following picture:
Description Language
Description #1 000000100...
Description #2 110010001...
Description #3 011011010...
Description #4 110011010...
Description #5 100000011...
Description #6 111011011...
... ...
At the left we have all descriptions, at the right all languages they describe. We now
claim that many languages exist that are not on the list of languages above: the above
list is far from complete, although the list of descriptions is complete. We shall prove
this by using the diagonalization process (“Diagonalverfahren”) of Cantor.
Consider the language C=100110 . . . , which has the property that its n-th bit is
unequal to the n-th bit of the language described by Description #n. The first bit of C is
a 1, because the first bit for Description #1 is a 0; the second bit of C is a 0, because the
second bit for Description #2 is a 1, and so on. C is made by walking the NW to SE
diagonal of the language field and copying the opposites of the bits we meet.
The language C cannot be on the list! It cannot be on line 1, since its first bit
differs (is made to differ, one should say) from that on line 1, and in general it cannot
be on line n, since its n-th bit will differ from that on line n, by definition.
So, in spite of the fact that we have exhaustively listed all possible finite descrip￾tions, we have at least one language that has no description on the list. Moreover, any
broken diagonal yields such a language, where a diagonal is “broken” by replacing a
22 Grammars as a generating device [Ch. 2
section of it as follows,
..................... . . . . . . . . . . . . . . . . . . . .................... . . . . . . . . . . .. . . . . . . . . . . .................... . . . . . . . . . . . . . . . . . . . . . → ..................... . . . . . . . . . . . . . . . . . . . .................... . . . . . . . . . . .. . . . . . . . . . . .................... . . . . . . . . . . . . . . . . . . . . .
and so does any multiply-broken diagonal. In fact, for each language on the list, there
are infinitely many languages not on it; this statement is, however, more graphical than
it is exact, and we shall not prove it.
The diagonalization technique is described more formally in most books on
theoretical computer science; see e.g., Rayward-Smith [Books 1983, pp. 5-6] or Hop￾croft and Ullman [Books 1979, pp 6-9].
2.1.3.5 Conclusions
The above demonstration shows us several things. First, it shows the power of treating
languages as formal objects. Although the above outline clearly needs considerable
amplification and substantiation to qualify as a proof (for one thing it still has to be
clarified why the above explanation, which defines the language C, is not itself on the
list of descriptions), it allows us to obtain insight in properties not otherwise assessable.
Secondly, it shows that we can only describe a tiny subset (not even a fraction) of
all possible languages: there is an infinity of languages out there, forever beyond our
reach.
Thirdly, we have proved that, although there are infinitely many descriptions and
infinitely many languages, these infinities are not equal to each other and that the latter
is larger than the former. These infinities are called ℵ0 and ℵ1 by Cantor, and the
above is just an adaptation of his proof that ℵ0<ℵ1.
2.1.4 Describing a language through a finite recipe
A good way to build a set of objects is to start with a small object and to give rules how
to add to it and construct new objects from it. “Two is an even number and the sum of
two even numbers is again an even number” effectively generates the set of all even
numbers. Formalists will add “...and no other numbers are even”, but we’ll skip that.
Suppose we want to generate the set of all enumerations of names, of the type
“Tom, Dick and Harry”, in which all names but the last two are separated by commas.
We will not accept “Tom, Dick, Harry” nor “Tom and Dick and Harry”, but we shall
not object to duplicates: “Grubb, Grubb and Burrowes”†
is all right. Although these are
not complete sentences in normal English, we shall still call them sentences since that
is what they are in our midget language of name enumerations. A simple-minded recipe
would be:
0. Tom is a name, Dick is a name, Harry is a name;
1. a name is a sentence; ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† The Hobbit, by J.R.R. Tolkien, Allen and Unwin, 1961, p. 311.
Sec. 2.1] Languages as infinite sets 23
2. a sentence followed by a comma and a name is again a sentence;
3. before finishing, if the sentence ends in “, name”, replace it by
“and name”.
Although this will work for a cooperative reader, there are several things wrong
with it. Clause 3 is especially wrought with trouble. For instance, the sentence does not
really end in “, name”, it ends in “, Dick” or such, and “name” is just a symbol that
stands for a real name; such symbols cannot occur in a real sentence and must in the
end be replaced by a real name as given in clause 0. Likewise, the word “sentence” in
the recipe is a symbol that stands for all the actual sentences. So there are two kinds of
symbols involved here: real symbols, which occur in finished sentences, like “Tom”,
“Dick”, a comma and the word “and”; and there are intermediate symbols, like “sen￾tence” and “name” that cannot occur in a finished sentence. The first kind corresponds
to the words or tokens explained above and the technical term for them is terminal sym￾bols (or terminals for short) while the latter are called non-terminals (a singularly unin￾spired term). To distinguish them, we write terminals in small letters and start non￾terminals with a capital.
To stress the generative character of the recipe, we shall replace “X is a Y” by “Y
may be replaced by X”: if “tom” is an instance of a Name, then everywhere we have a
Name we may narrow it down to “tom”. This gives us:
0. Name may be replaced by “tom”
Name may be replaced by “dick”
Name may be replaced by “harry”
1. Sentence may be replaced by Name
2. Sentence may be replaced by Sentence, Name
3. “, Name” at the end of a Sentence must be replaced by “and Name”
before Name is replaced by any of its replacements
4. a sentence is finished only when it no longer contains non-terminals
5. we start our replacement procedure with Sentence
Clause 0 through 3 describe replacements, but 4 and 5 are different. Clause 4 is not
specific to this grammar. It is valid generally and is one of the rules of the game.
Clause 5 tells us where to start generating. This name is quite naturally called the start
symbol, and it is required for every grammar.
Still clause 3 looks worrisome; most rules have “may be replaced”, but this one
has “must be replaced”, and it refers to the “end of a Sentence”. The rest of the rules
work through replacement, but the problem remains how we can use replacement to
test for the end of a Sentence. This can be solved by adding an end-marker after it. And
if we make the end-marker a non-terminal which cannot be used anywhere except in
the required replacement from “, Name” to “and Name”, we automatically enforce the
restriction that no sentence is finished unless the replacement test has taken place. For
brevity we write -> instead of “may be replaced by”; since terminal and non-terminal
symbols are now identified as technical objects we shall write them in a typewriter-like
typeface. The part before the -> is called the left-hand side, the part after it the right￾hand side. This results in the recipe in Figure 2.2.
This is a simple and relatively precise form for a recipe, and the rules are equally
straightforward: start with the start symbol, and keep replacing until there are no non-
24 Grammars as a generating device [Ch. 2
0. Name -> tom Name -> dick Name -> harry
1. Sentence -> Name Sentence -> List End
2. List -> Name List -> List , Name
3. , Name End -> and Name
4. the start symbol is Sentence
Figure 2.2 A finite recipe for generating strings in the t, d & h language
terminals left.
2.2 FORMAL GRAMMARS
The above recipe form, based on replacement according to rules, is strong enough to
serve as a basis for formal grammars. Similar forms, often called “rewriting systems”,
have a long history among mathematicians, but the specific form of Figure 2.2 was first
studied extensively by Chomsky [Misc 1959]. His analysis has been the foundation for
almost all research and progress in formal languages, parsers and a considerable part of
compiler construction and linguistics.
Since formal languages are a branch of mathematics, work in this field is done in
a special notation which can be a hurdle to the uninitiated. To allow a small peep into
the formal linguist’s kitchen, we shall give the formal definition of a grammar and then
explain why it describes a grammar like the one in Figure 2.2. The formalism used is
indispensable for correctness proofs, etc., but not for understanding the principles; it is
shown here only to give an impression and, perhaps, to bridge a gap.
Definition 2.1: A generative grammar is a 4-tuple (VN,VT,R,S) such that (1) VN
and VT are finite sets of symbols, (2) VN∩VT = ∅, (3) R is a set of pairs (P,Q) such
that (3a) P∈(VN∪VT)+
and (3b) Q∈(VN∪VT)*, and (4) S∈VN. A 4-tuple is just an object consisting of 4 identifiable parts; they are the non￾terminals, the terminals, the rules and the start symbol, in that order; the above defini￾tion does not tell this, so this is for the teacher to explain. The set of non-terminals is
named VN and the set of terminals VT. For our grammar we have:
VN = {Name, Sentence, List, End} VT = {tom, dick, harry, ,, and}
(note the , in the set of terminal symbols).
The intersection of VN and VT (2) must be empty, that is, the non-terminals and
the terminals may not have a symbol in common, which is understandable.
R is the set of all rules (3), and P and Q are the left-hand sides and right-hand
sides, respectively. Each P must consist of sequences of one or more non-terminals
and terminals and each Q must consist of sequences of zero or more non-terminals and
terminals. For our grammar we have:
R = {(Name, tom), (Name, dick), (Name, harry),
Sec. 2.2] Formal grammars 25
(Sentence, Name), (Sentence, List End),
(List, Name), (List, List , Name), (, Name End, and Name)}
Note again the two different commas.
The start symbol S must be an element of VN, that is, it must be a non-terminal:
S = Sentence
This concludes our field trip into formal linguistics; the reader can be assured that
there is lots and lots more. A good simple introduction is written by Révész [Books
1985].
2.2.1 Generating sentences from a formal grammar
The grammar in Figure 2.2 is what is known as a phrase structure grammar for our
t,d&h language (often abbreviated to PS grammar). There is a more compact notation,
in which several right-hand sides for one and the same left-hand side are grouped
together and then separated by vertical bars, |. This bar belongs to the formalism, just
as the arrow -> and can be read “or else”. The right-hand sides separated by vertical
bars are also called alternatives. In this more concise form our grammar becomes:
0. Name -> tom | dick | harry
1. SentenceS -> Name | List End
2. List -> Name | Name , List
3. , Name End -> and Name
where the non-terminal with the subscript S
is the start symbol. (The subscript S
identi￾fies the symbol, not the rule.)
Now let’s generate our initial example from this grammar, using replacement
according to the above rules only. We obtain the following successive forms for Sen- tence:
Intermediate form Rule used Explanation
Sentence the start symbol
List End Sentence -> List End rule 1 Name , List End List -> Name , List rule 2 Name , Name , List End List -> Name , List rule 2 Name , Name , Name End List -> Name rule 2 Name , Name and Name , Name End -> and Name rule 3 tom , dick and harry rule 0, three times
The intermediate forms are called sentential forms; if a sentential form contains no
non-terminals it is called a sentence and belongs to the generated language. The transi￾tions from one line to the next are called production steps and the rules are often called
production rules, for obvious reasons.
The production process can be made more visual by drawing connective lines
between corresponding symbols, as shown in Figure 2.3. Such a picture is called a pro￾duction graph or syntactic graph, because it depicts the syntactic structure (with regard
to the given grammar) of the final sentence. We see that the production graph normally
26 Grammars as a generating device [Ch. 2 Sentence List End Name , List Name , List , Name End and Name tom , dick and harry
Figure 2.3 Production graph for a sentence
fans out downwards, but occasionally we may see starlike constructions, which result
from rewriting a group of symbols.
It is patently impossible to have the grammar generate tom, dick, harry,
since any attempt to produce more than one name will drag in an End and the only way
to get rid of it again (and get rid of it we must, since it is a non-terminal) is to have it
absorbed by rule 3, which will produce the and. We see, to our amazement, that we
have succeeded in implementing the notion “must replace” in a system that only uses
“may replace”; looking more closely, we see that we have split “must replace” into
“may replace” and “must not be a non-terminal”.
Apart from our standard example, the grammar will of course also produce many
other sentences; examples are:
harry and tom harry tom, tom, tom, and tom
and an infinity of others. A determined and foolhardy attempt to generate the incorrect
form without the and will lead us to sentential forms like:
tom, dick, harry End
which are not sentences and to which no production rule applies. Such forms are called
blind alleys. Note that production rules may not be applied in the reverse direction.
Sec. 2.2] Formal grammars 27
2.2.2 The expressive power of formal grammars
The main property of a formal grammar is that it has production rules, which may be
used for rewriting part of the sentential form (= sentence under construction) and a
starting symbol which is the mother of all sentential forms. In the production rules we
find non-terminals and terminals; finished sentences contain terminals only. That is
about it: the rest is up to the creativity of the grammar writer and the sentence pro￾ducer.
This is a framework of impressive frugality and the question immediately rises: Is
it sufficient? Well, if it isn’t, we don’t have anything more expressive. Strange as it
may sound, all other methods known to mankind for generating sets have been proved
to be equivalent to or less powerful than a phrase structure grammar. One obvious
method for generating a set is, of course, to write a program generating it, but it has
been proved that any set that can be generated by a program can be generated by a
phrase structure grammar. There are even more arcane methods, but all of them have
been proved not to be more expressive. On the other hand there is no proof that no such
stronger method can exist. But in view of the fact that many quite different methods all
turn out to halt at the same barrier, it is highly unlikely†
that a stronger method will
ever be found. See, e.g. Révész [Books 1985, pp 100-102].
As a further example of the expressive power we shall give a grammar for the
movements of a Manhattan turtle. A Manhattan turtle moves in a plane and can only
move north, east, south or west in distances of one block. The grammar of Figure 2.4
produces all paths that return to their own starting point.
1. MoveS -> north Move south | east Move west | ε
2. north east -> east north north south -> south north north west -> west north east north -> north east east south -> south east east west -> west east south north -> north south south east -> east south south west -> west south west north -> north west west east -> east west west south -> south west
Figure 2.4 Grammar for the movements of a Manhattan turtle
As to rule 2, it should be noted that some authors require at least one of the symbols in
the left-hand side to be a non-terminal. This restriction can always be enforced by
adding new non-terminals.
The simple round trip north east south west is produced as shown in Fig￾ure 2.5 (names abbreviated to their first letter). Note the empty alternative in rule 1 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† Paul Vitány has pointed out that if scientists call something “highly unlikely” they are still
generally not willing to bet a year’s salary on it, double or quit.
28 Grammars as a generating device [Ch. 2
(the ε), which results in the dying out of the third M in the above production graph.
M n M s e M w s n e s w
Figure 2.5 How the grammar of Figure 2.4 produces a round trip
2.3 THE CHOMSKY HIERARCHY OF GRAMMARS AND LANGUAGES
The grammars from Figures 2.2 and 2.4 are easy to understand and indeed some simple
phrase structure grammars generate very complicated sets. The grammar for any given
set is, however, usually far from simple. (We say “The grammar for a given set”
although there can be, of course, infinitely many grammars for a set. By the grammar
for a set, we mean any grammar that does the job and is not obviously overly compli￾cated.) Theory says that if a set can be generated at all (for instance, by a program) it
can be generated by a phrase structure grammar, but theory does not say that it will be
easy to do so, or that the grammar will be understandable. In this context it is illustra￾tive to try to write a grammar for those Manhattan turtle paths in which the turtle is
never allowed to the west of its starting point. (Hint: use a special (non-terminal)
marker for each block the turtle is located to the east of its starting point).
Apart from the intellectual problems phrase structure grammars pose, they also
exhibit fundamental and practical problems. We shall see that no general parsing algo￾rithm for them can exist, and all known special parsing algorithms are either very inef￾ficient or very complex; see Section 3.5.2.
The desire to restrict the unmanageability of phrase structure grammars, while
keeping as much of their generative powers as possible, has led to the Chomsky hierar￾chy of grammars. This hierarchy distinguishes four types of grammars, numbered from
0 to 3; it is useful to include a fifth type, called Type 4 here. Type 0 grammars are the
(unrestricted) phrase structure grammars of which we have already seen examples. The
other types originate from applying more and more restrictions to the allowed form of
the rules in the grammar. Each of these restrictions has far-reaching consequences; the
resulting grammars are gradually easier to understand and to manipulate, but are also
gradually less powerful. Fortunately, these less powerful types are still very useful,
actually more useful even than Type 0. We shall now consider each of the three
remaining types in turn, followed by a trivial but useful fourth type.
2.3.1 Type 1 grammars
The characteristic property of a Type 0 grammar is that it may contain rules that
transform an arbitrary (non-zero) number of symbols into an arbitrary (possibly zero)
number of symbols. Example:
, N E -> and N
Sec. 2.3] The Chomsky hierarchy of grammars and languages 29
in which three symbols are replaced by two. By restricting this freedom, we obtain
Type 1 grammars. Strangely enough there are two, intuitively completely different
definitions of Type 1 grammars, which can be proved to be equivalent.
A grammar is Type 1 monotonic if it contains no rules in which the left-hand side
consists of more symbols than the right-hand side. This forbids, for instance, the rule , N E -> and N. A grammar is Type 1 context-sensitive if all of its rules are context-sensitive. A
rule is context-sensitive if actually only one (non-terminal) symbol in its left-hand side
gets replaced by other symbols, while we find the others back undamaged and in the
same order in the right-hand side. Example:
Name Comma Name End -> Name and Name End
which tells that the rule
Comma -> and
may be applied if the left context is Name and the right context is Name End. The con￾texts themselves are not affected. The replacement must be at least one symbol long;
this means that context-sensitive grammars are always monotonic; see Section 2.6.
Here is a monotonic grammar for our t,d&h example. In writing monotonic gram￾mars one has to be careful never to produce more symbols than will be produced even￾tually. We avoid the need to delete the end-marker by incorporating it into the right￾most name.
Name -> tom | dick | harry SentenceS -> Name | List List -> EndName | Name , List , EndName -> and Name
where EndName is a single symbol.
And here is a context-sensitive grammar for it.
Name -> tom | dick | harry SentenceS -> Name | List List -> EndName | Name Comma List Comma EndName -> and EndName context is ... EndName and EndName -> and Name context is and ... Comma -> ,
Note that we need an extra non-terminal Comma to be able to produce the terminal and
in the correct context.
Monotonic and context-sensitive grammars are equally powerful: for each
language that can be generated by a monotonic grammar a context-sensitive grammar
exists that generates the same language, and vice versa. They are less powerful than
the Type 0 grammars, that is, there are languages that can be generated by a Type 0
grammar but not by any Type 1. Strangely enough no simple examples of such
30 Grammars as a generating device [Ch. 2
languages are known. Although the difference between Type 0 and Type 1 is funda￾mental and is not just a whim of Mr. Chomsky, grammars for which the difference
matters are too complicated to write down; only their existence can be proved (see e.g.,
Hopcroft and Ullman [Books 1979, pp. 183-184] or Révész [Books 1985, p. 98]).
Of course any Type 1 grammar is also a Type 0 grammar, since the class of Type
1 grammars is obtained from the class of Type 0 grammars by applying restrictions.
But it would be confusing to call a Type 1 grammar a Type 0 grammar; it would be like
calling a cat a mammal: correct but not informative enough. A grammar is named after
the smallest class (that is, the highest type number) in which it will still fit.
We saw that our t,d&h language, which was first generated by a Type 0 grammar,
could also be generated by a Type 1 grammar. We shall see that there is also a Type 2
and a Type 3 grammar for it, but no Type 4 grammar. We therefore say that the t,d&h
language is Type 3 language, after the most restricted (and simple and amenable) gram￾mar for it. Some corollaries of this are: A Type n language can be generated by a Type
n grammar or anything stronger, but not by a weaker Type n +1 grammar; and: If a
language is generated by a Type n grammar, that does not necessarily mean that there is
no (weaker) Type n +1 grammar for it. The use of a Type 0 grammar for our t,d&h
language was a serious case of overkill, just for demonstration purposes.
The standard example of a Type 1 language is the set of words that consist of
equal numbers of a’s, b’s and c’s, in that order:
a a . . . . a n of them
b b . . . . b n of them
c c . . . . c n of them
2.3.1.1 Constructing a Type 1 grammar
For the sake of completeness and to show how one writes a Type 1 grammar if one is
clever enough, we shall now derive a grammar for this toy language. Starting with the
simplest case, we have the rule
0. S -> abc
Having got one instance of S, we may want to prepend more a’s to the beginning; if we
want to remember how many there were, we shall have to append something to the end
as well at the same time, and that cannot be a b or a c. We shall use a yet unknown
symbol Q. The following rule pre- and postpends:
1. S -> abc | aSQ
If we apply this rule, for instance, three times, we get the sentential form
aaabcQQ
Now, to get aaabbbccc from this, each Q must be worth one b and one c, as was to be
expected, but we cannot just write
Q -> bc
Sec. 2.3] The Chomsky hierarchy of grammars and languages 31
because that would allow b’s after the first c. The above rule would, however, be all
right if it were allowed to do replacement only between a b and a c; there, the newly
inserted bc will do no harm:
2. bQc -> bbcc
Still, we cannot apply this rule since normally the Q’s are to the right of the c; this can
be remedied by allowing a Q to hop left over a c:
3. cQ -> Qc
We can now finish our derivation:
aaabcQQ (3 times rule 1)
aaabQcQ (rule 3)
aaabbccQ (rule 2)
aaabbcQc (rule 3)
aaabbQcc (rule 3)
aaabbbccc (rule 2)
It should be noted that the above derivation only shows that the grammar will produce
the right strings, and the reader will still have to convince himself that it will not gen￾erate other and incorrect strings.
SS -> abc | aSQ bQc -> bbcc cQ -> Qc
Figure 2.6 Monotonic grammar for anbnc n
The grammar is summarized in Figure 2.6; since a derivation tree of a3b3c 3
is
already rather unwieldy, a derivation tree for a2b2c 2
is given in Figure 2.7. The gram￾mar is monotonic and therefore of Type 1; it can be proved that there is no Type 2
grammar for the language.
S a S Q a b c Q b Q c a a b b c c
Figure 2.7 Derivation of a2b2c 2
32 Grammars as a generating device [Ch. 2
Type 1 grammars are also called context-sensitive grammars (CS grammars); the
latter name is often used even if the grammar is actually monotonic. There are no stan￾dard initials for monotonic, but MT may do.
2.3.2 Type 2 grammars
Type 2 grammars are called context-free grammars (CF grammars) and their relation to
context-sensitive grammars is as direct as the name suggests. A context-free grammar
is like a context-sensitive grammar, except that both the left and the right contexts are
required to be absent (empty). As a result, the grammar may contain only rules that
have a single non-terminal on their left-hand side. Sample grammar:
0. Name -> tom | dick | harry
1. SentenceS -> Name | List and Name
2. List -> Name , List | Name
Since there is always only one symbol on the left-hand side, each node in a pro￾duction graph has the property that whatever it produces is independent of what its
neighbours produce: the productive life of a non-terminal is independent of its context.
Starlike forms as we saw in Figures 2.3, 2.5 or 2.7 cannot occur in a context-free pro￾duction graph, which consequently has a pure tree-form and is called a production tree.
An example is shown in Figure 2.8.
Sentence List and Name Name , List Name tom , dick and harry
Figure 2.8 Production tree for a context-free grammar
Also, since there is only one symbol on the left-hand side, all right-hand sides for a
given non-terminal can always be collected in one grammar rule (we have already done
that in the above grammar) and then each grammar rule reads like a definition of the
left-hand side:
A Sentence is either a Name or a List followed by and followed by a Name. A List is either a Name followed by a , followed by a List, or it is a Name.
In the actual world, many things are defined in terms of other things. Context-free
Sec. 2.3] The Chomsky hierarchy of grammars and languages 33
grammars are a very concise way to formulate such interrelationships. An almost trivial
example is the composition of a book, as given in Figure 2.9.
BookS -> Preface ChapterSequence Conclusion Preface -> "PREFACE" ParagraphSequence ChapterSequence -> Chapter | Chapter ChapterSequence Chapter -> "CHAPTER" Number ParagraphSequence ParagraphSequence -> Paragraph | Paragraph ParagraphSequence Paragraph -> SentenceSequence SentenceSequence -> ... ... Conclusion -> "CONCLUSION" ParagraphSequence
Figure 2.9 A simple (and incomplete!) grammar of a book
Of course, this is a context-free description of a book, so one can expect it to also gen￾erate a lot of good-looking nonsense like
PREFACE qwertyuiop CHAPTER V asdfghjkl zxcvbnm,. CHAPTER II qazwsxedcrfvtgb yhnujmikolp CONCLUSION All cats say blert when walking through walls.
but at least the result has the right structure. The document preparation and text mark￾up language SGML†
uses this approach to control the basic structure of documents.
A shorter but less trivial example is the language of all elevator motions that
return to the same point (a Manhattan turtle restricted to 5th Avenue would make the
same movements)
ZeroMotionS -> up ZeroMotion down ZeroMotion | down ZeroMotion up ZeroMotion | ε
(in which we assume that the elevator shaft is infinitely long; they are, in Manhattan).
If we ignore enough detail we can also recognize an underlying context-free struc￾ture in the sentences of a natural language, for instance, English: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† David Barron, “Why use SGML?”, Electronic Publishing, vol. 2, no. 1, p. 3-24, April 1989.
Short introduction to SGML (Standard Generalized Markup Language) and comparison to other
systems. Provides further references.
34 Grammars as a generating device [Ch. 2 SentenceS -> Subject Verb Object Subject -> NounPhrase Object -> NounPhrase NounPhrase -> the QualifiedNoun QualifiedNoun -> Noun | Adjective QualifiedNoun Noun -> castle | caterpillar | cats Adjective -> well-read | white | wistful | ... Verb -> admires | bark | criticize | ...
which produces sentences like:
the well-read cats criticize the wistful caterpillar
Since, however, no context is incorporated, it will equally well produce the incorrect
the cats admires the white well-read castle
For keeping context we could use a phrase structure grammar (for a simpler
language):
SentenceS -> Noun Number Verb Number -> Singular | Plural Noun Singular -> castle Singular | caterpillar Singular | ... Singular Verb -> Singular admires | ... Singular -> ε Noun Plural -> cats Plural | ... Plural Verb -> Plural bark | Plural criticize | ... Plural -> ε
where the markers Singular and Plural control the production of actual English
words. Still this grammar allows the cats to bark.... For a better way to handle context,
see the section on van Wijngaarden grammars (2.4.1).
The bulk of examples of CF grammars originate from programming languages.
Sentences in these languages (that is, programs) have to be processed automatically
(that is, by a compiler) and it was soon recognized (around 1958) that this is a lot easier
if the language has a well-defined formal grammar. The syntaxes of almost all pro￾gramming languages in use today are defined through a formal grammar.†
Some authors (for instance, Chomsky) and some parsing algorithms, require a CF
grammar to be monotonic. The only way a CF rule can be non-monotonic is by having
an empty right-hand side; such a rule is called an ε-rule and a grammar that contains no
such rules is called ε-free. The requirement of being ε-free is not a real restriction, just
a nuisance. Any CF grammar can be made ε-free be systematic substitution of the ε-
rules (this process will be explained in detail in 4.2.3.1), but this in general does not
improve the appearance of the grammar. The issue will be discussed further in Section ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† COBOL and FORTRAN also have grammars but theirs are informal and descriptive, and were
never intended to be generative.
Sec. 2.3] The Chomsky hierarchy of grammars and languages 35
2.6.
2.3.2.1 Backus-Naur Form
There are several different styles of notation for CF grammars for programming
languages, each with endless variants; they are all functionally equivalent. We shall
show two main styles here. The first is Backus-Naur Form (BNF) which was first used
for defining ALGOL 60. Here is a sample:
<name>::= tom | dick | harry <sentence>S::= <name> | <list> and <name> <list>::= <name>, <list> | <name>
This form’s main properties are the use of angle brackets to enclose non-terminals and
of ::= for “may produce”. In some variants, the rules are terminated by a semicolon.
2.3.2.2 van Wijngaarden form
The second style is that of the CF van Wijngaarden grammars. Again a sample:
name: tom symbol; dick symbol; harry symbol. sentenceS: name; list, and symbol, name. list: name, comma symbol, list; name.
The names of terminal symbols end in ...symbol; their representations are hardware￾dependent and are not defined in the grammar. Rules are properly terminated (with a
period). Punctuation is used more or less in the traditional way; for instance, the
comma binds tighter than the semicolon. The punctuation can be read as follows:
: “is defined as a(n)”
; “, or as a (n)”
, “followed by a(n)”
. “, and as nothing else.”
The second rule in the above grammar would be read as: “a sentence is defined as a
name, or as a list followed by an and-symbol followed by a name, and as nothing else.”
Although this notation achieves its full power only when applied in the two-level van
Wijngaarden grammars, it also has its merits on its own: it is formal and still quite
readable.
2.3.2.3 Extended CF grammars
CF grammars are often made both more compact and more readable by introducing
special short-hands for frequently used constructions. If we return to the Book grammar
of Figure 2.9, we see that rules like:
SomethingSequence -> Something | Something SomethingSequence
occur repeatedly. In an extended context-free grammar (ECF grammar), we can write
Something+ meaning “one or more Somethings” and we do not need to give a rule
for Something+; the rule
36 Grammars as a generating device [Ch. 2 Something+ -> Something | Something Something+
is implicit. Likewise we can use Something*
for “zero or more Somethings” and
Something?
for “zero or one Something” (that is, “optionally a Something”). In
these examples, the operators +, *
and ? work on the preceding symbol; their range can
be extended by using parentheses: (Something ;)? means “optionally a Something-followed-by-a-;”. These facilities are very useful and allow the Book
grammar to be written more efficiently (Figure 2.10). Some styles even allow construc￾tions like Something+4 meaning “one or more Somethings with a maximum of 4” or
Something+, meaning “one or more Somethings separated by commas”; this seems
to be a case of overdoing a good thing.
BookS -> Preface Chapter+ Conclusion Preface -> "PREFACE" Paragraph+ Chapter -> "CHAPTER" Number Paragraph+ Paragraph -> Sentence+ Sentence -> ... ... Conclusion -> "CONCLUSION" Paragraph+
Figure 2.10 An extended CF grammar of a book
The extensions of an ECF grammar do not increase its expressive powers: all
implicit rules can be made explicit and then a normal CF grammar results. Their
strength lies in their user-friendliness. The star in the notation X* with the meaning “a
sequence of zero or more X’s” is called the Kleene star. If X is a set, X*
should be read
as “a sequence of zero or more elements of X”; it is the same star that we saw in Σ*
in
Section 2.1.3.3. Forms involving the repetition operators *, +
or ?
and possibly the
separators ( and ) are called regular expressions. ECF’s, which have regular expres￾sions for their right-hand sides, are for that reason sometimes called regular right part
grammars (RRP grammars) which is more descriptive than “extended context free”,
but which is perceived to be a tongue twister by some.
There are two different schools of thought about the structural meaning of a regu￾lar right-hand side. One school maintains that a rule like:
Book -> Preface Chapter+ Conclusion
is an abbreviation of
Book -> Preface α Conclusion α -> Chapter | Chapter α
as shown above. This is the “(right)recursive” interpretation; it has the advantage that it
is easy to explain and that the transformation to “normal” CF is simple. Disadvantages
are that the transformation entails anonymous rules (identified by α here) and that the
lopsided parse tree for, for instance, a book of four chapters does not correspond to our
idea of the structure of the book; see Figure 2.11.
The seconds school claims that
Sec. 2.3] The Chomsky hierarchy of grammars and languages 37
Book Preface α Con- clusion Chapter α Chapter α Chapter Chapter
Figure 2.11 Parse tree for the (right)recursive interpretation
Book -> Preface Chapter+ Conclusion
is an abbreviation of
Book -> Preface Chapter Conclusion | Preface Chapter Chapter Conclusion | Preface Chapter Chapter Chapter Conclusion | ... ...
This is the “iterative” interpretation; it has the advantage that it yields a beautiful parse
tree (Figure 2.12), but the disadvantages that it involves an infinite number of produc￾tion rules and that the nodes in the parse tree have a varying fan-out.
Book Preface Chapter Chapter Chapter Chapter Con- clusion
Figure 2.12 Parse tree for the iterative interpretation
Since the implementation of the iterative interpretation is far from trivial, most
practical parser generators use the recursive interpretation in some form or another,
whereas most research has been done on the iterative interpretation.
2.3.3 Type 3 grammars
The basic property of CF grammars is that they describe things that nest: an object may
contain other objects in various places, which in turn may contain ... etc. When during
the production process we have produced one of the objects, the right-hand side still
“remembers” what has to come after it: in the English grammar, after having descended
into the depth of the non-terminal Subject to produce something like the wistful cat, the right-hand side Subject Verb Object still remembers that a Verb must
38 Grammars as a generating device [Ch. 2
follow. While we are working on the Subject, the Verb and Object remain queued
at the right in the sentential form, for instance,
the wistful QualifiedNoun Verb Object
In the right-hand side
up ZeroMotion down ZeroMotion
after having performed the up and an arbitrarily complicated ZeroMotion, the right￾hand side still remembers that a down must follow.
The restriction to Type 3 disallows this recollection of things that came before: a
right-hand side may only contain one non-terminal and it must come at the end. This
means that there are only two kinds of rules:† A non-terminal produces zero or more terminals
A non-terminal produces zero or more terminals followed by one non-terminal
The original Chomsky definition of Type 3 restricts the kinds of rules to
A non-terminal produces one terminal
A non-terminal produces one terminal followed by one non-terminal
Our definition is equivalent and more convenient, although the conversion to Chomsky
Type 3 is not completely trivial.
Type 3 grammars are also called regular grammars (RE grammars) or finite-state
grammars (FS grammars). Since regular grammars are used very often to describe the
structure of text on the character level, it is customary for the terminal symbols of a
regular grammar to be single characters. We shall therefore write t for Tom, d for
Dick, h for Harry and & for and. Figure 2.13 shows a Type 3 grammar for our t,d&h
language in this style.
SentenceS -> t | d | h | List List -> t ListTail | d ListTail | h ListTail ListTail -> , List | &t | &d | &h
Figure 2.13 A Type 3 grammar for the t, d & h language
The production tree for a sentence from a Type 3 grammar degenerates into a
chain of non-terminals that drop a sequence of terminals on their left. Figure 2.14
shows an example.
The deadly repetition exhibited by the above grammar is typical of regular gram￾mars; a number of notational devices have been invented to abate this nuisance. The ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† There is a natural in-between class, Type 2.5 so to say, in which only a single non-terminal is
allowed in a right-hand side, but where it need not be at the end. This gives us the so-called
linear grammars.
Sec. 2.3] The Chomsky hierarchy of grammars and languages 39
SentenceList t ListTail , List d ListTail & h
Figure 2.14 Production chain for a regular (Type 3) grammar
most common one is the use of square brackets to indicate “one out of a set of charac￾ters”: [tdh] is an abbreviation for t|d|h: SS -> [tdh] | L L -> [tdh] T T -> , L | & [tdh]
which may look more cryptic at first but is actually much more convenient and in fact
allows simplification of the grammar to
SS -> [tdh] | L L -> [tdh] , L | [tdh] & [tdh] A second way is to allow macros, names for pieces of the grammar that are substi￾tuted properly into the grammar before it is used:
Name -> t | d | h SS -> $Name | L L -> $Name , L | $Name & $Name
The popular parser generator for regular grammars lex (designed and written by Lesk
and Schmidt [FS 1975]) features both facilities.
Note that if we adhere to the Chomsky definition of Type 3, our grammar will not
get smaller than:
SS -> t | d | h | tM | dM | hM M -> ,N | &P N -> tM | dM | hM P -> t | d | h
This form is evidently easier to process but less user-friendly than the lex version. We
40 Grammars as a generating device [Ch. 2
observe here that while the formal-linguist is interested in and helped by minimally
sufficient means, the computer scientist values a form in which the concepts underlying
the grammar ($Name, etc.) are easily expressed, at the expense of additional processing.
There are two interesting observations about regular grammars which we want to
make here. First, when we use a RE grammar for generating a sentence, the sentential
forms will only contain one non-terminal and this will always be at the end; that’s
where it all happens (using the grammar of Figure 2.13):
SentenceS List t ListTail t , List t , d ListTail t , d & h
The second observation is that all regular grammars can be reduced considerably
in size by using the regular expression operators *, +
and ?
introduced in Section 2.3.2
for “zero or more”, “one or more” and “optionally one”, respectively. Using these
operators and ( and ) for grouping, we can simplify our grammar to:
SS -> (( [tdh], )* [tdh]& )? [tdh]
Here the parentheses serve to demarcate the operands of the *
and ?
operators. Regular
expressions exist for all Type 3 grammars. Note that the *
and the + work on what pre￾cedes them; to distinguish them from the normal multiplication and addition operators,
they are often printed higher than the level text in print, but in computer input they are
in line with the rest.
2.3.4 Type 4 grammars
The last restriction we shall apply to what is allowed in a production rule is a pretty
final one: no non-terminal is allowed in the right-hand side. This removes all the gen￾erative power from the mechanism, except for the choosing of alternatives. The start
symbol has a (finite) list of alternatives from which we are allowed to choose; this is
reflected in the name finite-choice grammar (FC grammar).
There is no FC grammar for our t,d&h language; if, however, we are willing to
restrict ourselves to lists of names of a finite length (say, no more than a hundred), then
there is one, since one could enumerate all combinations. For the obvious limit of three
names, we get:
SS -> [tdh] | [tdh] & [tdh] | [tdh] , [tdh] & [tdh]
for a total of 3+3* 3+3* 3* 3=39 production rules.
FC grammars are not part of the official Chomsky hierarchy, that is, they are not
identified by Chomsky. They are nevertheless very useful and are often required as a
tail-piece in some process or reasoning. The set of reserved words (keywords) in a pro￾gramming language can be described by a FC grammar. Although not many grammars
are FC in their entirety, some of the rules in many grammars are finite-choice. E.g., the
first rule of our first grammar (Figure 2.2) was FC. Another example of a FC rule was
Sec. 2.3] The Chomsky hierarchy of grammars and languages 41
the macro introduced in Section 2.3.3; we do not need the macro mechanism if we
change
zero or more terminals
in the definition of a regular grammar to
zero or more terminals or FC non-terminals
In the end, the FC non-terminals will only introduce a finite number of terminals.
2.4 VW GRAMMARS
2.4.1 The human inadequacy of CS and PS grammars
In the preceding paragraphs we have witnessed the introduction of a hierarchy of gram￾mar types:
− phrase structure,
− context-sensitive,
− context-free,
− regular and
− finite-choice.
Although each of the boundaries between the types is clear-cut, some boundaries are
more important than others. Two boundaries specifically stand out: that between
context-sensitive and context-free and that between regular (finite-state) and finite￾choice; the significance of the latter is trivial, being the difference between productive
and non-productive, but the former is profound.
The border between CS and CF is that between global correlation and local
independence. Once a non-terminal has been produced in a sentential form in a CF
grammar, its further development is independent of the rest of the sentential form; a
non-terminal in a sentential form of a CS grammar has to look at its neighbours on the
left and on the right, to see what production rules are allowed for it. The local produc￾tion independence in CF grammars means that certain long-range correlations cannot
be expressed by them. Such correlations are, however, often very interesting, since they
embody fundamental properties of the input text, like the consistent use of variables in
a program or the recurrence of a theme in a musical composition. When we describe
such input through a CF grammar we cannot enforce the proper correlations; one
(often-used) way out is to settle for the CF grammar, accept the parsing it produces and
then check the proper correlations with a separate program. This is, however, quite
unsatisfactory since it defeats the purpose of having a grammar, that is, having a con￾cise and formal description of all the properties of the input.
The obvious solution would seem to be the use of a CS grammar to express the
correlations (= the context-sensitivity) but here we run into another, non-fundamental
but very practical problem: CS grammars can express the proper correlations but not in
a way a human can understand. It is in this respect instructive to compare the CF gram￾mars in Section 2.3.2 to the one CS grammar we have seen that really expresses a
context-dependency, the grammar for anbnc n
in Figure 2.6. The grammar for the con￾tents of a book (Figure 2.9) immediately suggests the form of the book, but the
42 Grammars as a generating device [Ch. 2
grammar of Figure 2.6 hardly suggests anything, even if we can still remember how it
was constructed and how it works. This is not caused by the use of short names like Q: a version with more informative names (Figure 2.15) is still puzzling. Also, one would
expect that, having constructed a grammar for anbnc n, making one for anbnc ndn
would be straightforward. Such is not the case; a grammar for anbnc ndn
is substan￾tially more complicated (and even more opaque) than one for anbnc n
and requires
rethinking of the problem.
SS -> a b c | a S bc_pack b bc_pack c -> b b c c c bc_pack -> bc_pack c
Figure 2.15 Monotonic grammar for anbnc n with more informative names
The cause of all this misery is that CS and PS grammars derive their power to
enforce global relationships from “just slightly more than local dependency”. Theoreti￾cally, just looking at the neighbours can be proved to be enough to express any global
relation, but the enforcement of a long-range relation through this mechanism causes
information to flow through the sentential form over long distances. In the production
process of, for instance, a4b4c 4, we see several bc_packs wind their way through the
sentential form, and in any serious CS grammar, many messengers run up and down the
sentential form to convey information about developments in far-away places. How￾ever interesting this imagery may seem, it requires almost all rules to know something
about almost all other rules; this makes the grammar absurdly complex.
Several grammar forms have been put forward to remedy this situation and make
long-range relationships more easily expressible; among them are indexed grammars
(Aho [PSCS 1968]), recording grammars (Barth [PSCS 1979]), affix grammars
(Koster [VW 1971]) and VW grammars (van Wijngaarden [VW 1969]). The last are
the most elegant and effective, and are explained below. Affix grammars are discussed
briefly in 2.4.5.
2.4.2 VW grammars
It is not quite true that CF grammars cannot express long-range relations; they can only
express a finite number of them. If we have a language the strings of which consist of a begin, a middle and an end and suppose there are three types of begins and ends,
then the CF grammar of Figure 2.16 will enforce that the type of the end will properly
match that of the begin. textS -> begin1 middle end1 | begin2 middle end2 | begin3 middle end3
Figure 2.16 A long-range relation-enforcing CF grammar
We can think of ( and ) for begin1 and end1, [ and ] for begin2 and end2 and {
and } for begin3 and end3; the CF grammar will then ensure that closing parentheses
will match the corresponding open parentheses.
By making the CF grammar larger and larger, we can express more and more
Sec. 2.4] VW grammars 43
long-range relations; if we make it infinitely large, we can express any number of
long-range relations and have achieved full context-sensitivity. Now we come to the
fundamental idea behind VW grammars. The rules of the infinite-size CF grammar
form an infinite set of strings, i.e., a language, which can in turn be described by a
grammar. This explains the name “two-level grammar”.
To introduce the concepts and techniques we shall give here an informal construc￾tion of a VW grammar for the above language L = anbnc n
for n≥1. We shall use the
VW notation as explained in 2.3.2.2: the names of terminal symbols end in symbol and
their representations are given separately; alternatives are separated by semicolons (;),
members inside alternatives are separated by commas (which allows us to have spaces
in the names of non-terminals) and a colon (:) is used instead of an arrow.
We could describe the language L through a context-free grammar if grammars of
infinite size were allowed:
textS: a symbol, b symbol, c symbol; a symbol, a symbol, b symbol, b symbol, c symbol, c symbol; a symbol, a symbol, a symbol, b symbol, b symbol, b symbol, c symbol, c symbol, c symbol; ... ...
We shall now try to master this infinity by constructing a grammar which allows
us to produce the above grammar for as far as needed. We first introduce an infinite
number of names of non-terminals:
textS: ai, bi, ci; aii, bii, cii; aiii, biii, ciii; ... ...
together with three infinite groups of rules for these non-terminals:
ai: a symbol. aii: a symbol, ai. aiii: a symbol, aii. ... ... bi: b symbol. bii: b symbol, bi. biii: b symbol, bii. ... ...
44 Grammars as a generating device [Ch. 2 ci: c symbol. cii: c symbol, ci. ciii: c symbol, cii. ... ...
Here the i’s count the number of a’s, b’s and c’s. Next we introduce a special
kind of name called a metanotion. Rather than being capable of producing (part of) a
sentence in the language, it is capable of producing (part of) a name in a grammar rule.
In our example we want to catch the repetitions of i’s in a metanotion N, for which we
give a context-free production rule (a metarule):
N :: i ; i N .
Note that we use a slightly different notation for metarules: left-hand side and right￾hand side are separated by a double colon (::) rather than by a single colon and
members are separated by a blank ( ) rather than by a comma. The metanotion N pro￾duces i, ii, iii, etc., which are exactly the parts of the non-terminal names we need.
We can use the production rules of N to collapse the four infinite groups of rules
into four finite rule templates called hyper-rules. textS: a N, b N, c N. a i: a symbol. a i N: a symbol, a N. b i: b symbol. b i N: b symbol, b N. c i: c symbol. c i N: c symbol, c N.
Each original rule can be obtained from one of the hyper-rules by substituting a
production of N from the metarules for each occurrence of N in that hyper-rule, pro￾vided that the same production of N is used consistently throughout. To distinguish
them from normal names, these half-finished combinations of small letters and metano￾tions (like a N or b i N) are called hypernotions. Substituting, for instance, N=iii in
the hyperrule
b i N: b symbol, b N.
yields the CF rule for the CF non-terminal biiii biiii: b symbol, biii.
We can also use this technique to condense the finite parts of a grammar by hav￾ing a metarule A for the symbols a, b and c. Again the rules of the game require that
the metanotion A be replaced consistently. The final result is shown in Figure 2.17.
This grammar gives a clear indication of the language it describes: once the
Sec. 2.4] VW grammars 45
N :: i ; i N . A :: a ; b ; c . textS: a N, b N, c N. A i: A symbol. A i N: A symbol, A N.
Figure 2.17 A VW grammar for the language anbnc n
“value” of the metanotion N is chosen, production is straightforward. It is now trivial to
extend the grammar to anbnc ndn. It is also clear how long-range relations are esta￾blished without having confusing messengers in the sentential form: they are esta￾blished before they become long-range, through consistent substitution of metanotions
in simple right-hand sides. The “consistent substitution rule” for metanotions is essen￾tial to the two-level mechanism; without it, VW grammars would be equivalent to CF
grammars (Meersman and Rozenberg [VW 1978]).
A very good and detailed explanation of VW grammars has been written by Craig
Cleaveland and Uzgalis [VW 1977], who also show many applications. Sintzoff [VW
1967] has proved that VW grammars are as powerful as PS grammars, which also
shows that adding a third level to the building cannot increase its powers. Van
Wijngaarden [VW 1974] has shown that the metagrammar need only be regular
(although simpler grammars may be possible if it is allowed to be CF).
2.4.3 Infinite symbol sets
In a sense, VW grammars are even more powerful than PS grammars: since the name
of a symbol can be generated by the grammar, they can easily handle infinite symbol
sets. Of course this just shifts the problem: there must be a (finite) mapping from sym￾bol names to symbols somewhere. The VW grammar of Figure 2.18 generates sen￾tences consisting of arbitrary numbers of equal-length stretches of equal symbols, for
instance, s 1s 1s 1s 2s 2s 2 or s 1s 1s 2s 2s 3s 3s 4s 4s 5s 5, where sn
is the representation of
in symbol. The minimum stretch length has been set to 2, to prevent the grammar
from producing Σ*. N :: n N; ε . C :: i; i C. textS: N i tail. N C tail: ε; N C, N C i tail. N n C : C symbol, N C. C : ε.
Figure 2.18 A grammar handling an infinite alphabet
2.4.4 BNF notation for VW grammars
There is a different notation for VW grammars, sometimes used in formal language
theory (for instance, Greibach [VW 1974]), which derives from the BNF notation (see
Section 2.3.2.1). A BNF form of our grammar from Figure 2.17 is given in Figure 2.19;
hypernotions are demarcated by angle brackets and terminal symbols are represented
46 Grammars as a generating device [Ch. 2
by themselves.
N -> i | i N A -> a | b | c <text>S -> <aN> <bN> <cN> <Ai> -> A <AiN> -> A <AN>
Figure 2.19 The VW grammar of Figure 2.17 in BNF notation
2.4.5 Affix grammars
Like VW grammars, affix grammars establish long-range relations by duplicating
information in an early stage; this information is, however, not part of the non-terminal
name, but is passed as an independent parameter, an affix, which can, for instance, be
an integer value. Normally these affixes are passed on to the members of a rule, until
they are passed to a special kind of non-terminal, a primitive predicate. Rather than
producing text, a primitive predicate contains a legality test. For a sentential form to be
legal, all the legality tests in it have to succeed. The affix mechanism is equivalent to
the VW metanotion mechanism, is slightly easier to handle while parsing and slightly
more difficult to use when writing a grammar.
An affix grammar for anbnc n
is given in Figure 2.20. The first two lines are affix
definitions for N, M, A and B. Affixes in grammar rules are traditionally preceded by a +. The names of the primitive predicates start with where. To produce abc, start with
text + 1; this produces
list + 1 + a, list + 1 + b, list + 1 + c
The second member of this, for instance, produces
letter + b, where is decreased + 0 + 1, list + 0 + b
the first member of which produces
where is + b + b, b symbol.
All the primitive predicates in the above are fulfilled, which makes the final sentence
legal. An attempt to let letter + b produce a symbol introduces the primitive
predicate where is + a + b which fails, invalidating the sentential form.
Affix grammars have largely been replaced by attribute grammars, which achieve
roughly the same effect through similar but conceptually different means (see Section
2.9.1).
Sec. 2.4] VW grammars 47
N, M:: integer. A, B:: a; b; c. textS + N: list + N + a, list + N + b, list + N + c. list + N + A: where is zero + N; letter + A, where is decreased + M + N, list + M + A. letter + A: where is + A + a, a symbol; where is + A + b, b symbol; where is + A + c, c symbol. where is zero + N: {N = 0}. where is decreased + M + N: {M = N - 1}. where is + A + B: {A = B}.
Figure 2.20 Affix grammar for anbnc n
2.5 ACTUALLY GENERATING SENTENCES FROM A GRAMMAR
2.5.1 The general case
Until now we have only produced single sentences from our grammars, in an ad hoc
fashion, but the purpose of a grammar is to generate all its sentences. Fortunately there
is a systematic way to do so. We shall use the anbnc n
grammar as an example. We
start from the start symbol and systematically make all possible substitutions to gen￾erate all sentential forms; we just wait and see which ones evolve into sentences and
when. Try this by hand for, say, 10 sentential forms. If we are not careful, we are apt to
generate forms like aSQ, aaSQQ, aaaSQQQ,... only and we will never see a finished
sentence. The reason is that we focus too much on a single sentential form; we have to
give equal time to all of them. This can be done through the following algorithm, which
keeps a queue (that is, a list to which we add at the end and remove from the begin￾ning), of sentential forms.
Start with the start symbol as the only sentential form in the queue. Now continue
doing the following:
Consider the first sentential form in the queue.
Scan it from left to right, looking for strings of symbols that match the left-hand
side of a production rule.
For each such string found, make enough copies of the sentential form, replace in
each one the string that matched a left-hand side of a rule by a different alternative
of that rule, and add them all to the end of the queue.
If the original sentential form did not contain any non-terminals, write it down as
a sentence in the language.
48 Grammars as a generating device [Ch. 2
Throw away the sentential form; it has been fully processed.
If no rule matched, and the sentential form was not a finished sentence, it was a
blind alley; they are removed automatically by the above process and leave no trace.
The first couple of steps of this process for our anbnc n
grammar from Figure 2.6
are depicted in Figure 2.21. The queue runs to the right, with the first item on the left.
Step Queue Result
1 S 2 abc aSQ abc 3 aSQ 4 aabcQ aaSQQ 5 aaSQQ aabQc 6 aabQc aaabcQQ aaaSQQQ 7 aaabcQQ aaaSQQQ aabbcc 8 aaaSQQQ aabbcc aaabQcQ 9 aabbcc aaabQcQ aaaabcQQQ aaaaSQQQQ aabbcc
10 aaabQcQ aaaabcQQQ aaaaSQQQQ
11 aaaabcQQQ aaaaSQQQQ aaabbccQ aaabQQc ... ...
Figure 2.21 The first couple of steps in producing for anbnc n
We see that we do not get a sentence for each time we turn the crank; in fact, in this
case real sentences will get scarcer and scarcer. The reason is of course that as the pro￾cess progresses, more and more side lines develop, which all require equal attention.
Still, we can be certain that every sentence that can be produced, will in the end be pro￾duced: we leave no stone unturned. This way of doing things is called breadth-first pro￾duction; computers are better at it than people.
It is tempting to think that it is unnecessary to replace all left-hand sides that we
found in the top-most sentential form. Why not just replace the first one and wait for
the resulting sentential form to come up again and then do the next one? This is wrong,
however, since doing the first one may ruin the context for doing the second one. A
simple example is the grammar
SS -> AC A -> b AC -> ac
First doing A->b will lead to a blind alley and the grammar will produce nothing.
Doing both possible substitutions will lead to the same blind alley, but then there will
also be a second sentential form, ac. This is also an example of a grammar for which
the queue will get empty after a (short) while.
If the grammar is context-free there is no context to ruin and it is quite safe to just
replace the first match.
There are two remarks to be made here. First, it is not at all certain that we will
indeed obtain a sentence for all our effort: it is quite possible that every new sentential
form again contains non-terminals. We should like to know this in advance by examin￾ing the grammar, but it can be proven that it is in general impossible to do so. The
Sec. 2.5] Actually generating sentences from a grammar 49
formal-linguist says “It is undecidable whether a PS grammar produces the empty set”,
which means that there cannot be an algorithm that will for every PS grammar
correctly tell if the grammar produces at least one sentence. This does not mean that we
cannot prove for some given grammar that it generates nothing, if that is the case, only
that the proof method used will not work for all grammars: we could have a program
that correctly says Yes in finite time if the answer is Yes but that takes infinite time if
the answer is No; in fact, our generating procedure above is such an algorithm that
gives the correct Yes/No answer in infinite time (although we can have an algorithm
that gives a Yes/Don’t know answer in finite time). Although it is true that because of
some deep theorem in formal linguistics we cannot always get exactly the answer we
want, this does not prevent us from obtaining all kinds of useful information that gets
close. We shall see that this is a recurring phenomenon. The computer scientist is
aware of but not daunted by the impossibilities from formal linguistics.
The second remark is that when we do get sentences from the above production
process, they may be produced in an unpredictable order. For non-monotonic grammars
the sentential forms may grow for a while and then suddenly shrink again, perhaps to
the empty string. Formal linguistics says that there cannot be an algorithm that for all
PS grammars will produce their sentences in increasing (actually “non-decreasing”)
length.
The production of all sentences from a van Wijngaarden grammar poses a special
problem in that there are effectively infinitely many left-hand sides to match with. For
a technique to solve this problem, see Grune [VW 1984].
2.5.2 The CF case
When we generate sentences from a CF grammar, many things are a lot simpler. It can
still happen that our grammar will never produce a sentence, but now we can test for
that beforehand, as follows. First scan the grammar to find all non-terminals that have a
right-hand side that contains terminals only or is empty. These non-terminals are
guaranteed to produce something. Now scan again to find non-terminals that have a
right-hand side that consists of only terminals and non-terminals that are guaranteed to
produce something. This will give us new non-terminals that are guaranteed to produce
something. Repeat this until we find no more new such non-terminals. If we have not
met the start symbol this way, it will not produce anything.
Furthermore we have seen that if the grammar is CF, we can afford to just rewrite
the left-most non-terminal every time (provided we rewrite it into all its alternatives).
Of course we can also consistently rewrite the right-most non-terminal; both
approaches are similar but different. Using the grammar
0. N -> t | d | h
1. SS -> N | L & N
2. L -> N , L | N
let us follow the adventures of the sentential form that will eventually result in d,h&h.
Although it will go several times up and down the production queue, we only depict
here what changes are made to it. We show the sentential forms for left-most and
right-most substitution, with the rules and alternatives involved; for instance, (1b)
means rule 1 alternative b.
50 Grammars as a generating device [Ch. 2 S S
1b 1b
L&N L&N
2a 0c
N,L&N L&h
0b 2a
d,L&N N,L&h
2b 2b
d,N&N N,N&h
0c 0c
d,h&N N,h&h
0c 0b
d,h&h d,h&h
The sequences of production rules used are not as similar as we would expect; of
course, in grand total the same rules and alternatives are applied but the sequences are
neither equal nor each other’s mirror image, nor is there any other obvious relationship.
Still both define the same production tree:
S L N N LN d , h & h
but if we number the non-terminals in it in the order they were rewritten, we would get
different numberings:
S L N N LN d , h & h 1 2 6 3 45
Left-most derivation order
S L N N LN d , h & h 1 3 2 6 45
Right-most derivation order
The sequence of production rules used in left-most rewriting is called the left-most
derivation of a sentence. We do not have to indicate where each rule must be applied
Sec. 2.5] Actually generating sentences from a grammar 51
and need not even give its rule number; both are implicit in the left-most substitution.
A right-most derivation is defined in the obvious way.
The production sequence S → L&N → N,L&N → d,L&N → d,N&N → d,h&N → d,h&h can be abbreviated to S →*l d,h&h. Likewise, the sequence S → L&N → L&h → N,L&h → N,N&h → N,h&h → d,h&h can be abbreviated to S →*r d,h&h. The fact that
S produces d,h&h in any way is written as S →* d,h&h.
The task of parsing is to reconstruct the parse tree (or graph) for a given input
string, but some of the most efficient parsing techniques can be understood more easily
if viewed as attempts to reconstruct a left- or right-most derivation of the input string;
the parse tree then follows automatically. This is why the notion “[left|right]-most
derivation” will occur frequently in this book (note the FC grammar used here).
2.6 TO SHRINK OR NOT TO SHRINK
In the previous paragraphs, we have sometimes been explicit as to the question if a
right-hand side of a rule may be shorter than its left-hand side and sometimes we have
been vague. Type 0 rules may definitely be of the shrinking variety, monotonic rules
definitely may not, and Type 2 and 3 rules can shrink only by producing empty (ε), that
much is sure.
The original Chomsky hierarchy [Misc 1959] was very firm on the subject: only
Type 0 rules are allowed to make a sentential form shrink. Type 1 to 3 rules are all
monotonic. Moreover, Type 1 rules have to be of the context-sensitive variety, which
means that only one of the non-terminals in the left-hand side is actually allowed to be
replaced (and then not by ε). This makes for a proper hierarchy in which each next
class is a proper subset of its parent and in which all derivation graphs except for those
of Type 0 grammars are actually derivation trees.
As an example consider the grammar for the language anbnc n
given in Figure
2.6:
1. SS -> abc | aSQ
2. bQc -> bbcc
3. cQ -> Qc
which is monotonic but not context-sensitive in the strict sense. It can be made CS by
expanding the offending rule 3 and introducing a non-terminal for c:
1. SS -> abC | aSQ
2. bQC -> bbCC
3a. CQ -> CX
3b. CX -> QX
3c. QX -> QC
4. C -> c
Now the production graph of Figure 2.7 turns into a production tree:
52 Grammars as a generating device [Ch. 2 S a S Q a b C Q C X Q X b Q C b b C C a a b b c c . . . . . . . . . . . .
There is an additional reason for shunning ε-rules: they make both proofs and
parsers more complicated. So the question arises why we should bother with ε-rules at
all; the answer is that they are very convenient for the grammar writer and user.
If we have a language that is described by a CF grammar with ε-rules and we
want to describe it by a grammar without ε-rules, then that grammar will almost always
be more complicated. Suppose we have a system that can be fed bits of information,
like: “Amsterdam is the capital of the Netherlands”, “Truffles are expensive”, and can
then be asked a question. On a very superficial level we can define its input as:
inputS: zero-or-more-bits-of-info question
or, in an extended notation
inputS: bit-of-info* question
Since zero-or-more-bits-of-info will, among other strings, produce the empty
string, at least one of the rules used in its grammar will be an ε-rule; the *
in the
extended notation already implies an ε-rule somewhere. Still, from the user’s point of
view, the above definition of input neatly fits the problem and is exactly what we want.
Any attempt to write an ε-free grammar for this input will end up defining a
notion that comprises some of the later bits-of-info together with the question
(since the question is the only non-empty part, it must occur in all rules involved!);
but such a notion does not fit our problem at all and is an artifact:
inputS: question-preceded-by-info question-preceded-by-info: question | bit-of-info question-preceded-by-info
As a grammar becomes more and more complicated, the requirement that it be ε-free
becomes more and more a nuisance: the grammar is working against us, not for us.
This presents no problem from a theoretical point of view: any CF language can
Sec. 2.6] To shrink or not to shrink 53
be described by an ε-free CF grammar and ε-rules are never needed. Better still, any
grammar with ε-rules can be mechanically transformed into an ε-free grammar for the
same language; we saw an example of such a transformation above and details of the
algorithm are given in Section 4.2.3.1. But the price we pay is that of any grammar
transformation: it is no longer our grammar and it reflects the original structure less
well.
The bottom line is that the practitioner finds the ε-rule to be a useful tool, and it
would be interesting to see if there exists a hierarchy of non-monotonic grammars
alongside the usual Chomsky hierarchy. To a large extend there is: Type 2 and Type 3
grammars need not be monotonic (since they can always be made so if the need arises);
it turns out that context-sensitive grammars with shrinking rules are equivalent to
unrestricted Type 0 grammars; and monotonic grammars with ε-rules are also
equivalent to Type 0 grammars. We can now draw the two hierarchies in one picture;
see Figure 2.22. ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
Chomsky (monotonic)
hierarchy
non-monotonic ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ hierarchy
global
Type 0
unrestricted
phrase struc￾ture grammars
monotonic
grammars
with ε-rules
unrestricted phrase
structure grammars ￾✄￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ production
effects
Type 1
context￾sensitive
grammars
monotonic
grammars
without ε-
rules
context-sensitive
grammars with non￾monotonic rules ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
local
Type 2 context-free ε-free grammars context-free gram￾mars ￾✄￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ production
effects Type 3 regular (ε-free) grammars regular grammars ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ regular expressions ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ no production Type 4 finite-choice
Figure 2.22 Summary of grammar hierarchies
Drawn lines separate grammar types with different power, broken lines separate con￾ceptually different grammar types with the same power. We see that if we insist on
non-monotonicity, the distinction between Type 0 and Type 1 disappears.
A special case arises if the language of a Type 1 to Type 3 grammar itself contains
the empty string. This cannot be incorporated into the grammar in the monotonic
hierarchy since the start symbol has already length 1 and no monotonic rule can make it
shrink; the empty string has to be attached as a special property to the grammar. No
such problem occurs in the non-monotonic hierarchy.
Many parsing methods will in principle work for ε-free grammars only: if some￾thing does not produce anything, you can’t very well see if it’s there. Often, however,
the parsing method can be doctored so that it will be able to handle ε-rules.
54 Grammars as a generating device [Ch. 2
2.7 A CHARACTERIZATION OF THE LIMITATIONS OF CF AND FS
GRAMMARS
When one has been working for a while with CF grammars, one gradually gets the feel￾ing that almost anything could be expressed in a CF grammar. That there are, however,
serious limitations to what can be said by a CF grammar is shown by the famous uvwxy
theorem, which is explained below.
2.7.1 The uvwxy theorem
When we have obtained a sentence from a CF grammar, we may look at each (termi￾nal) symbol in it, and ask: How did it get here? Then, looking at the production tree, we
see that it was produced as, say, the n-th member of the right-hand side of rule number
m. The left-hand side of this rule, the parent of our symbol, was again produced as the
p-th member of rule q, and so on, until we reach the start symbol. We can, in a sense,
trace the lineage of the symbol in this way. If all rule/member pairs in the lineage of a
symbol are different, we call the symbol original, and if all the symbols in a sentence
are original, we call the sentence “original”.
Now there is only a finite number of ways for a given symbol to be original. This
is easy to see as follows. All rule/member pairs in the lineage of an original symbol
must be different, so the length of its lineage can never be more than the total number
of different rule/member pairs in the grammar. There are only so many of these, which
yields only a finite number of combinations of rule/member pairs of this length or
shorter. In theory the number of original lineages of a symbol can be very large, but in
practice it is very small: if there are more than, say, ten ways to produce a given sym￾bol from a grammar by original lineage, your grammar will be very convoluted!
This puts severe restrictions on original sentences. If a symbol occurs twice in an
original sentence, both its lineages must be different: if they were the same, they would
describe the same symbol in the same place. This means that there is a maximum
length to original sentences: the sum of the numbers of original lineages of all symbols.
For the average grammar of a programming language this length is in the order of some
thousands of symbols, i.e., roughly the size of the grammar. So, since there is a longest
original sentence, there can only be a finite number of original sentences, and we arrive
at the surprising conclusion that any CF grammar produces a finite-size kernel of origi￾nal sentences and (probably) an infinite number of unoriginal sentences!
S.............................. u . ... . ... .... . .. . ... .. ... ... ... .. ... . .. . .... y A.................... v . ... . .... ... . .. . .... . .. . .... x A......... . ... .. ... .... qw
Figure 2.23 An unoriginal sentence: uvwxy
What do “unoriginal” sentences look like? This is where we come to the uvwxy
Sec. 2.7] A characterization of the limitations of CF and FS grammars 55
theorem. An unoriginal sentence has the property that it contains at least one symbol in
the lineage of which a repetition occurs. Suppose that symbol is a q and the repeated
rule is A. We can then draw a picture similar to Figure 2.23, where w is the part pro￾duced by the most recent application of A, vwx the part produced by the other applica￾tion of A and uvwxy is the entire unoriginal sentence. Now we can immediately find
another unoriginal sentence, by removing the smaller triangle headed by A and replac￾ing it by a copy of the larger triangle headed by A; see Figure 2.24.
S.............................. u . ... . ... .... . .. . ... .. ... ... ... .. ... . .. . .... y A.................... v . ... . .... ... . .. . .... . .. . .... x A.................... v . ... . .... ... . .. . .... . .. . .... x A......... . ... .. ... .... qw
Figure 2.24 Another unoriginal sentence, uv 2wx 2y
This new tree produces the sentence uvvwxxy and it is easy to see that we can, in this
way, construct a complete family of sentences uv nwx ny for all n≥0; the w is nested in a
number of v and x brackets, in an indifferent context of u and y.
The bottom line is that when we examine longer and longer sentences in a
context-free language, the original sentences become exhausted and we meet only fam￾ilies of closely related sentences telescoping off into infinity. This is summarized in
the uvwxy theorem: any sentence generated by a CF grammar, that is longer than the
longest original sentence from that grammar, can be cut into five pieces u, v, w, x and y
in such a way that uv nwx ny is a sentence from that grammar for all n≥0. The uvwxy
theorem has several variants; it is also called the pumping lemma for context-free
languages.
Two remarks must be made here. The first is that if a language keeps on being ori￾ginal in longer and longer sentences without reducing to families of nested sentences,
there cannot be a CF grammar for it. We have already encountered the context￾sensitive language anbnc n
and it is easy to see (but not quite so easy to prove!) that it
does not decay into such nested sentences, as sentences get longer and longer. Conse￾quently, there is no CF grammar for it.
The second is that the longest original sentence is a property of the grammar, not
of the language. By making a more complicated grammar for a language we can
increase the set of original sentences and push away the border beyond which we are
forced to resort to nesting. If we make the grammar infinitely complicated, we can push
the border to infinity and obtain a phrase structure language from it. How we can make
a CF grammar infinitely complicated, is described in the Section on two-level gram￾mars, 2.4.
56 Grammars as a generating device [Ch. 2
2.7.2 The uvw theorem
Start_symbol
. . . P . . . . . . Q u A u . . . R u . . . . . . S u v A A appears again
u v . . . T u v . . . . . . U u v w
Figure 2.25 Repeated occurrence of A may result in repeated occurrence of v A simpler form of the uvwxy theorem applies to regular (Type 3) languages. We have
seen that the sentential forms occurring in the production process for a FS grammar all
contain only one non-terminal, which occurs at the end. During the production of a
very long sentence, one or more non-terminals must occur two or more times, since
there are only a finite number of non-terminals. Figure 2.25 shows what we see, when
we list the sentential forms one by one; the substring v has been produced from one
occurrence of A to the next, u is a sequence that allows us to reach A, and w is a
sequence that allows us to terminate the production process. It will be clear that, start￾ing from the second A, we could have followed the same path as from the first A, and
thus have produced uvvw. This leads us to the uvw theorem, or the pumping lemma for
regular languages: any sufficiently long string from a regular language can be cut into
three pieces u, v and w, so that uv nw is a string in the language for all n≥0.
2.8 HYGIENE IN GRAMMARS
Although the only requirement for a CF grammar is that there is exactly one non￾terminal in the left-hand sides of all its rules, such a general grammar can suffer from a
(small) number of ailments.
2.8.1 Undefined non-terminals
The right-hand sides of some rules may contain non-terminals for which no production
rule is given. Remarkably, this does not seriously affect the sentence generation pro￾cess described in 2.5.2: if a sentential form containing an undefined non-terminal turns
up for processing in a left-most production process, there will be no match, and the sen￾tential form is a blind alley and will be discarded. The rule with the right-hand side
containing the undefined non-terminal will never have issue and can indeed be
removed from the grammar. (If we do this, we may of course remove the last defini￾tion of another non-terminal, which will then in turn become undefined, etc.)
From a theoretical point of view there is nothing wrong with an undefined non￾terminal, but if a user-specified grammar contains one, there is almost certainly an
error, and any grammar-processing program should mark such an occurrence as an
error.
Sec. 2.8] Hygiene in grammars 57
2.8.2 Unused non-terminals
If a non-terminal never occurs in the right-hand side of any rule, its defining rules will
never be used. Again this is no problem, but almost certainly implies an error some￾where.
This error is actually harder to detect than it looks. Just searching all right-hand
sides is not good enough: imagine a rule X→aX where X does not occur elsewhere in
the grammar. Then X occurs in a right-hand side, yet it will never be used. An algo￾rithm to determine the set of unused non-terminals is given in Section 4.2.3.4.
2.8.3 Non-productive non-terminals
Suppose X has as its only rule X→aX and suppose X can be reached from the start sym￾bol. Now X will still not contribute anything to the sentences of the language of the
grammar, since once X is introduced, there is no way to get rid of X: any non-terminals
that does not in itself produce a sublanguage is non-productive and its rules can be
removed. Note that such removal will make the non-terminal undefined. An algorithm
to determine if a non-terminal generates anything at all is given in 4.2.3.3.
To clean up a grammar, it is necessary to first remove the non-productive non￾terminals, then the undefined ones and then the unused ones. These three groups
together are called useless non-terminals.
2.8.4 Loops
The above definition makes “non-useless” all rules that can be involved in the produc￾tion of a sentence, but there still is a class of rules that are not really useful: rules of the
form A→A. Such rules are called loops: loops can also be indirect: A→B, B→C, C→A. A loop can legitimately occur in the production of a sentence, but if it does there is also
a production of that sentence without the loop. Loops don’t contribute to the language
and any sentence the production of which involves a loop is infinitely ambiguous,
meaning that there are infinitely many production trees for it. Algorithms for loop
detection are given in Section 4.1.2.
Different parsers react differently to grammars with loops. Some (most of the gen￾eral parsers) faithfully attempt to construct an infinite number of parse trees, some (for
instance, the CYK parser) collapse the loop as described above and some (most deter￾ministic parsers) reject the grammar. The problem is aggravated by the fact that loops
can be concealed by ε-rules: a loop may only become visible when certain non￾terminals produce ε.
2.9 THE SEMANTIC CONNECTION
Sometimes parsing serves only to check the correctness of a string; that the string con￾forms to a given grammar may be all we want to know, for instance because it confirms
our hypothesis that certain observed patterns are indeed correctly described by the
grammar we have designed for it. Often, however, we want to go further: we know that
the string conveys a meaning, its semantics, and this semantics is directly related to the
structure of the production tree of the string. (If it is not, we have the wrong grammar!)
Attaching semantics to a grammar is done in a very simple and effective way: to
each rule in the grammar, a semantic clause is attached that relates the semantics of the
members of the right-hand side of the rule to the semantics of the entire rule (in which
case the semantic information flows from the leaves of the tree upwards to the start
58 Grammars as a generating device [Ch. 2
symbol) or the other way around (in which case the semantic information flows down￾wards from the start symbol to the leaves) or both ways (in which case the semantic
information may have to flow up and down for a while until a stable situation is
reached). Semantic information flowing down is called inherited: each rule inherits it
from its parent in the tree; semantic information flowing up is called derived: each rule
derives it from its children.
There are many ways to express semantic clauses; since our subject is parsing and
syntax rather than semantics, we will briefly describe only two often-used and well￾studied techniques: attribute grammars and transduction grammars. We shall explain
both using the same simple example, the language of sums of one-digit numbers; the
semantics of a sentence in this language is the value of the sum. The language is gen￾erated by the grammar of Figure 2.26.
SumS -> Digit Sum -> Sum + Digit Digit -> 0 | 1 | ... | 9
Figure 2.26 A grammar for sums of one-digit numbers
One of its sentences is, for instance, 3+5+1; its semantics is 9.
2.9.1 Attribute grammars
The semantic clauses in an attribute grammar assume that each node in the production
tree has room for one or more attributes, which are just values (numbers, strings or
anything else) sitting in nodes in production trees. For simplicity we restrict ourselves
to attribute grammars with only one attribute per node. The semantic clause of a rule in
such a grammar contains some formulas which calculate the attributes of some of the
non-terminals in that rule (=nodes in the production tree) from other non-terminals in
that rule.
If the semantic clause of a rule R calculates the attribute of the left-hand side of R,
that attribute is derived; if it calculates an attribute of one of the non-terminals in the
right-hand side of R, say T, then that attribute is inherited by T. Derived attributes are
also called “synthesized attributes”. The attribute grammar for our example is:
1. SumS -> Digit {A0:=A1}
2. Sum -> Sum + Digit {A0:=A1+A3}
3a. Digit -> 0 {A0:=0} ... ...
3j. Digit -> 9 {A0:=9}
The semantic clauses are given between curly brackets. A0
is the (derived) attribute of
the left-hand side, A1 . . . An are the attributes of the members of the right-hand side.
Traditionally, terminal symbols in a right-hand side are also counted in determining the
index of A, although they do not (normally) carry attributes; the Digit in rule 2 is in
position 3 and its attribute is A3. Most systems for handling attribute grammars have
less repetitive ways to express rule 3a through 3j.
The initial parse tree for 3+5+1 is given in Figure 2.27. First only the attributes
for the leaves are known, but as soon as all attributes in a right-hand side of a
Sec. 2.9] The semantic connection 59
+ + 1 3 5 A0=1 A0=3 A0=5
Figure 2.27 Initial stage of the attributed parse tree
production rule are known, we can use its semantic clause to calculate the attribute of
its left-hand side. This way the attribute values (semantics) percolate up the tree, finally
reach the start symbol and provide as with the semantics of the whole sentence, as
shown in Figure 2.28. Attribute grammars are a very powerful method of handling the
semantics of a language.
+ + 1 3 5 A0=9 A0=8 A0=1 A0=3 A0=5
Figure 2.28 Fully attributed parse tree
2.9.2 Transduction grammars
Transduction grammars define the semantics of a string (the “input string”) as another
string, the “output string” or “translation”, rather than as the final attribute of the start
symbol. This method is less powerful but much simpler than using attributes and often
sufficient. The semantic clause in a rule just contains the string that should be output
for the corresponding node. We assume that the string for a node is output just after the
strings for all its children. Other variants are possible and in fact usual. We can now
write a transduction grammar which translates a sum of digits into instructions to cal￾culate the value of the sum.
1. SumS -> Digit {"make it the result"}
2. Sum -> Sum + Digit {"add it to the previous result"}
3a. Digit -> 0 {"take a 0"} ... ...
3j. Digit -> 9 {"take a 9"}
This transduction grammar translates 3+5+1 into:
take a 3
make it the result
take a 5
add it to the previous result
take a 1
add it to the previous result
60 Grammars as a generating device [Ch. 2
which is indeed what 3+5+1 “means”.
2.10 A METAPHORICAL COMPARISON OF GRAMMAR TYPES
Text books claim that “Type n grammars are more powerful than Type n +1 grammars,
for n=0,1,2”, and one often reads statements like “A regular (Type 3) grammar is not
powerful enough to match parentheses”. It is interesting to see what kind of power is
meant. Naively, one might think that it is the power to generate larger and larger sets,
but this is clearly incorrect: the largest possible set of strings, Σ*, is easily generated by
the straightforward Type 3 grammar:
SS -> [Σ] S | ε
where [Σ] is an abbreviation for the symbols in the language. It is just when we want to
restrict this set, that we need more powerful grammars. More powerful grammars can
define more complicated boundaries between correct and incorrect sentences. Some
boundaries are so fine that they cannot be described by any grammar (that is, by any
generative process).
This idea has been depicted metaphorically in Figure 2.29, in which a rose is
approximated by increasingly finer outlines. In this metaphor, the rose corresponds to
the language (imagine the sentences of the language as molecules in the rose); the
grammar serves to delineate its silhouette. A regular grammar only allows us straight
horizontal and vertical line segments to describe the flower; ruler and T-square suffice,
but the result is a coarse and mechanical-looking picture. A CF grammar would
approximate the outline by straight lines at any angle and by circle segments; the draw￾ing could still be made using the classical tools of compasses and ruler. The result is
stilted but recognizable. A CS grammar would present us with a smooth curve tightly
enveloping the flower, but the curve is too smooth: it cannot follow all the sharp turns
and it deviates slightly at complicated points; still, a very realistic picture results. An
unrestricted phrase structure grammar can represent the outline perfectly. The rose
itself cannot be caught in a finite description; its essence remains forever out of our
reach.
A more prosaic and practical example can be found in the successive sets of Pas￾cal†
programs that can be generated by the various grammar types.
The set of all lexically correct Pascal programs can be generated by a regular
grammar. A Pascal program is lexically correct if there are no newlines inside
strings, comment is terminated before end-of-file, all numerical constants have the
right form, etc.
The set of all syntactically correct Pascal programs can be generated by a
context-free grammar. These programs conform to the (CF) grammar in the
manual.
The set of all semantically correct Pascal programs can be generated by a CS
grammar (although a VW grammar would be more practical). These are the ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† We use the programming language Pascal here because we expect that most of our readers will
be more or less familiar with it. Any programming language for which the manual gives a CF
grammar will do.
Sec. 2.10] A metaphorical comparison of grammar types 61
Figure 2.29 The silhouette of a rose, approximated by Type 3 to Type 0 grammars
programs that pass through a Pascal compiler without drawing error messages.
The set of all Pascal programs that would terminate in finite time when run with a
given input can be generated by an unrestricted phrase structure grammar. Such a
grammar would, however, be very complicated, even in van Wijngaarden form,
since it would incorporate detailed descriptions of the Pascal library routines and
the Pascal run-time system.
The set of all Pascal programs that solve a given problem (for instance, play
chess) cannot be generated by a grammar (although the description of the set is
finite).
Note that each of the above sets is a subset of the previous set.`

const GrammarsAsAGeneratingDevice = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
  export default GrammarsAsAGeneratingDevice