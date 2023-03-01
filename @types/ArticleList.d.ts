export declare module 'ArticleList';

type Category = {
  id: number;
  name: string;
  mainCategoryId: number;
};

type ArticleType = {
  postId: number;
  post_title: string;
  createdAt: string;
  userName: string;
  tierName: string;
  comment: number;
  postLike: number;
  subCategoryName: string;
  userId: number;
  title: string;
};

type NewsType = {
  post_title: string;
  post_content: string;
  createdAt: string;
  imageUrl: string;
  newsUrl: string;
};

type NewsProp = {
  newsList: NewsType[];
};

type ArticleProps = {
  key: number;
  article: ArticleType;
};
