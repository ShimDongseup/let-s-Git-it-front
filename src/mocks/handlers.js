import { rest } from 'msw';
import { BASE_URL } from '../config';

export const handlers = [
  // Match a GET request to a third-party server.
  rest.get(`${BASE_URL}/ranks/MatheGoD`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        rankerDetail: {
          rankerId: 178,
          rankerName: 'MatheGoD',
          profileImage: 'https://avatars.githubusercontent.com/u/110371295?v=4',
          blog: 'https://velog.io/@mathe1303',
          email: null,
          company: 'The nation called Freedom',
          region: 'Korea',
          mainLang: 'JavaScript',
          curiosityScore: '2.4000',
          passionScore: '161.2000',
          fameScore: '6.3000',
          abilityScore: '1.4000',
          totalScore: '171.0000',
          issueNumber: 0,
          forkingNumber: 3,
          starringNumber: 3,
          followingNumber: 6,
          commitNumber: 113,
          prNumber: 58,
          reviewNumber: 1,
          personalRepoNumber: 7,
          followerNumber: 3,
          forkedNumber: 0,
          watchedNumber: 1,
          default: null,
          sponsorNumber: 0,
          contributingRepoStarNumber: 0,
          myStarNumber: 1,
          tier: 'bronze',
          tierImage: null,
        },
      })
    );
  }),
];
