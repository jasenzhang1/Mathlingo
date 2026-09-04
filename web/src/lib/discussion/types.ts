/** A thread is either a question someone needs help with, or a problem they're posing to others. */
export type PostKind = "question" | "problem";

export interface Post {
  id: string;
  concept_id: string;
  author_id: string;
  kind: PostKind;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  /** Denormalized from profiles by the posts_with_stats view. */
  author_name: string;
  /** Sum of +1/-1 votes. */
  score: number;
  comment_count: number;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
  body: string;
  created_at: string;
  author_name: string;
}

export type SortMode = "new" | "top";
