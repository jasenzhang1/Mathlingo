import type { WikiArticle } from "../types";

export const jointDistribution: WikiArticle = {
  conceptId: "joint-distribution",
  summary:
    "A joint distribution describes two or more random variables together, including how they relate. It carries strictly more information than the individual distributions do: the marginals can always be recovered from the joint, but the joint can never be reconstructed from the marginals alone.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "p_{X,Y}(x,y) = P(X = x,\\ Y = y), \\qquad P\\big((X,Y) \\in A\\big) = \\iint_{A} f_{X,Y}(x,y)\\,dx\\,dy",
          caption: "Joint pmf (discrete) and joint density (continuous)",
        },
        {
          kind: "prose",
          text: "The comma means *and* — it is the intersection of two events. Validity conditions mirror the univariate case: non-negative everywhere, and summing or integrating to 1 over the whole plane.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Marginals do not determine the joint",
          text: "This is the whole reason joint distributions are a separate object. Two variables can each be uniform on $\\{0,1\\}$ while being independent, perfectly correlated, or perfectly anti-correlated — three completely different joint distributions with identical marginals. Everything about the *relationship* lives in the joint and is invisible in the margins, which is why correlation cannot be computed from summary statistics of each variable separately.",
        },
      ],
    },
    {
      heading: "Marginal and conditional",
      blocks: [
        {
          kind: "formula",
          latex: "p_X(x) = \\sum_{y} p_{X,Y}(x,y), \\qquad f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\,dy",
          caption: "Marginalising — sum or integrate out the variable you do not care about",
        },
        {
          kind: "formula",
          latex: "f_{Y \\mid X}(y \\mid x) = \\frac{f_{X,Y}(x,y)}{f_X(x)}, \\qquad f_X(x) > 0",
          caption: "Conditioning — divide by the marginal to renormalise",
        },
        {
          kind: "prose",
          text: "The two operations are complementary. Marginalising *removes* a variable by averaging over everything it could have been. Conditioning *fixes* a variable at an observed value and renormalises what remains. Together they give the factorisation $f_{X,Y}(x,y) = f_{Y \\mid X}(y \\mid x)\\,f_X(x)$, which is the multiplication rule for densities.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Marginalising and conditioning give different answers",
          text: "The average height of everyone is not the average height of basketball players. Marginalising over occupation averages across all of them; conditioning on \"plays basketball\" restricts to one slice. Confusing the two is Simpson's paradox in miniature — a relationship that holds in every subgroup can reverse in the pooled margin.",
        },
      ],
    },
    {
      heading: "Independence",
      blocks: [
        {
          kind: "formula",
          latex: "X \\perp\\!\\!\\!\\perp Y \\iff f_{X,Y}(x,y) = f_X(x)\\,f_Y(y) \\ \\text{ for all } x, y",
          caption: "Independence is the joint factorising into its marginals",
        },
        {
          kind: "prose",
          text: "Independence is exactly the case where the marginals *do* determine the joint — there is no relational information left over. Equivalently, $f_{Y \\mid X}(y \\mid x) = f_Y(y)$: conditioning on $X$ changes nothing about $Y$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A quick test for dependence",
          text: "If the *support* is not a rectangle, the variables are dependent. Suppose $f_{X,Y}$ is positive on the triangle $0 < x < y < 1$. Knowing $X = 0.9$ forces $Y > 0.9$, whereas knowing $X = 0.1$ leaves $Y$ almost unconstrained — so $X$ tells you about $Y$. Factorisation would require the region where the density is positive to be a product set, and a triangle is not one. This catches many dependence questions without any integration.",
        },
        {
          kind: "example",
          title: "Worked example",
          problem:
            "$f_{X,Y}(x,y) = 4xy$ on the unit square $[0,1]^{2}$. Find the marginals and determine whether $X$ and $Y$ are independent.",
          steps: [
            "$f_X(x) = \\int_0^1 4xy\\,dy = 4x \\cdot \\tfrac{1}{2} = 2x$ on $[0,1]$.",
            "By symmetry, $f_Y(y) = 2y$.",
            "Check the product: $f_X(x)f_Y(y) = (2x)(2y) = 4xy$.",
            "That equals $f_{X,Y}(x,y)$ everywhere on the square, and the support is a rectangle. ✓",
          ],
          answer: "Marginals $2x$ and $2y$; the variables are independent.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 7.1–7.2" },
    { source: "Casella & Berger, Statistical Inference", locator: "§4.1–4.2" },
    { source: "Wasserman, All of Statistics", locator: "§2.6–2.8" },
    { source: "Mathlingo assessment bank", locator: "assessments/joint-and-conditional-structure.md" },
  ],
};
