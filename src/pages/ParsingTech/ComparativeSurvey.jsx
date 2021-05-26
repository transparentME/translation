import MarkdownTransfer from '../../components/MarkdownTransfer'
const ComparativeSurvey = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

const content = `Practical parsing is concerned almost exclusively with context-free (Type 2) and regu￾lar (Type 3) grammars. Unrestricted (Type 0) and context-sensitive (Type 1) grammars
are hardly used since, first, they are user-unfriendly in that it is next to impossible to
construct a clear and readable Type 0 or Type 1 grammar and, second, all known
parsers for them have exponential time requirements. Van Wijngaarden grammars take
a slightly different position: Van Wijngaarden grammars can be made very clear and
informative, but we do not at present have any parsing technique for even a reasonable
subset of them, regardless of time requirements; for some experimental results see Sec￾tion 13.3.
Regular grammars are used mainly to describe patterns that have to be found in
surrounding text. For this application a recognizer suffices. There is only one such
recognizer: the finite-state automaton described in Section 5.3. Actual parsing with a
regular grammar, when required, is generally done using techniques for CF grammars.
For parsing with register-vector grammars, which are a special form of regular gram￾mars, see Section 13.10.
In view of the above we shall restrict ourselves to CF grammars in the rest of this
chapter.
11.1 CONSIDERATIONS
The initial demands on a CF parsing technique are obvious: it should be general (i.e.,
able to handle all CF grammars), it should be fast (i.e., have linear time requirements)
and preferably it should be easy to program. There are two serious obstacles to this
naive approach to choosing a parser. The first is that the automatic generation of a
linear-time parser is possible only for a subset of the CF grammars. The second is that,
although this subset is often described as “very large” (especially for LR(1) and
LALR(1)), experience shows that a grammar that is designed to best describe the
language without concern for parsing is virtually never in this set. What is true,
though, is that for almost any arbitrary grammar a slightly different grammar can be
found that generates the same language and that does allow linear-time parsing; finding
such a grammar, however, almost always requires human intervention and cannot be
automated. Using a modified grammar has the disadvantage that the resulting parse
trees will differ to a certain extent from the ones implied by the original grammar.
250 Comparative survey [Ch. 11
Furthermore, it is important to notice that no linear-time method can handle ambiguous
grammars.
An immediate consequence of the above observations is that the stability of the
grammar is an important datum. If the grammar is subject to continual revision, it is
impossible or at least highly inconvenient to adapt each version by hand to the require￾ments of a linear-time method, and we have no choice but to use a general method.
Likewise, if the grammar is ambiguous, we are forced to use a general method.
11.2 GENERAL PARSERS
There are three general methods that should be considered: Unger’s, Earley’s and
Tomita’s.
11.2.1 Unger
An Unger parser (Section 4.1) is easy to program, especially the form given in Section
12.2, but its exponential time requirements limit its applicability to occasional use. The
relatively small effort of adding a well-formed substring table (Section 12.3) can
improve its efficiency dramatically, and in this form it can be very useful, especially if
the average input string is limited to some tens of tokens. The thus modified Unger
parser requires in principle a time proportional to nN+1, where n is the number of
tokens in the input and N is the maximum number of non-terminals in any right-hand
side in the grammar, but in practice it is often much faster. An additional advantage of
the Unger parser is that it can usually be readily understood by all participants in a pro￾ject, which is something that can be said of almost no other parser.
11.2.2 Earley
A simple, robust and efficient version of the Earley parser has been presented by Gra￾ham, Harrison and Ruzzo [CF 1980]. It requires a time proportional to n3
for ambigu￾ous grammars (plus the time needed to enumerate the parse trees), at most n2
for
unambiguous grammars and at most n for grammars for which a linear-time method
would work; in this sense the Earley parser is self-adapting. Since it does not require
preprocessing on the grammar, it is possible to have one grammar-independent Earley
parser and to supply it with the grammar and the input whenever a parsing is needed. If
this is convenient, the Earley parser is preferable to Tomita’s method.
11.2.3 Tomita
At the expense of considerably more programming and some loss of convenience in
use, the Tomita parser (Section 9.8) will provide a parsing in slightly more than linear
time for all but the most ambiguous grammars. Since it requires preprocessing on the
grammar, it is convenient to generate a separate parser for each grammar (using a
parser generator); if the grammar is, however, very unstable, the preprocessing can be
done each time the parser is called. The Tomita parser is presently the parser of choice
for serious parsing in situations where a linear-time method cannot be applied and the
grammar is reasonably stable.
As explained in Section 9.8, the Tomita parser uses a table to restrict the breadth￾first search and the question arises what type of table would be optimal. Experimental
data on this are lacking. An LR(0) table is relatively easy to construct (9.4.1) and
should give reasonable results but an SLR(1) table is still not difficult to construct
Sec. 11.2] General parsers 251
(9.6.4) and might be preferable. In view of the additional construction effort, an
LALR(1) table may not have any advantage over the SLR(1) table in this case. An
LR(1) table probably requires too much space.
11.2.4 Notes
It should be noted that if any of the general parsers performs in linear time, it may still
be a factor of ten or so slower than a real linear-time method, due to the much heavier
administration they need.
None of the general parsers identifies with certainty a part of the parse tree before
the whole parse tree is completed. Consequently, if semantic actions are connected to
the grammar rules, none of these actions can be performed until the whole parse is fin￾ished. The actions certainly cannot influence the parsing process. They can, however,
reject certain parse trees afterwards; this is useful to implement context conditions in a
context-free parser.
11.3 LINEAR-TIME PARSERS
Among the grammars that allow linear-time parsing, the operator-precedence gram￾mars (see Section 9.2.1) occupy a special place, in that they can be ambiguous. They
escape the general rule that ambiguous grammars cannot be parsed in linear time by
virtue of the fact that they do not provide a full parse tree but rather a parse skeleton. If
every sentence in the generated language has only one parse skeleton, the grammar can
be operator-precedence. Operator-precedence is by far the simplest practical method;
if the parsing problem can be brought into a form that allows an operator-precedence
grammar (and that is possible for almost all formula-like inputs), a parser can be con￾structed by hand in a very short time.
11.3.1 Requirements
Now we come to the full linear-time methods. As mentioned above, grammars are not
normally in a form that allows linear-time parsing and have to be modified by hand to
be so. This implies that for the use of a linear-time parser at least the following condi￾tions must be fulfilled:
the grammar must be relatively stable, so that the modification process will not
have to be repeated too often;
the user must be willing to accept a slightly different parse tree than would
correspond to the original grammar.
It should again be pointed out that the transformation of the grammar cannot, in gen￾eral, be performed by a program (if it could, we would have a stronger parsing
method).
11.3.2 Strong-LL(1) versus LALR(1)
For two linear-time methods, strong-LL(1)†
(Section 8.2.2) and LALR(1) (Section 9.6),
parser generators are readily available, both as commercial products and in the public
domain. Using one of them will in almost all cases be more practical and efficient than ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† What is advertised as an “LL(1) parser generator” is almost always actually a strong-LL(1)
parser generator.
252 Comparative survey [Ch. 11
writing your own; for one thing, writing a parser generator may be (is!) interesting, but
doing a reasonable job on the error recovery is a protracted affair, not to be taken on
lightly. So the choice is between (strong-)LL(1) and LALR(1); full LL(1) or LR(1)
might occasionally be preferable, but parser generators for these are not (yet) easily
available and their advantages will probably not provide enough ground to write one.
The main differences between (strong-)LL(1) and LALR(1) can be summarized as follows:
LL(1) generally requires larger modifications to be made to the grammar than
LALR(1).
LL(1) allows semantic actions to be performed even before the start of an alternative; LALR(1) performs semantic actions only at the end of an alternative.
LL(1) parsers are often easier to understand and modify.
If an LL(1) parser is implemented as a recursive-descent parser, the semantic
actions can use named variables and attributes, much as in a programming
language. No such use is possible in a table-driven parser.
Both methods are roughly equivalent as to speed and memory requirements; a
good implementation of either will outperform a mediocre implementation of the
other.
People evaluate the difference in power between LL(1) and LALR(1) differently;
for some the requirements made by LL(1) are totally unacceptable, others consider
them a minor inconvenience, largely offset by the advantages of the method.
If one is in a position to design the grammar along with the parser, there is little
doubt that LL(1) is to be preferred: not only will parsing and performing semantic
actions be easier, text that conforms to an LL(1) grammar is also clearer to the human
reader. A good example is the design of Modula-2 by Wirth (see Programming in
Modula-2 (Third, corrected edition) by Niklaus Wirth, Springer-Verlag, Berlin, 1985).
11.3.3 Table size
The table size of a linear-time parser (in the order of 10K to 100K bytes) may be a serious problem to some applications. The strongest linear-time method with negligible
table size is weak precedence with precedence functions.`

export default ComparativeSurvey