import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './ArticleWrite.scss';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';

type ArticleType = {
  category: string;
  title: string;
  content: string;
};
type ModuleType = {
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

function AriticleModify() {
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const quillRef = useRef<ReactQuill>(); // 에디터 접근을 위한 ref return (
  const [article, setArticle] = useState<ArticleType>({
    category: '',
    title: '',
    content: '',
  });
  useEffect(() => {
    // 수정할 글 불러오기
    axios
      .get(`/community/posts/${postId}`)
      .then((res): void => {
        setArticle({
          ...article,
          category: res.data.subCategory,
          title: res.data.title,
          content: res.data.content,
        });
      })
      .catch((err): void => console.log(err));
  }, []);
  // 이미지를 업로드 하기 위한 함수
  const imageHandler = (): void => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement('input');
    const formData = new FormData();
    let url = '';

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append('image', file[0]);
        axios
          .post('첨부받은 이미지를 서버로 보내는 api주소')
          .then((res): void => {
            url = '서버로부터받은이미지url'; //url = res.data.url
            const range = quillRef.current?.getEditor().getSelection()?.index;
            if (range !== null && range !== undefined) {
              let quill = quillRef.current?.getEditor();

              quill?.setSelection(range, 1);

              quill?.clipboard.dangerouslyPasteHTML(
                range,
                `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
              );
            }
          })
          .catch((err): void => alert(err));
      }
    };
  };
  // Quill 에디터에서 사용하고싶은 모듈들을 설정한다.
  // useMemo를 사용해 modules를 만들지 않는다면 매 렌더링 마다 modules가 다시 생성된다.
  // 그렇게 되면 addrange() the given range isn't in document 에러가 발생한다.
  // -> 에디터 내에 글이 쓰여지는 위치를 찾지 못하는듯
  const modules = useMemo((): ModuleType => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          ['image'],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
    };
  }, []);

  // 위에서 설정한 모듈들 foramts을 설정한다
  const formats: string[] = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
  ];

  const onValue = (e: string): void => {
    setArticle({ ...article, content: e });
  };
  const registerArticle = (): void => {
    if (article.category === '카테고리') {
      alert('카테고리를 선택해주세요.');
    } else if (article.title === '') {
      alert('제목을 입력해 주세요.');
    } else if (article.content === '' || article.content === '<p><br></p>') {
      alert('게시글을 작성해주세요.');
    } else {
      axios
        .put(`/community/post/${postId}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token') as string,
          },
          data: {
            subCategoryId: article.title,
            title: article.title,
            content: article.content,
          },
        })
        .then((res): void => {
          if (res.status !== 201) {
            throw Error('글수정에 실패하였습니다.');
          } else {
            alert('글이 수정되었습니다.');
            navigate(-1);
          }
        })
        .catch((): void => alert('글수정에 실패하였습니다.'));
    }
  };
  console.log(article);
  return (
    <div className="wrapper">
      <div className="wrapWrite">
        <h2>글수정</h2>
        <div className="choiceChange">
          <div className="choiceMenu">
            <Form.Select
              className="selected"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                setArticle({ ...article, category: e.target.value })
              }
            >
              <option
                value="카테고리"
                selected={article.category === '카테고리' ? true : false}
              >
                카테고리
              </option>
              <option
                value="자유"
                selected={article.category === '자유' ? true : false}
              >
                자유
              </option>
              <option
                value="유머"
                selected={article.category === '유머' ? true : false}
              >
                유머
              </option>
              <option
                value="질문"
                selected={article.category === '질문' ? true : false}
              >
                질문
              </option>
              <option
                value="프로젝트"
                selected={article.category === '프로젝트' ? true : false}
              >
                프로젝트
              </option>
              <option
                value="채용정보"
                selected={article.category === '채용정보' ? true : false}
              >
                채용정보
              </option>
            </Form.Select>
          </div>
        </div>
        <input
          className="titleInput"
          type="text"
          placeholder="제목"
          value={article.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setArticle({ ...article, title: e.target.value })
          }
        />
        <ReactQuill
          className="textInput"
          ref={element => {
            if (element !== null) {
              quillRef.current = element;
            }
          }}
          theme="snow"
          placeholder={
            '불법촬영물등을 게재할 경우 전기통신사업법 제22조의 5제1항에 따라 삭제,접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을 수 있습니다.'
          }
          modules={modules}
          formats={formats}
          value={article.content}
          onChange={onValue}
        />
        <button className="cancleBtn" onClick={(): void => navigate(-1)}>
          취소
        </button>

        <button className="registerBtn" onClick={(): void => registerArticle()}>
          수정
        </button>
      </div>
    </div>
  );
}

export default AriticleModify;
