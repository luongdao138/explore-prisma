import client from './client';

export interface Post {
  id: string;
  title: string;
}
export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface PostComment {
  id: string;
  message: string;
  parentId: string | null;
  user: Author;
  createdAt: Date;
}

export interface PostDetail extends Post {
  body: string;
  author: Author;
  comments: PostComment[];
  createdAt: Date;
}

interface GetPostsResponse {
  data: Post[];
}

interface GetPostDetailResponse {
  data: PostDetail;
}

interface CreateCommentParams {
  message: string;
  parentId: string | null;
  postId: string;
}

interface CreateCommentResponse {
  data: PostComment;
}

export const getAllPosts = async (): Promise<GetPostsResponse> => {
  const res = await client.get<GetPostsResponse>('/posts');

  return res.data;
};

export const getPostDetail = async (
  id: string
): Promise<GetPostDetailResponse> => {
  const res = await client.get<GetPostDetailResponse>(`/posts/${id}`);

  return res.data;
};

export const createComment = async (
  params: CreateCommentParams
): Promise<CreateCommentResponse> => {
  const res = await client.post<CreateCommentResponse>(
    `/posts/${params.postId}/comments`,
    params
  );
  return res.data;
};
