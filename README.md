# 링크나무

내 모든 링크를 한 페이지에 모아 두고 하나의 URL로 공유하는 서비스입니다.

## 실행하기

```
npm install
copy .env.example .env.local   # 그 다음 .env.local 에 MongoDB 연결 문자열 입력
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## 수정할 곳

- 프로필·링크 목록: `src/data/profile.ts`
- 프로필 사진: `public/` 폴더에 사진을 넣고 `profile.image`에 `"/파일이름.jpg"` 입력

## 클릭 수

- 링크를 누르면 `POST /api/click` 으로 MongoDB `clicks` 컬렉션에 기록됩니다.
- http://localhost:3000/api/click 에 접속하면 링크별 클릭 수를 볼 수 있습니다.
- `MONGODB_URI`가 없어도 페이지는 정상 동작하고, 클릭 수만 기록되지 않습니다.

## 배포 (Vercel)

Vercel 프로젝트 설정 > Environment Variables 에 `MONGODB_URI`, `MONGODB_DB`를 추가하세요.
