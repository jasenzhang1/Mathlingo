import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 7: partial derivatives, the gradient and directional
 * derivatives, extrema in several variables, and double and triple integrals.
 * Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// partial-derivatives
// ---------------------------------------------------------------------------
const PD = "partial-derivatives";
const partialDerivatives: Item[] = [
  // level 1
  mcq(m(PD, "recall-definition", "recall", 1, 15, "The partial derivative $\\frac{\\partial f}{\\partial x}$ of $f(x, y)$ is found by:"),
    "Differentiating with respect to $x$ while holding $y$ constant",
    [
      ["Differentiating with respect to both variables at once", "partial-both", "Each partial varies one variable only."],
      ["Setting $y = 0$ and differentiating", "partial-zero", "$y$ is held at its current value, not $0$."],
      ["Differentiating with respect to $y$", "partial-swap", "That's $\\frac{\\partial f}{\\partial y}$."],
    ]),
  mcq(m(PD, "recall-clairaut", "recall", 1, 15, "Clairaut's theorem says $f_{xy} = f_{yx}$ when:"),
    "The mixed partial derivatives are continuous",
    [
      ["Always", "clairaut-always", "There are functions where they differ at a point."],
      ["$f$ is a polynomial only", "clairaut-polynomial", "Continuity of the mixed partials is enough."],
      ["$f_x = f_y$", "clairaut-first", "That's unrelated."],
    ]),
  mcq(m(PD, "recall-tangent-plane", "recall", 1, 15, "The tangent plane to $z = f(x, y)$ at $(a, b)$ is:"),
    "$z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$",
    [
      ["$z = f_x(a, b)x + f_y(a, b)y$", "plane-origin", "It must pass through $(a, b, f(a, b))$."],
      ["$z = f(a, b) + f_x(a, b)(x - a)$", "plane-missing-y", "The $y$-direction contributes too."],
      ["$z = f(a, b)$", "plane-horizontal", "Only if both partials are zero."],
    ]),
  mcq(m(PD, "recall-notation", "recall", 1, 15, "The notation $f_{xy}$ means:"),
    "Differentiate with respect to $x$, then with respect to $y$",
    [
      ["Differentiate with respect to $y$, then $x$", "notation-reversed", "Subscripts are applied left to right."],
      ["Multiply $f_x$ by $f_y$", "notation-product", "It's a second derivative."],
      ["Differentiate with respect to the product $xy$", "notation-xy", "It's two successive partials."],
    ]),
  // level 2
  num(m(PD, "apply-fx", "apply", 2, 20, "For $f(x, y) = x^{2}y + 3y$, find $f_x(2, 1)$."), 4),
  num(m(PD, "apply-fy", "apply", 2, 20, "For $f(x, y) = x^{2}y + 3y$, find $f_y(2, 1)$."), 7),
  num(m(PD, "apply-exp", "apply", 2, 20, "For $f(x, y) = e^{xy}$, find $f_x(0, 5)$."), 5),
  mcq(m(PD, "apply-mixed-zero", "apply", 2, 20, "For $f(x, y) = x^{3} + y^{3}$, $f_{xy} =$"),
    "$0$",
    [
      ["$9x^{2}y^{2}$", "mixedzero-product", "The variables are separated, so no mixed term survives."],
      ["$3x^{2} + 3y^{2}$", "mixedzero-gradient", "Those are the first partials added."],
      ["$6x$", "mixedzero-fxx", "That's $f_{xx}$."],
    ]),
  // level 3
  num(m(PD, "apply-sin-product", "apply", 3, 25, "For $f(x, y) = \\sin(xy)$, find $f_x(\\pi, 1)$."), -1),
  num(m(PD, "apply-mixed", "apply", 3, 25, "For $f(x, y) = x^{2}y^{3}$, find $f_{xy}(1, 1)$."), 6),
  num(m(PD, "apply-log", "apply", 3, 25, "For $f(x, y) = \\ln(x^{2} + y^{2})$, find $f_x(1, 0)$."), 2),
  mcq(m(PD, "apply-three-variables", "apply", 3, 25, "For $f(x, y, z) = xyz$, $f_z =$"),
    "$xy$",
    [
      ["$xyz$", "threevar-same", "Differentiating $z$ removes it."],
      ["$yz + xz + xy$", "threevar-sum", "That's the sum of all three partials."],
      ["$1$", "threevar-one", "$x$ and $y$ remain as constant factors."],
    ]),
  // level 4
  num(m(PD, "apply-tangent-plane", "apply", 4, 30, "The tangent plane to $z = x^{2} + y^{2}$ at $(1, 2)$ is $z = c + 2x + 4y$. Find $c$."), -5),
  num(m(PD, "apply-linear-approx", "apply", 4, 30, "Use the linearisation of $f(x, y) = x^{2}y$ at $(1, 2)$ to estimate $f(1.1, 1.95)$."), 2.35),
  num(m(PD, "apply-chain", "apply", 4, 30, "$z = x^{2} + y^{2}$ with $x = \\cos t$ and $y = 2\\sin t$. Find $\\frac{dz}{dt}$ at $t = \\frac{\\pi}{4}$."), 3),
  mcq(m(PD, "recall-chain", "recall", 4, 30, "For $z = f(x(t), y(t))$, $\\frac{dz}{dt} =$"),
    "$f_x\\,\\frac{dx}{dt} + f_y\\,\\frac{dy}{dt}$",
    [
      ["$f_x\\,\\frac{dx}{dt} \\cdot f_y\\,\\frac{dy}{dt}$", "mvchain-product", "The contributions add."],
      ["$f_x + f_y$", "mvchain-no-inner", "Each partial is multiplied by its variable's rate."],
      ["$\\frac{dx}{dt} + \\frac{dy}{dt}$", "mvchain-no-outer", "The sensitivity of $f$ to each variable matters."],
    ]),
  // level 5
  short(m(PD, "explain-geometry", "explain", 5, 90, "Describe geometrically what $f_x(a, b)$ measures for the surface $z = f(x, y)$."),
    [
      ["slice", "Slice the surface with the plane $y = b$, giving the curve $z = f(x, b)$", 2, true],
      ["slope", "$f_x(a, b)$ is the slope of that curve at $x = a$ — the rate of change of height moving in the $x$-direction", 2, true],
    ]),
  mcq(m(PD, "apply-partials-not-continuity", "apply", 5, 40, "If $f_x(0, 0)$ and $f_y(0, 0)$ both exist, then $f$:"),
    "Need not even be continuous at $(0, 0)$",
    [
      ["Is differentiable at $(0, 0)$", "partialscont-diff", "$\\frac{xy}{x^{2} + y^{2}}$ has both partials at $0$ but jumps along $y = x$."],
      ["Is continuous at $(0, 0)$", "partialscont-cont", "Partials only look along the axes."],
      ["Has a tangent plane at $(0, 0)$", "partialscont-plane", "That needs differentiability."],
    ]),
  mcq(m(PD, "apply-implicit", "apply", 5, 40, "If $F(x, y) = 0$ defines $y$ as a differentiable function of $x$ (with $F_y \\ne 0$), then $\\frac{dy}{dx} =$"),
    "$-\\frac{F_x}{F_y}$",
    [
      ["$\\frac{F_x}{F_y}$", "implicitmv-sign", "$F_x + F_y y' = 0$ gives a minus sign."],
      ["$-\\frac{F_y}{F_x}$", "implicitmv-inverted", "Solve for $y'$, which multiplies $F_y$."],
      ["$F_x F_y$", "implicitmv-product", "It's a ratio."],
    ]),
  num(m(PD, "apply-implicit-value", "apply", 5, 40, "Use $\\frac{dy}{dx} = -\\frac{F_x}{F_y}$ to find the slope of $x^{3} + y^{3} = 9$ at $(1, 2)$."), -0.25),
  // level 6
  short(m(PD, "explain-discontinuous", "explain", 6, 120, "Show that $f(x, y) = \\frac{xy}{x^{2} + y^{2}}$ (with $f(0, 0) = 0$) has both partial derivatives at the origin but is not continuous there."),
    [
      ["partials", "$f(x, 0) = 0$ and $f(0, y) = 0$, so $f_x(0, 0) = f_y(0, 0) = 0$", 2, true],
      ["discontinuous", "Along $y = x$, $f = \\frac{1}{2}$, which doesn't tend to $f(0, 0) = 0$", 2, true],
    ]),
  num(m(PD, "apply-laplacian", "apply", 6, 45, "For $u(x, y) = x^{2}y + y^{3}$, find $u_{xx} + u_{yy}$ at $(1, 2)$."), 16),
  num(m(PD, "apply-chain-three", "apply", 6, 45, "$w = xy + z$ with $x = t$, $y = t^{2}$, $z = t^{3}$. Find $\\frac{dw}{dt}$ at $t = 1$."), 6),
  mcq(m(PD, "apply-total-differential", "apply", 6, 45, "The total differential of $z = x^{2}y$ is:"),
    "$dz = 2xy\\,dx + x^{2}\\,dy$",
    [
      ["$dz = 2x\\,dx + dy$", "totaldiff-separate", "Each partial keeps the other variable as a factor."],
      ["$dz = 2xy\\,dx \\cdot x^{2}\\,dy$", "totaldiff-product", "The contributions add."],
      ["$dz = 2xy\\,dy + x^{2}\\,dx$", "totaldiff-swapped", "$f_x$ pairs with $dx$."],
    ]),
  // level 7
  short(m(PD, "explain-sum-over-paths", "explain", 7, 120, "Explain the multivariable chain rule as a “sum over paths” from the input to the output, with an example."),
    [
      ["paths", "Each path from $t$ to $z$ through an intermediate variable contributes the product of the derivatives along it", 2, true],
      ["example", "Example: $\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial z}{\\partial y}\\frac{dy}{dt}$ for $z = f(x(t), y(t))$, or a three-variable version", 2, true],
    ]),
  num(m(PD, "apply-volume-error", "apply", 7, 60, "A cylinder has $r = 3 \\pm 0.01$ and $h = 5 \\pm 0.02$. Use differentials to estimate the maximum error in $V = \\pi r^{2}h$. Give $3$ decimal places."), 1.508),
  num(m(PD, "apply-polar-chain", "apply", 7, 60, "$z = x^{2} + y^{2}$ with $x = r\\cos\\theta$, $y = r\\sin\\theta$. Find $\\frac{\\partial z}{\\partial r}$ at $r = 2$."), 4),
  mcq(m(PD, "apply-harmonic", "apply", 7, 60, "Which function satisfies Laplace's equation $u_{xx} + u_{yy} = 0$?"),
    "$e^{x}\\sin y$",
    [
      ["$x^{2} + y^{2}$", "harmonic-bowl", "$u_{xx} + u_{yy} = 4$."],
      ["$xy^{2}$", "harmonic-mixed", "$u_{xx} + u_{yy} = 2x$."],
      ["$e^{x + y}$", "harmonic-exp", "$u_{xx} + u_{yy} = 2e^{x + y}$."],
    ]),
  // level 8
  short(m(PD, "explain-euler-homogeneous", "explain", 8, 150, "Prove Euler's theorem: if $f(tx, ty) = t^{n}f(x, y)$ for all $t > 0$, then $xf_x + yf_y = nf$."),
    [
      ["differentiate", "Differentiates both sides with respect to $t$: $xf_x(tx, ty) + yf_y(tx, ty) = nt^{n - 1}f(x, y)$", 3, true],
      ["set", "Sets $t = 1$", 1, true],
    ]),
  num(m(PD, "apply-euler-value", "apply", 8, 75, "For $f(x, y) = x^{3} + 2xy^{2}$, find $xf_x + yf_y$ at $(1, 1)$."), 9),
  num(m(PD, "apply-implicit-surface", "apply", 8, 75, "On the sphere $x^{2} + y^{2} + z^{2} = 9$, find $\\frac{\\partial z}{\\partial x}$ at $(1, 2, 2)$."), -0.5),
  mcq(m(PD, "recall-clairaut-fails", "recall", 8, 75, "Mixed partials $f_{xy}$ and $f_{yx}$ can differ at a point when:"),
    "They aren't continuous there, as for $f = \\frac{xy(x^{2} - y^{2})}{x^{2} + y^{2}}$ at the origin",
    [
      ["$f$ is not a polynomial", "clairautfails-polynomial", "$e^{xy}$ has equal mixed partials."],
      ["$f$ has three or more variables", "clairautfails-dimension", "Clairaut holds in any dimension."],
      ["Never", "clairautfails-never", "The standard counterexample gives $-1$ and $1$."],
    ]),
  // level 9
  short(m(PD, "transfer-wave", "transfer", 9, 180, "Show that $u(x, t) = \\sin(x - ct)$ satisfies the wave equation $u_{tt} = c^{2}u_{xx}$."),
    [
      ["compute", "$u_{xx} = -\\sin(x - ct)$ and $u_{tt} = -c^{2}\\sin(x - ct)$", 3, true],
      ["conclude", "So $u_{tt} = c^{2}u_{xx}$", 1, true],
    ]),
  short(m(PD, "transfer-heat", "transfer", 9, 180, "Show that $u(x, t) = t^{-1/2}e^{-x^{2}/(4t)}$ satisfies the heat equation $u_t = u_{xx}$ for $t > 0$."),
    [
      ["ut", "$u_t = u\\left(-\\frac{1}{2t} + \\frac{x^{2}}{4t^{2}}\\right)$", 2, true],
      ["uxx", "$u_x = -\\frac{x}{2t}u$ and $u_{xx} = u\\left(\\frac{x^{2}}{4t^{2}} - \\frac{1}{2t}\\right)$, which matches", 2, true],
    ]),
  num(m(PD, "transfer-unequal-mixed", "transfer", 9, 90, "Let $f(x, y) = \\frac{xy(x^{2} - y^{2})}{x^{2} + y^{2}}$ with $f(0, 0) = 0$. Find $f_{xy}(0, 0) = \\frac{\\partial}{\\partial y}f_x$ at the origin."), -1),
  mcq(m(PD, "recall-differentiable", "recall", 9, 90, "$f(x, y)$ is differentiable at $\\mathbf{p}$ when:"),
    "The error of the tangent-plane approximation is small compared with the distance $\\|\\mathbf{h}\\|$ as $\\mathbf{h} \\to \\mathbf{0}$",
    [
      ["Both partial derivatives exist at $\\mathbf{p}$", "differentiable-partials", "That's weaker: partials can exist at a discontinuity."],
      ["$f$ is continuous at $\\mathbf{p}$", "differentiable-continuous", "$\\sqrt{x^{2} + y^{2}}$ is continuous but not differentiable at $\\mathbf{0}$."],
      ["$f_{xy} = f_{yx}$ at $\\mathbf{p}$", "differentiable-clairaut", "That's about second derivatives."],
    ]),
  // level 10
  short(m(PD, "transfer-continuous-partials", "transfer", 10, 180, "Sketch why continuous partial derivatives near a point imply that $f(x, y)$ is differentiable there."),
    [
      ["split", "Writes $f(a + h, b + k) - f(a, b) = [f(a + h, b + k) - f(a, b + k)] + [f(a, b + k) - f(a, b)]$", 2, true],
      ["mvt", "Applies the one-variable MVT to each bracket and uses continuity of $f_x$ and $f_y$ to show the error is $o\\left(\\sqrt{h^{2} + k^{2}}\\right)$", 2, true],
    ]),
  short(m(PD, "transfer-jacobian", "transfer", 10, 180, "Compute the Jacobian matrix and its determinant for $(u, v) = (x^{2} - y^{2}, 2xy)$, and interpret the determinant."),
    [
      ["matrix", "$\\begin{bmatrix} 2x & -2y \\\\ 2y & 2x \\end{bmatrix}$", 2, true],
      ["determinant", "Determinant $4(x^{2} + y^{2})$: the local factor by which the map scales areas", 2, true],
    ]),
  num(m(PD, "transfer-jacobian-value", "transfer", 10, 120, "For $(u, v) = (x^{2} - y^{2}, 2xy)$, find the Jacobian determinant $\\frac{\\partial(u, v)}{\\partial(x, y)}$ at $(1, 2)$."), 20),
  mcq(m(PD, "transfer-chain-matrix", "transfer", 10, 120, "For differentiable maps $\\mathbf{g}: \\mathbb{R}^{n} \\to \\mathbb{R}^{m}$ and $\\mathbf{f}: \\mathbb{R}^{m} \\to \\mathbb{R}^{k}$, the chain rule says the Jacobian of $\\mathbf{f} \\circ \\mathbf{g}$ is:"),
    "$\\mathbf{J}_{\\mathbf{f}}(\\mathbf{g}(\\mathbf{x}))\\,\\mathbf{J}_{\\mathbf{g}}(\\mathbf{x})$",
    [
      ["$\\mathbf{J}_{\\mathbf{g}}(\\mathbf{x})\\,\\mathbf{J}_{\\mathbf{f}}(\\mathbf{g}(\\mathbf{x}))$", "jacobian-order", "The sizes are $k \\times m$ times $m \\times n$; the reversed product doesn't fit."],
      ["$\\mathbf{J}_{\\mathbf{f}}(\\mathbf{x})\\,\\mathbf{J}_{\\mathbf{g}}(\\mathbf{x})$", "jacobian-point", "$\\mathbf{J}_{\\mathbf{f}}$ is evaluated at $\\mathbf{g}(\\mathbf{x})$."],
      ["$\\mathbf{J}_{\\mathbf{f}} + \\mathbf{J}_{\\mathbf{g}}$", "jacobian-sum", "Derivatives of compositions multiply."],
    ]),
];

