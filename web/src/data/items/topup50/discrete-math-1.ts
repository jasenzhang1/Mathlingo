import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

const PL = "propositional-logic";
const LE = "logical-equivalences";
const DP = "direct-proof";
const PC = "proof-by-contradiction";
const MI = "mathematical-induction";
const SI = "strong-induction";
const RC = "recursion";
const FB = "fibonacci-numbers";

const propositionalLogic: Item[] = [
  // level 1
  m(PL, "t50-recall-tautology", 1, "A tautology is a compound proposition that is:", "True under every truth assignment", [
    ["True under at least one truth assignment", "That describes a satisfiable formula; a tautology must be true in every row."],
    ["False under every truth assignment", "That is a contradiction, the opposite of a tautology."],
    ["True whenever all of its variables are true", "That checks only one row of the truth table."],
  ]),
  m(PL, "t50-recall-xor", 1, "The exclusive or $p \\oplus q$ is true exactly when:", "Exactly one of $p$ and $q$ is true", [
    ["At least one of $p$ and $q$ is true", "That is the inclusive or $p \\vee q$, which is also true when both are true."],
    ["Both $p$ and $q$ are true", "That is the conjunction $p \\wedge q$."],
    ["$p$ and $q$ have the same truth value", "That is the biconditional $p \\leftrightarrow q$, the negation of exclusive or."],
  ]),
  m(PL, "t50-recall-converse", 1, "The converse of $p \\to q$ is:", "$q \\to p$", [
    ["$\\neg q \\to \\neg p$", "That is the contrapositive, which is equivalent to the original implication."],
    ["$\\neg p \\to \\neg q$", "That is the inverse, not the converse."],
    ["$\\neg p \\vee q$", "That is an equivalent rewriting of $p \\to q$ itself."],
  ]),
  // level 3
  n(PL, "t50-apply-count-true-rows-or", 3, "In the truth table of $p \\vee q \\vee r$, how many of the rows are true?", 7),
  m(PL, "t50-apply-eval-implication-chain", 3, "With $p$ false, $q$ true and $r$ false, what is the truth value of $(p \\to q) \\to r$?", "False", [
    ["True", "That evaluates $p \\to (q \\to r)$; the parentheses make $p \\to q$ (true) the antecedent, and true $\\to$ false is false."],
    ["True, because $p$ is false makes every implication containing it vacuously true", "Only the implication whose antecedent is $p$ is vacuously true; the outer implication has antecedent $p \\to q$."],
  ]),
  // level 4
  n(PL, "t50-apply-count-sat-chain", 4, "How many of the $8$ truth assignments to $p, q, r$ make $(p \\to q) \\wedge (q \\to r)$ true?", 4),
  // level 8
  n(PL, "t50-derive-count-no-adjacent-true", 8, "How many truth assignments to $p_1, \\ldots, p_6$ satisfy $\\neg(p_1 \\wedge p_2) \\wedge \\neg(p_2 \\wedge p_3) \\wedge \\cdots \\wedge \\neg(p_5 \\wedge p_6)$, i.e. make no two consecutive variables both true?", 21),
  // level 9
  s(PL, "t50-transfer-implication-incomplete", 9, "Show that the single connective $\\to$ (with no constants and no other connectives) is not functionally complete.",
    "Identifies an invariant: every formula built from variables using only $\\to$ is true when all its variables are true (proved by induction on the formula, since true $\\to$ true is true).",
    "Concludes that a function false at the all-true assignment, such as $\\neg p$, cannot be expressed, so $\\to$ alone is not complete."),
  s(PL, "t50-transfer-dnf-sat", 9, "Explain why satisfiability of a formula in disjunctive normal form can be decided in linear time, and why converting an arbitrary formula to DNF does not give an efficient SAT algorithm.",
    "A DNF is satisfiable exactly when some term contains no complementary pair of literals ($x$ and $\\neg x$), which a single scan can check.",
    "Conversion to DNF can blow up exponentially, e.g. $(x_1 \\vee y_1) \\wedge \\cdots \\wedge (x_n \\vee y_n)$ has $2^n$ terms, so the conversion itself is the expensive step."),
  // level 10
  s(PL, "t50-transfer-self-dual-incomplete", 10, "A truth function is self-dual when $f(\\neg p_1, \\ldots, \\neg p_n) = \\neg f(p_1, \\ldots, p_n)$. Let $\\text{maj}(p, q, r)$ be true when at least two inputs are true. Show that $\\lbrace \\neg, \\text{maj} \\rbrace$ is not functionally complete.",
    "Checks that $\\neg$ and $\\text{maj}$ are both self-dual and argues that substituting self-dual functions into a self-dual function gives a self-dual function, so every formula over $\\lbrace \\neg, \\text{maj} \\rbrace$ is self-dual.",
    "Exhibits a function that is not self-dual, such as $p \\wedge q$ (flipping both inputs of $\\wedge$ gives $\\neg(p \\vee q)$-type behaviour, e.g. $f(T, F) = F$ but $f(F, T) = F$ too), so it cannot be expressed."),
];

