import MarkdownTransfer from '../../components/MarkdownTransfer'

const content = `In this chapter, we will discuss top-down parsing methods that try to rederive the input
sentence by prediction. As explained in Section 3.3.1, we start with the start symbol
and try to produce the input from it. At any point in time, we have a sentential form
that represents our prediction of the rest of the input sentence:
rest of input
prediction
This sentential form consists of both terminals and non-terminals. If a terminal symbol
is in front, we match it with the current input symbol. If a non-terminal is in front, we
pick one of its right-hand sides and replace the non-terminal with this right-hand side.
This way, we all the time replace the left-most non-terminal, and in the end, if we
succeed, we have imitated a left-most production.
6.1 IMITATING LEFT-MOST PRODUCTIONS
Let us see how such a rederiving process could proceed with an example. Consider the
example grammar of Figure 6.1. This grammar produces all sentences with equal
numbers of a’s and b’s.
S -> aB | bA A -> a | aS | bAA B -> b | bS | aBB
Figure 6.1 A grammar producing all sentences with equal numbers of a’s and b’s
Let us try to parse the sentence aabb, by trying to rederive it from the start-symbol, S. S is our first prediction. The first symbol of our prediction is a non-terminal, so we
have to replace it by one of its right-hand sides. In this grammar, there are two choices
for S: either we use the rule S->aB, or we use the rule S->bA. The sentence starts with
an a and not with a b, so we cannot use the second rule here. Applying the first rule
120 General directional top-down methods [Ch. 6
leaves us with the prediction aB. Now, the first symbol of the prediction is a terminal
symbol. Here, we have no choice:
a abb a B
We have to match this symbol with the current symbol of the sentence, which is also an
a. So, we have a match, and accept the a. This leaves us with the prediction B for the
rest of the sentence: abb. The first symbol of the prediction is again a non-terminal, so
it has to be replaced by one of its right-hand sides. Now, we have three choices. How￾ever, the first and the second are not applicable here, because they start with a b, and
we need another a. Therefore, we take the third choice, so now we have prediction
aBB: a a bb a a BB
Again, we have a match with the current input symbol, so we accept it and continue
with the prediction BB for bb. Again, we have to replace the left-most B by one of its
choices. The next terminal in the sentence is a b, so the third choice is not applicable
here. This still leaves us with two choices, b and bS. So, we can either try them both,
or be a bit more intelligent about it. If we would take bS, then we would get at least
another a (because of the S), so this cannot be the right choice. So, we take the b
choice, and get the prediction bB for bb. Again, we have a match, and this leaves us
with prediction B for b. For the same reason, we take the b choice again. After match￾ing, this leaves us with an empty prediction. Luckily, we are also at the end of the input
sentence, so we accept it. If we had made notes of the production rules used, we would
have found the following derivation:
S -> aB -> aaBB -> aabB -> aabb.
Figure 6.2 presents the steps of the parse in a tree-form. The dashed line separates the
already processed part from the prediction. All the time, the left-most symbol of the
prediction is processed.
This example demonstrates several aspects that the parsers discussed in this
chapter have in common:
we always process the left-most symbol of the prediction;
if this symbol is a terminal, we have no choice: we have to match it with the
current input symbol or reject the parse;
if this symbol is a non-terminal, we have to make a prediction: it has to be
replaced by one of its right-hand sides. Thus, we always process the left-most
non-terminal first, so we get a left-most derivation.
Sec. 6.1] The pushdown automaton 121
S S a B S a B S a B a B B S a B a B B S a B a B B b S a B a B B b S a B a B B b b S a B a B B b b
Figure 6.2 Production trees for the sentence aabb
6.2 THE PUSHDOWN AUTOMATON
The steps we have taken in the example above resemble very much the steps of a so￾called pushdown automaton. A pushdown automaton (PDA) is an imaginary
mathematical device that reads input and has control over a stack. The stack can con￾tain symbols that belong to a so-called stack alphabet. A stack is a list that can only be
accessed at one end: the last symbol entered on the list (“pushed”) is the first symbol to
be taken from it (“popped”). This is also sometimes called a “first-in, last-out” list, or
a FILO list: the first symbol that goes in is the last symbol to come out. In the example
above, the prediction works like a stack, and this is what the pushdown automaton uses
the stack for too. We therefore often call this stack the prediction stack. The stack also
explains the name “pushdown” automaton: the automaton “pushes” symbols on the
stack for later processing.
The pushdown automaton operates by popping a stack symbol and reading an
input symbol. These two symbols then in general give us a choice of several lists of
stack symbols to be pushed on the stack. So, there is a mapping of (input symbol, stack
symbol) pairs to lists of stack symbols. The automaton accepts the input sentence
when the stack is empty at the end of the input. If there are choices (so an (input sym￾bol, stack symbol) pair maps to more than one list), the automaton accepts a sentence
when there are choices that lead to an empty stack at the end of the sentence.
This automaton is modeled after context-free grammars with rules in the so-called
122 General directional top-down methods [Ch. 6
Greibach Normal Form (GNF). In this normal form, all grammar rules have either the
form A→a or A→aB1B2 . . . Bn, with a a terminal and A, B1, ... , Bn non-terminals.
The stack symbols are, of course, the non-terminals. A rule of the form
A→aB1B2 . . . Bn
leads to a mapping of the (a, A) pair to the list B1B2 . . . Bn. This
means that if the input symbol is an a, and the prediction stack starts with an A, we
could accept the a, and replace the A part of the prediction stack with B1B2 . . . Bn. A
rule of the form A→a leads to a mapping of the (a, A) pair to an empty list. The auto￾maton starts with the start symbol of the grammar on the stack. Any context-free
grammar that does not produce the empty string can be put into Greibach Normal
Form. Most books on formal language theory discuss how to do this (see for instance
Hopcroft and Ullman [Books 1979]).
The example grammar of Figure 6.1 already is in Greibach Normal Form, so we
can easily build a pushdown automaton for it. The automaton is characterized by the
mapping shown in Figure 6.3.
(a, S) -> B (b, S) -> A (a, A) -> (a, A) -> S (b, A) -> AA (b, B) -> (b, B) -> S (a, B) -> BB
Figure 6.3 Mapping of the PDA for the grammar of Figure 6.1
An important remark to be made here is that many pushdown automata are non￾deterministic. For instance, the pushdown automaton of Figure 6.3 can choose between
an empty list and an S for the pair (a, A). In fact, there are context-free languages for
which we cannot build a deterministic pushdown automaton, although we can build a
non-deterministic one. We should also mention that the pushdown automata as dis￾cussed here are a simplification of the ones we find in automata theory. In automata
theory, pushdown automata have so-called states, and the mapping is from (state, input
symbol, stack symbol) triplets to (state, list of stack symbols) pairs. Seen in this way,
they are like finite-state automata (discussed in Chapter 5), extended with a stack.
Also, pushdown automata come in two different kinds: some accept a sentence by
empty stack, others accept by ending up in a state that is marked as an accepting state.
Perhaps surprisingly, having states does not make the pushdown automaton concept
more powerful. Pushdown automata with states still only accept languages that can be
described with a context-free grammar. In our discussion, the pushdown automaton
only has one state, so we have taken the liberty of leaving it out.
Pushdown automata as described above have several shortcomings that must be
resolved if we want to convert them into parsing automata. Firstly, pushdown auto￾mata require us to put our grammar into Greibach Normal Form. While grammar
transformations are no problem for the formal linguist, we would like to avoid them as
much as possible, and use the original grammar if we can. Now we could relax the
Greibach Normal Form requirement a little by also allowing terminals as stack sym￾bols, and adding
Sec. 6.2] The pushdown automaton 123
(a, a) →
to the mapping for all terminals a. We could then use any grammar all of whose right￾hand sides start with a terminal. We could also split the steps of the pushdown automa￾ton into separate “match” and “predict” steps, as we did in the example of Section 6.1.
The “match” steps then correspond to usage of the
(a, a) →
mappings, and the “predict” step then corresponds to a
(, A) → . . .
mapping, that is, a non-terminal on the top of the stack is replaced by one of its right￾hand sides, without consuming a symbol from the input. For the grammar of Figure
6.1, this would result in the mapping shown in Figure 6.4, which is in fact just a rewrite
of the grammar of Figure 6.1.
(, S) -> aB (, S) -> bA (, A) -> a (, A) -> aS (, A) -> bAA (, B) -> b (, B) -> bS (, B) -> aBB (a, a) -> (b, b) ->
Figure 6.4 Match and predict mappings of the PDA for the grammar of Figure 6.1
We will see later that, even using this approach, we may have to modify the grammar
anyway, but in the meantime, this looks very promising so we adopt this strategy. This
strategy also solves another problem: ε-rules do not need special treatment any more.
To get Greibach Normal Form, we would have to eliminate them. This is not necessary
any more, because they now just correspond to a
(, A) →
mapping.
The second shortcoming is that the pushdown automaton does not keep a record of
the rules (mappings) it uses. Therefore, we introduce an analysis stack into the auto￾maton. For every prediction step, we push the non-terminal being replaced onto the
analysis stack, suffixed with the number of the right-hand side taken (numbering the
right-hand sides of a non-terminal from 1 to n). For every match, we push the matched
terminal onto the analysis stack. Thus, the analysis stack corresponds exactly to the
parts to the left of the dashed line in Figure 6.2, and the dashed line represents the
separation between the analysis stack and the prediction stack. This results in an
124 General directional top-down methods [Ch. 6
automaton that at any point in time has a configuration as depicted in Figure 6.5. In the
literature, such a configuration, together with its current state, stacks, etc. is sometimes
called an instantaneous description. In Figure 6.5, matching can be seen as pushing the
vertical line to the right.
matched input rest of input
analysis prediction
Figure 6.5 An instantaneous description
The third and most important shortcoming, however, is the non-determinism.
Formally, it may be satisfactory that the automaton accepts a sentence if and only if
there is a sequence of choices that leads to an empty stack at the end of the sentence,
but for our purpose it is not, because it does not tell us how to obtain this sequence. We
have to guide the automaton to the correct choices. Looking back to the example of
Section 6.1, we had to make a choice at several points in the derivation, and we did so
based on some ad hoc considerations that were specific for the grammar at hand: some￾times we looked at the next symbol in the sentence, and there were also some points
where we had to look further ahead, to make sure that there were no more a’s coming.
In the example, the choices were easy, because all the right-hand sides start with a ter￾minal symbol. In general, however, finding the correct choice is much more difficult.
The right-hand sides could for instance equally well have started with a non-terminal
symbol that again has right-hand sides starting with a non-terminal, etc.
In Chapter 8 we will see that many grammars still allow us to decide which right￾hand side to choose, given the next symbol in the sentence. In this chapter, however,
we will focus on top-down parsing methods that work for a larger class of grammars.
Rather than trying to pick a choice based on ad hoc considerations, we would like to
guide the automaton through all the possibilities. In Chapter 3 we saw that there are in
general two methods for solving problems in which there are several alternatives in
well-determined points: depth-first search and breadth-first search. We shall now see
how we can make the machinery operate for both search methods. Since the effects
can be exponential in size, even a small example can get quite big. We will use the
grammar of Figure 6.6, with test input aabc. This grammar generates a rather complex
language: sentences consist either of a number of a’s followed by a number of b’s fol￾lowed by an equal number of c’s, or of a number of a’s followed by an equal number
of b’s followed by a number of c’s. Example sentences are for instance: abc, aabbc. S -> AB | DC A -> a | aA B -> bc | bBc D -> ab | aDb C -> c | cC
Figure 6.6 A more complicated example grammar
Sec. 6.2] Breadth-first top-down parsing 125
6.3 BREADTH-FIRST TOP-DOWN PARSING
The breadth-first solution to the top-down parsing problem is to maintain a list of all
possible predictions. Each of these predictions is then processed as described in Sec￾tion 6.2 above, that is, if there is a non-terminal in front, the prediction stack is replaced
by several new prediction stacks, as many as there are choices for this non-terminal. In
each of these new prediction stacks, the non-terminal is replaced by the corresponding
choice. This prediction step is repeated for all prediction stacks it applies to (including
the new ones), until all prediction stacks have a terminal in front. Then, for each of the
prediction stacks we match the terminal in front with the current input symbol, and
strike out all prediction stacks that do not match. If there are no prediction stacks left,
the sentence does not belong to the language. So, instead of one prediction
stack/analysis stack pair, our automaton now maintains a list of prediction
stack/analysis stack pairs, one for each possible choice, as depicted in Figure 6.7.
matched input rest of input
analysis1 prediction1
analysis2 prediction2
... ...
Figure 6.7 An instantaneous description of our extended automaton
The method is suitable for on-line parsing, because it processes the input from left
to right. Any parsing method that processes its input from left to right and results in a
left-most derivation is called an LL parsing method. The first L stands for Left to right,
and the second L for Left-most derivation.
Now, we almost know how to write a parser along these lines, but there is one
detail that we have not properly dealt with yet: termination. Does the input sentence
belong to the language defined by the grammar when, ultimately, we have an empty
prediction stack? Only when the input is exhausted! To avoid this extra check, and to
avoid problems about what to do when we arrive at the end of sentence but haven’t fin￾ished parsing yet, we introduce a special so-called end-marker #, that is appended at
the end of the sentence. Also, a new grammar rule S’->S# is added to the grammar,
where S’ is a new non-terminal that serves as a new start symbol. The end-marker
behaves like an ordinary terminal symbol; when we have an empty prediction, we
know that the last step taken was a match with the end-marker, and that this match suc￾ceeded. This also means that the input is exhausted, so it must be accepted.
6.3.1 An example
Figure 6.8 presents a complete breadth-first parsing of the sentence aabc#. At first
there is only one prediction stack: it contains the start-symbol; no symbols have been
accepted yet (a). The step leading to (b) is a simple predict step; there is no other
right-hand side for S’. Another predict step leads us to (c), but this time there are two
possible right-hand sides, so we obtain two prediction stacks; note that the difference of
the prediction stacks is also reflected in the analysis stacks, where the different suffixes
of S represent the different right-hand sides predicted. Another predict step with
several right-hand sides leads to (d). Now, all prediction stacks have a terminal on top;
126 General directional top-down methods [Ch. 6 ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
(a) ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aabc# (b) aabc# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’ S’1 S# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
(c) ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aabc# (d) aabc# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’1S1 DC# S’1S1D1 abC# S’1S2 AB# S’1S1D2 aDbC# S’1S2A1 aB# S’1S2A2 aAB# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
(e) ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ a abc# (f) a abc# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’1S1D1a bC# S’1S1D1a bC# S’1S1D2a DbC# S’1S1D2aD1 abbC# S’1S2A1a B# S’1S1D2aD2 aDbbC# S’1S2A2a AB# S’1S2A1aB1 bc# S’1S2A1aB2 bBc# S’1S2A2aA1 aB# S’1S2A2aA2 aAB# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
(g) ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aa bc# (h) aa bc# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’1S1D2aD1a bbC# S’1S1D2aD1a bbC# S’1S1D2aD2a DbbC# S’1S1D2aD2aD1 abbbC# S’1S2A2aA1a B# S’1S1D2aD2aD2 aDbbbC# S’1S2A2aA2a AB# S’1S2A2aA1aB1 bc# S’1S2A2aA1aB2 bBc# S’1S2A2aA2aA1 aB# S’1S2A2aA2aA2 aAB# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
(i) ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aab c# (j) aab c# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’1S1D2aD1ab bC# S’1S1D2aD1ab bC# S’1S2A2aA1aB1b c# S’1S2A2aA1aB1b c# S’1S2A2aA1aB2b Bc# S’1S2A2aA1aB2bB1 bcc# S’1S2A2aA1aB2bB2 bBcc# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
(k) ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aabc # (l) aabc# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’1S2A2aA1aB1bc # S’1S2A2aA1aB1bc# ￾✁￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
Figure 6.8 The breadth-first parsing of the sentence aabc#
all happen to match, resulting in (e). Next, we again have some predictions with a
non-terminal in front, so another predict step leads us to (f). The next step is a match
step, and fortunately, some matches fail; these are just dropped as they can never lead
to a successful parse. From (g) to (h) is again a predict step. Another match where,
again, some matches fail, leads us to (i). A further prediction results in (j) and then two
matches result in (k) and (l), leading to a successful parse (the predict stack is empty).
The analysis is
Sec. 6.3] Breadth-first top-down parsing 127
S’1S2A2aA1aB1bc#.
For now, we do not need the terminals in the analysis; discarding them gives
S’1S2A2A1B1.
This means that we get a left-most derivation by first applying rule S’1, then rule S2,
then rule A2, etc., all the time replacing the left-most non-terminal. Check:
S’ -> S# -> AB# -> aAB# -> aaB# -> aabc#.
The breadth-first method described here was first presented by Greibach [CF
1964]. However, in that presentation, grammars are first transformed into Greibach
Normal Form, and the steps taken are like the ones our initial pushdown automaton
makes. The predict and match steps are combined.
6.3.2 A counterexample: left-recursion
The method discussed above clearly works for this grammar, and the question arises
whether it works for all context-free grammars. One would think it does, because all
possibilities are systematically tried, for all non-terminals, in any occurring prediction.
Unfortunately, this reasoning has a serious flaw that is demonstrated by the following
example: let us see if the sentence ab belongs to the language defined by the simple
grammar
S -> Sb | a
Our automaton starts off in the following state: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ab# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’ ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
As we have a non-terminal at the beginning of the prediction, we use a predict step,
resulting in: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ab# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’1 S# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
Now, another predict step results in: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ab# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’1S1 Sb# S’1S2 a# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
As one prediction again starts with a non-terminal, we predict again:
128 General directional top-down methods [Ch. 6 ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ab# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S’1S1S1 Sbb# S’1S1S2 ab# S’1S2 a# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
By now, it is clear what is happening: we seem to have ended up in an infinite
process leading us nowhere. The reason for this is that we keep trying the S->Sb rule
without ever coming to a state where a match can be attempted. This problem can
occur whenever there is a non-terminal that derives an infinite sequence of sentential
forms, all starting with a non-terminal, so no matches can take place. As all these sen￾tential forms in this infinite sequence start with a non-terminal, and the number of
non-terminals is finite, there is at least one non-terminal A occurring more than once at
the start of those sentential forms. So, we have: A → . . . → Aα. A non-terminal that
derives a sentential form starting with itself is called left-recursive. Left recursion
comes in two kinds: we speak of immediate left-recursion when there is a grammar rule
A→Aα, like in the rule S->Sb; we speak of indirect left-recursion when the recursion
goes through other rules, for instance A→Bα, B→Aβ. Both forms of left-recursion
can be concealed by ε-producing non-terminals. For instance in the grammar
S -> ABc B -> Cd B -> ABf C -> Se A -> ε
the non-terminals S, B, and C are all left-recursive. Grammars with left-recursive non￾terminals are called left-recursive as well.
If a grammar has no ε-rules and no loops, we could still use our parsing scheme if
we use one extra step: if a prediction stack has more symbols than the unmatched part
of the input sentence, it can never derive the sentence (no ε-rules), so it can be dropped.
However, this little trick has one big disadvantage: it requires us to know the length of
the input sentence in advance, so the method no longer is suitable for on-line parsing.
Fortunately, left-recursion can be eliminated: given a left-recursive grammar, we can
transform it into a grammar without left-recursive non-terminals that defines the same
language. As left-recursion poses a major problem for any top-down parsing method,
we will now discuss this grammar transformation.
6.4 ELIMINATING LEFT-RECURSION
We will first discuss the elimination of immediate left-recursion. We will assume that
ε-rules and unit rules already have been eliminated (see Section 4.2.3.1 and 4.2.3.2).
Now, let A be a left-recursive rule, and
A → Aα1 | . . . | Aαn | β1 | . . . | βm
be all the rules for A. None of the αi are equal to ε, or we would have a rule A→A, a
unit rule. None of the βj are equal to ε either, or we would have an ε-rule. The senten￾tial forms generated by A using only the A→Aαk
rules all have the form
Sec. 6.4] Eliminating left-recursion 129
Aαk 1αk 2 . . . αkj
and as soon as one of the A→βi
rules is used, the sentential form has no longer an A in
front; it has the following form:
βiαk 1αk 2 . . . αkj
for some i, and some k 1, . . . , kj, where j could be 0. These same sentential forms are
generated by the following set of rules:
A_head → β1 | . . . | βm
A_tail → α1 | . . . | αn
A_tails → A_tail A_tails | ε A → A_head A_tails
or, without re-introducing ε-rules,
A_head → β1 | . . . | βm
A_tail → α1 | . . . | αn
A_tails → A_tail A_tails | A_tail
A → A_head A_tails | A_head
where A_head, A_tail, and A_tails are newly introduced non-terminals. None of the αi
is ε, so A_tail does not derive ε, so A_tails is not left-recursive. A could still be left￾recursive, but it is not immediately left-recursive, because none of the βj
start with an
A. They could, however, derive a sentential form starting with an A.
In general, eliminating the indirect left-recursion is more complicated. The idea is
that first the non-terminals are numbered, say A1, A2, . . . , An. Now, for a left￾recursive non-terminal A there is a derivation
A → Bα → . . . → Cγ → Aδ
with all the time a non-terminal at the left of the sentential form, and repeatedly replac￾ing this non-terminal using one of its right-hand sides. All these non-terminals have a
number associated with them, say i 1, i 2, . . . , im, and in the derivation we get the fol￾lowing sequence of numbers: i 1, i 2, . . . , im, i 1. Now, if we did not have any rules
Ai→Ajα with j≤i, this would be impossible, because i 1 < i 2 < . . . < im < i 1
is
impossible.
The idea now is to eliminate all rules of this form. We start with A1. For A1, the
only rules to eliminate are the immediately left-recursive ones, and we already have
seen how to do just that. Next, it is A2
’s turn. Each production rule of the form
A2→A1α is replaced by the production rules
A2 → α1α | . . . | αmα
where
A1 → α1 | . . . | αm
130 General directional top-down methods [Ch. 6
are the A1
-rules. This cannot introduce new rules of the form A2→A1γ because we
have just eliminated A1
’s left-recursive rules, and the αi
’s are not equal to ε. Next, we
eliminate the immediate left-recursive rules of A2. This finishes the work we have to
do for A2. Likewise, we deal with A3
through An, in this order, always first replacing
rules Ai→A1γ, then rules Ai→A2δ, etc. We have to obey this ordering, however,
because for instance replacing a Ai→A2δ rule could introduce a Ai→A3γ rule, but not a Ai→A1α rule.
6.5 DEPTH-FIRST (BACKTRACKING) PARSERS
The breadth-first method presented in the previous section has the disadvantage that it
uses a lot of memory. The depth-first method also has a disadvantage: in its general
form it is not suitable for on-line parsing. However, there are many applications where
parsing does not have to be done on-line, and then the depth-first method is advanta￾geous since it does not need much memory.
In the depth-first method, when we are faced with a number of possibilities, we
choose one and leave the other possibilities for later. First, we fully examine the conse￾quences of the choice we just made. If this choice turns out to be a failure (or even a
success, but we want all solutions), we roll back our actions until the present point and
continue with the other possibilities.
Let us see how this search technique applies to top-down parsing. Our depth-first
parser follows the same steps as our breadth-first parser, until it encounters a choice: a
non-terminal that has more than one right-hand side lies on top of the prediction stack.
Now, instead of creating a new analysis stack/prediction stack pair, it chooses the first
right-hand side. This is reflected on the analysis stack by the appearance of the non￾terminal involved, with suffix 1, exactly as it was in our breadth-first parser. This time
however, the analysis stack is not only used for remembering the parse, but also for
backtracking.
The parser continues in this way, until a match fails, or the prediction stack is
empty. If the prediction stack is empty, we have found a parse, which is represented by
the analysis stack (we know that the input is also exhausted, because of the end-marker
#). If a match fails, the parser will backtrack. This backtracking consists of the fol￾lowing steps: first, any terminal symbols at the end of the analysis stack are popped
from this stack, and pushed back on top of the prediction stack. Also, these symbols
are removed from the matched input and added to the beginning of the rest of the input
(this is the reversal of the “match” steps), that is, backtracking over a terminal is done
by moving the vertical line backwards, as is demonstrated in Figure 6.9.
a1a2 . . . ai ai +1 . . . an# αai β a1a2 . . . ai −1 aiai +1 . . . an# α aiβ
Figure 6.9 Backtracking over a terminal
Then, there are two possibilities: if the analysis stack is empty, there are no other possi￾bilities to try, and the parsing stops; otherwise, there is a non-terminal on top of the
analysis stack, and the top of the prediction stack corresponds to a right-hand side of
Sec. 6.5] Depth-first (backtracking) parsers 131
this non-terminal. The choice of this right-hand side just resulted in a failed match. In
the latter case, we pop the non-terminal from the analysis stack and replace the right￾hand side part in the prediction stack with this non-terminal (this is the reversal of a
prediction step). This is demonstrated in Figure 6.10.
a1a2 . . . ai ai +1 . . . an# αA γβ
a1a2 . . . ai ai +1 . . . an# α Aβ
Figure 6.10 Backtracking over a A→γ choice
Next, there are again two possibilities: if this was the last right-hand side of this non￾terminal, we have already tried its right-hand sides and have to backtrack further; if
not, we start parsing again, first using a predict step that replaces the non-terminal with
its next right-hand side.
Now, let us try to parse the sentence aabc, this time using the backtracking
parser. Figure 6.11 presents the parsing process step by step; the backtracking steps are
marked with a B. The example demonstrates another disadvantage of the backtracking
method: it can make wrong choices and find out about this only much later. Of course,
it could also start with the right choices and be finished rapidly.
As presented here, the parsing stops when a parsing is found. If we want to find
all parsings, we should not stop when the prediction stack is empty. We can continue
by backtracking just as if we had not found a successful parse, and write down the
analysis stack (that represents the parse) every time that the prediction stack is empty.
Ultimately, we will end with an empty analysis part, indicating that we have exhausted
all analysis possibilities, and the parsing stops.
6.6 RECURSIVE DESCENT
In the previous sections, we have seen several automata at work, using a grammar to
decide the parsing steps while processing the input sentence. Now this is just another
way of stating that these automata use a grammar as a program. Looking at a grammar
as a program for a parsing machine is not as far-fetched as it may seem at first. After
all, a grammar is a prescription for deriving sentences of the language that the grammar
describes, and what we are doing in top-down parsing is rederiving a sentence from the
grammar. This only differs from the classic view of a grammar as a generating device
in that we are now trying to rederive a particular sentence, not just any sentence. Seen
in this way, grammars are programs, written in a programming language with a
declarative style (that is, it specifies what to do, but not the steps that need to be done
to achieve the result).
If we want to write a top-down parser for a certain context-free grammar in one of
the more common programming languages, like Pascal, C, or Modula-2, there are
several options. The first option is to write a program that emulates one of the auto￾mata described in the previous sections. This program can then be fed a grammar and
an input sentence. This is a perfectly sound approach and is easy to program. The dif￾ficulty comes when the parser must perform some other actions as parts of the input are
recognized. For instance, a compiler must build a symbol table when it processes a
132 General directional top-down methods [Ch. 6 aabc# S’ aabc# S’1 S# aabc# S’1S1 DC# aabc# S’1S1D1 abC# a abc# S’1S1D1a bC# B aabc# S’1S1D1 abC# B aabc# S’1S1 D1C# aabc# S’1S1D2 aDbC# a abc# S’1S1D2a DbC# a abc# S’1S1D2aD1 abbC# aa bc# S’1S1D2aD1a bbC# aab c# S’1S1D2aD1ab bC# B aa bc# S’1S1D2aD1a bbC# B a abc# S’1S1D2aD1 abbC# B a abc# S’1S1D2a D1bC# a abc# S’1S1D2aD2 aDbbC# aa bc# S’1S1D2aD2a DbbC# aa bc# S’1S1D2aD2aD1 abbbC# B aa bc# S’1S1D2aD2a D1bbC# aa bc# S’1S1D2aD2aD2 aDbbbC# B aa bc# S’1S1D2aD2a D2bbC# B a abc# S’1S1D2aD2 aD2bbC# B a abc# S’1S1D2a D2bC# B aabc# S’1S1D2 aD2bC# B aabc# S’1S1 D2C# B aabc# S’1 S1# aabc# S’1S2 AB# aabc# S’1S2A1 aB# a abc# S’1S2A1a B# a abc# S’1S2A1aB1 bc# B a abc# S’1S2A1a B1# a abc# S’1S2A1aB2 bBc# B a abc# S’1S2A1a B2# B aabc# S’1S2A1 aB2# B aabc# S’1S2 A1B2# aabc# S’1S2A2 aAB# a abc# S’1S2A2a AB# a abc# S’1S2A2aA1 aB# aa bc# S’1S2A2aA1a B# aa bc# S’1S2A2aA1aB1 bc# aab c# S’1S2A2aA1aB1b c# aabc # S’1S2A2aA1aB1bc # aabc# S’1S2A2aA1aB1bc#
Figure 6.11 Parsing the sentence aabc
Sec. 6.6] Recursive descent 133
declaration sequence. This, and efficiency considerations lead to a second option: to
write a special purpose parser for the grammar at hand. Many of these special purpose
parsers have been written, and most of them use an implementation technique called
recursive descent. We will assume that the reader has some programming experience,
and knows about procedures and recursion. If not, this section can be skipped. It does
not describe a different parsing method, but merely an implementation technique that is
often used in hand-written parsers and also in some machine-generated parsers.
6.6.1 A naive approach
As a first approach, we regard a grammar rule as a procedure for recognizing its left￾hand side. The rule
S -> aB | bA
is regarded as a procedure to recognize an S. This procedure then states something like
the following:
S succeeds if
a succeeds and then B succeeds
or else
b succeeds and then A succeeds
This does not differ much from the grammar rule, but it does not look like a piece of
Pascal or C either. Like a cookbook recipe that usually does not tell us that we must
peel the potatoes, let alone how to do that, the procedure is incomplete.
There are several bits of information that we must maintain when carrying out
such a procedure. First, there is the notion of a “current position” in the rule. This
current position indicates what must be tried next. When we implement rules as pro￾cedures, this current position is maintained automatically, by the program counter,
which tells us where we are within a procedure. Next, there is the input sentence itself.
When implementing a backtracking parser, we usually keep the input sentence in a glo￾bal array, with one element for each symbol in the sentence. The array must be global,
because it contains information that must be accessible equally easily from all pro￾cedures. Then, there is the notion of a current position in the input sentence. When the
current position in the rule indicates a terminal symbol, and this symbol corresponds to
the symbol at the current position in the input sentence, both current positions will be
advanced one position. The current position in the input sentence is also global infor￾mation. We will therefore maintain this position in a global variable, of a type that is
suitable for indexing the array containing the input sentence. Also, when starting a rule
we must remember the current position in the input sentence, because we need it for the
“or else” clauses. These must all be started at the same position in the input sentence.
For instance, starting with the rule for S of grammar 6.1, suppose that the a matches the
symbol at the current position of the input sentence. The current position is advanced
and then B is tried. For B, we have a rule similar to that of S. Now suppose that B fails.
We then have to try the next choice for S, and backup the position in the input sentence
to what it was when we started the rule for S. This is backtracking, just as we have
seen it earlier.
All this tells us how to deal with one rule. However, usually we are dealing with
134 General directional top-down methods [Ch. 6 a grammar that has more than one non-terminal, so there will be more than one rule.
When we arrive at a non-terminal in a rule, we have to execute the rule for that non￾terminal, and, if it succeeds, return to the current invocation and continue there. We
achieve this automatically by using the procedure-call mechanism of the implementa￾tion language.
Another detail that we have not covered yet is that we have to remember the
grammar rules that we use. If we do not remember them, we will not know afterwards
how the sentence was derived. Therefore we note them in a separate list, striking them
out when they fail. Each procedure must keep its own copy of the index in this list,
again because we need it for the “or else ” clauses: if a choice fails, all choices that
have been made after the choice now failing must be discarded. In the end, when the
rule for S’ succeeds, the grammar rules left in this list represent a left-most derivation
of the sentence.
Now, let us see how a parser, as described above, works for an example. Let us
consider again grammar of Figure 6.6, and input sentence abbcc. As before, we add a
rule S’->S# to the grammar and a # to the end of the sentence, so our parser starts in
the following state: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Active rules Sentence Parse ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ 1: S’ -> S# abc# 1: S’ -> S#
Our administration is divided into three parts; the “Active rules” part indicates the
active rules, with a dot ( ) indicating the current position within that rule. The bottom
rule in this part is the rule that we are currently working on. The “Sentence” part indi￾cates the sentence, including a position marker indicating the current position in the
sentence. The “Parse” part will be used to remember the rules that we use (not only the
currently active ones). The entries in this part are numbered, and each entry in the
“Active rules” part also contains its index in the “Parse” part. As we shall see later, this
is needed to backup after having taken a wrong choice.
There is only one possibility here: the current position in the procedure indicates
that we must invoke the procedure for S, so let us do so: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Active rules Sentence Parse ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
1: S’ -> S # abc# 1: S’ -> S# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ 2: S -> DC | AB abc# 2: S -> DC
Notice that we have advanced the position in the S’ rule. It now indicates where we
have to continue when we are finished with S (the return address). Now we try the first
alternative for S. There is a choice here, so the current position in the input sentence is
saved. We have not made this explicit in the pictures, because this position is already
present in the “Sentence”-part of the entry that invoked S. ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Active rules Sentence Parse ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
1: S’ -> S # abc# 1: S’ -> S#
2: S -> D C | AB abc# 2: S -> DC ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ 3: D -> ab | aDb abc# 3: D -> ab
Now, the first choice for D is tried. The a succeeds, and next the b also succeeds, so
Sec. 6.6] Recursive descent 135
we get: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Active rules Sentence Parse ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
1: S’ -> S # abc# 1: S’ -> S#
2: S -> D C | AB abc# 2: S -> DC ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ 3: D -> ab | aDb ab c# 3: D -> ab
Now, we are at the end of a choice for D. This means that it succeeds, and we remove
this entry from the list of active rules, after updating the current positions in the entry
above. Next, it is C’s turn: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Active rules Sentence Parse ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
1: S’ -> S # abc# 1: S’ -> S#
2: S -> DC | AB ab c# 2: S -> DC
4: C -> c | cC ab c# 3: D -> ab ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ 4: C -> c
Now, the c succeeds, so the C succeeds, and then the S also succeeds. ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Active rules Sentence Parse ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
1: S’ -> S # abc # 1: S’ -> S#
2: S -> DC
3: D -> ab ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ 4: C -> c
Now, the # also succeeds, and thus S’ succeeds, resulting in: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Active rules Sentence Parse ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
1: S’ -> S# abc# 1: S’ -> S#
2: S -> DC
3: D -> ab ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ 4: C -> c
The “Parse” part now represents a left-most derivation of the sentence:
S’ -> S# -> DC# -> abC# -> abc#.
This method is called recursive descent. Descent, because it operates top-down,
and recursive, because each non-terminal is implemented as a procedure that can
directly or indirectly (through other procedures) invoke itself. It should be stressed that
“recursive descent” is merely an implementation issue, albeit an important one. It
should also be stressed that the parser described above is a backtracking parser,
independent of the implementation method used. Backtracking is a property of the
parser, not of the implementation.
The backtracking method developed above is aesthetically pleasing, because we in
fact use the grammar itself as a program (or we transform the grammar rules into pro￾cedures, which can be done mechanically). There is only one problem: the recursive
descent method, as described above, does not always work! We already know that it
does not work for left-recursive grammars, but the problem is worse than that. For
136 General directional top-down methods [Ch. 6
instance, aabc and abcc are sentences that are not recognized, but should be. Parsing
of the aabc sentence gets stuck after the first a, and parsing of the abcc sentence gets
stuck after the first c. Yet, aabc can be derived as follows:
S -> AB -> aAB -> aaB -> aabc,
and abcc can be derived with
S -> DC -> abC -> abcC -> abcc.
So, let us examine why our method fails. A little investigation shows that we
never try the A->aA choice when parsing aabc, because the A->a choice succeeds.
Such a problem arises whenever more than one right-hand side can succeed, and this is
the case whenever a right-hand side can derive a prefix of a string derivable from
another right-hand side of the same non-terminal. The method developed so far is too
optimistic, in that it assumes that if a choice succeeds, it must be the right choice. It
does not allow us to backtrack over such a choice, when it was the wrong one. This is a
particularly serious problem if the grammar has ε-rules, because ε-rules always
succeed. Another consequence of being unable to backup over a succeeding choice is
that it does not allow us to get all parses when there is more than one (this is possible
for ambiguous grammars). Improvement is certainly needed here. Our criterion for
determining whether a choice is the right one clearly is wrong. Looking back at the
backtracking parser of the beginning of this section, we see that that parser does not
have this problem, because it does not consider choices independently of their context.
One can only decide that a choice is the right one if taking it results in a successful
parse; even if the choice ultimately succeeds, we have to try the other choices as well if
we want all parses. In the next section, we will develop a recursive-descent parser that
solves all the problems mentioned above. Meanwhile, the method above only works
for grammars that are prefix-free. A non-terminal A is prefix-free if A→* x and A→* xy,
where x and y are strings of terminal symbols, implies that y = ε. A grammar is called
prefix-free if all its non-terminals are prefix-free.
6.6.2 Exhaustive backtracking recursive descent
In the previous section we saw that we have to be careful not to accept a choice too
early; it can only be accepted when it leads to a successful parse. Now this demand is
difficult to express in a recursive-descent parser; how do we obtain a procedure that
tells us whether a choice leads to a successful parse? In principle, there are infinitely
many of these procedures, depending on the sentential form (the prediction) that must
derive the rest of the input. We cannot just write them all. However, at any point dur￾ing the parsing process we are dealing with only one such sentential form: the current
prediction, so we could try to build a parsing procedure for this sentential form dynami￾cally, during parsing. Many programming languages offer a useful facility for this pur￾pose: procedure parameters. One procedure can accept a procedure as parameter, and
call it, or pass it on to another procedure, or whatever other things one does with pro￾cedures. Some languages (for instance Pascal) require these procedures to be named,
that is, the actual parameter must be declared as a procedure; other languages, like
Algol 68, allow a procedure body for an actual parameter.
Let us see how we can write a parsing procedure for a symbol X, given that it is
Sec. 6.6] Recursive descent 137
passed a procedure, which we will call tail, that parses the rest of the sentence (the part
that follows the X). This is the approach taken for all non-terminals, and, for the time
being, for terminals as well.
The parsing procedure for a terminal symbol a is easy: it matches the current input
symbol with a; if it succeeds, it advances the input position, and calls the tail parame￾ter; then, when tail returns, it restores the input position and returns.
Obviously, the parsing procedure for a non-terminal A is more complicated. It
depends on the type of grammar rule we have for A. The simplest case is A→ε. This is
implemented as a call to tail. The next simple case is A→X, where X is either a termi￾nal or a non-terminal symbol. To deal with this case, we must remember that we
assume that we have a parsing procedure for X, so the implementation of this case con￾sists of a call to X, with the tail parameter. The next case is A→XY, with X and Y sym￾bols. The procedure for X expects a procedure for “what comes after the X” as parame￾ter. Here, this parameter procedure is built using the Y and the tail procedures: we
create a new procedure out of these two. This, by itself, is a simple procedure: it calls
Y, with tail as parameter. If we call this procedure Y_tail, we can implement A by cal￾ling X with Y_tail as parameter.† And finally, if the right-hand side contains more than
two symbols, this technique has to be repeated: for a rule A→X1X2 . . . Xn we create a
procedure for X2 . . . Xn and tail using a procedure for X3 . . . Xn and tail, and so on.
Finally, if we have a choice, that is, we have A→α | β, the parsing procedure for A has
two parts: one part for α, followed by a call to tail, and another part for β, followed by
a call to tail. We have already seen how to implement these parts. If we only want one
parsing, all parsing procedures may be implemented as functions that return either false
or true, reflecting whether they result in a successful parse; the part for β is then only
started if the part for α, followed by tail, fails. If we want all parses, we have to try
both choices.
Applying this technique to all grammar rules almost results in a parser. Only, we
don’t have a starting point yet; this is easily obtained: we just call the procedure for the
start-symbol, with the procedure for recognizing the end-marker as parameter. This
end-marker procedure is probably a bit different from the others, because this is the
procedure where we finally find out whether a parsing attempt succeeds.
Figure 6.12 presents a fully backtracking recursive-descent parser for the gram￾mar of Figure 6.6, written in Pascal. The program has a mechanism to remember the
rules used, so these can be printed for each successful parse. Figure 6.13 presents a
sample session with this program.
{$C+: distinguish between upper and lower case } program parse(input, output); { This is an exhaustive backtracking recursive-descent parser that will correctly parse according to the grammar S -> D C | A B A -> a | a A B -> b c | b B c ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† For some programming languages this is difficult. The problem is that tail must be accessible
from Y_tail. Therefore, Y_tail should be a local procedure within the procedure for A. But,
some languages do not allow for local procedures (for instance C), and others do not allow local
procedures to be passed as parameters (like Modula-2). Some extensive trickery is required for
these languages, but this is beyond the scope of this book.
138 General directional top-down methods [Ch. 6 D -> a b | a D b C -> c | c C It implements proper backtracking by only checking one symbol at a time and passing the rest of the alternative as a parameter for evaluation on a lower level. A more naive backtracking parser will not accept e.g. aabc. }const infinity = 100; { large enough } type str = packed array[1..10] of char; var tp: integer; { index in text } length: integer; { number of symbols in text } rp: integer; { index in rules } text: array [1..infinity] of char; { input text } rules: array [1..infinity] of str; { store rules used } { administration of rules used } procedure pushrule (s: str); begin rp := rp + 1; rules[rp] := s end; procedure poprule; begin rp := rp - 1 end; procedure endmark; { recognize end and report success } var i: integer; begin if text[tp] = ’#’ then begin writeln(’Derivation:’); for i := 1 to rp do writeln(’ ’, rules[i]); end end; procedure a(procedure tail); { recognize an ’a’ and call tail } begin if text[tp] = ’a’ then begin tp := tp + 1; tail; tp := tp - 1 end end; procedure b(procedure tail); { recognize a ’b’ and call tail } begin if text[tp] = ’b’ then begin tp := tp + 1; tail; tp := tp - 1 end end; procedure c(procedure tail); { recognize a ’c’ and call tail } begin if text[tp] = ’c’ then begin tp := tp + 1; tail; tp := tp - 1 end end; procedure A(procedure tail); { recognize an ’A’ and call tail } { procedures for the alternative tails } procedure t; begin tail end; procedure At; begin A(tail) end; begin pushrule(’A -> a ’); a(t); poprule; pushrule(’A -> aA ’); a(At); poprule end; procedure B(procedure tail); { recognize a ’B’ and call tail } procedure ct; begin c(tail) end; procedure Bct; procedure ct; begin c(tail) end; begin B(ct) end; begin pushrule(’B -> bc ’); b(ct); poprule; pushrule(’B -> bBc ’); b(Bct); poprule
Sec. 6.6] Recursive descent 139
end; procedure D(procedure tail); { recognize a ’D’ and call tail } procedure bt; begin b(tail) end; procedure Dbt; procedure bt; begin b(tail) end; begin D(bt) end; begin pushrule(’D -> ab ’); a(bt); poprule; pushrule(’D -> aDb ’); a(Dbt); poprule end; procedure C(procedure tail); { recognize a ’C’ and call tail } procedure t; begin tail end; procedure Ct; begin C(tail) end; begin pushrule(’C -> c ’); c(t); poprule; pushrule(’C -> cC ’); c(Ct); poprule end; procedure S(procedure tail); { recognize a ’S’ and call tail } procedure Ct; begin C(tail) end; procedure Bt; begin B(tail) end; begin pushrule(’S -> DC ’); D(Ct); poprule; pushrule(’S -> AB ’); A(Bt); poprule end; function readline: boolean; begin write(’> ’); length := 1; if not eof then begin while not eoln do begin read(text[length]); length := length + 1; end; readln; readline := true end else readline := false; end; procedure parser; begin text[length] := ’#’; tp := 1; rp := 0; S(endmark) end; begin while readline do parser end.
Figure 6.12 A parser for the grammar of Figure 6.6
6.7 DEFINITE CLAUSE GRAMMARS
In the previous sections, we have seen how to create parsers that retain much of the ori￾ginal structure of the grammar. The programming language Prolog allows us to take
this even one step further. Prolog has its foundations in logic. The programmer
declares some facts about objects and their relationships, and asks questions about
these. The Prolog system uses a built-in search and backtrack mechanism to answer
140 General directional top-down methods [Ch. 6 > aabc Derivation: S -> AB A -> aA A -> a B -> bc > abcc Derivation: S -> DC D -> ab C -> cC C -> c > abc Derivation: S -> DC D -> ab C -> c Derivation: S -> AB A -> a B -> bc
Figure 6.13 A session with the program of Figure 6.12
the questions with “yes” or “no”. For instance, if we have told the Prolog system about
the fact that a table and a chair are pieces of furniture, as follows:
furniture(table). furniture(chair).
and we then ask if a bread is a piece of furniture:
| ?- furniture(bread).
the answer will be “no”, but the answer to the question
| ?- furniture(table).
will, of course, be “yes”. We can also use variables, which can be either instantiated
(have a value), or not. Variables start with a capital letter or an underscore (_). We
can use them for instance as follows:
| ?- furniture(X).
This is asking for an instantiation of the variable X. The Prolog system will search for
a possible instantiation and respond:
X = table
We can then either stop by typing a RETURN, or continue searching by typing a
Sec. 6.7] Definite Clause grammars 141
semicolon (and then a RETURN). In the last case, the Prolog system will search for
another instantiation of X.
Not every fact is as simple as the one in the example above. For instance, a Pro￾log clause that could tell us something about antique furniture is the following:
antique_furniture(Obj, Age) :- furniture(Obj), Age>100.
Here we see a conjunction of two goals: an object Obj with age Age is an antique piece
of furniture if it is a piece of furniture AND its age is more than a 100 years.
An important data structure in Prolog is the list. The empty list is denoted by [], [a] is a list with head a and tail [], [a,b,c] is a list with head a and tail [b,c].
Many Prolog systems allow us to specify grammars. For instance, the grammar of
Figure 6.6, looks like the one in Figure 6.14, when written in Prolog. The terminal
symbols appear as lists of one element.
% Our example grammar in Definite Clause Grammar format. sn --> dn, cn. sn --> an, bn. an --> [a]. an --> [a], an. bn --> [b], [c]. bn --> [b], bn, [c]. cn --> [c]. cn --> [c], cn. dn --> [a], [b]. dn --> [a], dn, [b].
Figure 6.14 An example grammar in Prolog
The Prolog system translates these rules into Prolog clauses, also sometimes called
definite clauses, which we can investigate with the listing question:
| ?- listing(dn). dn(_3,_4) :- c(_3,a,_13), c(_13,b,_4). dn(_3,_4) :- c(_3,a,_13), dn(_13,_14), c(_14,b,_4). yes | ?- listing(sn). sn(_3,_4) :-
142 General directional top-down methods [Ch. 6 dn(_3,_13), cn(_13,_4). sn(_3,_4) :- an(_3,_13), bn(_13,_4). yes
We see that the clauses for the non-terminals have two parameter variables. The first
one represents the part of the sentence that has yet to be parsed, and the second one
represents the tail end of the first one, being the part that is not covered by the current
invocation of this non-terminal.
The built-in c-clause matches the head of its first parameter with the second
parameter, and the tail of this parameter with the third parameter. A sample Prolog
session with this grammar is presented below:
& prolog C-Prolog version 1.5 | ?- [gram1]. gram1 consulted 968 bytes .133333 sec. yes
We have now started the Prolog system, and requested it to consult the file containing
the grammar. Here, the grammar resides in a file called gram1. | ?- sn(A,[]). A = [a,b,c] ; A = [a,b,c,c] ; A = [a,b,c,c,c] . yes
We have now asked the system to generate some sentences, by passing an uninstan￾tiated variable to sn, and requesting the system to find other instantiations twice. The
Prolog system uses a depth-first searching mechanism, which is not suitable for sen￾tence generation. It will only generate sentences starting with an a, followed by a b,
and then followed by an ever increasing number of c’s.
| ?- sn([a,b,c],[]). yes | ?- sn([a,a,b,c],[]). yes
Sec. 6.7] Definite Clause grammars 143
| ?- sn([a,b,c,c],[]). yes | ?- sn([a,a,a,b,b,c,c,c],[]). no| ?- halt. [ Prolog execution halted ] &
Here we have asked the system to recognize some sentences, including two on which
the naive backtracking parser of Section 6.6.1 failed: aabc and abcc. This session
demonstrates that we can use Definite Clause Grammars for recognizing sentences, and
to a lesser extent also for generating sentences.
Cohen and Hickey [CF 1987] discuss this and other applications of Prolog in
parsers in more detail. For more information on Prolog, see Programming in Prolog by
William F. Clocksin and Christopher S. Mellish (Springer-Verlag, Berlin, 1981).`

const GeneralDirectionalTopDownMethods = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
export default GeneralDirectionalTopDownMethods