// ---------------------------------------------------------------------------
// gradient-and-directional-derivatives
// ---------------------------------------------------------------------------
const GD = "gradient-and-directional-derivatives";
const gradient: Item[] = [
  // level 1
  mcq(m(GD, "recall-gradient", "recall", 1, 15, "For $f(x, y)$, the gradient $\\nabla f$ is:"),
    "$\\left[\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right]$",
    [
      ["$\\frac{\\partial f}{\\partial x} + \\frac{\\partial f}{\\partial y}$", "grad-sum", "The gradient is a vector, not a sum."],
      ["$\\left[\\frac{\\partial^{2} f}{\\partial x^{2}}, \\frac{\\partial^{2} f}{\\partial y^{2}}\\right]$", "grad-second", "It uses first derivatives."],
      ["$\\frac{\\partial^{2} f}{\\partial x\\,\\partial y}$", "grad-mixed", "That's a mixed second partial."],
    ]),
  mcq(m(GD, "recall-directional", "recall", 1, 15, "The directional derivative of $f$ in the direction of a unit vector $\\mathbf{u}$ is:"),
    "$D_{\\mathbf{u}}f = \\nabla f \\cdot \\mathbf{u}$",
    [
      ["$D_{\\mathbf{u}}f = \\|\\nabla f\\| + \\|\\mathbf{u}\\|$", "directional-sum", "It's a dot product."],
      ["$D_{\\mathbf{u}}f = \\nabla f \\times \\mathbf{u}$", "directional-cross", "The result is a scalar rate."],
      ["$D_{\\mathbf{u}}f = f(\\mathbf{u})$", "directional-value", "That's a value of $f$."],
    ]),
  mcq(m(GD, "recall-steepest", "recall", 1, 15, "The gradient $\\nabla f$ points in the direction of:"),
    "Steepest increase of $f$",
    [
      ["Steepest decrease of $f$", "steepest-descent", "That's $-\\nabla f$."],
      ["A level curve", "steepest-level", "It's perpendicular to level curves."],
      ["The origin", "steepest-origin", "It depends on $f$, not the origin."],
    ]),
  mcq(m(GD, "recall-level-curves", "recall", 1, 15, "At a point where $\\nabla f \\ne \\mathbf{0}$, the gradient is:"),
    "Perpendicular to the level curve through that point",
    [
      ["Tangent to the level curve", "level-tangent", "Moving along a level curve doesn't change $f$, so that direction has zero rate."],
      ["Parallel to the $x$-axis", "level-axis", "Its direction depends on both partials."],
      ["Always of length $1$", "level-unit", "Its length is the maximum rate of change."],
    ]),
  // level 2
  num(m(GD, "apply-gradient-component", "apply", 2, 20, "For $f(x, y) = x^{2} + 3y^{2}$, find the second component of $\\nabla f$ at $(1, 2)$."), 12),
  num(m(GD, "apply-gradient-length", "apply", 2, 20, "For $f(x, y) = 3x + 4y$, find $\\|\\nabla f\\|$."), 5),
  num(m(GD, "apply-axis-direction", "apply", 2, 20, "For $f(x, y) = x^{2} + y^{2}$, find $D_{\\mathbf{u}}f(1, 1)$ with $\\mathbf{u} = [1, 0]$."), 2),
  mcq(m(GD, "recall-max-rate", "recall", 2, 20, "The maximum rate of increase of $f$ at a point is:"),
    "$\\|\\nabla f\\|$",
    [
      ["$\\frac{\\partial f}{\\partial x}$", "maxrate-x", "That's the rate in the $x$-direction only."],
      ["$1$", "maxrate-one", "It depends on $f$."],
      ["$\\nabla f \\cdot \\nabla f$", "maxrate-squared", "That's $\\|\\nabla f\\|^{2}$."],
    ]),
  // level 3
  num(m(GD, "apply-directional", "apply", 3, 25, "For $f(x, y) = x^{2}y + y^{3}$, find the rate of change at $(1, 2)$ in the direction of $\\mathbf{v} = [3, 4]$."), 12.8),
  num(m(GD, "apply-diagonal", "apply", 3, 25, "For $f(x, y) = xy$, find $D_{\\mathbf{u}}f(2, 3)$ with $\\mathbf{u} = \\left[\\frac{1}{\\sqrt{2}}, \\frac{1}{\\sqrt{2}}\\right]$. Give $3$ decimal places."), 3.536),
  num(m(GD, "apply-max-rate", "apply", 3, 25, "For $f(x, y) = x^{2} + y^{2}$, find the maximum rate of increase at $(3, 4)$."), 10),
  mcq(m(GD, "apply-zero-rate", "apply", 3, 25, "$D_{\\mathbf{u}}f = 0$ when $\\mathbf{u}$ is:"),
    "Perpendicular to $\\nabla f$",
    [
      ["Parallel to $\\nabla f$", "zerorate-parallel", "That gives the maximum rate."],
      ["Opposite to $\\nabla f$", "zerorate-opposite", "That gives the steepest decrease."],
      ["Any unit vector", "zerorate-any", "Only if $\\nabla f = \\mathbf{0}$."],
    ]),
  // level 4
  num(m(GD, "apply-hill-slope", "apply", 4, 30, "On the hill $h(x, y) = 100 - x^{2} - 2y^{2}$, what is the steepest slope at $(3, 1)$? Give $3$ decimal places."), 7.211),
  num(m(GD, "apply-sphere-plane", "apply", 4, 30, "The tangent plane to $x^{2} + y^{2} + z^{2} = 14$ at $(1, 2, 3)$ is $x + 2y + 3z = d$. Find $d$."), 14),
  num(m(GD, "apply-exp-direction", "apply", 4, 30, "For $f(x, y) = ye^{x}$, find the rate of change at $(0, 2)$ in the direction of $\\mathbf{v} = [1, -1]$. Give $3$ decimal places."), 0.707),
  mcq(m(GD, "recall-descent", "recall", 4, 30, "The direction of steepest decrease of $f$ is:"),
    "$-\\nabla f$",
    [
      ["$\\nabla f$", "descent-ascent", "That's steepest increase."],
      ["Perpendicular to $\\nabla f$", "descent-level", "That's along the level curve."],
      ["$\\frac{1}{\\nabla f}$", "descent-reciprocal", "Vectors have no reciprocal."],
    ]),
  // level 5
  short(m(GD, "explain-steepest", "explain", 5, 90, "Use $D_{\\mathbf{u}}f = \\|\\nabla f\\|\\cos\\theta$ to explain why $\\nabla f$ is the direction of steepest ascent."),
    [
      ["formula", "$\\theta$ is the angle between $\\nabla f$ and $\\mathbf{u}$, and $\\|\\mathbf{u}\\| = 1$", 1, true],
      ["maximise", "$\\cos\\theta$ is largest ($= 1$) at $\\theta = 0$, i.e. $\\mathbf{u}$ along $\\nabla f$, giving rate $\\|\\nabla f\\|$", 3, true],
    ]),
  mcq(m(GD, "apply-unnormalised", "apply", 5, 40, "Computing $\\nabla f \\cdot \\mathbf{v}$ with $\\mathbf{v} = [3, 4]$ instead of a unit vector gives:"),
    "A value $5$ times the directional derivative",
    [
      ["The correct directional derivative", "unnorm-correct", "The direction must have length $1$."],
      ["A value $\\frac{1}{5}$ of the directional derivative", "unnorm-fifth", "$\\|\\mathbf{v}\\| = 5$ multiplies, not divides."],
      ["The gradient's length", "unnorm-length", "That's a different quantity."],
    ]),
  mcq(m(GD, "recall-gradient-descent", "recall", 5, 40, "Gradient descent with step size $\\eta$ updates $\\mathbf{w}$ by:"),
    "$\\mathbf{w} \\leftarrow \\mathbf{w} - \\eta\\nabla L(\\mathbf{w})$",
    [
      ["$\\mathbf{w} \\leftarrow \\mathbf{w} + \\eta\\nabla L(\\mathbf{w})$", "gd-ascent", "That climbs uphill."],
      ["$\\mathbf{w} \\leftarrow \\eta\\nabla L(\\mathbf{w})$", "gd-replace", "It's an update of $\\mathbf{w}$, not a replacement."],
      ["$\\mathbf{w} \\leftarrow \\mathbf{w} - \\frac{L(\\mathbf{w})}{\\nabla L(\\mathbf{w})}$", "gd-newton", "Vectors can't be divided; that resembles Newton's root step."],
    ]),
  num(m(GD, "apply-descent-step", "apply", 5, 40, "One step of gradient descent on $f(x, y) = x^{2} + y^{2}$ from $(1, 2)$ with $\\eta = 0.1$ gives $(x_1, y_1)$. Find $x_1$."), 0.8),
  // level 6
  short(m(GD, "explain-perpendicular", "explain", 6, 120, "Use the chain rule to prove that $\\nabla f$ is perpendicular to the level curve $f(x, y) = c$."),
    [
      ["curve", "Parametrise the level curve as $\\mathbf{r}(t)$, so $f(\\mathbf{r}(t)) = c$ for all $t$", 2, true],
      ["differentiate", "Differentiating gives $\\nabla f(\\mathbf{r}(t)) \\cdot \\mathbf{r}'(t) = 0$, so $\\nabla f$ is perpendicular to the tangent vector", 2, true],
    ]),
  num(m(GD, "apply-angle", "apply", 6, 45, "For $f(x, y) = x + y$, what angle (in degrees) does $\\nabla f$ make with $\\mathbf{u} = [1, 0]$?"), 45),
  num(m(GD, "apply-three-d-gradient", "apply", 6, 45, "For $f(x, y, z) = x^{2}yz$, find $\\|\\nabla f\\|$ at $(1, 2, 3)$. Give $3$ decimal places."), 12.53),
  mcq(m(GD, "apply-radial", "apply", 6, 45, "The level curves of $f(x, y) = x^{2} + y^{2}$ are circles. At $(3, 4)$, $\\nabla f$ points:"),
    "Radially outward, along $[3, 4]$",
    [
      ["Tangent to the circle", "radial-tangent", "The gradient is perpendicular to level curves."],
      ["Toward the origin", "radial-inward", "$f$ increases outward."],
      ["Along the $x$-axis", "radial-axis", "$\\nabla f = [6, 8]$."],
    ]),
  // level 7
  short(m(GD, "explain-cooling-bug", "explain", 7, 120, "A bug at $(1, 1)$ on a plate with temperature $T(x, y) = 100 - x^{2} - 3y^{2}$ wants to cool down as fast as possible. Which direction should it move, and at what rate does $T$ fall?"),
    [
      ["direction", "$\\nabla T(1, 1) = [-2, -6]$, so it should move along $-\\nabla T = [2, 6]$ (or the unit vector $\\frac{1}{\\sqrt{40}}[2, 6]$)", 2, true],
      ["rate", "$T$ falls at rate $\\|\\nabla T\\| = \\sqrt{40} \\approx 6.32$ per unit distance", 2, true],
    ]),
  num(m(GD, "apply-cooling-rate", "apply", 7, 60, "For $T(x, y) = 100 - x^{2} - 3y^{2}$, find the fastest rate at which $T$ can decrease at $(1, 1)$. Give $3$ decimal places."), 6.325),
  num(m(GD, "apply-plane-estimate", "apply", 7, 60, "Use the tangent plane to $z = xy$ at $(2, 3)$ to estimate $z$ at $(2.1, 2.9)$."), 6.1),
  mcq(m(GD, "apply-max-direction", "apply", 7, 60, "For $f(x, y) = x^{2} - y^{2}$ at $(1, 1)$, the direction of greatest increase is:"),
    "$\\frac{1}{\\sqrt{2}}[1, -1]$",
    [
      ["$\\frac{1}{\\sqrt{2}}[1, 1]$", "maxdir-diagonal", "$\\nabla f = [2, -2]$."],
      ["$[1, 0]$", "maxdir-axis", "Both components of $\\nabla f$ are nonzero."],
      ["$\\frac{1}{\\sqrt{2}}[-1, 1]$", "maxdir-reversed", "That's the direction of greatest decrease."],
    ]),
  // level 8
  short(m(GD, "explain-product-rule", "explain", 8, 150, "Show that $\\nabla(fg) = f\\nabla g + g\\nabla f$."),
    [
      ["component", "Applies the one-variable product rule to each partial: $\\frac{\\partial}{\\partial x}(fg) = f_x g + f g_x$", 3, true],
      ["assemble", "Collects the components into vectors", 1, true],
    ]),
  num(m(GD, "apply-toward-point", "apply", 8, 75, "For $f(x, y) = \\ln(x^{2} + y^{2})$, find the rate of change at $(1, 1)$ in the direction of the point $(4, 5)$."), 1.4),
  num(m(GD, "apply-toward-origin", "apply", 8, 75, "For $f(x, y, z) = x^{2} + y^{2} + z^{2}$, find the rate of change at $(1, 1, 1)$ in the direction of the origin. Give $3$ decimal places."), -3.464),
  mcq(m(GD, "apply-zero-gradient", "apply", 8, 75, "If $\\nabla f(\\mathbf{p}) = \\mathbf{0}$ (and $f$ is differentiable), then at $\\mathbf{p}$:"),
    "Every directional derivative is $0$",
    [
      ["$f$ has a local minimum", "zerograd-min", "It could also be a maximum or a saddle."],
      ["$f(\\mathbf{p}) = 0$", "zerograd-value", "The value is unrelated."],
      ["Some directional derivatives are nonzero", "zerograd-some", "$D_{\\mathbf{u}}f = \\mathbf{0} \\cdot \\mathbf{u} = 0$ for every $\\mathbf{u}$."],
    ]),
  // level 9
  short(m(GD, "transfer-zigzag", "transfer", 9, 180, "Gradient descent with exact line search on an elongated bowl like $f(x, y) = x^{2} + 10y^{2}$ zig-zags. Explain why consecutive steps are perpendicular and why progress is slow."),
    [
      ["perpendicular", "With exact line search, each step stops where the new gradient is perpendicular to the search direction, so consecutive gradients are orthogonal", 2, true],
      ["slow", "The gradient points across the narrow valley, not along it, so steps bounce between the walls; the condition number (here $10$) controls the slowdown", 2, true],
    ]),
  short(m(GD, "transfer-directional-not-differentiable", "transfer", 9, 180, "Show that $f(x, y) = \\frac{x^{2}y}{x^{4} + y^{2}}$ (with $f(0, 0) = 0$) has a directional derivative at the origin in every direction, yet is not continuous there."),
    [
      ["directional", "For $\\mathbf{u} = [a, b]$ with $b \\ne 0$: $\\frac{f(ta, tb)}{t} = \\frac{a^{2}b}{t^{2}a^{4} + b^{2}} \\to \\frac{a^{2}}{b}$; for $b = 0$ it is $0$", 2, true],
      ["discontinuous", "Along $y = x^{2}$, $f = \\frac{1}{2}$, which doesn't tend to $0$", 2, true],
    ]),
  num(m(GD, "apply-descent-elongated", "apply", 9, 90, "One gradient descent step on $f(x, y) = x^{2} + 10y^{2}$ from $(10, 1)$ with $\\eta = 0.05$ gives $(x_1, y_1)$. Find $x_1$."), 9),
  mcq(m(GD, "transfer-one-step", "transfer", 9, 90, "For $f(x) = \\frac{a}{2}x^{2}$ with $a > 0$, which step size makes gradient descent reach the minimum in one step from any start?"),
    "$\\eta = \\frac{1}{a}$",
    [
      ["$\\eta = a$", "onestep-a", "$x - \\eta a x = (1 - \\eta a)x$, which vanishes when $\\eta a = 1$."],
      ["$\\eta = \\frac{2}{a}$", "onestep-two", "That flips the sign: $x_1 = -x_0$."],
      ["No step size can", "onestep-none", "$\\eta = \\frac{1}{a}$ does — it's Newton's step for a quadratic."],
    ]),
  // level 10
  short(m(GD, "transfer-lagrange-preview", "transfer", 10, 180, "Explain why, at a point where $f$ attains its maximum on the curve $g(x, y) = c$ (with $\\nabla g \\ne \\mathbf{0}$), $\\nabla f$ must be parallel to $\\nabla g$."),
    [
      ["tangent", "Along the curve the rate of change of $f$ is $\\nabla f \\cdot \\mathbf{T}$, with $\\mathbf{T}$ tangent to the curve; at a constrained maximum it is $0$", 2, true],
      ["parallel", "So $\\nabla f \\perp \\mathbf{T}$; $\\nabla g$ is also perpendicular to the curve, so $\\nabla f = \\lambda\\nabla g$", 2, true],
    ]),
  short(m(GD, "transfer-quadratic-gradient", "transfer", 10, 180, "For symmetric $\\mathbf{A}$, show that the gradient of $f(\\mathbf{x}) = \\frac{1}{2}\\mathbf{x}^{\\top}\\mathbf{A}\\mathbf{x} - \\mathbf{b}^{\\top}\\mathbf{x}$ is $\\mathbf{A}\\mathbf{x} - \\mathbf{b}$."),
    [
      ["partials", "$\\frac{\\partial}{\\partial x_k}\\frac{1}{2}\\sum_{i,j} A_{ij}x_i x_j = \\frac{1}{2}\\left(\\sum_j A_{kj}x_j + \\sum_i A_{ik}x_i\\right)$", 2, true],
      ["symmetry", "Symmetry makes this $(\\mathbf{A}\\mathbf{x})_k$, and $\\nabla(\\mathbf{b}^{\\top}\\mathbf{x}) = \\mathbf{b}$", 2, true],
    ]),
  num(m(GD, "transfer-constrained-max", "transfer", 10, 120, "Find the maximum of $f(x, y) = x + 2y$ on the circle $x^{2} + y^{2} = 5$."), 5),
  mcq(m(GD, "transfer-norm-gradient", "transfer", 10, 120, "For $f(\\mathbf{x}) = \\|\\mathbf{x}\\|$ and $\\mathbf{x} \\ne \\mathbf{0}$, $\\nabla f(\\mathbf{x}) =$"),
    "$\\frac{\\mathbf{x}}{\\|\\mathbf{x}\\|}$",
    [
      ["$\\mathbf{x}$", "normgrad-squared", "That's the gradient of $\\frac{1}{2}\\|\\mathbf{x}\\|^{2}$."],
      ["$2\\mathbf{x}$", "normgrad-square", "That's the gradient of $\\|\\mathbf{x}\\|^{2}$."],
      ["$\\frac{1}{\\|\\mathbf{x}\\|}$", "normgrad-scalar", "The gradient is a vector."],
    ]),
];

