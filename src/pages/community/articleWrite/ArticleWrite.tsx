import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import './ArticleWrite.scss';
import 'react-quill/dist/quill.snow.css';

function ArticleWrite() {
  const [value, setValue] = useState();
  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
  const onChange = (e: any) => {
    // e 값을 무엇으로 설정해야할까요?
    // 일단 모를떄는 any 로 설정합니다.
  };
  return (
    <div className="wrapper">
      <div className="wrapWrite">
        <h2>글쓰기</h2>
        <div className="choiceChange">
          <div className="choiceMenu">
            <div className="selected">
              카테고리 선택
              <div className="downIcon material-symbols-outlined">
                expand_more
              </div>
            </div>
            <ul className="dropDown">
              <li>자유</li>
              <li>유머</li>
              <li>지문</li>
              <li>프로젝트</li>
              <li>채용정보</li>
            </ul>
          </div>
        </div>
        <input className="titleInput" type="text" placeholder="제목" />
        <ReactQuill
          className="textInput"
          theme="snow"
          placeholder={
            '불법촬영물등을 게재할 경우 전기통신사업법 제22조의 5제1항에 따라 삭제,접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을 수 있습니다.'
          }
          modules={modules}
          formats={formats}
          // value={value}
          // onChange={onChange}
        />
        <button className="cancleBtn">취소</button>

        <button className="registerBtn">게시</button>
      </div>
    </div>
  );
}

export default ArticleWrite;
