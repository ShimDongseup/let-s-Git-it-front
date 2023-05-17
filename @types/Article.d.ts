export declare module 'Article';

type ArticleData = {
  postId: number;
  postTitle: string;
  content: string;
  userId: number;
  userName: string;
  userProfileImage: string;
  subCategoryName: string;
  subCategoryId: number;
  tierName: string;
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
  createdAt: string;
  groupOrder: number;
  isCreatedByUser: boolean;
  isLikedByUser: boolean;
};

type UserData = {
  userName: string;
  profileImageUrl: string;
  tierName: string;
};

type ArticleWriteType = {
  category: string | number;
  title: string;
  content: string;
};

type ArticleModifyType = {
  category: string | number;
  title: string;
  content: string;
  postId: number;
};

type QuillModuleType = {
  toolbar: {
    container: (
      | string[]
      | {
          header: (number | boolean)[];
        }[]
    )[];
    handlers: {
      image: () => void;
    };
  };
};

type CommentInputProps = {
  isLogin: boolean;
  commentNum: number;
  groupOrder: number;
  fetchComment(): void;
};

type ShareProps = {
  postTitle: string;
  createdAt: string;
  userName: string;
};

type CommentListProps = {
  commentList: CommentData[];
  fetchComment(): void;
};

type CommentProps = {
  comment: CommentData;
  fetchComment(): void;
};

type ReCommentProps = {
  data: ReCommentData;
  fetchComment(): void;
};
