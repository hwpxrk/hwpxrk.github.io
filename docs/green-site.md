# 초록 사이트 작업 안내

이 사이트는 기존 Jekyll 프로젝트와 초록 로고·favicon·메뉴·소개 문구를 기반으로 구성합니다. [네이버피셜](https://fficial.naver.com/)의 큰 타이포그래피, 편집형 콘텐츠 배치, 캐러셀, 검색과 전체 메뉴 구조를 참고합니다. 네이버의 기사, 인물, 로그인·구독 서비스는 초록의 콘텐츠로 사용하지 않습니다.

## 구조

- `index.html`: 초록 홈페이지.
- `_layouts/green.html`: 초록 페이지의 공통 문서·헤더·푸터.
- `_layouts/green-article.html`: 소개, 후보자, 출마의 변, 공약, 필진, 후보자 한마디의 공통 본문 레이아웃.
- `_data/green.yml`: 표시 개수 설정만 관리합니다. `popular_limit: 6`은 홈페이지 이야기 가이드의 최대 개수, `related_limit: 3`은 본문 아래 관련 글의 최대 개수입니다.
- `_pages/green-*.md`: 실제 Markdown 본문과 공통 콘텐츠 정보의 원본입니다. 제목·설명·게시일·작성자·분류·주소와 홈페이지 표시 여부를 각 파일의 front matter에서 관리합니다.
- `_includes/green/content-data.html`: `green_key`가 있는 페이지를 모아 `green_order`로 정렬하고 홈페이지 글·대표 글 목록을 구성합니다. 필진 목록 `green_writers`는 필진 페이지의 `writers` 배열을 사용합니다.
- `_includes/green/hero.html`: 대표 게시글, 카드 썸네일, 본문 표지에 공통으로 사용하는 로고·포스터 문구·배경. 전달받은 페이지의 `green_artwork`, `green_key`, `green_cover_lines`를 사용하며, 표시 크기는 CSS에서 조절합니다.
- `_includes/green/card.html`: 홈페이지 콘텐츠 카드. 같은 페이지의 제목·설명·분류와 이미지 위 날짜·작성자를 표시합니다.
- `_includes/green/person-list.html`: 홈페이지 필진 목록. `green_writers`의 직책·이름·전공을 3열로 표시하고 각 행을 Instagram에 연결합니다.
- `_includes/green/pledges.html`: 공약 페이지의 분야 필터·결과 개수·펼쳐 읽는 공약 카드. 공통 본문 레이아웃의 `.green-article-body` 밖에 배치합니다.
- `assets/css/green.scss`: 데스크톱·태블릿·모바일 공통 스타일 원본. Jekyll 빌드 결과와 페이지에서 불러오는 경로는 기존 `assets/css/green.css`를 유지합니다.
- `assets/js/green/main.js`: 검색, 대화상자, 슬라이드, 콘텐츠 레일, 상단 이동.
- `assets/js/green/pledges.js`: 공약 분야 필터와 결과 개수 갱신. `pledges` 데이터가 있는 공약 페이지에서만 불러옵니다.
- `assets/src/green/`: 기존 초록 로고와 favicon.
- `_data/navigation.yml`: 사용자가 작성한 다섯 개 메뉴의 짧은 이름과 주소. 게시글 제목과 별도로 관리합니다.

기존 Minimal Mistakes 레이아웃과 Asterisk 자산은 다른 기존 페이지를 위해 유지합니다. 초록 페이지의 `green_key`는 페이지마다 고유하게 지정하는 식별자입니다. `green_order`는 초록 소개, 후보자, 출마의 변, 공약, 필진에 1부터 5까지, 후보자 한마디 세 페이지에 6부터 8까지 지정되어 있습니다. 대표 슬라이드는 별도의 `green_hero_order`에 따라 초록 소개, 출마의 변, 후보자, 공약 순서로 표시되며 개수 표시도 목록 길이를 따릅니다. 출마의 변은 단일 카드로 공동 원고에 연결하고, 후보자 소개 대표 카드는 소개 표지 뒤에 세 후보의 한마디 카드를 겹쳐 표시합니다.

게시글 정보는 Markdown 파일 한 곳에서 수정합니다. `_data/green.yml`에 제목·설명·링크나 후보자 정보를 다시 작성하지 않습니다. `_config.yml`의 `author.links`와 `footer.links`는 다른 기존 레이아웃을 위해 남겨 두며, 초록 레이아웃의 후보자 SNS는 `_pages/green-writers.md`의 `writers` 정보를 사용합니다.

## 글자 크기와 레이아웃 단위

`assets/css/green.scss`는 Jekyll front matter를 포함하며, `@use 'asterisk/variables' as theme`으로 `_sass/asterisk/_variables.scss`의 공통 글자 크기를 사용합니다. `$font-size-1`부터 `$font-size-9`까지의 값은 순서대로 `0.5rem`, `0.75rem`, `0.875rem`, `1rem`, `1.125rem`, `1.25rem`, `1.5rem`, `1.75rem`, `2rem`입니다. 일반 본문·메뉴·버튼·라벨의 글자 크기는 이 변수를 사용하고, 큰 제목은 변수의 배수로 구성합니다.

여백과 간격은 주로 `0.25rem` 단위로 맞추고, 세밀한 위치 조정에는 `0.125rem` 단위를 사용합니다. 콘텐츠 너비와 그리드의 고정 열 크기도 `rem`으로 지정합니다. 반응형 분기점은 `48rem` 미만, `64rem` 미만, `75rem` 미만, `90rem` 이상입니다. 기본 글자 크기가 16px이면 각각 768px, 1024px, 1200px, 1440px에 해당합니다.

장식용 표지 글자는 카드 너비를 따르는 `cqw`, 유동적인 제목은 화면 너비를 따르는 `vw`를 유지하되 필요한 크기 제한에 공통 `rem` 변수를 사용합니다. 얇은 테두리·포커스 선·그림자의 `px`, 기존 무단위 행간과 `em` 자간은 유지합니다. 이 단위 규칙은 스타일 편집 기준이며, 아래의 이전 검증 기록과 별개입니다.

## 본문 작성

| 페이지 | 편집 파일 | 주소 |
| --- | --- | --- |
| 초록 | `_pages/green-abstract.md` | `/abstract/` |
| 후보자 | `_pages/green-introduction.md` | `/introduction/` |
| 출마의 변 | `_pages/green-statement.md` | `/statement/` |
| 공약 | `_pages/green-dreams.md` | `/dreams/` |
| 필진 | `_pages/green-writers.md` | `/writers/` |

각 파일의 front matter 아래 Markdown이 본문으로 표시됩니다. 공약 페이지는 소개 두 문단을 Markdown 본문에 두고, 20개 공약의 요약·상세 문단은 같은 파일의 front matter에서 관리합니다. 2026-11-14에는 사용자가 제공한 학생회 폴더의 자료를 바탕으로 다섯 페이지에 초안을 입력했습니다. 페이지의 `editorial_status: draft`는 편집 상태를 나타내며 화면에는 별도 배지로 표시하지 않습니다. 원본 출처, 공약 20개 항목의 대응표, 문서 간 차이는 [콘텐츠 출처 기록](green-content-sources.md)을 참고합니다. 본문이 비어 있거나 `TEST`만 있는 페이지에는 준비 중 안내를 표시합니다. 공통 콘텐츠 정보를 front matter로 통합했던 작업에서는 기존 초안 본문을 변경하지 않았습니다.

### 공통 정보 편집

| front matter 항목 | 용도 |
| --- | --- |
| `title` | 본문 제목, 홈페이지 카드·가이드·대표 글 제목, 관련 글, 검색 제목에 공통으로 사용합니다. 겹친 한마디 카드의 노출 라벨도 이 값을 사용합니다. |
| `description` | 본문 머리말, 카드·가이드·대표 글 설명, 관련 글과 검색 설명에 공통으로 사용합니다. |
| `date` | 홈페이지 카드 이미지 위에 표시할 게시일입니다. 없으면 `게시일 준비 중`으로 표시합니다. |
| `author` | 홈페이지 카드 이미지 위에 표시할 작성자입니다. 없으면 사이트의 기본 작성자 이름을 사용합니다. |
| `category` | 카드의 분류 태그, 관련 글의 분류, 검색 결과에 사용합니다. 현재 주요 다섯 페이지는 모두 `초록`입니다. |
| `permalink` | 페이지 주소와 해당 글을 가리키는 카드·대표 글·관련 글·검색 링크의 기준입니다. |
| `green_key` | 초록 콘텐츠로 모을 페이지의 고유 식별자이며, `green_artwork`가 없을 때 표지 배경 종류로도 사용합니다. |
| `green_order` | 페이지 목록의 표시 순서입니다. 홈페이지 목록·가이드·관련 글과 겹친 한마디 카드는 이 순서를 따릅니다. 필진 순서는 `writers` 배열에서 관리합니다. |
| `green_home` | `true`이면 홈페이지 목록·가이드와 관련 글 후보에 포함합니다. 생략해도 `green_key`가 있으면 검색에는 포함합니다. |
| `green_hero_order` | 이 항목이 있는 페이지를 홈페이지 대표 글에 포함하고, 지정한 숫자로 정렬합니다. 대표 글에서 제외하려면 항목을 생략합니다. |
| `green_parent` | 홈페이지의 어느 대표 카드 뒤에 묶을지 지정합니다. 값이 대표 글의 `green_key`와 같으면 그 표지 뒤에 연결 카드로 표시합니다. 후보자 한마디 세 페이지는 `introduction`을 사용합니다. |
| `green_kicker` | 대표 글과 본문 제목 위에 공통으로 표시할 소제목입니다. 영문 문구를 주로 사용하며 한글도 가능합니다. |
| `green_cover_lines` | 표지 이미지 안의 포스터 문구를 줄별로 지정합니다. 바깥의 게시글 `title`과 구분합니다. |
| `green_artwork` | 표지 배경 종류를 지정합니다. 다른 페이지의 `green_key`를 지정하면 그 페이지의 표지 문구 기본값도 재사용할 수 있습니다. |

예를 들어 초록 소개 페이지는 다음과 같이 관리합니다. 대표 영역의 제목·설명도 이 값과 같으므로 별도의 대표 문구를 수정할 필요가 없습니다.

```yaml
---
title: '초록을 소개합니다.'
description: '여러분을 초록에 초대합니다.'
date: 2026-11-19
author: '초록'

layout: green-article
permalink: '/abstract/'
green_key: abstract
green_order: 1
green_home: true
green_kicker: '초록? 초록!'
green_hero_order: 1
green_cover_lines:
    - '여러분을'
    - '초록에 초대합니다.'
editorial_status: draft

category: '초록'
tag: '초록'
---
```

표지 문구는 해당 페이지의 `green_cover_lines`, `green_artwork`가 가리키는 페이지의 `green_cover_lines`, 해당 페이지의 `title` 순서로 선택합니다. 후보자 한마디 페이지의 `green_artwork: introduction`은 후보자 소개 배경과 기본 표지 문구를 재사용합니다. 그 페이지에 `green_cover_lines`를 직접 추가하면 배경은 유지하면서 포스터 문구만 바꿀 수 있습니다. 표지 문구 기본값이 없으면 게시글 제목을 표시합니다.

메뉴에서 보이는 `초록`, `후보자` 같은 짧은 이름은 `_data/navigation.yml`에 남겨 둡니다. 게시글 제목을 바꾸어도 메뉴 이름은 유지됩니다. 페이지 주소를 바꿀 때는 메뉴 항목이나 Markdown 본문에 직접 작성한 링크도 함께 확인합니다.

### 공약 카드와 분야 필터

공약은 `_pages/green-dreams.md`의 `pledge_categories`와 `pledges` 배열에서 편집합니다. 기존 페이지 제목·설명·대표 표지 설정과 소개 두 문단은 유지하며, `_data/green.yml`에 별도 공약 데이터를 추가하지 않습니다.

`pledge_categories`는 `key`와 화면에 표시할 `label`을 갖습니다. 현재 `communication`(소통) 5개, `welfare`(복지) 8개, `education`(교육) 4개, `transparency`(투명) 3개로 총 20개입니다. `pledges`의 배열 순서가 카드 순서이며 각 항목은 다음 값을 사용합니다.

| 항목 | 편집 내용 |
| --- | --- |
| `id` | `communication-1`처럼 항목마다 고유한 식별자. 카드·팝업·제목의 HTML ID 연결에 사용합니다. |
| `category` | `pledge_categories`의 `key`와 일치하는 분야. 필터와 카드의 첫 번째 태그에 사용합니다. |
| `title` | 카드와 팝업에 공통으로 표시하는 공약 제목. |
| `summary` | 카드의 제목 아래 표시할 짧은 요약. |
| `keywords` | 분야 태그 뒤에 표시할 관련 키워드 1~2개. 예: `['간담회', '건의사항']`. |
| `detail` | 팝업에 표시할 Markdown 상세 원고. PDF 본문과 조건을 담은 각주를 사용합니다. |
| `source_page` | 정책자료집 RevI PDF의 1부터 시작하는 쪽수. 원고를 대조할 때 사용하는 편집 근거입니다. |

상세 원고는 YAML의 `detail: |` 아래에 들여 쓰고, 문단 사이에는 빈 줄을 둡니다. PDF의 문장은 유지하고 지면의 강제 줄바꿈만 웹 문단으로 정돈합니다. 문구를 바꾸려면 해당 공약의 `detail` 한 곳을 수정하면 됩니다.

데스크톱에서는 왼쪽에 `전체 보기`, `소통`, `복지`, `교육`, `투명` 사각 태그 필터가 세로로 배치되고 스크롤 중에도 따라옵니다. 오른쪽에는 제목·요약·분야 및 키워드 태그 순서의 카드가 2열로 표시됩니다. 회색 태그 중 선택한 분야는 검정 배경과 흰 글씨로 표시하며 `aria-pressed`로 선택 상태를 전달합니다. 모바일에서는 필터가 카드 위의 가로 줄로 이동하고 카드는 1열이 됩니다.

카드 전체를 누르면 해당 공약의 HTML `dialog` 팝업이 열립니다. 팝업 내부만 스크롤되며 위쪽의 닫기 버튼은 계속 보입니다. 닫기 버튼, Escape, 팝업 바깥 클릭으로 닫을 수 있고 원래 카드로 키보드 포커스가 돌아갑니다. 필터 변경 시 분야에 맞는 카드와 결과 개수를 표시합니다.

마크업은 `_includes/green/pledges.html`, 배치·색상은 `assets/css/green.scss`의 `.green-pledges` 이하, 필터·팝업 동작은 `assets/js/green/pledges.js`에서 수정합니다. 공약 영역은 일반 본문 스타일의 영향을 받지 않도록 `.green-article-body` 밖에서 불러옵니다. 필터와 팝업은 JavaScript로 동작합니다. 사이트 검색에는 각 공약의 `title`, `summary`, `keywords`, `detail`도 포함합니다.

원고는 RevI 8~27쪽을 기준으로 관리합니다. 동아리 지원금 인상액 미확정, 축하 키트 구매·수요조사, 라운지 예약제 검토, 교육과정·라이선스 건의와 요청 등 조건은 짧은 요약과 상세를 수정할 때도 유지합니다.

### 후보자 소개 카드와 한마디

홈페이지의 후보자 소개 대표 영역에는 네 개의 형제 링크 카드가 겹쳐 있습니다. 앞 표지는 `/introduction/`으로 연결되고, 뒤쪽 카드는 다음 순서로 연결됩니다.

| 제목·카드 라벨 | 편집 파일 | 주소 | `green_key` | `green_order` |
| --- | --- | --- | --- | --- |
| 정후보 박현욱의 한마디 | `_pages/green-words-hwpxrk.md` | `/words/hwpxrk/` | `hwpxrk` | 6 |
| 부후보 송선빈의 한마디 | `_pages/green-words-sunbin1391.md` | `/words/sunbin1391/` | `sunbin1391` | 7 |
| 부후보 조연정의 한마디 | `_pages/green-words-yyjj33.md` | `/words/yyjj33/` | `yyjj33` | 8 |

각 한마디 페이지에서 `title`을 바꾸면 노출 카드 라벨·본문 제목·검색 제목이 함께 바뀝니다. 링크 주소는 `permalink`를 사용합니다. 박현욱 페이지의 연결 설정은 다음과 같습니다.

```yaml
title: '정후보 박현욱의 한마디'
layout: green-article
permalink: '/words/hwpxrk/'
green_key: hwpxrk
green_order: 6
green_parent: introduction
green_artwork: introduction
```

`index.html`은 각 대표 글의 `green_key`와 `green_parent`가 일치하는 페이지를 `green_pages`에서 찾아 뒤쪽 카드로 표시합니다. `green_parent`는 묶일 대표 카드를, `green_artwork`는 표지 배경을 정하는 별도 설정입니다. 뒤쪽 세 카드는 각각 `3rem` 높이의 노출 띠에서 제목을 읽고 선택할 수 있으며, 네 링크는 중첩하지 않습니다. 키보드로 포커스하면 해당 링크의 outline이 표시됩니다.

한마디 세 페이지에는 `green_home`과 `green_hero_order`를 지정하지 않습니다. 따라서 독립된 대표 슬라이드나 홈페이지 콘텐츠 카드로 추가되지 않으며, 대표 글 4개·홈페이지 카드 5개를 유지하고 검색 대상에는 세 한마디를 더해 총 8개 페이지를 포함합니다. 본문은 확정 원고를 넣기 전까지 준비 중 안내를 표시합니다.

후보자 소개 원본 Markdown의 사진·연혁·직접 작성한 소감은 소개 페이지에서 관리합니다. 본문 아래에는 `후보자의 출마 각오 알아보기` 목록을 표시합니다. 제목의 `출마 각오`는 밑줄 없이 초록색으로 강조하고, 메인 필진 목록과 같은 직책·이름·전공 3열 및 hover 색상을 사용합니다. 각 행은 해당 후보의 출마 각오 페이지를 같은 창에서 엽니다. 필진과 SNS 정보는 아래의 `writers` 배열에서 계속 관리하며, 한마디 페이지에 중복 작성하지 않습니다.

### 필진 정보

필진의 이름·직책·전공·Instagram 주소는 `_pages/green-writers.md`의 front matter에 있는 `writers` 배열에서 관리합니다. 배열에 적힌 순서가 홈페이지 목록과 푸터 SNS 링크의 순서입니다.

```yaml
writers:
    - name: '박현욱'
      role: '정후보'
      major: '산업인공지능전공'
      instagram: 'https://instagram.com/hwpxrk_'
      words_key: hwpxrk
    - name: '송선빈'
      role: '부후보'
      major: '산업인공지능전공'
      instagram: 'https://instagram.com/s_s_kong_03'
      words_key: sunbin1391
    - name: '조연정'
      role: '부후보'
      major: 'AI융합운영전공'
      instagram: 'https://instagram.com/_igotcrushonyou'
      words_key: yyjj33
```

`_includes/green/content-data.html`이 이 배열을 `green_writers`로 전달하고, 홈페이지와 후보자 소개의 `_includes/green/person-list.html`, 푸터가 같은 정보를 사용합니다. 홈페이지 필진 행은 PC와 모바일 모두 직책·이름·전공 3열이며 Instagram으로 연결됩니다. 이름과 SNS 주소를 바꿀 때는 이 배열만 수정하고 실제 확인된 정보를 입력합니다.

`words_key`는 각 출마 각오 페이지의 `green_key`와 연결됩니다. 후보자 소개에서는 `green_parent: introduction`인 페이지를 `word_pages`로 공통 목록에 전달하고, `words_key`에 해당하는 글이 있는 사람만 표시합니다. 링크 주소는 해당 글의 `permalink`를 따르므로 여기에 URL을 중복 작성할 필요가 없습니다. 한마디 문구나 준비 중 칸은 표시하지 않습니다.

출마의 변은 `_pages/green-statement.md`에서 공동 원고 하나로 관리합니다. 후보자 소개 하단의 출마 각오 목록은 `_layouts/green-article.html`에 있으며, 본문 스타일이 목록에 덮이지 않도록 `.green-article-body` 밖에 배치합니다.

### 새 글 추가

1. `_pages/green-*.md` 파일을 추가하고 기존 본문 페이지의 front matter 구조를 따릅니다. `layout: green-article`과 고유한 `green_key`, 중복되지 않는 `permalink`, 표시 순서인 `green_order`를 지정합니다.
2. `title`, `description`, `date`, `author`, `category`를 작성하고 front matter 아래에 Markdown 본문을 넣습니다. 홈페이지 카드·가이드·관련 글에 넣으려면 `green_home: true`를 추가합니다.
3. 대표 슬라이드에도 넣으려면 기존 값과 겹치지 않는 `green_hero_order`를 지정합니다. 검색만 포함할 글은 `green_home`과 `green_hero_order`를 생략할 수 있습니다.
4. 기존 배경을 재사용하려면 `green_artwork`에 `abstract`, `statement`, `introduction`, `dreams`, `writers` 중 원하는 종류를 지정합니다. 원하는 포스터 문구와 줄바꿈은 `green_cover_lines`로 작성합니다.
5. 주 메뉴에 새 항목이 필요할 때만 `_data/navigation.yml`에 짧은 메뉴 이름과 주소를 추가합니다. `_data/green.yml`에는 글을 등록하지 않으며, 표시 개수를 바꿀 때만 두 설정을 수정합니다.

홈페이지 가이드는 현재 `green_order` 순서의 글을 최대 `popular_limit`개 표시합니다. 조회 수를 수집해 순위를 계산하는 기능은 없습니다. 관련 글은 같은 홈페이지 목록에서 현재 글을 제외하고 최대 `related_limit`개 표시합니다. 새 글을 추가한 뒤에는 아래 명령으로 빌드하고 본문·목록·검색·주소 연결을 확인합니다.

## 원본 파일 이동

원래 `_posts/abstract.md`, `introduction.md`, `statement.md`, `dreams.md`, `writers.md`는 Jekyll 게시글의 날짜 파일명 규칙을 충족하지 않아 페이지가 생성되지 않았습니다. 내용과 목적에 맞게 `_pages/green-*.md`로 이동했습니다.

- 원본 다섯 파일의 변경 전 사본: `/tmp/chorok-original-posts/`.
- 최초 이동 시 제목, 설명, category, tag, 본문 `TEST`: 보존. 이후 콘텐츠 초안 작업에서 설명과 본문을 갱신했습니다.
- layout: `single`에서 `green-article`로 변경.
- `green_key`, `green_order`: 추가.
- 필진 permalink: 중복된 `/abstract/`에서 메뉴에 맞는 `/writers/`로 수정.

`/tmp` 사본은 작업 중 확인용이며 장기 백업을 대신하지 않습니다. 유지할 원본 콘텐츠는 이동된 `_pages` 파일에 있습니다.

## 로컬 실행과 검증

홈페이지 대표 슬라이드는 초록 소개부터 자동 재생되며, 5초 간격으로 다음 글로 넘어갑니다. 진행 표시도 5초에 맞춰져 있습니다. 다음 글은 오른쪽에서 들어오고 현재 글은 왼쪽으로 이동하며, 이전 글을 선택하면 반대 방향으로 전환됩니다. 전환은 0.5초 동안 진행됩니다. 모든 슬라이드가 같은 그리드 영역을 공유해 글마다 높이가 흔들리지 않으며, 비활성 슬라이드는 보이지 않고 키보드·접근성 탐색에서도 제외됩니다.

마우스를 올려 놓아도 재생이 계속됩니다. 일시정지 버튼을 누르거나 캐러셀에 포커스가 들어오면 멈추고, 재생 버튼으로 다시 시작할 수 있습니다. 비활성 탭이나 검색·메뉴 대화상자가 열린 동안에는 일시 중지합니다. 동작 줄이기 설정에서는 좌우 이동 효과를 생략하며, 처음의 자동 재생 상태는 동일합니다.

이전 3초 자동 재생 구현은 전체 JavaScript를 실행하는 모의 DOM·가상 시계에서 검증했습니다. 일반 설정과 동작 줄이기 설정 모두 0·3·6·9초에 1·2·3·1번 슬라이드를 표시했고, 수동 일시정지·재생, 포커스, 문서 숨김, 대화상자, 이전·다음·페이지 선택·스와이프를 포함한 9개 검증을 통과했습니다. 당시 Safari에서는 초기 재생 상태와 일시정지·재생 버튼의 상태 전환을 확인했지만 연속 자동 전환 간격 실측은 제어 환경에서 확인하지 못했습니다. 이 기록은 현재 5초·4개 슬라이드 구현의 검증과 구분합니다.

프로젝트 루트에서 기존 Ruby/Bundler 환경으로 실행합니다.

```sh
bundle check
JEKYLL_ENV=production bundle exec jekyll build --destination /tmp/chorok-preview --strict_front_matter
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

브라우저에서 `http://127.0.0.1:4000/`을 열어 홈페이지와 위 다섯 기본 페이지, 세 한마디 페이지의 주소를 확인합니다. 하위 경로에 게시할 때는 `baseurl`을 지정한 빌드에서도 이미지·메뉴·검색 결과 링크가 해당 경로를 포함하는지 확인합니다. 기본 주소의 빌드 성공만으로 실제 브라우저 동작이나 배포 성공을 의미하지는 않습니다.

게시 전에는 콘텐츠 초안의 원고 확인, 모바일 메뉴·검색·슬라이드·키보드 조작, 외부 링크, 좁은 화면의 줄바꿈을 확인합니다. 이 작업 안내 자체는 GitHub push나 Sites 배포를 수행하지 않습니다.

## 초기 사이트 구조 검증 기록

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

위 목록은 사이트 구조를 구현한 시점의 검증 결과입니다. 모바일 너비 검증은 데스크톱 Safari의 고정 너비 iframe으로 수행했으며 실제 휴대전화·터치 제스처 검증은 아닙니다. 자동 재생의 포커스·호버 상태는 임시 모의 DOM 검사도 사용했습니다. 로그인·구독·음성 콘텐츠 등 네이버 계정/서버에 의존하는 기능은 추가하지 않았습니다. 콘텐츠 초안 입력 후에는 별도 빌드 및 본문 검증을 수행합니다. Git commit, push, 원격 배포는 수행하지 않았습니다.

## 콘텐츠 초안 입력 후 검증

2026-11-14, 다섯 페이지에 초안을 입력한 이후의 결과입니다.

- `bundle check`, Jekyll production 빌드, `/council` baseurl 빌드: 통과.
- 홈페이지와 상세 페이지 5개: 생성 및 HTTP 200 응답 확인.
- 두 빌드 각각 내부 링크·자산·본문 바로가기·검색 결과 URL 299개: 누락 0개, baseurl 이탈 0개.
- 여섯 페이지의 검색 JSON: 각각 5개 항목으로 정상 파싱. 모든 본문이 포함되며 Liquid 링크 문법이 남아 있지 않습니다.
- 다섯 페이지의 제목·설명과 카드·대표 슬라이드의 메타데이터 일치, `editorial_status: draft` 확인.
- 공약 4개 분야·20개 소항목, 세 후보의 약력, 본문 `TEST` 제거, 중복 HTML ID 없음 확인.
- CSS 파싱, `git diff --check`: 통과.
- Safari 데스크톱 공약 본문, `주경야식` 검색 결과, 390px 공약 및 320px 후보자 약력의 iframe 화면: 직접 확인.
- 원본 자료와 콘텐츠 출처 문서가 공개 빌드에 포함되지 않음 확인.

검증 중 Jekyll 페이지 렌더 순서에 따라 Markdown 링크 안의 Liquid 문법이 일부 검색 데이터에 남는 현상을 확인했습니다. 새 본문의 페이지 간 이동 링크를 HTML 앵커로 작성해, 렌더 전후 모두 `strip_html` 처리에서 링크 속성이 제거되도록 수정했습니다. 기본 주소·하위 경로 빌드와 여섯 검색 데이터를 다시 확인했습니다.

모바일 화면 검증은 데스크톱 Safari의 고정 너비 iframe 기준이며 실제 모바일 기기를 사용하지 않았습니다. 기존 외부 Instagram 주소는 유지했으며 외부 사이트의 현재 응답 여부는 이번 본문 작업에서 재검증하지 않았습니다. 원고의 사실관계는 제공된 자료끼리 대조한 범위입니다.

## 이전 겹친 카드 구조의 검증 기록

다음은 출마의 변 표지 뒤에 개별 후보자 글을 연결했던 이전 구조의 기록입니다. 아래 페이지 수·링크 수·동작 결과는 현재 후보자 소개 표지에 연결한 한마디 카드의 검증 결과가 아닙니다.

- 기본 주소 및 `/council` 하위 경로의 production 빌드: 통과.
- 각 빌드의 홈페이지·본문 8개 페이지와 내부 참조 476개: 누락·하위 경로 이탈 없음.
- 출마의 변 표지와 후보자 한마디 세 장: 네 개의 형제 링크이며 중첩 링크 없음.
- 검색 데이터 8개 항목, 후보자별 제목·분류·임시 글 안내, 중복 ID 및 남은 Liquid 구문 검사: 통과.
- CSS 파싱 및 `git diff --check`: 통과.
- Safari에서 네 카드가 각각 출마의 변·박현욱·송선빈·조연정 페이지로 이동하는 것을 확인했습니다. 데스크톱과 320px·390px iframe에서 카드 노출 영역과 이름이 잘리지 않는 것을 확인했습니다.

화면 너비 검증은 데스크톱 Safari 기준입니다. 실제 휴대전화의 터치 조작과 자동 재생 간격은 이번 카드 연결 작업에서 추가 실측하지 않았습니다.

## 5초 간격과 좌우 전환 검증

출마의 변 표지에 개별 후보자 글과 겹친 카드를 사용하던 시점의 검증 기록입니다. 현재 후보자 소개 카드 연결 작업의 검증과 구분합니다.

- 초록 소개가 첫 번째인 네 개의 대표 글 순서와 Jekyll production 빌드: 통과.
- 전체 JavaScript를 실행하는 모의 DOM·가상 시계 검증 15개: 통과. 0·4.999·5·10·15·20초에 1·1·2·3·4·1번 슬라이드를 확인했습니다.
- 다음·이전·양끝 순환·페이지 선택의 이동 방향과 500ms 설정, 연속 선택 시 이전 효과 취소, 동작 줄이기 설정, 비활성 슬라이드의 `inert`·`aria-hidden`, 포커스 이동을 확인했습니다.
- 기존 일시정지·재생, 문서 숨김, 대화상자와 스와이프 검증: 통과.
- JavaScript 구문, CSS 파싱, `git diff --check`: 통과.
- Safari에서 초록 소개 첫 화면과 수동 선택 상태, 320px·390px 배치를 확인했습니다. 320px에서 같은 선택 버튼을 다시 눌러 진행 중 효과를 취소했을 때 당시 사용하던 출마의 변 네 카드와 조작부가 정상적으로 표시되는 것을 확인했습니다.

Safari 제어 환경에서는 애니메이션이 시작 위치에서 진행되지 않는 현상이 관찰되었습니다. 실제 5초 간격과 0.5초 이동의 연속 재생은 확인하지 못했으므로, 모의 환경에서의 시간·방향 검증과 실제 화면 배치 검증을 구분합니다.

## rem 단위 전환 검증

2026-11-16 로컬 작업 기준입니다.

- Jekyll production 및 `/council` 하위 경로 빌드: 통과. SCSS 원본에서 기존 주소의 `green.css`가 생성됩니다.
- 생성 CSS 파싱, Sass·Liquid 잔여 검사, 변경 파일 공백 검사: 통과.
- 임시 변수 복사본의 크기를 변경해 재컴파일하여 공통 글자 크기 변수가 실제 CSS에 반영되는 것을 확인했습니다.
- 변경 전 빌드와 비교해 기존 HTML 20개, JavaScript 8개, `main.css`가 동일하며, 작업 전에 사용자가 수정한 표지·공통 레이아웃·출마의 변 본문도 보존했습니다.
- Chrome 데스크톱 홈페이지·후보자 페이지, 320px·390px iframe의 홈페이지·후보자 연혁·출마의 변 본문 배치를 직접 확인했습니다.
- 임시 페이지의 루트 글자 크기를 20px로 키운 320px iframe에서 대표 글·재생 컨트롤·후보자 연혁·하단 목록과 푸터를 확인했습니다. 긴 전공명이 링크 아이콘을 밀어내는 현상을 수정했습니다.

모바일 너비 확인은 데스크톱 Chrome의 iframe 기준이며 실제 휴대전화 검증은 아닙니다. 20px 확대 확인은 임시 페이지의 루트 글자 크기를 변경한 것으로, 브라우저 기본 글꼴 설정이나 화면 확대 설정을 변경한 검증과 구분합니다.