const logicalEquivalences: Item[] = [
  // level 1
  m(LE, "t50-recall-equivalent-def", 1, "Two compound propositions $\\varphi$ and $\\psi$ are logically equivalent when:", "$\\varphi \\leftrightarrow \\psi$ is a tautology, i.e. they agree in every row of the truth table", [
    ["They are both satisfiable", "Two satisfiable formulas can still differ in many rows, e.g. $p$ and $\\neg p$."],
    ["$\\varphi \\to \\psi$ is a tautology", "That is only logical implication in one direction; equivalence needs both directions."],
    ["They use the same variables and connectives", "Equivalence is about truth values, not syntax: $p \\to q$ and $\\neg p \\vee q$ use different connectives."],
  ]),
  m(LE, "t50-recall-exists-negation", 1, "What is the negation of $\\exists x\\, P(x)$?", "$\\forall x\\, \\neg P(x)$", [
    ["$\\exists x\\, \\neg P(x)$", "Negation must also flip the quantifier: “some $x$ fails” does not deny “some $x$ works”."],
    ["$\\neg \\forall x\\, P(x)$", "That is equivalent to $\\exists x\\, \\neg P(x)$, not the negation of $\\exists x\\, P(x)$."],
    ["$\\forall x\\, P(x)$", "That strengthens the statement instead of negating it."],
  ]),
  // level 3
  m(LE, "t50-apply-biconditional-dnf", 3, "Which formula is logically equivalent to $p \\leftrightarrow q$?", "$(p \\wedge q) \\vee (\\neg p \\wedge \\neg q)$", [
    ["$(p \\wedge q) \\vee (p \\wedge \\neg q)$", "This simplifies to $p$; it ignores the row where both are false."],
    ["$(p \\to q) \\vee (q \\to p)$", "This is a tautology; the biconditional needs both implications joined by $\\wedge$."],
    ["$(p \\vee q) \\wedge (\\neg p \\vee \\neg q)$", "This is exclusive or, the negation of the biconditional."],
  ]),
  n(LE, "t50-apply-converse-rows-differ", 3, "In how many of the $4$ rows of the truth table do $p \\to q$ and its converse $q \\to p$ take different truth values?", 2),
  // level 4
  n(LE, "t50-apply-bad-de-morgan-rows", 4, "A student claims $\\neg(p \\wedge q \\wedge r) \\equiv \\neg p \\wedge \\neg q \\wedge \\neg r$. In how many of the $8$ rows of the truth table do the two sides disagree?", 6),
  m(LE, "t50-apply-negate-nested", 4, "Which is the negation of $\\forall x\\, \\exists y\\, (x + y = 0 \\wedge y > 0)$?", "$\\exists x\\, \\forall y\\, (x + y \\ne 0 \\vee y \\le 0)$", [
    ["$\\exists x\\, \\forall y\\, (x + y \\ne 0 \\wedge y \\le 0)$", "De Morgan turns the negated $\\wedge$ into $\\vee$; keeping $\\wedge$ is the error."],
    ["$\\forall x\\, \\exists y\\, (x + y \\ne 0 \\vee y \\le 0)$", "The quantifiers must swap ($\\forall \\leftrightarrow \\exists$) as the negation moves inward."],
    ["$\\exists x\\, \\exists y\\, (x + y \\ne 0 \\vee y \\le 0)$", "Only the first quantifier was flipped; $\\neg \\exists y$ becomes $\\forall y$."],
  ]),
  // level 8
  n(LE, "t50-derive-count-sandwiched", 8, "Count the truth functions $\\varphi$ of $p, q, r$ (up to logical equivalence) for which both $(p \\wedge q) \\to \\varphi$ and $\\varphi \\to (p \\vee q \\vee r)$ are tautologies.", 32),
  s(LE, "t50-derive-exportation", 8, "Prove the exportation law $(p \\wedge q) \\to r \\equiv p \\to (q \\to r)$ using standard equivalences, without a truth table.",
    "Rewrites both implications as disjunctions ($a \\to b \\equiv \\neg a \\vee b$) and applies De Morgan: $(p \\wedge q) \\to r \\equiv \\neg p \\vee \\neg q \\vee r$.",
    "Regroups by associativity as $\\neg p \\vee (\\neg q \\vee r) \\equiv \\neg p \\vee (q \\to r) \\equiv p \\to (q \\to r)$."),
  // level 10
  s(LE, "t50-transfer-drinker", 10, "Show that $\\exists x\\, \\big(P(x) \\to \\forall y\\, P(y)\\big)$ is true in every nonempty domain, for every predicate $P$, and explain where nonemptiness is used.",
    "Splits into cases: if every element satisfies $P$, any $x$ works because the consequent $\\forall y\\, P(y)$ is true; otherwise choose $x$ with $\\neg P(x)$, making the implication vacuously true.",
    "Notes that the first case needs some element to exist (in an empty domain $\\exists x$ is false), so nonemptiness is essential."),
  s(LE, "t50-transfer-affine-xor", 10, "Show that no formula built from variables using only $\\leftrightarrow$ and $\\neg$ is equivalent to $p \\wedge q$.",
    "Argues that $\\leftrightarrow$ and $\\neg$ correspond to addition modulo $2$ (and adding $1$), so every such formula is equivalent to a parity (XOR) of some variables, possibly negated or constant.",
    "Shows $p \\wedge q$ is not of that form, e.g. a non-constant parity function of $p, q$ is true in exactly $2$ of the $4$ rows while $p \\wedge q$ is true in only $1$."),
];

