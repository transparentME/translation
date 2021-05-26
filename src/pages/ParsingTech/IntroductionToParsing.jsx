import MarkdownTransfer from '../../components/MarkdownTransfer'
const IntroductionToParsing = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
const content = `To parse a string according to a grammar means to reconstruct the production tree (or trees) that indicate how the given string can be produced from the given grammar.
根据语法来编译字符串，意味着你需要重新构建产物树（可能是多个），由这些产物树来表达如何根据现有的语法加工现有的字符串。
There are two important points here;
这里有两个关键点。
one is that we do require the entire production tree and the other is that there may be more than one such tree.
第一个就是我们需要一个完整的产出树，另外一个就是可续是需要多余一个这样的产出树。
The requirement to recover the production tree is not natural.

After all, a grammar is a condensed description of a set of strings, i.e., a language, and our input string either belongs or does not belong to that language;
毕竟，语法其实就是一段字符（例如：语言）的一种浓缩的描述，而我们输入的字符要么属于要么不属于这个语言。
no internal structure or production path is involved.
这其中不包括内部结构与产物路径。
If we adhere to this formal view, the only meaningful question we can ask is if a given string can be recognized according to a grammar;
如果我们认可这个观点的话，那么我们只需要问一个有意义的问题：是否现有的字符串可以被一种语法所识别。
any question as to how, would be a sign of senseless, even morbid curiosity.

In practice, however, grammars have semantics attached to them;
实际上，语法是会包含语义学的。
specific semantics is attached to specific rules, and in order to find out which rules were involved in the production of a string and how, we need the production tree.
特定的语义来自于特定的语法，并且为了知道结果字符中包含、以及如何包含哪一个规则，我们是需要结果树的。
Recognition is (often) not enough, we need parsing to get the full benefit of the syntactic approach.
识别通常是不够的，我们需要通过编译来利用语义方法来做点什么。

3.1 VARIOUS KINDS OF AMBIGUITY
    各种含糊不清的表达
A sentence from a grammar can easily have more than one production tree, i.e., there can easily be more than one way to produce the sentence.
从一个语法来的某一个语句，可以有很多结果树。例如，可以有很多中方法以轻易的生成语句。
From a formal point of view this is again a non-issue (a set does not count how many times it contains an element), but as soon as we are interested in the semantics, the difference becomes significant.
正常来说，也不是什么大问题，（set并不会去计算一个元素出现了多少次），但是一旦当你对语义感兴趣的时候，不同就显得越发的明显。
Not surprisingly, a sentence with more than one production tree is called ambiguous, but we must immediately distinguish between essential ambiguity and spurious ambiguity.
一个句子可以有多个结果树，就被称之为“含糊不清的表达”，但是我们必须理解区分一下什么叫“essential ambiguity”，什么叫假含糊不清。
The difference comes from the fact that we are not interested in the production trees per se, but rather in the semantics they describe.
他们的区别来自于，我们对结果树不感兴趣，而对他们描述的语义感兴趣。
An ambiguous sentence is spuriously ambiguous if all its production trees describe the same semantics;


if some of them differ in their semantics, the ambiguity is essential.
The notion “ambiguity” can also be defined for grammars: a grammar is essentially ambiguous if it can produce an essentially ambiguous sentence, spuriously ambiguous if it can produce a spuriously ambiguous sentence (but not an essentially ambiguous one) and unambiguous if it can￾not do either.
Strangely enough, languages also can be ambiguous: there are (context free) languages for which there is no unambiguous grammar;
such languages belong in a research lab, in a cage.
For testing the possible ambiguity of a grammar, see Section 9.10.
1. SumS -> Digit { A0:=A1 }
2. Sum -> Sum + Sum { A0:=A1+A3 }
3a. Digit -> 0 { A0:=0 } .......
3j. Digit -> 9 { A0:=9 }
Figure 3.1 A simple ambiguous grammar
A simple ambiguous grammar is given in Figure 3.1. Note that rule 2 differs from
that in Figure 2.26. Now 3+5+1 has two production trees (Figure 3.2) but the semantics
is the same in both cases: 9. The ambiguity is spurious. If we change the + into a -,
however, the ambiguity becomes essential, Figure 3.3. The unambiguous grammar in
Figure 2.26 remains unambiguous and retains the correct semantics if + is changed into
-. 2 1 2 1 1 3c 3e 3a 3 + 5 + 1 9 3 6 5 1 2 2 1 1 1 3c 3e 3a 3 + 5 + 1 9 8 1 3 5
Figure 3.2 Spurious ambiguity: no change in semantics
2 1 2 1 1 3c 3e 3a 3 - 5 - 1 −1 3 4 5 1 2 2 1 1 1 3c 3e 3a 3 - 5 - 1 −3 −2 1 3 5
Figure 3.3 Essential ambiguity: the semantics differ
64 Introduction to parsing [Ch. 3
3.2 LINEARIZATION OF THE PARSE TREE
Often it is inconvenient and unnecessary to construct the actual production tree: many
parsers produce a list of rule numbers instead, which means that they linearize the
parse tree. There are three main ways to linearize a tree, prefix, postfix and infix. In
prefix notation, each node is listed by listing its number followed by prefix listings of
the subnodes in left-to-right order; this gives us the left-most derivation (for the right
tree in Figure 3.2):
left-most: 2 2 1 3c 1 3e 1 3a
In postfix notation, each node is listed by listing in postfix notation all the subnodes in
left-to-right order, followed by the number of the rule in the node itself; this gives us
the right-most derivation (for the same tree):
right-most: 3c 1 3e 1 2 3a 1 2
In infix notation, each node is listed by first giving an infix listing between parentheses
of the first n subnodes, followed by the rule number in the node, followed by an infix
listing between parentheses of the remainder of the subnodes; n can be chosen freely
and can even differ from rule to rule, but n =1 is normal. Infix notation is not common
for derivations, but is occasionally useful. The case with n =1 is called the left-corner
derivation; in our example we get:
left-corner: (((3c)1) 2 ((3e)1)) 2 ((3a)1)
The infix notation requires parentheses to enable us to reconstruct the production tree
from it. The left-most and right-most derivations can do without, provided we have the
grammar ready to find the number of subnodes for each node. Note that it is easy to tell
if a derivation is left-most or right-most: a left-most derivation starts with a rule for the
start symbol, a right-most derivation starts with a rule that produces terminal symbols
only (if both conditions hold, there is only one rule, which is both left-most and right￾most derivation).
The existence of several different derivations should not be confused with ambi￾guity. The different derivations are just notational variants for one and the same pro￾duction tree. No semantic significance can be attached to their differences.
3.3 TWO WAYS TO PARSE A SENTENCE
The basic connection between a sentence and the grammar it derives from is the parse
tree, which describes how the grammar was used to produce the sentence. For the
reconstruction of this connection we need a parsing technique. When we consult the
extensive literature on parsing techniques, we seem to find dozens of them, yet there
are only two techniques to do parsing; all the rest is technical detail and embellishment.
The first method tries to imitate the original production process by rederiving the
sentence from the start symbol. This method is called top-down, because the production
tree is reconstructed from the top downwards.† ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† Trees grow from their roots downwards in computer science; this is comparable to electrons
Sec. 3.3] Two ways to parse a sentence 65
The second methods tries to roll back the production process and to reduce the
sentence back to the start symbol. Quite naturally this technique is called bottom-up.
3.3.1 Top-down parsing
Suppose we have the monotonic grammar for the language anbnc n
from Figure 2.6,
which we repeat here:
SS -> aSQ S -> abc bQc -> bbcc cQ -> Qc
and suppose the (input) sentence is aabbcc. First we try the top-down parsing method.
We know that the production tree must start with the start symbol:
S
Now what could the second step be? We have two rules for S: S->aSQ and S->abc.
The second rule would require the sentence to start with ab, which it does not; this
leaves us S->aSQ: S a S Q
This gives us a good explanation of the first a in our sentence. Again two rules apply:
S->aSQ and S->abc. Some reflection will reveal that the first rule would be a bad
choice here: all production rules of S start with an a, and if we would advance to the
stage aaSQQ, the next step would inevitably lead to aaa...., which contradicts the
input string. The second rule, however, is not without problems either:
S a S Q a a b c Q
since now the sentence starts with aabc..., which also contradicts the input sentence.
Here, however, there is a way out: cQ->Qc:
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
having a negative charge in physics.
66 Introduction to parsing [Ch. 3 S a S Q a b c Q a a b Q c
Now only one rule applies: bQc->bbcc, and we obtain our input sentence (together
with the production tree):
S a S Q a b c Q b Q c a a b b c c
Top-down parsing tends to identify the production rules (and thus to characterize
the parse tree) in prefix order.
3.3.2 Bottom-up parsing
Using the bottom-up technique, we proceed as follows. One production step must have
been the last and its result must still be visible in the string. We recognize the right￾hand side of bQc->bbcc in aabbcc. This gives us the final step in the production (and
the first in the reduction):
a a b Q c a a b b c c
Now we recognize the Qc as derived by cQ->Qc: a a b c Q b Q c a a b b c c
Again we find only one recognizable substring: abc:
Sec. 3.3] Two ways to parse a sentence 67
a S Q a b c Q b Q c a a b b c c
and also our last reduction step leaves us no choice:
S a S Q a b c Q b Q c a a b b c c
Bottom-up parsing tends to identify the production rules in postfix order. It is
interesting to note that bottom-up parsing turns the parsing process into a production
process. The above reduction can be viewed as a production with the reversed gram￾mar:
aSQ -> S abc -> S bbcc -> bQc Qc -> cQ
augmented with a rule that turns the start symbol into a new terminal symbol:
S -> !
and a rule which introduces a new start symbol, the original sentence:
IS -> aabbcc
If, starting from I, we can produce ! we have recognized the input string, and if we
have kept records of what we did, we also have obtained the parse tree.
3.3.3 Applicability
The above examples show that both the top-down and the bottom-up method will work
under certain circumstances, but also that sometimes quite subtle considerations are
involved, of which it is not at all clear how we can teach them to a computer. Almost
the entire body of parser literature is concerned with formalizing these subtle
68 Introduction to parsing [Ch. 3
considerations, and with considerable success.
Note: It is also possible to reconstruct some parts of the production tree top-down
and other parts bottom-up. Such methods identify the production rules in some infix
order and are called left-corner.
3.4 NON-DETERMINISTIC AUTOMATA
Both examples above feature two components: a machine that can make substitutions
and record a parse tree, and a control mechanism that decides which moves the
machine should make. The machine is relatively simple since its substitutions are res￾tricted to those allowed by the grammar, but the control mechanism can be made arbi￾trarily complex and may incorporate extensive knowledge of the grammar.
This structure can be discerned in all parsing methods; there always is a substitut￾ing and record-keeping machine and a guiding control mechanism (Figure 3.4).
control
mechanism
substituting and
record-keeping
mechanism
Figure 3.4 Global structure of a parser
The substituting machine is called a non-deterministic automaton or NDA; it is called
“non-deterministic” since it often has several possible moves and the particular choice
is not predetermined, and an “automaton” since it fits the Webster†
definition “an
apparatus that automatically performs certain actions by responding to preset controls
or encoded instructions”. It manages three items: the input string (actually a copy of
it), the partial parse tree and some internal administration. Every move of the NDA
transfers some information from the input string through the administration to the par￾tial parse tree; each of the three items may be modified in the process:
partial
parse
trees
control input
internal
administration
The great strength of a NDA, and the main source of its usefulness, is that it can
easily be constructed so that it can only make “correct” moves, that is, moves that keep ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† Webster’s New Twentieth Century Dictionary, The World Publ. Comp., Cleveland, 1970.
Sec. 3.4] Non-deterministic automata 69
the system of partially processed input, internal administration and partial parse tree
consistent. This has the consequence that we may move the NDA any way we choose:
it may move in circles, it may even get stuck, but if it ever gives us an answer, i.e., a
finished parse tree, that answer will be correct. It is also essential that the NDA can
make all correct moves, so that it can produce all parsings if the control mechanism is
clever enough to guide the NDA there. This property of the NDA is also easily
arranged.
The inherent correctness of the NDA allows great freedom to the control mechan￾ism, the “control” for short. It may be naive or sophisticated, it may be cumbersome or
it may be efficient, it may even be wrong, but it can never cause the NDA to produce
an incorrect parsing; and that is a comforting thought. (If it is wrong it may, however,
cause the NDA to miss a correct parsing, to loop infinitely or to get stuck in a place
where it should not).
3.4.1 Constructing the NDA
The NDA derives directly from the grammar. For a top-down parser its moves consist
essentially of the production rules of the grammar and the internal administration is ini￾tially the start symbol. The control moves the machine until the internal administration
is equal to the input string; then a parsing has been found. For a bottom-up parser the
moves consist essentially of the reverse of the production rules of the grammar (see
3.3.2) and the internal administration is initially the input string. The control moves the
machine until the internal administration is equal to the start symbol; then a parsing has
been found. A left-corner parser works like a top-down parser in which a carefully
chosen set of production rules has been reversed and which has special moves to undo
this reversion when needed.
3.4.2 Constructing the control mechanism
Constructing the control of a parser is quite a different affair. Some controls are
independent of the grammar, some consult the grammar regularly, some use large
tables precalculated from the grammar and some even use tables calculated from the
input string. We shall see examples of each of these: the “hand control” that was
demonstrated at the beginning of this section comes in the category “consults the gram￾mar regularly”, backtracking parsers often use a grammar-independent control, LL and
LR parsers use precalculated grammar-derived tables, the CYK parser uses a table
derived from the input string and Earley’s and Tomita’s parsers use several tables
derived from the grammar and the input string.
Constructing the control mechanism, including the tables, from the grammar is
almost always done by a program. Such a program is called a parser generator; it is fed
the grammar and perhaps a description of the terminal symbols and produces a program
which is a parser. The parser often consists of a driver and one or more tables, in which
case it is called table-driven. The tables can be of considerable size and of extreme
complexity.
The tables that derive from the input string must of course be calculated by a rou￾tine that is part of the parser. It should be noted that this reflects the traditional setting
in which a large number of different input strings is parsed according to a relatively
static and unchanging grammar. The inverse situation is not at all unthinkable: many
grammars are tried to explain a given input string (for instance, an observed sequence
of events).
70 Introduction to parsing [Ch. 3
3.5 RECOGNITION AND PARSING FOR TYPE 0 TO TYPE 4 GRAMMARS
Parsing a sentence according to a grammar if we know in advance that the string indeed
derives from the grammar, is in principle always possible. If we cannot think of any￾thing better, we can just run the general production process of 2.5.1 on the grammar
and sit back and wait until the sentence turns up (and we know it will); this by itself is
not exactly enough, we must extend the production process a little, so that each senten￾tial form carries its own partial production tree, which must be updated at the appropri￾ate moments, but it is clear that this can be done with some programming effort. We
may have to wait a little while (say a couple of million years) for the sentence to show
up, but in the end we will surely obtain the parse tree. All this is of course totally
impractical, but it still shows us that at least theoretically any string can be parsed if we
know it is parsable, regardless of the grammar type.
3.5.1 Time requirements
When parsing strings consisting of more than a few symbols, it is important to have
some idea of the time requirements of the parser, i.e., the dependency of the time
required to finish the parsing on the number of symbols in the input string. Expected
lengths of input range from some tens (sentences in natural languages) to some tens of
thousands (large computer programs); the length of some input strings may even be vir￾tually infinite (the sequence of buttons pushed on a coffee vending machine over its
life-time). The dependency of the time requirements on the input length is also called
time complexity.
Several characteristic time dependencies can be recognized. A time dependency
is exponential if each following input symbol multiplies the required time by a constant
factor, say 2: each additional input symbol doubles the parsing time. Exponential time
dependency is written O(Cn) where C is the constant multiplication factor. Exponential
dependency occurs in the number of grains doubled on each field of the famous chess
board; this way lies bankrupcy.
A time dependency is linear if each following input symbol takes a constant
amount of time to process; doubling the input length doubles the processing time. This
is the kind of behaviour we like to see in a parser; the time needed for parsing is pro￾portional to the time spent on reading the input. So-called real-time parsers behave
even better: they can produce the parse tree within a constant time after the last input
symbol was read; given a fast enough computer they can keep up indefinitely with an
input stream of constant speed. (Note that the latter is not necessarily true of linear￾time parsers: they can in principle read the entire input of n symbols and then take a
time proportional to n to produce the parse tree.)
Linear time dependency is written O(n). A time dependency is called quadratic if
the processing time is proportional to the square of the input length (written O(n2
)) and
cubic if it is proportional to the to the third power (written O(n3
)). In general, a depen￾dency that is proportional to any power of n is called polynomial (written O(np
)).
3.5.2 Type 0 and Type 1 grammars
It is a remarkable result in formal linguistics that the recognition problem for a arbi￾trary Type 0 grammar cannot be solved. This means that there cannot be an algorithm
that accepts an arbitrary Type 0 grammar and an arbitrary string and tells us in finite
time if the grammar can produce the string or not. This statement can be proven, but the
proof is very intimidating and, what is worse, does not provide any insight into the
Sec. 3.5] Recognition and parsing for Type 0 to Type 4 grammars 71
cause of the phenomenon. It is a proof by contradiction: we can prove that, if such an
algorithm existed, we could construct a second algorithm of which we can prove that it
only terminates if it never terminates. Since the latter is a logical impossibility and
since all other premisses that went into the intermediate proof are logically sound we
are forced to conclude that our initial premiss, the existence of a recognizer for Type 0
grammars, is a logical impossibility. Convincing, but not food for the soul. For the full
proof see Hopcroft and Ullman [Books 1979, pp. 182-183] or Révész [Books 1985, p.
98].
It is quite possible to construct a recognizer that works for a certain number of
Type 0 grammars, using a certain technique. This technique, however, will not work
for all Type 0 grammars. In fact, however many techniques we collect, there will
always be grammars for which they do not work. In a sense we just cannot make our
recognizer complicated enough.
For Type 1 grammars, the situation is completely different. The seemingly incon￾sequential property that Type 1 production rules cannot make a sentential form shrink
allows us to construct a control mechanism for a bottom-up NDA that will at least
work in principle, regardless of the grammar. The internal administration of this control
consists of a set of sentential forms that could have played a role in the production of
the input sentence; it starts off containing only the input sentence. Each move of the
NDA is a reduction according to the grammar. Now the control applies all possible
moves of the NDA to all sentential forms in the internal administration in an arbitrary
order, and adds each result to the internal administration if it is not already there. It
continues doing so until each move on each sentential form results in a sentential form
that has already been found. Since no move of the NDA can make a sentential form
longer (because all right-hand sides are at least as long as their left-hand sides) and
since there are only a finite number of sentential forms as long as or shorter than the
input string, this must eventually happen. Now we search the sentential forms in the
internal administration for one that consists solely of the start symbol; if it is there, we
have recognized the input string, if it is not, the input string does not belong to the
language of the grammar. And if we still remember, in some additional administration,
how we got this start symbol sentential form, we have obtained the parsing. All this
requires a lot of book-keeping, which we are not going to discuss, since nobody does it
this way anyway.
To summarize the above, we cannot always construct a parser for a Type 0 gram￾mar, but for a Type 1 grammar we always can. The construction of a practical and rea￾sonably efficient parser for such grammars is a very difficult subject on which slow but
steady progress has been made during the last 20 years (see the bibliography on
“Unrestricted PS and CS Grammars”). It is not a hot research topic, mainly because
Type 0 and Type 1 grammars are well-known to be human-unfriendly and will never
see wide application. Yet it is not completely devoid of usefulness, since a good parser
for Type 0 grammars would probably make a good starting point for a theorem prover.†
The human-unfriendliness consideration does not apply to two-level grammars.
Having a practical parser for two-level grammars would be marvellous, since it would
allow parsing techniques (with all their built-in automation) to be applied in many more ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† A theorem prover is a program that, given a set of axioms and a theorem, proves or disproves
the theorem without or with minimal human intervention.
72 Introduction to parsing [Ch. 3
areas than today, especially there where context conditions are important. The prob￾lems in constructing such a parser are at least as great as those seen above, but Fisher
[VW 1985] has obtained some encouraging results.
All known parsing algorithms for Type 0, Type 1 and unrestricted VW grammars
have exponential time dependency.
3.5.3 Type 2 grammars
Fortunately, much better parsing algorithms are known for CF (Type 2) grammars than
for Type 0 and Type 1. Almost all practical parsing is done using CF and FS grammars,
and almost all problems in context-free parsing have been solved. The cause of this
large difference can be found in the locality of the CF production process: the evolution
of one non-terminal in the sentential form is totally independent of the evolution of any
other non-terminal, and, conversely, during parsing we can combine partial parse trees
regardless of their histories. Neither is true in a context-sensitive grammar.
Both the top-down and the bottom-up parsing processes are readily applicable to
CF grammars. In the examples below we shall use the simple grammar
SentenceS -> Subject Verb Object Subject -> the Noun | a Noun | ProperName Object -> the Noun | a Noun | ProperName Verb -> bit | chased Noun -> cat | dog ProperName -> ...
3.5.3.1 Top-down parsing
In top-down parsing we start with the start symbol and try to produce the input. The
keywords here are predict and match. At any time there is a left-most non-terminal A
in the sentential form and the parser tries systematically to predict a fitting alternative
for A, as far as compatible with the symbols found in the input at the position where the
result of A could start. Consider the example of Figure 3.5, where Object is the left￾most non-terminal.
Input: the cat bit a dog
Sentential form: the cat bit Object
(the internal administration)
Figure 3.5 Top-down parsing as the imitation of the production process
In this situation, the parser will first predict the Noun for Object, but will immedi￾ately reject this alternative since it requires the where the input has a. Next, it will try
a Noun, which is temporarily accepted. The a is matched and the new left-most non￾terminal is Noun. This parse will succeed when Noun eventually produces dog. The
parser will then attempt a third prediction for Object, ProperName; this alternative is
not immediately rejected as the parser cannot see that ProperName cannot start with a.
It will fail at a later stage.
There are two serious problems with this approach. Although it can, in principle,
handle arbitrary CF grammars, it will loop on some grammars if implemented naively.
This can be avoided by using some special techniques, which result in general top-
Sec. 3.5] Recognition and parsing for Type 0 to Type 4 grammars 73
down parsers; these are treated in detail in Chapter 6. The second problem is that the
algorithm requires exponential time since any of the predictions may turn out wrong
and may have to be corrected by trial and error. The above example shows that some
efficiency can be gained by preprocessing the grammar: it is advantageous to know in
advance what tokens can start ProperName, to avoid predicting an alternative that is
doomed in advance. This is true for most non-terminals in the grammar and this kind of
information can be easily calculated from the grammar and stored in a table for use
during parsing. For a reasonable set of grammars, linear time dependency can be
achieved, as explained in Chapter 8.
3.5.3.2 Bottom-up parsing
In bottom-up parsing we start with the input and try to reduce it to the start symbol.
Here the keywords are shift and reduce. When we are in the middle of the process, we
have in our hands a sentential form reduced from the input. Somewhere in this senten￾tial form there must be a segment (a substring) that was the result of the last production
step that produced this sentential form; this segment is the right-hand side of a non￾terminal to which it must now be reduced. This segment is called the handle of the sen￾tential form, a quite adequate expression. See Figure 3.6. The trick is to find the handle.
It must be the right-hand side of a rule, so we start looking for such a right-hand side by
shifting symbols from the sentential form into the internal administration. When we
find a right-hand side we reduce it to its left-hand side and repeat the process, until only
the start symbol is left. We will not always find the correct handle this way; if we err,
we will get stuck further on, will have to undo some steps, shift in more symbols and
try again. In the above example we could have reduced the a Noun to Object, thereby
boldly heading for a dead end.
Subject chased a dog a Noun chased a dog
production reduction
handle
Figure 3.6 Bottom-up parsing as the inversion of the production process
There are essentially the same two problems with this approach as with the top￾down technique. It may loop, and will do so on grammars with ε-rules: it will continue
to find empty productions all over the place. This can be remedied by touching up the
grammar. And it can take exponential time, since the correct identification of the han￾dle may have to be done by trial and error. Again, doing preprocessing on the grammar
often helps: it is easy to see from the grammar that Subject can be followed by
chased, but Object cannot; so it is unprofitable to reduce a handle to Object if the
next symbol is chased.
3.5.4 Type 3 grammars
A right-hand side in a regular grammar contains at most one non-terminal, so there is
no difference between left-most and right-most production. Top-down methods are
much more efficient for regular grammars than bottom-up methods.† When we take the ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† Some regular grammars have, however, rules of the form A →a and A →Ba (and no others); in
that case bottom-up methods work better.
74 Introduction to parsing [Ch. 3
production tree of Figure 2.14 and if we turn it 45° counterclockwise, we get the pro￾duction line of Figure 3.7. The sequence of non-terminals roll on to the right, producing
terminals symbols as they go. In parsing, we are given the terminals symbols and are
supposed to construct the sequence of non-terminals. The first one is given, the start
symbol (hence the preference for top-down). If only one rule for the start symbol starts
with the first symbol of the input we are lucky and know which way to go. Very often,
however, there are many rules starting with the same symbol and then we are in need of
more wisdom. As with Type 2 grammars, we can of course find the correct continua￾tion by trial and error, but far more efficient methods exist that can handle any regular
grammar. Since they form the basis of some advanced parsing techniques, they are
treated separately, in Chapter 5.
Sentence List ListTail List ListTail t , d & h
Figure 3.7 The production tree of Figure 2.14 as a production line
3.5.5 Type 4 grammars
Finite-choice (FC) grammars do not involve production trees, and membership of a
given input string to the language of the FC grammar can be determined by simple
look-up. This look-up is generally not considered to be “parsing”, but is still mentioned
here for two reasons. First it can benefit from parsing techniques and second it is often
required in a parsing environment. Natural languages have some categories of words
that have only a very limited number of members; examples are the pronouns, the
prepositions and the conjunctions. It is often important to decide quickly if a given
word belongs to one of these finite-choice categories or will have to be analysed
further. The same applies to reserved words in a programming language.
One approach is to consider the FC grammar as a regular grammar and apply the
techniques of Chapter 5. This is often amazingly efficient.
A second often-used approach is that using a hash table. See any book on algo￾rithms, for instance, Smith [CSBooks 1989].
3.6 AN OVERVIEW OF PARSING METHODS
The reader of literature about parsing is confronted with a large number of techniques
with often unclear interrelationships. Yet (almost) all techniques can be placed in a sin￾gle framework, according to some simple criteria; see Figure 3.10. We have already
seen that a parsing technique is either top-down or bottom-up. The next division is that
between non-directional and directional.
3.6.1 Directionality
A non-directional method constructs the parse tree while accessing the input in any
order it sees fit; this of course requires the entire input to be in memory before parsing
can start. There is a top-down and a bottom-up version.
Sec. 3.6] An overview of parsing methods 75
3.6.1.1 Non-directional methods
The non-directional top-down method is simple and straightforward and has probably
been invented independently by many people. It was first described by Unger [CF
1968] but in his article he gives the impression that the method already existed. The
method has not received much attention in the literature but is more important than one
might think, since it is used anonymously in a number of other parsers. We shall call it
Unger’s method; it is treated in Section 4.1.
The non-directional bottom-up method has also been discovered independently by
a number of people, among whom Cocke, Younger [CF 1967] and Kasami [CF 1969];
an earlier description is by Sakai [CF 1962]. It is named CYK (or sometimes CKY)
after the three best-known inventors. It has received considerable attention since its
naive implementation is much more efficient than that of Unger’s method. The effi￾ciency of both methods can be improved, however, arriving at roughly the same perfor￾mance (see Sheil [CF 1976]). The CYK method is treated in Section 4.2.
3.6.1.2 Directional methods
The directional methods process the input symbol by symbol, from left to right. (It is
also possible to parse from right to left, using a mirror image of the grammar; this is
occasionally useful.) This has the advantage that parsing can start, and indeed progress,
considerably before the last symbol of the input is seen. The directional methods are all
based explicitly or implicitly on the parsing automaton described in Section 3.5.3,
where the top-down method performs predictions and matches and the bottom-up
method performs shifts and reduces.
3.6.2 Search techniques
The next subdivision concerns the search technique used to guide the (non￾deterministic!) parsing automaton through all its possibilities to find one or all parsings.
There are in general two methods for solving problems in which there are several
alternatives in well-determined points: depth-first search, and breadth-first search. In
depth-first search we concentrate on one half-solved problem; if the problem bifurcates
at a given point P, we store one alternative for later processing and keep concentrating
on the other alternative. If this alternative turns out to be a failure (or even a success,
but we want all solutions), we roll back our actions until point P and continue with the
stored alternative. This is called backtracking. In breadth-first search we keep a set of
half-solved problems. From this set we calculate a new set of (better) half-solved prob￾lems by examining each old half-solved problem; for each alternative, we create a copy
in the new set. Eventually, the set will come to contain all solutions.
Depth-first search has the advantage that it requires an amount of memory that is
proportional to the size of the problem, unlike breadth-first search, which may require
exponential memory. Breadth-first search has the advantage that it will find the sim￾plest solution first. Both methods require in principle exponential time; if we want
more efficiency (and exponential requirements are virtually unacceptable), we need
some means to restrict the search. See any book on algorithms, for instance,
Sedgewick [CSBooks 1988], for more information on search techniques.
These search techniques are not at all restricted to parsing and can be used in a
wide array of contexts. A traditional one is that of finding an exit from a maze. Figure
3.8(a) shows a simple maze with one entrance and two exits. Figure 3.8(b) depicts the
path a depth-first search will take; this is the only option for the human maze-walker:
76 Introduction to parsing [Ch. 3
he cannot duplicate himself and the maze. Dead ends make the depth-first search back￾track to the most recent untried alternative. If the searcher will also backtrack at each
exit, he will find all exits. Figure 3.8(c) shows which rooms are examined in each
stage of the breadth-first search. Dead ends (in stage 3) cause the search branches in
question to be discarded. Breadth-first search will find the shortest way to an exit (the
shortest solution) first; if it continues until all there are no branches left, it will find all
exits (all solutions).
(a) (b) ...... . . . . . . . . . .. . . . . . . . . . .... . . . . . . . . . ...... . . . . . . . . . . ..... . . ........... .......... . . ..... . . ................. (c) 012 2 3 3 3 4 45 5 6
Figure 3.8 A simple maze with depth-first and breadth-first visits
3.6.3 General directional methods
Combining depth-first or breadth-first with top-down or bottom-up gives four classes
of parsing techniques. The top-down techniques are treated in Chapter 6. The depth￾first top-down technique allows a very simple implementation called recursive descent;
this technique, which is explained in Section 6.6, is very suitable for writing parsers by
hand. The bottom-up techniques are treated in Chapter 7. The combination of breadth￾first and bottom-up leads to the class of Earley parsers, which have among them some
very effective and popular parsers for general CF grammars. See Section 7.2.
3.6.4 Linear methods
Most of the general search methods indicated in the previous paragraph have exponen￾tial time dependency in the worst case: each symbol more in the input multiplies the
parsing time by a constant factor. Such methods are unusable except for very small
input length, where 20 symbols is about the maximum. Even the best of the above
methods require cubic time in the worst case: for 10 tokens they do 1000 actions, for
100 tokens 1000 000 actions and for 1000 tokens 1 000 000 000 actions, which, at 10
microseconds per action will already take almost 3 hours. It is clear that for real speed
we should like to have a linear-time general parsing method. Unfortunately no such
method has been discovered to date. On the other hand, there is no proof and not even
an indication that such a method could not exist. (Compare this to the situation around
unrestricted phrase structure parsing, where it has been proved that no algorithm for it
can exist; see Section 3.5.2.) Worse even, nobody has ever come up with a specific CF
grammar for which no ad hoc linear-time parser could be designed. The only thing is
that we have at present no way to construct such a parser in the general case. This is a
theoretically and practically unsatisfactory state of affairs that awaits further clarifica￾tion.† ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† There is a theoretically interesting but impractical method by Valiant [CF 1975] which does
general CF parsing in O(n
2.81). Since this is only very slightly better than O(n
3.00) and since
Sec. 3.6] An overview of parsing methods 77
In the meantime (and perhaps forever), we shall have to drop one of the two
adjectives from our goal, a linear-time general parser. We can have a general parser,
which will need cubic time at best, or we can have a linear-time parser, which will not
be able to handle all CF grammars, but not both. Fortunately there are parsing methods
(in particular LR parsing) that can handle very large classes of grammars but still, a
grammar that is designed without regard for a parsing method and just describes the
intended language in the most natural way has a small chance of allowing linear pars￾ing automatically. In practice, grammars are often first designed for naturalness and
then adjusted by hand to conform to the requirements of an existing parsing method.
Such an adjustment is usually relatively simple, depending on the parsing method
chosen. In short, making a linear-time parser for an arbitrary given grammar is 10%
hard work; the other 90% can be done by computer.
We can achieve linear parsing time by restricting the number of possible moves of
our non-deterministic parsing automaton to one in each situation. Since the moves of
such an automaton involve no choice, it is called a deterministic automaton.
The moves of a deterministic automaton are determined unambiguously by the
input stream (we can speak of a stream now, since the automaton operates from left to
right); as a result it can give only one parsing for a sentence. This is all right if the
grammar is unambiguous, but if it is not, the act of making the automaton deterministic
has pinned us down to one specific parsing; we shall say more about this in Section
9.6.5.
All that remains is to explain how a deterministic control mechanism for a parsing
automaton can be derived from a grammar. Since there is no single good solution to the
problem, it is not surprising that quite a number of sub-optimal solutions have been
found. From a very global point of view they all use the same technique: they analyse
the grammar in depth to bring to the surface information that can be used to identify
dead ends. These are then closed. If the method, applied to a grammar, closes enough
dead ends so that no choices remain, the method succeeds for that grammar and gives
us a linear-time parser. Otherwise it fails and we either have to look for a different
method or adapt our grammar to the method.
A (limited) analogy with the maze problem can perhaps make this clearer. If we
are allowed to do preprocessing on the maze (unlikely but instructive) the following
method will often make our search through it deterministic. We assume that the maze
consists of a grid of square rooms; see Figure 3.9(a). Now, if there is a room with three
walls, add the fourth wall. Continue with this process until no rooms with three walls
are left. If all rooms now have either two or four walls, there are no choices left and our
method has succeeded; see Figure 3.9(b, c). We see how this method brings informa￾tion about dead ends to the surface, to help restricting the choice.
It should be pointed out that the above analogy is a limited one. It is concerned
with only one object, the maze, which is preprocessed. In parsing we are concerned
with two objects, the grammar, which is static and can be preprocessed, and the input,
which varies.
Returning to the parsing automaton, we can state the fact that it is deterministic ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
the actions required are very complicated and time-consuming, Valiant’s algorithm is better
only for inputs of millions of symbols. Also, as it is a non-directional method, it would require
all these symbols to be in memory.
78 Introduction to parsing [Ch. 3 (a) (b) ...... . . . . . . . . . .. . . . . . . . . . .... . . . . . . . . . ...... . . ..... . . ........... .......... . . ..... . . ................. (c) ........... . . . ............
Figure 3.9 A single-exit maze made deterministic by preprocessing
more precisely: a parsing automaton is deterministic with look-ahead k if its control
can, given the internal administration and the next k symbols of the input, decide unam￾biguously what to do next (to either match or predict and what to predict in the top￾down case, and to either shift or reduce and how to reduce in the bottom-up case). Like
grammar types, linear parsing methods are indicated by initials, like LL, LALR etc. If a
method X uses a look-ahead of k symbols it is called X (k).
3.6.5 Linear top-down and bottom-up methods
There is only one linear top-down method, called LL; the first L stands for Left-to￾right, the second for “identifying the Left-most production”, as directional top-down
parsers do. LL parsing is treated in Chapter 8. LL parsing, especially LL(1) is very
popular. LL(1) parsers are often generated by a parser generator but a simple variant
can, with some effort, be written by hand, using recursive-descent techniques; see Sec￾tion 8.2.6. Occasionally, the LL(1) method is used starting from the last token of the
input backwards; it is then called RR(1).
There are quite a variety of linear bottom-up methods, the most powerful being
called LR, where again the L stand for Left-to-right and the R stand for “identifying the
Right-most production”. Linear bottom-up methods are treated in Chapter 9. Their
parsers are invariably generated by a parser generator: the control mechanism of such a
parser is so complicated that it is not humanly possible to construct it by hand. Some of
the linear bottom-up methods are very popular and are perhaps used even more widely
than the LL(1) method. LR(1) parsing is more powerful than LL(1) parsing, but also
more difficult to understand and less convenient. The other methods cannot be com￾pared easily to the LL(1) method. See Chapter 12 for a comparison of practical parsing
methods. The LR(1) method can also be applied backwards and is then called RL(1).
The great difference in variety between top-down and bottom-up methods is easily
understood when we look more closely at the choices the corresponding parsers face. A
top-down parser has by nature little choice: if a terminal symbol is predicted, it has no
choice and can only ascertain that a match is present; only if a non-terminal is predicted
it has a choice in the production of that non-terminal. A bottom-up parser can always
shift the next input symbol, even if a reduction is also possible (and it often has to do
so). If, in addition, a reduction is possible, it may have a choice between a number of
right-hand sides. In general it has more choice than a top-down parser and more power￾ful methods are needed to make it deterministic.
Sec. 3.6] An overview of parsing methods 79
3.6.6 Almost deterministic methods
When our attempt to construct a deterministic control for a parser fails and leaves us
with an almost deterministic one, we need not despair yet. We can fall back on
breadth-first search to solve the remnants of non-determinism at run-time. The better
our original method was, the less non-determinism will be left, the less often breadth￾first search will be needed and the more efficient our parser will be. This avenue of
thought has been explored for bottom-up parsers by Tomita [CF 1986], who achieves
with it what is probably the best general CF parser available today.
Of course, by reintroducing breadth-first search we are taking chances. The gram￾mar and the input could conspire so that the non-determinism gets hit by each input
symbol and our parser will again have exponential time dependency. In practice, how￾ever, they never do so and such parsers are very useful.
Tomita’s parser is treated in Section 9.8. No corresponding research on top-down
parsers has been reported in the literature. This is perhaps due to the fact that no
amount of breadth-first searching can handle left-recursion in a grammar (left￾recursion is explained in Section 6.3.2).
3.6.7 Left-corner parsing
In Section 3.6 we wrote that “almost” all parsing methods could be assigned a place in
Figure 3.10. The principal class of methods that has been left out concerns “left-corner
parsing”. It is a third division alongside top-down and bottom-up, and since it is a
hybrid between the two it should be assigned a separate column between these.
In left-corner parsing, the right-hand side of each production rule is divided into
two parts: the left part is called the left corner and is identified by bottom-up methods.
The division of the right-hand side is done so that once its left corner has been identi￾fied, parsing of the right part can proceed by a top-down method.
Although left-corner parsing has advantages of its own, it tends to combine the
disadvantages or at least the problems of top-down and bottom-up parsing, and is
hardly used in practice. For this reason it has not been included in Figure 3.10. From a
certain point of view, top-down and bottom-up can each be considered special cases of
left-corner, which gives it some theoretical significance. See Section 13.7 for literature
references.
3.6.8 Conclusion
Figure 3.10 summarizes parsing techniques as they are treated in this book. Nijholt
[Misc 1981] paints a more abstract view of the parsing landscape, based on left-corner
parsing. See Deussen [Misc 1979] for an even more abstracted overview. An early sys￾tematic survey was given by Griffiths and Petrick [CF 1965].
80 Introduction to parsing [Ch. 3
Top-down Bottom-up  ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ 
Non-directional
methods
Unger parser CYK parser  ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ 
Directional methods
The predict/match automaton
Depth-first search (backtrack)
Breadth-first search
(Greibach)
Recursive descent
Definite Clause grammars
The shift/reduce automaton
Depth-first search (backtrack)
Breadth-first search
Breadth-first search, restricted
(Earley)  ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ 
Linear directional
methods:
breadth-first, with
breadth restricted to 1
There is only one top-down
method:
LL(k)
There is a whole gamut of
methods:
precedence
bounded-context
LR(k)
LALR(1)
SLR(1)  ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ 
Efficient general
directional methods:
maximally restricted
breadth-first search
(no research reported) Tomita
 ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ 
Figure 3.10 An overview of parsing techniques`

export default IntroductionToParsing
