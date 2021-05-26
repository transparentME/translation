import MarkdownTransfer from '../../components/MarkdownTransfer'

const content =`As explained in Section 3.3.2, bottom-up parsing is conceptually very simple. At all
times we are in the possession of a sentential form that derives from the input text
through a series of left-most reductions (which mirrored right-most productions).
There is a cut somewhere in this sentential form which separates the already reduced
part (on the left) from the yet unexamined part (on the right). See Figure 7.1. The part
on the left is called the “stack” and the part on the right “rest of input”. The latter con￾tains terminal symbols only, since it is an unprocessed part of the original sentence,
while the stack contains a mixture of terminals and non-terminals, resulting from
recognized right-hand sides. We can complete the picture by keeping the partial parse
trees created by the reductions attached to their non-terminals. Now all the terminal
symbols of the original input are still there; the terminals in the stack are one part of
them, another part is semi-hidden in the partial parse trees and the rest is untouched in
the rest of the input. No information is lost, but some structure has been added. When
the bottom-up parser has reached the situation where the rest of the input is empty and
the stack contains only the start symbol, we have achieved a parsing and the parse tree
will be dangling from the start symbol. This view clearly exposes the idea that parsing
is nothing but structuring the input.
tg Nf te td Nc Nb ta t1 t2 t3 . .
CUT
STACK REST OF INPUT
terminals
and
non-terminals
terminals
only
partial parse
trees
Figure 7.1 The structure of a bottom-up parse
The cut between stack and rest of input is often drawn as a gap, for clarity and
since in actual implementations the two are often represented quite differently in the
Ch. 7] General bottom-up parsing 145
parser.
tg Nf te td Nc Nb ta t1 t2 t3 . . ....... tg Nf te td Nc Nb ta t1 ....... t2 t3 . .
shifting t1
Figure 7.2 A shift move in a bottom-up automaton
tg Nf te td Nc Nb ta ....... t1 t2 t3 . . tg Nf te td R....... t1 t2 t3 . . NcNbta . . . . . . . . . . . . ...... . . . . . . . . . . . . . ......
reducing NcNbta
to R
Figure 7.3 A reduce move in a bottom-up automaton
Our non-deterministic bottom-up automaton can make only two moves: shift and
reduce; see Figures 7.2 and 7.3. During a shift, a (terminal) symbol is shifted from the
rest of input to the stack; t1
is shifted in Figure 7.2. During a reduce move, a number
of symbols from the right end of the stack, which form the right-hand side of a rule for
a non-terminal, are replaced by that non-terminal and are attached to that non-terminal
as the partial parse tree. NcNbta
is reduced to R in Figure 7.3; note that the original
NcNbta
are still present inside the partial parse tree. There would, in principle, be no
harm in performing the instructions backwards, an unshift and unreduce, although they
would seem to move us away from our goal, which is to obtain a parse tree. We shall
see that we need them to do backtracking.
At any point in time the machine can either shift (if there is an input symbol left)
or not, or it can do one or more reductions, depending on how many right-hand sides
can be recognized. If it cannot do either, it will have to resort to the backtrack moves,
146 General bottom-up parsing [Ch. 7
to find other possibilities. And if it cannot even do that, it is finished, and has found all
(zero or more) parsings.
7.1 PARSING BY SEARCHING
The only problem left is how to guide the automaton through all of the possibilities.
This is easily recognized as a search problem, which can be handled by a depth-first or
a breadth-first method. We shall now see how the machinery operates for both search
methods. Since the effects are exponential in size, even the smallest example gets quite
big and we shall use the unrealistic grammar of Figure 7.4. The test input is aaaab.
1. SS -> a S b
2. S -> S a b
3. S -> a a a
Figure 7.4 A simple grammar for demonstration purposes
(a) aaaab
(b) a aaab
(c) aa aab
(d) aaa3 ab
(e) aaa3a3 b
(f) aaa3a3b
(g) aaa3a3 b
(h) aS b aa3a
(i) aSb1 aa3a
(j) S aSb aa3a
(k) aSb aa3a
(l) aS b aa3a
(m) aaa3a b
(n) aaa3 ab
(o) S ab aaa
(p) Sa b aaa
(q) Sab2 aaa
(r) S Sab aaa
(s) Sab aaa
(t) Sa b aaa
(u) S ab aaa
(v) aaa ab
(w) aa aab
(x) a aaab
(y)  aaaab
Figure 7.5 Stages for the depth-first parsing of aaaab
7.1.1 Depth-first (backtracking) parsing
Refer to Figure 7.5, where the gap for a shift is shown as  and that for an unshift as  .
At first the gap is to the left of the entire input (a) and shifting is the only alternative;
likewise with (b) and (c). In (d) we have a choice, either to shift, or to reduce using rule
3; we shift, but remember the possible reduction(s); the rule numbers of these are
Sec. 7.1] Parsing by searching 147
shown as subscripts to the symbols in the stack. Idem in (e). In (f) we have reached a
position in which shift fails, reduce fails (there are no right-hand sides aaaab, aaab, aab, ab or b) and there are no stored alternatives. So we start backtracking by unshift￾ing (g). Here we find a stored alternative, “reduce by 3”, which we apply (h), deleting
the index for the stored alternative in the process; now we can shift again (i). No more
shifts are possible, but a reduce by 1 gives us a parsing (j). After having enjoyed our
success we unreduce (k); note that (k) only differs from (i) in that the stored alternative
1 has been consumed. Unshifting, unreducing and again unshifting brings us to (n)
where we find a stored alternative, “reduce by 3”. After reducing (o) we can shift
again, twice (p, q). A “reduce by 2” produces the second parsing (r). The rest of the
road is barren: unreduce, unshift, unshift, unreduce (v) and three unshifts bring the
automaton to a halt, with the input reconstructed (y).
(a1) initial
(b1) a shifted from a1
(c1) aa shifted from b1
(d1) aaa shifted from c1
(d2) S reduced from d1
aaa
(e1) aaaa shifted from d1
(e2) Sa shifted from d2
aaa
(e3) aS reduced from e1
aaa
(f1) aaaab shifted from e1
(f2) Sab shifted from e2
aaa
(f3) aSb shifted from e3
aaa
(f4) S reduced from f2
Sab aaa
(f5) S reduced from f3
aSb aaa
Figure 7.6 Stages for the breadth-first parsing of aaaab
7.1.2 Breadth-first (on-line) parsing
Breadth-first bottom-up parsing is simpler than depth-first, at the expense of a far
larger memory requirement. Since the input symbols will be brought in one by one
(each causing a shift, possibly followed by some reduces), our representation of a par￾tial parse will consist of the stack only, together with its attached partial parse trees.
We shall never need to do an unshift or unreduce. Refer to Figure 7.6. We start our
solution set with only one empty stack (a1). Each parse step consist of two phases; in
phase one the next input symbol is appended to the right of all stacks in the solution set;
in phase two all stacks are examined and if they allow one or more reductions, one or
more copies are made of it, to which the reductions are applied. This way we will never
miss a solution. The first and second a are just appended (b1, c1), but the third allows a
reduction (d2). The fourth causes one more reduction (e2) and the fifth gives rise to
two reductions, each of which produces a parsing (f4 and f5).
148 General bottom-up parsing [Ch. 7
7.1.3 A combined representation
The configurations of the depth-first parser can be combined into a single graph; see
Figure 7.7(a) where numbers indicate the order in which the various shifts and reduces
are performed. Shifts are represented by lines to the right and reduces by upward
arrows. Since a reduce often combines a number of symbols, the additional symbols are
brought in by arrows that start upwards from the symbols and then turn right to reach
the resulting non-terminal. These arrows constitute at the same time the partial parse
tree for that non-terminal. Start symbols in the right-most column with partial parse
trees that span the whole input head complete parse trees.
a a a a b 1 2 3 4 S 5 b 6 S 7 S 8 a b 9 10
S
11
(a)
a a a a b 1 2 4 7 S 6 b 8 S
10
S 3 a b 5 9 S
11
(b)
Figure 7.7 The configurations of the parsers combined
If we complete the stacks in the solution sets in our breadth-first parser by
appending the rest of the input to them, we can also combine them into a graph, and,
what is more, into the same graph; only the action order as indicated by the numbers is
different, as shown in Figure 7.7(b). This is not surprising, since both represent the
total set of possible shifts and reduces; depth-first and breadth-first are just two dif￾ferent ways to visit all nodes of this graph. Figure 7.7(b) was drawn in the same form
as Figure 7.7(a); if we had drawn the parts of the picture in the order in which they are
executed by the breadth-first search, many more lines would have crossed. The picture
would have been equivalent to (b) but much more complicated to look at.
7.1.4 A slightly more realistic example
The above algorithms are relatively easy to understand and implement†
and although
they require exponential time in general, they behave reasonably well on a number of
grammars. Sometimes, however, they will burst out in a frenzy of senseless activity,
even with an innocuous-looking grammar (especially with an innocuous-looking gram￾mar!). The grammar of Figure 7.8 produces algebraic expressions in one variable, a,
and two operators, + and -. Q is used for the operators, since O (oh) looks too much like
0 (zero). This grammar is unambiguous and for a-a+a it has the correct production
tree ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† See, for instance, Hext and Roberts [CF 1970] for Dömölki’s method to find all possible
reductions simultaneously.
Sec. 7.1] Parsing by searching 149
+ - a a a
which restricts the minus to the following a rather than to a+a. Figure 7.9 shows the
graph searched while parsing a-a+a. It contains 108 shift lines and 265 reduce arrows
and would fit on the page only thanks to the exceedingly fine print the phototypesetter
is capable of. This is exponential explosion.
SS -> E E -> E Q F E -> F F -> a Q -> + Q -> -
Figure 7.8 A grammar for expressions in one variable
7.2 TOP-DOWN RESTRICTED BREADTH-FIRST BOTTOM-UP PARSING
In spite of their occasionally vicious behaviour, breadth-first bottom-up parsers are
attractive since they work on-line, can handle left-recursion without any problem and
can generally be doctored to handle ε-rules. So the question remains how to curb their
needless activity. Many methods have been invented to restrict the search breadth to at
most 1, at the expense of the generality of the grammars these methods can handle; see
Chapter 9. A method that will restrict the fan-out to reasonable proportions while still
retaining full generality was developed by Earley [CF 1970].
7.2.1 The Earley parser without look-ahead
When we take a closer look at Figure 7.9, we see after some thought that many reduc￾tions are totally pointless. It is not meaningful to reduce the third a to E or S since these
can only occur at the end if they represent the entire input; likewise the reduction of
a-a to S is absurd, since S can only occur at the end. Earley noticed that what was
wrong with these spurious reductions was that they were incompatible with a top-down
parsing, that is: they could never derive from the start symbol. He then gave a method
to restrict our reductions only to those that derive from the start symbol. We shall see
that the resulting parser takes at most n3
units of time for input of length n rather than
Cn.
Earley’s parser can also be described as a breadth-first top-down parser with
bottom-up recognition, which is how it is explained by the author [CF 1970]. Since it
can, however, handle left-recursion directly but needs special measures to handle ε-
rules, we prefer to treat it as a bottom-up method.
We shall again use the grammar from Figure 7.8 and parse the input a-a+a. Just
as in the non-restricted algorithm, we have at all times a set of partial solutions which
is modified by each symbol we read. We shall write the sets between the input symbols
150 General bottom-up parsing [Ch. 7 a - a + aFES Q aFES F + aFES Q aFES E + aFES Q aFES E S + aFES Q aFES Q a + aFES Q aFES F + aFES Q aFES E + aFES Q aFES E S + aFES Q aFES F - a + aFES Q aFES F + aFES Q aFES E + aFES Q aFES E S + aFES Q aFES Q a + aFES Q aFES F + aFES Q aFES E + aFES Q aFES E S + aFES Q aFES E - a + aFES Q aFES F + aFES Q aFES E + aFES Q aFES E S + aFES Q aFES Q a + aFES Q aFES F + aFES Q aFES E + aFES Q aFES E S + aFES Q aFES E E S - a + aFES Q aFES F + aFES Q aFES E + aFES Q aFES E S + aFES Q aFES Q a + aFES Q aFES F + aFES Q aFES E + aFES Q aFES E S + aFES Q aFES
Figure 7.9 The graph searched while parsing a-a+a
Sec. 7.2] Top-down restricted breadth-first bottom-up parsing 151
as we go; we have to keep earlier sets, since they will still be used by the algorithm.
Unlike the non-restricted algorithm, in which the sets contained stacks, the sets consist
of what is technically known as items, or Earley items to be more precise. An item is a
grammar rule with a gap in its right-hand side; the part of the right-hand side to the left
of the gap (which may be empty) has already been recognized, the part to the right of
the gap is predicted. The gap is traditionally shown as a fat dot: . Items are for
instance: E-> EQF, E->E QF, E->EQ F, E->EQF , F->a , etc. It is unfortunate when a
vague every-day term gets endowed with a very specific technical meaning, but the
expression has taken hold, so it will have to do. An Earley item is an item with an indi￾cation of the position of the symbol at which the recognition of the recognized part
started. Notations vary, but we shall write @n after the item (read: “at n”). If the set at
the end of position 7 contains the item E->E QF@3, we have recognized an E in posi￾tions 3, 4, 5, 6, 7 and are looking forward to recognizing QF.
The sets of items contain exactly those items a) of which the part before the dot
has been recognized so far and b) of which we are certain that we shall be able to use
the result when they will happen to be recognized in full (but we cannot, of course, be
certain that that will happen). If a set contains the item E->E QF@3, we can be sure that
when we will have recognized the whole right-hand side EQF, we can go back to the set
at the beginning of symbol number 3 and find there an item that was looking forward to
recognizing an E, i.e., that had an E with a dot in front of it. Since that is true recur￾sively, no recognition will be in vain.
7.2.1.1 The Scanner, Completer and Predictor
The construction of an item set from the previous item set proceeds in three phases.
The first two correspond to those of the non-restricted algorithm, where they were
called “shift” and “reduce”; here they are called “Scanner” and “Completer”. The third
is new and is related to the top-down component; it is called “Predictor”.
items after
previous
symbol
itemset
p−1 σp
items
completed
by σp
completed
p
active
items
after σp
predicted
items
. . . . . . . . . . . . . . . . . .
act/pred
p = itemset
p
Figure 7.10 The Earley items sets for one input symbol
The Scanner, Completer and Predictor deal with four sets of items for each token
in the input. Refer to Figure 7.10, where the input symbol σp at position p is sur￾rounded by the four sets: itemsetp −1, which contains the items available just before σp;
completedp, the set of items that have become completed due to σp; activep, which
contains the non-completed items that passed σp; and predictedp, the set of newly
predicted items. The sets activep and predictedp
together form itemsetp; the internal
152 General bottom-up parsing [Ch. 7
division will be indicated in the drawings by a dotted line. Initially, itemsetp −1
is filled
(as a result of processing σp −1) and the other sets are empty; the construction of item￾set 0
is special.
The Scanner looks at σp, goes through itemsetp −1 and makes copies of all items
that contain σ (all other items are ignored); in those, the part before the dot was
already recognized and now σ is recognized. Consequently, the Scanner changes σ
into σ . If the dot is now at the end, it stores the item in the set completedp; otherwise
it stores it in the set activep.
Next the Completer inspects completedp, which contains the items that have just
been recognized completely and can now be reduced. This reduction goes as follows.
For each item of the form R→ . . . @m the Completer goes to itemsetm −1, and calls the
Scanner; the Scanner, which was used to work on the σp
found in the input and
itemsetp −1, is now directed to work on the R recognized by the Completer and
itemsetm −1. It will make copies of all items in itemsetm −1
featuring a R, replace the R
by R and store them in either completedp or activep, as appropriate. This can add
indirectly recognized items to the set completedp, which means more work for the
Completer. After a while, all completed items have been reduced, and the Predictor’s
turn has come.
The Predictor goes through the sets activep
(which was filled by the Scanner) and
predictedp
(which is empty initially), and considers all non-terminals which have a dot
in front of them; these we expect to see in the input. For each expected (predicted)
non-terminal N and for each rule for that non-terminal N→P . . . , the Predictor adds an
item N→ P . . . @p +1 to the set predictedp. This may introduce new predicted non￾terminals (for instance, P) in predictedp which cause more predicted items. After a
while, this too will stop.
The sets activep and predictedp
together form the new itemsetp. If the completed
set for the last symbol in the input contains an item S→ . . . @1, i.e., an item spanning
the entire input and reducing to the start symbol, we have found at least one parsing.
Now refer to Figure 7.11, which shows the items sets of the Earley parser working
on a-a+a. The initial active item set active 0
is {S-> E@1}, indicating that this is the
only item that can derive directly from the start symbol. The Predictor first predicts
E-> EQF@1, from this E-> EQF@1 and E-> F@1 (but the first one is in the set already)
and from the last one F-> a@1. This gives itemset 0.
The Scanner working on itemset 0 and scanning for an a, only catches F-> a@1,
which it turns into F->a @1 and stores in completed 1. This not only means that we
have recognized and reduced an F, but also that we have a buyer for it. The Completer
goes to the set itemset 0 and copies all items that have F. Result: one item, E-> F@1,
which turns into E->F @1 and is again stored in completed 1. More work for the Com￾pleter, which will now copy items containing E; result: two items, S-> E@1 which
becomes S->E @1 and goes to the completed set, and E-> EQF@1 which becomes
E->E QF@1 and which becomes the first and only member of active 1. The completion
of S yields no new information.
The Predictor working on active 1 has an easy job: Q causes two items for Q, both
with @2, since that is where recognition will have started, if it occurs at all. Nothing
spectacular happens until the Scanner processes the second a; from itemset 2
it extracts
F-> a@3 which gives F->a @3 which is passed to the Completer (through com￾pleted 3
). The latter sees the reduction of a to F starting at position 3, goes to itemset 2
to see who ordered an F, and finds E->EQ F@1; given the F, this turns into E->EQF @1,
Sec. 7.2] Top-down restricted breadth-first bottom-up parsing 153
S-> E @1 E-> EQF@1 E-> F @1 F-> a @1 . . . . . . . . . . . . . . . . . .
act/pred0 = itemset0 a1 F->a @1 E->F @1 S->E @1
completed1 E->E QF@1 Q-> + @2 Q-> - @2 . . . . . . . . . . . . . . . . . .
act/pred1 = itemset1 -2 Q->- @2
completed2 E->EQ F@1 F-> a @3 . . . . . . . . . . . . . . . . . .
act/pred2 = itemset2 a3 F->a @3 E->EQF @1 S->E @1
completed3 E->E QF@1 Q-> + @4 Q-> - @4 . . . . . . . . . . . . . . . . . .
act/pred3 = itemset3 +4 Q->+ @4
completed4 E->EQ F@1 F-> a @5 . . . . . . . . . . . . . . . . . .
act/pred4 = itemset4 a5 F->a @5 E->EQF @1 S->E @1
completed5 E->E QF@1
active5
Figure 7.11 Items sets of the Earley parser working on a-a+a
which in its turn signals the reduction to E of the substring from 1 to 3 (again through
completed 3
). The Completer checks itemset 0 and finds two clients there for the E: S-> E@1 and E-> EQF@1; the first ends up as S->E @1 in completed 3, the second as
E->E QF@1 in active 3.
After the last symbol has been processed by the Scanner, we still run the Com￾pleter to do the final reductions, but running the Predictor is useless, since there is noth￾ing to predict any more. Note that the parsing started by calling the Predictor on the ini￾tial active set and that there is one Predictor/Scanner/Completer action for each sym￾bol. Since the last completed set indeed contains an item S->E @1, there is at least one
parsing.
7.2.1.2 Constructing a parse tree
All this does not directly give us a parse tree. As is more often the case in parser con￾struction (see, for instance, Section 4.1) we have set out to build a parser and have
ended up building a recognizer. The intermediate sets, however, contain enough infor￾mation about fragments and their relations to construct a parse tree easily. As with the
CYK parser, a simple top-down Unger-type parser can serve for this purpose, since the
Unger parser is very interested in the lengths of the various components of the parse
tree and that is exactly what the sets in the Earley parser provide. In his 1970 article,
Earley gives a method of constructing the parse tree(s) while parsing, by keeping with
each item a pointer back to the item that caused it to be present. Tomita [CF 1986, p.
74-77] has, however, shown that this method will produce incorrect parse trees on cer￾tain ambiguous grammars.
From the set completed 5
in Figure 7.11, which is the first we inspect after having
finished the set construction, we see that there is a parse possible with S for a root and
extending over symbols 1 to 5; we designate the parse root as S1−5
in Figure 7.12.
154 General bottom-up parsing [Ch. 7
Given the completed item S->E @1 in completed 5
there must be a parse node E1−5,
which is completed at 5. Since all items completed after 5 are contained in completed 5,
we scan the latter to find a completed E starting at 1; we find E->EQF @1. This gives
us parse tree (a), where the values at the question marks are still to be seen. Since items
are recognized at their right ends, we start by finding a parse for the F?−5, to be found
in completed 5. We find F->a @5, giving us parse tree (b). It suggests that we find a
parse for Q?−4
completed after 4; in completed 4 we find Q->+ @4. Consequently Q?−4
is Q4−4
and the E1−?
in (b) must be E1−3. This makes us look in completed 3
for an
E->...@1, where we find E->EQF @1. We now have parse tree (c), and, using the
same techniques, we easily complete it (d).
S1-5 E1-5 E1-? Q?-? F?-5
(a)
S1-5 E1-5 E1-? Q?-4 F5-5 a5
(b)
S1-5 E1-5 E1-3 Q4-4 F5-5 E1-? Q?-? F?-3 +4 a5
(c)
S1-5 E1-5 E1-3 Q4-4 F5-5 E1-1 Q2-2 F3-3 +4 a5 F1-1 -2 a3 a1
(d)
Figure 7.12 Construction of the parse trees
Sec. 7.2] Top-down restricted breadth-first bottom-up parsing 155
7.2.1.3 Space and time requirements
It is interesting to have a look at the space and time needed for the construction of the
sets. First we calculate the maximum size of the sets just after symbol number p. There
is only a fixed number of different items, I, limited by the size of the grammar; for our
grammar it is I =14. However, each item can occur with any of the additions @1 to
@p +1, of which there are p +1. So the number of items in the set itemsetp
is limited to
I×(p +1). The exact calculation of the maximum number of items in each of the sets is
complicated by the fact that different rules apply to the first, last and middle items.
Disregarding these complications, we find that the maximum number of items in all
itemsets up to p is roughly I×p2 /2. The same applies to the completed sets. So, for an
input of length n, the memory requirement is O(n2
), as with the CYK algorithm. In
actual practice, the amount of memory used is often far less than this theoretical max￾imum. In our case all sets together could conceivably contain about 14×52=350 items,
with which the actual number of 4+3+3+1+2+3+3+1+2+3+1=26 items compares very
favourably.
Although a set at position p can contain a maximum of O(p) items, it may require
an amount of work proportional to p2
to construct that set, since each item could, in
principle, be inserted by the Completer once from each preceding position. Under the
same simplifying assumptions as above, we find that the maximum number of actions
needed to construct all sets up to p is roughly I×p3 /6. So the total amount of work
involved in parsing a sentence of length n with the Earley algorithm is O(n3
), as it is
with the CYK algorithm. Again, in practice it is much better: on many grammars,
including the one from Figure 7.8, it will work in linear time (O(n)) and on any unam￾biguous grammar it will work in O(n2
). In our example, a maximum of about
14×53 /6−∼300 actions might be required, compared to the actual number of 28 (both
items for E in predicted 0 were inserted twice).
It should be noted that once the calculation of the sets is finished, only the com￾pleted sets are consulted. The active and predicted sets can be thrown away to make
room for the parse tree(s).
The practical efficiency of this and the CYK algorithms is not really surprising,
since in normal usage most arbitrary fragments of the input will not derive from any
non-terminal. The sentence fragment “letter into the upper left-most” does not
represent any part of speech, nor does any fragment of it of a size larger than one. The
O(n2) and O(n3) bounds only materialize for grammars in which almost all non￾terminals produce almost all substrings in almost all combinatorially possible ways, as
for instance in the grammar S->SS, S->x.
7.2.2 The relation between the Earley and CYK algorithms
The similarity in the time and space requirement between the Earley and the CYK
algorithm suggest a deeper relation between the two and indeed there is one. The Ear￾ley sets can be accommodated in a CYK-like grid; see Figure 7.13. To stress the simi￾larity, the sets are distributed over diagonals of boxes slanting from north-west to
south-east. Since the columns indicate the beginnings of possibly recognized frag￾ments, all items with the same @p come in the same column. This arrangement assigns
a natural position to each item. Completed items are drawn in the top left corner of a
box, active items in the bottom right corner. Predicted items have not yet recognized
anything and live in the bottom layer.
When we compare this picture to that produced by the CYK parser (Figure 7.14)
156 General bottom-up parsing [Ch. 7 E->EQF S->EE->E QF E->EQ F E->EQF S->EE->E QF E->EQ F F->a E->F S->EE->E QF S-> E E-> EQF E-> E F-> a Q->- Q-> + Q-> - F->a F-> a Q->+ Q-> + Q-> - F->a F-> a 012345
length
recognized
@1 @2 @3 @4 @5 a1
set0 -2
set1 a3
set2 +4
set3 a5
set4
set5
part of
comple￾ted
p
part of
active
p
set
p
predict￾ions
Figure 7.13 The Earley sets represented in CYK fashion
we see correspondences and differences. Rather than having items, the boxes contain
non-terminals only. All active and predicted items are absent. The left-hand sides of the
completed items also occur in the CYK picture, but the latter features more recognized
non-terminals; from the Earley picture we know that these will never play a role in any
parse tree. The costs and the effects of the top-down restriction are clearly shown.
The correspondence between the Earley and the CYK algorithms has been
analysed by Graham and Harrison [CF 1976]. This has resulted in a combined algo￾rithm described by Graham, Harrison and Ruzzo [CF 1980].
7.2.3 Ambiguous sentences
Calculating the sets for a parsing of an ambiguous sentence does not differ from that
for an unambiguous one. Some items will be inserted more than once into the same set,
but that can happen even with unambiguous sentences. The parse trees will be faith￾fully produced by the Unger parser; when searching a completed set for items of the
Sec. 7.2] Top-down restricted breadth-first bottom-up parsing 157
ESESFES Q ESFES Q FES 12345
length
recognized @1 @2 @3 @4 @5 a1 -2 a3 +4 a5
Figure 7.14 CYK sets for the parsing of Figure 7.11
form A→ . . . @p, it may find several. Each will produce a different parse tree (or set
of parse trees if further ambiguities are found). There may be exponentially many parse
trees (even though the work to produce the sets is limited to O(n3
)) or even infinitely
many of them. Infinite ambiguity is cut out automatically by the Unger parser, but
exponential numbers of parse trees will just have to be suffered. If they are essential to
the application, Tomita [CF 1986, p. 17-20] has given an efficient packing method for
them.
The enumeration of all possible parse trees is often important, since many
methods augment the CF grammar with more long-range restrictions formulated out￾side the CF framework, to thus approximate a context-sensitive analysis. To this end,
all parse trees are produced and checked; only those that meet the restrictions are
accepted.
Figure 7.15 shows the sets for the parsing of an ambiguous sentence xxx accord￾ing to the grammar S->SS, S->x; again an artificial example is the only one which can
be shown, for reasons of size. Figure 7.16 gives the parse trees. There is only one root
in completed 3: S->SS @1, leading to parse tree (a). Looking up a parsing for S?−3
in
completed 3, we come up with three possibilities: S-> x@3, S->SS @2 and S->SS @1.
The first and second lead to parse trees (b) and (c) but the third is suppressed by the
Unger parser (it would lead to infinite recursion). No further ambiguities occur and the
final parse trees are found in (d) and (e). All this is the same as in the CYK parser.
7.2.4 Handling ε-rules
Like most parsers, the above parser cannot handle ε-rules without special measures. ε-
rules show up first as an anomaly in the work of the Predictor. While predicting items
of the form A→ . . . @p +1 as a consequence of having a A in an item in activep or
158 General bottom-up parsing [Ch. 7 S-> SS@1 S-> x @1 . . . . . . . . . . . . . . . . . .
act/pred0 = itemset0 x1 S->x @1
completed1 S->S S@1 S-> SS@2 S-> x @2 . . . . . . . . . . . . . . . . . .
act/pred1 = itemset1 x2 S->x @2 S->SS @1
completed2 S->S S@2 S->S S@1 S-> SS@3 S-> x @3 . . . . . . . . . . . . . . . . . .
act/pred2 = itemset2 x3 S->x @3 S->SS @2 S->SS @1
completed3 S->S S@3 S->S S@2 S->S S@1
active3
Figure 7.15 Parsing of xxx according to S->SS, S->x S1-3 S1-? S?-3
(a)
S1-3 S1-2 S3-3 x3
(b)
S1-3 S1-1 S2-3 S2-? S?-3
(c)
S1-3 S1-2 S3-3 S1-1 S2-2 x3 x1 x2
(d)
S1-3 S1-1 S2-3 x1 S2-2 S3-3 x2 x3
(e)
Figure 7.16 Parse tree construction for the parsing of Figure 7.15
predictedp, it may stumble upon an empty prediction A→ @p +1; this means that the
non-terminal A has been completed just before symbol number p +1 and this completed
item should be added to the set completedp, which up to now only contained items with
@p at most. So we find that there was more work for the Completer after all. But that is
not the end of the story. If we now run the Completer again, it will draw the conse￾quences of the newly completed item(s) which have @p +1. So it will consult itemsetp,
which is, however, incomplete since items are still being added to its constituents,
activep and predictedp. If it finds occurrences of A there, it will add copies with A
instead; part of these may require new predictions to be done (if the dot lands in front
Sec. 7.2] Top-down restricted breadth-first bottom-up parsing 159
of another non-terminal), part may be completed items, which will have to go into
completedp and which mean more work for the Completer. The latter items can have a
starting point lower than p, which brings in items from further back, which may or may
not now be completed through this action or through empty completed items at p.
The easiest way to handle this mare’s nest is to stay calm and keep running the
Predictor and Completer in turn until neither has anything more to add. Since the
number of items is finite this will happen eventually, and in practice it happens rather
sooner than later.
The Completer and Predictor loop has to be viewed as a single operation called
“X” by Graham, Harrison and Ruzzo [CF 1980]. Just like the Predictor it has to be
applied to the initial state, to honour empty productions before the first symbol; just
like the Completer it has to be applied to the final state, to honour empty productions
after the last symbol.
Part of the effects are demonstrated by the grammar of Figure 7.17 which is based
on a grammar similar to that of Figure 7.8. Rather than addition and subtraction, this
one handles multiplication and division, with the possibility to omit the multiplication
sign: aa means a×a. SS -> E E -> E Q F E -> F F -> a Q -> × Q -> / Q -> ε
Figure 7.17 A grammar with an ε-rule
The parsing is given in Figure 7.18. The items pointed at by a have been added
by a second pass of the Completer/Predictor. The Q-> @2, inserted by the Predictor
into completed 1 as a consequence of E->E QF@1 in active 1, is picked up by the second
pass of the Completer, and is used to clone E->E QF@1 in active 1
into E->EQ F@1.
This in turn is found by the Predictor which predicts the item F-> a@2 from it. Note
that we now do have to consider the full active/predicted set after the last symbol; its
processing by the Completer/Predictor may insert an item of the form S->...@1 in the
last completed set, indicating a parsing.
7.2.5 Prediction look-ahead
In the following we shall describe a series of increasingly complicated (and more effi￾cient) parsers of the Earley type; somewhere along the line we will also meet a parser
that is (almost) identical to the one described by Earley in his paper.
When we go back to Figure 7.11 and examine the actions of the Predictor, we see
that it sometimes predicts items that it could know were useless if it could look ahead
at the next symbol. When the next symbol is a -, it is kind of foolish to proudly predict
Q-> +@2. The Predictor can of course easily be modified to check such simple cases,
but it is possible to have a Predictor that will never predict anything obviously errone￾ous; all its predicted items will be either completed or active in the next set. (The pred￾ictions may, however, fail on the symbol after that; after all, it is a Predictor, not an
160 General bottom-up parsing [Ch. 7 S-> E @1 E-> EQF@1 E-> F @1 F-> a @1 . . . . . . . . . . . . . . . . . .
act/pred0 = itemset0 a1 F->a @1 E->F @1 S->E @1 Q-> @2
completed1 E->E QF@1 E->EQ F@1 Q-> × @2 Q-> / @2 F-> a @2 . . . . . . . . . . . . . . . . . .
act/pred1 = itemset1 a2 F->a @2 E->EQF @1 S->E @1 Q-> @3
completed2 E->E QF@1 E->EQ F@1 Q-> × @3 Q-> / @3 F-> a @3 . . . . . . . . . . . . . . . . . .
act/pred2 = itemset2 /3 Q->/ @3
completed3 E->EQ F@1 F-> a @4 . . . . . . . . . . . . . . . . . .
act/pred3 = itemset3 a4 F->a @4 E->EQF @1 S->E @1 Q-> @5
completed4 E->E QF@1 E->EQ F@1 Q-> × @5 Q-> / @5 F-> a @5 . . . . . . . . . . . . . . . . . .
act/pred4 = itemset4
Figure 7.18 Recognition of empty productions in an Earley parser
Oracle.)
To see how we can obtain such a perfect Predictor we need a different example
(after removing Q-> +@2 and Q-> -@4 from Figure 7.11 all predictions there come
true, so nothing can be gained any more).
S’S -> S S -> A | AB | B FIRST(S) = {p, q} A -> C FIRST(A) = {p} B -> D FIRST(B) = {q} C -> p FIRST(C) = {p} D -> q FIRST(D) = {q}
Figure 7.19 A grammar for demonstrating prediction look-ahead and its FIRST sets
The artificial grammar of Figure 7.19 produces nothing but the three sentences p, q and pq, and does so in a straightforward way. The root is S’ rather than S, which is a
convenient way to have a grammar with only one rule for the root. This is not neces￾sary but it simplifies the following somewhat, and it is usual in practice.
S’-> S @1 S-> A @1 S-> AB @1 S-> B @1 A-> C @1 B-> D @1 C-> p @1 D-> q @1 . . . . . . . . . . . . . . . . . .
act/pred0 = itemset0 q1 D->q @1 B->D @1 S->B @1 S’->S @1
completed1 . . . . . . . . . . . . . . . . . .
act/pred1 = itemset1
(a)
S’-> S @1 S-> B @1 B-> D @1 D-> q @1 . . . . . . . . . . . . . . . . . .
act/pred0 = itemset0 q1 D->q @1 B->D @1 S->B @1 S’->S @1
completed1 . . . . . . . . . . . . . . . . . .
act/pred1 = itemset1
(b)
Figure 7.20 Parsing the sentence q without look-ahead (a) and with look-ahead (b)
The parsing of the sentence q is given in Figure 7.20(a) and (b). Starting from the
Sec. 7.2] Top-down restricted breadth-first bottom-up parsing 161
initial item, the Predictor predicts a list of 7 items (a). Looking at the next symbol, q,
the Predictor could easily avoid the prediction C-> p@1, but several of the other pred￾ictions are also false, for instance, A-> C@1. The Predictor could avoid the first since it
sees that it cannot begin with q; if it knew that C cannot begin with a q, it could also
avoid A-> C@1. (Note that itemset 1
is empty, indicating that there is no way for the
input to continue.)
The required knowledge can be obtained by calculating the FIRST sets of all
non-terminals in the grammar (FIRST sets and a method of calculating them are
explained in Sections 8.2.1.1 and 8.2.2.1). The use of the FIRST sets is very effective:
the Predictor again starts from the initial item, but since it knows that q is not in
FIRST(A), it will not predict S-> A@1. Items like A-> C@1 do not even have to be
avoided, since their generation will never be contemplated in the first place. Only the
B-line will be predicted (b) and it will consist of three predictions, all of them to the
point.
S’S -> S S -> A | AB | B FIRST(S) = {ε, p, q} A -> C FIRST(A) = {ε, p} B -> D FIRST(B) = {q} C -> p | ε FIRST(C) = {ε, p} D -> q FIRST(D) = {q}
Figure 7.21 A grammar with an ε-rule and its FIRST sets
Handling ε-rules is easier now: we know for every non-terminal whether it can
produce ε (in which case ε is in the FIRST set of that non-terminal). If we add a rule
C->ε to our grammar (Figure 7.21), the entire picture changes. Starting from the initial
item S’-> S@1 (Figure 7.22), the Predictor will still not predict S-> A@1 since
FIRST(A) does not contain q, but it will predict S-> AB@1 since FIRST(AB) does con￾tain a q (B combined with the transparency of A). The line continues by predicting
A-> C@1, but C-> @1 is a completed item and goes into completed 0. When the Com￾pleter starts, it finds C-> @1, applies it to A-> C@1 and produces A->C @1, likewise
completed. The latter is then applied to S-> AB@1 to produce the active item
S->A B@1. This causes another run of the Predictor, to follow the new B, but all those
items have already been added.
Bouckaert, Pirotte and Snelling, who have analysed variants of the Earley parsers
for two different look-ahead regimes [CF 1975], show that predictive look-ahead
reduces the number of items by 20 to 50% or even more on “practical” grammars.
7.2.6 Reduction look-ahead
Once we have gone through the trouble of calculating the FIRST sets, we can use them
for a second type of look-ahead: reduction look-ahead. Prediction look-ahead reduces
the number of predicted items, reduction look-ahead reduces the number of completed
items. Referring back to Figure 7.11, which depicted the actions of an Earley parser
without look-ahead, we see that it does two silly completions: S->E @1 in completed 1,
and S->E @1 in completed 3. The redundancy of these completed items stems from the
fact that they are only meaningful at the end of the input. Now this may seem a very
special case, not worth testing for, but the phenomenon can be put in a more general
162 General bottom-up parsing [Ch. 7 C-> @1 A->C @1
completed0 S’-> S @1 S->A B @1 S-> AB @1 S-> B @1 A-> C @1 B-> D @1 D-> q @1 . . . . . . . . . . . . . . . . . .
act/pred0 = itemset0 q1 D->q @1 B->D @1 S->AB @1 S->B @1 S’->S @1
completed1 . . . . . . . . . . . . . . . . . .
act/pred1 = itemset1
Figure 7.22 Parsing the sentence q with the grammar of Figure 7.21
setting: if we introduce an explicit symbol for end-of-file (for instance, #), we can say
that the above items are redundant because they are followed by a symbol (- and +,
respectively) which is not in the set of symbols the item should be followed by on com￾pletion.
The trick is now to keep, together with any item, a set of symbols which may
come after that item, the reduction look-ahead set; if the item seems completed but the
next symbol is not in this set, the item is discarded. The rules for constructing the
look-ahead set for an item are straightforward, but unlike the prediction look-ahead it
cannot be calculated in advance; it must be constructed as we go. (A limited and less
effective set could be calculated statically, using the FOLLOW sets explained in
8.2.2.2.)
The initial item starts with a look-ahead set of [#] (the look-ahead set will be
shown between square brackets at the end of the item). When the dot advances in an
item, its look-ahead set remains the same, since what happens inside an item does not
affect what may come after it. When a new item is created by the Predictor, a new
look-ahead set must be composed. Suppose the item is
P→A BCD [abc ] @n
and predicted items for B must be created. We now ask ourselves what symbols may
follow the occurrence of B in this item. It is easy to see that they are:
any symbol C can start with,
if C can produce the empty string, any symbol D can start with,
if D can also produce the empty string, any of the symbols a, b and c.
Given the FIRST sets for all non-terminals, which can also tell us if a non-terminal can
produce empty, the resulting new reduction look-ahead set is easily calculated. It is also
written as FIRST(CD [abc ]), which is of course the set of first symbols of anything
produced by CDa |CDb |CDc.
The Earley sets with reduction look-ahead for our example a-a+a are given in
Figure 7.23, where we have added a # symbol in position 6. The calculation of the sets
follow the above rules. The look-ahead of the item E-> EQF[#+-]@1 in predicted 0
results from its being inserted twice: once predicted from S-> E[#]@1, which contri￾butes the #, and once from E-> EQF[…]@1, which contributes the +- from FIRST(Q).
Sec. 7.2] Top-down restricted breadth-first bottom-up parsing 163
The look-ahead … is used to indicate that the look-ahead is not yet known but does not
influence the look-ahead the item contributes.
Note that the item S->E [#]@1 is not placed in completed 1, since the actual symbol ahead (-2) is not in the item’s look-ahead set; something similar occurs in completed 3, but not in completed 5. S-> E [#] @1 E-> EQF[#+-]@1 E-> F [#+-]@1 F-> a [#+-]@1 . . . . . . . . . . . . . . . . . . . . . . . . . .
act/pred0 = itemset0 a1 F->a @1 E->F @1
completed1 E->E QF[#+-]@1 Q-> + [a] @2 Q-> - [a] @2 . . . . . . . . . . . . . . . . . . . . . . . . . .
act/pred1 = itemset1 -2 Q->- @2
completed2 E->EQ F[#+-]@1 F-> a [#+-]@3 . . . . . . . . . . . . . . . . . . . . . . . . . .
act/pred2 = itemset2 a3 F->a @3 E->EQF @1
completed3 E->E QF[#+-]@1 Q-> + [a] @4 Q-> - [a] @4 . . . . . . . . . . . . . . . . . . . . . . . . . .
act/pred3 = itemset3 +4 Q->+ @4
completed4 E->EQ F[#+-]@1 F-> a [#+-]@5 . . . . . . . . . . . . . . . . . . . . . . . . . .
act/pred4 = itemset4 a5 F->a @5 E->EQF @1 S->E @1
completed5 E->E QF[#+-]@1
active5 #6
Figure 7.23 Item sets with reduction look-ahead
As with prediction look-ahead, the gain in our example is meagre. The effectiveness in the general case is not easily determined. Earley recommends the reduction
look-ahead, but does not take into account the effort required to calculate and maintain
the look-ahead sets. Bouckaert, Pirotte and Snelling definitely condemn the reduction
look-ahead, on the grounds that it may easily double the number of items to be carried
around, but they count, for instance, E-> F[+-]@1 as two items. All in all, since the
gain from reduction look-ahead cannot be large and its implementation cost and overhead are probably considerable, it is likely that its use should not be recommended.
The well-tuned Earley/CYK parser by Graham, Harrison and Ruzzo [CF 1980] does
not feature reduction look-ahead.`

const GeneralBottomUpParsing = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
export default GeneralBottomUpParsing