const directProof: Item[] = [
  // level 1
  m(DP, "t50-recall-odd-def", 1, "An integer $n$ is odd when:", "$n = 2k + 1$ for some integer $k$", [
    ["$n = 2k + 1$ for some real number $k$", "Every real number has this form; $k$ must be an integer."],
    ["$n$ is prime", "$9$ is odd but not prime, and $2$ is prime but not odd."],
    ["$n = 3k + 1$ for some integer $k$", "That describes remainder $1$ on division by $3$, not oddness ($3$ is odd, $4$ has this form)."],
  ]),
  // level 2
  m(DP, "t50-apply-divides-def", 2, "For integers $a \\ne 0$ and $b$, which statement is the definition of $a \\mid b$?", "$b = ak$ for some integer $k$", [
    ["$a = bk$ for some integer $k$", "That reverses the roles: it says $b \\mid a$."],
    ["$\\frac{b}{a}$ is a real number", "That holds for every $a \\ne 0$; the quotient must be an integer."],
    ["$a < b$", "Size is irrelevant: $5 \\mid -10$ and $5 \\mid 0$."],
  ]),
  // level 3
  n(DP, "t50-apply-odd-sum-witness", 3, "A direct proof that the sum of two odd integers is even writes $m = 2a + 1$, $n = 2b + 1$ and $m + n = 2k$ for an integer $k$. Find $k$ when $a = 4$ and $b = 7$.", 12),
  m(DP, "t50-apply-key-step", 3, "In a direct proof of “if $3 \\mid n$ then $9 \\mid n^2$”, which is the correct key step?", "Write $n = 3k$, so $n^2 = 9k^2$, which is a multiple of $9$", [
    ["Write $n^2 = 9k$ and deduce $n = 3\\sqrt{k}$", "This starts from the conclusion, and $\\sqrt{k}$ need not be an integer."],
    ["Check $n = 3$, $6$ and $9$, then conclude", "Examples cannot prove a statement about every integer."],
    ["Assume $9 \\nmid n^2$ and derive a contradiction", "That is a proof by contradiction, not a direct proof."],
  ]),
  // level 4
  n(DP, "t50-apply-4k1-closure", 4, "A direct proof that the product of two integers of the form $4k + 1$ again has that form computes $(4a + 1)(4b + 1) = 4c + 1$. Find $c$ when $a = 2$ and $b = 3$.", 29),
  n(DP, "t50-apply-five-consecutive", 4, "A direct proof shows that the sum of the $5$ consecutive integers $n, n + 1, \\ldots, n + 4$ equals $5(n + c)$ for a constant $c$. Find $c$.", 2),
  m(DP, "t50-apply-x-plus-reciprocal", 4, "A direct proof that $x + \\frac{1}{x} \\ge 2$ for every real $x > 0$ rests on which observation?", "$x + \\frac{1}{x} - 2 = \\frac{(x - 1)^2}{x} \\ge 0$", [
    ["Equality holds at $x = 1$, so the inequality holds everywhere", "One case where equality holds says nothing about other values of $x$."],
    ["$x + \\frac{1}{x}$ is increasing in $x$", "It is decreasing on $(0, 1)$, and monotonicity alone would not give the bound."],
    ["Multiplying by $x$ gives $x^2 + 1 \\ge 2$", "Multiplying $2$ by $x$ gives $2x$, so the correct inequality is $x^2 + 1 \\ge 2x$."],
  ]),
  // level 9
  s(DP, "t50-transfer-three-cubes", 9, "Prove directly that $n^3 + (n + 1)^3 + (n + 2)^3$ is divisible by $9$ for every integer $n$.",
    "Expands the sum to $3n^3 + 9n^2 + 15n + 9$ and reduces the claim to $3 \\mid n^3 + 5n$.",
    "Justifies $3 \\mid n^3 + 5n$, e.g. $n^3 + 5n = (n - 1)n(n + 1) + 6n$ with a product of three consecutive integers, or by checking $n \\bmod 3$."),
  // level 10
  s(DP, "t50-transfer-sophie-germain", 10, "Prove directly that $n^4 + 4$ is composite for every integer $n \\ge 2$.",
    "Finds the factorisation $n^4 + 4 = (n^2 + 2n + 2)(n^2 - 2n + 2)$, e.g. by completing the square: $(n^2 + 2)^2 - (2n)^2$.",
    "Checks both factors exceed $1$ for $n \\ge 2$, e.g. $n^2 - 2n + 2 = (n - 1)^2 + 1 \\ge 2$, so the number is composite."),
  s(DP, "t50-transfer-reciprocal-squares", 10, "Let $a, b > 0$ with $a + b = 1$. Prove directly that $\\left(a + \\frac{1}{a}\\right)^2 + \\left(b + \\frac{1}{b}\\right)^2 \\ge \\frac{25}{2}$.",
    "Uses $x^2 + y^2 \\ge \\frac{(x + y)^2}{2}$ to bound the left side below by $\\frac{1}{2}\\left(1 + \\frac{1}{a} + \\frac{1}{b}\\right)^2$.",
    "Shows $\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{ab} \\ge 4$ because $ab \\le \\frac{1}{4}$ when $a + b = 1$, giving at least $\\frac{1}{2} \\cdot 5^2 = \\frac{25}{2}$."),
];

