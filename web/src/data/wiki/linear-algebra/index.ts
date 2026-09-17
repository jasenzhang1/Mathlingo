import type { WikiArticle } from "../types";

/**
 * Every linear algebra article, in one chunk.
 *
 * Loaded on demand by ../index.ts when a learner opens a linear algebra lesson,
 * so no other domain's articles are fetched. Add new articles here.
 */
import { basis } from "./basis";
import { cauchySchwarz } from "./cauchy-schwarz";
import { changeOfBasis } from "./change-of-basis";
import { choleskyDecomposition } from "./cholesky-decomposition";
import { columnSpace } from "./column-space";
import { determinant } from "./determinant";
import { determinantProperties } from "./determinant-properties";
import { diagonalization } from "./diagonalization";
import { disjointnessFourFundamentalSubspaces } from "./disjointness-four-fundamental-subspaces";
import { dotProduct } from "./dot-product";
import { eckartYoung } from "./eckart-young";
import { eigendecomposition } from "./eigendecomposition";
import { eigenvaluesEigenvectors } from "./eigenvalues-eigenvectors";
import { fourFundamentalSubspaces } from "./four-fundamental-subspaces";
import { gramSchmidt } from "./gram-schmidt";
import { idempotentMatrices } from "./idempotent-matrices";
import { invertibleMatrices } from "./invertible-matrices";
import { kroneckerProduct } from "./kronecker-product";
import { leftNullSpace } from "./left-null-space";
import { linearDependence } from "./linear-dependence";
import { linearTransformations } from "./linear-transformations";
import { luDecomposition } from "./lu-decomposition";
import { matmulFourFundamentalSubspaces } from "./matmul-four-fundamental-subspaces";
import { matrices } from "./matrices";
import { matrixCalculus } from "./matrix-calculus";
import { matrixMultiplication } from "./matrix-multiplication";
import { matrixNorms } from "./matrix-norms";
import { moorePenroseInverse } from "./moore-penrose-inverse";
import { nullSpace } from "./null-space";
import { orthogonalMatrices } from "./orthogonal-matrices";
import { orthogonalVectors } from "./orthogonal-vectors";
import { orthonormalBasis } from "./orthonormal-basis";
import { pcaMatrixEdition } from "./pca-matrix-edition";
import { positiveDefiniteMatrices } from "./positive-definite-matrices";
import { qrDecomposition } from "./qr-decomposition";
import { rankNullityTheorem } from "./rank-nullity-theorem";
import { rank } from "./rank";
import { rayleighQuotient } from "./rayleigh-quotient";
import { rowSpace } from "./row-space";
import { span } from "./span";
import { spectralTheorem } from "./spectral-theorem";
import { subspaceOperations } from "./subspace-operations";
import { svd } from "./svd";
import { svdFourFundamentalSubspaces } from "./svd-four-fundamental-subspaces";
import { symmetricMatrices } from "./symmetric-matrices";
import { trace } from "./trace";
import { uniquenessOfSvd } from "./uniqueness-of-svd";
import { vectorAngles } from "./vector-angles";
import { vectorNorm } from "./vector-norm";
import { vectorOperations } from "./vector-operations";
import { vectorProjection } from "./vector-projection";
import { vectorSpaces } from "./vector-spaces";
import { vectors } from "./vectors";

const articles: WikiArticle[] = [
  basis,
  cauchySchwarz,
  changeOfBasis,
  choleskyDecomposition,
  columnSpace,
  determinant,
  determinantProperties,
  diagonalization,
  disjointnessFourFundamentalSubspaces,
  dotProduct,
  eckartYoung,
  eigendecomposition,
  eigenvaluesEigenvectors,
  fourFundamentalSubspaces,
  gramSchmidt,
  idempotentMatrices,
  invertibleMatrices,
  kroneckerProduct,
  leftNullSpace,
  linearDependence,
  linearTransformations,
  luDecomposition,
  matmulFourFundamentalSubspaces,
  matrices,
  matrixCalculus,
  matrixMultiplication,
  matrixNorms,
  moorePenroseInverse,
  nullSpace,
  orthogonalMatrices,
  orthogonalVectors,
  orthonormalBasis,
  pcaMatrixEdition,
  positiveDefiniteMatrices,
  qrDecomposition,
  rankNullityTheorem,
  rank,
  rayleighQuotient,
  rowSpace,
  span,
  spectralTheorem,
  subspaceOperations,
  svd,
  svdFourFundamentalSubspaces,
  symmetricMatrices,
  trace,
  uniquenessOfSvd,
  vectorAngles,
  vectorNorm,
  vectorOperations,
  vectorProjection,
  vectorSpaces,
  vectors,
];

export default articles;