// ---------------------------------------------------------------------------
// multivariable-extrema
// ---------------------------------------------------------------------------
const ME = "multivariable-extrema";
const multivariableExtrema: Item[] = [
  // level 1
  mcq(m(ME, "recall-critical", "recall", 1, 15, "A critical point of $f(x, y)$ is a point where:"),
    "$\\nabla f = \\mathbf{0}$, or a partial derivative doesn't exist",
    [
      ["$f = 0$", "mvcrit-root", "That's a zero of $f$."],
      ["$f_{xx} = 0$", "mvcrit-second", "Second derivatives classify; they don't locate."],
      ["$f_x = 0$ only", "mvcrit-one", "Both partials must vanish."],
    ]),
  mcq(m(ME, "recall-discriminant", "recall", 1, 15, "In the second derivative test, $D = f_{xx}f_{yy} - f_{xy}^{2}$ is:"),
    "The determinant of the Hessian matrix",
    [
      ["The trace of the Hessian", "disc-trace", "The trace is $f_{xx} + f_{yy}$."],
      ["The length of the gradient", "disc-gradient", "It uses second derivatives."],
      ["The value of $f$", "disc-value", "It's built from second partials."],
    ]),
  mcq(m(ME, "recall-saddle", "recall", 1, 15, "At a critical point with $D < 0$, $f$ has:"),
    "A saddle point",
    [
      ["A local minimum", "saddle-min", "That needs $D > 0$ and $f_{xx} > 0$."],
      ["A local maximum", "saddle-max", "That needs $D > 0$ and $f_{xx} < 0$."],
      ["An undetermined point", "saddle-unknown", "Only $D = 0$ is inconclusive."],
    ]),
  mcq(m(ME, "recall-evt", "recall", 1, 15, "A continuous $f$ on a closed, bounded region of the plane:"),
    "Attains an absolute maximum and an absolute minimum",
    [
      ["Has a critical point inside", "evt2-critical", "$f = x$ on a disc has none."],
      ["Is constant on the boundary", "evt2-boundary", "Nothing forces that."],
      ["Has its extrema only at critical points", "evt2-interior", "They may lie on the boundary."],
    ]),
  // level 2
  num(m(ME, "apply-critical-x", "apply", 2, 20, "Find the $x$-coordinate of the critical point of $f(x, y) = x^{2} + y^{2} - 4x + 6y$."), 2),
  num(m(ME, "apply-critical-y", "apply", 2, 20, "Find the $y$-coordinate of the critical point of $f(x, y) = x^{2} + y^{2} - 4x + 6y$."), -3),
  num(m(ME, "apply-discriminant", "apply", 2, 20, "For $f(x, y) = x^{2} + 3y^{2}$, find $D = f_{xx}f_{yy} - f_{xy}^{2}$ at the origin."), 12),
  mcq(m(ME, "apply-saddle-example", "apply", 2, 20, "At the origin, $f(x, y) = x^{2} - y^{2}$ has:"),
    "A saddle point",
    [
      ["A local minimum", "saddleex-min", "Along the $y$-axis $f = -y^{2} < 0$."],
      ["A local maximum", "saddleex-max", "Along the $x$-axis $f = x^{2} > 0$."],
      ["No critical point", "saddleex-none", "$\\nabla f = [0, 0]$ there."],
    ]),
  // level 3
  num(m(ME, "apply-min-value", "apply", 3, 25, "Find the minimum value of $f(x, y) = x^{2} + y^{2} - 4x + 6y$."), -13),
  num(m(ME, "apply-count-critical", "apply", 3, 25, "How many critical points does $f(x, y) = x^{3} - 3x + y^{2} - 4y$ have?"), 2),
  num(m(ME, "apply-xy-discriminant", "apply", 3, 25, "For $f(x, y) = xy$, find $D$ at the origin."), -1),
  mcq(m(ME, "apply-local-max-test", "apply", 3, 25, "At a critical point with $D > 0$ and $f_{xx} < 0$, $f$ has:"),
    "A local maximum",
    [
      ["A local minimum", "localmax-min", "Negative curvature in $x$ with $D > 0$ means a cap."],
      ["A saddle point", "localmax-saddle", "$D > 0$ rules out a saddle."],
      ["Nothing can be concluded", "localmax-inconclusive", "Only $D = 0$ is inconclusive."],
    ]),
  // level 4
  num(m(ME, "apply-local-min-value", "apply", 4, 30, "Find the local minimum value of $f(x, y) = x^{3} - 3x + y^{2} - 4y$."), -6),
  num(m(ME, "apply-quartic-critical", "apply", 4, 30, "How many critical points does $f(x, y) = x^{4} + y^{4} - 4xy$ have?"), 3),
  num(m(ME, "apply-quartic-min", "apply", 4, 30, "Find the minimum value of $f(x, y) = x^{4} + y^{4} - 4xy$."), -2),
  mcq(m(ME, "apply-quartic-origin", "apply", 4, 30, "For $f(x, y) = x^{4} + y^{4} - 4xy$, the origin is:"),
    "A saddle point, since $D = -16 < 0$",
    [
      ["A local minimum", "quarticorigin-min", "Along $y = x$, $f = 2x^{4} - 4x^{2} < 0$ near $0$."],
      ["A local maximum", "quarticorigin-max", "Along $y = -x$, $f = 2x^{4} + 4x^{2} > 0$."],
      ["Inconclusive, since $D = 0$", "quarticorigin-zero", "$f_{xy} = -4$, so $D = 0 \\cdot 0 - 16$."],
    ]),
  // level 5
  short(m(ME, "explain-gradient-zero", "explain", 5, 90, "Explain why $\\nabla f = \\mathbf{0}$ at an interior local extremum of a differentiable $f(x, y)$."),
    [
      ["slices", "The one-variable functions $x \\mapsto f(x, b)$ and $y \\mapsto f(a, y)$ have local extrema at $a$ and $b$", 2, true],
      ["fermat", "By the one-variable result, their derivatives $f_x(a, b)$ and $f_y(a, b)$ are $0$", 2, true],
    ]),
  mcq(m(ME, "apply-inconclusive", "apply", 5, 40, "If $D = 0$ at a critical point, the second derivative test:"),
    "Gives no information",
    [
      ["Shows a saddle", "mvinconcl-saddle", "$x^{4} + y^{4}$ has $D = 0$ and a minimum."],
      ["Shows a minimum", "mvinconcl-min", "$-(x^{4} + y^{4})$ has $D = 0$ and a maximum."],
      ["Shows the point isn't critical", "mvinconcl-critical", "Criticality comes from $\\nabla f$."],
    ]),
  mcq(m(ME, "apply-boundary", "apply", 5, 40, "Why must the boundary be checked when finding absolute extrema on a closed region?"),
    "Extrema can occur on the boundary, where $\\nabla f$ need not vanish",
    [
      ["Critical points always lie on the boundary", "boundary-critical", "They may be interior."],
      ["$f$ is undefined inside", "boundary-undefined", "$f$ is defined throughout."],
      ["The boundary always holds the minimum", "boundary-min", "It may hold the max, the min, both or neither."],
    ]),
  num(m(ME, "apply-square-max", "apply", 5, 40, "Find the absolute maximum of $f(x, y) = x^{2} + y^{2} - 2x$ on the square $0 \\le x \\le 2$, $0 \\le y \\le 2$."), 4),
  // level 6
  short(m(ME, "explain-hessian-eigenvalues", "explain", 6, 120, "Explain the second derivative test in terms of the eigenvalues of the Hessian matrix."),
    [
      ["quadratic", "Near a critical point, $f \\approx f(\\mathbf{p}) + \\frac{1}{2}\\mathbf{h}^{\\top}\\mathbf{H}\\mathbf{h}$", 1, true],
      ["eigen", "Both eigenvalues positive gives a min, both negative a max, opposite signs a saddle; $D$ is their product and $f_{xx}$ fixes the common sign", 3, true],
    ]),
  num(m(ME, "apply-square-min", "apply", 6, 45, "Find the absolute minimum of $f(x, y) = x^{2} + y^{2} - 2x$ on the square $0 \\le x \\le 2$, $0 \\le y \\le 2$."), -1),
  num(m(ME, "apply-quadratic-min", "apply", 6, 45, "Find the minimum value of $f(x, y) = 2x^{2} + y^{2} - xy - 7y$."), -14),
  mcq(m(ME, "apply-positive-definite", "apply", 6, 45, "For $f(x, y) = x^{2} + xy + y^{2}$, the origin is:"),
    "A local (in fact global) minimum, since $D = 3 > 0$ and $f_{xx} = 2 > 0$",
    [
      ["A saddle, because of the $xy$ term", "posdef-saddle", "$D = 4 - 1 > 0$."],
      ["A local maximum", "posdef-max", "$f_{xx} > 0$."],
      ["Inconclusive", "posdef-inconclusive", "$D \\ne 0$."],
    ]),
  // level 7
  short(m(ME, "explain-closest-point", "explain", 7, 120, "Find the point on the plane $x + 2y + 2z = 9$ closest to the origin, by eliminating $z$ and minimising the squared distance."),
    [
      ["setup", "Writes $z = \\frac{9 - x - 2y}{2}$ and minimises $d^{2} = x^{2} + y^{2} + z^{2}$ by setting both partials to zero", 2, true],
      ["answer", "Gets $(1, 2, 2)$, at distance $3$", 2, true],
    ]),
  num(m(ME, "apply-plane-distance", "apply", 7, 60, "What is the distance from the origin to the plane $x + 2y + 2z = 9$?"), 3),
  num(m(ME, "apply-least-squares-slope", "apply", 7, 60, "Fit $y = mx$ (through the origin) to the points $(1, 2)$, $(2, 3)$, $(3, 5)$ by minimising the sum of squared errors. Find $m$. Give $3$ decimal places."), 1.643),
  mcq(m(ME, "apply-cubic-classify", "apply", 7, 60, "For $f(x, y) = x^{3} - 3xy + y^{3}$, the critical point $(1, 1)$ is:"),
    "A local minimum, since $D = 27 > 0$ and $f_{xx} = 6 > 0$",
    [
      ["A saddle", "cubicclass-saddle", "That's the origin, where $D = -9$."],
      ["A local maximum", "cubicclass-max", "$f_{xx} = 6 > 0$."],
      ["Inconclusive", "cubicclass-inconclusive", "$D = 36 - 9 = 27$."],
    ]),
  // level 8
  short(m(ME, "explain-d-zero-cases", "explain", 8, 150, "$x^{4} + y^{4}$, $-(x^{4} + y^{4})$ and $x^{4} - y^{4}$ all have $D = 0$ at the origin. Classify each and explain what this shows."),
    [
      ["classify", "Minimum, maximum and saddle respectively (check the signs of $f$ near $\\mathbf{0}$)", 2, true],
      ["lesson", "So $D = 0$ is genuinely inconclusive: higher-order terms decide", 2, true],
    ]),
  num(m(ME, "apply-cubic-min-value", "apply", 8, 75, "Find the local minimum value of $f(x, y) = x^{3} - 3xy + y^{3}$."), -1),
  num(m(ME, "apply-disk-max", "apply", 8, 75, "Find the absolute maximum of $f(x, y) = xy$ on the disc $x^{2} + y^{2} \\le 2$."), 1),
  mcq(m(ME, "transfer-lonely-min", "transfer", 8, 75, "Can a function on $\\mathbb{R}^{2}$ have exactly one critical point, a local minimum, that is not a global minimum?"),
    "Yes — unlike in one variable; $f = x^{2} + y^{2}(1 - x)^{3}$ is an example",
    [
      ["No, the one-variable argument carries over", "lonely-carries", "In two variables you can go around the hill without passing a second critical point."],
      ["Only if $f$ is discontinuous", "lonely-discontinuous", "The example is a polynomial."],
      ["Only if $f$ is unbounded below and has a saddle", "lonely-saddle", "The example has no other critical point at all."],
    ]),
  // level 9
  short(m(ME, "transfer-normal-equations", "transfer", 9, 180, "Derive the equations for the least-squares line $y = mx + b$ through data $(x_i, y_i)$ by minimising $S(m, b) = \\sum (y_i - mx_i - b)^{2}$."),
    [
      ["partials", "$\\frac{\\partial S}{\\partial m} = -2\\sum x_i(y_i - mx_i - b) = 0$ and $\\frac{\\partial S}{\\partial b} = -2\\sum (y_i - mx_i - b) = 0$", 2, true],
      ["normal", "These are the normal equations $m\\sum x_i^{2} + b\\sum x_i = \\sum x_i y_i$ and $m\\sum x_i + nb = \\sum y_i$", 2, true],
    ]),
  short(m(ME, "transfer-product-max", "transfer", 9, 180, "Maximise $xyz$ for positive $x, y, z$ with $x + y + z = 12$, by substitution."),
    [
      ["reduce", "Substitutes $z = 12 - x - y$ and sets the partials of $xy(12 - x - y)$ to zero", 2, true],
      ["answer", "Gets $x = y = z = 4$ and maximum $64$", 2, true],
    ]),
  num(m(ME, "transfer-product-max-value", "transfer", 9, 90, "Find the maximum of $xyz$ for positive $x, y, z$ with $x + y + z = 12$."), 64),
  mcq(m(ME, "transfer-indefinite", "transfer", 9, 90, "For $f(\\mathbf{x}) = \\mathbf{x}^{\\top}\\mathbf{A}\\mathbf{x}$ with $\\mathbf{A}$ symmetric and indefinite, the origin is:"),
    "A saddle point",
    [
      ["A minimum", "indefinite-min", "A negative eigenvalue gives a downhill direction."],
      ["A maximum", "indefinite-max", "A positive eigenvalue gives an uphill direction."],
      ["Not a critical point", "indefinite-noncritical", "$\\nabla f = 2\\mathbf{A}\\mathbf{x} = \\mathbf{0}$ at the origin."],
    ]),
  // level 10
  short(m(ME, "transfer-taylor-proof", "transfer", 10, 180, "Prove that if $\\nabla f(\\mathbf{p}) = \\mathbf{0}$ and the Hessian $\\mathbf{H}$ at $\\mathbf{p}$ is positive definite (with $f$ having continuous second partials), then $f$ has a strict local minimum at $\\mathbf{p}$."),
    [
      ["taylor", "Taylor: $f(\\mathbf{p} + \\mathbf{h}) = f(\\mathbf{p}) + \\frac{1}{2}\\mathbf{h}^{\\top}\\mathbf{H}(\\mathbf{c})\\mathbf{h}$ for some $\\mathbf{c}$ on the segment", 2, true],
      ["definite", "By continuity $\\mathbf{H}(\\mathbf{c})$ stays positive definite for small $\\mathbf{h}$, so $f(\\mathbf{p} + \\mathbf{h}) > f(\\mathbf{p})$ for $\\mathbf{h} \\ne \\mathbf{0}$", 2, true],
    ]),
  short(m(ME, "transfer-peano", "transfer", 10, 180, "Let $f(x, y) = (y - x^{2})(y - 2x^{2})$. Show that $f$ has no local minimum at the origin, even though its restriction to every line through the origin has a local minimum there."),
    [
      ["lines", "On $y = mx$, $f = (mx - x^{2})(mx - 2x^{2}) \\approx m^{2}x^{2} > 0$ near $0$ (and on the $x$-axis $f = 2x^{4}$, on the $y$-axis $f = y^{2}$), so each line has a minimum at $0$", 2, true],
      ["curve", "Between the parabolas, e.g. on $y = 1.5x^{2}$, $f = -0.25x^{4} < 0$, so there are negative values arbitrarily close to the origin", 2, true],
    ]),
  num(m(ME, "transfer-regression-intercept", "transfer", 10, 120, "Fit $y = mx + b$ by least squares to $(0, 1)$, $(1, 3)$, $(2, 4)$. Find $b$. Give $4$ decimal places."), 1.1667),
  mcq(m(ME, "transfer-three-variables", "transfer", 10, 120, "For $f: \\mathbb{R}^{3} \\to \\mathbb{R}$, the second derivative test at a critical point uses:"),
    "The definiteness of the $3 \\times 3$ Hessian (the signs of its eigenvalues)",
    [
      ["Only $f_{xx}f_{yy} - f_{xy}^{2}$", "threevar-two-d", "That ignores the $z$-direction."],
      ["The sign of $f_{xx} + f_{yy} + f_{zz}$", "threevar-trace", "The trace alone can't detect a saddle."],
      ["The gradient's length", "threevar-gradient", "At a critical point it's $0$."],
    ]),
];

