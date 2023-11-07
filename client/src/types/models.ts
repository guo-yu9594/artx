export type User = {
  id: number;
  email: string;
  name: string | null;
  password?: string;
  likedPosts?: number[];
  savedPosts?: number[];
}

export type Post = {
  authorId: number;
  content: string;
  id: number;
  likes: number;
  published: boolean;
  title: string;
  date: string;
  author: User;
  file: any;
};

export type Comment = {
  id: number;
  content: string | null;
  postId: number;
  answerTo: number | null;
  authorId: number;
  date: string;
  author?: User;
}