const proofByContradiction: Item[] = [
  // level 1
  m(PC, "t50-recall-contradiction-def", 1, "In logic, a contradiction is a statement that is:", "False under every truth assignment, such as $q \\wedge \\neg q$", [
    ["False under at least one truth assignment", "That describes any non-tautology, e.g. $p$ itself."],
    ["The converse of the theorem being proved", "A converse is a different implication, not a statement that is always false."],
    ["Any statement that contradicts the reader’s intuition", "Contradiction is a logical notion, not a psychological one."],
  ]),
  m(PC, "t50-recall-why-valid", 1, "Proof by contradiction is justified by which tautology ($F$ denotes a contradiction)?", "$(\\neg P \\to F) \\to P$", [
    ["$(P \\to F) \\to P$", "From $P \\to F$ you can only conclude $\\neg P$, not $P$."],
    ["$(P \\to Q) \\to (Q \\to P)$", "This is the converse fallacy and is not a tautology."],
    ["$(P \\vee Q) \\to P$", "This is not a tautology: it fails when $Q$ is true and $P$ false."],
  ]),
  // level 4
  m(PC, "t50-apply-negate-universal", 4, "To prove “for every integer $n$, if $n^2$ is odd then $n$ is odd” by contradiction, you assume:", "There is an integer $n$ with $n^2$ odd and $n$ even", [
    ["For every integer $n$, $n^2$ is odd and $n$ is even", "The negation of a “for every” statement is a “there exists” statement."],
    ["There is an integer $n$ with $n^2$ even and $n$ odd", "That negates the wrong parts; the negation of $p \\to q$ is $p \\wedge \\neg q$."],
    ["There is an integer $n$ with $n^2$ odd and $n$ odd", "This is consistent with the claim, so it cannot lead to a contradiction."],
  ]),
  n(PC, "t50-apply-euclid-five-primes", 4, "Euclid’s argument, given the primes $2, 3, 5, 7, 11$, forms $N = 2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 + 1$. Find $N$.", 2311),
  n(PC, "t50-apply-mod3-obstruction", 4, "To show $x^2 - 3y^2 = 2$ has no integer solutions, a proof by contradiction reduces modulo $3$. Find the remainder $r \\in \\lbrace 0, 1, 2 \\rbrace$ that $x^2$ would have to leave on division by $3$ (which is impossible, since squares leave only $0$ or $1$).", 2),
  m(PC, "t50-apply-rational-plus-irrational", 4, "To prove that $r + x$ is irrational when $r$ is rational and $x$ is irrational, assume $r + x = q$ with $q$ rational. Which step finishes the proof?", "$x = q - r$ is a difference of rationals, hence rational, contradicting that $x$ is irrational", [
    ["$q$ is rational, so $r + x$ is rational, as assumed", "This only restates the assumption; no contradiction has been reached."],
    ["$r = q - x$ is irrational, contradicting that $r$ is rational", "This uses “rational minus irrational is irrational”, which is essentially what is being proved."],
    ["Squaring gives $(r + x)^2 = q^2$, which is rational", "Squaring loses information and produces no contradiction."],
  ]),
  // level 8
  s(PC, "t50-derive-root2-plus-root3", 8, "Prove by contradiction that $\\sqrt{2} + \\sqrt{3}$ is irrational. You may use that $\\sqrt{6}$ is irrational.",
    "Assumes $\\sqrt{2} + \\sqrt{3} = r$ with $r$ rational and squares to get $5 + 2\\sqrt{6} = r^2$.",
    "Solves $\\sqrt{6} = \\frac{r^2 - 5}{2}$, which would be rational, contradicting the irrationality of $\\sqrt{6}$."),
  // level 9
  s(PC, "t50-transfer-cubic-no-rational-root", 9, "Prove by contradiction that $x^3 + x + 1 = 0$ has no rational solution.",
    "Assumes $x = \\frac{a}{b}$ in lowest terms and clears denominators to get $a^3 + ab^2 + b^3 = 0$.",
    "Uses parity: $a, b$ are not both even; if both are odd the left side is odd, and if exactly one is even it is again odd, so it cannot be $0$."),
  s(PC, "t50-transfer-diff-squares-2mod4", 9, "Prove by contradiction that no integer $n \\equiv 2 \\pmod 4$ is a difference of two squares $x^2 - y^2$.",
    "Writes $n = (x - y)(x + y)$ and notes the two factors have the same parity because they differ by $2y$.",
    "Concludes the product is odd (both odd) or a multiple of $4$ (both even), so it can never be $\\equiv 2 \\pmod 4$."),
  // level 10
  s(PC, "t50-transfer-prime-polynomial", 10, "Prove by contradiction that no non-constant polynomial $p(x)$ with integer coefficients takes a prime value at every positive integer $x$.",
    "Assumes otherwise, sets $q = p(1)$ (a prime) and shows $p(1 + kq) \\equiv p(1) \\equiv 0 \\pmod q$ for every integer $k$, so each such value is a prime multiple of $q$, i.e. equal to $q$.",
    "Derives the contradiction: a non-constant polynomial takes the value $q$ at only finitely many points, but $p(1 + kq) = q$ for infinitely many $k$."),
];