// ---------------------------------------------------------------------------
// multiple-integrals
// ---------------------------------------------------------------------------
const MI = "multiple-integrals";
const multipleIntegrals: Item[] = [
  // level 1
  mcq(m(MI, "recall-fubini", "recall", 1, 15, "For continuous $f$ on a rectangle, Fubini's theorem says:"),
    "The double integral equals the iterated integral in either order",
    [
      ["Only $dy\\,dx$ order is valid", "fubini-one-order", "Both orders give the same value."],
      ["The double integral is the product of two single integrals", "fubini-product", "Only when $f(x, y) = g(x)h(y)$."],
      ["Iterated integrals always differ", "fubini-differ", "They agree for continuous $f$."],
    ]),
  mcq(m(MI, "recall-polar-area", "recall", 1, 15, "In polar coordinates, the area element $dA$ is:"),
    "$r\\,dr\\,d\\theta$",
    [
      ["$dr\\,d\\theta$", "polar-missing-r", "A polar rectangle's width grows with $r$."],
      ["$r^{2}\\,dr\\,d\\theta$", "polar-squared", "That's closer to spherical coordinates."],
      ["$\\theta\\,dr\\,d\\theta$", "polar-theta", "The factor is the radius."],
    ]),
  mcq(m(MI, "recall-area", "recall", 1, 15, "$\\iint_R 1\\,dA$ equals:"),
    "The area of $R$",
    [
      ["$1$", "area-one", "It's the integral of $1$ over $R$."],
      ["The perimeter of $R$", "area-perimeter", "Integrating $1$ over a region measures its area."],
      ["$0$", "area-zero", "The integrand is positive."],
    ]),
  mcq(m(MI, "recall-inner-limits", "recall", 1, 15, "For the region $g_1(x) \\le y \\le g_2(x)$, $a \\le x \\le b$, integrating $dy$ first, the inner limits:"),
    "Depend on $x$, while the outer limits are constants",
    [
      ["Are constants, while the outer limits depend on $y$", "inner-reversed", "The outer limits must be numbers."],
      ["Are always $0$ and $1$", "inner-unit", "They're the boundary curves."],
      ["Depend on $y$", "inner-wrong-variable", "The inner variable is $y$; its limits depend on $x$."],
    ]),
  // level 2
  num(m(MI, "apply-rectangle", "apply", 2, 20, "Evaluate $\\iint_R (x + 2y)\\,dA$ with $R = [0, 2] \\times [0, 1]$."), 4),
  num(m(MI, "apply-unit-square", "apply", 2, 20, "Evaluate $\\iint_{[0, 1] \\times [0, 1]} xy\\,dA$."), 0.25),
  num(m(MI, "apply-constant", "apply", 2, 20, "Evaluate $\\int_0^{1} \\int_0^{2} 3\\,dy\\,dx$."), 6),
  mcq(m(MI, "apply-identify-region", "apply", 2, 20, "$\\int_0^{1} \\int_0^{x} f(x, y)\\,dy\\,dx$ integrates over:"),
    "The triangle $0 \\le y \\le x \\le 1$",
    [
      ["The unit square", "region-square", "The inner limit $y \\le x$ cuts it in half."],
      ["The triangle $0 \\le x \\le y \\le 1$", "region-other-triangle", "Here $y$ runs up to $x$, so $y \\le x$."],
      ["The unit disc", "region-disc", "The boundaries are straight lines."],
    ]),
  // level 3
  num(m(MI, "apply-triangle", "apply", 3, 25, "Evaluate $\\iint_T xy\\,dA$, where $T$ is the triangle with vertices $(0, 0)$, $(1, 0)$, $(1, 1)$. Give $3$ decimal places."), 0.125),
  num(m(MI, "apply-disc-area", "apply", 3, 25, "Use polar coordinates to find the area of a disc of radius $2$. Give $3$ decimal places."), 12.566),
  num(m(MI, "apply-separable", "apply", 3, 25, "Evaluate $\\iint_{[0, \\pi] \\times [0, 1]} y\\sin x\\,dA$."), 1),
  mcq(m(MI, "apply-reverse-order", "apply", 3, 25, "Reversing the order of $\\int_0^{1} \\int_x^{1} f\\,dy\\,dx$ gives:"),
    "$\\int_0^{1} \\int_0^{y} f\\,dx\\,dy$",
    [
      ["$\\int_0^{1} \\int_x^{1} f\\,dx\\,dy$", "reverse-same-limits", "Limits involving $x$ can't stay when $x$ is the inner variable."],
      ["$\\int_0^{1} \\int_y^{1} f\\,dx\\,dy$", "reverse-wrong-side", "The region is $x \\le y$, so $x$ runs from $0$ to $y$."],
      ["$\\int_x^{1} \\int_0^{1} f\\,dx\\,dy$", "reverse-variable-outer", "Outer limits must be constants."],
    ]),
  // level 4
  num(m(MI, "apply-switch-order", "apply", 4, 30, "Evaluate $\\int_0^{1} \\int_y^{1} e^{x^{2}}\\,dx\\,dy$. Give $3$ decimal places."), 0.859),
  num(m(MI, "apply-polar-moment", "apply", 4, 30, "Evaluate $\\iint_{x^{2} + y^{2} \\le 1} (x^{2} + y^{2})\\,dA$. Give $3$ decimal places."), 1.571),
  num(m(MI, "apply-paraboloid-volume", "apply", 4, 30, "Find the volume under $z = 4 - x^{2} - y^{2}$ and above the $xy$-plane. Give $3$ decimal places."), 25.133),
  mcq(m(MI, "recall-polar-jacobian", "recall", 4, 30, "The Jacobian determinant of $(x, y) = (r\\cos\\theta, r\\sin\\theta)$ is:"),
    "$r$",
    [
      ["$1$", "polarjac-one", "$\\cos^{2}\\theta \\cdot r + \\sin^{2}\\theta \\cdot r = r$."],
      ["$r^{2}$", "polarjac-square", "Only one factor of $r$ appears."],
      ["$\\cos\\theta\\sin\\theta$", "polarjac-trig", "The trig factors combine to $1$."],
    ]),
  // level 5
  short(m(MI, "explain-switch", "explain", 5, 90, "Explain why switching the order of integration makes $\\int_0^{1} \\int_y^{1} e^{x^{2}}\\,dx\\,dy$ computable."),
    [
      ["obstacle", "$e^{x^{2}}$ has no elementary antiderivative in $x$, so the inner integral can't be done as written", 2, true],
      ["switch", "Redescribing the region as $0 \\le y \\le x$, $0 \\le x \\le 1$ makes the inner integral $\\int_0^{x} e^{x^{2}}\\,dy = xe^{x^{2}}$, which substitution handles", 2, true],
    ]),
  mcq(m(MI, "apply-product-split", "apply", 5, 40, "$\\iint_{[a, b] \\times [c, d]} g(x)h(y)\\,dA =$"),
    "$\\left(\\int_a^b g(x)\\,dx\\right)\\left(\\int_c^d h(y)\\,dy\\right)$",
    [
      ["$\\int_a^b \\int_c^d (g + h)\\,dy\\,dx$", "productsplit-sum", "A product integrand splits into a product of integrals."],
      ["$\\int_a^b g(x)h(x)\\,dx$", "productsplit-diagonal", "The variables are independent."],
      ["$(b - a)(d - c)\\,g\\,h$", "productsplit-constant", "$g$ and $h$ vary."],
    ]),
  mcq(m(MI, "recall-volume", "recall", 5, 40, "$\\iiint_E 1\\,dV$ equals:"),
    "The volume of $E$",
    [
      ["The surface area of $E$", "volume-surface", "Integrating $1$ over a solid gives its volume."],
      ["$1$", "volume-one", "It depends on $E$."],
      ["The mass of $E$ for any density", "volume-mass", "Mass integrates the density, not $1$."],
    ]),
  num(m(MI, "apply-cube-sum", "apply", 5, 40, "Evaluate $\\iiint_{[0, 1]^{3}} (x + y + z)\\,dV$."), 1.5),
  // level 6
  short(m(MI, "explain-gaussian", "explain", 6, 120, "Show that $\\int_{-\\infty}^{\\infty} e^{-x^{2}}\\,dx = \\sqrt{\\pi}$ using a double integral and polar coordinates."),
    [
      ["square", "Squares the integral: $I^{2} = \\iint_{\\mathbb{R}^{2}} e^{-(x^{2} + y^{2})}\\,dA$", 2, true],
      ["polar", "In polar: $\\int_0^{2\\pi} \\int_0^{\\infty} e^{-r^{2}}r\\,dr\\,d\\theta = 2\\pi \\cdot \\frac{1}{2} = \\pi$, so $I = \\sqrt{\\pi}$", 2, true],
    ]),
  num(m(MI, "apply-gaussian-value", "apply", 6, 45, "Evaluate $\\int_{-\\infty}^{\\infty} e^{-x^{2}}\\,dx$. Give $3$ decimal places."), 1.772),
  num(m(MI, "apply-parabolic-region", "apply", 6, 45, "Evaluate $\\int_0^{2} \\int_0^{x^{2}} y\\,dy\\,dx$."), 3.2),
  mcq(m(MI, "apply-polar-circle", "apply", 6, 45, "The region $0 \\le r \\le 2\\cos\\theta$, $-\\frac{\\pi}{2} \\le \\theta \\le \\frac{\\pi}{2}$ is:"),
    "The disc of radius $1$ centred at $(1, 0)$",
    [
      ["The disc of radius $2$ centred at the origin", "polarcircle-origin", "$r = 2\\cos\\theta$ gives $x^{2} + y^{2} = 2x$."],
      ["The disc of radius $2$ centred at $(2, 0)$", "polarcircle-radius", "Completing the square gives $(x - 1)^{2} + y^{2} = 1$."],
      ["A cardioid", "polarcircle-cardioid", "That's $r = 1 + \\cos\\theta$."],
    ]),
  // level 7
  short(m(MI, "explain-sphere-volume", "explain", 7, 120, "Use spherical coordinates to find the volume of a ball of radius $R$."),
    [
      ["setup", "$V = \\int_0^{2\\pi} \\int_0^{\\pi} \\int_0^{R} \\rho^{2}\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$", 2, true],
      ["evaluate", "$= 2\\pi \\cdot 2 \\cdot \\frac{R^{3}}{3} = \\frac{4}{3}\\pi R^{3}$", 2, true],
    ]),
  num(m(MI, "apply-polar-gaussian", "apply", 7, 60, "Evaluate $\\iint_{x^{2} + y^{2} \\le 1} e^{-(x^{2} + y^{2})}\\,dA$. Give $3$ decimal places."), 1.986),
  num(m(MI, "apply-plate-mass", "apply", 7, 60, "A plate occupies $[0, 1] \\times [0, 1]$ with density $\\rho(x, y) = x + y$. Find its mass."), 1),
  mcq(m(MI, "apply-linear-jacobian", "apply", 7, 60, "With $u = x + y$ and $v = x - y$, the area factor $\\left|\\frac{\\partial(x, y)}{\\partial(u, v)}\\right|$ is:"),
    "$\\frac{1}{2}$",
    [
      ["$2$", "linjac-inverse", "That's $\\left|\\frac{\\partial(u, v)}{\\partial(x, y)}\\right|$; the factor needed is its reciprocal."],
      ["$1$", "linjac-one", "The map stretches areas by $2$."],
      ["$-2$", "linjac-sign", "Use the absolute value, of the inverse map's determinant."],
    ]),
  // level 8
  short(m(MI, "explain-parallelogram", "explain", 8, 150, "Evaluate $\\iint_R (x + y)\\,dA$, where $R$ is given by $0 \\le x + y \\le 2$ and $0 \\le x - y \\le 2$, using $u = x + y$, $v = x - y$."),
    [
      ["transform", "The region becomes the square $[0, 2] \\times [0, 2]$ in $(u, v)$, with $dA = \\frac{1}{2}\\,du\\,dv$", 2, true],
      ["evaluate", "$\\int_0^{2} \\int_0^{2} u \\cdot \\frac{1}{2}\\,dv\\,du = 2$", 2, true],
    ]),
  num(m(MI, "apply-parallelogram-value", "apply", 8, 75, "Evaluate $\\iint_R (x + y)\\,dA$ over $0 \\le x + y \\le 2$, $0 \\le x - y \\le 2$."), 2),
  num(m(MI, "apply-half-disc-centroid", "apply", 8, 75, "Find the $y$-coordinate of the centroid of the upper half of the unit disc. Give $3$ decimal places."), 0.424),
  mcq(m(MI, "recall-spherical", "recall", 8, 75, "In spherical coordinates, the volume element $dV$ is:"),
    "$\\rho^{2}\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$",
    [
      ["$\\rho\\,d\\rho\\,d\\phi\\,d\\theta$", "spherical-polar", "That mimics polar coordinates; a sphere needs $\\rho^{2}\\sin\\phi$."],
      ["$\\rho^{2}\\cos\\phi\\,d\\rho\\,d\\phi\\,d\\theta$", "spherical-cos", "With $\\phi$ measured from the $z$-axis the factor is $\\sin\\phi$."],
      ["$d\\rho\\,d\\phi\\,d\\theta$", "spherical-none", "The coordinate boxes aren't all the same size."],
    ]),
  // level 9
  short(m(MI, "transfer-uniform-sum", "transfer", 9, 180, "$X$ and $Y$ are independent and uniform on $[0, 1]$. Compute $P(X + Y \\le 1)$ as a double integral."),
    [
      ["setup", "The joint density is $1$ on the unit square, so $P = \\iint_{x + y \\le 1} 1\\,dA = \\int_0^{1} \\int_0^{1 - x} dy\\,dx$", 2, true],
      ["value", "$\\int_0^{1} (1 - x)\\,dx = \\frac{1}{2}$", 2, true],
    ]),
  short(m(MI, "transfer-normal-total", "transfer", 9, 180, "Show that the standard bivariate normal density $\\frac{1}{2\\pi}e^{-(x^{2} + y^{2})/2}$ integrates to $1$ over $\\mathbb{R}^{2}$."),
    [
      ["polar", "In polar coordinates the integral is $\\frac{1}{2\\pi}\\int_0^{2\\pi} \\int_0^{\\infty} e^{-r^{2}/2}r\\,dr\\,d\\theta$", 2, true],
      ["evaluate", "$\\int_0^{\\infty} re^{-r^{2}/2}\\,dr = 1$, so the total is $\\frac{1}{2\\pi} \\cdot 2\\pi = 1$", 2, true],
    ]),
  num(m(MI, "apply-normal-disc", "apply", 9, 90, "$X$ and $Y$ are independent standard normals. Find $P(X^{2} + Y^{2} \\le 1)$. Give $3$ decimal places."), 0.393),
  mcq(m(MI, "recall-marginal", "recall", 9, 90, "For a joint density $f_{X, Y}$, the marginal density of $X$ is:"),
    "$f_X(x) = \\int_{-\\infty}^{\\infty} f_{X, Y}(x, y)\\,dy$",
    [
      ["$f_X(x) = \\int_{-\\infty}^{\\infty} f_{X, Y}(x, y)\\,dx$", "marginal-wrong-variable", "Integrate out $y$, not $x$."],
      ["$f_X(x) = f_{X, Y}(x, 0)$", "marginal-slice", "That's one slice, not a total over $y$."],
      ["$f_X(x) = \\iint f_{X, Y}\\,dA$", "marginal-total", "That's $1$."],
    ]),
  // level 10
  short(m(MI, "transfer-ellipsoid", "transfer", 10, 180, "Find the volume of the ellipsoid $\\frac{x^{2}}{a^{2}} + \\frac{y^{2}}{b^{2}} + \\frac{z^{2}}{c^{2}} \\le 1$ using a change of variables."),
    [
      ["substitute", "Sets $x = au$, $y = bv$, $z = cw$, mapping the unit ball to the ellipsoid with Jacobian $abc$", 2, true],
      ["volume", "$V = abc \\cdot \\frac{4}{3}\\pi = \\frac{4}{3}\\pi abc$", 2, true],
    ]),
  short(m(MI, "transfer-fubini-fails", "transfer", 10, 180, "Give an example where the two iterated integrals of a function over $[0, 1] \\times [0, 1]$ differ, and explain why Fubini's theorem doesn't apply."),
    [
      ["example", "For example $f(x, y) = \\frac{x^{2} - y^{2}}{(x^{2} + y^{2})^{2}}$: the iterated integrals are $\\frac{\\pi}{4}$ and $-\\frac{\\pi}{4}$", 2, true],
      ["why", "$f$ is unbounded near the origin and $\\iint |f|\\,dA = \\infty$, so the absolute-integrability hypothesis of Fubini fails", 2, true],
    ]),
  num(m(MI, "transfer-ellipsoid-value", "transfer", 10, 120, "Find the volume of the ellipsoid $x^{2} + \\frac{y^{2}}{4} + \\frac{z^{2}}{9} \\le 1$. Give $3$ decimal places."), 25.133),
  mcq(m(MI, "transfer-fubini-counterexample", "transfer", 10, 120, "For $f(x, y) = \\frac{x^{2} - y^{2}}{(x^{2} + y^{2})^{2}}$ on $[0, 1]^{2}$, the iterated integrals $\\int_0^{1}\\int_0^{1} f\\,dy\\,dx$ and $\\int_0^{1}\\int_0^{1} f\\,dx\\,dy$:"),
    "Differ: they are $\\frac{\\pi}{4}$ and $-\\frac{\\pi}{4}$",
    [
      ["Are both $0$, by antisymmetry", "fubinicx-zero", "Antisymmetry makes them negatives of each other, not zero."],
      ["Are equal, by Fubini's theorem", "fubinicx-equal", "Fubini needs $\\iint |f| < \\infty$, which fails here."],
      ["Both diverge", "fubinicx-diverge", "Each iterated integral is finite."],
    ]),
];

export const calc07Items: Item[] = [...partialDerivatives, ...gradient, ...multivariableExtrema, ...multipleIntegrals];
