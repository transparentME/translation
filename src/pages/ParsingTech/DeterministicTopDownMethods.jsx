import MarkdownTransfer from '../../components/MarkdownTransfer'

const content =`In Chapter 6 we discussed two general top-down methods: one using breadth-first
search and one using depth-first search. These methods have in common the need to
search to find derivations, and thus are not efficient. In this chapter and the next we
will concentrate on parsers that do not have to search: there will always be only one
possibility to choose from. Parsers with this property are called deterministic. Deter￾ministic parsers are much faster than non-deterministic ones, but there is a penalty: the
class of grammars that the parsing method is suitable for, while depending on the
method chosen, is more restricted than that of the grammars suitable for non￾deterministic parsing methods.
In this chapter, we will focus our attention on deterministic top-down methods.
As has been explained in Section 3.6.5, there is only one such method, this in contrast
with the deterministic bottom-up methods, which will be discussed in the next chapter.
From Chapters 3 and 6 we know that in a top-down parser we have a prediction for the
rest of the input, and that this prediction has either a terminal symbol in front, in which
case we “match”, or a non-terminal, in which case we “predict”.
It is the predict step that, until now, has caused us so much trouble. The predict
step consists of replacing a non-terminal by one of its right-hand sides, and if we have
no means to decide which right-hand side to select, we have to try them all. One res￾triction we could impose on the grammar, one that immediately comes to mind, is lim￾iting the number of right-hand sides of each non-terminal to one. Then we would need
no search, because no selection would be needed. However, such a restriction is far too
severe, as it would leave us with only finite languages. So, limiting the number of
right-hand sides per non-terminal to one is not a solution.
There are two sources of information that could help us in selecting the right
right-hand side. First of all, there is the partial derivation as it is constructed so far.
However, apart from the prediction this does not give us any information about the rest
of the input. The other source of information is the rest of the input. We will see that
looking at the next symbol or the next few symbols will, for certain grammars, tell us
which choice to take.
Ch. 8] Replacing search by table look-up 165
8.1 REPLACING SEARCH BY TABLE LOOK-UP
Grammars that make it particularly easy to at least limit the search are ones in which
each right-hand side starts with a terminal symbol. In this case, a predict step is always
immediately followed by a match step, matching the next input symbol with the symbol
starting the right-hand side selected in the prediction. This match step can only succeed
for right-hand sides that start with this input symbol. The other right-hand sides will
immediately lead to a match step that will fail. We can use this fact to limit the number
of predictions as follows: only the right-hand sides that start with a terminal symbol
that is equal to the next input symbol will be considered. For instance, consider the
grammar of Figure 6.1, repeated in Figure 8.1, and the input sentence aabb. S -> aB | bA A -> a | aS | bAA B -> b | bS | aBB
Figure 8.1 A grammar producing sentences with an equal number of a’s and b’s
Using the breadth-first top-down method of Chapter 6, extended with the observation
described above, results in the steps of Figure 8.2: (a) presents the start of the automa￾ton; we have added the # end-marker; only one right-hand side of S starts with an a, so
this is the only applicable right-hand side; this leads to (b); next, a match step leads to
(c); the next input symbol is again an a, so only one right-hand side of B is applicable,
resulting in (d); (e) is the result of a match step; this time, the next input symbol is a b,
so two right-hand sides of B are applicable; this leads to (f); (g) is the result of a match
step; again, the next input symbol is a b, so two right-hand sides of B are applicable;
only one right-hand side of S is applicable; this leads to (h), and this again calls for a
match step, leading to (i); now, there are no applicable right-hand sides for S and A,
because there are no right-hand sides starting with a #; thus, these predictions are dead
ends; this leaves a match step for the only remaining prediction, leading to (j).
We could enhance the efficiency of this method even further by precomputing the
applicable right-hand sides for each non-terminal/terminal combination, and enter these
in a table. For the grammar of Figure 8.1, this would result in the table of Figure 8.3.
Such a table is called a parse table.
Despite its title, most of this chapter concerns the construction of these parse
tables. Once such a parse table is obtained, the actions of the parser are obvious. The
parser does not need the grammar any more. Instead, every time a predict step is called
for, the parser uses the next input symbol and the non-terminal at hand as indices in the
parse table. The corresponding table entry contains the right-hand sides that have to be
considered. For instance, in Figure 8.2(e), the parser would use input symbol b and
non-terminal B to determine that it has to consider the right-hand sides B1
and B2. If
the corresponding table entry is empty, we have found an error in the input and the
input sentence cannot be derived from the grammar. Using the parse table of Figure
8.3 instead of the grammar of Figure 8.1 for parsing the sentence aabb will again lead
to Figure 8.2. The advantage of using a parse table is that we do not have to check all
right-hand sides of a non-terminal any more, to see if they start with the right terminal
symbol.
Still, we have a search process, albeit a more limited one than we had before. The
search is now confined to the elements of the parse table entries. In fact, we now only
166 Deterministic top-down methods [Ch. 8
(a) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aabb# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S#
(b) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aabb# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1 aB#
(c) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ a abb# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1a B#
(d) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ a abb# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1aB3 aBB#
(e) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aa bb# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1aB3a BB#
(f) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aa bb# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1aB3aB1 bB# S1aB3aB2 bSB#
(g) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aab b# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1aB3aB1b B# S1aB3aB2b SB#
(h) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aab b# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1aB3aB1bB1 b# S1aB3aB1bB2 bS# S1aB3aB2bS2 bAB#
(i) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aabb # ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1aB3aB1bB1b # S1aB3aB1bB2b S# S1aB3aB2bS2b AB#
(j) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ aabb# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S1aB3aB1bB1b#
Figure 8.2 The limited breadth-first parsing of the sentence aabb# ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ a b # ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S S1: aB S2: bA ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
A A1: a A3: bAA A2: aS ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
B B3: aBB B1: b B2: bS
Figure 8.3 The parse table for the grammar of Figure 8.1
need a search because of the (A,a) and the (B,b) entry of the table. These entries have
more than one element, so we need the search to determine which one results in a
derivation of the input sentence.
This last observation is an important one: it immediately leads to a restriction that
Sec. 8.1] Replacing search by table look-up 167
we could impose on the grammar, to make the parsing deterministic: we could require
that each parse table entry contain at most one element. In terms of the grammar, this
means that all right-hand sides of a non-terminal start with a different terminal symbol.
A grammar that fulfills this requirement is called a simple LL(1) grammar (SLL(1)), or
an s-grammar. Here, LL(1) means that the grammar allows a deterministic parser that
operates from Left to right, produces a Left-most derivation, using a look-ahead of one
(1) symbol.
Consider for instance the grammar of Figure 8.4.
S -> aB B -> b | aBb
Figure 8.4 An example SLL(1) grammar
This grammar generates all sentences starting with a number of a’s, followed by an
equal number of b’s. The grammar is clearly SLL(1). It leads to the parse table of Fig￾ure 8.5. ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ a b # ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S S1: aB ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
B B2: aBb B1: b
Figure 8.5 The parse table for the grammar of Figure 8.4
The parsing of the sentence aabb is presented in Figure 8.6. Again we have added the
# end-marker.
aabb# S# aabb# S1 aB# a abb# S1a B# a abb# S1aB2 aBb# aa bb# S1aB2a Bb# aa bb# S1aB2aB1 bb# aab b# S1aB2aB1b b# aabb # S1aB2aB1bb # aabb# S1aB2aB1bb#
Figure 8.6 The SLL(1) parsing of the sentence aabb#
As expected, there is always only one prediction, so no search is needed. Thus, the pro￾cess is deterministic, and therefore very efficient. The efficiency could be enhanced
even further by combining the predict step with the match step that always follows the
predict step.
So, SLL(1) grammars lead to simple and very efficient parsers. However, the res￾trictions that we have placed on the grammar are severe. Not many practical grammars
are SLL(1), although many can be transformed into SLL(1) form. In the next section,
168 Deterministic top-down methods [Ch. 8
we will consider a more general class of grammars that still allows for the same kind of
parser.
8.2 LL(1) GRAMMARS
For the deterministic top-down parser described in the previous section, the crucial res￾triction placed on the grammar is that all right-hand sides of a non-terminal start with a
different terminal symbol. This ensures that each parse table entry contains at most one
element. In this section, we will drop the requirement that right-hand sides start with a
terminal symbol. We will see that we can still construct a parse table in that case. Later
on, we will see that we can even construct a parse table for grammars with ε-rules.
8.2.1 LL(1) grammars without ε-rules
If a grammar has no ε-rules, there are no non-terminals that derive the empty string. In
other words, each non-terminal ultimately derives strings of terminal symbols of length
at least one, and this also holds for each right-hand side. The terminal symbols that start
these strings are the ones that we are interested in. Once we know for each right-hand
side which terminal symbols can start a string derived from this right-hand side, we can
construct a parse table, just as we did in the previous section. So, we have to compute
this set of terminal symbols for each right-hand side.
8.2.1.1 FIRST1
sets
These sets of terminal symbols are called the FIRST 1
sets: if we have a non-empty sen￾tential form x, then FIRST1(x) is the set of terminal symbols that can start a sentential
form derived from x in zero or more production steps. The subscript 1
indicates that the
set contains single terminal symbols only. Later, we will see FIRSTk
sets, consisting of
strings of terminal symbols of length at most k. For now, we will drop the subscript 1:
we will use FIRST instead of FIRST1. If x starts with a terminal symbol, then
FIRST(x) is a set that has this symbol as its only member. If x starts with a non￾terminal A, then FIRST(x) is equal to FIRST(A), because A cannot produce ε. So, if we
can compute the FIRST set for any non-terminal A, we can compute it for any senten￾tial form x. However, FIRST(A) depends on the right-hand sides of the A-rules: it is
the union of the FIRST sets of these right-hand sides. These FIRST sets may again
depend on the FIRST set of some non-terminal. This could even be A itself, if the rule
is directly or indirectly left-recursive. This observation suggests the iterative process
described below to compute the FIRST sets of all non-terminals:
We first initialize the FIRST sets to the empty set.
Then we process each grammar rule in the following way: if the right-hand side
starts with a terminal symbol, we add this symbol to the FIRST set of the left￾hand side, since it can be the first symbol of a sentential form derived from the
left-hand side. If the right-hand side starts with a non-terminal symbol, we add all
symbols of the present FIRST set of this non-terminal to the FIRST set of the
left-hand side. These are all symbols that can be the first terminal symbol of a
sentential form derived from the left-hand side.
The previous step is repeated until no more new symbols are added to any of the
FIRST sets.
Eventually, no more new symbols can be added, because the maximum number of ele￾ments in a FIRST set is the number of symbols, and the number of FIRST sets is equal
Sec. 8.2] LL(1) grammars 169
to the number of non-terminals. Therefore, the total number of times that a new sym￾bol can be added to any FIRST set is limited by the product of the number of symbols
and the number of non-terminals.
8.2.1.2 Producing the parse table
With the help of these FIRST sets, we can now construct a parse table for the grammar.
We process each grammar rule A→α in the following way: if α starts with a terminal
symbol a, we add α to the (A,a) entry of the parse table; if α starts with a non-terminal,
we add α to the (A,a) entry of the parse table for all symbols a in FIRST(α).
Now let us compute the parse table for the example grammar of Figure 8.7. This
grammar describes a simple language that could be used as the input language for a
rudimentary consulting system: the user enters some facts, and then asks a question.
There is also a facility for sub-sessions. The contents of the facts and questions are of
no concern here. They are represented by the word STRING, which is regarded as a ter￾minal symbol.
Session -> Fact Session Session -> Question Session -> ( Session ) Session Fact -> ! STRING Question -> ? STRING
Figure 8.7 An example grammar
We first compute the FIRST sets. Initially, the FIRST sets are all empty. Then,
we process all grammar rules in the order of Figure 8.7. The rule Session -> Fact Session results in adding the symbols from FIRST(Fact) to FIRST(Session), but
FIRST(Fact) is still empty. The rule Session -> Question results in adding the
symbols from FIRST(Question) to FIRST(Session), but FIRST(Question) is still
empty too. The rule Session -> ( Session ) Session results in adding ( to
FIRST(Session). The rule Fact -> ! STRING results in adding ! to FIRST(Fact),
and the rule Question -> ? STRING results in adding ? to FIRST(Question). So,
after processing all right-hand sides once, we have the following:
FIRST( ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Session) FIRST(Fact) FIRST(Question) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
( ! ?
Next, we process all grammar rules again. This time, the rule Session -> Fact Session will result in adding ! (from FIRST(Fact)) to FIRST(Session), the rule
Session -> Question will result in adding ? to FIRST(Session), and no other
changes will take place. So now we get:
FIRST( ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Session) FIRST(Fact) FIRST(Question) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
( ! ? ! ?
There were some changes, so we have to repeat this process again. This time, there are
no changes, so the table above presents the FIRST sets of the non-terminals. Now we
have all the information we need to create the parse table. We have to add Fact
170 Deterministic top-down methods [Ch. 8 Session to the (Session,a) entry for all terminal symbols a in FIRST(Fact Ses- sion). The only terminal symbol in FIRST(Fact Session) is !, so we add Fact Session to the (Session,!) entry. Likewise, we add Question to the (Session,?)
entry. Next we add ( Session ) Session to the (Session,() entry, ! STRING to
the (Fact,!) entry, and ? STRING to the (Question,?) entry. This results in the parse
table of Figure 8.8. ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ! ? ( ) STRING # ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ ession Fact Session Question ( Session ) Session Q￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ uestion ? STRING Fact ! STRING
Figure 8.8 The parse table for the grammar of Figure 8.7
All parse table entries have at most one element, so the parser will be deterministic. A
grammar without ε-rules is called LL(1) if all entries of the parse table, as constructed
above, have at most one element, or, in other words, if for every non-terminal A the
FIRST sets of A are pairwise disjoint (no symbol occurs in more than one). We have
lost the S (simplicity) of SLL(1), but the parser is still as simple as before. Producing
the parse table has become more difficult, but we have gained a lot: many practical
grammars are LL(1), or are easily transformed into an LL(1) grammar.
8.2.2 LL(1) grammars with ε-rules
Not allowing for ε-rules is, however, still a major drawback. Certain language con￾structs are difficult, if not impossible, to describe with an LL(1) grammar without ε-
rules. For instance, non-terminals that describe lists of terminals or non-terminals are
difficult to express without ε-rules. Of course, we could write
A → aA | a
for a list of a’s, but this is not LL(1). Compare also the grammar of Figure 8.7 with the
one of Figure 8.9. They describe the same language, but the one of Figure 8.9 is much
clearer.
Session -> Facts Question | ( Session ) Session Facts -> Fact Facts | ε Fact -> ! STRING Question -> ? STRING
Figure 8.9 The grammar of Figure 8.7 rewritten
8.2.2.1 Extending the FIRST sets
The main problem with allowing ε-rules is that the FIRST sets, as we have discussed
them in the previous section, are not sufficient any more. For instance, the Facts
non-terminal in the grammar of Figure 8.9 has an ε-rule. The FIRST set for this right￾hand side is empty, so it does not tell us on which look-ahead symbols we should
choose this right-hand side. Also, in the presence of ε-rules, the computation of the
FIRST sets itself needs some revision. For instance, if we compute the FIRST set of
Sec. 8.2] LL(1) grammars 171
the first right-hand side of Session using the method of the previous section, ? will
not be a member, but it should, because Facts can derive ε (it is transparent), and then
? starts a sentential form that can be derived from Session.
Let us first extend the FIRST definition to also deal with ε-rules. This time, in
addition to terminal symbols, ε will also be allowed as a member of a FIRST set. We
will now also have to deal with empty sentential forms, so we will sometimes need the
FIRST(ε) set. We will define it as the set containing only the empty string ε. We will
also add ε to the FIRST set of a sentential form if this sentential form derives ε.
These may seem minor changes, but the presence of ε-rules affects the computa￾tion of the FIRST sets. FIRST(u1u2 . . . un) is now equal to FIRST(u1
), ε excluded,
but extended with FIRST(u2 . . . un) if u1 derives ε. In particular, FIRST(uε) (=
FIRST(u)) is equal to FIRST(u), ε excluded, but extended with FIRST(ε) (= {ε}) if u
derives ε.
Apart from this, the computation of the revised FIRST sets proceeds in exactly the
same way as before. When we need to know whether a non-terminal A derives ε, we
have two options: we could compute this information separately, using the method
described in Section 4.2.1, or we could check if ε is a member of the FIRST(A) set as it
is computed so far. This last option uses the fact that if a non-terminal derives ε, ε will
ultimately be a member of its FIRST set.
Now let us compute the FIRST sets for the grammar of Figure 8.9. They are first
initialized to the empty set. Then, we process each grammar rule: the rule Session -> Facts Question results in adding the terminal symbols from FIRST(Facts) to
FIRST(Session). However, FIRST(Facts) is still empty. The rule Session -> ( Session ) Session results in adding ( to FIRST(Session). Then, the rule Facts -> Fact Facts results in adding the symbols from FIRST(Fact) to FIRST(Facts),
and the rule Facts -> ε results in adding ε to FIRST(Facts). Then, the rule Fact -> ! STRING results in adding ! to FIRST(Fact), and the rule Question -> ? STRING results in adding ? to FIRST(Question). This completes the first pass over
the grammar rules, resulting in:
FIRST( ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Session) FIRST(Facts) FIRST(Fact) FIRST(Question) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
( ε ! ?
The second pass is more interesting: this time, we know that Facts derives ε, and
therefore, the rule Session -> Facts Question results in adding the symbols from
FIRST(Question) to FIRST(Session). The rule Facts -> Fact Facts results in
adding ! to FIRST(Facts). So we get:
FIRST( ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Session) FIRST(Facts) FIRST(Fact) FIRST(Question) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
( ? ε ! ! ?
In the third pass, the only change is the addition of ! to FIRST(Session), because it is
now a member of FIRST(Facts). So we have:
FIRST( ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Session) FIRST(Facts) FIRST(Fact) FIRST(Question) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
( ? ! ε ! ! ?
The fourth pass does not result in any new additions.
172 Deterministic top-down methods [Ch. 8
The question remains how to decide when an ε right-hand side or, for that matter,
a right-hand side that derives ε is to be predicted. Suppose that we have a grammar
rule
A → α1 | α2 | . . . | αn
and also suppose that αm is or derives ε. Now suppose we find A at the front of a pred￾iction, as in
. . . a ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
. . . # ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
. . . Ax#
where we again have added the # end-marker. A breadth-first parser would have to
investigate the following predictions:
. . . a ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
. . . # ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
. . . α1x# . . . . . . . . . . . αnx#
None of these predictions derive ε, because of the end-marker (#). We know how to
compute the FIRST sets of these predictions. If the next input symbol is not a member
of any of these FIRST sets, either the prediction we started with (Ax#) is wrong, or
there is an error in the input sentence. Otherwise, the next input symbol is a member of
one or more of these FIRST sets, and we can strike out the predictions that do not have
the symbol in their FIRST set. If none of these FIRST sets have a symbol in common
with any of the other FIRST sets, the next input symbol can only be a member of at
most one of these FIRST sets, so at most one prediction remains, and the parser is
deterministic at this point.
A context-free grammar is called LL(1) if this is always the case. In other words,
a grammar is LL(1) if for any prediction Ax#, with A a non-terminal with right-hand
sides α1, ..., and αn, the sets FIRST(α1x#), ..., and FIRST(αnx#) are pairwise disjoint
(no symbol is a member of more than one set). This definition does not conflict with
the one that we gave in the previous section for grammars without ε-rules, because in
this case FIRST(αix#) is equal to FIRST(αi
), so in this case the sets FIRST(α1
), ..., and
FIRST(αn) are pairwise disjoint.
8.2.2.2 The need for FOLLOW sets
So, what do we have now? We can construct a deterministic parser for any LL(1)
grammar. This parser operates by starting with the prediction S#, and its prediction
steps consist of replacing the non-terminal at hand with each of its right-hand sides,
computing the FIRST sets of the resulting predictions, and checking whether the next
input symbol is a member of any of these sets. We then continue with the predictions
for which this is the case. If there is more than one, the parser announces that the gram￾mar is not LL(1) and stops. Although this is a deterministic parser, it is not very effi￾cient, because it has to compute several FIRST sets at each prediction step. We cannot
compute all these FIRST sets before starting the parser, because such a FIRST set
Sec. 8.2] LL(1) grammars 173
depends on the whole prediction (of which there are infinitely many), not just on the
non-terminal. So, we still do not know if, and if so, how we can construct a parse table
for an LL(1) grammar with ε-rules, nor do we have a method to determine if a gram￾mar is LL(1).
Now suppose we have a prediction Ax# and a rule A→α, and α is or derives ε.
The input symbols that lead to the selection of A→α are the symbols in the set
FIRST(αx#), and this set of symbols is formed by the symbols in FIRST(α), extended
with the symbols in FIRST(x#) (because of the transparency of α). The selection of
A→α on an input symbol that is not a member of FIRST(α) is called an ε-move. The
set FIRST(x#) is the problem: we cannot compute it at parser generation time. What
we can calculate, though, is the union of all FIRST(x#) sets such that x# can follow A
in any prediction. This is just the set of all terminal symbols that can follow A in any
sentential form derivable from S# (not just the present prediction) and is called, quite
reasonably, the FOLLOW set of A, FOLLOW(A).
Now it would seem that such a gross approximation would seriously weaken the
parser or even make it incorrect. This is not so. Suppose that this set contains a symbol
a that is not a member of FIRST(x#), and a is the next input symbol. If a is not a
member of FIRST(A), we will predict A→α, and we will ultimately end up with a fail￾ing match, because αx# does not derive a string starting with an a. So, the input string
will (correctly) be rejected, although the error will be detected a bit later than before,
because the parser will make some ε-moves before finding out that something is wrong.
If a is a member of FIRST(A) then we may have a problem if a is a member of one of
the FIRST sets of the other right-hand sides of A. We will worry about this a bit later.
The good thing about the FOLLOW set is that we can compute it at parser genera￾tion time. Each non-terminal has a FOLLOW set, and they can be computed as follows:
as with the computation of the FIRST sets, we start with the FOLLOW sets all
empty.
Next we process all right-hand sides, including the S# one. Whenever a right-hand
side contains a non-terminal, as in A→ . . . By, we add all symbols from FIRST(y)
to FOLLOW(B); these symbols can follow a B. In addition, if y derives ε, we add
all symbols from FOLLOW(A) to FOLLOW(B).
The previous step is repeated until no more new symbols can be added to any of
the FOLLOW sets.
Now let us go back to our example and compute the FOLLOW sets. Starting with
Session #, # is added to FOLLOW(Session). Next, the symbols of
FIRST(Question) are added to FOLLOW(Facts), because of the rule Session -> Facts Question. This rule also results in adding all symbols of
FOLLOW(Session) to FOLLOW(Question). The rule Session -> ( Session ) Session results in adding the ) symbol to FOLLOW(Session) and the addition of
all symbols of FOLLOW(Session) to FOLLOW(Session), which does not add
much. The next rule is the rule Facts -> Fact Facts. All symbols from
FIRST(Facts) are added to FOLLOW(Fact), and all symbols from
FOLLOW(Facts) are added to FOLLOW(Facts). The other rules do not result in
any additions. So, after the first pass we have:
FOLLOW( ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Session) FOLLOW(Facts) FOLLOW(Fact) FOLLOW(Question) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
) # ? ! #
174 Deterministic top-down methods [Ch. 8
In the second pass, ) is added to FOLLOW(Question), because it is now a member of
FOLLOW(Session), and all members of FOLLOW(Session) become a member of
FOLLOW(Question) because of the rule Session -> Facts Question. No
other changes take place. The resulting FOLLOW sets are presented below:
FOLLOW( ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ Session) FOLLOW(Facts) FOLLOW(Fact) FOLLOW(Question) ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
) # ? ! # )
8.2.2.3 Using the FOLLOW sets to produce a parse table
Once we know the FOLLOW set for each non-terminal that derives ε, we can once
again construct a parse table: first, we compute the FIRST set of each non-terminal.
This also tells us which non-terminals derive ε. Next, we compute the FOLLOW set of
each non-terminal. Then, starting with an empty parse table, we process each grammar
rule A→α as follows: we add α to the (A,a) entry of the parse table for all terminal
symbols a in FIRST(α), as we did before. This time however, we also add α to the
(A,a) entry of the parse table for all terminal symbols a in FOLLOW(A) when α is or
derives ε (when FIRST(α) contains ε). A shorter way of saying this is that we add α to
the (A,a) entry of the parse table for all terminal symbols a in FIRST(α FOLLOW(A)).
This last set consists of the union of the FIRST sets of the sentential forms αb for all
symbols b in FOLLOW(A).
Now let us produce a parse table for our example. The Session -> Facts Question rule does not derive ε, because Question does not. Therefore, only the ter￾minal symbols in FIRST(Facts Question) lead to addition of this rule to the table.
These symbols are ! and ? (because Facts also derives ε). Similarly, all other rules
are added, resulting in the parse table presented in Figure 8.10. ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ( ) # ! ? STRING ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
S￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ession ( Session ) Session Facts Question Facts Question Facts Fact Facts ε ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
F￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ act ! STRING Question ? STRING
Figure 8.10 The parse table for the grammar of Figure 8.9
8.2.3 LL(1) versus strong-LL(1)
If all entries of the resulting parse table have at most one element, the parser is again
deterministic. In this case, the grammar is called strong-LL(1) and the parser is called
a strong-LL(1) parser. In the literature, strong-LL(1) is referred to as “strong LL(1)”
(note that there is a space between the words “strong” and “LL”). However, we find
this term a bit misleading because it suggests that the class of strong-LL(1) grammars
is more powerful than the class of LL(1) grammars, but this is not the case. Every
strong-LL(1) grammar is LL(1).
It is perhaps more surprising that every LL(1) grammar is strong-LL(1). In other
words, every grammar that is not strong-LL(1) is not LL(1), and this is demonstrated
with the following argument: if a grammar is not strong-LL(1), there is a parse table
entry, say (A,a), with at least two elements, say α and β. This means that a is a
member of both FIRST(α FOLLOW(A)) and FIRST(β FOLLOW(A)). Now, there are
three possibilities:
Sec. 8.2] LL(1) grammars 175
a is a member of both FIRST(α) and FIRST(β). In this case, the grammar cannot
be LL(1), because for any prediction Ax#, a is a member of both FIRST(αx#) and
FIRST(βx#).
a is a member of either FIRST(α) or FIRST(β), but not both. Let us say that a is a
member of FIRST(α). In this case, a still is a member of FIRST(β FOLLOW(A))
so there is a prediction Ax#, such that a is a member of FIRST(βx#). However, a
is also a member of FIRST(αx#), so the grammar is not LL(1). In other words, in
this case there is a prediction in which an LL(1) parser cannot decide which
right-hand side to choose either.
a is neither a member of FIRST(α), nor a member of FIRST(β). In this case α
and β must derive ε and a must be a member of FOLLOW(A). This means that
there is a prediction Ax# such that a is a member of FIRST(x#) and thus a is a
member of both FIRST(αx#) and FIRST(βx#), so the grammar is not LL(1). This
means that in an LL(1) grammar at most one right-hand side of any non-terminal
derives ε.
8.2.4 Full LL(1) parsing
We already mentioned briefly that an important difference between LL(1) parsing and
strong-LL(1) parsing is that the strong-LL(1) parser sometimes makes ε-moves before
detecting an error. Consider for instance the following grammar:
SS -> a A b | b A a A -> c S | ε
The strong-LL(1) parse table of this grammar is: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ a b c # ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
S￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ a A b b A a A ε ε c S
Now, on input sentence aacabb, the strong-LL(1) parser makes the following moves:
aacabb# S# aacabb# S1 aAb# a acabb# S1a Ab# a acabb# S1aA2 b#
The problem here is that the prediction is destroyed by the time the error is detected. In
contrast, an LL(1) parser would not do the last step, because neither FIRST(b#), nor
FIRST(cSb#) contain a, so the LL(1) parser would detect the error before choosing a
right-hand side for A. A full LL(1) parser has the immediate error detection property,
which means that an error is detected as soon as the erroneous symbol is first exam￾ined, whereas a strong-LL(1) parser only has the correct-prefix property, which means
that the parser detects an error as soon as an attempt is made to match (or shift) the
erroneous symbol. In Chapter 10, we will see that the immediate error detection
176 Deterministic top-down methods [Ch. 8
property will help improve error recovery.
Given a prediction A . . . #, a full LL(1) parser bases its parsing decisions on
FIRST(A . . . #) rather than on the approximation FIRST(A FOLLOW(A)); this avoids
any parsing decisions on erroneous input symbols (which can never occur in
FIRST(A . . . #) but may occur in FIRST(A FOLLOW(A))). So, if we have prediction
A . . . # and input symbol a, we first have to determine if a is a member of
FIRST(A . . . #), before consulting the parse table to choose a right-hand side for A.
The penalty for this is in efficiency: every time that parse table has to be consulted, a
FIRST set has to be computed and a check made that the input symbol is a member.
Fortunately, we can do better than this. A first step to improvement is the follow￾ing: suppose that we maintain between all symbols in the prediction a set of terminal
symbols that are correct at this point, like this:
X Y Z # ➃ ➂ ➁ ➀
Here, ➀ is the set of symbols that are legal at this point; this is just the FIRST set of the
remaining part of the prediction: FIRST(#); likewise, ➁ is FIRST(Z#), ➂ is
FIRST(YZ#), and ➃ is FIRST(XYZ#) (none of these sets contain ε). These sets can
easily be computed, from right to left. For instance, ➂ consists of the symbols in
FIRST(Y), with the symbols from ➁ added if Y derives ε (if ε is a member of
FIRST(Y)). When a non-terminal is replaced by one of its right-hand sides, the set
behind this right-hand side is available, and we can use this to compute the sets within
this right-hand side and in front of it.
Now let us see how this works for our example. As the reader can easily verify,
FIRST(S) = { a, b}, and
FIRST(A) = { c, ε}.
The parser starts with the prediction S#. We have to find a starting point for the sets: it
makes sense to start with an empty one to the right of the #, because no symbols are
correct after the #. So, the parser starts in the following state:
aacabb# S # a,b #
The first input symbol is a member of the current FIRST set, so it is correct. The (S, a)
entry of the parse table contains aAb so we get parser state
aacabb# S1 a A b # ? ? ? #
Computing the sets marked with a question mark from right to left results in the
Sec. 8.2] LL(1) grammars 177
following parser state:
aacabb# S1 a A b # a b,c b #
Note that b now is a member of the set in front of A, but a is not, although it is a
member of FOLLOW(A). After the match step, the parser is in the following state:
a acabb# S1a A b # b,c b #
The next input symbol is not a member of the current FIRST set, so an error is
detected, and no right-hand side of A is chosen. Instead, the prediction is left intact, so
error recovery can profit from it.
It is not clear that all this is more efficient than computing the FIRST set of a
prediction to determine the correctness of an input symbol before choosing a right-hand
side. However, it does suggest that we can do this at parser generation time, by com￾bining non-terminals with the FIRST sets that can follow it in a prediction. For our
example, we always start with non-terminal S and the set {#}. We will indicate this
with the pair [S,{#}]. Starting with this pair, we will try to make rules for the behaviour
of each pair that turns up, for each valid look-ahead. We know from the FIRST sets of
the alternatives for S that on look-ahead symbol a, [S,{#}] results in right-hand side
aAb. Now the only symbol that can follow A here is a b. So in fact, we have:
on look-ahead symbol a, [S,{#}] results in right-hand side a [A,{b}] b.
Similarly we find:
on look-ahead symbol b, [S,{#}] results in right-hand side b [A,{a}] a.
We have now obtained pairs for A followed by a b, and A followed by an a. So we have
to make rules for them: We know that on look-ahead symbol c, [A,{b}] results in
right-hand side cS. Because A can only be followed by a b in this context, the same
holds for this S. This gives:
on look-ahead symbol c, [A,{b}] results in right-hand side c [S,{b}].
Likewise, we get the following rules:
on look-ahead symbol b, [A,{b}] results in right-hand side ε;
on look-ahead symbol c, [A,{a}] results in right-hand side c [S,{a}];
on look-ahead symbol a, [A,{a}] results in right-hand side ε.
Now we have to make rules for the pairs S followed by an a, and S followed by a b:
178 Deterministic top-down methods [Ch. 8
on look-ahead symbol a, [S,{a}] results in right-hand side a [A,{b}] b;
on look-ahead symbol b, [S,{a}] results in right-hand side b [A,{a}] a;
on look-ahead symbol a, [S,{b}] results in right-hand side a [A,{b}] b;
on look-ahead symbol b, [S,{b}] results in right-hand side b [A,{a}] a.
In fact, we find that we have rewritten the grammar, using the [non-terminal,
followed-by set] pairs as non-terminals, into the following form:
[S,{#}] -> a [A,{b}] b | b [A,{a}] a [S,{a}] -> a [A,{b}] b | b [A,{a}] a [S,{b}] -> a [A,{b}] b | b [A,{a}] a [A,{a}] -> c [S,{a}] | ε [A,{b}] -> c [S,{b}] | ε
For this grammar, the following parse table can be produced: ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ a b c # ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
[￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ S,{#}] a [A,{b}] b b [A,{a}] a [￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ S,{a}] a [A,{b}] b b [A,{a}] a [￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾ S,{b}] a [A,{b}] b b [A,{a}] a [A,{a}] ε c [S,{a}] ￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾✂￾
[A,{b}] ε c [S,{b}]
The entries for the different [S,...] rules are identical so we can merge them. After
that, the only change with respect to the original parse table is the duplication of the A￾rule: now there is one copy for each context in which A has a different set behind it in a
prediction.
Now, after accepting the first a of aacabb, the prediction is [A,{b}]b#; since the
parse table entry ([A,{b}], a) is empty, parsing will stop here and now.
The resulting parser is exactly the same as the strong-LL(1) one. Only the parse
table is different. Often, the LL(1) table is much larger than the strong-LL(1) one. As
the benefit of having an LL(1) parser only lies in that it detects some errors a bit earlier,
this usually is not considered worth the extra cost, and thus most parsers that are adver￾tised as LL(1) parsers are actually strong-LL(1) parsers.
8.2.5 Solving LL(1) conflicts
If a parse table entry has more than one element, we have what we call an LL(1) con￾flict. In this section, we will discuss how to deal with them. One way to deal with con￾flicts is one that we have seen before: use a depth-first or a breadth-first parser with a
one symbol look-ahead. This, however, has several disadvantages: the resulting parser
is not deterministic any more, it is less efficient (often to such an extent that it becomes
unacceptable), and it still does not work for left-recursive grammars. Therefore, we
have to try and eliminate these conflicts, so we can use an ordinary LL(1) parser.
8.2.5.1 Eliminating left-recursion
The first step to take is the elimination of left-recursion. Left-recursive grammars
always lead to LL(1) conflicts, because the right-hand side causing the left-recursion
has a FIRST set that contains all symbols from the FIRST set of the non-terminal.
Sec. 8.2] LL(1) grammars 179
Therefore, it also contains all terminal symbols of the FIRST sets of the other right￾hand sides of the non-terminal. Eliminating left-recursion has already been discussed
in Section 6.4.
8.2.5.2 Left-factoring
Another technique for removing LL(1) conflicts is left-factoring. Left-factoring of
grammar rules is like factoring arithmetic expressions:
a * b + a * c = a * (b + c).
The grammatical equivalent to this is a rule
A → xy | xz,
which clearly has an LL(1) conflict on the terminal symbols in FIRST(x). We replace
this grammar rule with the two rules
A → xN
N → y | z
where N is a new non-terminal. There have been some attempts to automate this pro￾cess; see Foster [Transform 1968] and Rosenkrantz and Hunt [Transform 1987].
8.2.5.3 Conflict resolvers
Sometimes, these techniques do not help much. We could for instance deal with a
language for which no LL(1) grammar exists. In fact, many languages can be described
by a context-free grammar, but not by an LL(1) grammar. Another method of handling
conflicts is to resolve them by so-called disambiguating rules. An example of such a
disambiguating rule is: “on a conflict, the textually first one of the conflicting right￾hand sides is chosen”. With this disambiguating rule, the order of the right-hand sides
within a grammar rule becomes crucial, and unexpected results may occur if the
grammar-processing program does not clearly indicate where conflicts occur and how
they are resolved.
A better method is to have the grammar writer specify explicitly how each con￾flict must be resolved, using so-called conflict resolvers. One option is to resolve con￾flicts at parser generation time. Parser generators that allow for this kind of conflict
resolver usually have a mechanism that enables the user to indicate (at parser genera￾tion time) which right-hand side must be chosen on a conflict. Another, much more
flexible method is to have conflicts resolved at parse time. When the parser meets a
conflict, it calls a user-specified conflict resolver. Such a user-specified conflict
resolver has the complete left-context at its disposal, so it could base its choice on this
left-context. It is also possible to have the parser look further ahead in the input, and
then resolve the conflict based on the symbols found. See Milton, Kirchhoff and Row￾land [LL 1979] and Grune and Jacobs [LL 1988], for similar approaches using attribute
grammars.
180 Deterministic top-down methods [Ch. 8
8.2.6 LL(1) and recursive descent
Most hand-written parsers are LL(1) parsers. They usually are written in the form of a
non-backtracking recursive-descent parser (see Section 6.6). In fact, this is a very sim￾ple way to implement a strong-LL(1) parser. For a non-terminal A with grammar rule
A → α1 | . . . | αn
the parsing routine has the following structure:
procedure A;
if lookahead ∈ FIRST(α1 FOLLOW(A)) then
code for α1
...
else if lookahead ∈ FIRST(α2 FOLLOW(A)) then
code for α2
...
..
else if lookahead ∈ FIRST(αn FOLLOW(A)) then
code for αn
...
else ERROR;
end A;
The look-ahead symbol always resides in a variable called “lookahead”. The procedure
ERROR announces an error and stops the parser.
The code for a right-hand side consists of the code for the symbols of the right￾hand side. A non-terminal symbol results in a call to the parsing routine for this non￾terminal, and a terminal symbol results in a call to a MATCH routine with this symbol
as parameter. This MATCH routine has the following structure:
procedure MATCH(sym);
if lookahead = sym then
lookahead := NEXTSYM
else ERROR;
end MATCH;
The NEXTSYM procedure reads the next symbol from the input.
Several LL(1) parser generators produce a recursive descent parser instead of a
parse table that is to be interpreted by a grammar-independent parser. The advantages
of generating a recursive descent parser are numerous:
Semantic actions are easily embedded in the parsing routines.
A parameter mechanism or attribute mechanism comes virtually for free: the
parser generator can use the parameter mechanism of the implementation
language.
Non-backtracking recursive descent parsers are quite efficient, often more effi￾cient than the table-driven ones.
Dynamic conflict resolvers are implemented easily.
The most important disadvantage of generating a recursive descent parser is the
size of the parser. A recursive descent parser is usually larger than a table-driven one
(including the table). However, this becomes less of a problem as computer memories
Sec. 8.2] LL(1) grammars 181
get bigger and bigger. See Waite and Carter [Misc 1985] for measurements of table￾driven parsers versus recursive descent parsers.
8.3 LL(k) GRAMMARS
Up until now, we have limited the look-ahead to just one symbol, and one might
wonder if having a look-ahead of k symbols instead of one makes the method more
powerful. It does, so let us define LL(k) grammars. For this, we need a definition of
FIRSTk
sets: if x is a sentential form, then FIRSTk
(x) is the set of terminal strings w
such that |w| (the length of w) is less than k and x→* w, or |w| is equal to k, and x→* wy,
for some sentential form y. For k = 1 this definition coincides with the definition of the
FIRST sets as we have seen it before.
We now have the instruments needed to define LL(k): a grammar is LL(k) if for
any prediction Ax#, with A a non-terminal with right-hand sides α1, ..., and αn, the sets
FIRSTk(α1x#), are pairwise disjoint. Obviously, for any k, the set of LL(k) grammars
is a subset of the set of LL(k +1) grammars, and in fact, for any k there are LL(k +1)
grammars that are not LL(k). A trivial example of this is given in Figure 8.11.
Ss -> akb | aka
Figure 8.11 An LL(k +1) grammar that is not LL(k)
Less obvious is that for any k there are languages that are LL(k +1), but not LL(k). An
example of such a language is given in Figure 8.12.
SS -> aSA | ε A -> akbS | c
Figure 8.12 A grammar defining an LL(k +1) language that is not LL(k)
See Kurki-Suonio [LL 1969] for more details.
With LL(k) grammars we have the same problem as with the LL(1) grammars:
producing a parse table is difficult. In the LL(1) case, we solved this problem with the
aid of the FOLLOW sets, obtaining strong-LL(1) parsers. We can try the same with
LL(k) grammars using FOLLOWk
sets. For any non-terminal A, FOLLOWk
(A) is now
defined as the union of the sets FIRSTk(x## . . . ##), for any prediction Ax## . . . ## (in
LL(k) parsing, we add k end-markers instead of just one).
Once we have the FIRSTk
sets and the FOLLOWk
sets, we can produce a parse
table for the grammar. Like the LL(1) parse table, this parse table will be indexed with
pairs consisting of a non-terminal and a terminal string of length equal to k. Every
grammar rule A→α is processed as follows: α is added to the (A, w) entry of the table
for every w in FIRSTk(α FOLLOWk(A)) (as we have seen before, this last set denotes
the union of several FIRSTk
sets: it is the union of all FIRSTk(αv) sets with v an ele￾ment of FOLLOWk(A)). All this is just an extension to k look-ahead symbols of what
we did earlier with one look-ahead symbol.
If this results in a parse table where all entries have at most one element, the
grammar is strong-LL(k). Unlike the LL(1) case however, for k > 1 there are grammars
that are LL(k), but not strong-LL(k). An example of such a grammar is given in Figure
182 Deterministic top-down methods [Ch. 8
8.13.
SS -> aAaa | bAba A -> b | ε
Figure 8.13 An LL(2) grammar that is not strong-LL(2)
This raises an interesting question, one that has kept the authors busy for quite a
while: how come? Why is it different for k = 1? If we try to repeat our proof from Sec￾tion 8.2.3 for a look-ahead k > 1, we see that we fail at the very last step: let us examine
a strong-LL(k) conflict: suppose that the right-hand sides α and β both end up in the (A, w) entry of the parse table. This means that w is a member of both FIRSTk(α
FOLLOWk(A)) and FIRSTk(β FOLLOWk(A)). Now, there are three cases:
w is a member both FIRSTk(α) and FIRSTk(β). In this case, the grammar cannot
be LL(k), because for any prediction Ax## . . . ##, w is a member of both
FIRSTk(αx## . . . ##) and FIRSTk(βx## . . . ##).
w is a member of either FIRSTk(α) or FIRSTk(β), but not both. Let us say that w
is a member of FIRSTk(α). In this case, w still is a member of FIRSTk(β
FOLLOWk(A)) so there is a prediction Ax## . . . ##, such that w is a member of
FIRSTk(βx## . . . ##). However, w is also a member of FIRSTk(αx## . . . ##), so
the grammar is not LL(k). In other words, in this case there is a prediction in
which an LL(k) parser cannot decide which right-hand side to choose either.
w is neither a member of FIRSTk(α) nor a member of FIRSTk(β). Here, we have
to deviate from the reasoning we used in the LL(1) case. As w is an element of
FIRSTk(α FOLLOWk(A)), w can now be split into two parts w1.1 and w1.2, such
that w1.1 is an element of FIRSTk(α) and w1.2 is a non-empty start of an element
of FOLLOWk(A). Likewise, w can be split into two parts w2.1 and w2.2 such that
w2.1 is an element of FIRSTk(β) and w2.2 is a non-empty start of an element of
FOLLOWk(A). So, we have the following situation:
w w1.1 w1.2
w2.1 w2.2
Now, if w1.1=w2.1, w1.1 is a member of FIRSTk(α), as well as FIRSTk(β), and
there is a prediction Ax## . . . ## such that x## . . . ## →* w1.2 . . . . So,
FIRSTk(αx## . . . ##) contains w and so does FIRSTk(βx## . . . ##), and there￾fore, the grammar is not LL(k). So the only case left is that w1.1≠w2.1. Neither
w1.2 nor w2.2 are ε, and this is just impossible if |w | =1.
Strong-LL(k) parsers with k > 1 are seldom used in practice, because the parse
tables are huge, and there are not many languages that are LL(k) for some k > 1, but not
LL(1). Even the languages that are LL(k) for some k > 1, but not LL(1), are usually for
the most part LL(1), and can be parsed using an LL(1) parser with conflict resolvers at
the places where the grammar is not LL(1).
To obtain a full LL(k) parser, the method that we used to obtain a full LL(1)
parser can be extended to deal with pairs [A, L], where L is a FIRSTk
set of
. . . ## . . . ## in some prediction A . . . ## . . . ##. This extension is straightforward
and will not be discussed further.
Sec. 8.3] Extended LL(1) grammars 183
8.4 EXTENDED LL(1) GRAMMARS
Several parser generators accept an extended context-free grammar instead of an ordinary one. See for instance Lewi et al.[LL 1978], Heckmann [LL 1986], Grune and
Jacobs[LL 1988]. Extended context-free grammars have been discussed in Chapter 2.
To check that an extended context-free grammar is LL(1), we have to transform the
extended context-free grammar into an ordinary one, in a way that will avoid introducing LL(1) conflicts. For instance, the transformation for Something+
given in Chapter
2:
Something+ -> Something | Something Something+
will not do, because it will result in an LL(1) conflict on the symbols in
FIRST(Something). Instead, we will use the following transformations:
Something* -> ε | Something Something* Something+ -> Something Something* Something? -> ε | Something
If the resulting grammar is LL(1), the original extended context-free grammar was
ELL(1) (Extended LL(1)). This is the recursive interpretation of Chapter 2. Parser
generation usually proceeds as follows: first transform the grammar to an ordinary
context-free grammar, and then produce a parse table for it.
Extended LL(1) grammars allow for a more efficient implementation in recursive
descent parsers. In this case, Something?
can be implemented as an if statement:
if lookahead ∈ FIRST(Something) then
code for Something ...
else if lookahead ∉ FOLLOW(Something?) then
ERROR;
Something*
can be implemented as a while loop:
while lookahead ∈ FIRST(Something) do
code for Something ...
if lookahead ∉ FOLLOW(Something*) then
ERROR;
and Something+
can be implemented as a repeat loop:
repeat
if lookahead ∉ FIRST(Something) then
ERROR;
code for Something ...
until lookahead ∈ FOLLOW(Something+
);
Here, procedure calls are replaced by much more efficient repetitive constructs.`

const DeterministicTopDownMethods = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
export default DeterministicTopDownMethods
