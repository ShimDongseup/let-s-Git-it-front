import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Form from 'react-bootstrap/Form';
import { BASE_URL } from '../../../config';
import { ArticleModifyType, QuillModuleType } from '../../../../@types/Article';
import 'react-quill/dist/quill.snow.css';
import './ArticleWrite.scss';

function AriticleModify() {
  const [gotUrl, setGotUrl] = useState<string[]>();
  const [newUrl, setNewUrl] = useState<string[]>([]);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const quillRef = useRef<ReactQuill>(); // 에디터 접근을 위한 ref return (
  const [article, setArticle] = useState<ArticleModifyType>({
    category: '',
    title: '',
    content: '',
    postId: 0,
  });
  const [textLength, setTextLength] = useState<number>(0);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      alert('로그인이 필요한 서비스입니다.');
      navigate(-1);
    } else {
      // 수정할 글 불러오기
      axios
        // .get(`${BASE_URL}/community/posts/${postId}`, {
        .get(`/community/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res): void => {
          if (res.data.isAuthor) {
            setArticle({
              ...article,
              category: res.data.subCategoryId,
              title: res.data.postTitle,
              content: res.data.content,
              postId: res.data.postId,
            });
            //img 태그에서 url만 뽑아서 추출
            const regex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
            const urls: string[] = []; //추출된 url들이 담기는 배열
            let match;
            while ((match = regex.exec(res.data.content)) !== null) {
              urls.push(match[1]);
            }
            setGotUrl(urls);
          } else {
            alert('잘못된 접근입니다.');
            navigate(-1);
          }
        })
        .catch((err): void => console.log(err));
    }
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
        if (file[0].size <= 5 * 1024 * 1024) {
          formData.append('image', file[0]);
          axios
            // .post(`${BASE_URL}/community/post/image`, formData, {
            .post(`/community/post/image`, formData, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((res): void => {
              url = res.data; //url = res.data.url
              const urlArr = gotUrl;
              urlArr?.push(url);
              setGotUrl(urlArr);
              const recieveUrl = newUrl;
              recieveUrl?.push(url);
              setNewUrl(recieveUrl);
              const range = quillRef.current?.getEditor().getSelection()?.index;
              if (range !== null && range !== undefined) {
                let quill = quillRef.current?.getEditor();

                quill?.setSelection(range, 1);

                quill?.clipboard.dangerouslyPasteHTML(
                  range,
                  `<img src=${url} alt="alticle image" />`
                );
              }
            })
            .catch((err): void => alert(err));
        } else {
          alert('5MB 이하의 이미지만 업로드할 수 있습니다.');
        }
      }
    };
  };
  // Quill 에디터에서 사용하고싶은 모듈들을 설정한다.
  // useMemo를 사용해 modules를 만들지 않는다면 매 렌더링 마다 modules가 다시 생성된다.
  // 그렇게 되면 addrange() the given range isn't in document 에러가 발생한다.
  // -> 에디터 내에 글이 쓰여지는 위치를 찾지 못하는듯
  const modules = useMemo((): QuillModuleType => {
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
    } else if (article.title.length > 50) {
      alert('제목을 50자 이하로 작성해주세요.');
    } else if (textLength > 5000) {
      alert('게시글을 5000자 이하로 작성해주세요.');
    } else {
      //img 태그에서 url만 뽑아서 추출
      const regex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
      const urls: string[] = []; //추출된 url들이 담기는 배열
      let match;
      while ((match = regex.exec(article.content)) !== null) {
        urls.push(match[1]);
      }
      let deleteUrl: string[] = []; //최종적으로 안쓰인 url들의 배열
      gotUrl?.map(str => {
        if (!urls.includes(str)) {
          const cutUrl = str.substring(49);
          deleteUrl.push(str);
        }
      });
      //글 수정 api
      axios
        .put(
          // `${BASE_URL}/community/posts/update/${postId}`,
          `/community/posts/update/${postId}`,
          {
            subCategoryId: Number(article.category),
            title: article.title,
            content: article.content,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res): void => {
          if (res.status !== 200) {
            throw Error('글수정에 실패하였습니다.');
          } else {
            axios
              .delete(
                // `${BASE_URL}/community/post/image`,
                `/community/post/image`,

                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                  data: { toDeleteImage: deleteUrl },
                }
              )
              .then(res => {
                if (res.status !== 200) {
                  throw Error('이미지 삭제에 실패하였습니다.');
                } else {
                  alert('글이 수정되었습니다.');
                  navigate(`/article/${article.postId}`);
                }
              })
              .catch(error => {
                console.error(error);
              });
          }
        })
        .catch((): void => alert('글수정에 실패하였습니다.'));
    }
  };

  //페이지를 벗어날때 작동하는 함수
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    // 사용자에게 메시지를 표시하지 않도록 설정합니다.
    event.preventDefault();
    event.returnValue = '';
    const deleteUrl = newUrl.map(str => {
      const cutUrl = str.substring(49);
      return cutUrl;
    });
    axios
      // .delete(`${BASE_URL}/community/post/image`, {
      .delete(`/community/post/image`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { toDeleteImage: deleteUrl },
      })
      .then(res => {
        if (res.status !== 200) {
          throw Error('이미지 삭제 실패');
        } else {
          setArticle({
            ...article,
            content: '기존 글을 수정하시려면 새로고침을 진행해주세요...',
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="wrapper">
      <main className="wrapWrite">
        <h2 className="writeTitle">글수정</h2>
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
                value="4"
                selected={article.category === 4 ? true : false}
              >
                자유
              </option>
              <option
                value="5"
                selected={article.category === 5 ? true : false}
              >
                개발
              </option>
              <option
                value="6"
                selected={article.category === 6 ? true : false}
              >
                프로젝트
              </option>
              <option
                value="7"
                selected={article.category === 7 ? true : false}
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
          style={
            article.title.length > 50
              ? { borderColor: '#e43126' }
              : { borderColor: '#a4a1a6' }
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
          placeholder="불법촬영물등을 게재할 경우 전기통신사업법 제22조의 5제1항에 따라 삭제,접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을 수 있습니다."
          modules={modules}
          formats={formats}
          value={article.content}
          onChange={(content, delta, source, editor) => {
            onValue(content);
            const length = editor.getLength() - 1;
            setTextLength(length);
          }}
        />
        <div className="countContent">
          <span
            style={
              textLength > 5000 ? { color: '#e43126' } : { color: '#4a4a4a' }
            }
          >
            {textLength}
          </span>
          /5000
        </div>
        <button className="cancleBtn" onClick={(): void => navigate(-1)}>
          취소
        </button>

        <button className="registerBtn" onClick={(): void => registerArticle()}>
          수정
        </button>
      </main>
    </div>
  );
}

export default AriticleModify;
