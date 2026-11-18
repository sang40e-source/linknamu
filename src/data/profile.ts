// 프로필과 링크 목록은 여기서 수정하세요.

export type Profile = {
  name: string;
  bio: string;
  /** public 폴더 기준 경로 (예: "/profile.jpg"). 비워 두면 이름 첫 글자가 표시됩니다. */
  image?: string;
};

export type LinkItem = {
  /** 클릭 수 집계에 쓰는 고유 ID. 한 번 정하면 바꾸지 마세요. */
  id: string;
  title: string;
  url: string;
};

export const profile: Profile = {
  name: "쭌",
  bio: "세계 최강 바이브코더인가?",
  image: "",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com/" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
  { id: "blog", title: "블로그", url: "https://blog.naver.com/" },
];
