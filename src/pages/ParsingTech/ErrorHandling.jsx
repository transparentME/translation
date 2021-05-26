import MarkdownTransfer from '../../components/MarkdownTransfer'

const content = `Until now, we have discussed parsing techniques while largely ignoring what happens
when the input contains errors. In practice, however, the input often contains errors,
the most common being typing errors and misconceptions, but we could also be dealing
with a grammar that only roughly, not precisely, describes the input, for instance in pat￾tern matching. So, the question arises how to deal with errors. A considerable amount
of research has been done on this subject, far too much to discuss in one chapter. We
will therefore limit our discussion to some of the more well-known error handling
methods, and not pretend to cover the field; see Section 13.11 for more in-depth infor￾mation.
10.1 DETECTION VERSUS RECOVERY VERSUS CORRECTION
Usually, the least that is required of a parser is that it detects the occurrence of one or
more errors in the input, that is, we require error detection. The least informative ver￾sion of this is that the parser announces: “input contains syntax error(s)”. We say that
the input contains a syntax error when the input is not a sentence of the language
described by the grammar. All parsers discussed in the previous chapters (except
operator-precedence) are capable of detecting this situation without extensive modifi￾cation. However, there are few circumstances in which this behaviour is acceptable:
when we have just typed a long sentence, or a complete computer program, and the
parser only tells us that there is a syntax error somewhere, we will not be pleased at all,
not only about the syntax error, but also about the quality of the parser or lack thereof.
The question as to where the error occurs is much more difficult to answer; in fact
it is almost impossible. Although some parsers have the correct-prefix property, which
means that they detect an error at the first symbol in the input that results in a prefix
that cannot start a sentence of the language, we cannot be sure that this indeed is the
place in which the error occurs. It could very well be that there is an error somewhere
before this symbol but that this is not a syntax error at that point. There is a difference
in the perception of an error between the parser and the user. In the rest of this chapter,
when we talk about errors, we mean syntax errors, as detected by the parser.
So, what happens when input containing errors is offered to a parser with a good
error detection capability? The parser might say: “Look, there is a syntax error at posi￾tion so-and-so in the input, so I give up”. For some applications, especially highly
230 Error handling [Ch. 10
interactive ones, this may be satisfactory. For many, though, it is not: often, one would
like to know about all syntax errors in the input, not just about the first one. If the
parser is to detect further syntax errors in the input, it must be able to continue parsing
(or at least recognizing) after the first error. It is probably not good enough to just
throw away the offending symbol and continue. Somehow, the internal state of the
parser must be adapted so that the parser can process the rest of the input. This adapta￾tion of the internal state is called error recovery.
The purpose of error recovery can be summarized as follows:
an attempt must be made to detect all syntax errors in the input;
equally important, an attempt must be made to avoid spurious error messages.
These are messages about errors that are not real errors in the input, but result
from the continuation of the parser after an error with improper adaptation of its
internal state.
Usually, a parser with an error recovery method can no longer deliver a parse tree
if the input contains errors. This is sometimes the cause of considerable trouble. In the
presence of errors, the adaptation of the internal state can cause semantic actions asso￾ciated with grammar rules to be executed in an order that is impossible for syntactically
correct input, which sometimes leads to unexpected results. A simple solution to this
problem is to ignore semantic actions as soon as a syntax error is detected, but this is
not optimal and may not be acceptable. A better option is the use of a particular kind
of error recovery method, an error correction method.
Error correction methods transform the input into syntactically correct input, usu￾ally by deleting, inserting, or changing symbols. It should be stressed that error correc￾tion methods cannot always change the input into the input actually intended by the
user, nor do they pretend that they can. Therefore, some authors prefer to call these
methods error repair methods rather than error correction methods. The main advan￾tage of error correction over other types of error recovery is that the parser still can
produce a parse tree and that the semantic actions associated with the grammar rules
are executed in an order that could also occur for some syntactically correct input. In
fact, the actions only see syntactically correct input, sometimes produced by the user
and sometimes by the error corrector.
In summary, error detection, error recovery, and error correction require increas￾ing levels of heuristics. Error detection itself requires no heuristics. A parser detects an
error, or it does not. Determining the place where the error occurs may require heuris￾tics, however. Error recovery requires heuristics to adapt the internal parser state so
that it can continue, and error correction requires heuristics to repair the input.
10.2 PARSING TECHNIQUES AND ERROR DETECTION
Let us first examine how good the parsing techniques discussed in this book are at
detecting an error. We will see that some parsing techniques have the correct-prefix
property while other parsing techniques only detect that the input contains an error but
give no indication where the error occurs.
10.2.1 Error detection in non-directional parsing methods
In Section 4.1 we saw that Unger’s parsing method tries to find a partition of the input
sentence that matches one of the right-hand sides of the start symbol. The only thing
that we can be sure of in the case of one or more syntax errors is, that we will find no
Sec. 10.2] Parsing techniques and error detection 231
such partition. For example, suppose we have the grammar of Figure 4.1, repeated in
Figure 10.1, and input ×+. ExprS -> Expr + Term | Term Term -> Term × Factor | Factor Factor -> ( Expr ) | i
Figure 10.1 A grammar describing simple arithmetic expressions
Fitting the first right-hand side of Expr with the input will not work, because the input
only has two symbols. We will have to try the second right-hand side of Expr. Like￾wise, we will have to try the second right-hand side of Term, and then we will find that
we cannot find an applicable right-hand side of Factor, because the first one requires
at least three symbols, and the second one only one. So, we know that there are one or
more errors, but we do not know how many errors there are, nor where they occur. In a
way, Unger’s method is too well prepared for dealing with failures, because it expects
any partition to fail.
For the CYK parser, the situation is similar. We will find that if the input contains
errors, the start symbol will not be a member of the top element of the recognition
table.
So, the unmodified non-directional methods behave poorly on errors in the input.
10.2.2 Error detection in finite-state automata
Finite-state automata are very good at detecting errors. Consider for instance the deter￾ministic automaton of Figure 5.10, repeated in Figure 10.2.
S AB BCAC ◊ a bc aa b c
Figure 10.2 Deterministic automaton for the grammar of Figure 5.5
When this automaton is offered the input abcca, it will detect an error when it is in
state AC, on the second c in the input.
Finite-state automata have the correct-prefix property. In fact, they have the
immediate error detection property, which we discussed in Chapter 8 and which means
that an error is detected as soon as the erroneous symbol is first examined.
10.2.3 Error detection in general directional top-down parsers
The breadth-first general directional top-down parser also has the correct-prefix pro￾perty. It stops as soon as there are no predictions left to work with. Predictions are only
dropped by failing match steps, and as long as there are predictions, the part of the
input parsed so far is a prefix of some sentence of the language.
The depth-first general directional top-down parser does not have this property. It
232 Error handling [Ch. 10
will backtrack until all right-hand sides of the start symbol have failed. However, it can
easily be doctored so that it does have the correct-prefix property: the only thing that
we must remember is the furthest point in the input that the parser has reached, a kind
of high-water mark. The first error is found right after this point.
10.2.4 Error detection in general directional bottom-up parsers
The picture is quite different for the general directional bottom-up parsers. They will
just find that they cannot reduce the input to the start symbol. This is only to be
expected because, in contrast to the top-down parsers, there is no test before an input
symbol is shifted.
As soon as a top-down component is added, such as in Earley’s parser, the parser
regains the correct-prefix property. For instance, if we use the Earley parser with the
grammar from Figure 7.8 and input a-+a, we get the items sets of Figure 10.3 (com￾pare this with Figure 7.11). Itemset3
will be empty, and an error is detected.
S-> E @1 E-> EQF@1 E-> F @1 F-> a @1 . . . . . . . . . . . . . . . . . .
act/pred0 = itemset0 a1 F->a @1 E->F @1 S->E @1
completed1 E->E QF@1 Q-> + @2 Q-> - @2 . . . . . . . . . . . . . . . . . .
act/pred1 = itemset1 -2 Q->- @2
completed2 E->EQ F@1 F-> a @3 . . . . . . . . . . . . . . . . . .
act/pred2 = itemset2 +3
completed3 . . . . . . . . . . . . . . . . . .
act/pred3 = itemset3
Figure 10.3 Items sets of the Earley parser working on a-+a
10.2.5 Error detection in deterministic top-down parsers
In Sections 8.2.3 and 8.2.4 we have seen that strong-LL(1) parsers have the correct￾prefix property but not the immediate error detection property, because in some cir￾cumstances they may make some ε-moves before detecting an error, and that full LL(1)
parsers have the immediate error detection property.
10.2.6 Error detection in deterministic bottom-up parsers
Let us first examine the error detection capabilities of precedence parsers. We saw in
Section 9.2.1 that operator-precedence parsers fail to detect some errors. When they do
detect an error, it is because there is no precedence relation between the symbol on top
of the parse stack and the next input symbol. This is called a character-pair error.
The other precedence parsers (simple, weak, extended, and bounded-context) have
three error situations:
there is no precedence relation between the symbol on top of the parse stack and
the next input symbol (a character-pair error).
the precedence relations indicate that a handle is found and that a reduction must
be applied, but there is no non-terminal with a right-hand side that matches the
handle. This is called a reduction error.
after a reduction has been made, there is no precedence relation between the sym￾bol at the top of the stack (the symbol that was underneath the <·) and the left-hand
side to be pushed. This is called a stackability error.
Sec. 10.2] Parsing techniques and error detection 233
Reduction errors can be detected at an early stage by continuously checking that
the symbols between the last <· and the top of the stack form the prefix of some right￾hand side. Graham and Rhodes [ErrHandl 1975] show that this can be done quite effi￾ciently.
In Section 9.5.2 we saw that an LR(1) parser has the immediate error detection
property. LALR(1) and SLR(1) parsers do not have this property, but they do have the
correct prefix property. Error detection in Tomita’s parser depends on the underlying
parsing technique.
10.3 RECOVERING FROM ERRORS
Error handling methods fall in different classes, depending on what level they approach
the error. The general parsers usually apply an error handling method that considers the
complete input. These methods use global context, and are therefore called global
error handling methods. The Unger and CYK parsers need such a method, because
they have no idea where the error occurred. These methods are very effective, but the
penalty for this effectivity is paid for in efficiency: they are very time consuming,
requiring at least cubic time. As the general parsing methods already are time consum￾ing anyway, this is usually deemed acceptable. We will discuss such a method in Sec￾tion 10.4.
On the other hand, efficient parsers are used because they are efficient. For them,
error handling methods are required that are less expensive. We will discuss the best
known of these methods.
These methods have the following information at their disposal:
in the case of a bottom-up parser: the parse stack; in the case of a top-down
parser: the prediction;
the input string, and the point where the error was detected.
There are four classes of these methods: the ad hoc methods, which do not really
form a class; the regional error handling methods, which use some (regional) context
around the point of error detection to determine how to proceed; the local error han￾dling methods only use the parser state and the input symbol (local context) to deter￾mine what happens next; and the suffix methods, which use zero context. Examples of
these methods will be discussed in Sections 10.5, 10.6, 10.7 and 10.8.
In our discussions, we will use the terms error detection point, indicating the point
where the parser detects the error, and error symbol, which indicates the input symbol
on which the error is detected.
10.4 GLOBAL ERROR HANDLING
The most well-known global error handling method is the least-error correction
method. The purpose of this method is to derive a syntactically correct input from the
supplied one using as few corrections as possible. Usually, a symbol deletion, a symbol
insertion, and a symbol change all count as one correction (one edit operation).
It is important to realize that the number of corrections needed can easily be lim￾ited to a maximum: first, we compute the shortest sentence that can be generated from
the grammar. Let us say it has length m. If the input has length n, we can change this
input into the shortest sentence with a number of edit operations that is the maximum
of m and n: change the first symbol of the input into the first symbol of the shortest
234 Error handling [Ch. 10
sentence, etc. If the input is shorter than the shortest sentence, this results in a max￾imum of n changes, and we have to insert the last m −n symbols of the shortest sen￾tence. If the input is longer than the shortest sentence, we have to delete the last n −m
symbols of the input.
Another important point is that, when searching for a least-error correction, if we
already know that we can do it with, say, k corrections, we do not have to investigate
possibilities known to require more.
With this in mind, let us see how such an error correction method works when
incorporated in an Unger parser. We will again use the grammar of Figure 10.1 as an
example, again with input sentence ×+. This is a very short sentence indeed, to limit the
amount of work. The shortest sentence that can be generated from the grammar is i, of
length one. The observation above limits the number of corrections needed to a max￾imum of two.
Now, the first rule to be tried is Expr -> Expr + Term. This leads to the fol￾lowing partitions: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr max:2 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr + Term ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
? 1 ×+ ? ? × 1 + ? ? ×+ 1 ? × ? 1 + ? × ? + 0 ? ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ×+ ? 1 ? cut-off
Notice that we include the number of corrections needed for each part of a partition in
the right of the column, a question mark indicating that the number of corrections is yet
unknown. The total number of corrections needed for a certain partition is the sum of
the number of corrections needed for each of the parts. The top of the table also con￾tains the maximum number of corrections allowed for the rule. For the parts matching
a terminal, we can decide how many corrections are needed, which results in the
column below the +. Also notice that we have to consider empty parts, although the
grammar does not have ε-rules. The empty parts stand for insertions. The cut-off
comes from the Unger parser detecting that the same problem is already being exam￾ined.
Now, the Unger parser continues by trying to derive ε from Expr. The current
partition already requires one correction, so the maximum number of corrections
allowed is now one. The rule Expr -> Expr + Term has the following result: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr max:1 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr + Term ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ? 1 ? cut-off
so we will have to try the other rule for Expr: Expr -> Term. Likewise, Term -> Term × Factor will result in a cut-off, so we will have to use Term -> Factor.
The rule Factor -> ( Expr ) will again result in a cut-off, so Factor -> i will
be used:
Sec. 10.4] Global error handling 235 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr max:1 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Term max:1 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Factor max:1 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ i max:1 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾1
So, we find, not surprisingly, that input part ε can be corrected to i, requiring one
correction (inserting i) to make it derivable from Expr (and Term and Factor). To
complete our work on the first partition of ×+ over the right-hand side Expr + Term,
we have to examine if, and how, Term derives ×+. We already need two corrections
for this partition, so no more corrections are allowed because of the maximum of two.
For the rule Term -> Term × Factor we get the following partitions (in which we
cheated a bit: we used some information computed earlier): ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Term max:0 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Term × Factor ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
1 1 ×+ ? too many corrections
1 × 0 + ? too many corrections
1 ×+ 1 1 too many corrections
× ? 1 + ? too many corrections
× ? + 1 1 too many corrections ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ×+ ? 1 1 cut-off
So, we will have to try Term -> Factor. After that, Factor -> ( Expr ) results
in the following partitions: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Term max:0 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Factor max:0 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ( Expr ) ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
1 1 ×+ 2 too many corrections
1 × ? + 1 too many corrections
1 ×+ ? 1 cut-off
× 1 1 + 1 too many corrections
× 1 + ? 1 too many corrections ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ×+ 2 1 1 too many corrections
This does not work either. The rule Factor -> i results in the following: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Term max:0 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Factor max:0 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ i max:0 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ×+ 2 too many corrections
So we get either a cut-off or too many corrections (or both). This means that the parti￾tion that we started with is the wrong one. The other partitions are tried in a similar
236 Error handling [Ch. 10
way, resulting in the following partition table, with completed error correction counts: ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr max:2 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ Expr + Term ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
1 1 ×+ >0 too many corrections
1 × 1 + 1 too many corrections
1 ×+ 1 1 too many corrections
× 1 1 + 1 too many corrections
× 1 + 0 1 ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾ ×+ ? 1 1 cut-off
So, provided that we do not find better corrections later on, using the rule Expr -> Expr + Term we find the corrected sentence i+i, by replacing the × with an i, and
inserting an i at the end of the input. Now, the Unger parser proceeds by trying the
rule Expr -> Term. Continuing this process, we will find two more possibilities
using two corrections: the input can be corrected to i×i by inserting an i in front of the
input and replacing the + with another i, or the input can be corrected by replacing ×
with an i and deleting + (or deleting × and replacing + with an i).
This results in three possible corrections for the input, all three requiring two edit
operations. Choosing between these corrections is up to the parser writer. If the parser
is written to handle ambiguous input anyway, the parser might deliver three parse trees
for the three different corrections. If the parser must deliver only one parse tree, it
could just pick the first one found. Even in this case, however, the parser has to con￾tinue searching until it has exhausted all possibilities or it has found a correct parsing,
because it is not until then that the parser knows if the input in fact did contain any
errors.
As is probably clear by now, least-errors correction does not come cheap, and it is
therefore usually only applied in general parsers, because these do not come cheap any￾way.
Lyon [ErrHandl 1974] has added least-errors correction to the CYK parser and the
Earley parser, although his CYK parser only handles replacement errors. In his version
of the CYK parser, the non-terminals in the recognition table have an error count asso￾ciated with it. In the bottom row, which is the one for the non-terminals deriving a sin￾gle terminal symbol, all entries contain all non-terminals that derive a single terminal
symbol. If the non-terminal derives the corresponding terminal symbol it has error
count 0, otherwise it has error count 1 (a replacement). Now, when we find that a
non-terminal A with rule A→BC is applicable, it is entered in the recognition table with
an error count equal to the sum of that of B and C, but only if it is not already a member
of the same recognition table entry, but with a lower error count.
Aho and Peterson [ErrHandl 1972] also added least-errors correction to the Earley
parser by extending the grammar with error productions, so that it produces any string
of terminal symbols, with an error count. As in Lyon’s method, the Earley items are
extended with an error count indicating how many corrections were needed to create
the item. An item is only added to an item set if it does not contain one like it which
has a lower error count.
Sec. 10.4] Ad hoc methods 237
10.5 AD HOC METHODS
The ad hoc error recovery methods are called ad hoc because they cannot be automati￾cally generated from the grammar. These methods are as good as the parser writer
makes them, which in turn depends on how good the parser writer is in anticipating
possible syntax errors. We will discuss three of these ad hoc methods: error produc￾tions, empty table slots and error tokens.
10.5.1 Error productions
Error productions are grammar rules, added by the grammar writer so that anticipated
syntax errors become part of the language (and thus are no longer syntax errors). These
error productions usually have a semantic action associated with them that reports the
error; this action is triggered when the error production is used. An example where an
error production could be useful is the Pascal if-statement. The latter has the following
syntax:
if-statement -> IF boolean-expression THEN statement else-part else-part -> ELSE statement | ε A common error is that an if-statement has an else-part, but the statement in
front of the else-part is terminated by a semicolon. In Pascal, a semicolon is a state￾ment separator rather than a statement terminator and is not allowed in front of an
ELSE. This situation could be detected by changing the grammar rule for else-part
into
else-part -> ELSE statement | ε | ; ELSE statement
where the last right-hand side is the error production.
The most important disadvantages of error productions are:
only anticipated errors can be handled;
the modified grammar might (no longer) be suitable for the parsing method used,
because conflicts could be introduced by the added rules.
The advantage is that a very adequate error message can be given. Error productions
can be used profitably in conjunction with another error handling method, to handle
some frequent errors on which the other method does not perform well.
10.5.2 Empty table slots
In most of the efficient parsing methods, the parser consults one or more parse tables
and bases its next parsing decision on the result. These parsing tables have error
entries (represented as the empty slots), and if one of these is consulted, an error is
detected. In this error handling method, the empty table slots are used to refer to error
handling routines. Each empty slot has its own error handling routine, which is called
when the corresponding slot is consulted. The error handling routines themselves are
written by the parser writer. By very careful design of these error handling routines,
very good results can be obtained; see for instance Conway and Wilcox [ErrHandl
1973]. In order to achieve good results, however, the parser writer must invest consid￾erable effort. Usually, this is not considered worth the gain, in particular because good
error handling can be generated automatically.
238 Error handling [Ch. 10
10.5.3 Error tokens
Another popular error recovery method uses error tokens. An error token is a special
token that is inserted in front of the error detection point. The parser will pop states
from the parse stack until this token becomes valid, and then skip symbols from the
input until an acceptable symbol is found. The parser writer extends the grammar with
rules using this error token. An example of this is the following grammar:
input -> input input_line | ε input_line -> ERROR_TOKEN NEWLINE | STRING NEWLINE
This kind of grammar is often seen in interactive applications, where the input is line
by line. Here, ERROR_TOKEN denotes the error token, and NEWLINE denotes an end of
line marker. When an error occurs, states are popped until ERROR_TOKEN becomes
acceptable, and then symbols are skipped until a NEWLINE is encountered.
This method can be quite effective, provided that care is taken in designing the
rules using the error token.
10.6 REGIONAL ERROR HANDLING
In regional error handling, most often applied in bottom-up parsers, recovery from
errors is done by collecting some context around the error detection point, usually as a
part of the parse stack around the error, and reducing that part (including the error) to a
left-hand side. Therefore, this class of error handling methods is also often called
phrase level error handling.
10.6.1 Backward/forward move
An error handling method that is applicable to bottom-up parsers is the
backward/forward move error recovery method, presented by Graham and Rhodes
[ErrHandl 1975]. It consists of two stages: the first stage condenses the context around
the error as much as possible. This is called the condensation phase. Then the second
stage, the correction phase, changes the parsing stack and/or the input so that parsing
can continue. The method is best applicable to simple precedence parsers, and we will
use such a parser as an example.
Our example comes from the grammar and precedence table of Figure 9.13. Sup￾pose that we have input #n×+n#. The simple precedence parser has the following parse
stacks at the end of each step, up to the error detection point:
# <· n ·> shift n, next symbol is × # <· F ·> reduce n # <· T =˙ × reduce F, shift ×
No precedence relation is found to exist between the × and the +, resulting in an error
message that + is not expected.
Let us now examine the condensation phase in some detail. As said before, the
purpose of this phase is to condense the context around the error as much as possible.
The left-context is condensed by a so-called backward move: assuming a ·> relation
between the top of the parse stack and the symbol on which the error is detected (that
is, assuming that the parse stack built so far has the end of a handle as its top element),
Sec. 10.6] Regional error handling 239
perform all possible reductions. In our example, no reductions are possible. Now
assume a =˙ or a <· between the top of the stack and the next symbol. This enables us to
continue parsing a bit. This step is the so-called forward move: first we shift the next
symbol, resulting in the following parse stack:
# <· T =˙ × =˙/<· + shift +
Next, we disable the check that the top of the stack should represent a prefix of a right￾hand side. Then, we continue parsing until either another error occurs or a reduction is
called for that spans the error detection point. This gives us some right-context to work
with, which can be condensed by a second backward move, if needed. For our exam￾ple, this results in the following steps:
# <· T =˙ × =˙/<· + <· n ·> # shift n, next symbol is # # <· T =˙ × =˙/<· + <· F ·> # reduce n # <· T =˙ × =˙/<· + <· T ·> # reduce F # <· T =˙ × =˙/<· + =˙ T’ ·> # reduce T
So now we have the situation depicted in Figure 10.4.
. . . <· . . . . . .
nearest <· to the left of
the error detection point
error detection
point
top of
stack
➀ ➁ ➂
Figure 10.4 Situation after the backward/forward moves
This is where the correction phase starts. The correction phase considers three parts of
the stack for replacement with some right-hand side. These parts are indicated with ➀, ➁ and ➂ in Figure 10.4. Part ➀ is considered because the precedence at the error
detection point could be ·>, part ➁ is considered because the precedence at the error
detection point could be <·, and part ➂ is considered because this precedence could be
=˙. Another option is to just delete one of these parts. This results in a fairly large
number of possible changes, which now must be limited by making sure that the parser
can continue after reducing the right-hand side to its corresponding left-hand side.
In the example, we have the following situation:
<· T =˙ × ?· + =˙ T’ ·> ➀ ➁ ➂
The left-hand sides that could replace part ➀ are: E, T’, T, and F. These are the non￾terminals that have a precedence relation with the next symbol: the +. The only left￾hand side that could replace part ➁ is F. Part ➂ could be replaced by E, T’, T, and F.
240 Error handling [Ch. 10
This still leaves a lot of choices, but some “corrections” are clearly better than others.
Let us now see how we can discriminate between them.
Replacing part of the parse stack by a right-hand side can be seen as an edit opera￾tion on the stack. The cost of this edit operation can be assessed as follows. With
every symbol, we can associate a certain insertion cost I and a certain deletion cost D.
The cost for changing for instance T× to F would then be D(T)+D(×)+I(F). These costs
are determined by the parser writer. The cheapest parse stack correction is then chosen.
If there is more than one with the same lowest cost, we just pick one.
Assigning identical costs to all edit operations, in our example, we end up with
two possibilities, both replacing part ➀: T (deleting the ×), or T×F (inserting an F).
Assigning higher costs to editing a non-terminal, which is not unreasonable, would
only leave the first of these. Parsing then proceeds as follows:
<· T =˙ × ? + =˙ T’ ·> error situation
<· T ·> + =˙ T’ ·> error corrected by deleting × <· T’ ·> + =˙ T’ ·> reducing T <· E =˙ + =˙ T’ ·> reducing T’ <· E ·> reducing E+T’ <· E’ ·> reducing E <· S ·> reducing E’
The principles of this method have also been applied in LR parsers. There, how￾ever, the backward move is omitted, because in an LR parser the state on top of the
stack, together with the next input symbol, determine the reduction that can be applied.
If the input symbol is erroneous, we have no way of knowing which reductions can be
applied. For further details, see Pennello and DeRemer [ErrHandl 1978] and also
Mickunas and Modry [ErrHandl 1978].
10.7 LOCAL ERROR HANDLING
All local error recovery techniques are so-called acceptable-set error recovery tech￾niques. These techniques work as follows: when a parser detects an error, a certain set
called the acceptable-set is calculated from the parser state. Next, symbols from the
input are skipped until a symbol is found that is a member of the acceptable-set. Then,
the parser state is adapted so that the symbol that is not skipped becomes acceptable.
There is a family of such techniques; the members of this family differ in the way they
determine the acceptable-set, and in the way in which the parser state is adapted. We
will now discuss several members of this family.
10.7.1 Panic mode
Panic mode is probably the simplest error recovery method that is still somewhat effec￾tive. In this method, the acceptable-set is determined by the parser writer, and is fixed
for the whole parsing process. The symbols in this set usually indicate the end of a
syntactic construct, for instance a statement in a programming language. For the pro￾gramming language Pascal, this set could contain the symbols ; and end. When an
error is detected, symbols are skipped until a symbol is found that is a member of this
set. Then, the parser must be brought into a state that makes this symbol acceptable. In
an LL parser, this might require deleting the first few symbols of the prediction, in an
Sec. 10.7] Local error handling 241
LR parser this might involve popping states from the parse stack until a state is
uncovered in which the symbol is acceptable.
The recovery capability of panic mode is often quite good, but many errors can go
undetected, because sometimes large parts of the input are skipped. The method has
the advantage that it is very easy to implement.
10.7.2 FOLLOW set error recovery
Another early acceptable-set recovery method is the FOLLOW set error recovery
method. The idea is applicable in an LL parser, and works as follows: when we are
parsing a part of the input, and the top of the prediction stack results most recently from
a prediction for the non-terminal A, and we detect an error, we skip symbols until we
find a symbol that is a member of FOLLOW(A). Next, we remove the unprocessed
part of the current right-hand side of A from the prediction, and continue parsing. As
we cannot be sure that the current input symbol can follow A in the present context and
is thus acceptable, this is not such a good idea. A better idea is to use that part of
FOLLOW(A) that can follow A in this particular context, making sure that the symbol
that is not skipped will be accepted, but this is not trivial to do.
The existence of this method is probably the reason that the family of acceptable￾set error recovery methods is often called FOLLOW set error recovery. However, for
most members of this family this is a confusing name.
A variant of this method that has become very popular in recursive descent parsers
is based on the observation that at any point during the parsing process, there are a
number of active non-terminals (for which we are now trying to match a right-hand
side), and in general this number is larger than one. Therefore, we should use the union
of the FOLLOW sets of these non-terminals, rather than the FOLLOW set of just the
most recent of them. A better variant uses the union of those parts of the FOLLOW sets
that can follow the non-terminals in this particular context. An expansion of this idea is
the following: suppose the parser is in the following state when it detects an error:
. . . a . . . . . . X1 . . . Xn#
We can then have the acceptable-set contain the symbols in FIRST(X1
), FIRST(X2
),
. . . , and #, and recover by skipping symbols until we meet a symbol of this
acceptable-set, and then removing symbols from the prediction until the input symbol
becomes acceptable.
Many variations of this technique exist; see for instance Pemberton [ErrHandl
1980] and Stirling [ErrHandl 1985].
10.7.3 Acceptable-sets derived from continuations
A very interesting and effective member of the acceptable-set recovery method family
is the one discussed by Röhrich [ErrHandl 1980]. The idea is as follows. Suppose that
a parser with the correct prefix property detects an error in the input after having pro￾cessed a prefix u. Because of the correct prefix property, we know that this prefix u is
the start of some sentence in the language. Therefore, there must be a continuation,
which is a terminal string w, such that uw is a sentence of the language. Now suppose
242 Error handling [Ch. 10
we can compute such a continuation. We can then correct the error as follows:
Determine a continuation w of u.
For all prefixes w′ of w, compute the set of terminal symbols that would be
accepted by the parser after it has parsed w′, and take the union of these sets. If a
is a member of this set, uw′a is a prefix of some sentence in the language. This set
is our acceptable-set. Note that it includes all symbols of w, including the end￾marker.
Skip symbols from the input until we find a symbol that is a member of this set.
Note that as a result of this, everything up to the end-marker may be skipped.
Insert the shortest prefix of w that makes this symbol acceptable in front of this
symbol. If everything up to the end-marker was skipped, insert w itself.
Produce an error message telling the user which symbols were skipped and which
symbols were inserted.
Restart the parser in the state where the error was detected and continue parsing,
starting with the inserted symbols. Now, the error is corrected, and the parser
continues as if nothing has happened.
10.7.3.1 Continuation grammars
There are two problems here, how to determine the continuation and how to calculate
the acceptable-set without going through all possible parsings. Let us regard a gram￾mar as a generating device. Suppose we are generating a sentence from a grammar, and
have obtained a certain sentential form. Now, we want to produce a sentence from it as
soon as possible, using the fewest possible production steps. We can do this if we
know for each non-terminal which right-hand side is the quickest “exit”, that is, which
right-hand side leads to a terminal production in as few production steps as possible.
It turns out that we can compute these right-hand sides in advance. To this end, we
compute for each symbol the minimum number of production steps needed to obtain a
terminal derivation from it. We call this number the step count. Terminal symbols
have step count 0, non-terminal symbols have an as yet unknown step count, which we
set to infinity. Next, we examine each right-hand side in turn. If we already have a step
count for each of the members of a right-hand side, the right-hand side itself needs the
sum of these step counts, and the left-hand side needs one more if it uses this right￾hand side. If this is less than we had for this non-terminal, we update its step count.
We repeat this process until none of the step counts changes. If we had a proper
grammar to begin with, all of the step counts will now be finite. Now, all we have to
do is for each left-hand side to mark the right-hand side with the lowest step count. The
grammar rules thus obtained are called a continuation grammar, although these rules
together probably do not form a proper grammar.
Let us see how this works with an example. Consider the grammar of Figure 8.9,
repeated in Figure 10.5 for reference.
Session -> Facts Question | ( Session ) Session Facts -> Fact Facts | ε Fact -> ! STRING Question -> ? STRING
Figure 10.5 An example grammar
Sec. 10.7] Local error handling 243
The first pass over the right-hand sides shows us that Facts, Fact, and Question
each have step count 1. In the next pass, we find that Session has step count 3. The
resulting continuation grammar is presented in Figure 10.6.
Session -> Facts Question Facts -> ε Fact -> ! STRING Question -> ? STRING
Figure 10.6 The continuation grammar of the grammar of Figure 10.5
10.7.3.2 Continuation in an LL parser
In an LL parser, it now is easy to compute a continuation when an error occurs. We
take the prediction, and derive a terminal string from it using only rules from the con￾tinuation grammar, processing the prediction from left to right. Each terminal that we
meet ends up in the acceptable-set; in addition, every time a non-terminal is replaced
by its right-hand side from the continuation grammar, we add to the acceptable-set the
terminal symbols from the FIRST set of the current sentential form starting with this
non-terminal.
Let us demonstrate this with an example. Suppose that we have the input ( ? STRING ? STRING for the LL(1) parser of Figure 8.10. When the parser detects an
error, it is in the following state:
( ? STRING ? STRING # . . . ) Session #
Now, a continuation will be computed, starting with the sentential form ) Session #,
using the continuation grammar. During this computation, when the prediction starts
with a non-terminal, the FIRST set of the prediction will be computed and the non￾terminal will be replaced by its right-hand side in the continuation grammar. The
FIRST set is shown in square brackets below the line:
) Session # -> ) [(!?] Facts Question # -> ) [(!?] [!?] ε Question # -> ) [(!?] [!?] [?] ? STRING #
Consequently, the continuation is ) ? STRING # and the acceptable-set contains (, ), !, ?, STRING and #. We see that we should keep the ? and insert the first symbol of
the continuation, ). So, the parser is restarted in the following state:
244 Error handling [Ch. 10
( ? STRING ) ? STRING # . . . ) Session #
and proceeds as usual.
10.7.3.3 Continuation in an LR parser
Unlike an LL parser, an LR parser does not feature a sentential form which represents
the rest of the input. It is therefore more difficult to compute a continuation. Röhrich
[ErrHandl 1980] demonstrates that an LR parser can be generated that has a terminal
symbol associated with each state of the handle recognizer so that we can obtain a con￾tinuation by pretending that the parser has this symbol as input when it is in the
corresponding state. The sequence of states that the parser goes through when these
symbols are given as input then determines the continuation. The acceptable-set con￾sists of the terminal symbols on which a shift or reduce can take place (i.e. which are
acceptable) in any of these states.
10.7.4 Insertion-only error correction
Fischer, Milton and Quiring [ErrHandl 1980] propose an error correction method for
LL(1) parsers using only insertions. This method has become known as the FMQ error
correction method. In this method, the acceptable-set is the set of all terminal symbols.
Fischer, Milton and Quiring argue that the advantage of using only insertions (and thus
no deletions or replacements) is that a syntactically correct input is built around the
input supplied by the user, so none of the symbols supplied by the user are deleted or
changed. Of course, the question arises if every input can be corrected in this way, and
in general the answer is no; for some languages it can however, and other languages are
easily modified so that it can.
Let us investigate which properties a language must have for every error to be
correctable by insertions only. Suppose we have an input xa . . .
such that the start
symbol does derive a sentence starting with x, but not a sentence starting with xa; so x
is a correct prefix, but xa is not. Now, if this error is to be corrected by an insertion y,
xya must again be a correct prefix. This leads to the notion of insert-correctable gram￾mars: a grammar is said to be insert-correctable if for every prefix x of a sentence and
every symbol a in the language there is a continuation of x that includes a (so an inser￾tion can always be found). Fischer, Milton and Quiring demonstrate that it is decidable
whether an LL(1) grammar is insert-correctable.
So, the FMQ error correction method is applicable in an LL(1) parser built from
an insert-correctable grammar. In addition, the LL(1) parser must have the immediate
error detection property. As we have seen in Section 8.2.4, the usual (strong-)LL(1)
parser does not have this property, but the full LL(1) parser does. Fischer, Tai and Mil￾ton [ErrHandl 1979] show that for the class of LL(1) grammars in which every non￾terminal that derives ε does so explicitly through an ε-rule, the immediate error detec￾tion property can be retained while using strong-LL(1) tables.
Now, how does the error corrector work? Suppose that an error is detected on
input symbol a, and the current prediction is X1 . . . Xn#. The state of the parser is
then:
Sec. 10.7] Local error handling 245
. . . a . . . . . . X1 . . . Xn#
As a is an error, we know that it is not a member of FIRST(X1 . . . Xn#). We also
know that the grammar is insert-correctable, so X1 . . . Xn# must derive a terminal
string containing a. The error corrector now determines the cheapest insertion after
which a is acceptable. Again, every symbol has associated with it a certain insertion
cost, determined by the parser writer; the cost of an insertion is the sum of the costs of
the symbols in the insertion.
To compute the cheapest insertion, the error corrector uses some tables that are
precomputed for the grammar at hand (by the parser generator). First, there is a table
that we will call cheapest_derivation, giving the cheapest terminal derivation for
each symbol (for a terminal, this is of course the terminal itself). Second, there is a
table that we will call cheapest_insertion giving for each symbol/terminal combi￾nation (X,a) the cheapest insertion y such that X→* ya . . . , if it exists, or an indication
that it does not exist. Note that in any prediction X1 . . . Xn# there must be at least one
symbol X such that the (X,a) entry of the cheapest_insertion table contains an
insertion (or else the grammar was not insert-correctable).
Going back to our parser, we can now compute the cheapest insertion z such that a
becomes acceptable. Consulting cheapest_insertion(X1, a), we can distinguish
two cases:
cheapest_insertion(X1, a) contains an insertion y 1; in this case, we have
found an insertion.
cheapest_insertion(X1, a) does not contains an insertion. In this case, we
use cheapest_derivation(X1) as the first part of the insertion, and continue
with X2
in exactly the same way as we did with X1. In the end, this will result in
an insertion y 1 . . . yi, where y 1, . . . ,yi −1 come from the
cheapest_derivation table, and yi comes from the cheapest_insertion
table.
In some LL(1) parsers, notably recursive descent ones, the prediction is not explicitly
available, only the first part X1
is. In this case, we can use this first part to compute an
insertion y 1, either as cheapest_insertion(X1, a) or as
cheapest_derivation(X1) (which may or may not make a acceptable), and we
insert it:
. . . y 1a . . . . . . X1 . . . Xn#
If the insertion y 1 does not make a acceptable yet, after parsing y 1, the parser is in the
following state:
246 Error handling [Ch. 10
. . . y 1 a . . . . . . X2 . . . Xn#
and the process is repeated (X2
is now explicitly available).
The most serious disadvantage of the FMQ error corrector is that it behaves rather
poorly on those errors that are better corrected by a deletion. Advantages are that it
always works, can be generated automatically, and is simple.
Anderson and Backhouse [ErrHandl 1982] present a significant improvement of
the implementation described above, which is based on the observation that it is suffi￾cient to only compute the first symbol of the insertion: if we detect an error symbol a
after having read prefix u, and w = w1w2 . . . wn
is a cheapest insertion, then w2 . . . wn
is a cheapest insertion for the error a after having read uw1. So, the
cheapest_derivation and cheapest_insertion tables are not needed. Instead,
tables are needed that are indexed similarly, but only contain the first symbol of the
insertion. The latter tables are much smaller, and easier to compute.
10.7.5 Locally least-cost error recovery
Like the FMQ error correction method, locally least-cost error recovery (see Back￾house [Books 1979] and Anderson, Backhouse, Bugge and Stirling [ErrHandl 1983]) is
a technique for recovering from syntax errors by editing the input string at the error
detection point. The FMQ method corrects the error by inserting terminal symbols, the
locally least-cost method corrects the error by either deleting the error symbol, or
inserting a sequence of terminal or non-terminal symbols after which the error symbol
becomes correct, or changing the error symbol. Unlike the least-errors analysis dis￾cussed in Section 10.4, which considers the complete input string in determining the
corrections to be made, the locally least-cost method only considers the error symbol
itself and the symbol after that. The correction is determined by its cost: every symbol
has a certain insertion cost, every terminal symbol has a certain deletion cost, and every
replacement also has a certain cost. All these costs are determined by the parser writer.
When considering if the error symbol is to be deleted, the cost of an insertion that
would make the next input symbol acceptable is taken into account. The cheapest
correction is chosen.
This principle does not rely on a particular parsing method, although the imple￾mentation does. The method has successfully been implemented in LL, LR, and Earley
parsers; see Backhouse [Books 1979], Anderson and Backhouse [ErrHandl 1981],
Anderson, Backhouse, Bugge and Stirling [ErrHandl 1983], and Choe and Chang
[ErrHandl 1986] for details.
10.8 SUFFIX PARSING
Although the error correction and error recovery methods discussed above have their
good and bad points, they all have the following problems in common:
On an error, they change the input and/or the parser state, using heuristics to
choose one of the many possibilities. We can, however, never be sure that we
picked the right change.
Selecting the wrong change can cause an avalanche of spurious error messages.
Sec. 10.8] Suffix parsing 247
Only the least-errors analysis of Section 10.4 does not have this problem.
A quite different approach to error recovery is that of Richter [ErrHandl 1985].
He proposes a method that does not have the problems mentioned above, but has some
problems of its own. The author argues that we should not try to repair an error,
because we cannot be sure that we get it right. Neither should we try to change parser
state and/or input. The only thing that we can assume is that the rest of the input (the
input that comes after the error symbol, excluding the error symbol itself) is a suffix
(tail) of a sentence of the language. This is an assumption made in several error
recovery methods, but the difference is that most error recovery methods assume more
than that, in that they use (some of) the parser state information built so far.
The set of strings that are some suffix of some sentence of a language forms itself
a language. This language of suffixes is called the suffix-language of the original
language and, in fact, the suffix-language of a context-free language is again a
context-free language, for which a grammar can be constructed given the grammar of
the original language. Such a grammar is called a suffix-grammar, and one can be con￾structed in the following way: for every non-terminal A in the original grammar, we
introduce a new non-terminal A′ which derives a suffix of a sentence generated by the
original non-terminal. If the original grammar contains a rule
A → X1X2 . . . Xn
the suffix-grammar will also contain this rule and, in addition, it will contain the fol￾lowing rules deriving a suffix of what A can derive:
A′ → X′1X2 . . . Xn A′ → X′2 . . . Xn ... ... ... A′ → X′n
If Xi
is a terminal symbol, X′i
is the empty string.
All the new non-terminals (marked with a ′) derive the empty string, which is also
a suffix,albeit a degenerate one. If S is the start symbol of the original grammar, the
suffix-grammar has start symbol S
suffix with the following rules:
S
suffix → S | S′
The error recovery method now works as follows: parsing starts with a parser for
the original language, preferably one with the correct prefix property. When an error is
detected, it is reported, the error symbol is skipped and a parser derived from the
suffix-grammar, a so-called suffix-parser, is started on the rest of the input (which must
be a suffix or else there is another error). When another error is detected, it is again
reported, the error symbol is skipped, and the suffix-parser is reset to its starting state,
ready to accept another suffix.
This method has several advantages:
Each error reported is guaranteed to be a different syntax error, and no error is
reported more than once. This maintains a high level of user confidence in the
error messages.
After each error, the parser is restarted in the proper state. There are no spurious
248 Error handling [Ch. 10
error messages.
No input is skipped, apart from the error symbols.
This sounds just about perfect, so there must be a catch, and indeed there is one; it concerns the suffix-grammar. For the method to be practical, we need an efficient suffixparser. However, the suffix-grammar may not be suitable for any of the deterministic
parsing methods, such as LL or LR. In fact, the way we constructed the suffix-grammar
almost certainly results in an ambiguous grammar. This, however, does not mean that
the language is ambiguous. Richter conjectures that any kind of bounded-context property of the original grammar is sufficient for the existence of a deterministic suffixgrammar. This conjecture is confirmed by Cormack [ErrHandl 1989] for a subset of
the bounded-context grammars.
Another, less important, disadvantage is that sometimes not all syntax errors are
reported. This is not really a disadvantage in a highly interactive environment, where it
is probably more important that all reported errors are real errors. Also, in the presence
of errors, the parser is unable to deliver a meaningful parse tree, which may or may not
be a disadvantage.

`
const ErrorHandling = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
export default ErrorHandling