import MarkdownTransfer from '../../components/MarkdownTransfer'
const RegularGrammarsAndfiniteStateAutomata = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

const content = `Regular grammars are the simplest form of grammars that still have generative power.
They can describe concatenation (joining two texts together) and repetition and can
specify alternatives, but they cannot express nesting. Regular grammars are probably
the best-understood part of formal linguistics and almost all questions about them can
be answered.
5.1 APPLICATIONS OF REGULAR GRAMMARS
In spite of their simplicity there are many applications of regular grammars, of which
we will briefly mention the most important ones.
5.1.1 CF parsing
In some parsers for CF grammars, a subparser can be discerned that handles a regular
grammar; such a subparser is based implicitly or explicitly on the following surprising
phenomenon. Consider the sentential forms in left-most or right-most derivations.
Such a sentential form consists of a closed (finished) part, which contains terminal
symbols only and an open (unfinished) part which contains non-terminals as well. In
left-most derivations, the open part starts at the left-most non-terminal and extends to
the right, in right-most derivations, the open part starts at the right-most non-terminal
and extends to the left; see Figure 5.1 which uses sentential forms from Section 2.5.2.
d , N & N N , N & h
Figure 5.1 Open parts in left-most and right-most productions
Now it can be proved (and it is not difficult to show) that these open parts can be
described by a regular grammar (which follows from the CF grammar). Furthermore,
these open parts of the sentential form play an important role in some CF parsing
methods which explains the significance of regular grammars for CF parsing.
Sec. 5.1] Applications of regular grammars 107
5.1.2 Systems with finite memory
Since CF (or stronger) grammars allow nesting and since nesting can, in principle, be
arbitrarily deep, the generation of correct CF (or stronger) sentences may, in principle,
require an arbitrary amount of memory to temporarily hold the unprocessed nesting
information. Mechanical systems do not possess an arbitrary amount of memory and
consequently cannot exhibit CF behaviour and are restricted to regular behaviour. This
is immediately clear for simple mechanical systems like vending machines, traffic
lights and video-recorders: they all behave according to a regular grammar. It is also in
principle true for more complicated mechanical systems, like a country’s train system
or a computer. Here, the argument gets, however, rather vacuous since nesting infor￾mation can be represented very efficiently and a little memory can take care of a lot of
nesting. Consequently, although these systems in principle exhibit regular behaviour, it
is often easier to describe them with CF or stronger means, even though that would
incorrectly ascribe infinite memory to them.
Conversely, the global behaviour of many systems that do have much memory can
still be described by a regular grammar, and many CF grammars are already for a large
part regular. This is because regular grammars already take adequate care of concatena￾tion, repetition and choice; context-freeness is only required for nesting. If we apply a
rule that produces a regular (sub)language (and which consequently could be replaced
by a regular rule) “quasi-regular”, we can observe the following. If all alternatives of a
rule contain terminals only, that rule is quasi-regular (choice). If all alternatives of a
rule contain only terminals and non-terminals the rules of which are quasi-regular and
non-recursive, then that rule is quasi-regular (concatenation). And if a rule is recursive
but recursion occurs only at the end of an alternative and involves only quasi-regular
rules, then that rule is again quasi-regular (repetition). This often covers large parts of a
CF grammar. See Krzemien´ and Łukasiewicz [FS 1976] for an algorithm to identify all
quasi-regular rules in a grammar.
Natural languages are a case in point. Although CF or stronger grammars seem
necessary to delineate the set of correct sentences (and they may very well be, to catch
many subtleties), quite a good rough description can be obtained through regular
languages. Consider the stylized grammar for the main clause in an Subject-Verb￾Object (SVO) language in Figure 5.2.
MainClause -> Subject Verb Object Subject -> [ a | the ] Adjective* Noun Object -> [ a | the ] Adjective* Noun Verb -> verb1 | verb2 | ... Adjective -> adj1 | adj2 | ... Noun -> noun1 | noun2 | ...
Figure 5.2 A not obviously quasi-regular grammar
This grammar is quasi-regular: Verb, Adjective and Noun are regular by themselves,
Subject and Object are concatenations of repetitions of regular forms (regular non￾terminals and choices) and are therefore quasi-regular, and so is MainClause. It takes
some work to bring this grammar into standard regular form, but it can be done, as
shown in Figure 5.3, in which the lists for verbs, adjectives and nouns have been abbre￾viated to verb, adjective and noun, to save space. Even (finite) context-
108 Regular grammars and finite-state automata [Ch. 5 MainClause -> a SubjAdjNoun_verb_Object MainClause -> the SubjAdjNoun_verb_Object SubjAdjNoun_verb_Object -> noun verb_Object SubjAdjNoun_verb_Object -> adjective SubjAdjNoun_verb_Object verb_Object -> verb Object Object -> a ObjAdjNoun Object -> the ObjAdjNoun ObjAdjNoun -> noun ObjAdjNoun -> adjective ObjAdjNoun verb -> verb1 | verb2 | ... adjective -> adj1 | adj2 | ... noun -> noun1 | noun2 | ...
Figure 5.3 A regular grammar in standard form for that of Figure 5.2
dependency can be incorporated: for languages that require the verb to agree in number
with the subject, we duplicate the first rule:
MainClause -> SubjectSingular VerbSingular Object | SubjectPlural VerbPlural Object
and duplicate the rest of the grammar accordingly. The result is still regular. Nested
subordinate clauses may seem a problem, but in practical usage the depth of nesting is
severely limited. In English, a sentence containing a subclause containing a subclause
containing a subclause will baffle the reader, and even in German and Dutch nestings
over say five deep are frowned upon. We replicate the grammar the desired number of
times and remove the possibility of further recursion from the deepest level. Then the
deepest level is regular, which makes the other levels regular in turn. The resulting
grammar will be huge but regular and will be able to profit from all simple and effi￾cient techniques known for regular grammars. The required duplications and modifica￾tions are mechanical and can be done by a program. Dewar, Bratley and Thorne
[NatLang 1969] describe an early example of this approach, Blank [NatLang 1989] a
recent one.
5.1.3 Pattern searching
Many linear patterns, especially text patterns, have a structure that is easily expressed
by a (quasi-)regular grammar. Notations that indicate amounts of money in various
currencies, for instance, have the structure given by the grammar of Figure 5.4, where
has been used to indicate a space symbol. Examples are $ 19.95 and ¥ 1600. Such
notations, however, do not occur in isolation but are usually embedded in long stretches
of text that itself does not conform to the grammar of Figure 5.4. To isolate the nota￾tions, a recognizer (rather than a parser) is derived from the grammar that will accept
arbitrary text and will indicate where sequences of symbols are found that conform to
Sec. 5.1] Applications of regular grammars 109
AmountS -> CurrencySymbol Space* Digit+ Cents? CurrencySymbol -> ƒ | $ | ¥ | £ | ... Space -> Digit -> [0123456789] Cents -> . Digit Digit | .--
Figure 5.4 A quasi-regular grammar for currency notations
the grammar. Parsing (or an other form of analysis) is deferred to a later stage. A tech￾nique for constructing such a recognizer is given in Section 5.3.4.
5.2 PRODUCING FROM A REGULAR GRAMMAR
When producing from a regular grammar, the producer needs to remember only one
thing: which non-terminal is next. We shall illustrate this and further concepts using the
simple regular grammar of Figure 5.5.
SS -> a A S -> a B A -> b B A -> b C B -> c A B -> c C C -> a
Figure 5.5 Sample regular grammar
This grammar produces sentences consisting of an a followed by an alternating
sequence of b’s and c’s followed by a terminating a. For the moment we shall restrict
ourselves to regular grammars in standard notation; further on we shall extend our
methods to more convenient forms.
The one non-terminal the producer remembers is called its state and the producer
is said to be in that state. When a producer is in a given state, for instance, A, it chooses
one of the rules belonging to that state, for instance, A->bC, produces the b and moves
to state C. Such a move is called a state transition. It is customary to represent the
states and the possible transitions of a producer in a transition diagram, Figure 5.6,
where the above state transition is represented by the arc marked b from A to C. S AB C ◊ aa bc a c b
Figure 5.6 Transition diagram for the regular grammar of Figure 5.5
110 Regular grammars and finite-state automata [Ch. 5 S is the initial state and the accepting state is marked ◊; another convention (not used
here) is to draw an accepting state as a double circle. The symbols on the arcs are those
produced by the corresponding move. The producer stops when it is in an accepting
state. Like the non-deterministic automaton we saw in Section 3.4, the producer is an
automaton, a finite non-deterministic automaton, or finite-state automaton, to be exact.
“Finite” because it can only be in a finite number of states (5 in this case; 3 bits of
internal memory would suffice) and “non-deterministic” because, for instance, in state
S it has more than one way to produce an a.
5.3 PARSING WITH A REGULAR GRAMMAR
The above automaton for producing a sentence can in principle also be used for pars￾ing. If we have a sentence, for instance, abcba, and want to check and parse it, we can
view the above transition diagram as a maze and the (tokens in the) sentence as a guide.
If we manage to follow a path through the maze, matching symbols from our sentence
to those on the walls of the corridors as we go and end up in ◊ exactly at the end of the
sentence, we have checked the sentence and the names of the rooms we have visited
form the backbone of the parse tree. See Figure 5.7, where the path is shown as a dotted
line.
S AB C ◊ aa bc a c b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ................ ................ S a A b B c A b C a ◊
Figure 5.7 Actual and linearized passage through the maze
Now this is easier said than done. How did we know, for instance, to turn left in room S
rather than right? Of course we could employ general maze-solving techniques (and
they would give us our answer in exponential time) but a much simpler and much more
efficient answer is available here: we split ourselves in two and head both ways. After
the first a of abcba we are in the set of rooms {A, B}. Now we have a b to follow;
from B there are no exits marked b but from A there are two, which lead to B and C. So
we are now in rooms {B, C}. Our path is now more difficult to depict but still easy to
linearize, as shown in Figure 5.8. We can find the parsing by starting at the end and
following the pointers backwards: ◊ <- C <- A <- B <- A <- S. If the grammar
is ambiguous the backward pointers may bring us to a fork in the road: an ambiguity
has been found and both paths have to be followed separately to find both parsings.
With regular grammars, however, one is often not interested in the parse, but only in
the recognition: the fact that the input is correct and it ends here suffices.
Sec. 5.3] Parsing with a regular grammar 111
S AB BC AC BC ◊ a b c b a
Figure 5.8 Linearized set-based passage through the maze
5.3.1 Replacing sets by states
Although the process described above is linear in the length of the input (each next
token takes an amount of work that is not dependent on the length of the input), still a
lot of work has to be done for each token. What is worse, the grammar has to be con￾sulted repeatedly and so we expect the speed of the process to depend adversely on the
size of the grammar. Fortunately there is a surprising and fundamental improvement
possible: from the NFA in Figure 5.6 we construct a new automaton with a new set of
states, where each new state is equivalent to a set of old states. Where the original
(non-deterministic) automaton was in doubt after the first a, a situation we represented
as {A, B}, the new automaton firmly knows that after the first a it is in state AB.
The states of the new automaton can be constructed systematically as follows. We
start with the initial state of the old automaton, which is also the initial state of the new
one. For each new state we create, we examine its contents in terms of the old states,
and for each token in the language we determine to which set of old states the given set
leads. These sets of old states are then considered states of the new automaton. If we
create the same state a second time, we do not analyse it again. This process is called
the subset construction and results initially in a (deterministic) state tree. The state tree
for the grammar of Figure 5.5 is depicted in Figure 5.9. To stress that it systematically
checks all new states for all symbols, outgoing arcs leading nowhere are also shown.
Newly generated states that have already been generated before are marked with a ✔. S AB BC AC ◊AC ◊ BC ✔✔ ✔ abc a b c ab a c bc
Figure 5.9 Deterministic state tree for the grammar of Figure 5.5
The state tree of Figure 5.9 is turned into a transition diagram by leading the
arrows to states marked ✔ to their first-time representatives and removing the dead
ends. The new automaton is shown in Figure 5.10. When we now use the sentence
abcba as a guide for traversing this transition diagram, we find that we are never in
doubt and that we safely arrive at the accepting state. All outgoing arcs from a state
112 Regular grammars and finite-state automata [Ch. 5 S AB BCAC ◊ a bc aa b c
Figure 5.10 Deterministic automaton for the grammar of Figure 5.5
bear different symbols, so when following a list of symbols, we are always pointed to
at most one direction. If in a given state there is no outgoing arc for a given symbol,
then that symbol may not occur in that position. If it is, the input is in error.
There are two things to be noted here. The first is that we see that most of the pos￾sible states of the new automaton do not actually materialize: the old automaton had 5
states, so there were 25=32 possible states for the new automaton while in fact it has
only 5; states like SB or ABC do not occur. This is usual; although there are non￾deterministic finite-state automata with n states that turn into a DFA with 2n
states,
these are rare and have to be constructed on purpose. The average garden variety NFA
with n states typically results in a DFA with less than or around 10*n states.
The second is that consulting the grammar is no longer required; the state of the
automaton together with the input token fully determine the next state. To allow effi￾cient look-up the next state can be stored in a table indexed by the old state and the
input token. The table for our DFA is given in Figure 5.11.
input symbol ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ a b c ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ S AB AB BC AC
old state ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ AC ◊ BC ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ BC ◊ AC
Figure 5.11 Transition table for the automaton of Figure 5.10
Using such a table, an input string can be checked at the expense of only a few machine
instructions per token. For the average DFA, most of the entries in the table are empty
(cannot be reached by correct input and refer to error states). Since the table can be of
considerable size (300 states times 100 tokens is normal), several techniques exist to
exploit the empty space by compressing the table. Dencker, Dürre and Heuft [Misc
1984] give a survey of some techniques.
The parse tree obtained looks as follows:
S a AB b BC c AC b BC a ◊
Sec. 5.3] Parsing with a regular grammar 113
which is not the original parse tree. If the automaton is used only to recognize the input
string this is no drawback; if the parse tree is required, it can be reconstructed in the
following fairly obvious bottom-up way. Starting from the last state ◊ and the last token
a, we conclude that the last right-hand side (the “handle” in bottom-up parsing) was a.
Since the state was BC, a combination of B and C, we look through the rules for B and C.
We find that a derived from C->a, which narrows down BC to C. The right-most b and
the C combine into the handle bC which in the set {A, C} must derive from A. Working
our way backwards we find the parsing:
S a ABA . . . . . . . . b BCB . . . . . . . . c ACA . . . . . . . . b BCC . . . . . . . . a ◊
This method again requires the grammar to be consulted repeatedly; moreover, the way
back will not always be so straight as in the above example and we will have problems
with ambiguous grammars. Efficient full parsing of regular grammars has received
relatively little attention; substantial information can be found in Ostrand, Paull and
Weyuker [FS 1981].
5.3.2 Non-standard notation
A regular grammar in standard form can only have rules of the form A →a and A →aB.
We shall now first extend our notation with two other types of rules, A →B and A →ε,
and show how to construct NFA’s and DFA’s for them. We shall then turn to regular
expressions and rules that have regular expressions as right-hand sides (for instance,
P→a*
bQ) and show how to convert them into rules in the extended notation.
The grammar in Figure 5.12 contains examples of both new types of rules; Figure
5.13 presents the usual trio of NFA, state tree and DFA for this grammar. First consider
the NFA. When we are in state S we see the expected transition to state B on the token
a, resulting in the standard rule S->aB. The non-standard rule S->A indicates that we
can get from state S to state A without reading (or producing) a symbol; we then say
that we read the zero-length string ε and that we make an ε-transition (or ε-move). The
rule A->aA creates a transition from A to A marked a and B->bB does something simi￾lar. The standard rule B->b creates a transition marked b to the accepting state, and the
non-standard rule A->ε creates an ε-transition to the accepting state. ε-transitions
should not be confused with ε-rules: unit rules create ε-transitions to non-accepting
states and ε-rules create ε-transitions to accepting states.
SS -> A S -> a B A -> a A A -> ε B -> b B B -> b
Figure 5.12 Sample regular grammar with ε-rules
114 Regular grammars and finite-state automata [Ch. 5 S AB ◊ εa εb ab
(a)
SA◊ AB◊ A◊B◊ A◊B◊ ✔✔ ab ab abab
(b)
SA◊ AB◊ A◊B◊ a ab a
(c) b
Figure 5.13 NFA (a), state tree (b) and DFA (c) for the grammar of Figure 5.12
Now that we have constructed an NFA with ε-moves, the question arises how we
can process the ε-moves to obtain a DFA. To answer this question we use the same rea￾soning as before; in Figure 5.6, after having seen an a we did not know if we were in
state A or state B and we represented that as {A, B}. Here, when we enter state S, even
before having processed a single symbol, we already do not know if we are in states S, A or ◊, since the latter two are reachable from S through ε-moves. So the initial state of
the DFA is already compound: SA◊. We now have to consider where this state leads to
for the symbols a and b. If we are in S then a will bring us to B and if we are in A, a
will bring us to A. So the new state includes A and B, and since ◊ is reachable from A
through ε-moves, it also includes ◊ and its name is AB◊. Continuing in this vein we can
construct the complete state tree (Figure 5.13(b)) and collapse it into a DFA (c). Note
that all states of the DFA contain the NFA state ◊, so the input may end in all of them.
The set of NFA states reachable from a given state through ε-moves is called the
ε-closure of that state. The ε-closure of, for instance, S is {S, A, ◊}.
5.3.3 DFA’s from regular expressions
As mentioned in Section 2.3.3, regular languages are often specified by regular expres￾sions rather than by regular grammars. Examples of regular expressions are [0- 9]+(.[0-9]+)? which should be read as “one or more symbols from the set 0 through
9, possibly followed by a dot which must then be followed by one or more symbols
from 0 through 9” (and which represents numbers with possibly a dot in them) and
(ab)*(p|q)+, which should be read as “zero or more strings ab followed by one or
more p’s or q’s” (and which is not directly meaningful). The usual forms occurring in
regular expressions are recalled in the table in Figure 5.14; some systems provide more
possibilities, some provide fewer. In computer input, no difference is generally made
Sec. 5.3] Parsing with a regular grammar 115
Form Meaning Name
R1R2 R1
followed by R2 concatenation
R1 | R2 R1 or R2 alternative
R*
zero or more R’s optional sequence (Kleene star)
R +
one or more R’s (proper) sequence
R?
zero or one R optional
(R) R nesting
[abc . . . ] any symbol from the set abc . . . a the symbol a itself
Figure 5.14 Some usual elements of regular expressions
between the metasymbol *
and the symbol *, etc. Special notations will be necessary if
the language to be described contains any of the symbols | * + ? ( ) [ or ].
Rule pattern replaced by:
P→a (standard)
P→aQ (standard)
P→Q (extended standard)
P→ε (extended standard)
P→a . . . P→aT
T→ . . . P→(R1 | R2 | . . . ) . . . P→R1 . . . P→R2 . . . . . . P→(R) . . . P→R . . . P→R* . . . P→T T→RT
T→ . . . P→R + . . . P→RT
T→RT
T→ . . . P→R? . . . P→R . . . P→ . . . P→[abc . . . ] . . . P→(a | b | c | . . . ) . . .
Figure 5.15 Transformations on regular grammars
A regular expression can be converted into a regular grammar by using the
transformations given in Figure 5.15; this regular grammar can then be used to produce
a DFA as described above. There is also a method to create an NFA directly from the
regular expression, which requires, however, some preprocessing on the regular expres￾sion; see Thompson [FS 1968].
We shall illustrate the method using the expression (ab)*(p|q)+. Our method
116 Regular grammars and finite-state automata [Ch. 5
will also work for regular grammars that contain regular expressions (like A→ab*
cB)
and we shall in fact immediately turn our regular expression into such a grammar:
SS -> (ab)*(p|q)+
The T in the transformations stands for an intermediate non-terminal, to be chosen
fresh for each application of a transformation; we use A, B, C . . .
in the example since
that is less confusing than T1, T2, T3, . . . . The transformations are to be applied until
all rules are in (extended) standard form.
The first transformation that applies is P→R* . . . , which replaces
SS->(ab)*(p|q)+
by
SS -> A ✔ A -> (ab) A A -> (p|q)+
The first rule is already in the desired form and has been marked ✔. The transforma￾tions P→(R) . . . and P→a . . . work on A->(ab)A and result in
A -> a B ✔ B -> b A ✔
Now the transformation P →R + . . . must be applied to A->(p|q)+, yielding
A -> (p|q) C C -> (p|q) C C -> ε ✔
The ε originated from the fact that (p|q)+
in A->(p|q)+
is not followed by anything
(of which ε is a faithful representation). Now A->(p|q)C and C->(p|q)C are easily
decomposed into
A -> p C ✔ A -> q C ✔ C -> p C ✔ C -> q C ✔
The complete extended-standard version can be found in Figure 5.16; an NFA and
DFA can now be derived using the methods of Section 5.3.1 (not shown).
5.3.4 Fast text search using finite-state automata
Suppose we are looking for the occurrence of a short piece of text, for instance, a word
or a name (the “search string”) in a large piece of text, for instance, a dictionary or an
encyclopedia. One naive way of finding a search string of length n in a text would be to
try to match it to the characters 1 to n; if that fails, shift the pattern one position and try
to match against characters 2 to n +1, etc., until we find the search string or reach the
end of the text. (Dictionaries and encyclopedias may be organized better, but a file con￾taining a million business letters almost certainly would not.)
Sec. 5.3] Parsing with a regular grammar 117
SS -> A A -> a B B -> b A A -> p C A -> q C C -> p C C -> q C C -> ε
Figure 5.16 Extended-standard regular grammar for (ab)*(p|q)+
Finite automata offer a much more efficient way to do text search. We derive a
DFA from the string, let it run down the text and when it reaches an accepting state, it
has found the string. Assume for example that the search string is ababc and that the
text will contain only a’s, b’s and c’s. The NFA that searches for this string is shown
in Figure 5.17(a); it was derived as follows. At each character in the text there are two
possibilities: either the search string starts there, which is represented by the chain of
states going to the right, or it does not start there, in which case we have to skip the
present character and return to the initial state. The automaton is non-deterministic,
since when we see an a in state A, we have two options: to believe that it is the start of
an occurrence of ababc or not to believe it.
A B C D E ◊ a b a b c abc
(a)
A ABAA abc ✔✔ ABACA abc ✔✔ ABDAA abc ✔✔ AB ACEA abc ✔✔ ABDAA◊ abc ✔✔ ABAA abc ✔✔✔
(b)
A a AB b AC a ABD b ACE c A◊ bc c bc c b bc a a a a
(c)
Figure 5.17 NFA (a), state tree (b) and DFA (c) to search for ababc
118 Regular grammars and finite-state automata [Ch. 5
Using the traditional techniques, this NFA can be used to produce a state tree (b)
and then a DFA (c). Figure 5.18 shows the states the DFA goes through when fed the
text aabababca. A AB AB AC ABD ACE ABD ACE A◊ AB a a b a b a b c a
Figure 5.18 State transitions of the DFA of Figure 5.17(c) on aabababca
This application of finite-state automata is known as the Aho and Corasick bibliographic search algorithm [FS 1975]. Like any DFA, it requires only a few machine
instructions per character. As an additional bonus it will search for several strings for
the price of one. The DFA corresponding to the NFA of Figure 5.19 will search simultaneously for Kawabata, Mishima and Tanizaki; note that three different accepting
states result, ◊K, ◊M
and ◊T. AK BK CK DK EK FK GK HK ◊K k a w a b a t a Σ AM BM CM DM EM FM GM ◊M m i s h i m a AT BT CT DT ET FT GT HT ◊T t a n i z a k i εεε
Figure 5.19 Example of an NDA for searching multiple strings
The Aho and Corasick algorithm is not the last word in string search; it faces stiff
competition from the Rabin-Karp algorithm†
and the Boyer-Moore algorithm‡
neither
of which will be treated here, since they are based on different principles.
 ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ ✁ 
† R.M. Karp, M.O. Rabin, “Efficient randomized pattern matching algorithms”, Technical Report TR-31-81, Harvard Univ., Cambridge, Mass., 1981. We want to find a string S of length l
in a text T. First we choose a hash function H that assigns a large integer to any string of length l
and calculate H (S) and H (T[1..l]). If they are equal, we compare S and T[1..l]. If either fails
we calculate H (T[2..l +1]) and repeat the process. The trick is to choose H so that
H (T[p +1..p +l]) can be calculated cheaply from H (T[p..p +l −1]). See also Sedgewick
[CSBooks 1988], page 289.
‡ Robert S. Boyer, J. Strother Moore, “A fast string searching algorithm”, Commun. ACM, vol.
20, no. 10, p. 762-772, Oct 1977. We want to find a string S of length l in a text T and start by
positioning S [1] at T[1]. Now suppose that T[l] does not occur in S; then we can shift S to
T[l +1] without missing a match, and thus increase the speed of the search process. This principle can be extended to blocks of more characters. See also Sedgewick [CSBooks 1988], page
286.`

export default RegularGrammarsAndfiniteStateAutomata