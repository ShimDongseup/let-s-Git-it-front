const FOOTER_LIST = [
  {
    id: 1,
    title: 'Account',
    list: [
      { id: 1, listTitle: 'Login', path: '/login' },
      { id: 2, listTitle: 'Join', path: '/signup' },
      { id: 3, listTitle: 'Mypage', path: '/mypage' },
    ],
  },
  {
    id: 2,
    title: 'Rank',
    list: [
      { id: 1, listTitle: 'TOP 100', path: '/rank' },
      { id: 2, listTitle: 'Compare', path: '/compare' },
    ],
  },
  {
    id: 3,
    title: 'Community',
    list: [
      { id: 1, listTitle: 'Community', path: '/articleList' },
      { id: 2, listTitle: 'Dev News', path: '/articleList/2' },
      { id: 3, listTitle: 'Report', path: '/articleList/3' },
    ],
  },
];

export default FOOTER_LIST;
