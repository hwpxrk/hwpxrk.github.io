# 초록 사이트 작업 안내

이 사이트는 기존 Jekyll 프로젝트와 초록 로고·favicon·메뉴·소개 문구를 기반으로 구성합니다. [네이버피셜](https://fficial.naver.com/)의 큰 타이포그래피, 편집형 콘텐츠 배치, 캐러셀, 검색과 전체 메뉴 구조를 참고합니다. 네이버의 기사, 인물, 로그인·구독 서비스는 초록의 콘텐츠로 사용하지 않습니다.

## 구조

- `index.html`: 초록 홈페이지.
- `_layouts/green.html`: 초록 페이지의 공통 문서·헤더·푸터.
- `_layouts/green-article.html`: 소개, 후보자, 출마의 변, 공약, 필진의 공통 본문 레이아웃.
- `_data/green.yml`: 홈페이지 이야기 목록과 세 개의 대표 슬라이드. 제목·설명·링크·분류·그림 키를 관리합니다.
- `_pages/green-*.md`: 실제 Markdown 본문과 페이지 메타데이터.
- `_includes/green/artwork.html`: 본문과 카드에 공통으로 사용하는 그림.
- `assets/css/green.css`: 데스크톱·태블릿·모바일 공통 스타일.
- `assets/js/green/main.js`: 검색, 대화상자, 슬라이드, 콘텐츠 레일, 상단 이동.
- `assets/src/green/`: 기존 초록 로고와 favicon.
- `_data/navigation.yml`: 사용자가 작성한 다섯 개 메뉴.

기존 Minimal Mistakes 레이아웃과 Asterisk 자산은 다른 기존 페이지를 위해 유지합니다. 초록 본문 페이지의 `green_key`는 데이터 항목의 `key` 및 그림의 `kind`와 일치해야 합니다. `green_order`는 소개, 후보자, 출마의 변, 공약, 필진 순서로 1부터 5까지 지정되어 있습니다.

## 본문 작성

| 페이지 | 편집 파일 | 주소 |
| --- | --- | --- |
| 초록 | `_pages/green-abstract.md` | `/abstract/` |
| 후보자 | `_pages/green-introduction.md` | `/introduction/` |
| 출마의 변 | `_pages/green-statement.md` | `/statement/` |
| 공약 | `_pages/green-dreams.md` | `/dreams/` |
| 필진 | `_pages/green-writers.md` | `/writers/` |

각 파일의 마지막 `TEST`를 실제 Markdown 본문으로 바꾸면 본문이 표시됩니다. `TEST`만 있거나 본문이 비어 있으면 화면에 준비 중 안내를 표시합니다. 원본의 제목, 설명, 본문 `TEST`는 그대로 보존했으며 실제 후보자 이름, 상세 공약, 일정, 성과를 임의로 추가하지 않았습니다.

후보자 페이지의 Instagram 링크는 `_config.yml`의 `author.links`를 사용합니다. 이름이나 링크를 추가할 때는 실제 확인된 정보를 입력합니다. 목록 카드와 본문 제목·설명을 함께 바꾸려면 해당 Markdown 파일과 `_data/green.yml`의 같은 `key` 항목을 모두 수정합니다.

## 원본 파일 이동

원래 `_posts/abstract.md`, `introduction.md`, `statement.md`, `dreams.md`, `writers.md`는 Jekyll 게시글의 날짜 파일명 규칙을 충족하지 않아 페이지가 생성되지 않았습니다. 내용과 목적에 맞게 `_pages/green-*.md`로 이동했습니다.

- 원본 다섯 파일의 변경 전 사본: `/tmp/chorok-original-posts/`.
- 제목, 설명, category, tag, 본문 `TEST`: 보존.
- layout: `single`에서 `green-article`로 변경.
- `green_key`, `green_order`: 추가.
- 필진 permalink: 중복된 `/abstract/`에서 메뉴에 맞는 `/writers/`로 수정.

`/tmp` 사본은 작업 중 확인용이며 장기 백업을 대신하지 않습니다. 유지할 원본 콘텐츠는 이동된 `_pages` 파일에 있습니다.

## 로컬 실행과 검증

프로젝트 루트에서 기존 Ruby/Bundler 환경으로 실행합니다.

```sh
bundle check
JEKYLL_ENV=production bundle exec jekyll build --destination /tmp/chorok-preview --strict_front_matter
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

브라우저에서 `http://127.0.0.1:4000/`을 열어 홈페이지와 위 다섯 주소를 확인합니다. 하위 경로에 게시할 때는 `baseurl`을 지정한 빌드에서도 이미지·메뉴·검색 결과 링크가 해당 경로를 포함하는지 확인합니다. 기본 주소의 빌드 성공만으로 실제 브라우저 동작이나 배포 성공을 의미하지는 않습니다.

게시 전에는 실제 콘텐츠 입력, 모바일 메뉴·검색·슬라이드·키보드 조작, 외부 링크, 좁은 화면의 줄바꿈을 확인합니다. 이 작업 안내 자체는 GitHub push나 Sites 배포를 수행하지 않습니다.

## 이번 구현의 검증 결과

2026-11-14 로컬 작업 기준입니다.

- Jekyll production 빌드와 `/council` baseurl 빌드: 통과.
- 홈페이지와 상세 페이지 5개: 생성 및 HTTP 응답 확인.
- 두 빌드의 내부 링크·자산·검색 결과·fragment 각각 289개: 누락 0개, baseurl 이탈 0개.
- 여섯 페이지의 검색 JSON: 각각 다섯 항목으로 정상 파싱. 중복 HTML ID 없음.
- 기존 HTML 11개와 기존 CSS·JS 자산: 변경 전 빌드와 동일.
- JavaScript 구문, CSS 파싱, 변경 파일 공백 검사: 통과.
- Chrome 데스크톱 첫 화면, Safari 데스크톱 및 320px·390px iframe 화면: 직접 확인.
- Safari 검색 결과·빈 결과, Escape 닫기, 수동 슬라이드 전환, 모바일 메뉴에서 필진 페이지 이동: 직접 확인.
- Safari의 초기 애니메이션 중 본문이 가려지는 현상을 피하도록 등장 효과에서 투명도 변경을 제거했습니다.

모바일 너비 검증은 데스크톱 Safari의 고정 너비 iframe으로 수행했으며 실제 휴대전화·터치 제스처 검증은 아닙니다. 자동 재생의 포커스·호버 상태는 임시 모의 DOM 검사도 사용했습니다. 로그인·구독·음성 콘텐츠 등 네이버 계정/서버에 의존하는 기능은 추가하지 않았습니다. 확정 후보자 정보와 공약 본문은 기존 원고가 준비되면 입력해야 합니다. Git commit, push, 원격 배포는 수행하지 않았습니다.
