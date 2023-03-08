import { atom } from 'recoil';

const categoryState = atom({
  key: 'categoryState',
  default: 4,
});

const articleSearchOption = atom({
  key: 'articleSearchOption',
  default: '',
});

const articleSearchKeyword = atom({
  key: 'articleSearchKeyword',
  default: '',
});

const currentPage = atom({
  key: 'currentPage',
  default: 1,
});

const commentOption = atom({
  key: 'commentOption',
  default: 0,
});

export {
  categoryState,
  articleSearchOption,
  articleSearchKeyword,
  currentPage,
  commentOption,
};
