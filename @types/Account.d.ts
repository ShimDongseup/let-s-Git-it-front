export declare module 'Account';

type CategoryType = {
  field: {
    id: number;
    name: string;
  }[];
  career: {
    id: number;
    period: string;
  }[];
};

type SignupUserType = {
  isKorean: number | boolean;
  fieldId: number;
  careerId: number;
};

type MyPageUserType = {
  userName: string;
  profileText: string;
  profileImageUrl: string;
  email: string;
  careerId: number;
  fieldId: number;
  isKorean: number | boolean;
  tierName: string;
  posts: {
    id: number;
    title: string;
    subCategory: string;
    createdAt: string;
    commentNumber: number;
    likeNumber: number;
  }[];
};
