import { atom } from 'recoil';

const categoryState = atom({
  key: 'categoryState',
  default: 4,
});

export { categoryState };
