export interface Blog {
  blogId: number;
  title: string;
  content: string;
  thumbnail: string;
  authorName: string;
  createdAt: string;
}

export interface BlogDetail {
  blogId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  authorName: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
}
export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
}
