import MarkdownTransfer from '../../components/MarkdownTransfer'
const AnnotatedBibliography = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

const content = `The purpose of this annotated bibliography is to supply the reader with more material
and with more detail than was possible in the preceding chapters, rather than to just list
the works referenced in the text. The annotations cover a considerable number of sub￾jects that have not been treated in the rest of the book.
The articles and books presented here have been selected for two criteria:
relevancy and accessibility. The notion of relevancy has been interpreted very widely;
parsers are used in an increasing number of applications and relevancy to others is hard
to judge. In practice, entries have only been rejected if they were either too theoretical
or did not supply insight into or understanding of parsing. Accessibility has been taken
to mean ready availability to a researcher who has access to a moderately well￾equipped university or company research library. We expect such a library to hold most
of the prominent computer science journals, but not all or even a major part of the
proceedings of conferences on programming languages and compiler construction, let
alone technical reports from various research institutes all over the world. We have
often been forced to compromise this criterion, to include pertinent material not other￾wise available; for instance, nothing seems to have been published on left-corner pars￾ing in journals. Fortunately, relevant material that was first published in a technical
report or as a PhD thesis was often published later in a prominent journal; in these
cases a reference to the original publication can be found by consulting the journal
paper referenced here. We have kept the references to technical reports to the absolute
minimum. No non-English (that is, no non-English-language) material has been
included. It is our intention that the present collection be complete under the above cri￾teria, but we have no real hope that such perfection has been attained. We shall be
grateful to be pointed to additional references.
The bibliography contains about 400 entries, almost all of them from the Western
world. Some papers from the Soviet Union and Eastern Europe have been included, if
available in translation. Much work on parsing has been done and is still being done in
Japan; it has been sorely underrepresented in this collection, for reasons of accessibil￾ity. Only readily available full material in translation has been included, although much
more is available in the form of abstracts in English.
This annotated bibliography differs in several respects from the habitual literature
list.
The entries have been grouped into fourteen categories:
Ch. 13] Annotated bibliography 265
13.1 miscellaneous literature (Misc);
13.2 unrestricted PS and CS grammars (PSCS);
13.3 van Wijngaarden grammars and affix grammars (VW);
13.4 general context-free parsers (CF);
13.5 LL parsing (LL);
13.6 LR parsing (LR);
13.7 left-corner parsing (LC);
13.8 precedence and bounded-context parsing (Precedence);
13.9 finite-state automata (FS);
13.10 natural language handling (NatLang);
13.11 error handling (ErrHandl);
13.12 transformations on grammars (Transform);
13.13 general books on parsing (Books);
13.14 some books on computer science (CSBooks).
The nature of publications in parsing is so that the large majority of them can
easily be assigned a single category. Some that span two categories have been
placed in one, with a reference in the other. Publications of a more general nature
have found a place in “Miscellaneous Literature”.
The entries are annotated. This annotation is not a copy of the abstract provided
with the paper (which generally said something about the results obtained) but is
rather the result of an attempt to summarize the technical content in terms of what
has been explained elsewhere in this book.
The entries are ordered chronologically rather than alphabetically.
This arrangement has the advantage that it is much more meaningful than a single
alphabetic list, ordered on author names. Each section can be read as the history of
research on that particular aspect of parsing, related material is found closely
together and recent material is easily separated from older publications. A disad￾vantage is that it is now difficult to locate entries by author; to remedy this, an
author index has been supplied. Only a tiny fraction of the entries is referred to in
the previous chapters; these occurrences are also included in the author index.
Terms from computer science have been used more freely in the annotations than in the
rest of the book (an example is “transitive closure”). See, for instance, Sedgewick
[CSBooks 1988] or Smith [CSBooks 1989] for an explanation.
Note that there is a journal called Computer Languages (Elmsford, NY) and one
called Computer Language (San Francisco, CA); both abbreviate to Comput. Lang.; the
place name is essential to distinguish between them (although the first originates from
Exeter, Devon, England).
13.1 MISCELLANEOUS LITERATURE
Noam Chomsky, “Three models for the description of language”, IEEE Trans.
Inform. Theory, vol. 2, no. 3, p. 113-124, 1956. In an attempt to delineate the set of
correct English sentences, the author considers three mechanisms. Finite-state automata are rejected on
the grounds that they cannot cope with arbitrary nesting. Phrase structure grammars are considered prob￾ably applicable but declared impractical due to their problems in expressing context conditions. Most of
these problems can be solved if we augment PS grammars with transformation rules, which specify the
rearrangement of parts of the derivation tree.
Noam Chomsky, “On certain formal properties of grammars”, Inform. Control,
266 Annotated bibliography [Ch. 13
vol. 2, p. 137-167, 1959. This article discusses what later became known as the Chomsky
hierarchy. Chomsky defines type 1 grammars in the “context-sensitive” way. His motivation for this is
that it permits the construction of a tree as a structural description. Type 2 grammars exclude ε-rules, so
in Chomsky’s system, type 2 grammars are a subset of type 1 grammars.
Next, the so called counter languages are discussed. A counter language is a language recognized by a
finite automaton, extended with a finite number of counters, each of which can assume infinitely many
values. L1={anbn | n>0} is a counter language, L2={xy | x,y∈{a,b}*, y is the mirror image of x} is not,
so there are type 2 languages that are not counter languages. The reverse is not investigated.
The Chomsky Normal Form is introduced, but not under that name, and a bit different: Chomsky calls a
type 2 grammar regular if production rules have the form A→a or A→BC, with B≠C, and if A→αAβ
and A→γAη then α=γ and β=η. A grammar is self-embedding if there is a derivation A→* αAβ with α≠ε
and β≠ε. The bulk of the paper is dedicated to the theorem that the extra power of type 2 grammars over
type 3 grammars lies in this self-embedding property.

J.W. Backus, F.L. Bauer, J. Green, C. Katz, J. McCarthy, P. Naur (Ed.), A.J.
Perlis, H. Rutishauser, K. Samelson, B. Vauquois, J.H. Wegstein, A.
van Wijngaarden, M. Woodger, “Report on the algorithmic language ALGOL
60”, Commun. ACM, vol. 3, no. 5, p. 299-314, May 1960. First application of a BNF
grammar (for the definition of a programming language). Revised report by the same authors: Commun.
ACM, vol. 6, no. 1, p. 1-17, Jan 1963.
R.A. Brooker, I.R. MacCallum, D. Morris, J.S. Rohl, “The compiler-compiler”,
Annual Review in Automatic Programming, vol. 3, p. 229-275, 1960 ????. One of
the first extensive descriptions of a compiler-compiler. Parsing is done by a backtracking non-exhaustive
top-down parser using a transduction-like grammar. This grammar is kept in an integrated form and
modifications can be made to it while parsing.
Robert W. Floyd, “A descriptive language for symbol manipulation”, J. ACM,
vol. 8, p. 579-584, Oct 1961. Original paper describing Floyd productions. See Section 9.3.1.
Robert S. Ledley, James B. Wilson, “Automatic-programming-language transla￾tion through syntactical analysis”, Commun. ACM, vol. 5, no. 3, p. 145-155,
March 1962. An English-to-Korean (!) translation system is described in detail, in which parts
of the Korean translation are stored in attributes in the parse tree, to be reordered and interspersed with
Korean syntactic markers on output. The parser is Irons’ [CF 1961].
Melvin E. Conway, “Design of a separable transition-diagram compiler”, Com￾mun. ACM, vol. 6, no. 7, p. 396-408, July 1963. The first to introduce coroutines and to
apply them to structure a compiler. The parser is Irons’ [CF 1961], made deterministic by a No-Loop
Condition and a No-Backup Condition. It follows transition diagrams rather than grammar rules.
Robert W. Floyd, “The syntax of programming languages − a survey”, IEEE
Trans. Electronic Comput., vol. EC-13, p. 346-353, 1964. Early analysis of the
advantages of and problems with the use of grammars for the specification of programming languages.
Contains a bibliography of almost 100 entries.
Jerome Feldman, David Gries, “Translator writing systems”, Commun. ACM,
vol. 11, no. 2, p. 77-113, Feb. 1968. Grand summary of the work done on parsers (with
semantic actions) before 1968.
D.J. Cohen, C.C. Gotlieb, “A list structure form of grammars for syntactic
analysis”, Computing Surveys, vol. 2, no. 1, p. 65-82, 1970. CF rules are represented as
linked lists of alternatives, which themselves are linked lists of members. The trick is that both lists end
in different null pointers. This representation is very amenable to various backtracking and non￾backtracking top-down and bottom-up parsing methods (by interpreting the grammar). Several practical
parsers are given in flowchart form. An algorithm is given to “invert” a grammar, i.e. the linked lists, to
Sec. 13.1] Miscellaneous literature 267
create a data structure that will efficiently guide a bottom-up parser.
A. Birman, J.D. Ullman, “Parsing algorithms with backtrack”, Inform. Control,
vol. 23, no. 1, p. 1-34, 1973. Models classes of recursive descent parsers, capable of
recognizing all deterministic context-free languages and also some non-context-free languages.
B.W. Kernighan, L.L. Cherry, “A system for typesetting mathematics”, Commun.
ACM, vol. 18, no. 3, p. 151-157, March 1975. A good example of the use of an
ambiguous grammar to specify the preferred analysis of special cases.
A.V. Aho, S.C. Johnson, J.D. Ullman, “Deterministic parsing of ambiguous gram￾mars”, Commun. ACM, vol. 18, no. 8, p. 441-452, 1975. Demonstrates how LL and LR
parsers can be constructed for certain classes of ambiguous grammars, using simple disambiguating
rules, such as operator-precedence.
Jacques Cohen, “Experience with a conversational parser generation system”,
Softw. Pract. Exper., vol. 5, p. 169-180, 1975. Realistic description of the construction of
a professional interactive parser generator.
Jay Earley, “Ambiguity and precedence in syntax description”, Acta Inform., vol.
4, p. 183-192, 1975. Informal description of how to use precedence information for
disambiguation.
Michael Marcotty, Henry F. Ledgard, Gregor V. Bochmann, “A sampler of for￾mal definitions”, Computing Surveys, vol. 8, no. 2, p. 191-276, June 1976.
Describes and compares four semantic definition methods: VW grammars, production systems and the
axiomatic approach, Vienna Definition Language, and attribute grammars. No clear winner emerges.
R.M. Wharton, “Resolution of ambiguity in parsing”, Acta Inform., vol. 6, no. 4,
p. 387-395, 1976. It is proposed that ambiguity be resolved in a bottom-up parser by 1)
reducing upon a shift/reduce conflict, 2) reducing the shorter right-hand side upon a reduce/reduce con￾flict and 3) reducing the textual first right-hand side upon a reduce/reduce conflict with equal lengths. In
a top-down parser, criteria similar to 2) and 3) are applied to each LL(1) conflict.
R.B. Hunter, A.D. McGettrick, R. Patel, “LL versus LR parsing with illustrations
from Algol 68”, ACM SIGPLAN Notices, vol. 12, no. 6, p. 49-53, June 1977.
Syntax-improved LL(1) (Foster [Transform 1968]) and LR(1) are equally unsuccessful in handling a CF
version of the grammar of Algol 68. After hand adaptation LL(1) has the advantage.
Niklaus Wirth, “What can we do about the unnecessary diversity of notation for
syntactic definitions?”, Commun. ACM, vol. 20, no. 11, p. 822-823, Nov 1977.
Introduces Wirth’s notation for extended CF grammars, using {...} for repetition, [...] for optional￾ity, (...) for grouping and "..." for quoting.
Jacques Cohen, Martin S. Roth, “Analyses of deterministic parsing algorithms”,
Commun. ACM, vol. 21, no. 6, p. 448-458, June 1978. Gives methods to calculate the
average parsing times and their standard deviations from the input grammar, for several parsers. The
resulting formulae are finite series, and are sometimes given in closed form.
Kuo-Chung Tai, “On the implementation of parsing tables”, ACM SIGPLAN
Notices, vol. 14, no. 1, p. 100-101, Jan 1979. How to implement parsing tables using
hashing.
Peter Deussen, “One abstract accepting algorithm for all kinds of parsers”. In
Automata, languages and programming, Hermann A. Maurer (eds.), Lecture
Notes in Computer Science #71, Springer-Verlag, Berlin, p. 203-217, 1979. Parsing
268 Annotated bibliography [Ch. 13
is viewed as an abstract search problem, for which a high-level algorithm is given. The selection predi￾cate involved is narrowed down to give known linear parsing methods.
Robert Endre Tarjan, Andrew Chi-Chih Yao, “Storing a sparse table”, Commun.
ACM, vol. 22, no. 11, p. 606-611, Nov. 1979. Two methods of storing sparse tables are
presented and analysed: trie structure and double displacement.
Hanan Samet, “A coroutine approach to parsing”, ACM Trans. Prog. Lang. Syst.,
vol. 2, no. 3, p. 290-306, July 1980. Some inputs consist of interleaved chunks of text
conforming to different grammars. An example is programming text interrupted at unpredictable points
by macro-processor directives. This situation can be handled by having separate parsers for each gram￾mar, cooperating in coroutine fashion.
Anton Nijholt, “Parsing strategies: A concise survey”. In Mathematical Founda￾tions of Computer Science, J. Gruska & M. Chytil (eds.), Lecture Notes in Com￾puter Science #118, Springer-Verlag, Berlin, p. 103-120, 1981. The context-free
parser and language field is surveyed in terse prose. Highly informative to the connoisseur.
Esko Ukkonen, “Lower bounds on the size of deterministic parsers”, J. Comput.
Syst. Sci., vol. 26, p. 153-170, 1983. Worst-case lower bounds for the parser sizes are given
for the various classes of LL(k) and LR(k) parsers for k=0,1 and k≥2. All LL(k) lower bounds are poly￾nomial, except the one for full LL(k>1), which is exponential; all LR(k) bounds are exponential.
Fernando C.N. Pereira, David H.D. Warren, “Parsing as deduction”. In Proceed￾ings of the 21st Annual Meeting of the Association for Computational Linguistics,
Cambridge, Mass., p. 137-144, 1983. The Prolog deduction mechanism is top-down depth￾first. It can be exploited to do parsing, using Definite Clause grammars. Parsing can be done more effi￾ciently with Earley’s technique. The corresponding Earley deduction mechanism is derived and
analysed.
Anton Nijholt, Deterministic top-down and bottom-up parsing: historical notes
and bibliographies, Mathematisch Centrum, Amsterdam, p. 118, 1983. Over a 1000
references about LL(k), LR(k) and precedence parsing, with short histories and surveys of the three
methods.
Peter Dencker, Karl Dürre, Johannes Heuft, “Optimization of parser tables for
portable compilers”, ACM Trans. Prog. Lang. Syst., vol. 6, no. 4, p. 546-572, Oct
1984. Given an n×m parser table, an n×m bit table is used to indicate which entries are error
entries; this table is significantly smaller than the original table and the remaining table is now sparse
(typically 90-98% don’t-care entries). The remaining table is compressed row-wise (column-wise) by
setting up an interference graph in which each node corresponds to a row (column) and in which there is
an edge between any two nodes the rows (columns) of which occupy an element in the same position. A
(pseudo-)optimal partitioning is found by a minimal graph-colouring heuristic.
W.M. Waite, L.R. Carter, “The cost of a generated parser”, Softw. Pract. Exper.,
vol. 15, no. 3, p. 221-237, 1985. Supports with measurements the common belief that
compilers employing generated parsers suffer significant performance degradation with respect to recur￾sive descent compilers. Reasons: interpretation of parse tables versus direct execution, attribute storage
allocation and the mechanism to determine which action(s) to perform. Then, a parser interface is pro￾posed that simplifies integration of the parser; implementation of this interface in assembly language
results in generated parsers that cost the same as recursive descent ones. The paper does not consider
generated recursive descent parsers.
Gerard D. Finn, “Extended use of null productions in LR(1) parser applications”,
Commun. ACM, vol. 28, no. 9, p. 961-972, Sept 1985. Extensive account of how to use
an LR parser for conversion purposes. Makes a strong case for the use of parsers for conversion.
Sec. 13.1] Miscellaneous literature 269
Contains a good introduction to parsing.
Robert Gerardy, “Experimental comparison of some parsing methods”, ACM
SIGPLAN Notices, vol. 22, no. 8, p. 79-88, Aug 1987. Experimental time measurements
for recursive descent, operator-precedence and SLR(1) parsing show a ratio of 1 : 4 : 10, in that order.
All parsers were written in Pascal and parsed a mini-Pascal language.
Michael Share, “Resolving ambiguities in the parsing of translation grammars”,
ACM SIGPLAN Notices, vol. 23, no. 8, p. 103-109, Aug 1988. The UNIX LALR
parser generator yacc is extended to accept LALR conflicts and to produce a parser that requests an
interactive user decision when a conflict occurs while parsing. The system is used in document conver￾sion.
Josef Grosch, “Generators for high-speed front-ends”. In Compiler Compilers
and High-Speed Compilation, D. Hammer (eds.), Lecture Notes in Computer Sci￾ence #371, Springer-Verlag, Berlin, p. 81-92, 1989. A coherent system of lexical
scanner generator, LALR(1) parser generator and LL(1) parser generator, using a uniform input syntax,
is presented. The scanner beats UNIX lex by a factor of 5, the LALR parser beats yacc by a factor of 2.
Vance E. Waddle, “Production trees: a compact representation of parsed pro￾grams”, ACM Trans. Prog. Lang. Syst., vol. 12, no. 1, p. 61-83, Jan 1990.
Redundant items are removed from a traditional parse tree through a number of techniques: unit produc￾tions are contracted, terminals symbols are removed, structure information in links is replaced by a rule
number, etc. Each node in the resulting parse tree corresponds to one right-hand side and contains the
rule number and a list of pointer to the nodes for the non-terminals in the right-hand side. A space saving
of a factor 20 is achieved on the average. A grammar form that corresponds more closely to this
representation is defined.
Frank G. Pagan, “Comparative efficiency of general and residual parsers”, ACM
SIGPLAN Notices, vol. 25, no. 4, p. 59-68, April 1990. The switch from table-driven
LL(1) to recursive descent or from table-driven LR(1) to recursive ascent is viewed as an example of
partial computation. Underlying theory and examples are given.
Boris Burshteyn, “On the modification of the formal grammar at parse time”,
ACM SIGPLAN Notices, vol. 25, no. 5, p. 117-123, May 1990. Modifying the
grammar under control of and utilizing information obtained by the parsing process is proposed as a
means of handling context-sensitivity. For example, the recognition of the declaration of an array aaa
could cause the introduction of a new grammar rule expr→aaa[expr], (generated from a template), thus
allowing forms like aaa[3] to be used. With a correction in the same journal, Vol. 25, No. 8, p 6.
13.2 UNRESTRICTED PS AND CS GRAMMARS
This section also covers some other non-context-free grammar types, excluding VW
(two-level) grammars and affix grammars, for which see Section 13.3.
Alfred V. Aho, “Indexed grammars − an extension of context-free grammars”, J.
ACM, vol. 15, no. 4, p. 647-671, Oct 1968. In an indexed grammar, each non-terminal N
in a sentential form is followed by zero or more “indices”, which govern which of the alternatives for N
are allowed for this occurrence of N. The indices propagate according to specific rules.
L(CF) ⊂ L(Indexed) ⊂ L(CS).
William A. Woods, “Context-sensitive parsing”, Commun. ACM, vol. 13, no. 7, p.
437-445, July 1970. The paper presents a canonical form for context-sensitive (ε-free)
derivation trees. Parsing is then performed by an exhaustive guided search over these canonical forms
exclusively. This guarantees that each possible parsing will be found exactly once.
270 Annotated bibliography [Ch. 13
Jacques Loeckx, “The parsing for general phrase-structure grammars”, Inform.
Control, vol. 16, p. 443-464, 1970. The paper sketches two non-deterministic parsers for PS
grammars, one top-down, which tries to mimic the production process and one bottom-up, which tries to
find a handle. The instructions of the parsers are derived by listing all possible transitions in the gram￾mar and weeding out by hand those that cannot occur. Trial-and-error methods are discussed to resolve
the non-determinism, but no instruction selection mechanisms are given. Very readable, nice pictures.
Daniel A. Walters, “Deterministic context-sensitive languages, Parts I & II”,
Inform. Control, vol. 17, no. 1, p. 14-61, 1970. The definition of LR(k) grammars is
extended to context-sensitive grammars. Emphasis is more on theoretical properties than on obtaining a
parser.
Z.J. Ghandour, “Formal systems and analysis of context-sensitive languages”,
Computer J., vol. 15, no. 3, p. 229-237, 1972. Ghandour describes a formal production
system that is in some ways similar to but far from identical to a two-level grammar. A hierarchy of 4
classes is defined on these systems, with Class 1 ⊇ Class 2 ⊃ Class 3 ⊃ Class 4, Class 1 ⊇ CS and Class
4 = CF. A parsing algorithm for Class 1 systems is given in fairly great detail.
N.A. Khabbaz, “Multipass precedence analysis”, Acta Inform., vol. 4, p. 77-85,
1974. A hierarchy of CS grammars is given that can be parsed using multipass precedence
parsing. The parser and the table construction algorithm are given explicitly.
Eberhard Bertsch, “Two thoughts on fast recognition of indexed languages”,
Inform. Control, vol. 29, p. 381-384, 1975. Proves that parsing with (tree-)unambiguous
indexed grammars is possible in O(n2) steps.
Robert W. Sebesta, Neil D. Jones, “Parsers for indexed grammars”, Intern. J.
Comput. Inform. Sci., vol. 7, no. 4, p. 344-359, Dec 1978. Very good explanation of
indexed grammars. Three classes of indexed grammars are defined, corresponding to strong-LL, LL and
LR, respectively. It is shown that the flag sets generated by indexed grammars are regular sets.
C.J.M. Turnbull, E.S. Lee, “Generalized deterministic left to right parsing”, Acta
Inform., vol. 12, p. 187-207, 1979. The LR(k) parsing machine is modified so that the
reduce instruction removes the reduced right-hand side from the stack and pushes an arbitrary number of
symbols back into the input stream. (The traditional LR(k) reduce is a special case of this: it pushes the
recognized non-terminal back into the input and immediately shifts it. The technique is similar to that put
forward by Dömölki [CF 1968].) The new machine is capable of parsing efficiently a subset of the Type
0 grammars, DRP grammars (for Deterministic Regular Parsable). Membership of this subset is unde￾cidable, but an approximate algorithm can be constructed by extending the LR(k) parse table algorithm.
Details are not given, but can be found in a technical report by the first author.
Kurt Mehlhorn, “Parsing macro grammars top down”, Inform. Control, vol. 40,
no. 2, p. 123-143, 1979. Macro grammars are defined as follows. The non-terminals in a CF
grammar are given parameters, as if they were routines in a programming language. The values of these
parameters are strings of terminals and non-terminals (the latter with the proper number of parameters).
A parameter can be passed on, possibly concatenated with some terminals and non-terminals, or can be
made part of the sentential form. An algorithm to construct a recursive-descent parser for a macro gram￾mar (if possible) is given.
G. Barth, “Fast recognition of context-sensitive structures”, Computing, vol. 22,
p. 243-256, 1979. A recording grammar (an RG) is a CF grammar in which each (numbered)
production rule belongs to one of three classes: normal, recording and directed. During production, nor￾mal rules behave normally and a recording rule records its own occurrence by appending its number to a
string called the π-element. When production leaves a “recording” stage, the entire π-element is added to
a set called the Ω-component, which collects all contexts created so far. When production enters a
“directed” stage, an element (a context) is retrieved from the Ω-component, transferred through a
Sec. 13.2] Unrestricted PS and CS grammars 271
mapping I and used to direct the choice of production rules until the element is exhausted. The expres￾sive power of RGs is equal to that of Type 0 grammars.
An LL(k) version of RGs can be defined, based on LL(k)-ness of the underlying CF grammar, plus a few
simple restrictions on the mapping I; the resulting property is called RLL(k).
For parsing, an LL(k) parse is performed; during “normal” parsing, nothing special is done, during
“recording” parsing the rule numbers are recorded and subsequently added to the Ω-component; during
“directed” parsing, which is actually “checking” parsing, the rule numbers are checked for consistency
with the Ω-component, using a simple finite transducer. The parser (+ checker) works in linear time.
It is not clear how convenient RLL(k) RGs are; neither of the two examples provided to demonstrate the
power of RGs is RLL(k).
G.Sh. Vol’dman, “A parsing algorithm for context-sensitive grammars”, Pro￾gram. Comput. Softw., vol. 7, p. 302-307, 1981. Extends Earley’s algorithm first to
length-increasing phrase structure grammars and then to non-decreasing PS grammars (= CS grammars).
The resulting algorithm has exponential time requirements but is often much better.
Lawrence A. Harris, “SLR(1) and LALR(1) parsing for unrestricted grammars”,
Acta Inform., vol. 24, p. 191-209, 1987. The notion of an LR(0) item can easily be defined
for unrestricted grammars: “For each item λ→µ1 Xµ2
there is a transition on X to the item λ→µ1X µ2
and an ε-transition to any item Xδ→ η”, for any symbol X. These items are grouped by subset construc￾tion into the usual states, called here preliminary states, since some of them may actually be ineffective.
A GOTO function is also defined. If we can, for a given grammar, calculate the FOLLOW sets of all
left-hand sides (undecidable in the general case), we can apply a variant of the usual SLR(1) test and
construct a parsing table for a parser as described by Turnbull and Lee [PSCS 1979].
To obtain the LALR(1) definition, a look-ahead grammar system is defined that will, for each item in
each state, generate the (unrestricted) language of all continuations after that item. If we can, for a given
grammar, calculate the FIRST sets of all these languages (undecidable in the general case), we can apply
a variant of the usual LALR(1) test and construct a parsing table for a similar parser. If one of the above
constructions succeeds, a linear-time parser is obtained.
The author gives many hand-calculated examples and explores error detection properties. More general
definitions of SLR(1) and LALR(1) are possible, encompassing larger sets of grammars, at the cost of a
still further reduced chance of decidability.
13.3 VAN WIJNGAARDEN GRAMMARS AND AFFIX GRAMMARS
Note that van Wijngaarden grammars and two-level grammars are synonyms; affix
grammars are different.
M. Sintzoff, “Existence of a van Wijngaarden syntax for every recursively enu￾merable set”, Annales de la Société Scientifique de Bruxelles, vol. 81, no. II, p.
115-118, 1967. A relatively simple proof of the theorem that for every semi-Thue system we
can construct a VW grammar that produces the same set.
A. van Wijngaarden, B.J. Mailloux, J.E.L. Peck, C.H.A. Koster, M. Sintzoff,
C.H. Lindsey, L.G.L.T. Meertens, R.G. Fisker, “Revised report on the algorithmic
language ALGOL 68”, Acta Inform., vol. 5, p. 1-236, 1975. VW grammars found their
widest application to date in the definition of ALGOL 68. Section 1.1.3 of the ALGOL 68 Revised
Report contains a very carefully worded description of the two-level mechanism. The report contains
many interesting applications.
C.H.A. Koster, “Affix grammars”. In ALGOL 68 Implementation, J.E.L. Peck
(eds.), North-Holland Publ. Co., Amsterdam, p. 95-109, 1971. Context conditions are
expressed inside a context-free grammar by introducing affixes, which are divided in derived and inher￾ited and which have to fulfill user-defined primitive predicates. If the affix grammar is well-formed, a
parser for it can be constructed.
272 Annotated bibliography [Ch. 13
David Crowe, “Generating parsers for affix grammars”, Commun. ACM, vol. 15,
no. 8, p. 728-734, Aug 1972. A bounded-context (Floyd productions) parser is extended with
affix manipulation.
A. van Wijngaarden, “The generative power of two-level grammars”. In Auto￾mata, Languages and Programming, J. Loeckx (eds.), Lecture Notes in Computer
Science #14, Springer-Verlag, Berlin, p. 9-16, 1974. The generative power of VW
grammars is illustrated by creating a VW grammar that simulates a Turing machine; the VW grammar
uses only one metanotion, thus proving that one metanotion suffices.
Sheila A. Greibach, “Some restrictions on W-grammars”, Intern. J. Comput.
Inform. Sci., vol. 3, no. 4, p. 289-327, 1974. The consequences of two easily checkable
restrictions on the form of the rules in a VW grammar are explored in great detail and are found to be
surprising. Although this highly technical paper is not directly concerned with parsing, it is very instruc￾tive in that it shows methods of exploring the field.
C.H.A. Koster, “Two-level grammars”. In Compiler Construction: An Advanced
Course, F.L. Bauer & J. Eickel (eds.), Lecture Notes in Computer Science #21,
Springer-Verlag, Berlin, p. 146-156, 1974. Easy introduction to two-level (VW)
grammars, starting from one-level VW grammars. Examples of practical handling of context in a VW
grammar.
P. Deussen, “A decidability criterion for van Wijngaarden grammars”, Acta
Inform., vol. 5, p. 353-375, 1975. The criterion, which is given in detail, can be paraphrased
very roughly as follows: the language generated by a VW grammar is decidable if (but not only if) there
are no ε-rules and either there are no free metanotions (occurring on the right-hand side only) or there are
no dummy metanotions (occurring on the left-hand side only).
David A. Watt, “The parsing problem for affix grammars”, Acta Inform., vol. 8,
p. 1-20, 1977. A technique is described to convert an affix grammar into a CF grammar called a
head grammar which contains a special kind of non-terminal, copy-symbols. For the head grammar they
are ε-rules, but for the affix grammar they effect affix manipulations on the affix stack. Primitive predi￾cates are also ε-rules, but do checks on the affixes. Parsing is done by any CF parser, preferably LR(1).
The affixes are not used to control the parsing but only to declare an input string erroneous: for the tech￾nique to work, the affix grammar must in effect be an attribute grammar.
J. Craig Cleaveland, Robert C. Uzgalis, Grammars for Programming Languages,
Elsevier, New York, p. 154, 1977. In spite of its title, the book is a highly readable
explanation of two-level grammars, also known as van Wijngaarden grammars or VW grammars. After
an introductory treatment of formal languages, the Chomsky hierarchy and parse trees, it is shown to
what extent CF languages can be used to define a programming language. These are shown to fail to
define a language completely and the inadequacy of CS grammars is demonstrated. VW grammars are
then explained and the remainder of the book consists of increasingly complex and impressive examples
of what a VW grammar can do. These examples include keeping a name list, doing type checking and
handling block structure in the definition of a programming language. Recommended reading.
R. Meersman, G. Rozenberg, “Two-level meta-controlled substitution gram￾mars”, Acta Inform., vol. 10, p. 323-339, 1978. The authors prove that the uniform
substitution rule is essential for two-level grammars; without it, they would just generate the CF
languages. This highly technical paper examines a number of variants of the mechanisms involved.
Lutz Wegner, “Bracketed two-level grammars − a decidable and practical
approach to language definition”. In Automata, languages and programming, Her￾mann A. Maurer (eds.), Lecture Notes in Computer Science #71, Springer-Verlag,
Berlin, p. 668-682, 1979. The metanotions of a VW grammar are partitioned into two blocks,
Sec. 13.3] Van Wijngaarden grammars and affix grammars 273
“synthesized” and “derived”; they are separated in a hyperrule by special markers, “brackets”, and are
treated more or less as attributes. Under reasonable conditions parsability can be obtained. The thus res￾tricted VW grammars are very readable.
Lutz Michael Wegner, “On parsing two-level grammars”, Acta Inform., vol. 14,
p. 175-193, 1980. The article starts by defining a number of properties a VW grammar may
exhibit; among these are “left(right) bound”, “free of hidden empty notions”, “uniquely assignable” and
“locally unambiguous”. Most of these properties are undecidable, but sub-optimal tests can be devised.
For each VW grammar GVW, a CF skeleton grammar GSK is defined by considering all hypernotions in
the VW grammar as non-terminals of GSK and adding the cross-references of the VW grammar as pro￾duction rules to GSK. GSK generates a superset of GVW. The cross-reference problem for VW grammars is
unsolvable but again any sub-optimal algorithm (or manual intervention) will do. Parsing is now done by
parsing with GSK and then reconstructing and testing the metanotions. A long list of conditions necessary
for the above to work are given; these conditions are in terms of the properties defined at the beginning.
Dick Grune, “How to produce all sentences from a two-level grammar”, Inform.
Process. Lett., vol. 19, p. 181-185, Nov 1984. All terminal productions are derived
systematically in breadth-first order. The author identifies pitfalls in this process and describes remedies.
A parser is used to identify the hyperrules involved in a given sentential form. This parser is a general
CF recursive descent parser to which a consistency check for the metanotions has been added; it is not
described in detail.
A.J. Fisher, “Practical LL(1)-based parsing of van Wijngaarden grammars”, Acta
Inform., vol. 21, p. 559-584, 1985. Fisher’s parser is based on the idea that the input string
was generated using only a small, finite, part of the infinite strict grammar that can be generated from
the VW grammar. The parser tries to reconstruct this part of the strict grammar on the fly while parsing
the input. The actual parsing is done by a top-down interpretative LL(1) parser, called the terminal
parser. It is driven by a fragment of the strict grammar and any time the definition of a non-terminal is
found missing by the terminal parser, the latter asks another module, the strict syntax generator, to try to
construct it from the VW grammar. For this technique to work, the VW grammar has to satisfy three con￾ditions: the defining CF grammar of each hyperrule is unambiguous, there are no free metanotions, and
the skeleton grammar (as defined by Wegner [VW 1980]) is LL(1). The parser system is organized as a
set of concurrent processes (written in occam), with both parsers, all hyperrule matchers and several
other modules as separate processes. The author claims that “this concurrent organization ... is strictly a
property of the algorithm, not of the implementation”, but a sequential, albeit slower, implementation
seems quite possible. The paper gives heuristics for the automatic generation of the cross-reference
needed for the skeleton grammar; gives a method to handle general hyperrules, hyperrules that fit all
hypernotions, efficiently; and pays much attention to the use of angle brackets in VW grammars.
Jacques Cohen, Timothy J. Hickey, “Parsing and compiling using Prolog”, ACM
Trans. Prog. Lang. Syst., vol. 9, no. 2, p. 125-164, April 1987. See same paper [CF
1987].
13.4 GENERAL CONTEXT-FREE PARSERS
E.T. Irons, “A syntax-directed compiler for ALGOL 60”, Commun. ACM, vol. 4,
no. 1, p. 51-55, Jan 1961. The first to describe a full parser. It is essentially a full backtracking
recursive descent left-corner parser. The published program is corrected in a Letter to the Editor by B.H.
Mayoh, Commun. ACM, vol. 4, no. 6, p. 284, June 1961.
Itiroo Sakai, “Syntax in universal translation”. In Proceedings 1961 International
Conference on Machine Translation of Languages and Applied Language
Analysis, Her Majesty’s Stationery Office, London, p. 593-608, 1962. Using a
formalism that seems equivalent to a CF grammar in Chomsky Normal Form and a parser that is essen￾tially a CYK parser, the author describes a translation mechanism in which the source language sentence
274 Annotated bibliography [Ch. 13
is transformed into a binary tree (by the CYK parser). Each production rule carries a mark telling if the
order of the two constituents should be reversed in the target language. The target language sentence is
then produced by following this new order and by replacing words. A simple Japanese-to-English exam￾ple is provided.
E.T. Irons, “The structure and use of the syntax directed compiler”, Annual
Review in Automatic Programming, vol. 3, p. 207-228, 1962. Extended version of
Irons [CF 1961].
E.T. Irons, “An error-correcting parse algorithm”, Commun. ACM, vol. 6, no. 11,
p. 669-673, Nov 1963. Contrary to the title, the most interesting part of this paper is the parser
it describes, which is essentially Earley’s algorithm without look-ahead. The invention of this parser was
prompted by the author’s dissatisfaction with the error detection properties of backtracking parsers. This
one does not backtrack, it keeps all possible parsings in parallel instead. When the set of possible pars￾ings becomes exhausted due to an error in the input, the last non-empty set is analysed for continuations,
both terminal and non-terminal, including all successors and alternatives. Then input symbols are dis￾carded until one is found that is a terminal in the continuation set or the beginning of a non-terminal in
that set. Symbols are then inserted to bridge any possible gap thus created, and parsing continues. Note
that this is essentially Röhrich’s algorithm. The author points out applications for this parser as a pattern
matcher.
Sheila A. Greibach, “Formal parsing systems”, Commun. ACM, vol. 7, no. 8, p.
499-504, Aug 1964. “A formal parsing system G=(V,µ,T,R) consists of two finite disjoint
vocabularies, V and T, a many-to-many map, µ, from V onto T, and a recursive set R of strings in T called
syntactic sentence classes” (verbatim). This is intended to solve an additional problem in parsing, which
occurs often in natural languages: a symbol found in the input does not always uniquely identify a termi￾nal symbol from the language (for instance, will (verb) versus will (noun)). On this level, the language is
given as the entire set R, but in practice it is given through a “context-free phrase structure generator”,
i.e. a grammar. To allow parsing, this grammar is brought into what is now known as Greibach Normal
Form: each rule is of the form Z→aY1 . . . Ym. Now a directed production analyser is defined which con￾sists of an unlimited set of pushdown stores and an input stream, the entries of which are sets of terminal
symbols, derived through µ from the lexical symbols. For each consecutive input entry, the machine
scans the stores for a top non-terminal Z for which there is a rule Z→aY1 . . . Ym with a in the input set.
A new store is filled with a copy of the old store and the top Z is replaced by Y1 . . . Ym; if the resulting
store is longer than the input, it is discarded. Stores will contain non-terminals only. For each store that is
empty when the input is exhausted, a parsing has been found. This is in effect non-deterministic top￾down parsing with a one-symbol look-ahead. This is probably the first description of a parser that will
work for any CF grammar.
A large part of the paper is dedicated to undoing the damage done by converting to Greibach Normal
Form.
T.V. Griffiths, S.R. Petrick, “On the relative efficiencies of context-free grammar
recognizers”, Commun. ACM, vol. 8, no. 5, p. 289-300, May 1965. To achieve a
unified view of the parsing techniques known at that time, the authors define a non-deterministic two￾stack machine whose only type of instruction is the replacement of two given strings on the tops of both
stacks by two other strings; the machine is started with the input on one stack and the start symbol on the
other and it “recognizes” the input if both stacks get empty simultaneously. For each parsing technique
considered, a simple mapping from the grammar to the machine instructions is given; the techniques
covered are top-down (called top-down), left-corner (called bottom-up) and bottom-up (called direct￾substitution). Next, look-ahead techniques are incorporated to attempt to make the machine deterministic.
The authors identify left-recursion as a trouble-spot. All grammars are required to be ε-free. The pro￾cedures for the three parsing methods are given in a Letter to the Editor, Commun. ACM, vol. 8, no. 10,
p. 594, Oct 1965.
Susumu Kuno, “The predictive analyzer and a path elimination technique”, Com￾mun. ACM, vol. 8, no. 7, p. 453-462, July 1965. The author extends his predictive
Sec. 13.4] General context-free parsers 275
analyser (in modern terminology: an exhaustive top-down parser for grammars in Greibach Normal
Form) (see Kuno and Oettinger, reprinted by Grosz, Sparck Jones and Webber [NatLang 1986]) with a
table of well-formed substrings. Through ingenious bit manipulation the table is made to fit in a small
memory. Time gains are considerable (as expected).
Susumu Kuno, “An augmented predicative analyzer for context-free languages −
its relative efficiency”, Commun. ACM, vol. 9, no. 11, p. 810-823, Nov 1966.
Converting a CF grammar to Greibach Normal Form often greatly distorts its structure. To keep track of
the structure, the right-hand side of each rule in the CF grammar is prefixed with a marker, a special
non-terminal which produces ε. A conversion algorithm is described that results in rules of the form
A→M+
aBC . . . , where M+
is a non-empty sequence of markers. The Kuno predictive analyser (see
Kuno [CF 1965]) is extended with a second stack on which the marker parts of the rules are kept. When a
parsing is found, the marker stack allows easy reconstruction of the parsing according to the original CF
grammar. The parser is compared to two other parsers, using a large number of criteria.
D.H. Younger, “Recognition of context-free languages in time n3
”, Inform. Con￾trol, vol. 10, no. 2, p. 189-208, Feb 1967. A Boolean recognition matrix R is constructed in
a bottom-up fashion, in which R [i,l,p ] indicates that the segment of the input string starting at position i
with length l is a production of non-terminal p. This matrix can be filled in O(n3) actions, where n is the
length of the input string. If R [0,n, 0] is set, the whole string is a production of non-terminal 0. Many of
the bits in the matrix can never be used in any actual parsing; these can be removed by doing a top-down
scan starting from R [0,n, 0] and removing all bits not reached this way. If the matrix contains integer
rather than Boolean elements, it is easy to fill it with the number of ways a given segment can be pro￾duced by a given non-terminal; this yields the ambiguity rate.
S.H. Unger, “A global parser for context-free phrase structure grammars”, Com￾mun. ACM, vol. 11, no. 4, p. 240-247, April 1968. The Unger parser (as described in
Section 4.1) is extended with a series of tests to avoid partitionings that could never lead to success. For
instance, a section of the input is never matched against a non-terminal if it begins with a token no pro￾duction of the non-terminal could begin with. Several such tests are described and ways are given to
statically derive the necessary information (FIRST sets, LAST sets, EXCLUDE sets) from the grammar.
Although none of this changes the exponential character of the algorithm, the tests do result in a consid￾erable speed-up in practice. (There is an essential correction to one of the flowcharts given in Commun.
ACM, vol. 11, no. 6, p. 427, June 1968.)
B.A. Chartres, J.J. Florentin, “A universal syntax-directed top-down analyzer”, J.
ACM, vol. 15, no. 3, p. 447-464, July 1968. The non-deterministic two-stack top-down
parser of Griffiths and Petrick [CF 1965] is extended with a third stack and a status variable. One stack
holds the rest of the input, the second holds the prediction that should match that input and the third holds
a tracing of the outline of the production tree constructed so far; when input and prediction stack are
empty, the third stack holds the completed parse tree. This three-stack mechanism can be run both for￾ward and backward; the status variable keeps track of the direction. By properly reacting to the values on
the tops of the stacks and the direction variable, it is possible to make the mechanism perform a full
backtracking exhaustive search. Much work is spent on handling left recursion and ε-rules.
Bálint Dömölki, “A universal compiler system based on production rules”, BIT,
vol. 8, no. 4, p. 262-275, Oct 1968. The heart of the compiler system described here is a
production system consisting of an ordered set of production rules, which are the inverses of the gram￾mar rules; note that the notions “left-hand side” (lhs) and “right-hand side” (rhs) are reversed from their
normal meanings in this abstract. The system attempts to derive the start symbol, by always applying the
first applicable production rule (first in two respects: from the left in the string processed, and in the
ordered set of production rules). This resolves shift/reduce conflicts in favour of reduce, and
reduce/reduce conflicts by length and by the order of the production rules. When a reduction is found, the
lhs of the reducing rule is offered for semantic processing and the rhs is pushed back into the input
stream, to be reread. Since the length of the rhs is not restricted, the method can handle non-CF gram￾mars.
276 Annotated bibliography [Ch. 13
The so-called “Syntactic Filter” uses a bitvector technique to determine if, and if so which, production
rule is applicable: for every symbol i in the alphabet, there is a bitvector B [i], with one bit for each of the
positions in each lhs; this bit set to 1 if this position contains symbol i. There is also a bitvector U mark￾ing the first symbol of each lhs, and a bitvector V marking the last symbol of each lhs. Now, a stack of
bitvectors Qt
is maintained, with Q0 = 0 and Qt = ((Qt −1>>1) ∨ U) ∧ B[it
], where it
is the t-th input
symbol. Qt contains the answer to the question whether the last j symbols received are the first j symbols
of some lhs, for any lhs and j. A 1 “walks” through an lhs part of the Q vector, as this lhs is recognized.
An occurrence of a lhs is found if Qt ∧ V ≠ 0. After doing a replacement, t is set back k places, where k
is the length of the applied lhs, so a stack of Qt
-s must be maintained. If some Qt = 0, we have an error.
An interesting implementation of the Dömölki algorithm is given by Hext and Roberts [CF 1970].
T. Kasami, K. Torii, “A syntax-analysis procedure for unambiguous context-free
grammars”, J. ACM, vol. 16, no. 3, p. 423-431, July 1969. A rather complicated
presentation of a variant of the CYK algorithm, including the derivation of a O(n2
log n) time bound for
unambiguous Chomsky Normal Form grammars.
J. Earley, “An efficient context-free parsing algorithm”, Commun. ACM, vol. 13,
no. 2, p. 94-102, Feb 1970. This famous paper gives an informal description of the Earley
algorithm. The algorithm is compared both theoretically and experimentally with some general search
techniques and with the CYK algorithm. It easily beats the general search techniques. Although the
CYK algorithm has the same worst-case efficiency as Earley’s, it requires O(n3) on any grammar,
whereas Earley’s requires O(n2) on unambiguous grammars and O(n) on bounded-state grammars. The
algorithm is easily modified to handle Extended CF grammars. (Also reprinted by Grosz, Sparck Jones
and Webber [NatLang 1986])
J.B. Hext, P.S. Roberts, “Syntax analysis by Domölki’s algorithm”, Computer J.,
vol. 13, no. 3, p. 263-271, Aug 1970. Dömölki’s algorithm is a bottom-up parser in which
the item sets are represented as bitvectors. A backtracking version is presented which can handle any
grammar. To reduce the need for backtracking a 1-character look-ahead is introduced and an algorithm
for determining the actions on the look-ahead is given. Since the internal state is recalculated by vector
operations for each input character, the parse table is much smaller than usual and its entries are one bit
each. This, and the fact that it is all bitvector operations, makes the algorithm suitable for implementa￾tion in hardware.
Bernard Lang, “Parallel non-deterministic bottom-up parsing”, ACM SIGPLAN
Notices, vol. 6, no. 12, p. 56-57, Dec 1971. The full breadth-first search of an Earley
parser is limited through the use of weak-precedence relations, in so far as these are unique. Abstract of a
larger technical report.
F.P. Kaminger, “Generation, recognition and parsing of context-free languages
by means of recursive graphs”, Computing, vol. 11, no. 1, p. 87-96, 1973. Formal
description of the use of recursive graphs instead of CF grammars to describe, generate and parse
context-free languages.
Bernard Lang, “Deterministic techniques for efficient non-deterministic parsers”.
In Automata, languages and programming, J. Loeckx (eds.), Lecture Notes in
Computer Science #14, Springer-Verlag, Berlin, p. 255-269, 1974. Explores the
theoretical properties of doing breadth-first search to resolve the non-determinism in a bottom-up auto￾maton with conflicts. See Tomita [CF 1986] for a practical realization.
M. Bouckaert, A. Pirotte, M. Snelling, “Efficient parsing algorithms for general
context-free parsers”, Inform. Sci., vol. 8, no. 1, p. 1-26, Jan 1975. The authors
observe that the Predictor in an Earley parser will often predict items that start with symbols that can
never match the first few symbols of the present input; such items will never bear fruit and could as well
be left out. To accomplish this, they extend the k-symbol reduction look-ahead Earley parser with a t￾symbol prediction mechanism; this results in very general Mkt
parsing machines, the properties of which
Sec. 13.4] General context-free parsers 277
are studied, in much formal detail. Three important conclusions can be drawn. Values of k or t larger
than one lose much more on processing than they will normally gain on better prediction and sharper
reduction; such parsers are better only for asymptotically long input strings. The Earley parser without
look-ahead (M00) performs better than the parser with 1 symbol look-ahead; Earley’s recommendation to
use always 1 symbol look-ahead is unsound. The best parser is M01; i.e. use a one symbol predictive
look-ahead and no reduction look-ahead.
L. Valiant, “General context-free recognition in less than cubic time”, J. Comput.
Syst. Sci., vol. 10, p. 308-315, 1975. Reduces CYK to bit matrix multiplication and then
applies Strassen’s†
algorithm.
C.H.A. Koster, “A technique for parsing ambiguous grammars”. In GI-4. Jahres￾tagung, D. Siefkes (eds.), Lecture Notes in Computer Science #26, Springer￾Verlag, New York, p. 233-246, 1975. Three recursive-descent parsing techniques are
described: no backtrack, partial backtrack and full backtrack.
B. Sheil, “Observations on context-free parsing”, Statistical Methods in Linguis￾tics, p. 71-109, 1976. The author proves that any CF backtracking parser will have polynomial
time requirements if provided with a well-formed substring table (WFST), which holds the well-formed
substrings recognized so far and which is consulted before each attempt to recognize a substring. The
time requirements of the parser is O(nc+1) where c is the maximum number of non-terminals in any
right-hand side. A 2-form grammar is a CF grammar such that no production rule in the grammar has
more than two non-terminals on the right-hand side; nearly all practical grammars are already 2-form. 2-
form grammars, of which Chomsky Normal Form grammars are a subset, can be parsed in O(n3
). An
algorithm for a dividing top-down parser with a WFST is supplied. Required reading for anybody who
wants to write or use a general CF grammar. Many practical hints and opinions (controversial and other￾wise) are given.
Susan L. Graham, Michael A. Harrison, “Parsing of general context-free
languages”. In Advances in Computing, Vol. 14, Academic Press, New York, p.
77-185, 1976. The 109 page article describes three algorithms in a more or less unified manner:
CYK, Earley’s and Valiant’s. The main body of the paper is concerned with bounds for time and space
requirements. Sharper bounds than usual are derived for special grammars, for instance, for linear gram￾mars.
Jaroslav Král, “A top-down no backtracking parsing of general context-free
languages”. In Mathematical Foundations of Computer Science, J. Gruska (eds.),
Lecture Notes in Computer Science #53, Springer-Verlag, Berlin, p. 333-341,
1977. The states of a top-down breadth-first general CF parser are combined whenever possible,
resulting in an Earley-like parser without the bottom-up component.
G.K. Manacher, “An improved version of the Cocke-Younger-Kasami algo￾rithm”, Comput. Lang. (Elmsford, NY), vol. 3, p. 127-133, 1978. This paper discusses
some modifications to the CYK algorithm that make it more efficient. First, the “length induction” itera￾tion of CYK is replaced by an iteration that combines sets of non-terminals that derive strings of length
j−1 with sets of non-terminals that derive strings of length k≤j−1. Then, the recognition table of CYK is
replaced by three tables of lists, where each table has a list for each non-terminal/number pair. The first
table maps a non-terminal/length pair to a list of positions, indicating where substrings of this length start
that are derived by this non-terminal. The second table maps a non-terminal/position pair to a list of
lengths, indicating the lengths of the substrings starting at this position that are derived by this non- ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† Volker Strassen, “Gaussian elimination is not optimal”, Numerische Mathematik, vol. 13, p.
354-356, 1969. Shows how to multiply two 2×2 matrices using 7 multiplications rather than 8
and extends the principle to larger matrices.
278 Annotated bibliography [Ch. 13
terminal. The third table maps a non-terminal/position pair to a list of lengths, indicating the lengths of
the substrings ending at this position that are derived by this non-terminal. With these modifications a
time bound O(s(n)) is established for unambiguous grammars, where s(n) is the number of triplets
(A,i,j) for which the non-terminal A derives the substring starting at position i, with length j. This is at
worst O(n2
).
W.L. Ruzzo, “On the complexity of general context-free language parsing and
recognition”. In Automata, Languages and Programming, Hermann A. Maurer
(eds.), Lecture Notes in Computer Science #71, Springer-Verlag, Berlin, p. 489-
497, 1979. This is an extended abstract, summarizing some time requirement results: it is shown
that parsing strings of length n is only O(log n) harder than just recognizing them. Also, the time to mul￾tiply √n *√n Boolean matrices is a lower bound on the time needed to recognize all prefixes of a string,
and this, in turn, is a lower bound on the time needed to generate a convenient representation of all parses
of a string (basically the CYK recognition table, but reduced so that a non-terminal only is present in the
recognition table if it can be used to derive the sentence).
S.L. Graham, M.A. Harrison, W.L. Ruzzo, “An improved context-free recog￾nizer”, ACM Trans. Prog. Lang. Syst., vol. 2, no. 3, p. 415-462, July 1980. The
well-formed substring table of the CYK parser is filled with dotted items as in an LR parser rather than
with the usual non-terminals. This allows the number of objects in each table entry to be reduced consid￾erably. Special operators are defined to handle ε- and unit rules.
The authors do not employ any look-ahead in their parser; they claim that constructing the recognition
triangle is pretty fast already and that probably more time will be spent in enumerating and analysing the
resulting parse trees. They speed up the latter process by removing all useless entries before starting to
generate parse trees. To this end, a top-down sweep through the triangle is performed, similar to the
scheme to find all parse trees, which just marks all reachable entries without following up any of them
twice. The non-marked entries are then removed (p. 443).
Much attention is paid to efficient implementation, using ingenious data structures.
A. Bossi, N. Cocco, L. Colussi, “A divide-and-conquer approach to general
context-free parsing”, Inform. Process. Lett., vol. 16, no. 4, p. 203-208, May 1983.
The proposed parsing method yields for a string T two sets: a set of partial parse trees that may be incom￾plete at their left edge (which then coincides with the left end of T), called L, and a similar right-edge set
called R. To parse a string, it is cut in two pieces, each is parsed and the R set of the left-hand piece is
combined with the L set of the right-hand piece.
Masaru Tomita, Efficient parsing for natural language, Kluwer Academic Pub￾lishers, Boston, p. 201, 1986. Tomita describes an efficient parsing algorithm to be used in a
“natural-language setting”: input strings of some tens of words and considerable but not pathological
ambiguity. The algorithm is essentially LR, starting parallel parses when an ambiguity is found in the
LR-table. Full examples are given of handling ambiguities, lexical elements with multiple meanings and
unknown lexical elements.
The algorithm is compared extensively to Earley’s algorithm by measurement and it is found to be con￾sistently five to ten times faster than the latter, in the domain for which it is intended. Earley’s algorithm
is better in pathological cases; Tomita’s fails on unbounded ambiguity. No time bounds are given expli￾citly, but graphs show a behaviour better than O(n3
). Bouckaert’s algorithm (Bouckaert, Pirotte and
Snelling [CF 1975]) is shown to be between Earley’s and Tomita’s in speed.
MacLisp programs of the various algorithms are given and the application in the Nishida and Doshita
Machine Translation System is described.
Eiichi Tanaka, Mitsuru Ikeda, Kimio Ezure, “Direct parsing”, Patt. Recog., vol.
19, no. 4, p. 315-323, 1986. Variants of Unger’s and Earley’s parser are compared in a
chromosome recognition situation. The possibility of stopping the Unger parser after the first parsing has
been found is exploited.
Jacques Cohen, Timothy J. Hickey, “Parsing and compiling using Prolog”, ACM
Sec. 13.4] General context-free parsers 279
Trans. Prog. Lang. Syst., vol. 9, no. 2, p. 125-164, April 1987. Several methods are
given to convert grammar rules into Prolog clauses. In the bottom-up method, a rule E→E+T
corresponds to a clause reduce ([n (t),t(+),n (e) | X ],[n (e) | X ]) where the parameters represent the stack
before and after the reduction. In the top-down method, a rule T′→*FT′ corresponds to a clause
rule (n (tprime),[t(*),n (f ),n (tprime)]). A recursive descent parser is obtained by representing a rule
S→aSb by the clause s(ASB) :− append (A,SB,ASB),append (S,B,SB),a (A),s(S),b (B). which attempts
to cut the input list ASB into three pieces A, S and B, which can each be recognized as an a, an s and a b,
respectively. A fourth type of parser results if ranges in the input list are used as parameters: s(X 1,X 4)
:− link (X 1,a,X 2),s(X 2,X 3),link (X 3,b,X 4) in which link (P,x,Q) describes that the input contains the
token x between positions P and Q. For each of these methods, ways are given to limit non-determinism
and backtracking, resulting among others in LL(1) parsers.
By supplying additional parameters to clauses, context conditions can be constructed and carried around,
much as in a VW grammar (although this term is not used). It should be noted that the resulting Prolog
programs are actually not parsers at all: they are just logic systems that connect input strings to parsings.
Consequently they can be driven both ways: supply a string and it will produce the parsing; supply a
parsing and it will produce the string; supply nothing and it will produce all strings with their parsings in
the language.
As a separate topic, it is shown that Prolog is an effective language to do grammar manipulation in: cal￾culation of FIRST and FOLLOW sets, etc. As an equally unrelated topic, examples of code generation
in Prolog are shown.
Masaru Tomita, “An efficient augmented-context-free parsing algorithm”, Am. J.
Comput. Linguist., vol. 13, no. 1-2, p. 31-46, Jan-June 1987. Tomita’s parser [CF
1986] is extended with Boolean functions for the non-terminals that decide if a proposed reduce is appli￾cable given the context. A method for deriving these functions in Lisp from more abstract specifications
is given.
13.5 LL PARSING
R. Kurki-Suonio, “On top-to-bottom recognition and left recursion”, Commun.
ACM, vol. 9, no. 7, p. 527-528, July 1966. Gives a good account of Greibach’s algorithm
for the removal of left-recursion from a grammar. The resulting distortion of the parsing process is coun￾tered by leaving (ε-producing) markers in the grammar at the original ends of the right-hand sides in a
left-recursive rule. This 2-page paper also gives an algorithm for removing ε-rules. Again, these leave
markers behind, which can interfere with the markers from a possibly subsequent removal of left￾recursion. Rules for solving this interference are given.
K. Cˇ ulik II, “Contribution to deterministic top-down analysis of context-free
languages”, Kybernetica, vol. 5, no. 4, p. 422-431, 1968. This paper introduces LL(f)
grammars where f is a function mapping strings of terminals to an arbitrary range, always uniquely deter￾mining a right-hand side. f is called a distinctive function.
P.M. Lewis II, R.E. Stearns, “Syntax-directed transduction”, J. ACM, vol. 15, no.
3, p. 465-488, 1968. Although this article is about transduction, it is often given as a reference
for LL(k), because it is one of the first articles discussing the LL(k) property, and it has an appendix on
the recognition of LL(k) languages.
D. Wood, “The theory of left factored languages, Part I”, Computer J., vol. 12,
no. 4, p. 349-356, 1969. A description of a variant of LL(1) grammars and parsing.
R. Kurki-Suonio, “Notes on top-down languages”, BIT, vol. 9, p. 225-238, 1969.
Gives several variants of the LL(k) condition. Also demonstrates the existence of an LL(k) language
which is not LL(k−1).
D. Wood, “The theory of left factored languages, Part II”, Computer J., vol. 13,
280 Annotated bibliography [Ch. 13
no. 1, p. 55-62, 1970. More results about LL(1) and LL(k) grammars, including a recursive￾descent parser in pseudo-Algol 60.
D.J. Rosenkrantz, R.E. Stearns, “Properties of deterministic top-down gram￾mars”, Inform. Control, vol. 17, p. 226-256, 1970. Many formal properties of LL(k)
grammars are derived and tests for LL(k) and strong-LL(k) are given.
Donald E. Knuth, “Top-down syntax analysis”, Acta Inform., vol. 1, p. 79-110,
1971. A Parsing Machine (PM) is defined, which is effectively a set of mutually recursive
Boolean functions which absorb input if they succeed and absorb nothing if they fail. Properties of the
languages accepted by PMs are examined. This leads to CF grammars, dependency graphs, the null string
problem, back-up, LL(k), follow-function, LL(1), s-languages and a comparison of top-down versus
bottom-up parsing. The author is one of the few scientists who provide insight in their thinking process.
Paul W. Abrahams, “A syntax-directed parser for recalcitrant grammars”, Intern.
J. Comput. Math., vol. A3, p. 105-115, 1972. LL(1) parsing with conflict resolvers, called
oracles.
M. Griffiths, “LL(1) grammars and analyzers”. In Compiler Construction: an
advanced course, F.L. Bauer & J. Eickel (eds.), Lecture Notes in Computer Sci￾ence #21, Springer-Verlag, New York, p. 57-84, 1974. A discussion of the LL(1)
property, including a decision algorithm and the production of an analyser in the form of executable text.
These lecture notes also discuss some grammar transformations, including elimination of left-recursion,
factorization, and substitution. Semantic insertions (or hooks for semantic actions) are also given some
attention.
T. Komor, “A note on left-factored languages”, Computer J., vol. 17, no. 3, p.
242-244, 1974. Points out an error in a paper by Wood on left-factored languages [LL 1970],
and suggests an extension to Fosters SID [Transform 1968] involving ε-rules.
S. Jarzabek, T. Krawczyk, “LL-regular grammars”, Inform. Process. Lett., vol. 4,
no. 2, p. 31-37, 1975. Introduces LL-regular (LLR) grammars: for every rule A→α1 | . . . | αn, a partition (R1, . . . ,Rn) of disjoint regular sets must be given such that the rest of the input sentence is a
member of exactly one of these sets. A parser can then be constructed by creating finite-state automata
for these sets, and letting these finite state automata determine the next prediction.
A. Nijholt, “On the parsing of LL-regular grammars”. In Mathematical Founda￾tions of Computer Science, A. Mazurkiewicz (eds.), Lecture Notes in Computer
Science #45, Springer-Verlag, Berlin, p. 446-452, 1976. Derives a parsing algorithm for
LL-regular grammars with a regular pre-scan from right to left that leaves markers, and a subsequent
scan which consists of an LL(1)-like parser.
D. Wood, “A bibliography of top-down parsing”, ACM SIGPLAN Notices, vol.
13, no. 2, p. 71-76, Feb 1978. Contains some 90 literature references up to 1978 on
deterministic top-down parsing and related issues.
J. Lewi, K. de Vlaminck, J. Huens, M. Huybrechts, “The ELL(1) parser generator
and the error-recovery mechanism”, Acta Inform., vol. 10, p. 209-228, 1978. See
same paper [ErrHandl 1978].
V.W. Setzer, “Non-recursive top-down syntax analysis”, Softw. Pract. Exper.,
vol. 9, no. 1, p. 237-245, 1979. Compares recursive and non-recursive implementations of
table-driven top-down parsers. The introduction of actions is facilitated by implementing the driver and
the tables as a loop over a case statement (on the states) over case statements (on the input token).
Stephan Heilbrunner, “On the definition of ELR(k) and ELL(k) grammars”, Acta
Sec. 13.5] LL parsing 281
Inform., vol. 11, p. 169-176, 1979. Comparison and analysis of various definitions of
extended LL(k) and extended LR(k), based on the transformations involved.
D.R. Milton, L.W. Kirchhoff, B.R. Rowland, “An ALL(1) compiler generator”,
ACM SIGPLAN Notices, vol. 14, no. 8, p. 152-157, Aug 1979. Presents an LL(1)
parser generator and attribute evaluator which allows LL(1) conflicts to be solved by examining attribute
values; the generated parsers use the error correction algorithm of Fischer, Milton and Quiring [ErrHandl
1980].
D.A. Poplawski, “On LL-regular grammars”, J. Comput. Syst. Sci., vol. 18, p.
218-227, 1979. Presents proof that, given a regular partition, it is decidable whether a grammar
is LL-regular with respect to this partition; it is undecidable whether or not such a regular partition exists.
The paper then discusses a two-pass parser; the first pass works from right to left, marking each terminal
with an indication of the partition that the rest of the sentence belongs to. The second pass then uses these
indications for its predictions.
V.N. Glushkova, “Lexical analysis of LL(k) languages”, Program. Comput.
Softw., vol. 5, p. 166-172, 1979. Examines the reduction of LL(k) grammars to simple-LL(1)
grammars by combining terminal symbols into new terminal symbols.
J. Cohen, R. Sitver, D. Auty, “Evaluating and improving recursive descent
parsers”, IEEE Trans. Softw. Eng., vol. SE-5, no. 5, p. 472-480, Sept 1979. Derives
formulas which express the execution time of systematically generated recursive descent parsers, and
uses these formulas to estimate the gain of various optimizations, such as the elimination of some routine
calls and merging of common code.
S. Sippu, E. Soisalon-Soininen, “On constructing LL(k) parsers”. In Automata,
Languages and Programming, H.A. Maurer (eds.), Lecture Notes in Computer
Science #71, Springer-Verlag, Berlin, p. 585-595, 1979. Presents a method for
constructing canonical LL(k) parsers that can be regarded as the dual to the LR(k) technique of items and
viable prefixes. In the LL(k) method we have LL(k) items and viable suffixes. Like in the LR case, the
LL(k) method also has LA(p)LL(k) and SLL(k) variants; the SLL(k) variant coincides with the strong￾LL(k) grammars. Note that, although the S of SLL stands for Simple, this is not the same Simple LL as
the simple LL discussed in chapter 8.
A. Nijholt, “LL-regular grammars”, Intern. J. Comput. Math., vol. A8, p. 303-
318, 1980. This paper discusses strong-LL-regular grammars, which are a subset of the LL￾regular grammars, exactly as the strong-LL(k) grammars are a subset of the LL(k) grammars, and derives
some properties.
Seppo Sippu, Eljas Soisalon-Soininen, “On LL(k) parsing”, Inform. Control, vol.
53, no. 3, p. 141-164, June 1982. Theoretical background to Sippu and Soisalon-Soininen
[LL 1979].
K. John Gough, “A new method of generating LL(1) look-ahead sets”, ACM SIG￾PLAN Notices, vol. 20, no. 6, p. 16-19, June 1985. Presents an efficient method for
computing the FIRST and FOLLOW sets, using “begun-by”, “precedes”, and “ends” relations.
Thomas J. Sager, “A technique for creating small fast compiler front ends”, ACM
SIGPLAN Notices, vol. 20, no. 10, p. 87-94, Oct 1985. Presents a predictive parser that
has its tables compacted through the use of a minimal perfect hash function, thus making them very
small. An example is given for the Pascal language.
Barry Dwyer, “Improving Gough’s LL(1) look-ahead generator”, ACM SIGPLAN
Notices, vol. 20, no. 11, p. 27-29, Nov 1985. Refer to Gough [LL 1985]. Improves on
Gough’s algorithm by not computing those FIRST and FOLLOW sets that are not needed for the LL(1)
282 Annotated bibliography [Ch. 13
parser generation.
David R. Hanson, “Compact recursive-descent parsing of expressions”, Softw.
Pract. Exper., vol. 15, no. 12, p. 1205-1212, Dec 1985. Discusses recursive descent
parsing of expressions by using a precedence table for the operators instead of a parsing routine for each
precedence level. There is for instance only one routine for expressions involving binary operators; the
precedence of the expression to be parsed is a parameter.
Reinhold Heckmann, “An efficient ELL(1)-parser generator”, Acta Inform., vol.
23, p. 127-148, 1986. The problem of parsing with an ELL(1) grammar is reduced to finding
various FIRST and FOLLOW sets. Theorems about these sets are derived and very efficient algorithms
for their calculation are supplied.
Dick Grune, Ceriel J.H. Jacobs, “A programmer-friendly LL(1) parser genera￾tor”, Softw. Pract. Exper., vol. 18, no. 1, p. 29-38, Jan 1988. Presents a practical
ELL(1) parser generator, called LLgen, that generates fast error correcting recursive descent parsers. In
addition to the error correction, LLgen features static as well as dynamic conflict resolvers and a separate
compilation facility. The grammar can be viewed as a program, allowing for a natural positioning of
semantic actions.
Keiichi Yoshida, Yoshiko Takeuchi, “Some properties of an algorithm for con￾structing LL(1) parsing tables using production indices”, J. Inform. Process., vol.
11, no. 4, p. 258-262, 1988. Presents an LL(1) parse table algorithm that, rather than first
computing FIRST and FOLLOW sets, computes a so-called FIRST-table and FOLLOW-table, which are
indexed by a (non-terminal, symbol) pair, and deliver a grammar rule number.
H. Dobler, K. Pirklbauer, “Coco-2, − A new compiler compiler”, ACM SIGPLAN
Notices, vol. 25, no. 5, p. 82-90, May 1990. The authors present an integrated system
consisting of a lexical phase using a heavily reduced FS automaton, and a syntactic phase which uses a
table-driven LL(1) parser. Semantic actions are interspersed in the syntactic phase.
13.6 LR PARSING
D.E. Knuth, “On the translation of languages from left to right”, Inform. Control,
vol. 8, p. 607-639, 1965. This is the original paper on LR(k). It defines the notion as an
abstract property of a grammar and gives two tests for LR(k). The first works by constructing for the
grammar a regular grammar which generates all possible already reduced parts (= stacks) plus their
look-aheads; if this grammar has the property that none of its words is a prefix to another of its words,
the original grammar was LR(k). The second consists of implicitly constructing all possible item sets (=
states) and testing for conflicts. Since none of this is intended to yield a reasonable parsing algorithm,
notation and terminology differs from that in later papers on the subject. Several theorems concerning
LR(k) grammars are given and proved.
A.J. Korenjak, “A practical method for constructing LR(k) processors”, Com￾mun. ACM, vol. 12, no. 11, p. 613-623, Nov 1969. The huge LR(1) parsing table is
partitioned as follows. A non-terminal Z is chosen judiciously from the grammar, and two grammars are
constructed, G0, in which Z is considered to be a terminal symbol, and G1, which is the grammar for Z
(i.e. which has Z as the start symbol). If both grammars are LR(1) and moreover a master LR(1) parser
can be constructed that controls the switching back and forth between G0 and G1, the parser construction
succeeds (and the original grammar was LR(1) too). The three resulting tables together are much smaller
than the LR(1) table for the original grammar. It is also possible to chose a set of non-terminals
Z1 . . . Zn and apply a variant of the above technique.
David Pager, “A solution to an open problem by Knuth”, Inform. Control, vol. 17,
p. 462-473, 1970. Highly mathematical paper concerning the properties of certain partitions of
Sec. 13.6] LR parsing 283
the states of an LR(1) parser with a view to reducing the size of the LR automaton.
H. Langmaack, “Application of regular canonical systems to grammars translat￾able from left to right”, Acta Inform., vol. 1, p. 111-114, 1971. Different proof of the
decidability of LR(k).
Franklin L. DeRemer, “Simple LR(k) grammars”, Commun. ACM, vol. 14, no. 7,
p. 453-460, July 1971. SLR(k) explained by its inventor. Several suggestions are made on how
to modify the method; use a possibly different k for each state; use possibly different lengths for each
look-ahead string. The relation to Korenjak’s approach [LR 1969] is also discussed.
A.V. Aho, J.D. Ullman, “Optimization of LR(k) parsers”, J. Comput. Syst. Sci.,
vol. 6, p. 573-602, 1972. An algorithm is given to determine which entries in an LR(k) table
can never be accessed; the values of these entries are immaterial (so-called don’t-care entries) and can be
merged with other values. A second algorithm is given to determine which error entries could be merged
with which reduce entry, with the only result that error detection is postponed. Both algorithms and a
merging technique are used to reduce table size. It is proved that using these algorithms, one can produce
SLR(1) and LALR(1) tables. It is also proved that SLR(1) is identical to Korenjak’s method [LR 1969]
with all non-terminals selected. See also Soisalon-Soininen [LR 1982].
David S. Wise, “Generalized overlap resolvable grammars and their parsers”, J.
Comput. Syst. Sci., vol. 6, p. 538-572, Dec 1972. See same paper [Precedence 1972].
T. Anderson, J. Eve, J.J. Horning, “Efficient LR(1) parsers”, Acta Inform., vol. 2,
p. 12-39, 1973. Coherent explanation of SLR(1), LALR(1), elimination of unit rules and table
compression, with good advice.
Karel Cˇ ulik II, Rina Cohen, “LR-regular grammars − an extension of LR(k)
grammars”, J. Comput. Syst. Sci., vol. 7, p. 66-96, 1973. The input is scanned from
right to left by a FS automaton which records its state at each position. Next this sequence of states is
parsed from left to right using an LR(0) parser. If such a FS automaton and LR(0) parser exist, the gram￾mar is LR-regular. The authors conjecture, however, that it is unsolvable to construct this automaton and
parser. Examples are given of cases in which the problem can be solved.
A.V. Aho, J.D. Ullman, “A technique for speeding up LR(k) parsers”, SIAM J.
Computing, vol. 2, no. 2, p. 106-127, June 1973. Describes two detailed techniques to
eliminate unit rules, one by recognizing particular stack configurations and one by merging shifts on
non-terminals (GOTO’s).
Shoji Sekimoto, Kuniaki Mukai, Masaru Sudo, “A method of minimizing LR(k)
parsers”, Systems, Computers and Control, vol. 4, no. 5, p. 73-80, 1973. The states
of an LR(1) parser are grouped into classes by one of several equivalence relations. The parser records
only in which class it is, not in which state. When a reduction is called for, additional computation is
required to determine which reduction. The tables for the class transitions are much smaller than those
for the state transitions.
Jaroslav Král, Jirˇí Demner, “A note on the number of states of the DeRemer’s
recognizer”, Inform. Process. Lett., vol. 2, p. 22-23, 1973. Gives a formula for the
number of states of an SLR(1) parser for an LL(1) grammar.
A.V. Aho, S.C. Johnson, “LR parsing”, Computing Surveys, vol. 6, no. 2, p. 99-
124, 1974. LR parsing explained in a readable fashion, by the experts. Required reading.
Matthew M. Geller, Susan L. Graham, Michael A. Harrison, “Production prefix
parsing”. In Automata, languages and programming, J. Loeckx (eds.), Lecture
Notes in Computer Science #14, Springer-Verlag, Berlin, p. 232-241, 1974. The
284 Annotated bibliography [Ch. 13
items in a non-deterministic LR(0|1) automaton are simplified in that rather than A→β γ only β (the pro￾duction prefix) is recorded. If the corresponding deterministic automaton is free of conflicts and has no
compound states (that is, each state contains only one production prefix) the grammar is a production
prefix grammar. Table size is proportional to grammar size. Production prefix(1) is between simple pre￾cedence and SLR(1) in power.
David Pager, “On eliminating unit productions from LR(k) parsers”. In Automata,
languages and programming, J. Loeckx (eds.), Lecture Notes in Computer Sci￾ence #14, Springer-Verlag, Berlin, p. 242-254, 1974. The unit rules (and only the unit
rules) of the grammar are collected in a directed graph, which is a set of multi-rooted trees (no cycles
allowed). For each leaf, the states of all its predecessors are contracted.
J.J. Horning, “LR grammars and analyzers”. In Compiler Construction, an
Advanced Course, F.L. Bauer & J. Eickel (eds.), Lecture Notes in Computer Sci￾ence #21, Springer-Verlag, New York, p. 85-108, 1974. These lecture notes present a
concise discussion of LR(k) grammars and LR(0), SLR(1) (more restrictive adding of reduce entries by
using FOLLOW sets), LALR(1) (using shift entries to determine state after reduce), and LR(1) (adding
look-ahead to items) constructor algorithms. Also some attention is given to the representation of LR
tables, including some compactification techniques.
Paul Purdom, “The size of LALR(1) parsers”, BIT, vol. 14, p. 326-337, 1974.
Experimental size analysis for LALR(1) parsers. Although parser size can be exponential in the grammar
size, it is found in practice to be linear in the grammar size.
Hans H. Kron, Hans-Jürgen Hoffman, Gerhard Winkler, “On a SLR(k)-based
parser system which accepts non-LR(k) grammars”. In GI-4. Jahrestagung, D.
Siefkes (eds.), Lecture Notes in Computer Science #26, Springer-Verlag, New
York, p. 214-223, 1975. For each inadequate state in an LR(0) automaton, a resolution tree is
constructed of maximum depth k. If this construction succeeds, the grammar is of type FSLR(k). If it
fails, a parser is generated that performs breadth-first search to resolve the remaining inadequacies.
Detailed algorithms are given.
A.J. Demers, “Elimination of single productions and merging of non-terminal
symbols in LR(1) grammars”, Comput. Lang. (Elmsford, NY), vol. 1, no. 2, p.
105-119, April 1975. The unit rules are used to define subsets of the non-terminals, the
members of which can be treated as equivalent, similar to Aho and Ullman [LR 1973]. Explicit proofs
are given.
Harry B. Hunt III, Thomas G. Szymanski, Jeffrey D. Ullman, “On the complex￾ity of LR(k) testing”, Commun. ACM, vol. 18, no. 12, p. 707-716, Dec 1975. Time
bounds as a function of the grammar size are derived for testing many properties of grammars. A practi￾cal result is that both the LL(k) and the LR(k) properties can be tested in O(nk+2
). These and other
bounds given in the paper are upper bounds, and actual testing is often much faster.
O.L. Madsen, B.B. Kristensen, “LR-parsing of extended context-free grammars”,
Acta Inform., vol. 7, no. 1, p. 61-73, 1976. The right parts are allowed to contain choices
{ω1| . . . |ωn} and repetitions {ω}*. In addition to the dotted items in the LR sets, there are also marked
items, which have a # rather than a . The # means one of three things: here starts a repetition, one ele￾ment of a repetition has just been recognized or one member of a choice has just been recognized. Upon
reduction, these marked items will tell how to unstack the entire right-hand side.
R.C. Backhouse, “An alternative approach to the improvement of LR(k) parsers”,
Acta Inform., vol. 6, no. 3, p. 277-296, 1976. Traditionally, the field of bottom-up parsing
is described in terms of handle-finding automata. The author describes it in terms of left-contexts, in
which a left-context is a set of stack configurations of the LR(k) parser. Other bottom-up techniques are
explained as approximations to these sets.
Sec. 13.6] LR parsing 285
Thomas G. Szymanski, John H. Williams, “Non-canonical extensions of bottom￾up parsing techniques”, SIAM J. Computing, vol. 5, no. 2, p. 231-250, June 1976.
Theory of non-canonical versions of several bottom-up parsing techniques, with good informal introduc￾tion.
Marc L. Joliat, “A simple technique for partial elimination of unit productions
from LR(k) parsers”, IEEE Trans. Comput., vol. C-25, no. 7, p. 763-764, July
1976. A very simple algorithm is given that alters some of the transitions in an LR parse table to
bypass unit rules.
M.M. Geller, M.A. Harrison, “Characteristic parsing: a framework for producing
compact deterministic parsers”, J. Comput. Syst. Sci., vol. 14, no. 3, p. 265-317,
June 1977. Given a deterministic LR(1) automaton, suppose we add some (arbitrary) items to
some states. This will have two effects: the discriminatory power of the automaton will weaken and its
minimum size will decrease (since now some states will coincide). For a large number of grammars
there is a characteristic item addition technique that will minimize automaton size while preserving just
enough power. This requires a heavy mathematical apparatus.
Matthew M. Geller, Michael A. Harrison, “On LR(k) grammars and languages”,
Theoret. Comput. Sci., vol. 4, p. 245-276, 1977. Theoretical groundwork for the
“characteristic parsing technique” of Geller and Harrison [LR June 1977].
D. Pager, “The lane-tracing algorithm for constructing LR(k) parsers and ways of
enhancing its efficiency”, Inform. Sci., vol. 12, p. 19-42, 1977. An item A→β Xγ in an
LR parser (called a “configuration” here) has in general two kinds of successors: a set of “immediate
successors” X→ ξn and the “transition successor” A→βX γ. An item together with a sequence of its
successive successors is called a lane. Lanes are used 1) to collect enough look-ahead context to convert
an LR(0) automaton to LALR(1); 2) to determine which LALR(1) states should be split to resolve
remaining LALR(1) conflicts. The required algorithms are of considerable complexity.
Wilf R. LaLonde, “Regular right part grammars and their parsers”, Commun.
ACM, vol. 20, no. 10, p. 731-741, Oct 1977. The notion of regular right part grammars
and its advantages are described in detail. A parser is proposed that does LR(k) parsing to find the right
end of the handle and then, using different parts of the same table, scans the stack backwards using a
look-ahead (to the left!) of m symbols to find the left end; this is called LR(m, k). The corresponding
parse table construction algorithm is given by LaLonde [LR 1979].
David Pager, “A practical general method for constructing LR(k) parsers”, Acta
Inform., vol. 7, no. 3, p. 249-268, 1977. When during the construction of an LR(1) parser a
state has to be added, one can consider merging it with an already existing state, if no conflict can arise
from this. The problem is that it is not easy to tell whether conflicts may arise from a certain merge. To
this end, the notions weak compatibility and strong compatibility are defined. Algorithms for the efficient
construction of conflict-free small full LR(1) parse tables are given.
D. Pager, “Eliminating unit productions from LR(k) parsers”, Acta Inform., vol.
9, p. 31-59, 1977. Very detailed description of a unit rule elimination algorithm.
A. Celentano, “Incremental LR parsers”, Acta Inform., vol. 10, p. 307-321, 1978.
Very clear exposition of how the Ghezzi and Mandrioli algorithm [LR 1979] can be made to work on
parse sequences rather than on parse trees, thus improving efficiency.
Stephen C. Johnson, YACC: yet another compiler-compiler, Bell Laboratories,
Murray Hill, New Jersey 07974, p. 34, 1978. In spite of its title, yacc is one of the most
widely used parser generators. It generates LALR(1) parsers from a grammar with embedded semantic
actions and features a number of disambiguating and conflict-resolving mechanisms. The generated
parser is in C.
286 Annotated bibliography [Ch. 13
Akifumi Makinouchi, “On single production elimination in simple LR(k)
environment”, J. Inform. Process., vol. 1, no. 2, p. 76-80, 1978. An SLR(1) parser is
extended with the possibility of specifying grammar rules of the form ¬{Cl}A¬{Cr}→ . . . , which can
only be applied when the symbol before the A cannot produce a member of {Cl} as its last token, and the
token after A is not in {Cr}. Such rules allow some convenient ambiguities to be resolved without loos￾ing the generative power of the system.
W.R. LaLonde, “Constructing LR parsers for regular right part grammars”, Acta
Inform., vol. 11, p. 177-193, 1979. Describes the algorithms for the regular right part
parsing technique explained by LaLonde [LR 1977]. The back scan is performed using so-called read￾back tables. Compression techniques for these tables are given.
Stephan Heilbrunner, “On the definition of ELR(k) and ELL(k) grammars”, Acta
Inform., vol. 11, p. 169-176, 1979. See same paper [LL 1979].
Otto Mayer, “On deterministic canonical bottom-up parsing”, Inform. Control,
vol. 43, p. 280-303, 1979. A general framework is presented for deterministic canonical
bottom-up parsers, from which well-known parsers arise as special cases.
Carlo Ghezzi, Dino Mandrioli, “Incremental parsing”, ACM Trans. Prog. Lang.
Syst., vol. 1, no. 1, p. 58-70, July 1979. The authors observe that when a grammar allows
bottom-up parsing using some technique T and is at the same time RL(k) for any k, then any modification
to the input text can only affect nodes that produce the modified part. By keeping the entire parse tree in
a both left-most and right-most threaded form, these nodes can be located and updated quickly. The case
LR(1) ∧ RL(1) is treated in full.
Kai Koskimies, Eljas Soisalon-Soininen, “On a method for optimizing LR
parsers”, Intern. J. Comput. Math., vol. A7, p. 287-295, 1979. Defines criteria under
which Pager’s algorithm for the elimination of unit rules [LR 1977] can be safely applied to SLR(1)
parsers.
Kuo-Chung Tai, “Noncanonical SLR(1) grammars”, ACM Trans. Prog. Lang.
Syst., vol. 1, no. 2, p. 295-320, Oct 1979. A survey of non-canonical parsing methods is
given and two non-canonical variants of SLR(1) parsing are described.
Gerald A. Fisher Jr., Manfred Weber, “LALR(1) parsing for languages without
reserved words”, ACM SIGPLAN Notices, vol. 14, no. 11, p. 26-30, Nov 1979. A
heuristic is given for designing an LALR(1) programming language without reserved words. First design
the LALR(1) language with reserved words, using a non-terminal identifier for the identifiers. Now
allow identifier to also produce all reserved words and modify the grammar (or the language) until
the grammar is LALR(1) again, using feedback from an LALR(1) parser generator.
Eljas Soisalon-Soininen, “On the space-optimizing effect of eliminating single
productions from LR parsers”, Acta Inform., vol. 14, p. 157-174, 1980. Improvement
of Pager’s unit rule elimination algorithm [LR 1977].
Carlo Ghezzi, Dino Mandrioli, “Augmenting parsers to support incrementality”,
J. ACM, vol. 27, no. 3, p. 564-579, 1980. The algorithm of Ghezzi and Mandrioli [LR
1979] is extended to all LR(k) grammars.
Jacek Witaszek, “The LR(k) parser”. In Mathematical Foundations of Computer
Science, P. Dembin´ski (eds.), Lecture Notes in Computer Science #88, Springer￾Verlag, New York, p. 686-697, 1980. Three size-reducing transformations on LR(k) tables
are defined that leave the LR(k) property undisturbed. One is similar to minimising a FS automaton, one
removes unused look-ahead and one allows delaying error detection. No full algorithms given, but see
Witaszek [LR 1988].
Sec. 13.6] LR parsing 287
Bent Bruun Kristensen, Ole Lehrmann Madsen, “Methods for computing
LALR(k) lookahead”, ACM Trans. Prog. Lang. Syst., vol. 3, no. 1, p. 60-82, Jan
1981. The LALR(k) look-ahead sets are seen as the solution to a set of equations, which are
solved by recursive traversal of the LR(0) automaton. Full algorithms plus proofs are given.
R. Kemp, “LR(0) grammars generated by LR(0) parsers”, Acta Inform., vol. 15, p.
265-280, 1981. Theoretical analysis of the set of LR(0) grammars that produce a given LR(0)
parser.
Theodore P. Baker, “Extending look-ahead for LR parsers”, J. Comput. Syst. Sci.,
vol. 22, no. 2, p. 243-259, 1981. A FS automaton is derived from the LR automaton as
follows: upon a reduce to A the automaton moves to all states that have an incoming arc marked A. This
automaton is used for analysing the look-ahead as in an LR-regular parser (Cˇulik and Cohen [LR 1973]).
Stephan Heilbrunner, “A parsing automata approach to LR theory”, Theoret.
Comput. Sci., vol. 15, p. 117-157, 1981. Parsing is explained in terms of item grammars,
which describe the stack configurations of the parser. The theory is first developed for LR and then
applied uniformly to LL and LC.
Wilf R. LaLonde, “The construction of stack-controlling LR parsers for regular
right part grammars”, ACM Trans. Prog. Lang. Syst., vol. 3, no. 2, p. 168-206,
April 1981. Traditional LR parsers shift each input token onto the stack; often, this shift could be
replaced by a state transition, indicating that the shift has taken place. Such a parser is called a stack￾controlling LR parser, and will do finite-state recognition without stack manipulation whenever possible.
Algorithms for the construction of stack-controlling LR parse tables are given. The paper is complicated
by the fact that the new feature is introduced not in a traditional LR parser, but in an LR parser for regu￾lar right parts (for which see LaLonde [LR 1977]).
Charles Wetherell, A. Shannon, “LR − automatic parser generator and LR(1)
parser”, IEEE Trans. Softw. Eng., vol. SE-7, no. 3, p. 274-278, May 1981. This
short paper discusses a full LR(1) parser generator and parser, written in ANSI 66 Fortran for portability,
and using an algorithm by Pager [LR 1977].
Augusto Celentano, “An LR parsing technique for extended context-free gram￾mars”, Comput. Lang. (Elmsford, NY), vol. 6, no. 2, p. 95-107, 1981. The results of
repetitions or selections are popped off the parsing stack before the entire right-hand side has been recog￾nized. Remarkably, this can be done for any extended LR(1) grammar. Explicit algorithms are given.
Paul W. Purdom, Cynthia A. Brown, “Parsing extended LR(k) grammars”, Acta
Inform., vol. 15, p. 115-127, 1981. An LR state is stacked only at the beginning of a right￾hand side; all other work is done on a global state. At a reduce, the reduced non-terminal is already on
the top of the stack and needs only to be unstacked. This does not work for all extended LR(k) gram￾mars, but any extended LR(k) can be converted into one for which the method works.
Takehiro Tokuda, “Eliminating unit reductions from LR(k) parsers using
minimum contexts”, Acta Inform., vol. 15, p. 447-470, 1981. Very densely written
analysis of algorithms for the elimination of unit rules from a special class of LR(k) parsers.
Colin Burgess, Laurence James, “An indexed bibliography for LR grammars and
parsers”, ACM SIGPLAN Notices, vol. 16, no. 8, p. 14-26, Aug 1981. Useful,
detailed and structured bibliography containing around 115 entries.
David Spector, “Full LR(1) parser generation”, ACM SIGPLAN Notices, vol. 16,
no. 8, p. 58-66, Aug 1981. A heuristic algorithm for enlarging an LR(0) table to full LR(1) is
given and demonstrated on two examples. With letter of correction (vol. 16, no. 11, Nov 1981, p. 2).
See also Ancona, Dodero and Gianuzzi [LR 1982] and Spector [LR 1988].
288 Annotated bibliography [Ch. 13
M. Ancona, V. Gianuzzi, “A new method for implementing LR(k) tables”,
Inform. Process. Lett., vol. 13, no. 4/5, p. 171-176, 1981. For each inadequate state
there is a separate automaton handling that inadequacy by doing a look-ahead of one token. If this auto￾maton has inadequate states the process is repeated. A tables construction algorithm is given.
Eljas Soisalon-Soininen, “Inessential error entries and their use in LR parser
optimization”, ACM Trans. Prog. Lang. Syst., vol. 4, no. 2, p. 179-195, April
1982. More sophisticated and general algorithms are given for the techniques described by Aho
and Ullman [LR 1972].
M. Ancona, G. Dodero, V. Gianuzzi, “Building collections of LR(k) items with
partial expansion of lookahead strings”, ACM SIGPLAN Notices, vol. 17, no. 5, p.
24-28, May 1982. In addition to the usual terminals, non-terminals are allowed in the look￾ahead sets, leading to very substantial savings in the number of states. Only if an inadequate state turns
up the non-terminals are developed as far as needed to resolve the inadequacy. The algorithm will also
work reasonably for k>1.
J.C.H. Park, “A new LALR formalism”, ACM SIGPLAN Notices, vol. 17, no. 7,
p. 47-61, July 1982. Simplified operators corresponding to Predict and Accept are defined
precisely and applied to LR and LALR parser generation. Difficult to read.
Frank DeRemer, Thomas J. Pennello, “Efficient computation of LALR(1) look￾ahead sets”, ACM Trans. Prog. Lang. Syst., vol. 4, no. 4, p. 615-649, Oct 1982. 1.
The LALR(1) look-ahead sets are calculated by four linear sweeps over the LR(0) automaton, calculating
the sets Direct Read, Read, Follow and Look-Ahead, respectively. 2. An obvious simplification leads to
“Not Quite LALR(1)”, NQLALR(1), and is shown to be inadequate. 3. The debugging of non-LALR(1)
grammars is treated.
Colin Burgess, Laurence James, “A revised index bibliography for LR grammars
and parsers”, ACM SIGPLAN Notices, vol. 17, no. 12, p. 18-26, Dec 1982. A
revision of Burgess and James [LR 1981], extending the number of entries to about 160.
Jorma Tarhio, “LR parsing of some ambiguous grammars”, Inform. Process.
Lett., vol. 14, no. 3, p. 101-103, 1982. The reduction items in all inadequate states are
collected. The rules in them are extended at the end with “synchronization symbols”, to make the
shift/reduce and reduce/reduce conflicts go away. These synchronization symbols are context-dependent;
for instance each identifier could be followed by a token indicating its type. The synchronization symbols
are inserted in the input stream by the lexical analyser while parsing.
Rakesh Agrawal, Keith D. Detro, “An efficient incremental LR parser for gram￾mars with epsilon productions”, Acta Inform., vol. 19, no. 4, p. 369-376, 1983. A
linear time and space implementation of Celentano’s algorithm [LR 1978] is described, which can also
handle ε-rules.
Takehiro Tokuda, “A fixed-length approach to the design and construction of
bypassed LR(k) parsers”, J. Inform. Process., vol. 6, no. 1, p. 23-30, 1983. The idea
of removing unit reductions is extended to removing all reductions that do not involve semantic actions;
this leads to bypassed LR(k) parsers. Full algorithms are given. Some of the literature on removing unit
rules is analysed critically.
Dashing Yeh, “On incremental shift-reduce parsing”, BIT, vol. 23, no. 1, p. 36-48,
1983. The input tokens to an LR parser are stored in a linked list; each node in this list also holds
a pointer to a stack pertinent for the token in the node. These stacks can be merged and are in fact also
stored in the nodes. This arrangement greatly simplifies incremental parsing. Very clear explanation.
Kenzo Inoue, Fukumi Fujiwara, “On LLC(k) parsing method of LR(k)
Sec. 13.6] LR parsing 289
grammars”, J. Inform. Process., vol. 6, no. 4, p. 206-217, 1983. Assume an LR(k)
grammar. Start parsing using the (full) LL(k) method, until an LL(k) conflict is encountered, say on non￾terminal A. A is then parsed with the LR(k) method, using the proper predicted look-ahead set. If during
the LR (sub)parsing the number of items narrows down to one, an LL(k) (sub-sub)parsing is started; etc.
Full algorithms for all tables are given. LLC means “Least Left Corner”.
Lothar Schmitz, “On the correct elimination of chain productions from LR
parsers”, Intern. J. Comput. Math., vol. 15, no. 2, p. 99-116, 1984. Rigorous proofs of
some claims about unit-free LR(k) parsers.
N.P. Chapman, “LALR(1,1) parser generation for regular right part grammars”,
Acta Inform., vol. 21, p. 29-45, 1984. Efficient construction algorithm for LALR(1,1) parse
tables, which find the right end of the handle by traditional LALR(1) parsing and then scan the stack
backwards using a look-ahead of 1 symbol to find the left end.
Joseph C.H. Park, K.M. Choe, C.H. Chang, “A new analysis of LALR formal￾isms”, ACM Trans. Prog. Lang. Syst., vol. 7, no. 1, p. 159-175, Jan 1985. The
recursive closure operator CLOSURE of Kristensen and Madsen [LR 1981] is abstracted to an iterative
δ-operator such that CLOSURE≡δ*. This operator allows the formal derivation of four algorithms for the
construction of LALR look-ahead sets.
Esko Ukkonen, “Upper bounds on the size of LR(k) parsers”, Inform. Process.
Lett., vol. 20, no. 2, p. 99-105, Feb 1985. Upper bounds for the number of states of an
LR(k) parser are given for several types of grammars.
S. Heilbrunner, “Truly prefix-correct chain-free LR(1) parsers”, Acta Inform.,
vol. 22, no. 5, p. 499-536, 1985. A unit-free LR(1) parser generator algorithm, rigorously
proven correct.
Fred Ives, “Unifying view of recent LALR(1) lookahead set algorithms”, ACM
SIGPLAN Notices, vol. 21, no. 7, p. 131-135, July 1986. A common formalism is given
in which the LALR(1) look-ahead set construction algorithms of DeRemer and Pennello [LR 1982],
Park, Choe and Chang [LR 1985] and the author can be expressed. See also Park and Choe [LR 1987].
Manuel E. Bermudez, Karl M. Schimpf, “A practical arbitrary look-ahead LR
parsing technique”, ACM SIGPLAN Notices, vol. 21, no. 7, p. 136-144, July 1986.
To resolve LR(0) conflicts at run time, for each conflict state a FS automaton is developed that will do
arbitrary look-ahead. Grammars for which parsers can be constructed by this technique are called
LAM(m) where m in some way limits the size of the look-ahead FS automata. It can handle some non￾LR(k) grammars. See also Baker [LR 1981].
Thomas J. Pennello, “Very fast LR parsing”, ACM SIGPLAN Notices, vol. 21, no.
7, p. 145-151, July 1986. The tables and driver of a traditional LALR(1) parser are replaced
by assembler code performing linear search for small fan-out, binary search for medium and a calculated
jump for large fan-out. This modification gained a factor of 6 in speed at the expense of a factor 2 in size.
Ikuo Nakata, Masataka Sassa, “Generation of efficient LALR parsers for regular
right part grammars”, Acta Inform., vol. 23, p. 149-162, 1986. The stack of an
LALR(1) parser is augmented with a set of special markers that indicate the start of a right-hand side;
adding such a marker during the shift is called a stack-shift. Consequently there can now be a
shift/stack-shift conflict, abbreviated to stacking conflict. The stack-shift is given preference and any
superfluous markers are eliminated during the reduction. Full algorithms are given.
A.M.M. Al-Hussaini, R.G. Stone, “Yet another storage technique for LR parsing
tables”, Softw. Pract. Exper., vol. 16, no. 4, p. 389-401, 1986. Excellent introduction
to LR table compression in general. The submatrix technique introduced in this paper partitions the rows
290 Annotated bibliography [Ch. 13
into a number of submatrices, the rows of each of which are similar enough to allow drastic compressing.
The access cost is O(1). A heuristic partitioning algorithm is given.
Masataka Sassa, Ikuo Nakata, “A simple realization of LR-parsers for regular
right part grammars”, Inform. Process. Lett., vol. 24, no. 2, p. 113-120, Jan 1987.
For each item in each state on the parse stack of an LR parser, a counter is kept indicating how many
preceding symbols on the stack are covered by the recognized part in the item. Upon reduction, the
counter of the reducing item tells us how many symbols to unstack. The manipulation rules for the
counters are simple. The counters are stored in short arrays, one array for each state on the stack.
Joseph C.H. Park, Kwang-Moo Choe, “Remarks on recent algorithms for LALR
lookahead sets”, ACM SIGPLAN Notices, vol. 22, no. 4, p. 30-32, April 1987.
Careful analysis of the differences between the algorithms of Park, Choe and Chang [LR 1985] and Ives
[LR 1986]. See also Ives [LR 1987].
Fred Ives, “Response to remarks on recent algorithms for LALR lookahead sets”,
ACM SIGPLAN Notices, vol. 22, no. 8, p. 99-104, 1987. Remarks by Park and Choe
[LR 1987] are refuted and a new algorithm is presented that is significantly better than that of Park, Choe
and Chang [LR 1985] and that previously presented by Ives [LR 1986].
Nigel P. Chapman, LR Parsing: Theory and Practice, Cambridge University
Press, New York, NY, p. 228, 1987. Detailed treatment of the title subject. Highly
recommended for anybody who wants to acquire in-depth knowledge about LR parsing. Good on size of
parse tables and attribute grammars.
Eljas Soisalon-Soininen, Jorma Tarhio, “Looping LR parsers”, Inform. Process.
Lett., vol. 26, no. 5, p. 251-253, Jan 1988. For some (non-LR) grammars it is true that
there are ways to resolve the conflicts in an LR parser for them that will make the parser loop on some
inputs (executing an endless sequence of reduces). A test is given to detect such grammars.
Jacek Witaszek, “A practical method for finding the optimum postponement
transformation for LR(k) parsers”, Inform. Process. Lett., vol. 27, no. 2, p. 63-67,
Feb 1988. By allowing the LR(k) automaton to postpone error checking, the size of the
automaton can be reduced dramatically. Finding the optimum postponement transformation is, however,
a large combinatorial problem. A good heuristic algorithm for finding a (sub)optimal transformation is
given.
Dashing Yeh, Uwe Kastens, “Automatic construction of incremental LR(1)
parsers”, ACM SIGPLAN Notices, vol. 23, no. 3, p. 33-42, March 1988. Detailed
algorithms for an incremental LR(1) parser that allows multiple modifications and ε-rules.
Manuel E. Bermudez, Karl M. Schimpf, “On the (non-)relationship between
SLR(1) and NQLALR(1) grammars”, ACM Trans. Prog. Lang. Syst., vol. 10, no.
2, p. 338-342, April 1988. Shows a grammar that is SLR(1) but not NQLALR(1).
Pierpaolo Degano, Stefano Mannucci, Bruno Mojana, “Efficient incremental LR
parsing for syntax-directed editors”, ACM Trans. Prog. Lang. Syst., vol. 10, no. 3,
p. 345-373, July 1988. The non-terminals of a grammar are partitioned by hand into sets of
“incrementally compatible” non-terminals, meaning that replacement of one non-terminal by an incre￾mentally compatible one is considered a minor structural change. Like in Korenjak’s method [LR 1969],
for a partitioning in n sets n +1 parse tables are constructed, one for each set and one for the grammar that
represents the connection between the sets. The parser user is allowed interactively to move or copy the
string produced by a given non-terminal to a position where an incrementally compatible one is required.
This approach keeps the text (i.e. the program text) reasonably correct most of the time and uses rather
small tables.
Sec. 13.6] LR parsing 291
George H. Roberts, “Recursive ascent: an LR analog to recursive descent”, ACM
SIGPLAN Notices, vol. 23, no. 8, p. 23-29, Aug 1988. Each LR state is represented by a
subroutine. The shift is implemented as a subroutine call, the reduction is followed by a subroutine
return possibly preceded by a return stack adjustment. The latter prevents the generation of genuine sub￾routines since it requires explicit return stack manipulation. A small and more or less readable LR(0)
parser is shown, in which conflicts are resolved by means of the order in which certain tests are done,
like in a recursive descent parser.
F.E.J. Kruseman Aretz, “On a recursive ascent parser”, Inform. Process. Lett.,
vol. 29, no. 4, p. 201-206, Nov 1988. Each state in an LR automaton is implemented as a
subroutine. A shift calls that subroutine. A reduce to X is effected as follows. X and its length n are stored
in global variables; all subroutines are rigged to decrement n and return as long as n>0, and to call the
proper GOTO state of X when n hits 0. This avoids the explicit stack manipulation of Roberts [LR 1988].
David Spector, “Efficient full LR(1) parser generation”, ACM SIGPLAN Notices,
vol. 23, no. 12, p. 143-150, Dec 1988. A relatively simple method is given for extending an
LR(0) table to full LR(1). The method isolates the inadequate states, constructs the full look-ahead sets
for them and then splits them (and possible predecessor states). The algorithm is described informally.
Manuel E. Bermudez, George Logothetis, “Simple computation of LALR(1)
look-ahead sets”, Inform. Process. Lett., vol. 31, no. 5, p. 233-238, 1989. The
original LALR(1) grammar is replaced by a not much bigger grammar that has been made to incorporate
the necessary state splitting through a simple transformation. The SLR(1) automaton of this grammar is
the LALR(1) automaton of the original grammar.
George H. Roberts, “Another note on recursive ascent”, Inform. Process. Lett.,
vol. 32, no. 5, p. 263-266, 1989. The fast parsing methods of Pennello [LR 1986],
Kruseman Aretz [LR 1988] and Roberts are compared. A special-purpose optimizing compiler can select
the appropriate technique for each state.
James Kanze, “Handling ambiguous tokens in LR parsers”, ACM SIGPLAN
Notices, vol. 24, no. 6, p. 49-54, June 1989. It may not always be possible to infer from
the appearance of an input symbol the terminal symbol it corresponds to in the parser. In that case a
default assumption can be made and the error recovery mechanism of the parser can be rigged to try
alternatives. A disadvantage is that an LALR parser may already have made reductions (or a strong-LL
parser may have made ε-moves) that have ruined the context. An implementation in UNIX’s yacc is
given.
Daniel J. Salomon, Gordon V. Cormack, “Scannerless NSLR(1) parsing of pro￾gramming languages”, ACM SIGPLAN Notices, vol. 24, no. 7, p. 170-178, July
1989. The traditional CF syntax is extended with two rule types: A×→B, which means that any
sentential form in which A generates a terminal production of B (with B regular) is illegal, and A−/B,
which means that any sentential form in which terminal productions of A and B are adjacent, is illegal.
The authors show that the addition of these two types of rules allow one to incorporate the lexical phase
of a compiler into the parser. The system uses a non-canonical SLR(1) parser.
J. Heering, P. Klint, J. Rekers, “Incremental generation of parsers”, ACM SIG￾PLAN Notices, vol. 24, no. 7, p. 179-191, July 1989. In a very unconventional approach
to parser generation, the initial information for an LR(0) parser consists of the grammar only. As parsing
progresses, more and more entries of the LR(0) table (actually a graph) become required and are con￾structed on the fly. LR(0) inadequacies are resolved using Tomita’s method. All this greatly facilitates
handling (dynamic) changes to the grammar.
R. Nigel Horspool, “ILALR: an incremental generator of LALR(1) parsers”. In
Compiler Compilers and High-Speed Compilation, D. Hammer (eds.), Lecture
Notes in Computer Science #371, Springer-Verlag, Berlin, p. 128-136, 1989.
292 Annotated bibliography [Ch. 13
Grammar rules are checked as they are typed in. To this end, LALR(1) parse tables are kept and continu￾ally updated. When the user interactively adds a new rule, the sets FIRST and NULLABLE are recalcu￾lated and algorithms are given to distribute the consequences of possible changes over the LR(0) and
look-ahead sets. Some serious problems are reported and practical solutions are given.
Daniel J. Salomon, Gordon V. Cormack, “Corrections to the paper: Scannerless
NSLR(1) parsing of programming languages”, ACM SIGPLAN Notices, vol. 24,
no. 11, p. 80-83, Nov 1989. More accurate time measurements and corrections to the
algorithms are supplied. See same authors [LR July 1989].
Stylianos D. Pezaris, “Shift-reduce conflicts in LR parsers”, ACM SIGPLAN
Notices, vol. 24, no. 11, p. 94-95, Nov 1989. It is shown that if an LR(1) parser either has
no shift/reduce conflicts or has shift/reduce conflicts that have been decided to be solved by shifting, the
same parsing behaviour can be obtained from the corresponding LR(0) parser (which will have no
reduce/reduce conflicts) in which all shift/reduce conflicts are resolved in favour of the shift. With this
resolution principle, for instance the programming language C can be parsed with an LR(0) parser.
Gregor Snelting, “How to build LR parsers which accept incomplete input”, ACM
SIGPLAN Notices, vol. 25, no. 4, p. 51-58, April 1990. When an LR parser finds a
premature end-of-file, the incomplete parse tree is completed using some heuristics on the top state of the
stack. The heuristics mainly favour reduction over shift and their application is repeated until the parse
tree is complete or further completion would involve too much guessing. The technique is explained in
the setting of a language-based editor.
George H. Roberts, “From recursive ascent to recursive descent: via compiler
optimizations”, ACM SIGPLAN Notices, vol. 25, no. 4, p. 83-89, April 1990. Shows
a number of code transformations that will turn an LR(1) recursive ascent parser (see Roberts [LR 1988]
and [LR 1989]) for an LL(1) grammar into a recursive descent parser.
13.7 LEFT-CORNER PARSING
This section also covers a number of related techniques: production-chain, LLP(k),
PLR(k), etc.
D.J. Rosenkrantz, P.M. Lewis II, “Deterministic left-corner parsing”. In IEEE
Conference Record 11th Annual Symposium on Switching and Automata Theory,
p. 139-152, 1970. An LC(k) parser decides the applicability of a rule when it has seen the initial
non-terminal of the rule if it has one, plus a look-ahead of k symbols. Identifying the initial non-terminal
is done by bottom-up parsing, the rest of the rule is recognized top-down. A canonical LC pushdown
machine can be constructed in which the essential entries on the pushdown stack are pairs of non￾terminals, one telling what non-terminal has been recognized bottom-up and the other what non-terminal
is predicted top-down. As with LL, there is a difference between LC and strong-LC. There is a simple
algorithm to convert an LC(k) grammar into LL(k) form; the resulting grammar may be large, though.
Y. Eric Cho, “Simple left-corner grammars”. In Proc. Seventh Princeton Confer￾ence on Information Sciences and Systems, Princeton, p. 557, 1973. LC parsing is
simplified by requiring that each right-hand side be recognizable (after LC reduction) by its first two
symbols and by handling left recursion as a special case. The required tables are extremely small.
David B. Lomet, “Automatic generation of multiple exit parsing subroutines”. In
Automata, languages and programming, J. Loeckx (eds.), Lecture Notes in Com￾puter Science #14, Springer-Verlag, Berlin, p. 214-231, 1974. A production chain is a
chain of production steps X0→X1α1, X1→X2α2, . . . Xn −1→tαn, with X0, . . . ,Xn −1 non-terminals and
t a terminal. If the input is known to derive from X0 and starts with t, each production chain from X0
to
t is a possible explanation of how t was produced. The set of all production chains connecting X0
to t
Sec. 13.7] Left-corner parsing 293
is called a production expression. An efficient algorithm for the construction and compression of pro￾duction expressions is given. Each production expression is then implemented as a subroutine which con￾tains the production expression as a FS automaton.
Michael Hammer, “A new grammatical transformation into LL(k) form”. In
Proceedings Sixth Annual ACM Symposium on Theory of Computing, p. 266-275,
1974. Each left corner in a left-corner parser is described as a FS automaton and implemented as
a subroutine. Parsing is then performed by recursive descent using these subroutines. The FS automata
can be incorporated into the grammar to yield an LL(k) grammar.
J. Král, J. Demner, “Parsing as a subtask of compiling”. In Mathematical Foun￾dations of Computer Science, J. Becˇvárˇ (eds.), Lecture Notes in Computer Science
#32, Springer-Verlag, Berlin, p. 61-74, 1975. Various considerations that went into the
design of a variant of left-corner parsing, called semi-top-down.
E. Soisalon-Soininen, E. Ukkonen, “A characterization of LL(k) grammars”. In
Automata, Languages and Programming, S. Michaelson & R. Milner (eds.), Edin￾burgh University Press, Edinburgh, p. 20-30, 1976. Introduces a subclass of the LR(k)
grammars called predictive LR(k) (PLR(k)). The deterministic LC(k) grammars are strictly included in
this class, and a grammatical transformation is presented to transform a PLR(k) into an LL(k) grammar.
PLR(k) grammars can therefore be parsed with the LL(k) parser of the transformed grammar. A conse￾quence is that the classes of LL(k), LC(k), and PLR(k) languages are identical.
A. Nijholt, “Simple chain grammars”. In Automata, Languages and Program￾ming, A. Salomaa & M. Steinby (eds.), Lecture Notes in Computer Science #52,
Springer-Verlag, Berlin, p. 352-364, 1977. A non-terminal X is said to be chain￾independent if all production chains (see Lomet [LC 1974]) of X end in a different terminal symbol.
Two symbols X and Y are “mutually chain-independent” if different chains, one starting with X and the
other with Y, end with different symbols. A CF grammar is a simple chain grammar if it satisfies the fol￾lowing conditions: (1) all its symbols are chain-independent, (2) if A→αXβ and A→αYγ, then X and Y
are mutually chain-independent, and (3) if A→α and A→αβ then β=ε.
This class of grammars contains the LL(1) grammars without ε-rules, and is a subset of the LR(0) gram￾mars. A simple parser for these grammars is presented.
Jaroslav Král, “Almost top-down analysis for generalized LR(k) grammars”. In
Methods of algorithmic language implementation, A.P. Ershov and C.H.A. Koster
(eds.), Lecture Notes in Computer Science #47, Springer-Verlag, Berlin, p. 149-
172, 1977. Very well-argued introduction to semi-top-down parsing; see Král [LC 1975].
Jan Pittl, “Exponential optimization for the LLP(k) parsing method”. In
Mathematical Foundations of Computer Science, J. Gruska (eds.), Lecture Notes
in Computer Science #53, Springer-Verlag, Berlin, p. 435-442, 1977. The automata
by Lomet [LC 1974] are reduced using the “characteristic parsing” technique of Geller and Harrison [LR
1977].
Alan J. Demers, “Generalized left corner parsing”. In Fourth ACM Symposium on
Principles of Programming Languages, p. 170-182, 1977. The right-hand side of each
rule is required to contain a marker. The part on the left of the marker is the left corner; it is recognized
by SLR(1) techniques, the rest by LL(1) techniques. An algorithm is given to determine the first admissi￾ble position in each right-hand side for the marker.
Eljas Soisalon-Soininen, Esko Ukkonen, “A method for transforming grammars
into LL(k) form”, Acta Inform., vol. 12, p. 339-369, 1979. A restricted class of LR(k)
grammars is defined, the predictive LR(k) or PLR(k) grammars, which can be handled by left-corner
techniques. Like LC(k) grammars, they can be transformed into LL(k) grammars.
294 Annotated bibliography [Ch. 13
Esko Ukkonen, “A modification of the LR(k) method for constructing compact
bottom-up parsers”. In Automata, Languages and Programming, Hermann A.
Maurer (eds.), Lecture Notes in Computer Science #71, Springer-Verlag, Berlin,
p. 646-658, 1979. An LR(k) parser is extended to do left-corner parsing simultaneously by
compounding the states on the stack. This can be done for weak-PLR(k) grammars only, which, how￾ever, include almost all LR(k) grammars. The resulting table is gigantic but highly structured, and can be
condensed considerably.
Daniel Chester, “A parsing algorithm that extends phrases”, Am. J. Comput.
Linguist., vol. 6, no. 2, p. 87-96, April-June 1980. See same paper [NatLang 1980].
Jan Pittl, “On LLP(k) grammars and languages”, Theoret. Comput. Sci., vol. 16,
p. 149-175, 1981. See Pittl [LC 1982]. All LR(k) languages have an LLP(k) grammar. LLP(k)
lies somewhere between LL(k) and LR(k).
Jan Pittl, “On LLP(k) parsers”, J. Comput. Syst. Sci., vol. 24, p. 36-68, 1982. This
paper first presents a non-deterministic parser using a mixed top-down-bottom-up strategy, and then
examines the circumstances under which these parsers are deterministic, resulting in the class of LLP(k)
grammars. The parser does not have the correct-prefix property, as the LL(k) and LR(k) parsers have.
Yuji Matsumoto, Hozumi Tanaka, Hideki Hirakawa, Hideo Miyoshi, Hideki
Yasukawa, “BUP: a bottom-up parser embedded in Prolog”, New Generation
Computing, vol. 1, p. 145-158, 1983. A bottom-up parser for natural language text
embedded in Prolog is described, in which each grammar rule corresponds to a Prolog clause. The
parser, which is fact left-corner, can deal with any cycle-free grammar with no ε-rules. The dictionary is
handled separately. Explicit rules are given how to convert a grammar into Prolog clauses. A facility for
remembering previous successes and failures is included. A tracing facility is also described.
Kenzo Inoue, Fukumi Fujiwara, “On LLC(k) parsing method of LR(k) gram￾mars”, J. Inform. Process., vol. 6, no. 4, p. 206-217, 1983. See same paper [LR 1983].
Susan Hirsh, “P-PATR: a compiler for unification-based grammars”. In Natural
Language Understanding and Logic Programming, II, V. Dahl & P. Saint-Dizier
(eds.), Elsevier Science Publ., Amsterdam, p. 63-78, 1988. Left-corner parsing in
Prolog. How to handle ε-rules that hide left recursion (remove them by duplicating the rule).
13.8 PRECEDENCE AND BOUNDED-CONTEXT PARSING
Harold Wolpe, “Algorithm for analyzing logical statements to produce a truth
function table”, Commun. ACM, vol. 1, no. 3, p. 4-13, March 1958. The paper
describes an algorithm to convert a Boolean expression into a decision table. The expression is first fully
parenthesized through a number of substitution rules that represent the priorities of the operators. Parsing
is then done by counting parentheses. Further steps construct a decision table.
J.H. Wegstein, “From formulas to computer-oriented language”, Commun. ACM,
vol. 2, no. 3, p. 6-8, March 1959. A program that converts from arithmetic expressions to
three-address code is given as a one-page flowchart. The parser is basically operator-precedence, with
built-in precedences.
Robert W. Floyd, “Syntactic analysis and operator precedence”, J. ACM, vol. 10,
no. 3, p. 316-333, July 1963. Operator-precedence explained and applied to an Algol 60
compiler.
J. Eickel, M. Paul, F.L. Bauer, K. Samelson, “A syntax-controlled generator of
Sec. 13.8] Precedence and bounded-context parsing 295
formal language processors”, Commun. ACM, vol. 6, no. 8, p. 451-455, Aug 1963.
In this early paper, the authors develop and describe what is basically a (2,1) bounded-context parser.
Reduction rules have to have the form U ← V or R ← ST. Such a grammar is called an R-language; it is
“unique” if the parse tables can be constructed without conflict. The terminology in the paper differs con￾siderably from today’s.
Robert W. Floyd, “Bounded context syntax analysis”, Commun. ACM, vol. 7, no.
2, p. 62-67, Feb 1964. For each right-hand side R in the grammar, enough context is
constructed (by hand) so that when R is found in a sentential form in the right context in a bottom-up
parser, it can safely be assumed to be the handle.
Niklaus Wirth, Helmut Weber, “EULER − A generalization of ALGOL and its
formal definition, Part 1/2”, Commun. ACM, vol. 9, no. 1/2, p. 13-25/89-99,
Jan/Feb 1966. Detailed description of simple and extended precedence. A table generation
algorithm is given. Part 2 contains the complete precedence table plus functions for the language
EULER.
David F. Martin, “Boolean matrix methods for the detection of simple pre￾cedence grammars”, Commun. ACM, vol. 11, no. 10, p. 685-687, Oct 1968. Finding
the simple-precedence relations is explained as matrix operations on matrices derived trivially from the
grammar.
James R. Bell, “A new method for determining linear precedence functions for
precedence grammars”, Commun. ACM, vol. 12, no. 10, p. 567-569, Oct 1969. The
precedence relations are used to set up a connectivity matrix. Take the transitive closure and count 1’s in
each row. Check for correctness of the result.
Alain Colmerauer, “Total precedence relations”, J. ACM, vol. 17, no. 1, p. 14-30,
Jan 1970. The non-terminal resulting from a reduction is not put on the stack but pushed back
into the input stream; this leaves room for more reductions on the stack. This causes precedence relations
that differ considerably from simple precedence.
A. Learner, A.L. Lim, “A note on transforming grammars to Wirth-Weber pre￾cedence form”, Computer J., vol. 13, p. 142-144, 1970. An algorithm is given to
transform any CF grammar to simple precedence form (with possible duplicate right-hand sides).
Jacques Loeckx, “An algorithm for the construction of bounded-context parsers”,
Commun. ACM, vol. 13, no. 5, p. 297-307, May 1970. By systematically generating all
BC states the parser may encounter.
J. Ichbiah, S. Morse, “A technique for generating almost optimal Floyd-Evans
productions of precedence grammars”, Commun. ACM, vol. 13, no. 8, p. 501-508,
Aug 1970. The notion of “weak precedence” is defined in the introduction. The body of the
article is concerned with efficiently producing good Floyd-Evans productions from a given weak pre￾cedence grammar.
A.V. Aho, P.J. Denning, J.D. Ullman, “Weak and mixed strategy precedence
parsing”, J. ACM, vol. 19, no. 2, p. 225-243, April 1972. The theory behind and a
comparison of various bottom-up (shift/reduce) parsing algorithms.
Shoji Sekimoto, “Extended right precedence grammars and analyzing technique
for them”, Inform. Process. Japan, vol. 12, p. 21-25, 1972. In the presence of two rules
A→αXβ and B→β, weak precedence requires that there be no precedence relation between X and B.
This requirement is replaced by a more lenient (but more complicated) one, resulting in right precedence
and is further relaxed to extended right precedence.
296 Annotated bibliography [Ch. 13
David F. Martin, “A Boolean matrix method for the computation of linear pre￾cedence functions”, Commun. ACM, vol. 15, no. 6, p. 448-454, June 1972. Detailed
description of a variant of Bell’s method [Precedence 1969].
A.V. Aho, J.D. Ullman, “Linear precedence functions for weak precedence gram￾mars”, Intern. J. Comput. Math., vol. A3, p. 149-155, 1972. The entries in a
precedence table have four values: <·, =˙, ·> and blank. Since precedence functions can only represent three
relations: <, = and >, the blank is sacrificed, to the detriment of error detection. A weak precedence
table holds only three kinds of entries: ≤·, ·> and blank, which can be mapped onto <, > and =. The result￾ing matrix will normally not allow precedence functions, but it will if a number of the =’s are sacrificed.
An algorithm is given to (heuristically) determine the minimal set of =’s to sacrifice; unfortunately this is
done by calling upon a heuristic algorithm for partitioning graphs.
J. McAfee, L. Presser, “An algorithm for the design of simple precedence gram￾mars”, J. ACM, vol. 19, no. 3, p. 385-395, July 1972. An algorithm to construct for any
CF grammar a grammar with conflict-free simple-precedence relations that generates the same language
(with possible duplicate right-hand sides, though).
David Crowe, “Generating parsers for affix grammars”, Commun. ACM, vol. 15,
no. 8, p. 728-734, Aug 1972. See same paper [VW 1972].
David S. Wise, “Generalized overlap resolvable grammars and their parsers”, J.
Comput. Syst. Sci., vol. 6, p. 538-572, Dec 1972. A CF grammar is Generalized
Overlap-Resolvable (GOR) if the handle in a bottom-up parser can be found deterministically by identi￾fying the right-hand side on the top of the stack, preceded on the stack by a token from a set of admissi￾ble left-context tokens and by requiring that the next input token belong to a set of admissible right￾context tokens. A grammar is Overlap-Resolvable (OR) if it is GOR and ε-free. These grammars are
between mixed-strategy precedence and SLR(1) in power. A very efficient and flexible implementation
using Dömölki’s technique is described.
Rainer Zimmer, “Soft precedence”, Inform. Process. Lett., vol. 1, p. 108-110,
1972. A grammar with a conflict-free precedence table in which not all right-hand sides are
different, causes reduce conflicts. For each reduce conflict a simple pattern is constructed which resolves
the conflict by checking the parse stack. If for each reduce conflict such a pattern exists, the grammar is
soft precedence. A matrix algorithm to find the patterns if they exist is given.
A.V. Aho, J.D. Ullman, “Error detection in precedence parsers”, Math. Syst.
Theory, vol. 7, no. 2, p. 97-113, 1973. The full precedence matrix is split into two copies,
one used to decide between shifts and reduces, which contains ≤·, ·> and blank, and the other to determine
the left end of the handle which contains <·, =˙ and blank. The techniques of Aho and Ullman [Precedence
1972] are now applied to both matrices.
James N. Gray, Michael A. Harrison, “Canonical precedence schemes”, J. ACM,
vol. 20, no. 2, p. 214-234, April 1973. The theory behind precedence parsing.
G. Terrine, “Coordinate grammars and parsers”, Computer J., vol. 16, p. 232-
244, 1973. A bounded-context parser is made to stack dotted items rather than terminals and
non-terminals. This makes it stronger than bounded-context but still weaker than LR.
M.D. Mickunas, V.B. Schneider, “A parser-generating system for constructing
compressed compilers”, Commun. ACM, vol. 16, no. 11, p. 669-676, Nov 1973.
Describes a bounded-context parser with transduction facilities. Includes a compression algorithm for
BC tables.
Susan L. Graham, “On bounded right context languages and grammars”, SIAM J.
Computing, vol. 3, no. 3, p. 224-254, Sept 1974. Theory of same.
Sec. 13.8] Precedence and bounded-context parsing 297
J.H. Williams, “Bounded-context parsable grammars”, Inform. Control, vol. 28,
no. 4, p. 314-334, Aug 1975. A more general non-canonical form of bounded-context, called
bounded-context parsable, is defined which allows, among others, the parsing in linear time of some
non-deterministic languages. Although a parser could be constructed, it would not be practical.
M.R. Levy, “Complete operator precedence”, Inform. Process. Lett., vol. 4, no. 2,
p. 38-40, Nov 1975. Establishes conditions under which operator-precedence works properly.
D.S. Henderson, M.R. Levy, “An extended operator precedence parsing algo￾rithm”, Computer J., vol. 19, no. 3, p. 229-233, 1976. The relation <· is split into <·1 and
<·2. a<·1b means that a may occur next to b, a<·2b means that a non-terminal has to occur between them.
Likewise for =˙ and ·>. This is extended operator-precedence.
M.S. Krishnamurthy, H.R. Ramesha Chandra, “A note on precedence func￾tions”, Inform. Process. Lett., vol. 4, no. 4, p. 99-100, Jan 1976. Proves for some
simple-precedence tables that no grammars for them exist.
R.K. Shyamasundar, “A note on linear precedence functions”, Inform. Process.
Lett., vol. 5, no. 3, p. 81, 1976. Comments on Krishnamurthy and Ramesha Chandra
[Precedence 1976].
M.H. Williams, “Complete operator precedence conditions”, Inform. Process.
Lett., vol. 6, no. 2, p. 60-62, April 1977. Revision of the criteria of Levy [Precedence
1975].
Eberhard Bertsch, “The storage requirement in precedence parsing”, Commun.
ACM, vol. 20, no. 3, p. 192-194, March 1977. Suppose for a given grammar there exists a
precedence matrix but the precedence functions f and g do not exists. There always exist sets of pre￾cedence functions fi and gj
such that for two symbols a and b, comparison of fc (b)(a) and gd (a)(b) yields
the precedence relation between a and b, where c and d are selection functions which select the fi and gj
to be compared. An algorithm is given to construct such a system of functions.
R.K. Shyamasundar, “Precedence parsing using Dömölki’s algorithm”, Intern. J.
Comput. Math., vol. A6, p. 105-114, 1977. Dömölki’s algorithm can find a reducible
right-hand-side efficiently but cannot know if it is a handle. Precedence parsing can find the handle
easily but has trouble determining which right-hand side it is. Together they are a perfect match.
I.H. Sudborough, “A note on weak operator precedence grammars”, Inform. Pro￾cess. Lett., vol. 7, no. 5, p. 213-218, 1978. Introduces weak operator-precedence and states
that L(SP)=L(WP) and L(SP)⊃L(WOP)⊃L(OP), where SP is simple precedence, WP is weak pre￾cedence, WOP is weak operator-precedence and OP is operator-precedence, and L(X) is the set of
languages generatable by X grammars.
R.K. Shyamasundar, “Precedence-regular grammars”, Intern. J. Comput. Math.,
vol. A7, p. 173-186, 1979. Characterization of the class of grammars for which the
Shyamasundar/Dömölki technique (Shyamasundar [Precedence 1977]) works. Note that whereas in LL￾and LR-regular it is the rest of the input that is analysed by a FS automaton to resolve a conflict, in
precedence-regular it is the stack that is analysed by a Dömölki-like automaton.
Peter Ruzˇicˇka, “Validity test for Floyd’s operator precedence parsing algo￾rithms”. In Mathematical Foundations of Computer Science, J. Becˇvárˇ (eds.), Lec￾ture Notes in Computer Science #74, Springer-Verlag, Berlin, p. 415-424, 1979.
Additions to the criteria by Levy [Precedence 1975].
M.H. Williams, “Conditions for extended operator precedence parsing”, Com￾puter J., vol. 22, no. 2, p. 164-168, 1979. Tighter analysis of extended operator-precedence
298 Annotated bibliography [Ch. 13
than Henderson and Levy [Precedence 1976].
Amiram Yehudai, “A new definition for simple precedence grammars”, BIT, vol.
19, p. 282-284, 1979. A weaker definition of simple precedence is given, which is then shown
to define the same class.
K.R. Moll, “Left context precedence grammars”, Acta Inform., vol. 14, p. 317-
335, 1980. Elaborate and definitely non-trivial refinement of the notion of precedence, to achieve
the viable-prefix property.
Wilf R. LaLonde, Jim des Rivieres, “Handling operator precedence in arithmetic
expressions with tree transformations”, ACM Trans. Prog. Lang. Syst., vol. 3, no.
1, p. 83-103, Jan 1981. Algorithms that will restructure the parse tree when the operator
precedences are modified. The algorithm is also used to do parsing: first produce a parse tree in standard
form and then add the precedence information.
David A. Workman, “SR(s,k) parsers: A class of shift-reduce bounded-context
parsers”, J. Comput. Syst. Sci., vol. 22, no. 1, p. 178-197, 1981. The look-back over all
combinations of m symbols on the stack in BC(m,n) parsers is replaced by an LR(m)-like automaton,
resulting in an SR(m,n) parser, if possible. The paper is mainly concerned with theoretical properties of
SR grammars and parsers.
M.H. Williams, “A systematic test for extended operator precedence”, Inform.
Process. Lett., vol. 13, no. 4-5, p. 187-190, End 1981. The criteria of Williams
[Precedence 1979] in algorithmic form.
M.C. Er, “A note on computing precedence functions”, Computer J., vol. 25, no.
3, p. 397-398, 1982. By determining longest paths in a digraph.
Junichi Aoe, Yoneo Yamamoto, Ryosaku Shimada, “A practical method for
reducing weak precedence parsers”, IEEE Trans. Softw. Eng., vol. SE-9, no. 1, p.
25-30, Jan 1983. When a weak-precedence parser finds a ·> relation and starts a reduce
sequence, the sequence stops when a ≤· is met; all intermediate relations are required to be ·>, to continue
the sequence. The authors modify the parser to continue the sequence anyway, until a ≤· is found; the
intermediate relations are never tested and their values are immaterial. This is exploited to reduce the
parse table.
Piotr Wyrostek, “On the ‘correct prefix property’ in precedence parsers”, Inform.
Process. Lett., vol. 17, no. 3, p. 161-165, Oct 1983. Extremely complicated
transformation of precedence grammars to mixed-strategy grammars which have, for some parsers, the
correct-prefix property. With an erratum in Inform. Process. Lett., vol. 19, no. 2, p. 111, Aug 1984.
Piotr Wyrostek, “Precedence technique is not worse than SLR(1)”, Acta Inform.,
vol. 23, p. 361-392, 1986. The thesis in the title is proved by giving an algorithm that
transforms an SLR(1) grammar into a (1,1)-mixed-strategy precedence grammar with the viable-prefix
property (see also Graham [Precedence 1974]). The resulting precedence table is often smaller than the
SLR(1) table.
R. Nigel Horspool, Michael R. Levy, “Correctness of an extended operator￾precedence parsing algorithm”, Inform. Process. Lett., vol. 24, no. 4, p. 265-273,
March 1987. Establishes conditions under which extended operator-precedence (see Henderson
and Levy [Precedence 1976]) works properly.
Sec. 13.8] Finite-state automata 299
13.9 FINITE-STATE AUTOMATA
M.O. Rabin, D. Scott, “Finite automata and their decision problems”, IBM J.
Research and Development, vol. 3, p. 114-125, April 1959. A finite-state automaton is
considered as the definition of the set of strings it accepts. Many fundamental properties of FS automata
are exposed and proved. The very useful subset construction algorithm can be found in Definition 11.
Ken Thompson, “Regular expression search algorithm”, Commun. ACM, vol. 11,
no. 6, p. 419-422, June 1968. The regular expression is turned into a transition diagram,
which is then interpreted in parallel. Remarkably, each step generates (IBM 7094) machine code to exe￾cute the next step.
Walter L. Johnson, James S. Porter, Stephanie I. Ackley, Douglas T. Ross,
“Automatic generation of efficient lexical processors using finite state tech￾niques”, Commun. ACM, vol. 11, no. 12, p. 805-813, Dec 1968. Semantic actions are
attached to some rules of a FS grammar. A variant of the subset construction is described that requires
the unique determination of the states in which a semantic action is required.
Franklin L. DeRemer, “Lexical analysis”. In Compiler Construction: An
Advanced Course, F.L. Bauer & J. Eickel (eds.), Lecture Notes in Computer Sci￾ence #21, Springer-Verlag, Berlin, p. 109-120, 1974. 1. General introduction to lexical
analysers, hand-written and generated. 2. Simplification of the LR parser generator algorithm for the
case of non-self-embedding CF grammars (which is possible since the latter in fact generate a regular
language).
Alfred V. Aho, Margaret J. Corasick, “Efficient string matching: an aid to biblio￾graphic search”, Commun. ACM, vol. 18, no. 6, p. 333-340, June 1975. A given
string embedded in a longer text is found by a very efficient FS automaton derived from that string.
M.E. Lesk, E. Schmidt, “Lex − a lexical analyzer generator”. In UNIX Manuals,
Bell Laboratories, Murray Hill, New Jersey, p. 13, 1975. The regular grammar is
specified as a list of regular expressions, each associated with a semantic action, which can access the
segment of the input that matches the expression. Substantial look-ahead is performed if necessary. lex is
a well-known and often-used lexical-analyser generator.
D. Langendoen, “Finite-state parsing of phrase-structure languages”, Linguistic
Inquiry, vol. 6, no. 4, p. 533-554, 1975. See same author [NatLang 1975].
Roman Krzemien´, Andrzej Łukasiewicz, “Automatic generation of lexical
analyzers in a compiler-compiler”, Inform. Process. Lett., vol. 4, no. 6, p. 165-
168, March 1976. A grammar is quasi-regular if it does not feature nested recursion;
consequently it generates a regular language. An algorithm is given that identifies all quasi-regular
subgrammars in a CF grammar, thus identifying the “lexical part” of the grammar.
Thomas J. Ostrand, Marvin C. Paull, Elaine J. Weyuker, “Parsing regular gram￾mars with finite lookahead”, Acta Inform., vol. 16, p. 125-138, 1981. Every regular
(Type 3) language can be recognized by a finite-state automaton without look-ahead, but such a device is
not sufficient to do parsing. For parsing, look-ahead is needed; if a regular grammar needs a look-ahead
of k tokens, it is called FL(k). FS grammars are either FL(k), FL(∞) or ambiguous; a decision algorithm
is described, which also determines the value of k, if appropriate.
A simple parsing algorithm is a FS automaton gouverned by a look-up table for each state, mapping
look-aheads to new states. A second algorithm avoids these large tables by constructing the relevant
look-ahead sets on the fly.
V.P. Heuring, “The automatic generation of fast lexical analysers”, Softw. Pract.
Exper., vol. 16, no. 9, p. 801-808, 1986. The lexical analyser is not based directly on a FS
300 Annotated bibliography [Ch. 13
automaton but has a number of built-in analysers for, e.g., identifier, integer, string, which can be
parametrized. The lexical analyser is about 6 times faster than UNIX lex.
Douglas W. Jones, “How (not) to code a finite-state machine”, ACM SIGPLAN
Notices, vol. 23, no. 8, p. 19-22, Aug 1988. Small, well-structured and efficient code can
be generated for a FS machine by deriving a single deterministic regular expression from the FS machine
and implementing this expression directly using while and repeat constructions.
Duane Szafron, Randy Ng, “LexAGen: an interactive incremental scanner gen￾erator”, Softw. Pract. Exper., vol. 20, no. 5, p. 459-483, May 1990. Extensive
description of an interactive generator for lexical analysers, in Smalltalk-80.
13.10 NATURAL LANGUAGE HANDLING
Hamish P. Dewar, Paul Bratley, James P. Thorne, “A program for the syntactic
analysis of English sentences”, Commun. ACM, vol. 12, no. 8, p. 476-479, 1969.
The authors argue that the English language can be described by a regular grammar: most rules are regu￾lar already and the others describe concatenations of regular sublanguages. The finite-state parser used
constructs the state subsets on the fly, to avoid large tables. Features (attributes) are used to check con￾sistency and to weed out the state subsets.
W.A. Woods, “Transition networks for natural languages”, Commun. ACM, vol.
13, no. 10, p. 591-606, Oct 1970. A recursive-descent parser guided by transition networks
rather than by grammar rules.
D. Langendoen, “Finite-state parsing of phrase-structure languages”, Linguistic
Inquiry, vol. 6, no. 4, p. 533-554, 1975. A subset of the CF grammars that produces regular
(FS) languages is analysed and an algorithm is given to produce a FS parser for any grammar belonging
to this subset. Much attention is paid to the linguistic applicability of such grammars. We advice the
reader of this paper to make a list of the abbreviations used in it, to assist in reading.
William A. Woods, “Cascaded ATN grammars”, Am. J. Comput. Linguist., vol. 6,
no. 1, p. 1-12, Jan-March 1980. The grammar (of a natural language) is decomposed into a
number of grammars, which are then cascaded, that is, the parser for grammar Gn obtains as input the
linearized parse tree produced by the parser for Gn −1. Each grammar can then represent a linguistic
hypothesis. An efficient implementation is given.
Daniel Chester, “A parsing algorithm that extends phrases”, Am. J. Comput.
Linguist., vol. 6, no. 2, p. 87-96, April-June 1980. A variant of a backtracking left-corner
parser is described that is particularly convenient for handling continuing phrases like: “the cat that
caught the rat that stole the cheese”.
Harry Tennant, Natural language processing, Petrocelli Books, Inc., Princeton,
N.J., p. 276, 1981. Easy-going introduction to natural language processing; covers syntax,
semantics, knowledge representation and dialog with many amusing examples. With glossary.
Philips J. Hayes, George V. Mouradian, “Flexible parsing”, Am. J. Comput.
Linguist., vol. 7, no. 4, p. 232-242, Oct-Dec 1981. A directional breadth-first bottom-up
parser yields some sets of partial parse trees for segments of the input text. Then several heuristics are
used to combine these into a “top-level hypothesis”. The purpose is to be able to parse fragmented or
ungrammatical natural language input.
Ursula Klenk, “Microcomputers in linguistic data processing: Context-free pars￾ing”, Microprocess. Microprogram., vol. 9, no. 5, p. 281-284, May 1982. Shows the
feasibility of the implementation of four general CF parsers on a very small (48 kbytes) PC: breadth-first
Sec. 13.10] Natural language handling 301
top-down, backtracking top-down, bottom-up and Earley’s algorithm.
K. Sparck Jones, Y. Wilks, Automatic natural language parsing, Ellis Horwood
Ltd., Chicester, p. 208, 1983. Eighteen short chapters on the application of parsing in NL
processing, using CF grammars, Augmented Transition Networks, transducers, Generalized Phrase
Structure Grammars and otherwise. Many literature references.
Margaret King (Ed.), Parsing Natural Language, Academic Press, London/New
York, p. 308, 1983. A compilation of twelve tutorials on aspects of parsing in a linguistic
setting. Very readable.
Stuart M. Shieber, “Direct parsing of ID/LP grammars”, Linguistics and Philoso￾phy, vol. 7, p. 135-154, 1984. In this very readable paper, the Earley parsing technique is
extended in a straightforward way to ID/LP grammars (Gazdar et al. [NatLang 1985]). Practical algo￾rithms are given.
Gerald Gazdar, Ewan Klein, Geoffrey Pullum, Ivan Sag, Generalized phrase
structure grammar, Basil Blackwell Publisher, Ltd., Oxford, UK, p. 276, 1985.
The phrase structure of natural languages is more easily and compactly described using Generalized
Phrase Structure Grammars (GPSGs) or Immediate Dominance/Linear Precedence grammars (ID/LP
grammars) than using conventional CF grammars. Theoretical foundations of these grammars are given
and the results are used extensively in linguistic syntactic theory. GPSGs are not to be confused with
general phrase structure grammars, aka Chomsky Type 0 grammars, which are called “unrestricted”
phrase structure grammars in this book.
The difference between GPSGs, ID/LP grammars and CF grammars is explained clearly. A GPSG is a
CF grammar, the non-terminals of which are not unstructured names but sets of features with their
values; such compound non-terminals are called categories. An example of a feature is NOUN, which can
have the values + or -; <NOUN,+> will be a constituent of the categories “noun phrase”, “noun”, “noun
subject”, etc.
ID/LP grammars differ from GPSGs in that the right-hand sides of production rules consist of multisets
of categories rather than of ordered sequences. Thus, production rules (Immediate Dominance rules)
define vertical order in the production tree only. Horizontal order in each node is restricted through (but
not necessarily completely defined by) Linear Precedence rules. Each LP rule is considered to apply to
every node; this is called the Exhaustive Constant Partial Ordering property.
Mary Dee Harris, Natural Language Processing, Reston Publ. Comp, Prentice
Hall, Reston, Virg., p. 368, 1985. A good and slow-paced introduction to natural language
processing, with a clear algorithmic view. Lexical analysis including look-up algorithms, phrase struc￾ture grammars (actually context-free) and semantic networks are explained and much attention is paid to
attaching semantics to the structures obtained.
Veronica Dahl, Patrick Saint-Dizier, Natural language understanding and logic
programming, Elsevier Science Publ., Amsterdam, p. 243, 1985. Seventeen papers on
the application of various grammar types to natural languages.
Glenn Blank, “A new kind of finite-state automaton: Register vector grammar”.
In Ninth International Conference on Artificial Intelligence, UCLA, p. 749-756,
Aug 1985. In FS grammars, emphasis is on the states: for each state it is specified which tokens
it accepts and to which new state each token leads. In Register-Vector grammars (RV grammars)
emphasis is on the tokens: for each token it is specified which state it maps onto which new state(s). The
mapping is done through a special kind of function, as follows. The state is a (global) vector (array) of
registers (features, attributes). Each register can be on or off. For each token there is a condition vector
with elements which can be on, off or mask (= ignore); if the condition matches the state, the token is
allowed. For each token there is a result vector with elements which can be on, off or mask (= copy); if
the token is applied, the result-vector elements specify how to construct the new state. ε-moves are incor￾porated by having tokens (called labels) which have ε for their representation. Termination has to be
302 Annotated bibliography [Ch. 13
programmed as a separate register.
RV grammars are claimed to be compact and efficient for describing the FS component of natural
languages. Examples are given. Embedding is handled by having a finite number of levels inside the
state.
Barbara J. Grosz, Karen Sparck Jones, Bonnie Lynn Webber, Readings in natural
language processing, Morgan Kaufmann Publishers, Inc., Los Altos, Ca. 94022, p.
664, 1986. Selected papers on NL processing, covering syntactic models, semantic
interpretation, discourse interpretation, language action and intention, NL generation and actual systems.
Walter Goshawke, Ian D.K. Kelly, J. David Wigg, Computer translation of
natural language, Sigma Press, Wilslow, UK, p. 275, 1987. The book consists of three
parts. 1) Overview of progress in Machine Translation. 2) Description of the intermediate code SLUNT
(Spoken Languages Universal Numeric Translation), a stylized numeric language-independent vehicle
for semantics. 3) The International Communicator System, a set of programs to manipulate SLUNT
structures.
Leonard Bolc (Ed.), Natural language parsing systems, Springer-Verlag, Berlin,
p. 367, 1987. A collection of recent papers on parsing in a natural language environment.
Among the subjects are Earley and CYK parsers, assigning probabilities to ambiguous parsings, error
recovery and, of course, attaching semantics to parsings.
Jonathan H. Reed, “An efficient context-free parsing algorithm based on register
vector grammars”. In Third Annual IEEE Conference on Expert Systems in
Government, p. 34-40, 1987. The principles of RV grammars (Blank [NatLang 1985]) are
applied to CF grammars by having a separate RV grammar for each syntactic category, each allowing the
names of syntactic categories as tokens. The Earley parsing algorithm is then adapted to handle these
grammars. Measurements indicate that the parser is 1 to 3 times faster on small grammars and 5 to 10
times on large grammars.
V. Dahl, P. Saint-Dizier, Natural language understanding and logic program￾ming, II, Elsevier Science Publ., Amsterdam, p. 345, 1988. Eighteen papers and two
panel sessions on programs for natural language understanding, mostly in Prolog.
Glenn D. Blank, “A finite and real-time processor for natural language”, Com￾mun. ACM, vol. 32, no. 10, p. 1174-1189, Oct 1989. Several aspects of the register￾vector grammars of Blank [NatLang 1985] are treated and extended: notation, center-embedding (3 lev￾els), non-determinism through boundary-backtracking, efficient implementation.
13.11 ERROR HANDLING
W.B. Smith, “Error detection in formal languages”, J. Comput. Syst. Sci., vol. 4,
p. 385-405, Oct 1970. A formal paper that examines properties of recognizers that determine
whether the number of substitution errors that has occurred is bounded by some function. Different
language classes and different levels of numbers of errors are examined. It appears that there is little
difference between languages under a constant maximum number of errors and under a constant max￾imum number of errors per block.
J.E. LaFrance, “Optimization of error-recovery in syntax-directed parsing algo￾rithms”, ACM SIGPLAN Notices, vol. 5, no. 12, p. 2-17, Dec 1970. Floyd productions
are divided into groups, and each production in a group is tried in order. If all productions of a group
fail, error recovery takes place, depending on the type(s) of the rules in the group. Apart from local
corrections, in some cases all possible productions are traced three symbols ahead. The result is com￾pared with the next four input symbols, using a set of twenty patterns, each pattern modeling a particular
kind of error. If this fails, a FOLLOW-set recovery technique is applied. The implications of
Sec. 13.11] Error handling 303
implementing this error recovery technique in a backtracking recursive descent parser are discussed.
A.V. Aho, T.G. Peterson, “A minimum-distance error-correcting parser for
context-free languages”, SIAM J. Computing, vol. 1, no. 4, p. 305-312, 1972. A CF
grammar is extended with error productions so that it will produce Σ*; this is effected by replacing each
occurrence of a terminal in a rule by a non-terminal that produces said terminal “with 0 errors” and any
amount of garbage, including ε, “with 1 or more errors”. The items in an Earley parser are extended with
a count, indicating how many errors were needed to create the item. An item with error count k is added
only if no similar item with a lower error count is present already.
C.J. Burgess, “Compile-time error diagnostics in syntax-directed compilers”,
Computer J., vol. 15, no. 4, p. 302-307, 1972. This paper attempts to define error
diagnostics formally by incorporating them as error productions in the grammar, and examines the extent
to which the positioning of these productions and messages in the grammar can be done automatically.
For left-factored grammars it appears to be easy.
E.G. James, D.P. Partridge, “Adaptive correction of program statements”, Com￾mun. ACM, vol. 16, no. 1, p. 27-37, Jan 1973. Discusses an error correction technique that
uses artificial intelligence and approximate pattern matching techniques, basing corrections on built-in
statistics, which are adapted continuously.
R.W. Conway, T.R. Wilcox, “Design and implementation of a diagnostic com￾piler for PL/I”, Commun. ACM, vol. 16, no. 3, p. 169-179, 1973. Describes a
diagnostic PL/C compiler, using a systematic method for finding places where repair is required, but the
repair strategy for each of these places is chosen by the implementor. The parser uses a separable transi￾tion diagram technique (see Conway [Misc 1963]). The error messages detail the error found and the
repair chosen.
G. Lyon, “Syntax-directed least-errors analysis for context-free languages: a prac￾tical approach”, Commun. ACM, vol. 17, no. 1, p. 3-14, Jan 1974. Discusses a least￾errors analyser, based on Earley’s parser without look-ahead. The Earley items are extended with an
error count, and the parser is started with items for the start of each rule, in each state set. Earley’s
scanner is extended as follows: for all items with the dot in front of a terminal, the item is added to the
same state set with an incremented error count and the dot after the terminal (this represents an insertion
of the terminal); if the terminal is not equal to the input symbol associated with the state set, add the item
to the next state set with an incremented error count and the dot after the terminal (this represents a
replacement); add the item as it is to the next state set, with an incremented error count (this represents a
deletion). The completer does its work as in the Earley parser, but also updates error counts. Items with
the lowest error counts are processed first, and when a state set contains an item, the same item is only
added if it has a lower error count.
R.A. Wagner, “Order-n correction for regular languages”, Commun. ACM, vol.
17, no. 5, p. 265-268, May 1974. Presents an O(n) algorithm which, given a string and a
finite-state automaton, can correct the string to an acceptable one with a minimum number of edit opera￾tions.
C. Ghezzi, “LL(1) grammars supporting an efficient error handling”, Inform. Pro￾cess. Lett., vol. 3, no. 6, p. 174-176, July 1975. Faced with an erroneous token in an
environment where empty productions can occur, a strong-LL(1) parser will often do some ε-moves
before reporting the error; this makes subsequent error recovery more difficult. This undesirable
behaviour can be avoided by splitting each rule into a number of copies, one for each set of tokens it may
be followed by. An efficient algorithm for this transformation on the grammar is supplied. The resulting
grammar is of type CRLL(1).
Susan L. Graham, Steven P. Rhodes, “Practical syntactic error recovery”, Com￾mun. ACM, vol. 18, no. 11, p. 639-650, Nov 1975. See Section 10.6.1 for a discussion of
304 Annotated bibliography [Ch. 13
this error recovery method.
J.-P. Lévy, “Automatic correction of syntax errors in programming languages”,
Acta Inform., vol. 4, p. 271-292, 1975. When a bottom-up parser encounters an error, part
of the stack is pushed back into the input stream (for instance, until a beacon token is on the top of the
stack). Starting from the new state now uncovered on the stack, all possible parsings of the input allow￾ing at most n errors are constructed, using breadth-first search and Lyon’s scheme [ErrHandl 1974], until
all parsers are in the same state or all parsers need to assume an n +1-st error. In the latter case the input
is rejected, otherwise one parse is chosen and parsing continues.
S. Feyock, P. Lazarus, “Syntax-directed correction of syntax errors”, Softw. Pract.
Exper., vol. 6, no. 2, p. 207-219, 1976. When an error is detected, the following error
correction strategy is applied:
1. A set of correction strings is generated (delete current symbol, insert symbol, replace symbol,
interchange with next symbol).
2. This set is filtered (correction syntactically and semantically acceptable?).
3. If there is more than one element left, use a heuristic to determine the "best" one. If only one is
left, this is the one. If none are left, back-up one input symbol, and go back to step 1.
David Gries, “Error recovery and correction”. In Compiler Construction, an
Advanced Course, Second Edition, F.L. Bauer & J. Eickel (eds.), Springer-Verlag,
New York, p. 627-638, 1976. Mostly an annotated bibliography containing some 35 entries,
not all on error handling.
J. Ciesinger, “Generating error recovery in a compiler generating system”. In
GI-4 Fachtagung über Programmiersprachen, H.-J. Schneider & M. Nagl (eds.),
Lecture Notes in Computer Science #34, Springer-Verlag, New York, p. 185-193,
1976. Proposes an error recovery method using pairs of elements of the alphabet, called “braces”,
which are used to select part of the input that contains the error and select a goal (non-terminal) to which
this part must be reduced. Some conditions are derived which must be fulfilled by the braces, and it is
shown that the braces can be computed automatically, at parser generation time.
K.S. Fu, “Error-correcting parsing for syntactic pattern recognition”. In Data
Structure, Computer Graphics and Pattern Recognition, A. Klinger et al. (eds.),
Academic Press, New York, p. 449-492, 1977. Discusses the least-errors analyser of Aho
and Peterson [ErrHandl 1972] in the context of stochastic grammars. Least-errors then becomes max￾imum likelihood. Many examples are given.
S.Y. Lu, K.S. Fu, “Stochastic error-correcting syntax analysis for recognition of
noisy patterns”, IEEE Trans. Comput., vol. 26, no. 12, p. 1268-1276, 1977. This
paper models deletion, insertion, and replacement errors into a stochastic disformation model: each error
has a probability associated with it. Then, the model is incorporated into the stochastic context-free
grammar, and an Earley parser is modified to look for the most likely error correction. This proves to be
inefficient, so a sequential classification algorithm (SCA) is used. This SCA uses a stopping rule that
tells when it has seen enough terminals to make a decision. The authors are interested in pattern recogni￾tion rather than in parse trees.
George Poonen, “Error recovery for LR(k) parsers”. In Inf. Process. 77, Bruce
Gilchrist (eds.), IFIP, North Holland Publ. Co., Amsterdam, p. 529-533, Aug
1977. A special token, ERRORMARK, is added to the grammar, to represent any incorrect stretch
of input. When encountering an error in an LR(1) parser, scan the stack for states having a shift on
ERRORMARK, collect all shift tokens of these states into an acceptable-set, skip the input until an
acceptable token is found and unstack until the corresponding accepting state is uncovered.
Jean E. Musinski, “Lookahead recall error recovery for LALR parsers”, ACM
SIGPLAN Notices, vol. 12, no. 10, p. 48-60, Oct 1977. Shows how the error recovery of
Sec. 13.11] Error handling 305
a specific LALR(1) parser can be improved by what amounts to the restricted decomposition of symbols
on the stack, to increase the acceptable set.
E.-W. Dieterich, “Parsing and syntactic error recovery for context-free grammars
by means of coarse structures”. In Automata, Languages and Programming, A.
Salomaa & M. Steinby (eds.), Lecture Notes in Computer Science #52, Springer￾Verlag, Berlin, p. 492-503, 1977. Proposes a two-level parsing process that separates the
coarse structures from the rest of the grammar. These coarse structures consist of characteristic brackets,
for instance begin and end. Error recovery can then also be applied to these two levels.
S. Sippu, E. Soisalon-Soininen, “On defining error recovery in context-free pars￾ing”. In Automata, Languages and Programming, A. Salomaa & M. Steinby
(eds.), Lecture Notes in Computer Science #52, Springer-Verlag, Berlin, p. 492-
503, 1977. Uses a grammatical transformation that leads to an LR grammar that incorporate
certain replacement, deletion, or insertion errors.
Charles Wetherell, “Why automatic error correctors fail”, Comput. Lang. (Elms￾ford, NY), vol. 2, p. 179-186, 1977. Shows that there is no hope of building efficient
automatic syntactic error correctors which can handle large classes of errors perfectly. The author argues
that parser writers should instead study the error patterns and work for efficient correction of common
errors. Language designers must concentrate on ways to make languages less susceptible to common
errors.
D.A. Turner, “Error diagnosis and recovery in one pass compilers”, Inform. Pro￾cess. Lett., vol. 6, p. 113-115, 1977. Proposes an extremely simple(minded) error recovery
method for recursive descent parsers: when an error occurs, the parser enters a recovering state. While in
this recovering state, error messages are inhibited. Apart from that, the parser proceeds until it requires a
definite symbol. Then, symbols are skipped until this symbol is found or the end of the input is reached.
Because this method can result in a lot of skipping, some fine-tuning can be applied.
Thomas J. Pennello, Frank DeRemer, “A forward move algorithm for LR error
recovery”. In Fifth Annual ACM Symposium on Principles of Programming
Languages, p. 241-254, Jan 1978. Refer to Graham and Rhodes [ErrHandl 1975].
Backward moves are found to be detrimental to error recovery. The extent of the forward move is deter￾mined as follows. At the error, an LALR(1) parser is started in a state including all possible items. The
thus extended automaton is run until it wants to reduce past the error detection point. The resulting right
context is used in error correction. An algorithm for the construction of a reasonably sized extended
LALR(1) table is given.
Kuo-Chung Tai, “Syntactic error correction in programming languages”, IEEE
Trans. Softw. Eng., vol. SE-4, no. 5, p. 414-425, 1978. Presents a technique for syntactic
error correction called pattern mapping. Patterns model the editing of the input string at the error detec￾tion point. These patterns are constructed by the parser developer. The patterns are sorted by a criterion
called the minimum distance correction with k correct look-ahead symbols, and whenever correction is
required, the first matching pattern is used. If no such pattern is found, error correction fails and another
error recovery method must be applied.
M. Dennis Mickunas, John A. Modry, “Automatic error recovery for LR
parsers”, Commun. ACM, vol. 21, no. 6, p. 459-465, June 1978. When an error is
encountered, a set of provisional parsings of the beginning of the rest of the input (so-called condensa￾tions) are constructed: for each state a parsing is attempted and those that survive according to certain
criteria are accepted. This yields a set of target states. Now the stack is “frayed” by partly or completely
undoing any reduces; this yields a set of source states. Attempts are made to connect a source state to a
target state by inserting or deleting tokens. Careful rules are given.
J. Lewi, K. de Vlaminck, J. Huens, M. Huybrechts, “The ELL(1) parser generator
306 Annotated bibliography [Ch. 13
and the error-recovery mechanism”, Acta Inform., vol. 10, p. 209-228, 1978.
Presents a detailed recursive descent parser generation scheme for ELL(1) grammars, and also presents
an error recovery method based on so-called synchronization triplets (a,b,A). a is a terminal from
FIRST(A), b is a terminal from LAST(A). The parser operates either in parsing mode or in error mode.
It starts in parsing mode, and proceeds until an error occurs. Then, in error mode, symbols are skipped
until either an end-marker b is found where a is the last encountered corresponding begin-marker, in
which case parsing mode resumes, or a begin-marker a is found, in which case A is invoked in parsing
mode. As soon as A is accepted, error-mode is resumed. The success of the method depends on careful
selection of synchronization triplets.
G. David Ripley, “A simple recovery-only procedure for simple precedence
parsers”, Commun. ACM, vol. 21, no. 11, p. 928-930, Nov 1978. When an error
(character-pair, reduction or stackability) is encountered, the error is reported and the contents of the
stack are replaced by the one error symbol ??, which has the relation <· to all other symbols. Then the
parser is restarted. Subsequent attempts to reduce across the error symbol just result in a reduction to the
error symbol; no semantic routine is called.
Joachim Ciesinger, “A bibliography of error-handling”, ACM SIGPLAN Notices,
vol. 14, no. 1, p. 16-26, Jan 1979. Around 90 literature references from 1963-1978.
C.N. Fischer, K.-C. Tai, D.R. Milton, “Immediate error correction in strong
LL(1) parsers”, Inform. Process. Lett., vol. 8, no. 5, p. 261-266, June 1979. A
strong-LL(1) parser will sometimes perform some incorrect parsing actions, connected with ε-matches,
when confronted with an erroneous input symbol, before signalling an error; this impedes subsequent
error correction. A subset of the LL(1) grammars is defined, the nullable LL(1) grammars, in which
rules can only produce ε directly, not indirectly. A special routine, called before an ε-match is done,
hunts down the stack to see if the input symbol will be matched or predicted by something deeper on the
stack; if not, an error is signalled immediately. An algorithm to convert any strong-LL(1) grammar into a
non-nullable strong-LL(1) grammar is given. (See also Mauney and Fischer [ErrHandl 1981]).
Susan L. Graham, Charles B. Haley, William N. Joy, “Practical LR error
recovery”, ACM SIGPLAN Notices, vol. 14, no. 8, p. 168-175, Aug 1979. A
considerable number of techniques is integrated. First-level error recovery does forward-move, restrict￾ing the possibilities to one correction only, using a cost function. The backward move is controlled by
error tokens in the grammar. The second level does panic mode error recovery using “beacon tokens”;
disaster is prevented by dividing the grammar into sections (like “declarations” or “statement”), which
the error recovery will not leave.
Ajit B. Pai, Richard B. Kieburtz, “Global context recovery: a new strategy for
syntactic error recovery by table-driven parsers”, ACM Trans. Prog. Lang. Syst.,
vol. 2, no. 1, p. 18-41, Jan 1980. A fiducial symbol is a terminal symbol that has the property
that if it occurs on the top of the stack of an LL(1) parser, it will to a large degree determine the rest of
the stack. Two more explicit definitions are given, the most practical being: a terminal symbol that
occurs only once in the grammar, in a rule for a non-terminal that occurs only once in the grammar, etc.
Now, if an error occurs that cannot be repaired locally, the input is discarded until a fiducial symbol z
appears. Then the stack is popped until z, or a non-terminal N that produces z, appears. In the latter case n
is “developed” until z appears. Parsing can now continue. If the stack gets empty in this process, the start
symbol is pushed anew; it will produce z.
The paper starts with a very readable introduction to error recovery and a good local error correction
algorithm.
T. Krawczyk, “Error correction by mutational grammars”, Inform. Process. Lett.,
vol. 11, no. 1, p. 9-15, 1980. Discusses an error correction method that automatically extends
a grammar by adding certain mutations of grammar rules, so that input with separator and parenthesis
errors can be corrected, while retaining the LR(k) grammar class. The parser delivers the parsing in the
form of a list of grammar rules used; the mutated rules in this list are replaced by their originals.
Sec. 13.11] Error handling 307
Steven Pemberton, “Comments on an error-recovery scheme by Hartmann”,
Softw. Pract. Exper., vol. 10, no. 3, p. 231-240, 1980. Error recovery in a recursive
descent parser is done by passing to each parsing routine a set of “acceptable” symbols. Upon encounter￾ing an error, the parsing routine will insert any directly required terminals and then skip input until an
acceptable symbol is found. Rules are given and refined on what should be in the acceptable set for cer￾tain constructs in the grammar.
Johannes Röhrich, “Methods for the automatic construction of error correcting
parsers”, Acta Inform., vol. 13, no. 2, p. 115-139, Feb 1980. See Section 10.7.3 for a
discussion of this error recovery method. The paper also discusses implementation of this method in
LL(k) and LR(k) parsers, using so-called deterministic continuable stack automata.
Seppo Sippu, Eljas Soisalon-Soininen, “A scheme for LR(k) parsing with error
recovery, Part I: LR(k) parsing/Part II: Error recovery/Part III: Error correction”,
Intern. J. Comput. Math., vol. A8, p. 27-42/107-119/189-206, 1980. A thorough
mathematical theory of non-deterministic and deterministic LR(k)-like parsers (which subsumes SLR(k)
and LALR(k)) is given. These parsers are then extended with error productions such that all errors that
are at least k tokens apart are corrected. It should be noted that the resulting parsers are almost certainly
non-deterministic.
C.N. Fischer, D.R. Milton, S.B. Quiring, “Efficient LL(1) error correction and
recovery using only insertions”, Acta Inform., vol. 13, no. 2, p. 141-154, 1980. See
Section 10.7.4 for a discussion of this error recovery method.
Kuo-Chung Tai, “Predictors of context-free grammars”, SIAM J. Computing, vol.
9, no. 3, p. 653-664, Aug 1980. Author’s abstract: "A predictor of a context-free grammar G
is a substring of a sentence in L(G) which determines unambiguously the contents of the parse stack
immediately before (in top-down parsing) or after (in bottom-up parsing) symbols of the predictor are
processed. Two types of predictors are defined, one for bottom-up parsers, one for top-down parsers.
Algorithms for finding predictors are given and the possible applications of predictors are discussed."
Predictors are a great help in error recovery.
C.N. Fischer, J. Mauney, “On the role of error productions in syntactic error
correction”, Comput. Lang. (Elmsford, NY), vol. 5, p. 131-139, 1980. Presents a
number of examples in a Pascal parser illustrating the use of error productions in cases where an
automatic error corrector would not find the right continuation. Error productions can be added to the
grammar regardless of the error corrector.
Jon Mauney, Charles N. Fischer, “An improvement to immediate error detection
in strong LL(1) parsers”, Inform. Process. Lett., vol. 12, no. 5, p. 211-212, 1981.
The technique of Fischer, Tai and Milton [ErrHandl 1979] is extended to all LL(1) grammars by having
the special routine which is called before an ε-match is done do conversion to non-nullable on the fly.
Linear time dependency is preserved by setting a flag when the test succeeds, clearing it when a symbol
is matched and by not performing the test if the flag is set: this way the test will be done at most once for
each symbol.
Stuart O. Anderson, Roland C. Backhouse, “Locally least-cost error recovery in
Earley’s algorithm”, ACM Trans. Prog. Lang. Syst., vol. 3, no. 3, p. 318-347, July
1981. Parsing and error recovery are unified so that error-free parsing is zero-cost error recovery.
The information already present in the Earley items is utilized cleverly to determine possible continua￾tions. From these and from the input, the locally least-cost error recovery can be calculated, albeit at
considerable expense. Detailed algorithms are given.
Rodney W. Topor, “A note on error recovery in recursive descent parsers”, ACM
SIGPLAN Notices, vol. 17, no. 2, p. 37-40, Feb 1982. Followset error recovery is
implemented in a recursive-descent parser by having one parse-and-error-recovery routine which is
308 Annotated bibliography [Ch. 13
passed the actual routine for a rule, its FIRST set and its FOLLOWS set. This reduces the size of the
parser considerably and prevents clerical errors in hand-written parsers. Also see subsequent letter by
C.B. Boyd, vol. 17, no. 8, p. 101-103.
Michael G. Burke, Gerald A. Fisher, “A practical method for syntactic error diag￾nosis and repair”, ACM SIGPLAN Notices, vol. 17, no. 6, p. 67-78, June 1982. See
Burke and Fisher [ErrHandl 1987].
Jon Mauney, Charles N. Fischer, “A forward-move algorithm for LL and LR
parsers”, ACM SIGPLAN Notices, vol. 17, no. 6, p. 79-87, June 1982. Upon finding
an error, a Graham, Harrison and Ruzzo general CF parser [CF 1980] is started to do a forward move
analysis using cost functions. The general CF parser is run over a restricted piece of the input, allowing
regional least-cost error correction.
F. Jalili, J.H. Gallier, “Building friendly parsers”. In 9th Annual ACM Symposium
on Principles of Programming Languages, ACM, New York, p. 196-206, 1982. An
interactive LALR(1) parser is described that uses forward move error recovery to better prompt the user
with possible corrections. The interactions of the interactive parsing and the forward move algorithm are
described in fairly great detail.
S.O. Anderson, R.C. Backhouse, “An alternative implementation of an insertion￾only recovery technique”, Acta Inform., vol. 18, p. 289-298, 1982. Argues that the
FMQ error corrector of Fischer, Milton and Quiring [ErrHandl 1980] does not have to compute a com￾plete insertion. It is sufficient to compute the first symbol. If w = w1w2 . . . wn
is an optimal insertion for
the error a following prefix u, then w2 . . . wn
is an optimal insertion for the error a following prefix uw1.
Also, immediate error detection is not necessary. Instead, the error corrector is called for every symbol,
and returns an empty insertion if the symbol is correct.
S.O. Anderson, R.C. Backhouse, E.H. Bugge, C.P. Stirling, “An assessment of
locally least-cost error recovery”, Computer J., vol. 26, no. 1, p. 15-24, 1983.
Locally least-cost error recovery consists of a mechanism for editing the next input symbol at least cost,
where the cost of each edit operation is determined by the parser developer. The method is compared to
Wirth’s followset method (see Stirling [ErrHandl 1985]) and compares favorably.
Seppo Sippu, Eljas Soisalon-Soininen, “A syntax-error-handling technique and its
experimental analysis”, ACM Trans. Prog. Lang. Syst., vol. 5, no. 4, p. 656-679,
Oct 1983. Phrase level error recovery replaces the top m elements from the stack and the next n
input tokens by a single non-terminal such that parsing can continue. The authors explore various search
sequences to determine the values of m and n. Local error recovery can be incorporated by introducing
for each terminal t a new production rule Term_t -> Empty t, and having a production rule Empty -> ε. This allows both the correction of a phrase (n=0,m=0) to Term_t (i.e. insertion of t) and of a
phrase (n,m) to Empty (i.e. deletion of (n,m)). Experimental results are given.
K. Hammond, V.J. Rayward-Smith, “A survey on syntactic error recovery and
repair”, Comput. Lang. (Elmsford, NY), vol. 9, no. 1, p. 51-68, 1984. Divides the
error recovery schemes into three classes:
1. local recovery schemes, such as “panic mode”, the followset method, the FMQ method (see
Fischer, Milton and Quiring [ErrHandl 1980]), LaFrance’s pattern matching method (see LaFrance
[ErrHandl 1970]), and Backhouse’s locally least-cost method (see Backhouse et al. [ErrHandl
1983]);
2. regional error recovery schemes, such as forward/backward move (see for instance Graham and
Rodhes [ErrHandl 1975]); and
3. global error recovery schemes, such as global minimum distance error recovery (see for instance
Aho and Peterson [ErrHandl 1972] and Lyon [ErrHandl 1974]), and mutational grammars (see for
instance Krawczyk [ErrHandl 1980]).
The paper summarizes the advantages and disadvantages of each method.
Sec. 13.11] Error handling 309
Michael Spenke, Heinz Mühlenbein, Monika Mevenkamp, Friedemann Mattern,
Christian Beilken, “A language-independent error recovery method for LL(1)
parsers”, Softw. Pract. Exper., vol. 14, no. 11, p. 1095-1107, Nov 1984. Presents an
error recovery method using deletions and insertions. The choice between different possible corrections
is made by comparing the cost of the insertion with the reliability of the symbol. A correction is plausible
if the reliability of the first non-skipped symbol is larger than the insert-cost of the insertion. The correc￾tion is selected among the plausible corrections, such that the fewest symbols are skipped. Reliability
and insert-cost of each symbol are tunable.
Colin P. Stirling, “Follow set error recovery”, Softw. Pract. Exper., vol. 15, no. 3,
p. 239-257, March 1985. Describes the followset technique for error recovery: at all times
there is a set of symbols that depends on the parse stack and that will not be skipped, called the followset.
When an error occurs, symbols are skipped until one is found that is a member of this set. Then, symbols
are inserted and/or the parser state is adapted until this symbol is legal. In fact there is a family of error
recovery (correction) methods that differ in the way the followset is determined. The paper compares
several of these methods.
Pyda Srisuresh, Michael J. Eager, “A portable syntactic error recovery scheme
for LR(1) parsers”. In Proc. 1985 ACM Comput. Sc. Conf., W.D. Dominick (eds.),
ACM, New Orleans, p. 390-399, March 1985. Presents a detailed account of the
implementation of an error recovery scheme that works at four levels, each one of a more global nature.
The first and the second level are local, attempting to recover from the error by editing the symbol in
front of the error detection point and the error symbol itself. The third level uses error tokens, and the
last level is panic mode.
Helmut Richter, “Noncorrecting syntax error recovery”, ACM Trans. Prog. Lang.
Syst., vol. 7, no. 3, p. 478-489, July 1985. See Section 10.8 for a discussion of this method.
The errors can be pinpointed better by parsing backwards from the error detection point, using a reverse
grammar until again an error is found. The actual error must be in the indicated interval. Bounded￾context grammars are conjectured to yield deterministic suffix-grammars.
Kwang-Moo Choe, Chun-Hyon Chang, “Efficient computation of the locally
least-cost insertion string for the LR error repair”, Inform. Process. Lett., vol. 23,
no. 6, p. 311-316, 1986. Refer to Anderson, Backhouse, Bugge and Stirling [ErrHandl 1983]
for locally least-cost error correction. The paper presents an efficient implementation in LR parsers,
using a formalism described by Park, Choe and Chang [LR 1985].
Tudor Ba˘la˘nescu, Serban Gavrila˘, Marian Gheorghe, Radu Nicolescu, Liviu
Sofonea, “On Hartman’s error recovery scheme”, ACM SIGPLAN Notices, vol.
21, no. 12, p. 80-86, Dec 1986. More and tighter acceptable-sets for more grammar
constructions; see Pemberton [ErrHandl 1980].
Michael G. Burke, Gerald A. Fisher, “A practical method for LL and LR syntac￾tic error diagnosis and recovery”, ACM Trans. Prog. Lang. Syst., vol. 9, no. 2, p.
164-197, April 1987. Traditional error recovery assumes that all tokens up to the error symbol
are correct. The article investigates the option of allowing earlier tokens to be modified. To this end,
parsing is done with two parsers, one of which is a number of tokens ahead of the other. The first parser
does no actions and keeps enough administration to be rolled back, and the second performs the semantic
actions; the first parser will modify the input stream or stack so that the second parser will never see an
error. This device is combined with three error repair strategies: single token recovery, scope recovery
and secondary recovery. In single token recovery, the parser is rolled back and single tokens are deleted,
inserted or replaced by tokens specified by the parser writer. In scope recovery, closers as specified by
the parser writer are inserted before the error symbol. In secondary recovery, sequences of tokens
around the error symbol are discarded. In each case, a recovery is accepted if it allows the parser to
advance a specified number of tokens beyond the error symbol. It is reported that this techniques
310 Annotated bibliography [Ch. 13
corrects three quarters of the normal errors in Pascal programs in the same way as a knowledgeable
human would. The effects of fine-tuning are discussed.
Jon Mauney, Charles N. Fischer, “Determining the extent of lookahead in syntac￾tic error repair”, ACM Trans. Prog. Lang. Syst., vol. 10, no. 3, p. 456-469, July
1988. A correction of an error can be validated by trying it and parsing on until a symbol is found
with the so-called Moderate Phrase Level Uniqueness. Once such a symbol is found, all minimal correc￾tions of the error are equivalent in the sense that after this MPLU symbol, the acceptable suffixes will be
identical. Measurements indicate that in Pascal the distance between two such symbols is fairly short,
for the most part.
Gordon V. Cormack, “An LR substring parser for noncorrecting syntax error
recovery”, ACM SIGPLAN Notices, vol. 24, no. 7, p. 161-169, July 1989. Presents a
method to produce an LR parser for the substrings of a language described by a bounded-context(1,1)
grammar, thereby confirming Richter’s [ErrHandl 1985] conjecture that this can be done for BC gram￾mars. The resulting parser is about twice as large as an ordinary LR parser.
13.12 TRANSFORMATIONS ON GRAMMARS
J.M. Foster, “A syntax-improving program”, Computer J., vol. 11, no. 1, p. 31-34,
May 1968. The parser generator SID (Syntax Improving Device) attempts to remove LL(1)
conflicts by eliminating left-recursion, and then left-factoring, combined with inline substitution. If this
succeeds, SID generates a parser in machine language.
Kenichi Taniguchi, Tadao Kasami, “Reduction of context-free grammars”,
Inform. Control, vol. 17, p. 92-108, 1970. Considers algorithms to reduce or minimize the
number of non-terminals in a grammar.
M.D. Mickunas, R.L. Lancaster, V.B. Schneider, “Transforming LR(k) grammars
to LR(1), SLR(1) and (1,1) bounded right-context grammars”, J. ACM, vol. 23,
no. 3, p. 511-533, July 1976. The required look-ahead of k tokens is reduced to k −1 by
incorporating the first token of the look-ahead into the non-terminal; this requires considerable care. The
process can be repeated until k =1 for all LR(k) grammars and even until k =0 for some grammars.
D.J. Rosenkrantz, H.B. Hunt, “Efficient algorithms for automatic construction
and compactification of parsing grammars”, ACM Trans. Prog. Lang. Syst., vol. 9,
no. 4, p. 543-566, Oct 1987. Many grammar types are defined by the absence of certain
conflicts: LL(1), LR(1), operator-precedence, etc. A simple algorithm is given to modify a given gram￾mar to avoid such conflicts. Modification is restricted to the merging of non-terminals and possibly the
merging of terminals; semantic ambiguity thus introduced will have to be cleared up by later inspection.
Proofs of correctness and applicability of the algorithm are given. The maximal merging of terminals
while avoiding conflicts is also used to reduce grammar size.
13.13 GENERAL BOOKS ON PARSING
Peter Zilany Ingerman, A Syntax-Oriented Translator, Academic Press, New
York, p. 132, 1966. Readable and realistic (for that time) advice for DIY compiler
construction, in archaic terminology. Uses a backtracking LC parser improved by FIRST sets.
William M. McKeeman, James J. Horning, David B. Wortman, A Compiler Gen￾erator, Prentice Hall, Englewood Cliffs, N.J., p. 527, 1970. Good explanation of
precedence and mixed-strategy parsing. Full application to the XPL compiler.
Alfred V. Aho, Jeffrey D. Ullman, The Theory of Parsing, Translation and
Sec. 13.13] General books on parsing 311
Compiling, Volume I: Parsing, Prentice Hall, Englewood Cliffs, N.J., p. 542,
1972. The book describes the parts of formal languages and automata theory relevant to parsing in
a strict mathematical fashion. Since much of the pertinent theory of parsing had already been developed
in 1972, the book is still reasonably up to date and is a veritable trove of definitions, theorems, lemmata
and proofs.
The required mathematical apparatus is first introduced, followed by a survey of compiler construction
and by properties of formal languages. The rest of the book confines itself to CF and regular languages.
General parsing methods are treated in full: backtracking top-down and bottom-up, CYK and Earley.
Directional non-backtracking methods are explained in detail, including general LL(k), LC(k) and LR(k),
precedence parsing and various other approaches. A last chapter treats several non-grammatical methods
for language specification and parsing.
Many practical matters concerning parser construction are treated in volume II, where the theoretical
aspects of practical parser construction are covered; recursive descent is not mentioned, though.
Frederick W. Weingarten, Translation of Computer Languages, Holden-Day, San
Francisco, Calif., p. 180, 1973. Describes some parsing techniques in an clear and easy style.
The coverage of subjects is rather eclectic. A full backtracking top-down parser for ε-free non-left￾recursive grammars and a full backtracking bottom-up parser for ε-free grammars are described. The
author does not explicitly forbid ε-rules, but his internal representation of grammar rules cannot represent
them. The Earley parser is described well, with an elaborate example. For linear-time parsers, bounded￾context and precedence are treated; a table-construction algorithm is given for precedence but not for
bounded-context. LR(k) is vaguely mentioned, LL(k) not at all. Good additional reading. Contains many
algorithms and flowcharts similar to Cohen and Gotlieb [Misc 1970].
R.C. Gonzales, M.G. Thomason, Syntactic Pattern Recognition, Addison-Wesley,
Reading, Mass., p. 283, 1978. This book provides numerous examples of syntactic
descriptions of objects not normally considered subject to a syntax. Examples range from simple seg￾mented closed curves, trees and shapes of letters, via bubble chamber events, electronic networks, and
structural formulas of rubber molecules to snow flakes, ECGs, and fingerprints. Special attention is paid
to grammars for non-linear objects, for instance web grammars, plex grammars and shape grammars. A
considerable amount of formal language theory is covered. All serious parsing is done using the CYK
algorithm; Earley, LL(k) and LR(k) are not mentioned. Operator-precedence, simple precedence and fin￾ite automata are occasionally used. The authors are wrong in claiming that an all-empty row in the CYK
recognition matrix signals an error in the input.
Interesting chapters about stochastic grammars, i.e. grammars with probabilities attached to the produc￾tion rules, and about grammatical inference, i.e. methods to derive a reasonable grammar that will pro￾duce all sentences in a representative set R+
and will not produce the sentences in a counterexample set
R−.
John E. Hopcroft, Jeffrey D. Ullman, Introduction to Automata Theory,
Languages, and Computation, Addison-Wesley, Reading, Massachussetts, p. 418,
1979. A must for readers interested in formal language theory and computational
(im)possibilities.
Roland C. Backhouse, Syntax of Programming Languages, Prentice Hall, Lon￾don, p. 290, 1979. Grammars are considered in depth, as far as they are relevant to
programming languages. FS automata and the parsing techniques LL and LR are treated in detail, and
supported by lots of well-explained math. Often complete and efficient algorithms are given in Pascal.
Much attention is paid to error recovery and repair, especially to least-cost repairs and locally optimal
repairs. Definitely recommended for further reading.
A.J.T. Davie, R. Morisson, Recursive Descent Compiling, Ellis Horwood Ltd.,
Chichester, p. 195, 1981. Well-balanced description of the design considerations that go into a
recursive descent compiler; uses the St. Andrews University S-algol compiler as a running example.
V.J. Rayward-Smith, A First Course in Formal Languages, Blackwell Scientific,
312 Annotated bibliography [Ch. 13
Oxford, p. 123, 1983. Very useful intermediate between Révész [Books 1985] and Hopcroft
and Ullman [Books 1979]. Quite readable (the subject permitting); simple examples; broad coverage. No
treatment of LALR, no bibliography.
György E. Révész, Introduction to Formal Languages, McGraw-Hill, Singapore,
p. 199, 1985. This nifty little book contains many results and elementary proofs of formal
languages, without being “difficult”. It gives a description of the ins and outs of the Chomsky hierarchy,
automata, decidability and complexity of context-free language recognition, including the hardest CF
language. Parsing is discussed, with descriptions of the Earley, LL(k) and LR(k) algorithms, each in a
few pages.
William A. Barrett, Rodney M. Bates, David A. Gustafson, John D. Couch, Compiler Construction: Theory and Practice, Science Research Associates, Chicago,
p. 504, 1986. A considerable part (about 50%) of the book is concerned with parsing; formal
language theory, finite-state automata, top-down en bottom-up parsing and error recovery are covered in
very readable chapters. Only those theorems are treated that relate directly to actual parsing; proofs are
quite understandable. The book ends with an annotated bibliography of almost 200 entries, on parsing
and other aspects of compiler construction.
A.V. Aho, R. Sethi, J.D. Ullman, Compilers: Principles, Techniques and Tools,
Addison-Wesley, Reading, Mass., p. 796, 1986. The “Red Dragon Book”. Excellent,
UNIX-oriented treatment of compiler construction. Even treatment of the various aspects.
Anton Nijholt, Computers and Languages: Theory and Practice, Studies in Computer Science and Artificial Intelligence, 4, North-Holland, Amsterdam, p. 482,
1988. Treats in narrative form computers, natural and computer languages, and artificial
intelligence, their essentials, history and interrelationships; for the sophisticated layperson. The account
is interspersed with highly critical assessments of the influence of the military on computers and artificial
intelligence. Much global information, little technical detail; treats parsing in breadth but not in depth.
13.14 SOME BOOKS ON COMPUTER SCIENCE
David Harel, Algorithms: The Spirit of Computing, Addison-Wesley, Reading,
Mass, p. 425, 1987. Excellent introduction to the fundamentals of computer science for the
sophisticated reader.
Robert Sedgewick, Algorithms, Addison-Wesley, Reading, Mass., p. 657, 1988.
Comprehensive, understandable treatment of many algorithms, beautifully done.
Jeffrey D. Smith, Design and Analysis of Algorithms, PWS-Kent Publ. Comp.,
Boston, p. 447, 1989. Good introductory book, treating list handling, searching, breadth-first
and depth-first search, dynamic programming, etc., etc.`

export default AnnotatedBibliography