const mathematicalInduction: Item[] = [
  // level 1
  m(MI, "t50-recall-inductive-step", 1, "In ordinary induction, the inductive step proves:", "For every $k \\ge n_0$, $P(k) \\to P(k + 1)$", [
    ["$P(k + 1)$ for one particular value of $k$", "The step must work for every $k$, not a single case."],
    ["$P(k)$ for every $k$ directly", "That would be the whole theorem; the step only links each case to the next."],
    ["$P(k + 1) \\to P(k)$", "That runs backwards and would not carry truth upward from the base case."],
  ]),
  m(MI, "t50-recall-base-start", 1, "An induction proof that $P(n)$ holds for every $n \\ge 3$ needs which base case?", "$P(3)$", [
    ["$P(0)$", "The claim starts at $n = 3$; $P(0)$ may even be false."],
    ["$P(1)$", "Proving $P(1)$ does not start the chain at $3$ unless the step also covers $1$ and $2$, which the claim does not require."],
    ["$P(k)$ for an arbitrary $k$", "That is the inductive hypothesis, not the base case."],
  ]),
  // level 3
  n(MI, "t50-apply-geometric-3", 3, "Induction proves $1 + 3 + 3^2 + \\cdots + 3^n = \\frac{3^{n+1} - 1}{2}$. Use it to compute the sum for $n = 4$.", 121),
  n(MI, "t50-apply-telescoping-sum", 3, "Induction proves $\\sum_{i=1}^{n} \\frac{1}{i(i + 1)} = \\frac{n}{n + 1}$. Compute the sum for $n = 9$. Give $1$ decimal place.", 0.9),
  // level 4
  n(MI, "t50-apply-added-term", 4, "In the inductive step for $\\sum_{i=1}^{n} i^2 = \\frac{n(n + 1)(2n + 1)}{6}$, passing from $n = k$ to $n = k + 1$ adds one term. Using the formula, compute $S(7) - S(6)$, where $S(n)$ is the sum.", 49),
  m(MI, "t50-apply-divisibility-step", 4, "To prove $3 \\mid 4^n - 1$ for all $n \\ge 0$, the inductive step rewrites $4^{k+1} - 1$ as:", "$4(4^k - 1) + 3$", [
    ["$(4^k - 1) + 4$", "This equals $4^k + 3$, not $4^{k+1} - 1$."],
    ["$4 \\cdot 4^k - 4$", "This equals $4^{k+1} - 4$, which is off by $3$."],
    ["$(4^k - 1)^{k+1}$", "Powers do not combine this way; this is not equal to $4^{k+1} - 1$."],
  ]),
  // level 9
  n(MI, "t50-derive-planes-regions", 9, "Each new plane in general position is cut by the earlier planes into regions of a line arrangement, and $m$ lines in general position cut a plane into $\\frac{m^2 + m + 2}{2}$ regions. Using this induction, find the maximum number of regions into which $10$ planes divide space.", 176),
  s(MI, "t50-transfer-tromino", 9, "Prove by induction on $n$ that every $2^n \\times 2^n$ board with one square removed can be tiled by L-shaped trominoes.",
    "Base case: a $2 \\times 2$ board missing one square is itself an L-tromino.",
    "Step: split the $2^{k+1} \\times 2^{k+1}$ board into four $2^k \\times 2^k$ quadrants, place one tromino at the centre covering a corner square of each of the three quadrants without the hole, then apply the hypothesis to all four."),
  // level 10
  s(MI, "t50-transfer-product-bound", 10, "Prove by induction that $\\prod_{i=1}^{n} \\frac{2i - 1}{2i} \\le \\frac{1}{\\sqrt{3n + 1}}$ for every $n \\ge 1$.",
    "Checks the base case $\\frac{1}{2} \\le \\frac{1}{2}$ and reduces the step to $\\frac{2k + 1}{2k + 2} \\le \\frac{\\sqrt{3k + 1}}{\\sqrt{3k + 4}}$.",
    "Verifies that inequality by squaring: $(2k + 1)^2(3k + 4) \\le (2k + 2)^2(3k + 1)$, whose difference is $k \\ge 0$."),
  s(MI, "t50-transfer-strengthen-cubes", 10, "Prove that $\\sum_{k=1}^{n} \\frac{1}{k^3} < \\frac{5}{4}$ for every $n \\ge 1$. Explain why direct induction on this statement fails and how to strengthen it.",
    "Notes a constant bound cannot absorb the added term, and strengthens to $\\sum_{k=1}^{n} \\frac{1}{k^3} \\le \\frac{5}{4} - \\frac{1}{2n^2}$ for $n \\ge 2$ (base $n = 2$ is equality, $n = 1$ is checked directly). Any valid strengthening earns credit.",
    "Verifies the step: it needs $\\frac{1}{2k^2} - \\frac{1}{2(k + 1)^2} \\ge \\frac{1}{(k + 1)^3}$, i.e. $(2k + 1)(k + 1) \\ge 2k^2$, which holds."),
];

