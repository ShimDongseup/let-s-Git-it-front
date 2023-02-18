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

const categoryCount = atom({
  key: 'categoryCount',
  default: 0,
});

const currentPage = atom({
  key: 'currentPage',
  default: 1,
});

export {
  categoryState,
  articleSearchOption,
  articleSearchKeyword,
  currentPage,
};
