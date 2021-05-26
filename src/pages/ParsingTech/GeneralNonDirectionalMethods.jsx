import MarkdownTransfer from '../../components/MarkdownTransfer'

const content = `In this chapter we will present two general parsing methods, both non-directional:
Unger’s method and the CYK method. These methods are called non-directional
because they access the input in an seemingly arbitrary order. They require the entire
input to be in memory before parsing can start.
Unger’s method is top-down; if the input belongs to the language at hand, it must
be derivable from the start symbol of the grammar. Therefore, it must be derivable
from a right-hand side of the start symbol, say A1A2 . . . Am. This, in turn, means that
A1 must derive a first part of the input, A2 a second part, etc. If the input sentence is
z 1z 2 . . . zn, this demand can be depicted as follows:
A1 . . . Ai . . . Am z 1 . . . zk . . . zn
Unger’s method tries to find a partition of the input that fits this demand. This is a
recursive problem: if a non-terminal Ai
is to derive a certain part of the input, there
must be a partition of this part that fits a right-hand side of Ai. Ultimately, such a
right-hand side must consist of terminal symbols only, and these can easily be matched
with the current part of the input.
The CYK method approaches the problem the other way around: it tries to find
occurrences of right-hand sides in the input; whenever it finds one, it makes a note that
the corresponding left-hand side derives this part of the input. Replacing the
occurrence of the right-hand side with the corresponding left-hand side results in some
sentential forms that derive the input. These sentential forms are again the subject of a
search for right-hand sides, etc. Ultimately, we may find a sentential form that both
derives the input sentence and is a right-hand side of the start symbol.
In the next two sections, these methods are investigated in detail.
82 General non-directional methods [Ch. 4
4.1 UNGER’S PARSING METHOD
The input to Unger’s parsing method [CF 1968] consists of a CF grammar and an input
sentence. We will first discuss Unger’s parsing method for grammars without ε-rules
and without loops (see Section 2.8.4). Then, the problems introduced by ε-rules will be
discussed, and the parsing method will be modified to allow for all CF grammars.
4.1.1 Unger’s method without ε-rules or loops
To see how Unger’s method solves the parsing problem, let us consider a small exam￾ple. Suppose we have a grammar rule
S → ABC | DE | F
and we want to find out whether S derives the input sentence pqrs. The initial parsing
problem can then be schematically represented as: ￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾ S ￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾ pqrs
For each right-hand side we must first generate all possible partitions of the input sen￾tence. Generating partitions is not difficult: if we have m cups, numbered from 1 to m,
and n marbles, numbered from 1 to n, we have to find all possible partitions such that
each cup contains at least one marble, the numbers of the marbles in any cup are con￾secutive, and any cup does not contain lower-numbered marbles than any marble in a
lower-numbered cup. We proceed as follows: first, we put marble 1 in cup 1, and then
generate all partitions of the other n −1 marbles over the other m −1 cups. This gives us
all partitions that have marble 1 in the first cup. Next, we put marbles 1 and 2 in the
first cup, and then generate all partitions of the other n −2 marbles over the other m −1
cups, etc. If n is less than m, no partition is possible.
Partitioning the input corresponds to partitioning the marbles (the input symbols)
over the cups (the right-hand side symbols). If a right-hand side has more symbols than
the sentence, no partition can be found (there being no ε-rules). For the first right-hand
side the following partitions must be tried: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ S ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ A B C p q rs
p qr s ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ pq r s
The first partition results in the following sub-problems: does A derive p, does B derive
q, and does C derive rs? These sub-problems must all be answered in the affirmative,
or the partition is not the right one.
For the second right-hand side, we obtain the following partitions:
Sec. 4.1] Unger’s parsing method 83 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ S ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ D E ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
p qrs
pq rs ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ pqr s
The last right-hand side results in the following partition: ￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾ S ￾✁￾✁￾✁￾✁￾ F ￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾ pqrs
All these sub-problems deal with shorter sentences, except the last one. They will
all lead to similar split-ups, and in the end many will fail because a terminal symbol in
a right-hand side does not match the corresponding part of the partition. The only par￾tition that causes some concern is the last one. It is as complicated as the one we started
with. This is the reason that we have disallowed loops in the grammar. If the grammar
has loops, we may get the original problem back again and again. For instance, if there
is a rule F→S in the example above, this will certainly happen.
The above demonstrates that we have a search problem here, and we can attack it
with either the depth-first or the breadth-first search technique (see Section 3.6.2).
Unger uses depth-first search.
In the following discussion, the grammar of Figure 4.1 will serve as an example.
ExprS -> Expr + Term | Term Term -> Term × Factor | Factor Factor -> ( Expr ) | i
Figure 4.1 A grammar describing simple arithmetic expressions
This grammar represents the language of simple arithmetic expressions, with operators
+ and ×, and operand i. We will use the sentence (i+i)×i as input example. So, the
initial problem can be represented as: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ (i+i)×i
Fitting the first right-hand side of Expr with the input results in the following parti￾tions:
84 General non-directional methods [Ch. 4 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr + Term ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
( i +i)×i ( i+ i)×i ( i+i )×i ( i+i) ×i ( i+i)× i (i + i)×i (i +i )×i (i +i) ×i (i +i)× i (i+ i )×i (i+ i) ×i (i+ i)× i (i+i ) ×i (i+i )× i ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ (i+i) × i
Even a small example like this already results in 15 partitions, and we will not examine
them all here, although the unoptimized version of the algorithm requires this. We will
only examine the partitions that have at least some chance of succeeding: we can elim￾inate all partitions that do not match the terminal symbol of the right-hand side. So, the
only partition worth investigating further is: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr + Term ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ (i + i)×i
The first sub-problem here is to find out whether and, if so, how Expr derives (i. We
cannot partition (i into three non-empty parts because it only consists of 2 symbols.
Therefore, the only rule that we can apply is the rule Expr -> Term. Similarly, the
only rule that we can apply next is the rule Term -> Factor. So, we now have ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Term ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Factor ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ (i
However, this is impossible, because the first right-hand side of Factor has too many
symbols, and the second one consists of one terminal symbol only. Therefore, the par￾tition we started with does not fit, and it must be rejected. The other partitions were
already rejected, so we can conclude that the rule Expr -> Expr + Term does not
derive the input.
The second right-hand side of Expr consists of only one symbol, so we only have
one partition here, consisting of one part. Partitioning this part for the first right-hand
side of Term again results in 15 possibilities, of which again only one has a chance of
Sec. 4.1] Unger’s parsing method 85
succeeding: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Term ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Term × Factor ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ (i+i) × i
Continuing our search, we will find the following derivation:
Expr -> Term -> Term × Factor -> Factor × Factor -> ( Expr ) × Factor -> ( Expr + Term ) × Factor -> ( Term + Term ) × Factor -> ( Factor + Term ) × Factor -> ( i + Term ) × Factor -> ( i + Factor ) × Factor -> ( i + i ) × Factor -> ( i + i ) × i
and this is the only derivation to be found.
This example demonstrates several aspects of the method: even small examples
require a considerable amount of work, but even some simple checks can result in huge
savings. For instance, matching the terminal symbols in a right-hand side with the par￾tition at hand often leads to the rejection of the partition without investigating it any
further. Unger [CF 1968] presents several more of these checks. For instance, one can
compute the minimum length of strings of terminal symbols derivable from each non￾terminal. Once it is known that a certain non-terminal only derives terminal strings of
length at least n, all partitions that fit this non-terminal with a substring of length less
than n can be immediately rejected.
4.1.2 Unger’s method with ε-rules
So far, we only have dealt with grammars without ε-rules, and not without reason.
Complications arise when the grammar contains ε-rules, as is demonstrated by the fol￾lowing example: consider the grammar rule S→ABC and input sentence pqr. If we
want to examine whether this rule derives the input sentence, and we allow for ε-rules,
many more partitions will have to be investigated, because each of the non-terminals A, B, and C may derive the empty string. In this case, generating all partitions proceeds
just as above, except that we first generate the partitions that have no marble at all in
the first cup, then the partitions that have marble 1 in the first cup, etc.:
86 General non-directional methods [Ch. 4 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ S ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ A B C
pqr
p qr
pq r
pqr
p qr
p q r p qr
pq r
pq r ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ pqr
Now suppose that we are investigating whether B derives pqr, and suppose there is a
rule B→SD. Then, we will have to investigate the following partitions: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ B ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ S D
pqr
p qr
pq r ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ pqr
It is the last of these partitions that will cause trouble: in the process of finding out
whether S derives pqr, we end up asking the same question again, in a different context.
If we are not careful and do not detect this, our parser will loop forever, or run out of
memory.
When searching along this path, we are looking for a derivation that is using a
loop in the grammar. This may even happen if the grammar does not contain loops. If
this loop actually exists in the grammar, there are infinitely many derivations to be
found along this path, provided that there is one, so we will never be able to present
them all. The only interesting derivations are the ones without the loop. Therefore, we
will cut off the search process in these cases. On the other hand, if the grammar does
not contain such a loop, a cut-off will not do any harm either, because the search is
doomed to fail anyway. So, we can avoid the problem altogether by cutting off the
search process in these cases. Fortunately, this is not a difficult task. All we have to do
is to maintain a list of questions that we are currently investigating. Before starting to
investigate a new question (for instance “does S derive pqr?”) we first check that the
question does not already appear in the list. If it does, we do not investigate this ques￾tion. Instead, we proceed as if the question were answered negatively.
Consider for instance the following grammar:
S -> LSD | ε L -> ε D -> d
This grammar generates sequences of d’s in an awkward way. The complete search for
Sec. 4.1] Unger’s parsing method 87
the questions S →* d? and S →* dd? is depicted in Figure 4.2.
S →* d? L S D - - d - d - d - - ε →* d? no
L →* ε? ε →* ε? yes
S →* ε? L S D - - - L →* ε? ε →* ε? yes
S →* ε? cut-off: no
ε →* ε? yes
D →* d? d →* d? yes
L →* ε? ε →* ε? yes
S →* d? cut-off: no
L →* d? ε →* d? no
S →* dd? L S D - - dd - d d - dd - d - d d d - dd - - L →* ε? ε →* ε? yes
S →* ε? L S D - - - L →* ε? ε →* ε? yes
S →* ε? cut-off: no
ε →* ε? yes
D →* dd? d →* dd? no
L →* ε? ε →* ε? yes
S →* d? see above, yes
D →* d? d →* d? yes
L →* ε? ε →* ε? yes
S →* dd? cut-off: no
L →* d? ε →* d? no
L →* d? ε →* d? no
L →* dd? ε →* dd? no
ε →* dd? no
Figure 4.2 Unger’s parser at work for the sentences d and dd
Figure 4.2 must be read from left to right, and from top to bottom. The questions are
drawn in an ellipse, with the split-ups over the right-hand sides in boxes. A question is
88 General non-directional methods [Ch. 4
answered affirmatively if at least one of the boxes results in a “yes”. In contrast, a par￾tition only results in an affirmative answer if all questions arising from it result in a
“yes”.
Checking for cut-offs is easy: if a new question is asked, we follow the arrows in
the reversed direction (to the left). This way, we traverse the list of currently investi￾gated questions. If we meet the question again, we have to cut off the search.
To find the parsings, every question that is answered affirmatively has to pass
back a list of rules that start the derivation asked for in the question. This list can be
placed into the ellipse, together with the question. We have not done so in Figure 4.2,
because it is complicated enough as it is. However, if we strip Figure 4.2 of its dead
ends, and leave out the boxes, we get Figure 4.3.
S →* dd? yes
S → LSD L →* ε? yes
L → ε S →* d? yes
S → LSD L →* ε? yes
L → ε S →* ε? yes
S → ε D →* d? yes
D → d D →* d? yes
D → d
Figure 4.3 The result of Unger’s parser for the sentence dd
In this case, every ellipse only has one possible grammar rule. Therefore, there is only
one parsing, and we obtain it by reading Figure 4.3 from left to right, top to bottom:
S -> LSD -> SD -> LSDD -> SDD -> DD -> dD -> dd.
In general, the total number of parsings is equal to the product of the number of gram￾mar rules in each ellipse.
This example shows that we can save much time by remembering answers to
questions. For instance, the question whether L derives ε is asked many times. Sheil
[CF 1976] has shown that the efficiency improves dramatically when this is done: it
goes from exponential to polynomial. Another possible optimization is achieved by
computing in advance which non-terminals can derive ε. In fact, this is a special case of
computing the minimum length of a terminal string that each non-terminal derives. If a
non-terminal derives ε, this minimum length is 0.
4.2 THE CYK PARSING METHOD
The parsing method described in this section is attributed to J. Cocke, D.H. Younger,
and T. Kasami, who, independently, discovered variations of the method; it is now
known as the Cocke-Younger-Kasami method, or the CYK method. The most accessi￾ble original description is that of Younger [CF 1967]. A much earlier description is by
Sakai [CF 1962].
As with Unger’s parsing method, the input to the CYK algorithm consists of a CF
Sec. 4.2] The CYK parsing method 89
grammar and an input sentence. The first phase of the algorithm constructs a table tel￾ling us which non-terminal(s) derive which substrings of the sentence. This is the
recognition phase. It ultimately also tells us whether the input sentence can be derived
from the grammar. The second phase uses this table and the grammar to construct all
possible derivations of the sentence.
We will first concentrate on the recognition phase, which really is the distinctive
feature of the algorithm.
4.2.1 CYK recognition with general CF grammars
To see how the CYK algorithm solves the recognition and parsing problem, let us con￾sider the grammar of Figure 4.4. This grammar describes the syntax of numbers in
scientific notation. An example sentence produced by this grammar is 32.5e+1. We
will now use this grammar and sentence as an example.
NumberS -> Integer | Real Integer -> Digit | Integer Digit Real -> Integer Fraction Scale Fraction -> . Integer Scale -> e Sign Integer | Empty Digit -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 Empty -> ε Sign -> + | -
Figure 4.4 A grammar describing numbers in scientific notation
The CYK algorithm first concentrates on substrings of the input sentence, shortest
substrings first, and then works its way up. The following derivations of substrings of
length 1 can be read directly from the grammar:
Digit Digit Digit Sign Digit 3 2 . 5 e + 1
This means that Digit derives 3, Digit derives 2, etc. Note however, that this pic￾ture is not yet complete. For one thing, there are several other non-terminals deriving
3. This complication arises because the grammar contains so-called unit rules, rules of
the form A→B, where A and B are non-terminals. Such rules are also called single
rules or chain rules. We can have chains of them in a derivation. So, the next step
consists of applying the unit rules, repetitively, for instance to find out which other
non-terminals derive 3. This gives us the following result:
Number, Integer, Digit Number, Integer, Digit Number, Integer, Digit Sign Number, Integer, Digit 3 2 . 5 e + 1
90 General non-directional methods [Ch. 4
Now, we already see some combinations that we recognize from the grammar: For
instance, an Integer followed by a Digit is again an Integer, and a . (dot) fol￾lowed by an Integer is a Fraction. We get (again also using unit rules):
Number, Integer Fraction Scale Number, Integer, Digit Number, Integer, Digit Number, Integer, Digit Sign Number, Integer, Digit 3 2 . 5 e + 1
At this point, we see that the Real-rule is applicable in several ways, and then the
Number-rule, so we get:
Number, Real Number, Real Number, Integer Fraction Scale Number, Integer, Digit Number, Integer, Digit Number, Integer, Digit Sign Number, Integer, Digit 3 2 . 5 e + 1
We find that Number does indeed derive 32.5e+1.
In the example above, we have seen that unit rules complicate things a bit.
Another complication, one that we have avoided until now, is formed by ε-rules. For
instance, if we want to recognize the input 43.1 according to the example grammar,
we have to realize that Scale derives ε here, so we get the following picture:
Number, Real Number, Real Number, Integer Fraction Scale Number, Integer, Digit Number, Integer, Digit Number Integer Digit 4 3 . 1
In general this is even more complicated. We must take into account the fact that
several non-terminals can derive ε between any two adjacent terminal symbols in the
input sentence, and also in front of the input sentence or at the back. However, as we
shall see, the problems caused by these kinds of rules can be solved, albeit at a certain
cost.
In the meantime, we will not let these problems discourage us. In the example,
Sec. 4.2] The CYK parsing method 91
we have seen that the CYK algorithm works by determining which non-terminals
derive which substrings, shortest substrings first. Although we skipped them in the
example, the shortest substrings of any input sentence are, of course, the ε-substrings.
We shall have to be able to recognize them in arbitrary position, so let us first see if we
can compute Rε , the set of non-terminals that derive ε.
Initially, this set Rε consists of the set of non-terminals A for which A→ε is a
grammar rule. For the example grammar, Rε
is initially the set { Empty }. Next, we
check each grammar rule: If a right-hand side consists only of symbols that are a
member of Rε , we add the left-hand side to Rε
(it derives ε, because all symbols in the
right-hand side do). In the example, Scale would be added. This process is repeated
until no new non-terminals can be added to the set. For the example, this results in
Rε = { Empty, Scale }.
Now, we direct our attention to the non-empty substrings of the input sentence. Sup￾pose we have an input sentence z = z 1z 2 . . . zn and we want to compute the set of
non-terminals that derive the substring of z starting at position i, of length l. We will
use the notation si,l
for this substring, so,
si,l = zizi +1 . . . zi +l −1.
Figure 4.5 presents this notation graphically, using a sentence of 4 symbols.
s 1,4 s 2,3 s 1,3 s 3,2 s 2,2 s 1,2 s 1,1 s 2,1 s 3,1 s 4,1 z 1 z 2 z 3 z 4
Figure 4.5 A graphical presentation of substrings
We will use the notation Rsi,l
for the set of non-terminals deriving the substring si,l.
This notation can be extended to deal with substrings of length 0: si, 0 = ε, and
Rsi, 0 = Rε .
Because shorter substrings are dealt with first, we can assume that we are at a
stage in the algorithm where all information on substrings with length smaller than a
certain l is available. Using this information, we check each right-hand side in the
grammar, to see if it derives si,l, as follows: suppose we have a right-hand side
A1 . . . Am. Then we divide si,l
into m (possibly empty) segments, such that A1 derives
the first segment, A2
the second, etc. We start with A1. If A1 . . . Am is to derive si,l, A1 has to derive a first part of it, say of length k. That is, A1 must derive si,k
(be a
member of Rsi,k
), and A2 . . . Am must derive the rest:
92 General non-directional methods [Ch. 4 A1 A2 . . . Am zi . . . zi +k −1 zi +k zi +k +1 . . . zi +l −1
This is attempted for every k for which A1
is a member of Rsi,k , including 0. Naturally,
if A1
is a terminal, then A1 must be equal to zi, and k is 1. Checking if A2 . . . Am
derives zi +k . . . zi +l −1
is done in the same way. Unlike Unger’s method, we do not
have to try all partitions, because we already know which non-terminals derive which
substrings.
Nevertheless, there are several problems with all this: in the first place, m could
be 1 and A1 a non-terminal, so we are dealing with a unit rule. In this case, A1 must
derive the whole substring si,l, and thus be a member of Rsi,l , which is the set that we
are computing now, so we do not know yet if this is the case. This problem can be
solved by observing that if A1
is to derive si,l, somewhere along the derivation there
must be a first step not using a unit rule. So we have:
A1 → B → . . . → C →* si,l
where C is the first non-terminal using a non-unit rule in the derivation. Disregarding
ε-rules (the second problem) for a moment, this means that at a certain stage, C will be
added to the set Rsi,l . Now, if we repeat the process again and again, at some point, B
will be added, and during the next repetition, A1 will be added. So, we have to repeat
the process until no new non-terminals are added to Rsi,l . The second problem is
caused by the ε-rules. If all but one of the At derive ε, we have a problem that is basi￾cally equivalent to the problem of unit rules. It can be solved in the same way.
In the end, when we have computed all the Rsi,l , the recognition problem is solved:
the start symbol S derives z (= s 1,n) if and only if S is a member of Rs 1,n .
This is a complicated process, but part of this complexity stems from the ε-rules
and the unit rules. Their presence forces us to do the Rsi,l
computation repetitively.
Another, less serious source of the complexity is that a right-hand side may consist of
arbitrary many non-terminals, so trying all possibilities can be a lot of work. So, impos￾ing certain restrictions on the rules may simplify this process a great deal. However,
these restrictions should not limit the generative power of the grammar significantly.
4.2.2 CYK recognition with a grammar in Chomsky Normal Form
Two of the restrictions that we want to impose on the grammar are obvious by now: no
unit rules and no ε-rules. We would also like to limit the maximum length of a right￾hand side to 2; this would simplify checking that a right-hand side derives a certain
substring. It turns out that there is a form for CF grammars that exactly fits these res￾trictions: the Chomsky Normal Form. It is as if this normal form was invented for this
algorithm. A grammar is in Chomsky Normal Form (CNF), when all rules either have
the form A→a, or A→BC, where a is a terminal and A, B, and C are non-terminals.
Fortunately, as we shall see later, almost all CF grammars can be mechanically
transformed into a CNF grammar.
We will first discuss how the CYK-algorithm works for a grammar in CNF.
Sec. 4.2] The CYK parsing method 93
There are no ε-rules in a CNF grammar, so Rε
is empty. The sets Rsi, 1
can be read
directly from the rules: they are determined by the rules of the form A→a. A rule
A→BC can never derive a single terminal, because there are no ε-rules.
Next, we proceed iteratively as before, first processing all substrings of length 2,
then all substrings of length 3, etc. When a right-hand side BC is to derive a substring
of length l, B has to derive the first part (which is non-empty), and C the rest (also
non-empty).
B C zi . . . zi +k −1 zi +k . . . zi +l −1
So, B must derive si,k , that is, B must be a member of Rsi,k , and, likewise, C must
derive si +k,l −k , that is, C must be a member of Rsi +k,l −k . Determining if such a k exists is
easy: just try all possibilities; they range from 1 to l −1. All sets Rsi,k
and Rsi +k,l −k
have
already been computed at this point.
This process is much less complicated than the one we saw before, with a general
CF grammar, for two reasons: the most important one is that we do not have to repeat
the process again and again until no new non-terminals are added to Rsi,l . Here, the sub￾strings we are dealing with are really substrings. They cannot be equal to the string we
started out with. The second reason is that we only have to find one place where the
substring must be split in two, because the right-hand side only consists of two non￾terminals. In ambiguous grammars, there can be several different splittings, but at this
point, that does not worry us. Ambiguity is a parsing issue, not a recognition issue.
The algorithm results in a complete collection of sets Rsi,l . The sentence z con￾sists of only n symbols, so a substring starting at position i can never have more than
n +1−i symbols. This means that there are no substrings si,l with i +l>n +1. Therefore,
the Rsi,l
sets can be organized in a triangular table, as depicted in Figure 4.6.
Rs 1,n Rs 1,n −1 Rs 2,n −1
.. .. ..
.. .. .. ..
Rs 1,l
.. Rsi,l
.. ..
.. .. .. .. .. ..
.. .. .. .. .. .. ..
Rs 1,1
.. Rsi, 1
.. .. Rsi +l −1,1
.. Rsn, 1 V W
Figure 4.6 Form of the recognition table
This table is called the recognition table, or the well-formed substring table. Rsi,l
is
computed following the arrows V and W simultaneously, looking for rules A→BC with
94 General non-directional methods [Ch. 4 B a member of a set on the V arrow, and C a member of the corresponding set on the W
arrow. For B, substrings are taken starting at position i, with increasing length k. So the
V arrow is vertical and rising, visiting Rsi, 1 , Rsi, 2 , . . . , Rsi,k , . . . , Rsi,l −1 ; for C, sub￾strings are taken starting at position i +k, with length l −k, with end-position i +l −1, so
the W arrow is diagonally descending, visiting Rsi +1,l −1 , Rsi +2,l −2 , . . . , Rsi +k,l −k , . . . , Rsi +l −1,1 .
As described above, the recognition table is computed in the order depicted in
Figure 4.7(a). We could also compute the recognition table in the order depicted in Fig￾ure 4.7(b). In this last order, Rsi,l
is computed as soon as all sets and input symbols
needed for its computation are available. For instance, when computing Rs 3,3 , Rs 5,1
is
relevant, but Rs 6,1
is not, because the substring at position 3 with length 3 does not con￾tain the substring at position 6 with length 1. This order makes the algorithm particu￾larly suitable for on-line parsing, where the number of symbols in the input is not
known in advance, and additional information is computed each time a symbol is
entered.
(a) off-line order (b) on-line order
Figure 4.7 Different orders in which the recognition table can be computed
Now, let us examine the cost of this algorithm. Figure 4.6 shows that there are
(n*(n +1))/2 substrings to be examined. For each substring, at most n −1 different k￾positions have to be examined. All other operations are independent of n, so the algo￾rithm operates in a time at most proportional to the cube of the length of the input sen￾tence. As such, it is far more efficient than exhaustive search, which needs a time that
is exponential in the length of the input sentence.
4.2.3 Transforming a CF grammar into Chomsky Normal Form
The previous section has demonstrated that it is certainly worth while to try to
transform a general CF grammar into CNF. In this section, we will discuss this
transformation, using our number grammar as an example. The transformation is split
up into several stages:
first, ε-rules are eliminated.
then, unit rules are eliminated.
then, non-productive non-terminals are removed.
then, non-reachable non-terminals are removed.
then, finally, the remaining grammar rules are modified, and rules are added, until
they all have the desired form, that is, either A→a or A→BC.
All these transformations will not change the language defined by the grammar. This is
not proven here. Most books on formal language theory discuss these transformations
Sec. 4.2] The CYK parsing method 95
more formally and provide proofs, see for example Hopcroft and Ullman [Books 1979].
4.2.3.1 Eliminating ε-rules
Suppose we have a grammar G, with an ε-rule A→ε, and we want to eliminate this
rule. We cannot just remove the rule, as this would change the language defined by the
non-terminal A, and also probably the language defined by the grammar G. So, some￾thing has to be done about the occurrences of A in the right-hand sides of the grammar
rules. Whenever A occurs in a grammar rule B→αAβ, we replace this rule with two
others: B→αA′β, where A′ is a new non-terminal, for which we shall add rules later
(these rules will be the non-empty grammar rules of A), and B→αβ, which handles the
case where A derives ε in a derivation using the B→αAβ rule. Notice that the α and β
in the rules above could also contain A; in this case, each of the new rules must be
replaced in the same way, and this process must be repeated until all occurrences of A
are removed. When we are through, there will be no occurrence of A left in the gram￾mar.
Every ε-rule must be handled in this way. Of course, during this process new ε-
rules may originate. This is only to be expected: the process makes all ε-derivations
explicit. The newly created ε-rules must be dealt with in exactly the same way. Ulti￾mately, this process will stop, because the number of non-terminals deriving ε is lim￾ited and, in the end, none of these non-terminals occur in any right-hand side.
The next step in eliminating the ε-rules is the addition of grammar rules for the
new non-terminals. If A is a non-terminal for which an A′ was introduced, we add a
rule A′→α for all non-ε-rules A→α. Since all ε-rules have been made explicit, we can
be sure that if a rule does not derive ε directly, it cannot do so indirectly. A problem
that may arise here is that there may not be a non-ε-rule for A. In this case, A only
derives ε, so we remove all rules using A′.
All this leaves us with a grammar that still contains ε-rules. However, none of the
non-terminals having an ε-rule occurs in any right-hand side. These occurrences have
just been carefully removed. So, these non-terminals can never play a role in any
derivation from the start symbol S, with one important exception: S itself. In particular,
we now have a rule S→ε if and only if ε is a member of the language defined by the
grammar G. All other non-terminals with ε-rules can be removed safely. Cleaning up
the grammar is left to later transformations.
S -> L a M L -> L M L -> ε M -> M M M -> ε
Figure 4.8 An example grammar to test ε-rule elimination schemes
The grammar of Figure 4.8 is a nasty grammar to test your ε-rule elimination
scheme. Our scheme transforms this grammar into the grammar of Figure 4.9. This
grammar still has ε-rules, but these will be eliminated by the removal of non￾productive and/or non-reachable non-terminals. Cleaning up this mess will leave only
one rule: S→a. Removing the ε-rules in our number grammar results in the grammar
of Figure 4.10. Note that the two rules to produce ε, Empty and Scale, are still
96 General non-directional methods [Ch. 4 S -> L’ a M’ | a M’ | L’ a | a L -> L’ M’ | L’ | M’ | ε M -> M’ M’ | M’ | ε L’ -> L’ M’ | L’ | M’ M’ -> M’ M’ | M’
Figure 4.9 Result after our ε-rule elimination scheme
NumberS -> Integer | Real Integer -> Digit | Integer Digit Real -> Integer Fraction Scale’ | Integer Fraction Fraction -> . Integer Scale’ -> e Sign Integer Scale -> e Sign Integer | ε Empty -> ε Digit -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 Sign -> + | -
Figure 4.10 Our number grammar after elimination of ε-rules
present but are not used any more.
4.2.3.2 Eliminating unit rules
The next trouble-makers to be eliminated are the unit rules, that is, rules of the form
A→B. It is important to realize that, if such a rule A→B is used in a derivation, it must
be followed at some point by the use of a rule B→α. Therefore, if we have a rule
A→B, and the rules for B are
B → α1 | α2 | . . . | αn,
we can replace the rule A→B with
A → α1 | α2 | . . . | αn.
In doing this, we can of course introduce new unit rules. In particular, when repeating
this process, we could at some point again get the rule A→B. In this case, we have an
infinitely ambiguous grammar, because B derives B. Now this may seem to pose a
problem, but we can just leave such a unit rule out; the effect is that we short-cut
derivations like
A → B → . . . → B → . . .
Also rules of the form A→A are left out. In fact, a pleasant side-effect of removing ε-
rules and unit rules is that the resulting grammar is not infinitely ambiguous any more.
Removing the unit rules in our ε-free number grammar results in the grammar of
Figure 4.11.
4.2.3.3 Removing non-productive non-terminals
Non-productive non-terminals are non-terminals that have no terminal derivation.
Every sentential form that can be derived from it will contain non-terminals. These are
Sec. 4.2] The CYK parsing method 97
NumberS -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 NumberS -> Integer Digit NumberS -> Integer Fraction Scale’ | Integer Fraction Integer -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 Integer -> Integer Digit Real -> Integer Fraction Scale’ | Integer Fraction Fraction -> . Integer Scale’ -> e Sign Integer Scale -> e Sign Integer | ε Empty -> ε Digit -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 Sign -> + | -
Figure 4.11 Our number grammar after eliminating unit rules
not pleasant things to have in a grammar. Naturally, “proper” grammars do not have
them. Nevertheless, we must be able to determine which non-terminals do have a ter￾minal derivation, if only to check that a grammar is “proper”.
To find out which non-terminals have a terminal derivation we use a scheme that
hinges on the fact that a non-terminal has a terminal derivation if and only if it has a
right-hand side consisting of symbols that all have a terminal derivation. Of course, ter￾minals have themselves a terminal derivation. The scheme works as follows: First, we
mark the non-terminals that have a right-hand side containing only terminals: they
obviously have a terminal derivation. Next, we mark all non-terminals that have a
right-hand side consisting only of terminals and marked non-terminals: they too have a
terminal derivation. We keep on doing this until there are no more non-terminals to be
marked.
Now, the non-productive non-terminals are the ones that have not been marked in
the process. We remove all rules that contain a non-marked non-terminal in either the
left-hand side or the right-hand side. This process does not remove all rules of a
marked non-terminal, as there must be at least one rule for it with a right-hand side
consisting only of terminals and marked non-terminals, or it would not have been
marked in the first place. (This may remove all rules, including those for the start￾symbol, in which case the grammar describes the empty language).
Our number grammar does not contain non-productive non-terminals, so it will
not be changed by this phase.
4.2.3.4 Removing non-reachable non-terminals
A non-terminal is called reachable or accessible if there exists at least one sentential
form, derivable from the start symbol, in which it occurs. So, a non-terminal A is reach￾able if S→* αAβ for some α and β. A non-terminal is non-reachable if it is not reach￾able. For non-reachable non-terminals the same holds as for non-productive non￾terminals: they do not occur in “proper” grammars. However, they can be introduced
by some of the transformations that we have seen before, so we must be able to find
them to “clean up” a grammar again.
We found the non-productive non-terminals by finding the “useful” ones. Like￾wise, we find the non-reachable non-terminals by finding the reachable ones. For this,
98 General non-directional methods [Ch. 4
we can use the following scheme: First, the start symbol is marked: it is reachable.
Then, any time an as yet unmarked non-terminal is marked, all non-terminals occurring
in any of its right-hand sides are marked. In the end, the unmarked non-terminals are
not reachable and their rules can be removed. They do not occur in any right-hand side
of a reachable non-terminal, for otherwise it would have been marked in the process.
It is interesting to note that removing non-reachable non-terminals does not intro￾duce non-productive non-terminals. However, first removing non-reachable non￾terminals and then removing non-productive non-terminals may produce a grammar
which contains again non-reachable non-terminals. Finding an example demonstrating
this is left to the reader.
In our number grammar, the non-terminals Real, Scale, and Empty are non￾reachable, which leaves us with the grammar of Figure 4.12.
NumberS -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 NumberS -> Integer Digit NumberS -> Integer Fraction Scale’ | Integer Fraction Integer -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 Integer -> Integer Digit Fraction -> . Integer Scale’ -> e Sign Integer Digit -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 Sign -> + | -
Figure 4.12 Our number grammar after removal of non-reachable rules
4.2.3.5 Finally, to Chomsky Normal Form
After all these grammar transformations, we have a grammar without ε-rules or unit
rules, all non-terminal are reachable, and there are no non-productive non-terminals.
So, we are left with two types of rules: rules of the form A→a, which are already in the
proper form, and rules of the form A→X1X2 . . . Xm, with m≥2. For every terminal b
occurring in such a rule we create a new non-terminal Tb with as only rule Tb→b, and
we replace each occurrence of b in a rule A→X1X2 . . . Xm with Tb. Now, the only
rules not yet in CNF are of the form A→X1X2 . . . Xm, with m≥3, and all Xi a non￾terminal. These rules can now just be split up:
A → X1X2 . . . Xm
is replaced by the following two rules:
A → A1X3 . . . Xm A1 → X1X2
where A1
is a new non-terminal. Now, we have replaced the original rule with one that
is one shorter, and one that is in CNF. This splitting can be repeated until all parts are
in CNF. Figure 4.13 represents our number grammar in CNF.
Sec. 4.2] The CYK parsing method 99
NumberS -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 NumberS -> Integer Digit NumberS -> N1 Scale’ | Integer Fraction N1 -> Integer Fraction Integer -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 Integer -> Integer Digit Fraction -> T1 Integer T1 -> . Scale’ -> N2 Integer N2 -> T2 Sign T2 -> e Digit -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 Sign -> + | -
Figure 4.13 Our number grammar in CNF
4.2.4 The example revisited
Now, let us see how the CYK algorithm works with our example grammar, which we
have just transformed into CNF. Again, our input sentence is 32.5e+1. The recogni￾tion table is given in Figure 4.14. The bottom row is read directly from the grammar;
for instance, the only non-terminals having a production rule with right-hand side 3 are
Number, Integer, and Digit. Notice that for each symbol a in the sentence there
must be at least one non-terminal A with a production rule A→a, or else the sentence
cannot be derived from the grammar.
The other rows are computed as described before. Actually, there are two ways to
compute a certain Rsi,l . The first method is to check each right-hand side in the gram￾mar; for instance, to check whether the right-hand side N1 Scale’ derives the sub￾string 2.5e (= s 2,4
). The recognition table derived so far tells us that
N1 is not a member of Rs 2,1
or Rs 2,2 , N1 is a member of Rs 2,3 , but Scale’ is not a member of Rs 5,1
so the answer is no. Using this method, we have to check each right-hand side in this
way, adding the left-hand side to Rs 2,4
if we find that the right-hand side derives s 2,4.
The second method is to compute possible right-hand sides from the recognition
table computed so far; for instance, Rs 2,4
is the set of non-terminals that have a right￾hand side AB where either
A is a member of Rs 2,1
and B is a member of Rs 3,3 , or
A is a member of Rs 2,2
and B is a member of Rs 4,2 , or
A is a member of Rs 2,3
and B is a member of Rs 5,1 .
This gives as possible combinations for AB: N1 T2 and Number T2. Now we check
all rules in the grammar to see if they have a right-hand side that is a member of this
set. If so, the left-hand side is added to Rs 2,4 .
4.2.5 CYK parsing with Chomsky Normal Form
We now have an algorithm that determines whether a sentence belongs to a language or
not, and it is much faster than exhaustive search. Most of us, however, not only want to
know whether a sentence belongs to a language, but also, if so, how it can be derived
100 General non-directional methods [Ch. 4 Number ∅ Number ∅ ∅ ∅ Number, N1 ∅ ∅ ∅ ∅ Number, N1 ∅ ∅ Scale’ Number, Integer ∅ Fraction ∅ N2 ∅ Number, Integer, Digit Number, Integer, Digit T1 Number, Integer, Digit T2 Sign Number, Integer, Digit 7654 l 321 31 22 .3 54 e5 +6 17 i
Figure 4.14 The recognition table for the input sentence 32.5e+1
from the grammar. If it can be derived in more than one way, we probably want to
know all possible derivations. As the recognition table contains the information on all
derivations of substrings of the input sentence that we could possible make, it also con￾tains the information we want. Unfortunately, this table contains too much informa￾tion, so much that it hides what we want to know. The table may contain information
about non-terminals deriving substrings, where these derivations cannot be used in the
derivation of the input sentence from the start symbol S. For instance, in the example
above, Rs 2,3
contains N1, but the fact that N1 derives 2.5 cannot be used in the deriva￾tion of 32.5e+1 from Number.
The key to the solution of this problem lies in the simple observation that the
derivation must start with the start-symbol S. The first step of the derivation of the
input sentence z, with length n, can be read from the grammar, together with the recog￾nition table. If n =1, there must be a rule S→z; if n ≥2, we have to examine all rules
S→AB, where A derives the first k symbols of z, and B the rest, that is, A is a member
of Rs 1,k
and B is a member of Rsk +1,n −k , for some k. There must be at least one such a
rule, or else S would not derive z.
Now, for each of these combinations AB we have the same problem: how does A
derive s 1,k and B derive sk +1,n −k ? These problems are solved in exactly the same way.
It does not matter which non-terminal is examined first. Consistently taking the left-
Sec. 4.2] The CYK parsing method 101
most one results in a left-most derivation, consistently taking the right-most one results
in a right-most derivation.
Notice that we can use an Unger-style parser for this. However, it would not have
to generate all partitions any more, because we already know which partitions will
work.
Let us try to find a left-most derivation for the example sentence and grammar,
using the recognition table of Figure 4.14. We begin with the start symbol, Number.
Our sentence contains seven symbols, which is certainly more than one, so we have to
use one of the rules with a right-hand side of the form AB. The Integer Digit rule is
not applicable here, because the only instance of Digit that could lead to a derivation
of the sentence is the one in Rs 7,1 , but Integer is not a member of Rs 1,6 . The
Integer Fraction rule is not applicable either, because there is no Fraction
deriving the last part of the sentence. This leaves us with the production rule Number -> N1 Scale’, which is indeed applicable, because N1 is a member of Rs 1,4 , and
Scale’ is a member of Rs 5,3 , so N1 derives 32.5 and Scale’ derives e+1.
Next, we have to find out how N1 derives 32.5. There is only one applicable
rule: N1 -> Integer Fraction, and it is indeed applicable, because Integer is a
member of Rs 1,2 , and Fraction is a member of Rs 3,2 , so Integer derives 32, and
Fraction derives .5. In the end, we find the following derivation:
Number -> N1 Scale’ -> Integer Fraction Scale’ -> Integer Digit Fraction Scale’ -> 3 Digit Fraction Scale’ -> 3 2 Fraction Scale’ -> 3 2 T1 Integer Scale’ -> 3 2 . Integer Scale’ -> 3 2 . 5 Scale’ -> 3 2 . 5 N2 Integer -> 3 2 . 5 T2 Sign Integer -> 3 2 . 5 e Sign Integer -> 3 2 . 5 e + Integer -> 3 2 . 5 e + 1
Unfortunately, this is not exactly what we want, because this is a derivation that uses
the rules of the grammar of Figure 4.13, not the rules of the grammar of Figure 4.4, the
one that we started with.
4.2.6 Undoing the effect of the CNF transformation
When we examine the grammar of Figure 4.4 and the recognition table of Figure 4.14,
we see that the recognition table contains the information we need on most of the non￾terminals of the original grammar. However, there are a few non-terminals missing in
the recognition table: Scale, Real, and Empty. Scale and Empty were removed
because they became non-reachable, after the elimination of ε-rules. Empty was
removed altogether, because it only derived the empty string, and Scale was replaced
by Scale’, where Scale’ derives exactly the same as Scale, except for the empty
102 General non-directional methods [Ch. 4
string. We can use this to add some more information to the recognition table: at every
occurrence of Scale’, we add Scale.
The non-terminal Real was removed because it became non-reachable after elim￾inating the unit rules. Now, the CYK algorithm does not require that all non-terminals
in the grammar be reachable. We could just as well have left the non-terminal Real in
the grammar, and have transformed its rules to CNF. The CYK algorithm would then
have added Real to the recognition table, wherever that would be appropriate. The
rules for Real that would be added to the grammar of Figure 4.13 are:
Real -> N1 Scale’ | Integer Fraction
The resulting recognition table is presented in Figure 4.15. In this figure, we have
also added an extra row at the bottom of the triangle. This extra row represents the
non-terminals that derive the empty string. These non-terminals can be considered as
possibly occurring between any two adjacent symbols in the sentence, and also in front
of or at the end of the sentence. The set Rsi, 0
represents the non-terminals that can be
considered as possibly occurring just in front of symbol zi and the set Rsn +1,0
represents
the ones that can occur at the end of the sentence.
Number, Real ∅ Number, Real ∅ ∅ ∅ Number, Real, N1 ∅ ∅ ∅ ∅ Number, Real, N1 ∅ ∅ Scale’, Scale Number, Integer ∅ Fraction ∅ N2 ∅ Number, Integer, Digit Number, Integer, Digit T1 Number, Integer, Digit T2 Sign Number, Integer, Digit Scale, Empty Scale, Empty Scale, Empty Scale, Empty Scale, Empty Scale, Empty Scale, Empty Scale, Empty 7654 l 3210 31 22 .3 54 e5 +6 17 8 i
Figure 4.15 The recognition table with Scale, Real, and Empty added
Now, we have a recognition table which contains all the information we need to parse a
Sec. 4.2] The CYK parsing method 103
sentence with the original grammar. Again, a derivation starts with the start-symbol S.
If A1A2 . . . Am is a right-hand side of S, we want to know if this rule can be applied,
that is, if A1A2 . . . Am derives s 1,n. This is checked, starting with A1. There are two
cases:
A1
is a terminal symbol. In this case, it must be the first symbol of s 1,n, or this
rule is not applicable. Then, we must check if A2 . . . Am derives s 2,n −1, in the
same way that we are now checking if A1A2 . . . Am derives s 1,n. A1
is a non-terminal. In this case, it must be a member of a Rs 1,k , for some k, or
this rule is not applicable. Then, we must check if A2 . . . Am derives sk +1,n −k , in
the same way that we are now checking if A1A2 . . . Am derives s 1,n. If we want
all parsings, we must do this for every k for which A1
is a member of Rs 1,k .
Notice that non-terminals deriving the empty string pose no problem at all,
because they appear as a member of Rsi, 0
for all i.
We have now determined whether the rule is applicable, and if it is, which parts of the
rule derive which substrings. The next step now is to determine how the substrings can
be derived. These tasks are similar to the task we started with, and are solved in the
same way. This process will terminate at some time, provided the grammar does not
contain loops. This is simply an Unger parser that knows in advance which partitions
will lead to a successful parse.
Let us go back to the grammar of Figure 4.4 and the recognition table of Figure
4.15, and see how this works for our example input sentence. We now know that
Number does derive 32.5e+1, and want to know how. We first ask ourselves: can we
use the Number -> Integer rule? Integer is a member of Rs 1,1
and Rs 1,2 , but there
is nothing behind the Integer in the rule to derive the rest of the sentence, so we can￾not use this rule. Can we use the Number -> Real rule? Yes we can, because Real
is a member of Rs 1,7 , and the length of the sentence is 7. So, we start our derivation
with
Number -> Real -> ...
Now, we get similar questions for the Real non-terminal: can we use the Real -> Integer Fraction Scale rule? Well, Integer is a member of Rs 1,1 , but we can￾not find a Fraction in any of the Rs 2,k
sets. However, Integer is also a member of
Rs 1,2 , and Fraction is a member of Rs 3,2 . Now, Scale is a member of Rs 5,0 ; this does
not help because it would leave nothing in the rule to derive the rest. Fortunately,
Scale is also a member of Rs 5,3 , and that matches exactly to the end of the string. So,
this rule is indeed applicable, and we continue our derivation:
Number -> Real -> Integer Fraction Scale -> ...
The sentence is now split up into three parts:
104 General non-directional methods [Ch. 4 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Number ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Real ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Integer Fraction Scale ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ 3 2 . 5 e + 1
It is left to the reader to verify that we will find only one derivation, and that this is it:
Number -> Real -> Integer Fraction Scale -> Integer Digit Fraction Scale -> Digit Digit Fraction Scale -> 3 Digit Fraction Scale -> 3 2 Fraction Scale -> 3 2 . Integer Scale -> 3 2 . Digit Scale -> 3 2 . 5 Scale -> 3 2 . 5 e Sign Integer -> 3 2 . 5 e + Integer -> 3 2 . 5 e + Digit -> 3 2 . 5 e + 1
4.2.7 A short retrospective of CYK
We have come a long way. We started with building a recognition table using the ori￾ginal grammar. Then we found that using the original grammar with its unit rules and
ε-rules is somewhat complicated, although it can certainly be done. We proceeded by
transforming the grammar to CNF. CNF does not contain unit rules or ε-rules; our gain
in this respect was that the algorithm for constructing the recognition table became
much simpler. The limitation of the maximum length of a right-hand side to 2 was a
gain in efficiency, and also a little in simplicity. However, Sheil [CF 1976] has demon￾strated that the efficiency only depends on the maximum number of non-terminals
occurring in a right-hand side of the grammar, not on the length of the right-hand sides.
This can easily be understood, once one realizes that the efficiency depends (among
others) on the number of cuts in a substring that are “difficult” to find, when checking
whether a right-hand side derives this substring. This number of “difficult” cuts only
depends on the number of non-terminals in the right-hand side. So, for efficiency, CNF
is a bit too restrictive.
A disadvantage of this transformation to CNF is that the resulting recognition
table lacks some information that we need to construct a derivation using the original
grammar. In the transformation process, some non-terminals were thrown away,
because they became non-productive. Fortunately, the missing information could
easily be added. Ultimately, this process resulted in almost the same recognition table
that we would get with our first attempt using the original grammar. It only contains
some extra information on non-terminals that were added during the transformation of
the grammar to CNF. More importantly, however, it was obtained in a simpler and
much more efficient way.
Sec. 4.2] The CYK parsing method 105
4.2.8 Chart parsing
The CYK algorithm is also known under the name of chart parsing. More precisely,
both techniques have a number of variants and some variants of the CYK algorithm are
identical to some variants of chart parsing. The most striking difference between them
lies in the implementation; conceptually both algorithms do the same thing: they collect
possible parsings for larger and larger chunks of the input.
Although often presented in a different format, a chart is just a recognition table.
Figure 4.16 shows the recognition table of Figure 4.14 in a chart format: each arc
represents a non-terminal deriving the part of the sentence spanned by the arc.
3 2 . 5 e + 1 Digit Integer Number Digit Integer Number T1 Digit Integer Number T2 Sign Digit Integer Number Integer Number Fraction N2 N1 Number Scale’ N1 Number Number Number
Figure 4.16 The recognition table of Figure 4.14 in chart format
Several variants of chart parsing are discussed and compared in Bolc [NatLang
1987].`

const GeneralNonDirectionalMethods = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
export default GeneralNonDirectionalMethods