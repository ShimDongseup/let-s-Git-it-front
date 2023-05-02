import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { searchResults } from '../../../@types/Search';
import Search from './Search';

export default function SearchContainer() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<searchResults[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navi = useNavigate();

  // 검색결과 받기
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    await axios
      // .get(`${BASE_URL}/ranks/search?userName=${e.target.value}`)
      .get(`/ranks/search?userName=${e.target.value}`)
      .then(res => {
        setResults(res.data);
      });
  };

  // 엔터키 눌렀을 때
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navi(`/userdetail/${search}`);
      setSearch('');
    }
  };

  // 모달창 영역 밖 클릭 시 창 꺼짐
  useEffect(() => {
    const clickOutside = (e: any): void => {
      if (!searchRef.current?.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [searchRef]);

  return <Search handleInput={handleInput} handleKeyDown={handleKeyDown} />;
}
