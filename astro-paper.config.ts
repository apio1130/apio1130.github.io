import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://apio1130.github.io/",
    title: "notepad",
    description: "학습한 기술과 관심 있는 기술을 기록하는 블로그",
    author: "김기준",
    profile: "https://github.com/apio1130",
    ogImage: "default-og.jpg",
    lang: "ko",
    timezone: "Asia/Seoul",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
      // url: "https://github.com/apio1130/apio1130.github.io/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/apio1130" },
    // 나중에 추가하고 싶은 계정이 생기면 아래 주석을 해제하고 주소를 넣으시면 됩니다.
    // { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    // { name: "mail", url: "mailto:yourmail@gmail.com" },
  ],
  // 공유는 글 하단의 '링크 복사' 버튼만 사용합니다.
  shareLinks: [],
});