const strongInduction: Item[] = [
  // level 1
  m(SI, "t50-recall-strong-step", 1, "In a strong-induction proof of $P(n)$ for all $n \\ge 1$, the inductive step shows:", "If $P(1), \\ldots, P(k)$ all hold, then $P(k + 1)$ holds", [
    ["If $P(k)$ holds, then $P(k + 1)$ holds", "That is the ordinary inductive step; strong induction may use all earlier cases."],
    ["If $P(k + 1)$ holds, then $P(1), \\ldots, P(k)$ hold", "That runs in the wrong direction."],
    ["$P(k)$ holds for all $k$, hence $P(k + 1)$", "Assuming $P(k)$ for all $k$ is assuming the theorem."],
  ]),
  m(SI, "t50-recall-several-bases", 1, "Why do some strong-induction proofs need several base cases?", "The step for $P(k + 1)$ reaches back to earlier cases such as $P(k - 2)$, which must already be known for the smallest $k$", [
    ["Strong induction always needs exactly two base cases", "The number of base cases depends on how far back the step reaches; prime factorisation needs one."],
    ["Strong induction is a weaker method than ordinary induction", "The methods are equally powerful; base cases are about how far the step reaches."],
    ["Extra base cases make the proof more convincing", "Base cases are needed for validity, not persuasion."],
  ]),
  // level 2
  n(SI, "t50-apply-postage-3-5", 2, "With unlimited $3$-cent and $5$-cent stamps, what is the largest postage (in cents) that cannot be made?", 7),
  n(SI, "t50-apply-three-back", 2, "Define $a_1 = 1$, $a_2 = 2$, $a_3 = 3$ and $a_n = a_{n-1} + a_{n-3}$ for $n \\ge 4$. Find $a_7$.", 13),
  // level 3
  n(SI, "t50-apply-binary-100", 3, "Strong induction shows every positive integer is a sum of distinct powers of $2$. How many powers of $2$ appear in the representation of $100$?", 3),
  // level 4
  n(SI, "t50-apply-factor-360", 4, "In the strong-induction proof that every $n \\ge 2$ is a product of primes, $360$ is split repeatedly into smaller factors. How many primes, counted with multiplicity, appear in the final factorisation of $360$?", 6),
  m(SI, "t50-apply-tribonacci-bases", 4, "A strong-induction proof that $a_n \\le 2^n$ uses $a_n = a_{n-1} + a_{n-2} + a_{n-3}$ for $n \\ge 3$. Which base cases must be checked?", "$a_0$, $a_1$ and $a_2$", [
    ["$a_0$ only", "The step at $n = 3$ uses $a_2$, $a_1$ and $a_0$, so all three must already be known."],
    ["$a_0$ and $a_1$", "The recurrence reaches back three terms, so $a_2$ cannot be derived from the step."],
    ["$a_3$ only", "$a_3$ is covered by the step; the cases below it are the ones the step cannot reach."],
  ]),
  n(SI, "t50-apply-take-1-2-3", 4, "Players alternately remove $1$, $2$ or $3$ stones from a pile, and whoever takes the last stone wins. Strong induction shows the player to move loses exactly when the pile size is a multiple of $4$. How many pile sizes from $1$ to $50$ are losing for the player to move?", 12),
  // level 8
  s(SI, "t50-derive-balanced-ternary", 8, "Prove by strong induction that every positive integer $n$ can be written as $\\sum_i \\epsilon_i 3^i$ with each $\\epsilon_i \\in \\lbrace -1, 0, 1 \\rbrace$.",
    "Splits on $n \\bmod 3$: $n = 3m$, $n = 3m + 1$ or $n = 3m - 1$ with $1 \\le m < n$ (or $m = 0$ for $n = 1, 2$ handled as base cases), and applies the hypothesis to $m$.",
    "Builds the representation of $n$ by shifting that of $m$ up one power of $3$ and setting $\\epsilon_0 = 0$, $1$ or $-1$; notes the hypothesis is used at $m \\approx n/3$, not $n - 1$, which is why strong induction is needed."),
  // level 10
  s(SI, "t50-transfer-egyptian-fractions", 10, "Prove by strong induction on the numerator that every rational number $\\frac{a}{b}$ with $0 < \\frac{a}{b} < 1$ is a sum of distinct unit fractions $\\frac{1}{n}$.",
    "Uses the greedy step: take the least $n$ with $\\frac{1}{n} \\le \\frac{a}{b}$; then $\\frac{a}{b} - \\frac{1}{n} = \\frac{an - b}{bn}$ and minimality of $n$ gives $an - b < a$, so the hypothesis applies to the smaller numerator.",
    "Argues distinctness: the remainder is less than $\\frac{1}{n}$ (indeed less than $\\frac{1}{n(n - 1)}$), so every later denominator exceeds $n$; base case numerator $1$ is already a unit fraction."),
];

