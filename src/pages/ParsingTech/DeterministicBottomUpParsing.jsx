import MarkdownTransfer from '../../components/MarkdownTransfer'

const content =`There is a great variety of deterministic bottom-up parsing methods. The first deter￾ministic parsers (Wolpe [Precedence 1958], Wegstein [Precedence 1959]) were
bottom-up parsers and interest has only increased since. The annotated bibliography in
this book contains about 140 entries on deterministic bottom-up parsing against some
30 on deterministic top-down parsing. These figures may not reflect the relative
importance of the methods, they are certainly indicative of the fascination and com￾plexity of the subject of this chapter.
There are two families of deterministic bottom-up parsers, those that are purely
bottom-up and those that have an additional top-down component. The first family
comprises the precedence and bounded-context techniques, which are treated in Sec￾tions 9.1 to 9.3; the second family, which is both more powerful and more complicated,
contains the LR techniques and is treated in Sections 9.4 to 9.7. Tomita’s parser in
Section 9.8 is not purely deterministic but leans so heavily on the LR techniques that its
treatment in this chapter is warranted. The chapter closes with a short section on non￾canonical bottom-up parsing and one on the use of LR(k) as an ambiguity test.
The proper setting for the subject at hand can best be obtained by summarizing a
number of relevant facts from previous chapters.
A right-most production expands the right-most non-terminal in a sentential form,
by replacing it by one of its right-hand sides. A sentence is produced by repeated
right-most production until no non-terminal remains. See Figure 9.1 (a), where the
sentential forms are right-aligned to show how the production process creeps to
the left, where it terminates. The grammar used is that of Figure 7.8.
Each step of a bottom-up parser, working on a sentential form, identifies the latest
right-most production in it and undoes it by reducing a segment of the input to the
non-terminal it derived from. The identified segment is called the handle. Since
the parser starts with the final sentential form of the production process (that is,
the input) it finds its first reduction rather to the left end, which is convenient. A
bottom-up parser identifies right-most productions in reverse order. See Figure
9.1(b) where the handles are aligned.
To obtain an efficient parser we have to have an efficient method to identify han￾dles, without elaborate searching. The identified handle has to be correct (or the
input is in error); we do not want to consider alternative choices for handles.
Although this chapter is called “Deterministic Bottom-Up Parsing”, it is almost
Ch. 9] Deterministic bottom-up parsing 185
SE EQF EQ a E +a EQF +a EQ a+a E -a+a F -a+a a-a+a (a) a-a+a F -a+a E -a+a EQ a+a EQF +a E +a EQ a EQFES(b)
Figure 9.1 Right-most production (a) and right-most reduction (b)
exclusively concerned with methods for finding handles. Once the handle is found,
parsing is (almost always) trivial. The exceptions will be treated separately.
Unlike top-down parsing, which identifies productions right at their beginning,
that is, before any of its constituents have been identified, bottom-up parsing identifies
a production only at its very end, when all its constituents have already been identified.
A top-down parser allows semantic actions to be performed at the beginning of a pro￾duction and these actions can help in determining the semantics of the constituents. In a
bottom-up parser, semantic actions are only performed during a reduction, which
occurs at the end of a production, and the semantics of the constituents have to be
determined without the benefit of knowing in which production they occur. We see that
the increased power of bottom-up parsing comes at a price: since the decision what
production applies is postponed to the latest possible moment, that decision can be
based upon the fullest possible information, but it also means that the actions that
depend on this decision come very late.
9.1 SIMPLE HANDLE-ISOLATING TECHNIQUES
There is a situation in (more or less) daily life in which the (more or less) average
citizen is called upon to identify a handle. If one sees a formula like
4 + 5 × 6 + 8
one immediately identifies the handle and evaluates it:
4 + 5 × 6 + 8 ----- 4 + 30 + 8
The next handle is
4 + 30 + 8 -------- 34 + 8
186 Deterministic bottom-up parsing [Ch. 9
and then
34 + 8 ---------- 42
If we look closely, we can discern in this process shifts and reduces. The person
doing the arithmetic shifts symbols until he reaches the situation
4 + 5 × 6 + 8
in which the control mechanism in his head tells him that this is the right moment to do
a reduce. If asked why, he might answer something like: “Ah, well, I was taught in
school that multiplication comes before addition”. Before we can formalize this notion
and turn it into a parsing method, we consider an even simpler case below (Section
9.1.1).
SS -> # E # E -> E + T E -> T T -> T × F T -> F F -> n F -> ( E )
Figure 9.2 A grammar for simple arithmetic expressions
Meanwhile we note that formulas like the one above are called “arithmetic expres￾sions” and are produced by the grammar of Figure 9.2. S is the start symbol, E stands
for “expression”, T for “term”, F for “factor” and n for any number. The last causes no
problems, since the exact value of the number is immaterial to the parsing process. We
have demarcated the beginning and the end of the expression with # marks; the blank
space that normally surrounds a formula is not good enough for automatic processing.
This also simplifies the stop criterion: the parser accepts the input as correct and stops
when the terminating # is shifted, or upon the subsequent reduce.
9.1.1 Fully parenthesized expressions
SS -> # E # E -> ( E + T ) E -> T T -> ( T × F ) T -> F F -> n F -> ( E )
Figure 9.3 A grammar for fully parenthesized arithmetic expressions
Sec. 9.1] Simple handle-isolating techniques 187
An arithmetic expression is fully parenthesized if each operator together with its
operands has parentheses around it. Such expressions are generated by the grammar of
Figure 9.3. Our example expression would have the form
# ( ( 4 + ( 5 × 6 ) ) + 8 ) #
Now finding the handle is trivial: go to the first closing parenthesis and then back to the
nearest opening parenthesis. The segment between and including the parentheses is the
handle. Reduce it and repeat the process as often as required. Note that after the reduc￾tion there is no need to start all over again, looking for the first closing parenthesis:
there cannot be any closing parenthesis on the left of the reduction spot, so we can start
searching right where we are. In the above example we find the next right parenthesis
immediately and do the next reduction:
# ( ( 4 + 30 ) + 8 ) #
9.2 PRECEDENCE PARSING
Of course, grammars are not normally kind enough to have begin- and end-markers to
each compound right-hand side, and the above parsing method has little practical value
(as far as we know it does not even have a name). Yet, suppose we had a method for
inserting the proper parentheses into an expression that was lacking them. At a first
glance this seems trivial to do: when we see +n× we know we can replace this by +(n×
and we can replace ×n+ by ×n)+. There is a slight problem with +n+, but since the first
+ has to be performed first, we replace this by +n)+. The #’s are easy; we can replace
#n by #(n and n# by n)#. For our example we get:
# ( 4 + ( 5 × 6 ) + 8 ) #
This is, however, not completely correct − it should have been #((4+(5×6))+8)# −
and for 4+5×6 we get the obviously incorrect form #(4+(5×6)#.
The problem is that we do not know how many parentheses to insert in, for
instance, +n×; in 4+5×6×7 we should replace it by +((n×: #(4+((5×6)×7))#. We
solve this problem by inserting parentheses generators rather than parentheses. A gen￾erator for open parentheses is traditionally written as <·, one for closing parentheses as
·>; we shall also use a “non-parenthesis”, =˙ . These symbols look confusingly like <, >
and =, to which they are only remotely related. Now, our tentatively inserted
parentheses become firmly inserted parentheses generators; see Figure 9.4 in which we
have left out the n since its position can be inferred from the pattern. Still, the table in
Figure 9.4 is incomplete: the pattern × × is missing and so are all patterns involving
parentheses. In principle there should be a pattern for each combination of two opera￾tors (where we count the genuine parentheses as operators too), and only the generator
to be inserted is relevant for each combination. This generator is called the precedence
relation between the two operators. It is convenient to collect all combinations of
operators in a table, the precedence table. The precedence table for the grammar of
188 Deterministic bottom-up parsing [Ch. 9 + × → + <· × × + → × ·> + + + → + ·> + # ... → # <· ... ... # → ... ·> #
Figure 9.4 Preliminary table of precedence relations
Figure 9.2 is given in Figure 9.5; the left-most column contains the left-hand symbols
and the top-most row the right-hand symbols. ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ # + × ( ) #￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ =˙ <· <· <· +￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> <· <· ·> ×￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> <· ·> (￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ <· <· <· =˙ )￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> ·>
Figure 9.5 Operator-precedence table to the grammar of Figure 9.2
There are three remarks to be made about this precedence table. First, we have
added a number of <· and ·> tokens not covered above (for instance, ×·>×). Second, there
is #=˙# and (=˙) (but not )=˙( !); we shall shortly see what they mean. And third, there
are three empty entries, meaning that when we find these combinations in the input, it
contains an error (and is not produced by the grammar for which we made our pre￾cedence table).
Such a table is called a precedence table because for symbols that are normally
regarded as operators it gives their relative precedence. An entry like +<·× indicates that
in the combination +×, the × has a higher precedence than the +. We shall first show
how the precedence table is used in parsing and then how such a precedence table can
be constructed systematically for a given grammar, if the grammar allows it.
The stack in an operator-precedence parser differs from the normal bottom-up
parser stack in that it contains “important” symbols, the operators, between which rela￾tions are defined, and “unimportant” symbols, the numbers, which are only consulted to
determine the value of a handle and which do not influence the parsing. Moreover, we
need places on the stack to insert the parentheses generators (one can, in principle, do
without these, by reevaluating them whenever necessary). Since there is a parentheses
generator between each pair of operators and there is also (almost) always a value
between such a pair, we shall indicate both in the same position on the stack, with the
parentheses generator in line and the value below it; see Figure 9.6.
To show that, contrary to what is sometimes thought, operator-precedence can do
more than just calculate a value (and since we have seen too often now that
4+5×6+8=42), we shall have the parser construct the parse tree rather than the value.
The stack starts with a #. Values and operators are shifted onto it, interspersed with
parentheses generators, until a ·> generator is met; the following operator is not shifted
and is left in the input (Figure 9.6(b)). It is now easy to identify the handle, which is
Sec. 9.2] Precedence parsing 189
Stack rest of input
(a) # 4 + 5 × 6 + 8 # # <· + <· × ·> + 8 # 4 . .5. . . . . . . . . .6. . ...... . . . . . . . . . . . . . . . ...... (b) # <· + ·> + 8 # 4 × 5 6 . . . . . . . . . . . . . . ...... . . . . . . . . . . . . . . . ...... (c) # <· + ·> # + 4 × 5 6 . . . . . . . . . . . .8. . ...... . . . . . . . . . . . . . . . ...... (d) # =˙ # + + 4 × 5 68 (e)
Figure 9.6 Operator-precedence parsing of 4+5×6+8
demarcated by a dotted rectangle in the figure and which is reduced to a tree; see (c), in
which also the next ·> has already appeared between the + on the stack and the + in the
input. Note that the tree and the new generator have come in the position of the <· of the
handle. A further reduction brings us to (d) in which the + and the 8 have already been
shifted, and then to the final state of the operator-precedence parser, in which the stack
holds #=˙# and the parse tree dangles from the value position.
We see that the stack only holds <· markers and values, plus a ·> on the top each
time a handle is found. The meaning of the =˙ becomes clear when we parse an input
text which includes parentheses, like 4×(5+6); see Figure 9.7, in which we have the
parser calculate the value rather than the parse tree. We see that the =˙ is used to allow
handles consisting of more than one operator and two operands; the handle in (c) has
two operators, the ( and the ) and one operand, the 11. Note that as already indicated
in Section 5.1.1, the set of stack configurations can be described by a regular expres￾sion; for this type of parsers the expression is:
# | #<·q ([<·=˙]q)* ·>? | #=˙#
where q is any operator; the first alternative is the start situation and the third alterna￾tive is the end situation.
190 Deterministic bottom-up parsing [Ch. 9
Stack rest of input
(a) # 4 × ( 5 + 6 ) # # <· × <· ( <· + ·> ) # 4 . .5. . . . . . . . . .6. . ...... . . . . . . . . . . . . . . . ...... (b) # <· × <· ( =˙ ) ·> # 4 . . . . . . . . . . .1.1. . . . . . . . . . . . ...... . . . . . . . . . . . . . . . . . . . . . . . . . ...... (c) # <· × ·> # . .4. . . . . . . . .1.1. . ...... . . . . . . . . . . . . . . . ...... (d) # =˙ # 44 (e)
Figure 9.7 An operator-precedence parsing involving =˙
9.2.1 Constructing the operator-precedence table
The above hinges on the difference between operators, which are terminal symbols and
between which precedence relations are defined, and operands, which are non￾terminals. This distinction is captured in the following definition of an operator gram￾mar:
A CF grammar is an operator grammar if (and only if) each right-hand side con￾tains at least one terminal or non-terminal and no right-hand side contains two
consecutive non-terminals.
So each pair of non-terminals is separated by at least one terminal; all the terminals
except those carrying values (n in our case) are called operators.
For such grammars, setting up the precedence table is relatively easy. First we cal￾culate for each non-terminal A the set FIRSTOP(A), which is the set of all operators that
can occur as the first operator in any sentential form deriving from A, and LASTOP(A),
which is defined similarly. Note that this first operator in a sentential form can be pre￾ceded by at most one non-terminal in an operator grammar. The FIRSTOP’s of all
non-terminals are constructed simultaneously as follows:
1. For each non-terminal A, find all right-hand sides of all rules for A; now for each
right-hand side R we insert the first terminal in R (if any) into FIRSTOP(A). This
gives us the initial values of all FIRSTOP’s.
2. For each non-terminal A, find all right-hand sides of all rules for A; now for each
right-hand side R that starts with a non-terminal, say B, we add the elements of
FIRSTOP(B) to FIRSTOP(A). This is reasonable, since a sentential form of A may
start with B, so all terminals in FIRSTOP(B) should also be in FIRSTOP(A).
3. Repeat step 2 above until no FIRSTOP changes any more.
We have now found the FIRSTOP of all non-terminals. A similar algorithm, using the
last terminal in R in step 1 and a B which ends A in step 2 provides the LASTOP’s. The
sets for the grammar of Figure 9.2 are shown in Figure 9.8.
Now we can fill the precedence table using the following rules, in which q, q1 and
q2 are operators and A is a non-terminal.
For each occurrence in a right-hand side of the form q1q2 or q1Aq 2, set q1=˙ q2.
Sec. 9.2] Precedence parsing 191
FIRSTOP(S) = {#} LASTOP(S) = {#}
FIRSTOP(E) = {+, ×, (} LASTOP(E) = {+, ×, )}
FIRSTOP(T) = {×, (} LASTOP(T) = {×, )}
FIRSTOP(F) = {(} LASTOP(F) = {)}
Figure 9.8 FIRSTOP and LASTOP sets for the grammar of Figure 9.2
This keeps operators from the same handle together.
For each occurrence q1A, set q1<·q2
for each q2
in FIRSTOP(A). This demarcates
the left end of a handle.
For each occurrence Aq 1, set q2·>q1
for each q2
in LASTOP(A). This demarcates
the right end of a handle.
If we obtain a table without conflicts this way, that is, if we never find two dif￾ferent relations between two operators, then we call the grammar operator-precedence.
It will now be clear why (=˙) and not )=˙(, and why +·>+ (because E+ occurs in E->E+T
and + is in LASTOP(E)).
In this way, the table can be derived from the grammar by a program and be
passed on to the operator-precedence parser. A very efficient linear-time parser results.
There is, however, one small problem we have glossed over: Although the method
properly identifies the handle, it often does not identify the non-terminal to which to
reduce it. Also, it does not show any unit rule reductions; nowhere in the examples did
we see reductions of the form E->F or T->F. In short, operator-precedence parsing
generates only skeleton parse trees.
Operator-precedence parsers are very easy to construct (often even by hand) and
very efficient to use; operator-precedence is the method of choice for all parsing prob￾lems that are simple enough to allow it. That only a skeleton parse tree is obtained, is
often not an obstacle, since operator grammars often have the property that the seman￾tics is attached to the operators rather than to the right-hand sides; the operators are
identified correctly.
It is surprising how many grammars are (almost) operator-precedence. Almost all
formula-like computer input is operator-precedence. Also, large parts of the grammars
of many computer languages are operator-precedence. An example is a construction
like CONST total = head + tail; from a Pascal-like language, which is easily
rendered as:
Stack rest of input
# <· CONST <· = <· + ·> total head tail ; #
Ignoring the non-terminals has other bad consequences besides producing a skele￾ton parse tree. Since non-terminals are ignored, a missing non-terminal is not noticed.
As a result, the parser will accept incorrect input without warning and will produce an
incomplete parse tree for it. A parser using the table of Figure 9.5 will blithely accept
the empty string, since it immediately leads to the stack configuration #=˙#. It produces
a parse tree consisting of one empty node.
The theoretical analysis of this phenomenon turns out to be inordinately difficult;
see Levy [Precedence 1975], Williams [Precedence 1977, 1979, 1981] and many others
192 Deterministic bottom-up parsing [Ch. 9
in Section 13.8. In practice it is less of a problem than one would expect; it is easy to
check for the presence of required non-terminals, either while the parse tree is being
constructed or afterwards.
9.2.2 Precedence functions
Several objections can be raised against operator-precedence. First, it cannot handle all
grammars that can be handled by other more sophisticated methods. Second, its error
detection capabilities are weak. Third, it constructs skeleton parse trees only. And
fourth, the two-dimensional precedence table, which for say a 100 tokens has 10000
entries, may take too much room. The latter objection can be overcome for those pre￾cedence tables that can be represented by so-called precedence functions. The idea is
the following. Rather than having a table T such that for any two operators q1 and q2, T[q1,q2] yields the relation between q1 and q2, we have two integer functions f and g
such that fq1
<gq2 means that q1<·q2, fq1 =gq2 means q1=˙ q2 and fq1
>gq2 means
q1·>q2. fq
is called the left priority of q, gq
the right priority; they would probably be
better indicated by l and r, but the use of f and g is traditional. Note that we write fq1
rather than f(q1
); this allows us to write, for instance, f (
for the left priority of ( rather
than the confusing f((). It will be clear that two functions are required: with just one
function one cannot express, for instance, +·>+. Precedence functions take much less
room than precedence tables. For our 100 tokens we need 200 function values rather
than 10000 tables entries. Not all tables allow a representation with precedence func￾tions, but many do.
Finding the proper f and g for a given table seems simple enough and can indeed
often be done by hand. The fact, however, that there are two functions rather than one,
the size of the tables and the occurrence of the =˙ complicate things. A well-known
algorithm to construct the functions was given by Bell [Precedence 1969] of which
several variants exist. The following technique is a straightforward and easily imple￾mented variant of Bell’s algorithm.
First we turn the precedence table into a list of numerical relations, as follows:
for each q1<·q2 we have fq1
<gq2 ,
for each q1=˙ q2 we have fq1 =gq2 ,
for each q1·>q2 we have fq1
>gq2 ,
Here we no longer view forms like fq as function values but rather as variables; rein￾terpretation as function values will occur later. Making such a list is easier done by
computer than by hand; see Figure 9.9(a). Next we remove all equals-relations, as fol￾lows:
for each relation fq1 =gq2 we create a new variable fq1 gq2
and replace all
occurrences of fq1
and gq2
by fq1 gq2 .
Note that fq1 gq2
is not the product of fq1
and gq2
but rather a new variable, i.e., the
name of a new priority value. Now a relation like fq1 =gq2
has turned into
fq1 gq2 =fq1 gq2
and can be deleted trivially. See (b).
Third we flip all > relations:
we replace each relation p1>p 2 by p2<p 1, where p1 and p2 are priority vari￾ables. See (c).
The list has now assumed a very uniform appearance and we can start to assign numeri￾cal values to the variables. We shall do this by handing out the numbers 0,1, . . . as fol￾lows:
Sec. 9.2] Precedence parsing 193
f # = g# f #g# < g+ f #g# < g+ f #g# = 0 f #g# = 0 f # < g+ f #g# < g × f #g# < g × f (g) = 0 f (g) = 0 f # < g × f #g# < g( f #g# < g( g+ = 1 f # < g( f + > f #g# f #g# < f + g+ < f + f + = 2 f + > g# f + > g+ g+ < f + f + < g × f + > g+ f + < g × f + < g × f + < g( g × < f × f + < g × f + < g( f + < g( g+ < f × f × < g( f + < g( f + > f (g) f (g) < f + g × < f × g × < f ) f + > g) f × > f #g# f #g# < f × f × < g( f × > g# f × > g+ g+ < f × g+ < f ) (f) f × > g+ f × > g × g × < f × g × < f ) f × > g × f × < g( f × < g( f #g# = 0 f × < g( f × > f (g) f (g) < f × (d) f (g) = 0 f × > g) f (g) < g+ f (g) < g+ g+ = 1 f ( < g+ f (g) < g × f (g) < g × f #g# = 0 f + = 2 f ( < g × f (g) < g( f (g) < g( f (g) = 0 g × = 3 f ( < g( f ) > f #g# f #g# < f ) g+ = 1 f ( = g) f ) > g+ g+ < f ) f × < g( f ) > g# f ) > g × g × < f ) f + < g × f ) > g+ f ) > f (g) f (g) < f ) f + < g( (g) f ) > g × g × < f × f ) > g) (b) (c) f × < g( g × < f ) (a) (e) f #g# = 0 f # = 0 f # = 0 f (g) = 0 g# = 0 f ( = 0 g+ = 1 f ( = 0 f + = 2 f + = 2 g) = 0 f × = 4 g × = 3 g+ = 1 f ) = 5 f × = 4 f + = 2 g × = 3 g# = 0 (h) f × = 4 g) = 0 g+ = 1 (i) g × = 3 g( = 5 (j)
Figure 9.9 Calculating precedence functions
Find all variables that occur only on the left of a relation; since they are clearly
smaller than all the others, they can all be given the value 0.
In our example we find f#g# and f (g), which both get the value 0. Since the relations
that have these two variables on their left will be satisfied provided we hand out no
more 0’s, we can remove them (see (d)):
Remove all relations that have the identified variables on their left sides.
194 Deterministic bottom-up parsing [Ch. 9
This removal causes another set of variables to occur on the left of a relation only, to
which we now hand out the value 1. We repeat this process with increasing values until
the list of relations has become empty; see (e) through (h).
Decompose the compound variables and give each component the numerical value
of the compound variable. This decomposes, for instance, f (g)=0 into f (=0 and
g)=0; see (i).
This leaves without a value those variables that occurred on the right-hand side only in
the comparisons under (c):
To all still unassigned priority values, assign the lowest value that has not yet been
handed out.
f ) and g( both get the value 5 (see (j) where the values have also been reordered) and
indeed these occur at the high side of a comparison only. It is easily verified that the
priority values found satisfy the initial comparisons as derived from the precedence
table.
It is possible that we reach a stage in which there are still relations left but there
are no variables that occur on the left only. It is easy to see that in that case there must
be a circularity of the form p1<p 2<p 3 . . . <p 1 and that no integer functions represent￾ing these relations can exist: the table does not allow precedence functions. ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ # ) + × ( #￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ =˙ <· <· <· (￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ =˙ <· <· <· +￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> <· <· ×￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> ·> <· )￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> ·>
Figure 9.10 The precedence table of Figure 9.5 reordered
Note that finding precedence functions is equivalent to reordering the rows and
columns of the precedence table so that the latter can be divided into three regions: a ·>
region on the lower left, a <· region on the upper right and a =˙ border between them.
See Figure 9.10.
There is always a way to represent a precedence table with more than two func￾tions; see Bertsch [Precedence 1977] on how to construct such functions.
9.2.3 Simple-precedence parsing
The fact that operator-precedence parsing produces skeleton parse trees only is a seri￾ous obstacle to its application outside formula handling. The defect seems easy to
remedy. When a handle is identified in an operator-precedence parser, it is reduced to a
node containing the value(s) and the operator(s), without reference to the grammar. For
serious parsing the matching right-hand side of the pertinent rule has to be found. Now
suppose we require all right-hand sides in the grammar to be different. Then, given a
handle, we can easily find the rule to be used in the reduction (or to find that there is no
matching right-hand side, in which case there was an error in the input).
This is, however, not quite good enough. To properly do the right reductions and
to find reductions of the form A→B (unit reductions), the non-terminals themselves
have to play a role in the identification of the right-hand side. They have to be on the
Sec. 9.2] Precedence parsing 195
stack like any other symbol and precedence relations have to be found for them. This
has the additional advantage that the grammar need no longer be an operator grammar
and that the stack entries have a normal appearance again.
A grammar is simple precedence if (and only if):
it has a conflict-free precedence table over all its symbols, terminals and non￾terminals alike,
none of its right-hand sides is ε,
all of its right-hand sides are different.
The construction of the simple-precedence table is again based upon two sets,
FIRSTALL(A) and LASTALL(A). FIRSTALL(A) is similar to the set FIRST(A) intro￾duced in Section 8.2.2.1 and differs from it in that it also contains all non-terminals that
can start a sentential form derived from A (whereas FIRST(A) contains terminals only).
LASTALL(A) contains all terminals and non-terminals that can end a sentential form of
A. Their construction is similar to that given in Section 8.2.2.1 for the FIRST set. Fig￾ure 9.11 shows the pertinent sets for our grammar.
FIRSTALL(S) = {#} LASTALL(S) = {#}
FIRSTALL(E) = {E, T, F, n, (} LASTALL(E) = {T, F, n, )}
FIRSTALL(T) = {T, F, n, (} LASTALL(T) = {F, n, )}
FIRSTALL(F) = {n, (} LASTALL(F) = {n, )}
Figure 9.11 FIRSTALL and LASTALL for the grammar of Figure 9.2
A simple-precedence table is now constructed as follows: For each two juxta￾posed symbols X and Y in a right-hand side we have:
X=˙ Y; this keeps X and Y together in the handle;
if X is a non-terminal: for each symbol s in LASTALL(X) and each terminal t in
FIRST(Y) (or Y itself if Y is a terminal) we have s·>t; this allows X to be reduced
completely when the first sign of Y appears in the input; note that we have
FIRST(Y) here rather than FIRSTALL(Y);
if Y is a non-terminal: for each symbol s in FIRSTALL(Y) we have X<·s; this pro￾tects X while Y is being recognized. ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ # E T F n + × ( ) #￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ <·/=˙ <· <· <· <· E￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ =˙ =˙ =˙ T￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> =˙ ·> F￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> ·> n￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> ·> +￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ <·/=˙ <· <· <· ×￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ =˙ <· <· (￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ <·/=˙ <· <· <· <· )￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> ·>
Figure 9.12 Simple-precedence table to Figure 9.2, with conflicts
196 Deterministic bottom-up parsing [Ch. 9
Simple precedence is not the answer to all our problems as is evident from Figure
9.12 which displays the results of an attempt to construct the precedence table for the
operator-precedence grammar of Figure 9.2. Not even this simple grammar is simple￾precedence, witness the conflicts for #<·/=˙E, (<·/=˙E and +<·/=˙T. SS -> # E’ # E’ -> E E -> E + T’ E -> T’ T’ -> T T -> T × F T -> F F -> n F -> ( E )
FIRSTALL(E’) = {E, T’, T, F, n, (} LASTALL(E’) = {T’, T, F, n, )}
FIRSTALL(E) = {E, T’, T, F, n, (} LASTALL(E) = {T, F, n, )}
FIRSTALL(T’) = {T, F, n, (} LASTALL(T’) = {F, n, )}
FIRSTALL(T) = {T, F, n, (} LASTALL(T) = {F, n, )}
FIRSTALL(F) = {n, (} LASTALL(F) = {n, )} ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ # E’ E T’ T F n + × ( ) ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ # =˙ <· <· <· <· <· <· E￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ’ =˙ ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ E ·> =˙ =˙ T￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ’ ·> ·> ·> ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ T ·> ·> =˙ ·> ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ F ·> ·> ·> ·> ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ n ·> ·> ·> ·> ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ + =˙ <· <· <· <· ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ × =˙ <· <· ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ( =˙ <· <· <· <· <· ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ) ·> ·> ·> ·>
Figure 9.13 A modified grammar with its simple-precedence table, without conflicts
There are two ways to remedy this. We can adapt the grammar by inserting extra
levels around the troublesome non-terminals. This is done in Figure 9.13 and works in
this case; it brings us, however, farther away from our goal, to produce a correct parse
tree, since we now produce a parse tree for a different grammar. Or we can adapt the
parsing method, as explained in the next section.
9.2.4 Weak-precedence parsing
It turns out that most of the simple-precedence conflicts are <·/=˙ conflicts. Now the
difference between <· and =˙ is in a sense less important than that between either of them
and ·>. Both <· and =˙ result in a shift and only ·> asks for a reduce. Only when a reduce
Sec. 9.2] Precedence parsing 197
is found will the difference between <· and =˙ become significant for finding the head of
the handle. Now suppose we drop the difference between <· and =˙ and combine them
into ≤·; then we need a different means of identifying the handle and the proper right￾hand side. This can be done by requiring not only that all right-hand sides be different,
but also that no right-hand side be equal to the tail of another right-hand side. A gram￾mar that conforms to this and has a conflict-free ≤·/>· precedence table is called weak
precedence. Figure 9.14 gives the (conflict-free) weak-precedence table for the gram￾mar of Figure 9.2. It is of course possible to retain the difference between <· and =˙
where it exists; this will improve the error detection capability of the parser. ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ # E T F n + × ( ) #￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ≤· <· <· <· <· E￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ =˙ =˙ =˙ T￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> =˙ ·> F￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> ·> n￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ·> ·> ·> ·> +￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ≤· <· <· <· ×￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ =˙ <· <· ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ( ≤· <· <· <· <· ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ) ·> ·> ·> ·>
Figure 9.14 Weak-precedence table to the grammar of Figure 9.2
The rule that no right-hand side should be equal to the tail of another right-hand
side is more restrictive than is necessary. More lenient rules exist in several variants,
which, however, all require more work in identifying the reduction rule. See, for
instance, Ichbiah and Morse [Precedence 1970] or Sekimoto [Precedence 1972].
Weak precedence is a useful method that applies to a relatively large group of
grammars. Especially if parsing is used to roughly structure an input stream, as in the
first pass or scan of a complicated system, weak precedence can be of service.
9.2.5 Extended precedence and mixed-strategy precedence
The above methods determine the precedence relations by looking at 1 symbol on the
stack and 1 token in the input. Once this has been said, the idea suggests itself to
replace the 1’s by m and n respectively, and to determine the precedence relations from
the topmost m symbols on the stack and the first n tokens in the input. This is called
(m,n)-extended precedence.
We can use the same technique to find the left end of the handle on the stack when
using weak precedence: use k symbols on the left and l on the right to answer the ques￾tion if this is the head of the handle. This is called (k,l)(m,n)-extended [weak] pre￾cedence.
By increasing its parameters, extended precedence can be made reasonably
powerful. Yet the huge tables required (2 × 300 × 300 × 300 = 54 million entries for
(1,2)(2,1) extended precedence with 300 symbols) severely limit its applicability.
Moreover, even with large values of k, l, m and n it is inferior still to LR(1), which we
treat in Section 9.5.
198 Deterministic bottom-up parsing [Ch. 9
If a grammar is (k,l)(m,n)-extended precedence, it is not always necessary to test
the full k, l, m and n symbols. Indeed it is almost never necessary and large parts of the
grammar can almost always be handled by (normal) weak-precedence methods; the full
(k,l)(m,n)-extended precedence power is needed only in a small number of spots in the
grammar. This phenomenon has led to techniques in which the (normal) weak￾precedence table has a (small) number of exception entries that refer to further, more
powerful tables. This technique is called mixed-strategy precedence. Mixed-strategy
precedence has been investigated by McKeeman [Books 1970].
9.2.6 Actually finding the correct right-hand side
All the above methods identify only the bounds of the handle; the actual right-hand side
is still to be determined. It may seem that a search through all right-hand sides is neces￾sary for each reduction, but this is not so. The right-hand sides can be arranged in a
tree structure with their right-most symbols forming the root of the tree, as in Figure
9.15. When we have found a ·> relation, we start walking down the stack looking for a <·
and at the same time we follow the corresponding path through the tree; when we find
the <· we should be at the beginning of a rule in the tree, or we have found an error in
the input; see Figure 9.15. The tree can be constructed by sorting the grammar rules on
their symbols in backward order and combining equal tails. As an example, the path
followed for <· T =˙ × =˙ F ·> has been indicated by a dotted line.
S -> # E # F -> ( E ) F -> n T -> F T -> T × F E -> T E -> E + T S # E # F ( E ) F nF T T T × T E E E + . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Figure 9.15 Tree structure for efficiently finding right-hand sides
For several methods to improve upon this, see the literature (Section 13.8).
9.3 BOUNDED-CONTEXT PARSING
There is a different way to solve the annoying problem of the identification of the
right-hand side: let the identity of the rule be part of the precedence relation. A gram￾mar is (m,n) bounded-context (BC(m,n)) if (and only if) for each combination of m
symbols on the stack and n tokens in the input there is a unique parsing decision which
is either “shift” (≤·) or “reduce using rule X” (>· X), as obtained by a variant of the rules
for extended precedence. Figure 9.16 gives the BC(2,1) tables for the grammar of Fig￾ure 9.2. Note that the rows correspond to stack symbol pairs; the entry Accept means
that the input has been parsed and Error means that a syntax error has been found.
Blank entries will never be accessed; all-blank rows have been left out. See, for
instance, Loeckx [Precedence 1970] for the construction of such tables.
Bounded-context (especially BC(2,1)) was once very popular but has been
Sec. 9.3] Bounded-context parsing 199 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ # + × n ( ) #S Accept
#E ·>S->E ≤· Error
#T ·>E->T ·>E->T ≤· Error
#F ·>T->F ·>T->F ·>T->F
Error
#n ·>F->n ·>F->n ·>F->n
Error Error Error
#( Error Error Error ≤· ≤· Error
E+ Error Error Error ≤· ≤· Error
E) ·>F->(E) ·>F->(E) ·>F->(E)
Error Error ·>F->(E) T× Error Error Error ≤· ≤· Error
+T ·>E->E+T ·>E->E+T ≤· ·>E->E+T +F ·>T->F ·>T->F ·>T->F ·>T->F +n ·>F->n ·>F->n ·>F->n
Error Error ·>F->n +( Error Error Error ≤· ≤· Error
×F ·>T->T×F ·>T->T×F ·>T->T×F ·>T->T×F ×n ·>F->n ·>F->n ·>F->n
Error Error ·>F->n ×( Error Error Error ≤· ≤· Error
(E Error ≤· ≤· (T Error ·>E->T ≤· ·>E->T (F Error ·>T->F ·>T->F ·>T->F (n Error ·>F->n ·>F->n
Error Error ·>F->n (( Error Error Error ≤· ≤· Error
Figure 9.16 BC(2,1) tables for the grammar of Figure 9.2
superseded almost completely by LALR(1) (Section 9.6). Recently, interest in
bounded-context grammars has been revived, since it has turned out that such gram￾mars have some excellent error recovery properties; see Section 10.8. This is not com￾pletely surprising if we consider that bounded-context grammars have the property that
a small number of symbols in the sentential form suffice to determine completely what
is going on.
9.3.1 Floyd productions
Bounded-context parsing steps can be summarized conveniently by using Floyd pro￾ductions. Floyd productions are rules for rewriting a string that contains a marker, ∆,
on which the rules focus. A Floyd production has the form α∆β => γ∆δ and means
that if the marker in the string is preceded by α and is followed by β, the construction
must be replaced by γ∆δ. The rules are tried in order starting from the top and the first
one to match is applied; processing then resumes on the resulting string, starting from
the top of the list, and the process is repeated until no rule matches.
Although Floyd productions were not primarily designed as a parsing tool but
rather as a general string manipulation language, the identification of the ∆ in the string
with the gap in a bottom-up parser suggests itself and was already made in Floyd’s ori￾ginal article [Misc 1961]. Floyd productions for the grammar of Figure 9.2 are given in
Figure 9.17. The parser is started with the ∆ at the left of the input.
The apparent convenience and conciseness of Floyd productions makes it very
tempting to write parsers in them by hand, but Floyd productions are very sensitive to
the order in which the rules are listed and a small inaccuracy in the order can have a
200 Deterministic bottom-up parsing [Ch. 9 ∆ n => n ∆ ∆ ( => ( ∆ n ∆ => F ∆ T ∆ * => T* ∆ T*F ∆ => T ∆ F ∆ => T ∆ E+T ∆ => E ∆ T ∆ => E ∆ (E) ∆ => F ∆ ∆ + => + ∆ ∆ ) => ) ∆ ∆ # => # ∆ #E# ∆ => S ∆
Figure 9.17 Floyd productions for the grammar of Figure 9.2
devastating effect.
9.4 LR METHODS
The LR methods are based on the combination of two ideas that have already been
touched upon in previous sections. To reiterate, the problem is to find the handle in a
sentential form as efficiently as possible, for as large a class of grammars as possible.
Such a handle is searched for from left to right. Now, from Section 5.3.4 we recall that
a very efficient way to find a string in a left-to-right search is by constructing a finite￾state automaton. Just doing this is, however, not good enough. It is quite easy to con￾struct an FS automaton that would recognize any of the right-hand sides in the grammar
efficiently, but it would just find the left-most reducible substring in the sentential
form. This substring is, however, often not the handle.
The idea can be made practical by applying the same trick that was used in
Earley’s parser to drastically reduce the fan-out of the breadth-first search (see Section
7.2): start the automaton with the start rule of the grammar and only consider, in any
position, right-hand sides that could be derived from the start symbol. This top-down
restriction device served in the Earley parser to reduce the cost to O (n3
), here we
require the grammar to be such that it reduces the cost to O(n). The resulting automa￾ton is started in its initial state at the left end of the sentential form and allowed to run
to the right; it has the property that it stops at the right end of the handle and that its
accepting state tells us how to reduce the handle. How this is done will be explained in
the next section.
Since practical FS automata easily get so big that their states cannot be displayed
on a single page of a book, we shall use the grammar of Figure 9.18 for our examples.
It is a simplified version of that of Figure 9.2, in which only one binary operator is left,
for which we have chosen the - rather than the +. Although this is not essential, it
serves to remind us that the proper parse tree must be derived, since (a-b)-c is not the
same as a-(b-c) (whereas (a+b)+c and a+(b+c) are). The # indicates the end of the
input.
Sec. 9.4] LR methods 201
SS -> E # E -> E - T E -> T T -> n T -> ( E )
Figure 9.18 A very simple grammar for differences of numbers
9.4.1 LR(0)
We shall now set out to construct a top-down-restricted handle-recognizing FS automa￾ton for the grammar of Figure 9.18, and start by constructing a non-deterministic ver￾sion. We recall that a non-deterministic automaton can be drawn as a set of states con￾nected by arrows (transitions), each marked with one symbol or with ε. Each state will
contain one item. Like in the Earley parser, an item consists of a grammar rule with a
dot embedded in its right-hand side. An item X→ . . . Y Z . . .
in a state means that
the (non-deterministic!) automaton bets on X→ . . . YZ . . . being the handle and that it
has already recognized . . . Y. Unlike the Earley parser there are no back-pointers. To
simplify the explanation of the transitions involved, we introduce a second kind of
state, which we call a station. It has only ε arrows incoming and outgoing, contains
something of the form X and is drawn in a rectangle rather than in an ellipse. When
the automaton is in such a station at some point in the sentential form, it thinks that at
this point a handle starts that reduces to X. Consequently each X station has ε-
transitions to items for all rules for X, each with the dot at the left end, since no part of
the rule has yet been recognized; see Figure 9.19. Equally reasonably, each state hold￾ing an item X→ . . . Z . . . has an ε-transition to the station Z, since the bet on an X
may be over-optimistic and the automaton may have to settle for a Z. The third and last
source of arrows in the non-deterministic automaton is straightforward. From each state
containing X→ . . . P . . .
there is a P-transition to the state containing
X→ . . . P . . . , for P a terminal or a non-terminal. This corresponds to the move the
automaton makes when it really meets a P. Note that the sentential form may contain
non-terminals, so transitions on non-terminals should also be defined.
With this knowledge we refer to Figure 9.19. The stations for S, E and T are
drawn at the top of the picture, to show how they lead to all possible items for S, E and
T, respectively. From each station, ε-arrows fan out to all states containing items with
the dot at the left, one for each rule for the non-terminal in that station; from each such
state, non-ε-arrows lead down to further states. Now the picture is almost complete. All
that needs to be done is to scan the items for a dot followed by a non-terminal (readily
discernable from the outgoing arrow marked with it) and to connect each such item to
the corresponding station through an ε-arrow. This completes the picture.
There are two things to be noted on this picture. First, for each grammar rule with
a right-hand side of length l there are l +1 items and they are easily found in the picture.
Moreover, for a grammar with r different non-terminals, there are r stations. So the
number of states is roughly proportional to the size of the grammar, which assures us
that the automaton will have a modest number of states. For the average grammar of a
hundred rules something like 300 states is usual. The second is that all states have out￾going arrows except the ones which contain an item with the dot at the right end.
These are accepting states of the automaton and indicate that a handle has been found;
the item in the state tells us how to reduce the handle.
202 Deterministic bottom-up parsing [Ch. 9 S S-> E# E S->E # # S->E#ε E E-> E-T E E->E -T - E->E- T T E->E-T ε E-> TT E->T ε T T-> nn T->n ε T-> (E) ( T->( E) E T->(E ) ) T->(E) ε ε ε ε ε ε
Figure 9.19 A non-deterministic handle recognizer for the grammar of Figure 9.18
We shall now run this NDA on the sentential form E-n-n, to see how it works. As
in the FS case we can do so if we are willing to go through the trouble of resolving the
non-determinism on the fly. The automaton starts at the station S and can immediately
make ε-moves to S-> E#, E, E-> E-T, E-> T, T, T-> n and T-> (E). Moving over
the E reduces the set of states to S->E # and E->E -T; moving over the next - brings
us at E->E- T from which ε-moves lead to T, T-> n and T-> (E). Now the move
over n leaves only one item: T->n , which tells us through the dot at the end of the
item, that we have found a handle, n, and that we should reduce it to T using T->n. See
Figure 9.20. This reduction gives us a new sentential form, E-T-n, on which we can
repeat the process.
S S-> E# E E-> E-T E-> T T T-> n T-> (E) E S->E # E->E -T - E->E- T T T-> n T-> (E) n T->n -n
Figure 9.20 The sets of NDA states while analysing E-n-n
Sec. 9.4] LR methods 203
Just as in the FS case, we will soon tire of doing it this way, and the first thing we
need to do is to make the NDA deterministic, if we are to use it in earnest. We use the
subset construction of Section 5.3.1 to construct a deterministic automaton that has sets
of the items of Figure 9.19 as its states. The result is shown in Figure 9.21, where we
have left out the stations to avoid clutter and since they are evident from the other
items. We see that the deterministic automaton looks a lot less understandable than
Figure 9.19; this is the price to be paid for having determinism. Yet we see that the
subset construction has correctly identified the subsets we had already constructed by
hand in the previous paragraph. This type of automaton is called an LR(0) automaton. S-> E# E-> E-T E-> T T-> n T-> (E) 1 T E->T 2 T T->( E) E-> E-T E-> T T-> n T-> (E) 6 T->n 3 n n S->E # E->E -T 4 - E->E- T T-> n T-> (E) 7 - T->(E ) E->E -T 9 S->E# 5 # E->E-T 8 T T->(E)
10
) E n ( E ( (
Figure 9.21 The corresponding deterministic handle recognizer
It is customary to number the states of the deterministic automaton, as has already
been done in Figure 9.21 (the order of the numbers is arbitrary, they serve identifica￾tion purposes only). Now it has become much easier to represent the sentential form
with its state information, both implementationwise in a computer and in a drawing:
➀ E ➃ - ➆ n ➂ - n
The sequence ➀ ➃ ➆ ➂ can be read from Figure 9.21 using the path E-n. We start with
state ➀ on the stack and shift in symbols from the sentential form, all the while assess￾ing the new states. As soon as an accepting state shows up on the top of the stack (and
it cannot show up elsewhere on the stack) the shifting stops and a reduce is called for;
the accepting state indicates how to reduce. Accepting state ➂ calls for a reduction
T->n, so our new sentential form will be E-T-n.
Repeating the handle-finding process on this new form we obtain:
➀ E ➃ - ➆ T ➇ - n
which shows us two things. First, the automaton has identified a new reduce, E->E-T,
from state ➇, which is correct. The second thing is that by restarting the automaton at
204 Deterministic bottom-up parsing [Ch. 9
the beginning of the sentential form we have done superfluous work: up to state 7, that
is, up to the left end of the handle, nothing has changed. We can save work as follows:
after a reduction of a handle to X, we look at the new exposed state on the stack and
follow the path marked X in the automaton, starting from that state. In our example we
have reduced to T, found a ➆ exposed on the stack and the automaton leads us from
there to ➇ along the path marked T. This type of shift on a non-terminal that has just
resulted from a reduction is called a GOTO-action. Note that the state exposed after a
reduction can never call for a reduction: if it did so, that reduction would already have
been performed earlier.
It is convenient to represent the LR(0) automaton by means of table in which the
rows correspond to states and the columns to symbols. In the intersection we find what
to do with a given symbol in a given state. The LR(0) table for the automaton of Fig￾ure 9.21 is given in Figure 9.22. An entry like s3 means “shift the input symbol onto
the stack and go to state ➂”, which is often abbreviated to “shift to 3”. The entry e
means that an error has been found: the corresponding symbol cannot legally appear in
that position. A blank entry will never even be consulted: either the state calls for a
reduction or the corresponding symbol will never at all appear in that position, regard￾less of the form of the input. In state 4, for instance, we will never meet an E: the E
would have originated from a previous reduction, but no reduction would do that in that
position. Since non-terminals are only put on the stack in legal places no empty entry
on a non-terminal will ever be consulted. ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ n - ( ) # E T reduce by
1 s3 e s6 e e s4 s2
2 E -> T 3 T -> n 4 e s7 e e s5
5 S -> E # 6 s3 e s6 e e s9 s2
7 s3 e s6 e e s8
8 E -> E - T 9 e s7 e s10 e
10 T -> ( E )
Figure 9.22 LR(0) table for the grammar of Figure 9.18
In practice the “reduce by” entries for the reducing states do not directly refer to
the rules to be used, but to routines that have built-in knowledge of these rules, that
know how many entries to unstack and that perform the semantic actions associated
with the recognition of the rule in question. Parts of these routines will be generated by
a parser generator.
The table in Figure 9.22 contains much empty space and is also quite repetitious.
As grammars get bigger, the parsing tables get larger and they contain progressively
more empty space and redundancy. Both can be exploited by data compression tech￾niques and it is not uncommon that a table can be reduced to 15% of its original size by
the appropriate compression technique. See, for instance, Al-Hussainin and Stone [LR
1986] and Dencker, Dürre and Heuft [Misc 1984].
The advantages of LR(0) over precedence and bounded-context are clear. Unlike
Sec. 9.4] LR methods 205
precedence, LR(0) immediately identifies the rule to be used for reduction, and unlike
bounded-context, LR(0) bases its conclusions on the entire left context rather than on
the last m symbols of it. In fact, LR(0) can be seen as a clever implementation of
BC(∞,0), i.e., bounded-context with unrestricted left context and zero right context.
9.4.2 LR(0) grammars
By now the reader may have the vague impression that something is wrong. On the
one hand we claim that there is no known method to make a linear-time parser for an
arbitrary grammar; on the other we have demonstrated above a method that seems to
work for an arbitrary grammar. A non-deterministic automaton as in Figure 9.19 can
certainly be constructed for any grammar, and the subset construction will certainly
turn it into a deterministic one, which will definitely not require more than linear time.
Voilà, a linear-time parser.
The problem lies in the accepting states of the deterministic automaton. An
accepting state may still have an outgoing arrow, say on a symbol +, and if the next
symbol is indeed a +, the state calls for both a reduction and for a shift: the automaton
is not really deterministic after all. Or an accepting state may be an honest accepting
state but call for two different reductions. The first problem is called a shift/reduce
conflict and the second a reduce/reduce conflict. Figure 9.23 shows examples (that
derive from a slightly different grammar than in Figure 9.18).
E->T +E E->T +
shift/reduce conflict
(on +) E->E-T E->T
reduce/reduce conflict
(always)
Figure 9.23 Two types of conflict
Note that there cannot be a shift/shift conflict. A shift/shift conflict would imply that
two different arrows leaving the same state would carry the same symbol. This is, how￾ever, prevented by the subset algorithm (which would have made into one the two
states the arrows point to).
A state that contains a conflict is called an inadequate state. A grammar that
leads to a deterministic LR(0) automaton with no inadequate states is called LR(0).
The grammar of Figure 9.18 is LR(0).
9.5 LR(1)
Our initial enthusiasm about the clever and efficient LR(0) parsing technique will soon
be damped considerably when we find out that very few grammars are in fact LR(0). If
we augment the grammar of Figure 9.18 by a single non-terminal S’ and replace
S->E# by S’->S# and S->E to better isolate the end-marker, the grammar ceases to be
LR(0). The new grammar is given in Figure 9.24, the non-deterministic automaton in
Figure 9.25 and the deterministic one in Figure 9.26.
Apart from the split of state 5 in the old automaton into states 5 and 11, we
observe to our dismay that state 4 (marked ✘) is now inadequate, exhibiting a
206 Deterministic bottom-up parsing [Ch. 9
1. S’S -> S #
2. S -> E
3. E -> E - T
4. E -> T
5. T -> n
6. T -> ( E )
Figure 9.24 A non-LR(0) grammar for differences of numbers
S’ S’-> S# S S’->S # # S’->S#ε S S-> EE S->Eε E E-> E-T E E->E -T - E->E- T T E->E-T ε E-> TT E->T ε T T-> nn T->n ε T-> (E) ( T->( E) E T->(E ) ) T->(E) ε ε ε ε ε ε ε
Figure 9.25 Non-deterministic automaton for the grammar in Figure 9.24
shift/reduce conflict on -, and the grammar is not LR(0). We are the more annoyed
since this is a rather stupid inadequacy: S->E can never occur in front of a - but only
in front of a #, so there is no real problem at all. If we had developed the parser by
hand, we could easily test in state 4 if the symbol ahead was a - or a # and act accord￾ingly (or else there was an error in the input). Since, however, practical parsers have
hundreds of states, such manual intervention is not acceptable and we have to find
algorithmic ways to look at the symbol ahead.
Taking our clue from the the explanation of the Earley parser,† we attach to each
dotted item a look-ahead symbol; we shall separate the look-ahead symbol from the
item by a space rather than enclose it between []’s, to avoid visual clutter. The con￾struction of a non-deterministic handle-finding automaton using this kind of items, and
the subsequent subset construction yield an LR(1) parser. ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† This is historically incorrect: LR(1) parsing was invented (Knuth [LR 1965]) before Earley
parsing (Earley [CF 1970]).
Sec. 9.5] LR(1) 207
S’-> S# S-> E E-> E-T E-> T T-> n T-> (E) 1 T E->T 2 T T->( E) E-> E-T E-> T T-> n T-> (E) 6 T->n 3 n n S->E E->E -T4✘ - E->E- T T-> n T-> (E) 7 - T->(E ) E->E -T 9 S’->S # 5 S S’->S#
11
# E->E-T 8 T T->(E)
10
) E n ( E ( (
Figure 9.26 Inadequate LR(0) automaton for the grammar in Figure 9.24
We shall now examine Figure 9.27, the non-deterministic automaton. Like the
items, the stations have to carry a look-ahead symbol too. Actually, a look-ahead sym￾bol in a station is more natural than that in an item. A station like E# just means: hop￾ing to see an E followed by a #. The parser starts at station S’, which has an invisible
look-ahead. From it we have ε-moves to all production rules for S’, of which there is
only one; this yields the item S’-> S#, again with empty look-ahead. This item neces￾sitates the station S#; we do not automatically construct all possible stations as we did
for the LR(0) automaton, but only those to which there are actual moves from else￾where in the automaton. The station S# has # for a look-ahead and produces one item,
S-> E #. It is easy to see how the look-ahead propagates. The station E#, arrived at
from the previous item, causes the item E-> E-T #, which in its turn necessitates the
station E-, since now the automaton can be in the state “hoping to find an E followed
by a -”. The rest of the automaton will hold no surprises.
The look-ahead derives either from the symbol following the non-terminal:
the item E-> E-T leads to station E￾or from the previous look-ahead if the non-terminal is the last symbol in the item:
the item S-> E # leads to station E#
There is a complication which does not occur in our example. When a non-terminal is
followed by another non-terminal:
P→ QR x
there will be ε-moves from this item to all stations Q y, where for y we have to fill in
all terminals in FIRST(R). This is reasonable since all these and only these symbols
208 Deterministic bottom-up parsing [Ch. 9 S’ S’-> S# S S’->S # # S’->S#ε S# S-> E # E S->E # ε E# E-> E-T # E E->E -T # - E->E- T # T E->E-T #ε E-> T # T E->T # ε T# T-> n # n T->n #ε T-> (E) # ( T->( E) # E T->(E ) # ) T->(E) # ε E- E-> E-T - E E->E -T - - E->E- T - T E->E-T -ε E-> T - T E->T - ε T- T-> n - n T->n -ε T-> (E) - ( T->( E) - E T->(E ) - ) T->(E) - ε E) E-> E-T ) E E->E -T ) - E->E- T ) T E->E-T )ε E-> T ) T E->T ) ε T) T-> n ) n T->n )ε T-> (E) ) ( T->( E) ) E T->(E ) ) ) T->(E) ) ε ε εε ε ε ε ε ε ε ε ε ε ε ε
Figure 9.27 Non-deterministic LR(1) automaton for the grammar in Figure 9.24
can follow Q in this particular item. It will be clear that this is a rich source of stations.
The next step is to run the subset algorithm on this automaton to obtain the deter￾ministic automaton; if the automaton has no inadequate states, the grammar was LR(1)
and we have obtained an LR(1) parser. The result is given in Figure 9.28. As was to
be expected, it contains many more states than the LR(0) automaton although the 60%
increase is very modest, due to the simplicity of the grammar. An increase of a factor
of 10 or more is more likely in practice. (Although Figure 9.28 was constructed by
hand, LR automata are normally created by a parser generator exclusively.)
We are glad but not really surprised to see that the problem of state 4 in Figure
Sec. 9.5] LR(1) 209
S’-> S# S-> E# E-> E-T # E-> E-T - E-> T - T-> n - T-> (E) - E-> T # T-> n # T-> (E) # 1 S’->S # 2 S S’->S# 3 # T E->T - E->T # 4 T->( E) - T->( E) # E-> E-T ) E-> T ) T-> n ) T-> (E) ) E-> E-T - E-> T - T-> n - T-> (E) - 7 T->n - T->n # 5 n S->E # E->E -T # E->E -T - 6 - E->E- T # E->E- T - T-> n # T-> (E) # T-> n - T-> (E) - 8 T->(E ) - T->(E ) # E->E -T ) E->E -T -
12
E->E-T # E->E-T - 9 T T->(E) - T->(E) #
13
) E n ( ( T E->T - E->T )
10
T T->( E) - T->( E) ) E-> E-T ) E-> T ) T-> n ) T-> (E) ) E-> E-T - E-> T - T-> n - T-> (E) -
14
T->n - T->n )
11
n n E->E- T ) E->E- T - T-> n ) T-> (E) ) T-> n - T-> (E) -
15
- T->(E ) - T->(E ) ) E->E -T ) E->E -T -
17
-E->E-T ) E->E-T -
16
T T->(E) - T->(E) )
18
) E n ( E ( (
Figure 9.28 Deterministic LR(1) automaton for the grammar in Figure 9.24
9.26, which is now state ➅ in Figure 9.28, has been resolved: on # reduce using S->E,
on - shift to ➇ and on any other symbol give an error message.
It is again useful to represent the LR(1) automaton in a table, the LR(1) parsing
table. Since some reduction rules now occur several times in the table, it is convenient
to number the rules, so they can be referred to by number in the table. The table gives
for each (state, symbol) pair whether:
to shift the symbol onto the stack and go to state N (written sN),
to reduce using rule R, remove the entries corresponding to the right-hand side
from the stack and enter the table again with the pair (statenew,
lhs), where statenew
is the state just uncovered and now on top of the stack and lhs is the left-hand side
of R (written rR), or
to announce an error (written e).
Figure 9.29 shows the LR(1) table; the blank entries can never be accessed.
The sentential form E-n-n leads to the following stack:
➀ E ➅ - ➇ n ➄ - n
and since the look-ahead is -, the correct reduction T->n is indicated.
Note that if the sentential form had been E-nn, the LR(1) parser would find an
error:
➀ E ➅ - ➇ n ➄ n
since the pair (5, n) yields e. It is instructive to see that the LR(0) parser of Figure 9.22
would do the reduction:
210 Deterministic bottom-up parsing [Ch. 9
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ n - ( ) # S E T 1 s5 e s7 e e s2 s6 s4
2 e e e e s3
3/acc
4 e r4 e e r4
5 e r5 e e r5
6 e s8 e e r2
7 s11 e s14 e e s12 s10
8 s5 e s7 e e s9
9 e r3 e e r3
10 e r4 e r4 e
11 e r5 e r5 e
12 e s15 e s13 e
13 e r6 e e r6
14 s11 e s14 e e s17 s10
15 s11 e s14 e e s16
16 e r3 e r3 e
17 e s15 e s18 e
18 e r6 e r6 e
Figure 9.29 LR(1) table for the grammar of Figure 9.24
➀ E ➃ - ➆ n ➂ n
since state 3 is an accepting state. Even a second reduction would follow:
➀ E ➃ - ➆ T ➇ n
which through E->E-T yields
➀ E ➃ n
Only now is the error found, since the pair (4, n) in Figure 9.22 yields e. Not surpris￾ingly, the LR(0) automaton is less alert than the LR(1) automaton.
All stages of the LR(1) parsing of the string n-n-n are given in Figure 9.30. Note
that state ➅ in h causes a shift (look-ahead -) while in l it causes a reduce 2 (look￾ahead #).
9.5.1 LR(1) with ε-rules
In Section 3.3.2 we have seen that one has to be careful with ε-rules in bottom-up
parsers: they are hard to recognize bottom-up. Fortunately LR(1) parsers are strong
enough to handle them without problems. In the non-deterministic automaton, an ε-
rule is nothing special; it is just an exceptionally short list of moves starting from a sta￾tion (see station Bc in Figure 9.32(a). In the deterministic automaton, the ε-reduction
is possible in all states of which the ε-rule is a member, but hopefully its look-ahead
sets it apart from all other rules in those states. Otherwise a shift/reduce or
reduce/reduce conflict results, and indeed the presence of ε-rules in a grammar raises
Sec. 9.5] LR(1) 211
a ➀ n-n-n# shift
b ➀ n ➄ -n-n# reduce 5 c ➀ T ➃ -n-n# reduce 4 d ➀ E ➅ -n-n# shift
e ➀ E ➅ - ➇ n-n# shift
f ➀ E ➅ - ➇ n ➄ -n# reduce 5 g ➀ E ➅ - ➇ T ➈ -n# reduce 3 h ➀ E ➅ -n# shift
i ➀ E ➅ - ➇ n# shift
j ➀ E ➅ - ➇ n ➄ # reduce 5 k ➀ E ➅ - ➇ T ➈ # reduce 3 l ➀ E ➅ # reduce 2 m ➀ S ➁ # shift
n ➀ S ➁ # ➂ reduce 1 o ➀ S’ ➂ accept
Figure 9.30 LR(1) parsing of the string n-n-n
the risks of such conflicts and reduces the likelihood of the grammar to be LR(1).
S’S -> S # S -> A B c A -> a B -> b B -> ε
Figure 9.31 A simple grammar with an ε-rule
To avoid page-filling drawings, we demonstrate the effect using the trivial gram￾mar of Figure 9.31. Figure 9.32(a) shows the non-deterministic automaton, Figure
9.32(b) the resulting deterministic one. Note that no special actions were necessary to
handle the rule B->ε.
The only complication occurs again in determining the look-ahead sets in rules in
which a non-terminal is followed by another non-terminal; here we meet the same
phenomenon as in an LL(1) parser (Section 8.2.2.1). Given an item, for instance,
P→ ABC [d ], we are required to produce the look-ahead set for the station A [ . . .
].
If B had been a terminal, it would have been the look-ahead. Now we take the FIRST
set of B, and if B produces ε (is nullable) we add the FIRST set of C since B can be
transparent and allow us to see the first token of C. If C is also nullable, we may even
see [d ], so in that case we also add d to the look-ahead set. The result of these opera￾tions is written as FIRST(BC [d ]) (which is, in fact, equal to FIRST(BCd)).
9.5.2 Some properties of LR(k) parsing
Instead of a look-ahead of one token, k tokens can be used. It is not difficult to do so
but it is extremely tedious and the resulting tables assume gargantuan size (see, e.g.,
Ukkonen [LR 1985]). Moreover it does not really help much. Although an LR(2)
parser is more powerful than an LR(1) parser, in that it can handle some grammars that
212 Deterministic bottom-up parsing [Ch. 9 S’ S’-> S# S S’->S # # S’->S#ε S# S-> ABc # A S->A Bc # B S->AB c # c S->ABc # ε Ab A-> a b a A->a b ε Ac A-> a c a A->a c ε Bc B->ε c ε B-> b c b B->b c ε ε ε ε ε (a) S’-> S# S-> ABc # A-> a c A-> a b 1 S’->S # 2 S’->S# 3 S# a A->a c A->a b 4 S->A Bc # B->ε c B-> b c 5 B S->AB c #7 S->ABc #8 c A B->b c 6 b (b)
Figure 9.32 Non-deterministic and deterministic LR(1) automata for Figure 9.31
the other cannot, the emphasis is on “some”. If a common-or-garden variety grammar
is not LR(1), chances are minimal that it is LR(2) or higher.
Some theoretically interesting properties of varying practical significance are
briefly mentioned here. It can be proved that any LR(k) grammar with k >1 can be
transformed into an LR(k −1) grammar (and so to LR(1), but not always to LR(0)),
often at the expense of an enormous increase in size; see, e.g. Mickunas, Lancaster and
Schneider [LR 1976]. It can be proved that if a language allows parsing with a push￾down automaton as described in Section 3.4, it has an LR(1) grammar; such languages
are called deterministic languages. It can be proved that if a grammar can be handled
by any of the deterministic methods of Chapters 8 and 9 (except the non-canonical
methods of 9.9), it can be handled by an LR(k) parser (that is, all deterministic methods
are weaker than or equally strong as LR(k)).
An LR(1) parser has the immediate error detection property: the parser will stop
at the first incorrect token in the input and not even perform another shift or reduce.
This is important because this early error detection property allows a maximum amount
Sec. 9.5] LR(1) 213
of context to be preserved for error recovery; see Section 10.2.6.
In summary, LR(k) parsers are the strongest deterministic parsers possible and
they are the strongest linear-time parsers known (with the possible exception of some
non-canonical parsers; see Section 9.9). They react to errors immediately, are paragons
of virtue and beyond compare. They are also not widely used.
9.6 LALR(1) PARSING
The reader will have sensed that our journey has not yet come to an end; the goal of a
practical, powerful, linear-time parser has still not be attained. Even at their inception
by Knuth in 1965 [LR 1965], it was realized that LR(1) parsers would be impractical in
that the space required for their deterministic automata would be prohibitive. A modest
grammar might already require hundreds of thousands or even millions of states,
numbers that were totally incompatible with the computer memories of those days and
that would even tax present-day memories.
In the face of this difficulty, development of this line of parsers came to a stand￾still, partially interrupted by Korenjak’s invention of a method to partition the gram￾mar, build LR(1) parsers for each of the parts and combine these into a single over-all
parser (Korenjak [LR 1969]). This helped, but not much, in view of the added com￾plexity.
The problem was finally solved by using an unlikely and discouraging-looking
method. Consider the LR(1) automaton in Figure 9.28 and imagine boldly discarding
all look-ahead information from it. Then we see that each state in the LR(1) automaton
reverts to a specific state in the LR(0) automaton; for instance, LR(1) states 7 and 14
collapse into LR(0) state 6 and LR(1) states 4 and 10 collapse into LR(0) state 3. There
is not a single state in the LR(1) automaton that was not already present in a rudimen￾tary form in the LR(0) automaton. Also, the transitions remain intact during the col￾lapse: both LR(1) states 7 and 14 have a transition to state 10 on T, but so has LR(0)
state 6 to 3. By striking out the look-ahead information from an LR(1) automaton, it
collapses into an LR(0) automaton for the same grammar, with a great gain as to
memory requirements but also at the expense of the look-ahead power. This will prob￾ably not surprise the reader too much, although a formal proof of this phenomenon is
not trivial.
The idea is now to collapse the automaton but to keep the look-ahead information
(and collapse it too, but not discard it). The surprising fact is that this preserves almost
all the original look-ahead power and still saves an enormous amount of memory. The
resulting automaton is called an LALR(1) automaton, for “Look Ahead LR[(0)] with a
look-ahead of 1 token.” LALR(k) also exists and is LR(0) with an add-on look-ahead of
k tokens.
The LALR(1) automaton for our grammar of Figure 9.24 is given in Figure 9.33,
where the look-aheads are sets now and are shown between [ and ]. We see that the
original conflict in state 4 is indeed still resolved, as it was in the LR(1) automaton, but
that its size is equal to that of the LR(0) automaton. That now is a very fortunate state
of affairs!
We have finally reached our goal. LALR(1) parsers are powerful, almost as
powerful as LR(1) parsers, they have fairly modest memory requirements, only slightly
inferior to (= larger than) those of LR(0) parsers,†
and they are time-efficient. LALR(1) ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
† Since the LALR(1) tables contain more information than the LR(0) tables (although they have
the same size), they lend themselves less well to data compression. So practical LALR(1)
214 Deterministic bottom-up parsing [Ch. 9 S’-> S# [] S-> E [#] E-> E-T [#-] E-> T [#-] T-> n [#-] T-> (E) [#-] 1 T E->T [#-)] 2 T T->( E) [#-)] E-> E-T [#-)] E-> T [#-)] T-> n [#-)] T-> (E) [#-)] 6 T->n [#-)] 3 n n S->E [#] E->E -T [#-] 4 - E->E- T [#-)] T-> n [#-)] T-> (E) [#-)] 7 - T->(E ) [#-)] E->E -T [#-)] 9 S’->S # [] 5 S S’->S# []
11
# E->E-T [#-)] 8 T T->(E) [#-)]
10
) E n ( E ( (
Figure 9.33 The LALR(1) automaton for the grammar of Figure 9.24
parsing may very well be the most-used parsing method in the world today.
9.6.1 Constructing the LALR(1) parsing tables
When we have sufficiently drunk in the beauty of the vista that spreads before us on
these heights, and start thinking about returning home and actually building such a
parser, it will come to us that there is a small but annoying problem left. We have
understood how the desired parser should look and also seen how to construct it, but
during that construction we used the unacceptably large LR(1) parser as an intermedi￾ate step.
So the problem is to find a shortcut by which we can produce the LALR(1) parse
table without having to construct the one for LR(1). This particular problem has fas￾cinated scores of computer scientists to this day (see the references in 13.6, for
instance, Park and Choe [LR 1987]), and several good (and some very clever) algo￾rithms are known.
We shall treat here only one algorithm, one that is both intuitively relatively clear
and reasonably efficient. It was (probably) first described in rather vague terms by
Anderson, Eve and Horning [LR 1973], it is used in the well-known parser generator
yacc (Johnson [LR 1978]) and is described in more detail by Aho, Sethi and Ullman
[Books 1986]. The algorithm does not seem to have a name; we shall call it the chan￾nel algorithm here.
We again use the grammar of Figure 9.24, which we now know is LALR(1) (but
not LR(0)). Since we want to do look-ahead but do not yet know what to look for, we
use LR(0) items extended with a yet unknown look-ahead field, indicated by an empty ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
parsers will be bigger than LR(0) parsers.
Sec. 9.6] LALR(1) parsing 215
S’ S’-> S#S S’->S ## S’->S#ε S S-> EE S->Eε E E-> E-TE E->E -T- E->E- TT E->E-T ε E-> TT E->T ε T T-> nn T->n ε T-> (E)( T->( E)E T->(E )) T->(E) ε ε ε ε ε ε ε . . . . .................................................... . . ................................... ............. . . . . . . . . .................................................. . . . . . . . . . . . . . . . . . ....................... ............ . . . . . . . . . . ................. . . . . . . . . . . . . . . . . . . . ....................................................... ............................ . . . . . . . . . . . . . . . . . ......... ........................... . . . . . . . . . . . . . . . . . . . . . . ......... . . . . . . . . . . . . . . . . . . . . . . . . ................................................. . . . . . . . . . . . . . . . . . . . . . ......
Figure 9.34 Non-deterministic automaton with channels
square; a possible item would be A->bC De . Using such items, we construct the
non-deterministic LR(0) automaton in the usual fashion; see Figure 9.34. Now suppose
that we were told by some oracle what the look-ahead set of the item S-> E is
(second column, second row in Figure 9.34); call this look-ahead set L. Then we could
draw a number of conclusions. The first is that the item S->E also has L. The next
is that the look-ahead set of the station E is also L, and from there L spreads to
E-> E-T, E->E -T, E->E- T, E->E-T , E-> T and E->T . From E->E- T and E-> T
it flows to the station T and from there it again spreads on.
The flow possibilities of look-ahead information from item to item once it is
known constitute “channels” which connect items. Each channel connects two items
and is one-directional. There are two kinds of channels. From each station channels run
down to each item that derives from it; the input to these channels comes from else￾where. From each item that has the dot in front of a non-terminal A, a channel runs
parallel to the ε-arrow to the station A . If A is the last symbol in the right-hand side,
the channel propagates the look-ahead of the item it starts from. If A is not the last sym￾bol, but is followed by, for instance, CDe (so the entire item would be something like
P→B ACDe ), the input to the channel is FIRST(CDe); such input is said to be “gen￾erated spontaneously”, as opposed to “propagated” input. The full set of channels has
been drawn as dotted lines (carrying propagated input) and as dashed lines (carrying
spontaneous input) in Figure 9.34. It can be represented in a computer as a list of input
and output ends of channels:
216 Deterministic bottom-up parsing [Ch. 9
Input end leads to output end
S’ ==> S’-> S# S’-> S# ==> S’->S # [#] ==> S S’->S # ==> S’->S# ...
Next we run the subset algorithm on this (channelled) non-deterministic automa￾ton in slow motion and watch carefully where the channels go. This procedure
severely taxes the human brain; a more practical way is to just construct the determinis￾tic automaton without concern for channels and then use the above list (in its complete
form) to re-establish the channels. This is easily done by finding the input and output
end items and stations in the states of the deterministic automaton and construct the
corresponding channels. Note that a single channel in the non-deterministic automaton
can occur many times in the deterministic automaton, since items can (and will) be
duplicated by the subset algorithm. The result can best be likened to a bowl of mixed
spaghetti and tagliatelli (the channels and the transitions) with occasional chunks of
ham (the item sets) and will not be printed in this book.
Now we are close to home. For each channel we pump its input to the channel’s
end. First this will only have effect for channels that have spontaneous input: a # will
flow in state 1 from item S’-> S#[ ] to station S[ ], which will then read S[#]; a - from E-> E-T[ ] flows to the E[ ], which changes to E[-]; etc. etc. We go on
pumping until all look-ahead sets are stable and nothing changes any more. We have
now obtained the LALR(1) automaton and can discard the channels (although we must,
of course, keep the transitions).
It is interesting to look more closely at state 4 (see Figure 9.33) and to see how
S->E [#] gets its look-ahead which excludes the -, although the latter is present in the
look-ahead set of E->E -T[#-] in state 4. To this end, a magnified view of the top
left corner of the full channelled LALR(1) automaton is presented in Figure 9.35; it
comprises the states 1 to 4. Again channels with propagated input are dotted, those
with spontaneous input are dashed and transitions are drawn. We can now see more
clearly that S->E [#] derives its look-ahead from S-> E[#] in 1, while E->E -T[#- ] derives its look-ahead (indirectly) from E[-] in 1. The latter has a look-ahead -
generated spontaneously in E-> E-T[ ] in 1. The channel from S-> E[#] to E[#-]
only works “downstream”, which prevents the - from flowing back. LALR(1) parsers
often give one the feeling that they succeed by a narrow margin!
9.6.2 LALR(1) with ε-rules
The same complications arise as in Section 9.5.1 in the determination of the FIRST set
of the rest of the right-hand side: when a non-terminal is nullable we have to also
include the FIRST set of what comes after it, and so on. We meet a special complica￾tion if the entire rest of the right-hand side can be empty: then we may see the look￾ahead , which we do not know yet. In fact this creates a third kind of channel that has
to be watched in the subset algorithm. We shall not be so hypocritical as to suggest the
construction of the LALR(1) automaton for the grammar of Figure 9.31 as an exercise
to the reader, but we hope the general principles are clear. Let a parser generator do the
rest.
Sec. 9.6] LALR(1) parsing 217
S’ [] S’-> S# [] S [#] S-> E [#] E [#-] E-> E-T [#-] E-> T [#-] T [#-] T-> n [#-] T-> (E) [#-] 1 E->T [#-)] 2 T T->n [#-)] 3 nS->E [#] E->E -T [#-] 4 E - n S ( . ... . ....... . ... . ....... . . ... . . ....... . . ... . . ....... . . ... . . ........................ ..................... . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ............................................................................ ................................................................... .............. ..............
Figure 9.35 Part of the deterministic automaton with channels (magnified cut)
9.6.3 Identifying LALR(1) conflicts
When a grammar is not LR(1), the constructed LR(1) automaton will have conflicts,
and the user of the parser generator will have to be notified. Such notification often
takes such forms as:
Reduce/reduce conflict
in state 213 on look-ahead # S -> E versus A -> T + E
This may seem cryptic but the user soon learns to interpret such messages and to reach
the conclusion that indeed “the computer can’t see this”. This is because LR(1) parsers
218 Deterministic bottom-up parsing [Ch. 9
can handle all deterministic grammars and our idea of “what a computer can see” coin￾cides reasonably well with what is deterministic.
The situation is worse for those (relatively rare) grammars that are LR(1) but not
LALR(1). The user never really understands what is wrong with the grammar: the com￾puter should be able to make the right parsing decisions, but it complains that it cannot.
Of course there is nothing wrong with the grammar; the LALR(1) method is just margi￾nally too weak to handle it.
To alleviate the problem, some research has gone into methods to elicit from the
faulty automaton a possible input string that would bring it into the conflict state. See
DeRemer and Pennello [LR 1982]. The parser generator can then display such input
with both its possible partial parse trees.
9.6.4 SLR(1)
There is a simpler way to proceed with the non-deterministic automaton of Figure 9.34.
We can first pump around the look-ahead sets until they are all known and then apply
the subset algorithm, rather than vice versa. This gives us the SLR(1) automaton (for
Simple LR(1)); see DeRemer [LR 1971]. The same automaton can be obtained without
using channels at all: construct the LR(0) automaton and then add to each item
A → . . . a look-ahead set that is equal to FOLLOW(A). Pumping around the look￾ahead sets in the non-deterministic automaton effectively calculates the FOLLOW sets
of each non-terminal and spreads these over each item derived from it.
The SLR(1) automaton is shown in Figure 9.36. FOLLOW(S)={#},
FOLLOW(E)={#, -, )} and FOLLOW(T)={#, -, )}; consequently, only states 1 and 4
differ from those in the LALR(1) automaton of Figure 9.33. The increased look-ahead
sets do not spoil the adequateness of any states: the grammar is also SLR(1).
S’-> S# [] S-> E [#] E-> E-T [#-)] E-> T [#-)] T-> n [#-)] T-> (E) [#-)] 1 T E->T [#-)] 2 T T->( E) [#-)] E-> E-T [#-)] E-> T [#-)] T-> n [#-)] T-> (E) [#-)]6 T->n [#-)] 3 n n S->E [#] E->E -T [#-)]4 - E->E- T [#-)] T-> n [#-)] T-> (E) [#-)]7 - T->(E ) [#-)] E->E -T [#-)]9 S’->S # [] 5 S S’->S# []
11
# E->E-T [#-)]8 T T->(E) [#-)]
10
) E n ( E ( (
Figure 9.36 SLR(1) automaton for the grammar of Figure 9.24
SLR(1) parsers are intermediate in power between LR(0) and LALR(1). Since
Sec. 9.6] LALR(1) parsing 219
SLR(1) parsers have the same size as LALR(1) parsers and are considerably less
powerful, LALR(1) parsers are generally preferred.
9.6.5 Conflict resolvers
When states in an automaton have conflicts and no stronger method is available, the
automaton can still be useful, provided we can find other ways to resolve the conflicts.
Most LR parser generators have built-in automatic conflict resolvers that will make
sure that a deterministic automaton results, whatever properties the input grammar may
have. Such a system will just enumerate the problems it has encountered and indicate
how it has solved them.
Two useful and popular rules of thumb to solve LR conflicts are:
on a shift/reduce conflict, shift (only on those look-aheads for which the conflict
occurs);
on a reduce/reduce conflict, reduce using the longest rule.
Both rules implement the same idea: take the largest bite possible. If you find that there
is a production of A somewhere, make it as long as possible, including as much
material on both sides as possible. This is very often what the grammar writer wants.
Systems with built-in conflict resolvers are a mixed blessing. On the one hand
they allow very weak or even ambiguous grammars to be used (see for instance, Aho,
Johnson and Ullman [Misc 1975]). This can be a great help in formulating grammars
for difficult and complex analysis jobs; see, for instance, Kernighan and Cherry [Misc
1975], who make profitable use of automatic conflict resolution for the specification of
typesetter input.
On the other hand a system with conflict resolvers may impose a structure on the
input where there is none. Such a system does no longer correspond to any grammar￾like sentence-generating mechanism, and it may be very difficult to specify exactly
what strings will be accepted and with what structure. How severe a drawback this is
depends on the application and of course on the capabilities of the parser generator
user.
Note that it is not humanly possible to have dynamic (parse-time) conflict￾resolvers as in the LL case (Section 8.2.5.3). The conflict-resolver would be called
upon in a context that is still under construction, and its user would be required to fully
understand the underlying LR automaton. Some experiments have been done with
interactive conflict resolvers, which consult the user of the parser when a conflict actu￾ally arises: a large chunk of text around the conflict point is displayed and the user is
asked to resolve the conflict. This is useful in, for instance, document conversion. See
Share [Misc 1988].
9.7 FURTHER DEVELOPMENTS OF LR METHODS
Although the LALR(1) method as explained in Section 9.6 is quite satisfactory for most
applications, a number of extensions to and improvements of the LR methods have
been studied. The most important of these will be briefly explained in this section; for
details see the literature, Section 13.6 and the original references. Most of the more
advanced methods have not yet found their way into existing parser generators.
220 Deterministic bottom-up parsing [Ch. 9
9.7.1 Elimination of unit rules
Many rules in practical grammars are of the form A →B; examples can be found in Fig￾ures 2.9, 4.4, 5.2, 7.8, 8.7, 9.37 and many others. Such rules are called unit rules, sin￾gle rules or chain rules. They generally serve naming purposes only and have no
semantics attached to them. Consequently, their reduction is a matter of stack manipu￾lation and state transition only, to no visible purpose for the user. Such “administrative
reductions” can take a considerable part of the parsing time (50% is not unusual). Sim￾ple methods to short-cut such reductions are easily found (for instance, removal by sys￾tematic substitution) but may result in an exponential increase in table size. Better
methods were found but turned out to be complicated and to impair the error detection
properties of the parser. The latter can again be corrected, at the expense of more com￾plication. See Heilbrunner [LR 1985] for a thorough treatment and Chapman [LR
1987] for much practical information.
Note that the term “elimination of unit rules” in this case is actually a misnomer:
the unit rules themselves are not removed from the grammar, but rather their effect
from the parser tables. Compare this to the actual elimination of unit rules in Section
4.2.3.2.
Metre -> Iambic | Trochaic | Dactylic | Anapestic
Figure 9.37 A (multiple) unit rule
9.7.2 Regular right part grammars
As shown in Section 2.3.2.3, there are two interpretations of a regular right-hand side
of a rule: the recursive and the iterative interpretation. The recursive interpretation is
no problem: for a form like A +
anonymous non-terminals are introduced, the reduction
of which entails no semantic actions. The burden of constructing a list of the recog￾nized A’s lies entirely on the semantic routines attached to the A’s.
The iterative interpretation causes more problems. When an A +
has been recog￾nized and is about to be reduced, the stack holds an indeterminate number of A’s:
... A···AAA|
The right end of the handle has been found, but the left end is doubtful. Scooping up
all A’s from the right may be incorrect since some may belong to another rule; after all,
the top of the stack may derive from a rule P→QAAA +. A possible solution is to have
for each reducing state and look-ahead a FS automaton that scans the stack backwards
while examining states in the stack to determine the left end and the actual rule to
reduce to. The part to be reduced (the handle) can then be shown to a semantic routine
which can, for instance, construct a list of A’s, thereby relieving the A’s from a task
that is not structurally theirs. The resulting tables can be enormous and clever algo￾rithms have been designed for their construction and reduction. See for instance,
LaLonde [LR 1981]. Sassa and Nakata [LR 1987] provide a different and simpler tech￾nique.
9.7.3 Improved LALR(1) table construction
The channel algorithm for the construction of LALR(1) parse tables explained in Sec￾tion 9.6.1 is relatively fast as it is, but the underlying automata have a rich structure and
Sec. 9.7] Further developments of LR methods 221
many other algorithms are known for this problem. There exist simple and complicated
variants and improvements, gaining factors of 5 or 10 over the simple channel algorithm. See for instance, DeRemer and Pennello [LR 1982] and the Park, Choe and
Chang [LR 1985, 1987] versus Ives [LR 1986, 1987] discussion. Bermudez and
Logothetis [LR 1989] present a remarkably elegant interpretation of LALR(1) parsing.
9.7.4 Incremental parsing
In incremental parsing, the structured input (a program text, a structured document,
etc.) is kept in linear form together with a parse tree. When the input is (incrementally)
modified by the user, for instance, by typing or deleting a character, it is the task of the
incremental parser to update the corresponding parse tree, preferably at minimum cost.
This requires serious measures inside the parser, to quickly determine the extent of the
damage done to the parse tree, localize its effect and take remedial steps. Formal
requirements for the grammar to make this easier have been found. See for instance,
Degano, Mannucci and Mojana [LR 1988] and many others in Section 13.6.
9.7.5 Incremental parser generation
In incremental parser generation, the parser generator keeps the grammar together with
its parsing table(s) and has to respond quickly to user-made changes in the grammar, by
updating and checking the tables. Research on this is in its infancy. See Heering, Klint
and Rekers [LR 1989] and Horspool [LR 1989].
9.7.6 LR-regular
Rather than trying to resolve inadequate states by looking ahead a fixed number of
tokens, we can have an FS automaton for each inadequate state that is sent off up the
input stream; the state in which this automaton stops is used as a look-ahead. This parsing technique is called LR-regular. See Cˇulik and Cohen [LR 1973].
A variant of this method reads in the entire input into an array and runs a single
FS automaton (derived from the grammar) backwards over the array, recording the
state of the automaton with each token. Next, during (forward) LR parsing, these
recorded states rather than the tokens are used as look-aheads.
9.7.7 Recursive ascent
In Sections 8.2.6 and 8.4 we have seen that an LL parser can be implemented conveniently using recursive descent. Analogously, an LR parser can be implemented
using recursive ascent, but the required technique is not nearly as obvious as in the LL
case. The key idea is to have the recursion stack mimic the LR parsing stack. To this
end there is a procedure for each state; when a token is to be shifted to the stack, the
procedure corresponding to the resulting state is called instead. This indeed constructs
the correct recursion stack, but causes problems when a reduction has to take place: a
dynamically determined number of procedures has to return in order to unstack the
right-hand side. A simple technique to achieve this is to have two global variables,
one, Nt, holding the non-terminal recognized and the second, l, holding the length of
the right-hand side. All procedures will check l and if it is non-zero, they will decrease
l by one and return immediately. Once l is zero, the procedure that finds that situation
will call the appropriate state procedure based on Nt. For details see Roberts [LR 1988,
1989, 1990] and Kruseman Aretz [LR 1988]. The advantage of recursive ascent over
table-driven is its potential for high-speed parsing.

9.8 TOMITA’S PARSER
Now that we have seen the precise criteria for the existence of an LR-like parser for a
grammar, i.e., that there is a handle-recognizing finite-state automaton with no inade￾quate states for that grammar, we become interested in the grammars for which the cri￾teria are not completely fulfilled and for which the automaton has some inadequate
states. Tomita [CF 1986] has given an efficient and very effective approach to such
grammars.
Tomita’s method can be summarized as doing breadth-first search as in Section
7.1.2 over those parsing decisions that are not solved by the LR automaton (which can
be LR(1), LALR(1), SLR(1), LR(0), precedence or even simpler), while at the same
time keeping the partial parse trees in a form akin to the common representation of
Section 7.1.3. More precisely, whenever an inadequate state is encountered on the top
of the stack, the following steps are taken:
1. For each possible reduce in the state, a copy of the stack is made and the reduce is
applied to it. This removes part of the right end of the stack and replaces it with a
non-terminal; using this non-terminal as a move in the automaton, we find a new
state to put on the top of the stack. If this state allows again reductions, this copy
step is repeated until all reduces have been treated, resulting in equally many stack
copies.
2. Stacks that have a right-most state that does not allow a shift on the next input
token are discarded (since they resulted from incorrect guesses). Copies of the
next input token are shifted onto the remaining stacks.
There are a number of things to be noted here. First, if the automaton uses look-ahead,
this is of course taken into account in deciding which reduces are possible in step 1
(ignoring this information would not be incorrect but would cause more stacks to be
copied and subsequently discarded). Second, the process in step 1 may not terminate.
If a grammar has loops (rules of the form A →B, B →A) reduction will alternate
between A and B. There are two solutions: upon creating a stack, check if it is already
there (and then ignore it) or check the grammar in advance for loops (and then reject
it). Third, if all stacks are discarded in step 2 the input was in error, at that specific
point.
SS -> E # E -> E + E E -> d
Figure 9.38 A moderately ambiguous grammar
The above forms the basic mechanism of the Tomita parser. Since simple stack
duplication may cause a proliferation of stacks and is apt to duplicate much information
that is not in need of duplication, two optimizations are used in the practical form of the
parser: combining equal states and combining equal stack prefixes. We shall demon￾strate all three techniques using the grammar of Figure 9.38 as an example. The gram￾mar is a variant of that of Figure 3.1 and is moderately ambiguous. Its LR(0) automa￾ton is shown in Figure 9.39; it has one inadequate state, ➄. Since the grammar is ambi￾guous, there is not much point in using a stronger LR method. For more (and larger!)
examples see Tomita [CF 1986].
Sec. 9.8] Tomita’s parser 223
S-> E# E-> E+E E-> d 1 E S->E # E->E +E 3 + E->E+ E E-> E+E E-> d 4 d E->d 2 d S->E# 6 # E E->E+E E->E +E 5✘ +
Figure 9.39 LR(0) automaton to the grammar of Figure 9.38
9.8.1 Stack duplication
Refer to Figure 9.40, in which we assume the input d+d+d#. The automaton starts in
state ➀ (a). The steps shift (b), reduce, shift, shift (c) and reduce (d) are problem-free
and bring us to state ➄. The last state, however, is inadequate, allowing a reduce and a
shift. True to the breadth-first search method and in accordance with step 1 above, the
stack is now duplicated and the top of one of the copies is reduced (e1) while the other
one is left available for a subsequent shift (e2). Note that no further reduction is possi￾ble and that both stacks now have a different top state. Both states allow a shift and
then another (f1, f2) and then a reduce (g1, g2). Now both stacks carry an inadequate
state on top and need to be duplicated, after which operation one of the copies under￾goes a reduction (h1.1, h1.2, h2.1, h2.2). It now turns out that the stack in h2.1 again
features an inadequate state ➄ after the reduction; it will again have to be duplicated
and have one copy reduced. This gives the stack in h2.1a. Now all possible reductions
have been done and it is time for a shift again. Only state ➂ allows a shift on #, so the
other stacks are discarded and we are left with i1.1 and i2.1a. Both require a reduction,
yielding j1.1 and j2.1a, which are accepting states. The parser stops and has found two
parsings.
In order to save space and to avoid cluttering up the pictures, we have not shown
the partial parse trees that resulted from the various reductions that have taken place. If
we had done so, we would have found the two S’s in j.1.1 and j.2.1a holding the parse
trees of Figure 9.41.
9.8.2 Combining equal states
Examining Figure 9.40 f and g, we see that once both stacks have the same state on top,
further actions on both stacks will be identical, and the idea suggests itself to combine
the two stacks to avoid duplicate work. This approach is depicted in Figure 9.42(f) and
(g) (Figure 9.42(a) to (e) are identical to those of Figure 9.40 and are not shown). That
this is, however, not entirely without problems becomes evident as soon as we need to
do a reduce that spans the merge point. This happens in (g), which also features an
inadequate state. Now a number of things happen. First, since the state is inadequate,
the whole set of combined stacks connected to it are duplicated. One copy (h3) is left
for the shift, the other is subjected to the reduce. This reduce, however, spans the merge
224 Deterministic bottom-up parsing [Ch. 9 a ➀ d+d+d# shift
b ➀ d ➁ +d+d# reduce, shift, shift
c ➀ E ➂ + ➃ d ➁ +d# reduce
d ➀ E ➂ + ➃ E ➄ +d# duplicate to e1 and
e2; reduce e1
e1 ➀ E ➂ +d# shift, shift, to f1
e2 ➀ E ➂ + ➃ E ➄ +d# shift, shift, to f2
f1 ➀ E ➂ + ➃ d ➁ # reduce to g1
f2 ➀ E ➂ + ➃ E ➄ + ➃ d ➁ # reduce to g2
g1 ➀ E ➂ + ➃ E ➄ # duplicate to h1.1 and
h1.2; reduce h1.1
g2 ➀ E ➂ + ➃ E ➄ + ➃ E ➄ # duplicate to h2.1 and
h2.2; reduce h2.1
h1.1 ➀ E ➂ # shift to i1.1
h1.2 ➀ E ➂ + ➃ E ➄ # discard
h2.1 ➀ E ➂ + ➃ E ➄ # reduce again, to h2.1a
h2.2 ➀ E ➂ + ➃ E ➄ + ➃ E ➄ # discard
h2.1a ➀ E ➂ # shift to i2.1a
i1.1 ➀ E ➂ # ➅ reduce to j1.1
i2.1a ➀ E ➂ # ➅ reduce to j2.1a
j1.1 ➀ S accept
j2.1a ➀ S accept
Figure 9.40 Sequence of stack configurations while parsing d+d+d# S E # E + E E + E d d d S E # E + E d E + E d d
Figure 9.41 Parse trees in the accepting states of Figure 9.40
point (state ➃) and extends up both stacks, comprising a different left-most E in both
branches. To perform it properly, the stack combination is undone and the reduce is
applied to both stacks (h1, h2). The reduce in (h2) results again in state ➄, which
necessitates another copy operation (h2.1, h2.2) and a reduce on one of the copies
(h2.1).
Now the smoke has cleared and we have obtained five stacks (h1, h2.1, h2.2 and a
double h3) having four tops, two of which (h1 and h2.1) carry the state ➂, while the
other two (h2.2 and h3) carry a ➄. These can be combined into two bundles (h’ and h").
Next the shift of # obliterates all stacks with top state ➄ (i). State ➅, which is now on
Sec. 9.8] Tomita’s parser 225
f ➀ E ➂ + ➃ d ➁ # reduce to g ➀ E ➂ + ➃ E ➄ + g ➀ E ➂ + ➃ E ➄ # duplicate to g’, g" ➀ E ➂ + ➃ E ➄ +
g’ ➀ E ➂ + ➃ E ➄ #
for reduce; undo
➀ E ➂ + ➃ E ➄ + combination: g’.1, g’.2
g" ➀ E ➂ + ➃ E ➄ # for shift: h3 ➀ E ➂ + ➃ E ➄ +
g’.1 ➀ E ➂ + ➃ E ➄ # reduce to h.1
g’.2 ➀ E ➂ + ➃ E ➄ + ➃ E ➄ # reduce to h.2
h1 ➀ E ➂ # shift
h2 ➀ E ➂ + ➃ E ➄ # reduce again, h2.1, h2.2
h3 ➀ E ➂ + ➃ E ➄ # shift ➀ E ➂ + ➃ E ➄ +
h2.1 ➀ E ➂ # shift
h2.2 ➀ E ➂ + ➃ E ➄ # shift
h’ ➀ E ➂ # shift to i ➀ E ➀ E ➂ +
h" ➀ E ➂ + ➃ E ➄ + ➃ E ➄ # discard
➀ E ➂ + ➃ E i ➀ E ➂ # ➅
for reduce; undo
➀ E combination, i’, i"
i’ ➀ E ➂ # ➅ reduce to j1
i" ➀ E ➂ # ➅ reduce to j2
j1 ➀ S accept
j2 ➀ S accept
Figure 9.42 Stack configurations with equal-state combination
226 Deterministic bottom-up parsing [Ch. 9
top, induces a reduce spanning a merge point, the combined stack is split and the
reduce is applied to both stacks, resulting in the two parsings for d+d+d# (j1, j2).
Although in this example the stack combinations are undone almost as fast as they
are performed, stack combination greatly contributes to the parsers efficiency in the
general case. It is essential in preventing exponential growth wherever possible. Note,
however, that, even though the state ➂ in i is preceded by E in all branches, we cannot
combine these E’s since they differ in the partial parse trees attached to them.
9.8.3 Combining equal stack prefixes
When step 1 above calls for the stack to be copied, there is actually no need to copy the
entire stack; just copying the top states suffices. When we duplicate the stack of Figure
9.40(d), we have one forked stack for (e):
e’ ➀ E ➂ + ➃ E ➄ +d# ➄
Now the reduce is applied to one top state ➄ and only so much of the stack is copied as
is subject to the reduce:
e ➀ E ➂ +d#
shift
E ➂ + ➃ E ➄ shift
In our example almost the entire stack gets copied, but if the stack is somewhat larger,
considerable savings can result.
Note that the title of this section is in fact incorrect: in practice no equal stack pre￾fixes are combined, they are never created in the first place. The pseudo-need for com￾bination arises from our wish to explain first the simpler but impractical form of the
algorithm in Section 9.8. A better name for the technique would be “common stack
prefix preservation”.
Both optimizations can combine to produce shuntyard-like stack constellations
like the one in Figure 9.43; here Tomita’s notation is used, in which represents a
state and a symbol. The reader may verify that the constellation represents seven
stacks.
Figure 9.43 Stack constellation with combined heads and tails, in Tomita’s notation
9.8.4 Discussion
We have explained Tomita’s parser using an LR(0) table; in his book Tomita uses an
SLR(1) table. In fact the method will work with any bottom-up table or even with no
table at all. The weaker the table, the more non-determinism will have to be resolved
by breadth-first search, and for the weakest of all tables, the absent table, the method
Sec. 9.8] Tomita’s parser 227
degenerates into full breadth-first search. Since the latter is involved in principle in all
variants of the method, the time requirements are in theory exponential; in practice they
are very modest, generally linear or slightly more than linear and almost always less
than those of Earley’s parser or of the CYK parser, except for very ambiguous gram￾mars.
9.9 NON-CANONICAL PARSERS
All parsers treated so far in this chapter are “canonical parsers”, which means that they
identify the productions in reverse right-most order. A “non-canonical parser” identi￾fies the productions in arbitrary order, or rather in an unrestricted order. Removing the
restriction on the identification order of the productions makes the parsing method
stronger, as can be expected. Realistic examples are too complicated to be shown here
(see Tai [LR 1979] for some), but the following example will demonstrate the princi￾ple.
SS -> P Q | R S P -> a Q -> b c R -> a S -> b d
Figure 9.44 A short grammar for non-canonical parsing
The grammar of Figure 9.44 produces two sentences, abc and abd. Suppose the input
is abc. The a can be a P or an R; for both, the look-ahead is a b, so an LR(1) parser
cannot decide whether to reduce to P or to R and the grammar is not LR(1). Suppose,
however, that we leave the undecidable undecided and search on for another reducible
part (called a phrase in non-canonical parsing to distinguish it from the “handle”).
Then we find the tokens bc, which can clearly be reduced to Q. Now, this Q provides
the decisive look-ahead for the reduction of the a. Since P can be followed by a Q and R
cannot, reduction to P is indicated based on look-ahead Q; the grammar is NCLR(1)
(Non-Canonical LR(1)). We see that in non-canonical parsers the look-ahead sets con￾tain non-terminals as well as terminals.
There are disadvantages too. After each reduce, one has to rescan possibly large
parts of the stack. This may jeopardize the linear time requirement, although with some
dexterity the problem can often be avoided. A second problem is that rules are recog￾nized in essentially arbitrary order which makes it difficult to attach semantics to them.
A third point is that although non-canonical parsers are more powerful than canonical
ones, they are only marginally so: most grammars that are not LR(1) are not NCLR(1)
either.
Overall the advantages do not seem to outweigh the disadvantages and non￾canonical parsers are not used often. See, however, Salomon and Cormack [LR 1989].
Non-canonical precedence parsing has been described by Colmerauer [Precedence
1970].
228 Deterministic bottom-up parsing [Ch. 9
9.10 LR(k) AS AN AMBIGUITY TEST
It is often important to be sure that a grammar is not ambiguous, but unfortunately it
can be proved that there cannot be an algorithm that can, for every CF grammar, decide
whether it is ambiguous or unambiguous. This is comparable to the situation described
in 3.5.2, where the fundamental impossibility of a recognizer for Type 0 grammars was
discussed. (See Hopcroft and Ullman [Books 1979, p. 200]). The most effective ambiguity test for a CF grammar we have at present is the construction of the corresponding
LR(k) automaton, but it is of course not a perfect test: if the construction succeeds, the
grammar is guaranteed to be unambiguous; if it fails, in principle nothing is known. In
practice, however, the reported conflicts will often point to genuine ambiguities.
Theoretically, the construction of an LR-regular parser (see 9.7.6) is an even stronger
test, but the choice of the look-ahead automaton is problematic.`
const DeterministicBottomUpParsing = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
export default DeterministicBottomUpParsing