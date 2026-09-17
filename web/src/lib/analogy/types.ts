export interface Analogy {
  id: string;
  concept_id: string;
  author_id: string;
  body: string;
  created_at: string;
  updated_at: string;
  /** Denormalized from profiles by the analogies_with_stats view. */
  author_name: string;
  /** Sum of +1/-1 votes. */
  score: number;
  comment_count: number;
}

export interface AnalogyComment {
  id: string;
  analogy_id: string;
  author_id: string;
  parent_id: string | null;
  body: string;
  created_at: string;
  author_name: string;
}

export type SortMode = "new" | "top";
