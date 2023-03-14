# <p align="center"><b>let's GIT it</b></p>

<p align="center"> 📆 2023.01.11~ 2023.03.02

<br>
<br>
<!-- ## 📼 LET'S GIT IT -->
<h2>let's GIT it 바로가기 : <a href="https://let-s-git-it.vercel.app/">https://let-s-git-it.vercel.app/</a></h2>

<div align="center">
<img src ="https://user-images.githubusercontent.com/100506719/223014450-d4b6f831-b312-482b-8797-8c80d6e649b8.gif" width="600" align="center">
</div>

<br />

## 목표

- 개발 동기부여를 위한 랭킹 서비스
  - 호기심(10%), 열정(20%), 명성(35%), 능력(35%)로 산출된 종합 점수를 토대로 나타낸 github 랭킹 시스템
  - 각각의 지표는 다시 세분화된 지표로 점수 산출
    - 호기심 (10%)
      1. 유저의 이슈 수 (5점)
      2. 유저가 포크를 한 레포지토리 수 (4점)
      3. 유저가 스타를 누른 레포지토리 수 (2점)
      4. 유저가 팔로우 하는 유저의 수 (1점)
    - 열정 (20%)
      1. 유저의 커밋 수 (5점)
      2. 유저의 PR 수 (4점)
      3. 유저가 PR에 남긴 리뷰의 갯수 (2점)
      4. 유저가 생성한 레포지토리 수 (1점)
    - 명성 (35%)
      1. 유저의 팔로워 수 (5점)
      2. 유저의 전체 레포지토리의 포크 수 (4점)
      3. 유저의 전체 레포지토리의 와치 수 (3점)
    - 능력 (35%)
      1. 스폰 받은 수 (5점)
      2. 유저의 전체 레포지토리의 스타 수 (4점)
      3. 유저가 기여한 저장소들의 스타 수 (3점)

## Team let's GIT it

`FE` 김보윤, 박지영, 심동섭, 홍석현 <br>
`BE` 오현상, 이명석, 지송현

<br />

## 담당기능

#### <b>1. 다양한 정렬이 가능한 랭킹 페이지</b>

- <b>th별 오름차순 내림차순 정렬 기능을 추가하여 사용자가 핸들링할 수 있도록 구현하였습니다.</b>

  ```
    const sortRank = (key: string, sort = false) => {
      const sortList = [...currentList];
      const comparator = (name: string, sort: boolean): any => {
        if (!sort)
          return (
            prevRanker: { [x: string]: number },
            nextRanker: { [x: string]: number }
          ) =>
            prevRanker[name] === nextRanker[name]
              ? 0
              : prevRanker[name] < nextRanker[name]
              ? -1
              : 1;
        else {
          return (
            nextRanker: { [x: string]: number },
            prevRanker: { [x: string]: number }
          ) =>
            prevRanker[name] === nextRanker[name]
              ? 0
              : prevRanker[name] < nextRanker[name]
              ? -1
              : 1;
        }
      };
      sortList.sort(comparator(key, sort));
      setCurrentList(sortList);
    };
  ```

- Followers, Contributions, Stars의 정렬을 한번에 관리하기 위해 comparator 함수에서 th의 name 값을 받아서 사용자가 클릭할 때 해당하는 column이 정렬될 수 있도록 하였습니다.
<div align="center">
<img src ="https://user-images.githubusercontent.com/100506719/224889022-0c223490-af5a-4d99-a43b-ded3bae7ffc3.gif" width="600" align="center">
</div>

- select box에서 사용자가 원하는 언어 클릭시 filtering된 데이터를 fetch 하여 세부 랭킹 확인하도록 구현하였습니다.

<br />

#### <b>2. 커뮤니티 글목록 페이지</b>

