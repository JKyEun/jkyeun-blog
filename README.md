# JKyEun Blog

![Image](https://github.com/user-attachments/assets/14e018a3-a689-4572-824f-688438c18833)

Next.js와 Notion API를 활용한 개인 블로그 프로젝트입니다.

## 프로젝트 소개

이 블로그는 프론트엔드 개발자로서 학습한 내용을 정리하고 공유하기 위한 공간입니다. Notion을 CMS(콘텐츠 관리 시스템)로 활용하여 콘텐츠를 관리하고, Next.js를 통해 정적 웹사이트로 구현했습니다. 프로젝트에 대한 더 자세한 내용은 아래 블로그 포스팅을 참고해주세요.
[Notion API로 블로그 만들기](https://jkyeun.com/18bee792-570f-80f1-9fcf-c97f875b1d5e)

## 주요 기능

- **Notion API 연동**: Notion 데이터베이스를 CMS로 활용
- **정적 사이트 생성(SSG)**: 빠른 로딩 속도와 SEO 최적화
- **이미지 최적화**: webp 포맷 사용
- **반응형 디자인**: 모바일부터 데스크탑까지 다양한 화면 크기 지원

## 기술 스택

- **프레임워크**: Next.js 14
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **CMS**: Notion API
- **배포**: Vercel
- **기타 라이브러리**:
  - `@notionhq/client`: Notion API 연동
  - `prism-react-renderer`: 코드 하이라이팅
  - `sharp`: 이미지 최적화
  - `open-graph-scraper`: 북마크 OG 데이터 추출

## 프로젝트 구조

```bash
src/
├── app/ # Next.js 앱 라우터
├── components/ # 재사용 가능한 컴포넌트
├── constants/ # 상수 정의
├── icons/ # SVG 아이콘
├── lib/ # Notion API 관련 유틸리티
├── scripts/ # 이미지 다운로드 스크립트
├── types/ # TypeScript 타입 정의
└── utils/ # 유틸리티 함수
```
