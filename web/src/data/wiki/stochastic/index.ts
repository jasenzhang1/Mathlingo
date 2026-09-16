import { geometricBrownianMotionWiki } from "./geometric-brownian-motion";
import { ornsteinUhlenbeckProcessWiki } from "./ornstein-uhlenbeck-process";
import { blackScholesMertonEquationWiki } from "./black-scholes-merton-equation";
import type { WikiArticle } from "../types";

/**
 * The `stochastic-calculus` domain's wiki articles. Only the "named process"
 * concepts are covered so far — geometric Brownian motion, the
 * Ornstein-Uhlenbeck process, and the Black-Scholes-Merton PDE they build
 * toward. The domain's other concepts (filtrations, martingales, quadratic
 * variation, the Itô integral and lemma, Girsanov, risk-neutral pricing,
 * Feynman-Kac) and the `stochastic-processes` domain's own two concepts
 * (simple random walk, Brownian motion) have no article yet and fall through
 * to "coming soon", same as any other unwritten lesson.
 */
export const stochasticWikiArticles: WikiArticle[] = [
  geometricBrownianMotionWiki,
  ornsteinUhlenbeckProcessWiki,
  blackScholesMertonEquationWiki,
];