- 깃헙 활동을 하는 유저들이 모여서 다양한 정보를 공유하는 커뮤니티 탭으로 커뮤니티 카테고리 별로 community list를 요청합니다.
- 최신순/인기순을 구분하는 sort, 인기순에서 기간별 조회를 구분하는 date, pagination을 구분하는 offset과 limit, 검색 목록 조회를 구분하는 option과 keyword를 쿼리 스트링으로 관리하여 사용자가 원하는 조건을 편하게 핸들링할 수 있도록 구현하였습니다.
- <b>Recoil을 사용하여 유저가 선택한 카테고리 state를 전역으로 관리, articleList 뿐만 아니라 `article 상세 페이지` 및 `마이페이지 내가 쓴 글 목록`에서 선택한 카테고리를 지속적으로 업데이트 합니다.</b>

- 배포 후 개선 사항

  - 사용자가 링크로 글 공유시, 카테고리 id 값이 변하도록 설정하지 않아 default 값으로 공유되는 현상 발생 => id 값을 params를 통해 변경할 수 있도록 수정했습니다.
    ```
    const categoryId = Number(params.id);
    useEffect(() => {
      setSelectActive(categoryId);
      ...
      articleFetch();
    }, [categoryId]);
    ```

<br />

#### <b>3. 글 검색 및 하이라이트 기능</b>

- 제목, 글쓴이, 제목+글쓴이의 검색 옵션과 검색 키워드에 해당하는 글 목록 조회 기능을 구현하였습니다.
- 배포 후 개선사항

  - 사용자의 피드백에 따라 검색 키워드에 대한 하이라이트 표시를 해주었습니다.
  - 사용자의 피드백에 따라 특수문자 검색에 대해 처리해주는 정규표현식 로직을 추가하였습니다.

    ```
    // 특수문제 제어 로직
      const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^$`~'":<>{}()|[\]\\]/g, '\\$&');
      };

    // 키워드와 키워드가 아닌 것에 대한 구분 로직
    const getHighlightedText = (text: string, highlight: string) => {
      const escapedHighlight = escapeRegExp(highlight);
      const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
    }

    // 제목, 글쓴이, 제목+글쓴이 경우에 대한 조건 처리
    {searchOption === 'author'
      ? getHighlightedText(article.userName, searchKeyword)
      : searchOption === 'title_author'
      ? getHighlightedText(article.userName, searchKeyword)
      : article.userName}

    {searchOption === 'title'
      ? getHighlightedText(article.post_title, searchKeyword)
      : searchOption === 'title_author'
      ? getHighlightedText(article.post_title, searchKeyword)
      : article.post_title}
    ```

<div align="center">
<img src ="https://user-images.githubusercontent.com/100506719/224919195-5af789fc-537b-4585-9b6c-d39d3ef01530.gif" width="600" align="center">
</div>

<br />

## Tools

- `Notion`, `Trello`, `Github`, `Slack`

<br />

## 기술스텍

- 💻 FE:
  - `JavaScript`, `React`, `SCSS`, `TypeScript`

## <br />

---

## 회고 및 느낀점

- <a href="https://blog.naver.com/zhwltlr/223031869959">let's GIT it 회고 (blog)</a>
- 글 목록 페이지에서 사용자가 다양한 활동을 할 수 있게 쿼리스트링으로 많은 조건 처리를 해주었습니다. 구현을 하다보니 뒤로가기가 되지 않는 것을 알게 되었고 무분별하게 searchParams를 사용한 것을 깨달았습니다. 한줄 한줄 헛되이 사용되는 코드가 없도록 더 유념해야겠다는 것을 느꼈습니다.
- 사용자의 실제 피드백을 통해 크고 작은 실수 및 오류들을 발견하는 것이 신기하였고 오류를 팀원들과 같이 머리를 맞대며 해결해 나가는 것이 즐거운 경험이 되었습니다.
- <b><a href="https://let-s-git-it.vercel.app/"> 아직 이용해보지 않으셨나요?? 꼭 이용해보세요!!</a></b>

---
