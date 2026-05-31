# 새싹 스튜디오 (Sprout Studio) — Website

1인 개발자 **김시준**의 인디 게임 스튜디오 **새싹 스튜디오**와
대표작 **War In The Dark**(1-bit 턴제 도청 시뮬레이션)를 소개하는 원페이지 사이트입니다.
Playdead 스타일에서 영감을 받은 다크 · 시네마틱 · 미니멀 디자인이며,
실제 게임 소개서와 개발 히스토리를 토대로 콘텐츠를 구성했습니다.

## 구성

```
SproutStudioWebsite/
├── index.html        # 마크업 (헤더 / 히어로 / 게임 / 철학 / 데브로그 / 푸터)
├── css/styles.css    # 다크 테마, 타이포, 반응형, 스크롤 리빌
├── js/main.js        # 스티키 헤더, 히어로 패럴럭스, 스크롤 리빌, 모바일 메뉴, 뉴스레터
└── assets/
    ├── hero-battlefield.png   # 히어로 배경 / WAR IN THE DARK 아트워크
    ├── war-in-the-dark.png    # 게임 키 로고
    └── sprout-logo.png        # 스튜디오 로고 (파비콘)
```

## 실행 방법

순수 정적 사이트라 빌드가 필요 없습니다.

```bash
# 방법 1) 로컬 서버 (권장 — 폰트/이미지 캐시 정상 동작)
python -m http.server 5500
# → http://localhost:5500 접속

# 방법 2) index.html 파일을 브라우저로 바로 열기
```

## 섹션

1. **Header** — 투명 → 스크롤 시 블러 고정. 텍스트 로고 + 내비게이션.
2. **Hero** — 풀블리드 전장 배경 + 시적 태그라인 + 게임 한 줄 소개.
3. **Game** — War In The Dark 키 아트 · 로그라인 · PLATFORM/GENRE/SCHEDULE 메타.
4. **Story** — 레마르크의 회상 내러티브 + 캐릭터 3인(레마르크/엔더슨/닉 캐러웨이).
5. **System (Core Loop)** — 4대 시스템(도청·해석·송신·준비) + 조작법 그리드.
6. **Key Features** — 암호 해독 전투 · 모스 송수신 · 1-bit 픽셀 아트.
7. **Units** — 정찰병/보병/저격수 스탯 카드.
8. **Roadmap** — 2026.07 → 2027.02 스팀 출시 타임라인.
9. **Awards** — 수상 및 전시 이력.
10. **Studio** — 개발자 김시준 소개 + 스킬 + 스튜디오 철학.
11. **Footer / Contact** — 이메일 · 연락처 · GitHub/Press 링크.

## 커스터마이즈

- 색상/타이포는 `css/styles.css` 상단 `:root` 변수에서 일괄 조정합니다.
- 게임/문구/링크는 `index.html`에서 직접 수정합니다.
