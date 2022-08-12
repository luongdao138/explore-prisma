import client from "./client";

export interface Post {
     id: string;
     title: string
}

interface GetPostsResponse {
     data: Post[]
}

export const getAllPosts = async (): Promise<GetPostsResponse> => {
      const res = await client.get<GetPostsResponse>('/posts')

      return res.data;
}