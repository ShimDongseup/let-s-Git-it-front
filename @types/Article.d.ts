export declare module 'Article';

type ArticleData = {
  postId: number;
  postTitle: string;
  content: string;
  userId: number;
  userName: string;
  userProfileImage: string;
  subCategoryName: string;
  tierId: string;
  createdAt: string;
  ifLiked: boolean;
  isLogin: boolean;
  isAuthor: boolean;
  likes: LikesData[] | null;
};

type LikesData = {
  likeId: number;
  userId: number;
  createdAt: string;
};

type CommentData = {
  commentId: number;
  content: string;
  userName: string;
  profileImageUrl: string;
  tier: string;
  groupOrder: number;
  createdAt: string;
  likeNumber: number;
  isCreatedByUser: boolean;
  isLikedByUser: boolean;
  reComments: ReCommentData[];
};

type ReCommentData = {
  commentId: number;
  userName: string;
  tier: string;
  content: string;
  isCreatedByUser: boolean;
  isLikedByUser: boolean;
};

type UserData = {
  userName: string;
  profileImageUrl: string;
};

type UserProps = {
  userName: string;
  profileImg: string;
  tier: string;
  isLogin: boolean;
  commentNum: number;
  groupOrder: number;
  loadArticleComment(): void;
};

type CommentListProps = {
  commentList: CommentData[];
  setCommentList: React.Dispatch<React.SetStateAction<CommentData[]>>;
  copyCommentList: CommentData[];
  loadArticleComment(): void;
};

type CommentProps = {
  comment: CommentData;
  loadArticleComment(): void;
};

type ReCommentProps = {
  data: ReCommentData;
  loadArticleComment(): void;
};