const recursion: Item[] = [
  // level 1
  m(RC, "t50-recall-closed-form", 1, "A closed form for a recursively defined sequence is:", "A formula giving $a_n$ directly in terms of $n$, without earlier terms", [
    ["The base case of the recurrence", "The base case is only the starting value."],
    ["The recurrence rewritten with the terms in reverse order", "Rearranging the recurrence still refers to earlier terms."],
    ["Any formula that involves $a_{n-1}$", "A formula using $a_{n-1}$ is still a recurrence."],
  ]),
  m(RC, "t50-recall-order", 1, "What is the order of the recurrence $a_n = 3a_{n-1} - a_{n-4}$?", "$4$", [
    ["$1$", "The order is how far back the recurrence reaches, here to $a_{n-4}$."],
    ["$2$", "Counting the terms on the right side does not give the order."],
    ["$3$", "The coefficient $3$ is unrelated to the order."],
  ]),
  // level 3
  n(RC, "t50-apply-iterate-3a-minus-1", 3, "$a_0 = 1$ and $a_n = 3a_{n-1} - 1$. Find $a_4$.", 41),
  // level 4
  n(RC, "t50-apply-solve-roots-3-neg2", 4, "Solve $a_n = a_{n-1} + 6a_{n-2}$ with $a_0 = 0$ and $a_1 = 5$, and give $a_4$.", 65),
  n(RC, "t50-apply-nonhomog-const", 4, "The recurrence $a_n = 2a_{n-1} + 3$ with $a_0 = 1$ has closed form $a_n = c \\cdot 2^n - 3$. Find $c$.", 4),
  m(RC, "t50-apply-double-root", 4, "The characteristic equation of $a_n = 6a_{n-1} - 9a_{n-2}$ has a double root. What is the general solution?", "$a_n = (A + Bn)3^n$", [
    ["$a_n = A \\cdot 3^n + B \\cdot 3^n$", "This collapses to a single constant times $3^n$ and cannot fit two initial values; a double root needs the extra factor $n$."],
    ["$a_n = A \\cdot 3^n + B \\cdot (-3)^n$", "The characteristic polynomial is $(x - 3)^2$, so $-3$ is not a root."],
    ["$a_n = A \\cdot 6^n + B \\cdot 9^n$", "The coefficients of the recurrence are not its roots."],
  ]),
  // level 9
  n(RC, "t50-derive-domino-square-tiling", 9, "How many ways are there to tile a $2 \\times 8$ board with $1 \\times 2$ dominoes (either orientation) and $2 \\times 2$ squares?", 171),
  n(RC, "t50-derive-ternary-no-00", 9, "How many strings of length $6$ over the digits $\\lbrace 0, 1, 2 \\rbrace$ contain no two consecutive $0$s?", 448),
  s(RC, "t50-transfer-sqrt-recurrence", 9, "Solve $T(n) = 2T(\\sqrt{n}) + \\log_2 n$ asymptotically, explaining your substitution.",
    "Substitutes $n = 2^m$ and $S(m) = T(2^m)$ to get $S(m) = 2S(m/2) + m$.",
    "Recognises the merge-sort recurrence, so $S(m) = \\Theta(m \\log m)$ and $T(n) = \\Theta(\\log n \\log \\log n)$."),
  // level 10
  s(RC, "t50-transfer-catalan-gf", 10, "The Catalan numbers satisfy $C_0 = 1$ and $C_{n+1} = \\sum_{i=0}^{n} C_i C_{n-i}$. Explain why the number of full parenthesisations of a product of $n + 1$ factors obeys this recurrence, and use a generating function to derive $C_n = \\frac{1}{n + 1}\\binom{2n}{n}$.",
    "Splits on the last (outermost) multiplication: the left part has $i + 1$ factors and the right $n - i + 1$, giving the convolution recurrence.",
    "Shows $C(x) = 1 + xC(x)^2$, solves $C(x) = \\frac{1 - \\sqrt{1 - 4x}}{2x}$ (choosing the sign that is finite at $0$), and extracts coefficients with the generalised binomial theorem."),
];

