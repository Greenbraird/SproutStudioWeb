# 새싹 스튜디오 (Sprout Studio) — Website

1인 개발자 **김시준**의 인디 게임 스튜디오 **새싹 스튜디오**와 대표작 **War In The Dark**를 소개하는 정적 사이트입니다.
디자인: **1-bit 냉전 콘셉트** — INK `#222323` / PAPER `#F0F6F0` 두 색만 사용(대비 14.4:1), 기밀문서 도장 · 전신 용지 · 무전 다이얼 모티프, 픽셀 폰트.

배포: GitHub Pages (`main` 브랜치 루트, Jekyll 기본 빌드) → https://greenbraird.github.io/SproutStudioWeb/

## 구조

```
index.html            한국어 페이지 (원본 · 직접 수정하는 곳)
en/index.html         영어 페이지   (자동 생성 — 직접 수정 금지)
ja/index.html         일본어 페이지 (자동 생성 — 직접 수정 금지)
i18n/strings.json     EN/JA 번역 문자열 (data-i18n 키와 1:1)
css/styles.css        전체 스타일 (2색 토큰, 반응형 1239/1100/900/720px)
js/main.js            히어로 모스 해독 연출, 모스 체험 데모, 다이얼, 모바일 메뉴, 트레일러/Steam 위젯 지연 로드, GSAP 스크롤 연출
assets/               이미지(원본 PNG + 사이트용 WebP), og-image.png, 파비콘
assets/fonts/         Galmuri(서브셋) · Silkscreen woff2 + OFL 라이선스 전문
404.html robots.txt sitemap.xml favicon.ico
_config.yml           Pages(Jekyll)에서 initial-version/, tools/, i18n/, README.md 를 배포 제외
tools/                build_i18n.py · subset_fonts.py · convert_images.py (빌드 보조, 배포 안 됨)
initial-version/      과제 제출용 초기 버전 (저장소에는 남기고 사이트에서는 제외)
```

## 문구 수정 → 언어 페이지 다시 만들기

1. 한국어는 `index.html`에서 직접 고칩니다. 번역이 필요한 요소에는 `data-i18n="키"`(내용) 또는 `data-i18n-attr="속성:키"`(alt/title 등)가 붙어 있습니다.
2. 같은 키의 영어·일본어를 `i18n/strings.json`에서 고칩니다(HTML 태그 사용 가능).
3. 저장소 루트에서 `python tools/build_i18n.py` 실행 → `en/`, `ja/` 갱신. 빠진 키가 있으면 목록을 출력합니다.
4. 새 한자/특수문자를 넣었다면 `pip install fonttools brotli` 후 `python tools/subset_fonts.py <Galmuri TTF 폴더>`로 폰트 서브셋을 다시 만듭니다
   (Galmuri TTF: npm 패키지 `galmuri` 2.40.3의 `dist/`). 한글은 KS X 1001 2,350자가 이미 들어 있습니다.

## 로컬 미리보기

GitHub Pages와 같은 경로(`/SproutStudioWeb/`)로 보려면 상위 폴더에서 서버를 엽니다(404 페이지가 절대경로를 씁니다).

```bash
cd ..                      # SproutStudioWebsite 의 상위 폴더
python -m http.server 5500
# → http://localhost:5500/SproutStudioWebsite/   (404.html 만 /SproutStudioWeb/ 경로 기준)
```

## 외부 의존성 · 라이선스

- **GSAP 3.15.0** (CDN 1줄, SRI 고정): https://gsap.com/standard-license — 상업 이용 무료 "Standard No-Charge License". 로드 실패 시에도 모든 내용이 그대로 보입니다(연출만 빠짐).
- **Galmuri** © Lee Minseo, **Silkscreen** © The Silkscreen Project Authors — SIL Open Font License 1.1 (`assets/fonts/OFL-*.txt`).
- Steam 공식 위젯(`store.steampowered.com/widget/4949240/`), YouTube(nocookie) — 화면 근처에 오거나 클릭할 때만 불러옵니다.

## 접근성

- 두 색 대비 14.4:1, 모든 인터랙티브 요소에 `:focus-visible` 3px 외곽선, 본문 건너뛰기 링크.
- `prefers-reduced-motion: reduce`이면 모스 연출·스크롤 연출을 모두 끄고 최종 상태를 바로 보여 줍니다.
- JS가 없거나 실패해도 본문·이미지·링크가 모두 보입니다(연출은 JS가 동작할 때만 요소를 숨겼다가 보여 줌).
- 모스 체험은 전건 버튼에 포커스가 있을 때만 Space를 가로채며, 마우스/터치로도 조작할 수 있습니다.
