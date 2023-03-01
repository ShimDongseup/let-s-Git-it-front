export declare module 'Rank';

type Top5Rank = {
  rankerName: string;
  profileImage: string;
  totalScore: number;
};

type Ranking = {
  rankerName: string;
  mainLang: string;
  followerNumber: number;
  myStarNumber: number;
  commitNumber: number;
  totalScore: string;
  tier: string;
  image_url: string;
};