const fibonacci: Item[] = [
  // level 1
  m(FB, "t50-recall-golden-equation", 1, "The golden ratio $\\varphi$ is the positive root of which equation?", "$x^2 = x + 1$", [
    ["$x^2 = x - 1$", "This has no real roots; the Fibonacci recurrence gives $x^2 = x + 1$."],
    ["$x^2 + x = 1$", "Its positive root is $\\frac{1}{\\varphi} \\approx 0.618$, not $\\varphi$."],
    ["$x^2 = 2x + 1$", "Its positive root $1 + \\sqrt{2}$ is the silver ratio, from $a_n = 2a_{n-1} + a_{n-2}$."],
  ]),
  m(FB, "t50-recall-binet-psi", 1, "In Binet’s formula $F_n = \\frac{\\varphi^n - \\psi^n}{\\sqrt{5}}$, what is $\\psi$?", "$\\frac{1 - \\sqrt{5}}{2}$", [
    ["$\\frac{1}{\\varphi}$", "$\\frac{1}{\\varphi} = \\frac{\\sqrt{5} - 1}{2}$ is positive; $\\psi = -\\frac{1}{\\varphi}$."],
    ["$\\frac{-1 - \\sqrt{5}}{2}$", "That is $-\\varphi$; the other root of $x^2 = x + 1$ is $\\frac{1 - \\sqrt{5}}{2}$."],
    ["$\\sqrt{5} - 1$", "This is twice $\\frac{1}{\\varphi}$, not a root of $x^2 = x + 1$."],
  ]),
  // level 3
  n(FB, "t50-apply-sum-of-squares", 3, "Using $F_1^2 + F_2^2 + \\cdots + F_n^2 = F_n F_{n+1}$ with $F_1 = F_2 = 1$, compute $F_1^2 + F_2^2 + \\cdots + F_7^2$.", 273),
  n(FB, "t50-apply-odd-index-sum", 3, "Using $F_1 + F_3 + \\cdots + F_{2n-1} = F_{2n}$ with $F_1 = F_2 = 1$, compute $F_1 + F_3 + F_5 + F_7 + F_9$.", 55),
  // level 4
  n(FB, "t50-apply-negative-index", 4, "Extend the Fibonacci numbers backwards with $F_{n-1} = F_{n+1} - F_n$, starting from $F_0 = 0$ and $F_1 = 1$. Find $F_{-7}$.", 13),
  n(FB, "t50-apply-mod-4", 4, "With $F_0 = 0$ and $F_1 = 1$, what is the remainder when $F_{100}$ is divided by $4$? (The remainders modulo $4$ repeat with period $6$.)", 3),
  m(FB, "t50-apply-divisible-by-5", 4, "With $F_0 = 0$, $F_1 = 1$, which Fibonacci numbers are divisible by $F_5 = 5$?", "Exactly those $F_n$ with $5 \\mid n$", [
    ["Exactly those $F_n$ with $n$ odd", "$F_1 = 1$ and $F_3 = 2$ are not multiples of $5$."],
    ["$F_1, F_6, F_{11}, \\ldots$ (every fifth term starting from $F_1$)", "This is off by one: $F_6 = 8$ is not a multiple of $5$, while $F_{10} = 55$ is."],
    ["Only $F_5$, since Fibonacci numbers are coprime", "Only consecutive Fibonacci numbers are guaranteed coprime; $F_m \\mid F_{km}$."],
  ]),
  // level 9
  n(FB, "t50-derive-odd-compositions", 9, "In how many ways can $12$ be written as an ordered sum of odd positive integers (for example, $1 + 3$ and $3 + 1$ are different ways of writing $4$)?", 144),
  s(FB, "t50-transfer-matrix-addition", 9, "Given $\\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\end{bmatrix}^n = \\begin{bmatrix} F_{n+1} & F_n \\\\ F_n & F_{n-1} \\end{bmatrix}$, derive the addition formula $F_{m+n} = F_m F_{n+1} + F_{m-1} F_n$.",
    "Writes $\\mathbf{M}^{m+n} = \\mathbf{M}^m \\mathbf{M}^n$ with both factors in Fibonacci form.",
    "Multiplies and compares one entry, e.g. the $(2, 1)$ entry: $F_{m+n} = F_m F_{n+1} + F_{m-1} F_n$."),
  // level 10
  s(FB, "t50-transfer-last-digit-period", 10, "Explain why the last digits of the Fibonacci numbers must eventually repeat, why the repetition starts right from $F_0$, and why the period is $60$ given that the periods modulo $2$ and modulo $5$ are $3$ and $20$.",
    "Uses pigeonhole on the at most $100$ pairs $(F_n \\bmod 10, F_{n+1} \\bmod 10)$; since each pair determines the next and also the previous ($F_{n-1} = F_{n+1} - F_n$), the sequence is purely periodic from the start.",
    "Combines the moduli with the Chinese remainder theorem: the sequence repeats modulo $10$ exactly when it repeats modulo $2$ and modulo $5$, so the period is $\\text{lcm}(3, 20) = 60$."),
];

export const t50DiscreteMath1Items: Item[] = [
  ...propositionalLogic,
  ...logicalEquivalences,
  ...directProof,
  ...proofByContradiction,
  ...mathematicalInduction,
  ...strongInduction,
  ...recursion,
  ...fibonacci,
];
