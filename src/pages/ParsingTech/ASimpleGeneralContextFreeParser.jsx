import MarkdownTransfer from '../../components/MarkdownTransfer'

const content = `Although LL(1) and LALR(1) parsers are easy to come by, they are of limited use out￾side the restricted field of programming language processing, and general parsers are
not widely available. The general parser shown here in full detail will yield all parsings
of a sentence according to a CF grammar, with no restriction imposed on the grammar.
It can be typed in and made operational in a couple of hours, to enable the reader to
experiment directly with a general CF parser. The parser, which is rather primitive,
takes exponential time in the worst case; an extension to reduce the time requirement to
polynomial time is discussed in Section 12.3. The interested reader who has access to a
Prolog interpreter may wish to look into Definite Clause Grammars (Section 6.7).
These are perhaps easier to use than the parser in this chapter, but cannot handle left￾recursion.
12.1 PRINCIPLES OF THE PARSER
The parser, presented as a Pascal program in Figure 12.1, is the simplest we can think
of that puts no restrictions on the grammar. Since it searches a forest of possible parse
trees to find the applicable ones, it is not completely trivial, though. The parser is an
Unger parser in that a top-down analysis is made, dividing the input into segments that
are to be matched to symbols in the pertinent right-hand side. A depth-first search
(using recursive-descent) is used to enumerate all possibilities. To keep the size of the
parser reasonable, a number of oversimplifications have been made (for one thing,
names of non-terminals can be one character long only). Once the parser is running,
these can all be rectified.
program Unger(input, output); { Unger parser in Pascal } constNoSymbol = ’ ’; MaxRules = 10; MaxRhsLength = 10; MaxInputLength = 10; ArraySize = 1000; { for all stacks and lists } type
254 A simple general context-free parser [Ch. 12
SymbolType = char; RuleNmbType = integer; RhsType = packed array [1..MaxRhsLength] of SymbolType; InputStringType = packed array [1..MaxInputLength] of SymbolType; RuleType = record LhsField: SymbolType; RhsField: RhsType; end; StackElemType = recordNmbField: RuleNmbType; RhsUsedField: integer; { the rule } PosField, LenField, InpUsedField: integer; { the substring } end; var InputString: InputStringType; InputLength: integer; Grammar: array [1..MaxRules] of RuleType; NRules: integer; Start: SymbolType; Stack: array [1..ArraySize] of StackElemType; NStackElems: integer; RuleStack: array [1..ArraySize] of RuleNmbType; NRulesStacked: integer; NDerivations: integer; { RULE ADMINISTRATION } procedure StoreRule(lhs: SymbolType; rhs: RhsType); beginNRules:= NRules+1; with Grammar[NRules] do begin LhsField:= lhs; RhsField:= rhs; end; end { StoreRule }; procedure WriteRhs(rhs: RhsType); var n: integer; beginfor n:= 1 to MaxRhsLength do if rhs[n] <> NoSymbol then write(rhs[n]); end { WriteRhs }; procedure WriteRule(nmb: RuleNmbType); beginwith Grammar[nmb] do beginwrite(LhsField, ’ -> "’); WriteRhs(RhsField); write(’"’); end; end { WriteRule }; procedure PushRule(n: RuleNmbType); begin
Sec. 12.1] Principles of the parser 255
NRulesStacked:= NRulesStacked+1; RuleStack[NRulesStacked]:= n; end; procedure PopRule; begin NRulesStacked:= NRulesStacked-1; end; procedure ParsingFound; var r: integer; beginNDerivations:= NDerivations+1; for r:= 1 to NRulesStacked do begin WriteRule(RuleStack[r]); writeln; end; writeln; end { ParsingFound }; { HANDLING OF KNOWN PARSINGS } procedure StartNewKnownGoal(nmb: RuleNmbType; pos, len: integer); begin end; procedure RecordKnownParsing; begin end; { PARSING STACK HANDLING } procedure PushStack(nmb: RuleNmbType; pos, len: integer); beginNStackElems:= NStackElems+1; with Stack[NStackElems] do beginNmbField:= nmb; RhsUsedField:= 0; PosField:= pos; LenField:= len; InpUsedField:= 0; end; end { PushStack }; procedure PopStack; begin NStackElems:= NStackElems-1; end; function IsToBeAvoided(nmb: RuleNmbType; pos, len: integer): Boolean; var i: integer; beginIsToBeAvoided:= false; for i:= 1 to NStackElems do with Stack[i] do if (NmbField=nmb) and (PosField=pos) and (LenField=len) then IsToBeAvoided:= true; end { IsToBeAvoided }; procedure AdvanceTOS(len: integer); beginwith Stack[NStackElems] do beginRhsUsedField:= RhsUsedField+1; InpUsedField:= InpUsedField+len; end;
256 A simple general context-free parser [Ch. 12
end { AdvanceTOS }; procedure RetractTOS(len: integer); beginwith Stack[NStackElems] do beginRhsUsedField:= RhsUsedField-1; InpUsedField:=InpUsedField-len; end; end { RetractTOS }; { THE AUTOMATON } procedure TryAllRulesFor(lhs: SymbolType; pos, len: integer); var nmb: RuleNmbType; procedure DoTopOfStack; var tosSymb: SymbolType; { active symbol on top of Stack } procedure DoNextOnStack; var sv: StackElemType; begin { the non-terminal on top of Stack was recognized } RecordKnownParsing; { save top of Stack } sv:= Stack[NStackElems]; NStackElems:= NStackElems-1; if (NStackElems = 0) then ParsingFound else beginAdvanceTOS(sv.LenField); DoTopOfStack; RetractTOS(sv.LenField); end; { restore top of Stack } NStackElems:= NStackElems+1; Stack[NStackElems]:= sv; end { DoNextOnStack }; procedure TryAllLengthsFor (lhs: SymbolType; pos, maxlen: integer); var len: integer; beginfor len:= 0 to maxlen do TryAllRulesFor(lhs, pos, len); end { TryAllLengthsFor }; begin { DoTopOfStack } with Stack[NStackElems] do begintosSymb:= Grammar[NmbField].RhsField[RhsUsedField+1]; if tosSymb = NoSymbol then beginif (InpUsedField = LenField) then DoNextOnStack; end else if (InpUsedField < LenField) and (tosSymb = InputString[PosField+InpUsedField]) then begin { 1 symbol was recognized } AdvanceTOS(1);
Sec. 12.1] Principles of the parser 257
DoTopOfStack; RetractTOS(1); end else TryAllLengthsFor(tosSymb, PosField+InpUsedField, LenField-InpUsedField); end; end { DoTopOfStack }; function KnownGoalSucceeds (nmb: RuleNmbType; pos, len: integer): Boolean; begin KnownGoalSucceeds:= false; end; procedure TryRule(nmb: RuleNmbType; pos, len: integer); beginif not IsToBeAvoided(nmb, pos, len) then if not KnownGoalSucceeds(nmb, pos, len) then beginPushStack(nmb, pos, len); StartNewKnownGoal(nmb, pos, len); write(’Trying rule ’); WriteRule(nmb); writeln(’ at pos ’, pos:0, ’ for length ’, len:0); PushRule(nmb); DoTopOfStack; PopRule; PopStack; end; end { TryRule }; begin { TryAllRulesFor } for nmb:= 1 to NRules do if Grammar[nmb].LhsField = lhs then TryRule(nmb, pos, len); end { TryAllRulesFor }; procedure Parse(inp: InputStringType); var n: integer; beginNStackElems:= 0; NRulesStacked:= 0; NDerivations:= 0; InputLength:= 0; for n:= 1 to MaxInputLength do beginInputString[n]:= inp[n]; if inp[n] <> NoSymbol then InputLength:= n; end; writeln(’Parsing ’, InputString); TryAllRulesFor(Start, 1, InputLength); writeln(NDerivations:0, ’ derivation(s) found for string ’, InputString); writeln; end { Parse }; procedure InitGrammar; { Grammar 4 } beginStart:= ’S’; StoreRule(’S’, ’LSR ’); StoreRule(’S’, ’ ’);
258 A simple general context-free parser [Ch. 12
StoreRule(’L’, ’( ’); StoreRule(’L’, ’ ’); StoreRule(’R’, ’) ’); end; procedure DoParses; beginParse(’()) ’); Parse(’((())))) ’); end; beginNRules:= 0; InitGrammar; DoParses; end.
Figure 12.1 A full context-free parser
12.2 THE PROGRAM
As is usual with well-structured Pascal programs, the program of Figure 12.1 can most
easily be read from the end backwards. The body of the program initializes the number
of rules in the grammar NRules to zero, fills the array Grammar by calling InitGram- mar and then calls DoParses. The elements of Grammar are of the type RuleType
and consist of a LhsField of the type SymbolType and a RhsField which is a
packed array of SymbolType. Packed arrays of SymbolType use NoSymbol as a filler
and are required to contain at least one filler. InitGrammar sets the Start symbol
and fills the array Grammar through successive calls of StoreRule, which also
increases NRules.
In Figure 12.1, the grammar has been built into the program for simplicity; in
practice InitGrammar would read the grammar and call StoreRule as needed. The
same technique is used for DoParses: the input strings are part of the program text for
simplicity, whereas they would normally be read in or obtained in some other fashion.
DoParses calls Parse for each input string (which again uses NoSymbol as a filler).
Parse initializes some variables of the parser, copies the input string to the global vari￾able InputString†
and then comes to its main task: calling TryAllRulesFor, to try
all rules for the Start symbol to match InputString from 1 to InputLength.
Immediately above the declaration of Parse we find the body of TryAllRules- For, which is seen to scan the the grammar for the proper left-hand side and to call
TryRule when it has found one.
To understand the workings of TryRule, we have to consider the parsing stack,
implemented as the array Stack. Its elements correspond to the nodes just on the left
of the dotted line in Figure 6.2 and together they form a list of goals to be achieved for
the completion of the parse tree presently under consideration. Each element (of the ￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾✁￾
†
If the parser is incorporated in a larger Pascal program, many of the globally defined names
can be made local to the procedure Parse. Although this technique reduces the danger of con￾fusion between names when there are many levels, we have not done so here since it is artificial
to do so for the top level.
Sec. 12.2] The program 259
type StackElemType) describes a rule, given by its number (NmbField) and how
much of its right-hand side has already been matched with the input (RhsUsedField);
furthermore it records where the matched part in InputString starts (PosField),
how much must be matched (LenField) and how much has already been matched
(InpUsedField). An element is stacked by a call PushStack(nmb, pos, len),
which records the number, position and length of the goal and sets both UsedFields to
zero. An element is removed by calling PopStack. Stack contains the active nodes in the parse tree, which is only a fraction of the
nodes of the parse tree as already recognized (Figure 6.2). The left-most derivation of
the parse tree as far as recognized can be found on the stack RuleStack, as an array of
rule numbers. When the parse stack Stack becomes empty, a parsing has been found,
recorded in RuleStack.
To prepare the way for a subsequent addition to the parser of a method to
remember known parsings, three hooks have been placed, StartNewKnownGoal, RecordKnownParsing and KnownGoalSucceeds, each of which corresponds to a
dummy procedure or function. We shall ignore them until Section 12.3.
We now return to TryRule. Ignoring for the moment the tests not IsTo- BeAvoided and not KnownGoalSucceeds, we see that a match of rule number nmb
with the input from pos over len symbols is established as a goal by calling
PushRule. The goal is then pursued by calling the local procedure DoTopOfStack.
When this call returns, TryRule is careful to restore the original situation, to allow
further parsings to be found.
DoTopOfStack is the most complicated of our system of (mutually recursive)
procedures. It starts by examining the top element on the stack and establishes what the
first symbol in the right-hand side is that has not yet been matched (tosSymb). If this is
NoSymbol, the right-hand side is exhausted and cannot match anything any more. That
is all right, however, if the input has been completely matched too, in which case we
call DoNextOnStack; otherwise the goal has failed and DoTopOfStack returns. If the
right-hand side is not exhausted, it is possible that we find a direct match of the termi￾nal in the right-hand side (if there is one) to the terminal in the input. In that case we
record the match in the top element on the stack through a call of AdvanceTOS(1) and
call DoTopOfStack recursively to continue our search.
If there is no direct match, we assume that tosSymb is a non-terminal and use a
call to the local procedure TryAllLengthsFor to try matches for all appropriate
lengths of segments of the input starting at the first unmatched position. Since we do
not visibly distinguish between a terminal and a non-terminal in our program (one of
the oversimplifications), we cannot prevent TryAllLengthsFor from being called for
a terminal symbol. Since there is no rule for that terminal, the calls of TryAllRules- For inside TryAllLengthsFor will find no match.
The local procedure TryAllLengthsFor selects increasingly longer segments of
the input, and calls TryAllRulesFor for each of them; the latter procedure is already
known.
DoNextOnStack is called when the goal on top of the stack has been attained.
The top element of Stack is removed and set aside, to be restored later to allow further
parsings to be found. If this removes the last element from the stack, a parsing has been
found and the corresponding procedure is called. If not, there is more work to do on the
present partial parsing. The successful match is recorded in the element presently on
top of the stack (which ordered the just attained match) through a call of AdvanceTOS,
260 A simple general context-free parser [Ch. 12
and DoTopOfStack is called to continue the search. All procedures take care to restore
the original situation.
The other procedures except IsToBeAvoided perform simple administrative
tasks only.
Note that besides the parse stack and the rule stack, there is also a search stack.
Whereas the former are explicit, the latter is implicit and is contained in the Pascal
recursion stack and the variables sv in incarnations of DoNextOnStack.
12.2.1 Handling left recursion
It has been explained in Section 6.3.1 that a top-down parser will loop on a left￾recursive grammar and that this problem can be avoided by making sure that no goal is
accepted when that same goal is already being pursued. This is achieved by the test
not IsToBeAvoided in TryRule. When a new goal is about to be put on the parse
stack, the function IsToBeAvoided is called, which runs down the parse stack to see
if the same goal is already active. If it is, IsToBeAvoided returns true and the goal is
not tried for the second time.
The program in Figure 12.1 was optimized for brevity and, hopefully, for clarity.
It contains many obvious inefficiencies, the removal of which will, however, make the
program larger and less perspicuous. The reader will notice that the semicolon was
used as a terminator rather than as a separator; the authors find that this leads to a
clearer style.
12.3 PARSING IN POLYNOMIAL TIME
An effective and relatively simple way to avoid exponential time requirement in a
context-free parser is to equip it with a well-formed substring table, often abbreviated
to WFST. A WFST is a table that shows all partial parse trees for each substring (seg￾ment) of the input string; it is very similar to the table generated by the CYK algorithm.
It is can be shown that the amount of work needed to construct the table cannot exceed
O(nk +1) where n is the length of the input string and k is the maximum number of
non-terminals in any right-hand side. This takes the exponential sting out of the depth￾first search.
The WFST can be constructed in advance (which is what the CYK algorithm
does), or while parsing proceeds (“on the fly”). We shall do the latter here. Also, rather
than using a WFST as defined above, we shall use a known-parsing table, which shows
the partial parse trees for each combination of a grammar rule and a substring. These
two design decisions have to do with the order in which the relevant information
becomes available in the parser of Figure 12.1.
KnownParsingType = record StartField, EndField: integer; end; KnownGoalType = recordNmbField: RuleNmbType; PosField, LenField: integer;{ the goal} StartParsingField: integer; { temporary variable } KnownParsingField: array [1..ArraySize] of KnownParsingType; NKnownParsingsField: integer; end;
Sec. 12.3] Parsing in polynomial time 261
KnownGoalList: array [1..ArraySize] of KnownGoalType; NKnownGoals: integer; KnownRuleList: array [1..ArraySize] of RuleNmbType; NKnownRules: integer; function KnownGoalNumber(nmb: RuleNmbType; pos, len: integer):integer; var n: integer; beginKnownGoalNumber:= 0; for n:= 1 to NKnownGoals do with KnownGoalList[n] do if (nmb=NmbField) and (pos=PosField) and (len=LenField) then KnownGoalNumber:= n; end { KnownGoalNumber }; procedure StartNewKnownGoal(nmb: RuleNmbType; pos, len: integer); beginNKnownGoals:= NKnownGoals+1; with KnownGoalList[NKnownGoals] do beginNmbField:= nmb; PosField:= pos; LenField:= len; StartParsingField:= NRulesStacked+1; NKnownParsingsField:= 0; end; end { StartNewKnownGoal }; procedure RecordKnownParsing; var n, i: integer; beginwith Stack[NStackElems] do beginn:= KnownGoalNumber(NmbField, PosField, LenField); with KnownGoalList[n] do beginNKnownParsingsField:= NKnownParsingsField+1; with KnownParsingField[NKnownParsingsField] do beginStartField:= NKnownRules+1; for i:= StartParsingField to NRulesStacked do beginNKnownRules:= NKnownRules+1; KnownRuleList[NKnownRules]:= RuleStack[i]; end; EndField:= NKnownRules; end; end; end; end { RecordKnownParsing }; function KnownGoalSucceeds (nmb: RuleNmbType; pos, len: integer): Boolean; var n, oldNRulesStacked, i, j: integer; beginn:= KnownGoalNumber(nmb, pos, len);
262 A simple general context-free parser [Ch. 12
if n = 0 then KnownGoalSucceeds:= false else beginoldNRulesStacked:= NRulesStacked; with KnownGoalList[n] do beginfor i:= 1 to NKnownParsingsField do with KnownParsingField[i] do beginfor j:= StartField to EndField do beginNRulesStacked:= NRulesStacked+1; RuleStack[NRulesStacked]:= KnownRuleList[j]; end; AdvanceTOS(len); DoTopOfStack; RetractTOS(len); NRulesStacked:= oldNRulesStacked; end; end; KnownGoalSucceeds:= true; end; end { KnownGoalSucceeds }; NKnownGoals:= 0; NKnownRules:= 0; { in procedure Parse }
Figure 12.2 Additions for the known-parsing table
Our parser can be equipped with the known-parsing table by incorporating the
declarations of Figure 12.2 in it. StartNewKnownGoal, RecordKnownParsing and
KnownGoalSucceeds replace the dummy declarations in Figure 12.1, the other
declarations and the initialization statement are to be inserted in the appropriate places.
The thus modified parser will no longer require exponential time (if sufficient memory
is supplied; see the constant declarations).
Returning to the mechanism of the parser, we see that when a new goal is esta￾blished in TryRule for which IsToBeAvoided yields false, a call is made to
KnownGoalSucceeds. This function accesses the known-parsing table to find out if
the goal has been pursued before. When called for the very first time, it will yield
false since there are no known parsings yet and not KnownGoalSucceeds will
succeed as in the unmodified parser. We enter the block that really tries the rule, pre￾ceded by a call to StartNewKnownGoal. This prepares the table for the recording of
the zero or more parsings that will be found for this new goal.
Goals are recorded in a three-level data structure. The first level is the array
KnownGoalList, whose elements are of type KnownGoalType. A known goal has
three fields describing the rule number, position and length of the goal and a Known- ParsingField, which is an array of elements of type KnownParsingType and
which forms the second level; it has also a field StartParsingField, which is only
meaningful while the present table entry is being constructed. Each element in Known- ParsingField describes a partial parse tree for the described goal. The partial parse
tree is represented as a list of rule numbers, just as the full parse tree. These lists are
stored one after another in the array KnownRuleList, which is the third level; the
Sec. 12.3] Parsing in polynomial time 263
beginning and end of each parsing are recorded in the StartField and EndField of
the known parsing.
StartNewKnownGoal records the goal in a new element of KnownGoalList. It
sets StartParsingField to NRulesStacked+1, since that is the position in RuleS- tack where the first rule number for the present goal will go. When the main mechanism of the parser has found a parsing for the goal (in DoNextOnStack) it calls
RecordKnownParsing, which adds the parsing found in RuleStack between
StartParsingField and NRulesStacked to the present known goal under construction. To this end, it finds the pertinent element in KnownGoalList, adds an element to the corresponding KnownParsingField and copies the parsing to the array
KnownRuleList while recording the begin and end in the element in KnownParsing- Field. There is no need to signal the end of the construction of a known goal. Note
that as long as the goal is under construction, it is also on the parse stack; this means
that IsToBeAvoided will yield true which in turn guarantees that StartNewKnown- Goal will not be called again while the known goal is being constructed.
The next time the goal is tried by TryRule, KnownGoalSucceeds will indeed
succeed: for each of the elements in the pertinent KnownParsingField, the
corresponding segment of KnownRuleList, which contains one partial parse tree, is
copied to the RuleStack as if the parsing had been performed normally. The advance
in length is noted and DoTopOfStack is called, again just as in the normal parsing process. Upon its return, the original situation is restored, including the value of NRu- lesStacked.
It will be obvious that copying a ready-made solution is much faster than reconstructing that solution. That it makes the difference between exponential and polynomial behaviour is less obvious, but true nevertheless. The unmodified parser tries
41624 rules for the built-in example, the parser with the known-parsing table only 203.
The new parser can be improved considerably in many points, with a corresponding
increase in efficiency; the O(nk +1) dependency remains, though.
`

const ASimpleGeneralContextFreeParser = () => {
  let html = MarkdownTransfer(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

export default ASimpleGeneralContextFreeParser