/* ============================================================
   Sprout Studio — i18n (KO / EN / JA)
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "sprout-lang";
  var SUPPORTED = ["ko", "en", "ja"];

  var dict = {
    ko: {
      "meta.description":
        "새싹 스튜디오(Sprout Studio) — 1인 개발자 김시준의 인디 게임 스튜디오. 대표작 'War In The Dark'는 1950년대 가상 전쟁을 배경으로 한 1-bit 턴제 도청 시뮬레이션입니다.",
      "meta.ogTitle": "새싹 스튜디오 — War In The Dark",
      "meta.ogDesc": "적의 모스 신호를 도청해 아군을 지휘하라. 1-bit 턴제 도청 시뮬레이션.",
      "meta.title": "새싹 스튜디오 (Sprout Studio) — War In The Dark",
      "aria.home": "새싹 스튜디오 home",
      "aria.lang": "언어 선택",
      "aria.menu": "메뉴 열기",
      "aria.scroll": "게임 섹션으로 스크롤",
      "hero.eyebrow": "INDEPENDENT GAME STUDIO — SOLO DEVELOPED",
      "hero.title": "We grow stories<br />in the dark.",
      "hero.sub":
        "적의 모스 신호를 도청해 아군을 지휘하라.<br />1950년대 가상 전쟁, <span>1-bit 턴제 도청 시뮬레이션</span>.",
      "game.label": "FLAGSHIP TITLE",
      "game.count": "2026 — 2027",
      "game.logline":
        "1950년대 가상의 전쟁을 배경으로, 적의 모스 신호를 도청해 아군을 지휘하는 <strong>1-bit 턴제 도청 시뮬레이션</strong>입니다. 단순한 전투가 아닌, 어둠 속 정보전의 긴장감을 직접 해독해 내는 경험.",
      "game.platform": "PLATFORM",
      "game.platformVal": "PC · Steam",
      "game.genre": "GENRE",
      "game.genreVal": "Turn-Based War · Military Strategy",
      "game.schedule": "SCHEDULE",
      "game.scheduleVal": "2026.10 1st CBT · 2027.01 2nd CBT · 2027 Steam",
      "game.cta": "WISHLIST & FOLLOW <span class=\"text-btn-arrow\">→</span>",
      "story.label": "01 — STORY",
      "story.text":
        "노병 <em>레마르크</em>는 병상에 누워 있다. 손자 <em>엔더슨</em>이 가져온 군인 시절의 빛바랜 사진 한 장. 그 사진은 도청과 감청으로 이름을 날리던 지휘관 시절의 기억을 깨운다. 손자에게 전쟁 이야기를 들려주는 회상 속에서, 모든 것은 그가 전방 제5보병사단에 처음 배치되던 그날부터 다시 시작된다.",
      "story.caption": "회상이 시작되는 곳 — 도시가 내려다보이는 병실",
      "story.sceneAlt": "도시의 스카이라인이 내려다보이는 병실 — 회상이 시작되는 장소",
      "char.01": "CHARACTER 01",
      "char.remarque": "레마르크 <span>REMARQUE</span>",
      "char.remarqueBio":
        "도청·감청으로 이름을 날리던 지휘관. 퇴역 후 건강이 악화되어 병상에 누운 채, 손자에게 자신의 전쟁을 회상한다. 이 이야기의 화자.",
      "char.remarqueAlt": "노년의 레마르크",
      "char.02": "CHARACTER 02",
      "char.anderson": "엔더슨 <span>ANDERSON</span>",
      "char.andersonBio":
        "레마르크의 손자. 할아버지의 군대 이야기에 흥미를 가지고 귀 기울이는 청자. 회상의 문을 여는 사람.",
      "char.andersonAlt": "손자 엔더슨",
      "char.03": "CHARACTER 03",
      "char.nick": "닉 캐러웨이 <span>NICK CARRAWAY</span>",
      "char.nickBio":
        "109 보병사단 준위. 실전이 처음인 레마르크 소령이 전장에 적응할 수 있도록 곁에서 도운 인물.",
      "char.nickAlt": "닉 캐러웨이 준위",
      "system.label": "02 — CORE LOOP",
      "sys.01.title": "도청 & 정보 수집 <span>INTERCEPT</span>",
      "sys.01.body":
        "도청이 시작되면 해독기가 적군의 모스 부호를 한 글자씩 문자로 변환한다. 플레이어는 <strong>Tap</strong>으로 변환된 내용을 직접 받아 적는다.",
      "sys.02.title": "정보 해석 <span>ANALYZE</span>",
      "sys.02.body":
        "수집한 도청 내용을 해석한다. 이를 통해 적군의 다음 행동, 교신 시간, 그리고 주파수를 읽어낸다.",
      "sys.03.title": "명령 송신 <span>COMMAND</span>",
      "sys.03.body":
        "해석한 정보를 바탕으로 모스 부호표를 보며 명령을 송신한다. 아군 유닛을 이동시키거나 공격 명령을 내린다.",
      "sys.04.title": "도청 준비 <span>TUNE</span>",
      "sys.04.body":
        "다음 도청을 위해 주파수와 시간을 라디오와 시계에 입력한다. 잘못 맞추면 도청은 실패하고, 놓친 정보는 첩보란에서만 일부 확인할 수 있다.",
      "controls.label": "CONTROLS",
      "ctrl.dot": "단점 · 생성",
      "ctrl.dash": "장점 — 생성",
      "ctrl.enter": "변환",
      "ctrl.enterEm": "문자 / 숫자",
      "ctrl.radio": "라디오",
      "ctrl.radioEm": "주파수",
      "ctrl.clock": "시계",
      "ctrl.clockEm": "교신 시간",
      "ctrl.tap": "메모장",
      "ctrl.tapEm": "받아쓰기",
      "screens.label": "INSIDE THE GAME — 트레일러 & 인게임 화면",
      "trailer.title": "War In The Dark — 인디크래프트 출품 영상",
      "trailer.caption": "TRAILER — 인디크래프트 출품 영상",
      "screen.title": "TITLE — 메인 화면",
      "screen.titleAlt": "War In The Dark 타이틀 화면",
      "screen.battle": "BATTLEFIELD — 전장에서의 지휘",
      "screen.battleAlt": "전장 전술 화면 — 모스 명령으로 유닛을 지휘한다",
      "screen.radio": "RADIO — 도청 주파수 설정",
      "screen.radioAlt": "도청 주파수 설정 라디오 화면",
      "screen.clock": "CLOCK — 도청 시간 설정",
      "screen.clockAlt": "도청 시간 설정 화면",
      "screen.ops": "OPERATIONS — 스테이지 선택",
      "screen.opsAlt": "스테이지 선택 화면 — 잠긴 작전들",
      "features.label": "03 — KEY FEATURES",
      "feat.01.title": "암호 해독 기반의 전투",
      "feat.01.body":
        "단순한 전투 중심의 플레이에서 벗어나 정보전의 중요성을 강조합니다. 신호를 빠르고 정확하게 해석해 적의 의도를 파악하고, 지상 부대를 효율적으로 통제해야 합니다.",
      "feat.02.title": "모스 부호 송수신",
      "feat.02.body":
        "아군 명령과 적군 감청이 단순 텍스트가 아닌 모스 부호라는 암호화된 형태로 진행됩니다. 낯선 정보 형식을 직접 해독해 내는 강렬한 쾌감을 제공합니다.",
      "feat.03.title": "1-Bit Pixel Art",
      "feat.03.body":
        "단 두 색(<code>#222323</code> · <code>#F0F6F0</code>)의 픽셀 아트로 단순하지만 강렬한 대비를 구현했습니다. 흑백의 전장이 전쟁 특유의 긴박함과 냉정함을 전달합니다.",
      "units.label": "FIELD UNITS",
      "units.count": "추후 다양한 병과 확장 예정",
      "unit.scout": "정찰병 <span>SCOUT</span>",
      "unit.scoutTrait": "넓은 범위를 탐색하며 적의 위치를 파악하는 데 유리.",
      "unit.scoutAlt": "정찰병 스프라이트",
      "unit.infantry": "보병 <span>INFANTRY</span>",
      "unit.infantryTrait": "높은 체력으로 적과의 장기 전투에 유리.",
      "unit.infantryAlt": "보병 스프라이트",
      "unit.sniper": "저격수 <span>SNIPER</span>",
      "unit.sniperTrait": "상하좌우 원거리 사격에 특화. 체력은 낮다.",
      "unit.sniperAlt": "저격수 스프라이트",
      "stat.move": "이동",
      "stat.atk": "공격력",
      "stat.range": "공격 범위",
      "stat.hp": "체력",
      "stat.vision": "시야",
      "roadmap.label": "04 — PROJECT ROAD MAP",
      "roadmap.count": "TO STEAM LAUNCH",
      "tl.01.body": "안정화 및 피드백 수렴 — 패치를 통한 버그 수정과 밸런스 조절.",
      "tl.02.body": "신규 스테이지 제작 — 스테이지 3·4·5의 스토리와 메커니즘 구현.",
      "tl.03.body": "병력 시스템 확장 — 특전·의무 등 특수 병과의 특성·스탯·외형 개발.",
      "tl.04.body": "추가 콘텐츠 개발 — 연습 모드, 무한 모드 등 다양한 모드와 난이도.",
      "tl.05.body": "The final mission begins. 완성본 스팀 출시와 글로벌 시장 진출.",
      "awards.label": "AWARDS",
      "award.01": "전북 인디게임 공모전 <strong>우수상</strong> — 한국모바일게임협회장상",
      "award.02": "서울 SBA × 슈퍼빌런랩스 게임 콘테스트 <strong>우수상</strong> — 서울경제진흥원장상",
      "award.03": "Play X4 IndieSeed Challenge IR Pitching <strong>2등</strong> — 독보적 존재감 상",
      "award.04": "2026 인디크래프트 '챌린저 부문' <strong>20명</strong>",
      "studio.label": "THE STUDIO",
      "studio.statement":
        "새싹 스튜디오는 <em>식물과 게임을 사랑하는</em> 1인 개발자 <span>김시준</span>의 작업실입니다. 한 알의 씨앗이 어둠 속에서 싹을 틔우듯, 작은 아이디어를 깊은 세계로 길러내는 일에 몰두합니다.",
      "studio.bio":
        "2002년생. 중앙대학교 식물생명공학과와 게임·인터랙티브 미디어학과를 복수전공하고 소프트웨어학을 부전공으로 이수 중입니다.",
      "contact.label": "GET IN TOUCH",
      "contact.title": "함께,<br />어둠 속에서.",
      "footer.copy": "© 2026 SPROUT STUDIO · 김시준. ALL RIGHTS RESERVED."
    },

    en: {
      "meta.description":
        "Sprout Studio — solo indie developer Sijun Kim. Flagship title War In The Dark is a 1-bit turn-based interception simulation set in a fictional 1950s war.",
      "meta.ogTitle": "Sprout Studio — War In The Dark",
      "meta.ogDesc": "Intercept enemy Morse signals and command your forces. A 1-bit turn-based interception simulation.",
      "meta.title": "Sprout Studio — War In The Dark",
      "aria.home": "Sprout Studio home",
      "aria.lang": "Language",
      "aria.menu": "Toggle menu",
      "aria.scroll": "Scroll to game",
      "hero.eyebrow": "INDEPENDENT GAME STUDIO — SOLO DEVELOPED",
      "hero.title": "We grow stories<br />in the dark.",
      "hero.sub":
        "Intercept enemy Morse signals and command your forces.<br />A fictional 1950s war. <span>1-bit turn-based interception simulation</span>.",
      "game.label": "FLAGSHIP TITLE",
      "game.count": "2026 — 2027",
      "game.logline":
        "Set in a fictional 1950s war, you intercept enemy Morse signals and command your allies in a <strong>1-bit turn-based interception simulation</strong>. Not just combat — decoding the tension of information warfare in the dark.",
      "game.platform": "PLATFORM",
      "game.platformVal": "PC · Steam",
      "game.genre": "GENRE",
      "game.genreVal": "Turn-Based War · Military Strategy",
      "game.schedule": "SCHEDULE",
      "game.scheduleVal": "2026.10 1st CBT · 2027.01 2nd CBT · 2027 Steam",
      "game.cta": "WISHLIST & FOLLOW <span class=\"text-btn-arrow\">→</span>",
      "story.label": "01 — STORY",
      "story.text":
        "Veteran <em>Remarque</em> lies in a hospital bed. His grandson <em>Anderson</em> brings a faded photo from his army days. It stirs memories of the commander once famous for interception and wiretapping. As he tells his war story, everything begins again on the day he was first assigned to the 5th Infantry Division at the front.",
      "story.caption": "Where the memory begins — a hospital room overlooking the city",
      "story.sceneAlt": "Hospital room overlooking the city skyline — where the recollection begins",
      "char.01": "CHARACTER 01",
      "char.remarque": "Remarque <span>REMARQUE</span>",
      "char.remarqueBio":
        "A commander once renowned for interception and wiretapping. After retirement his health declined; from his hospital bed he recounts his war to his grandson. The narrator of this story.",
      "char.remarqueAlt": "Elderly Remarque",
      "char.02": "CHARACTER 02",
      "char.anderson": "Anderson <span>ANDERSON</span>",
      "char.andersonBio":
        "Remarque's grandson. A listener drawn to his grandfather's army stories — the one who opens the door to memory.",
      "char.andersonAlt": "Grandson Anderson",
      "char.03": "CHARACTER 03",
      "char.nick": "Nick Carraway <span>NICK CARRAWAY</span>",
      "char.nickBio":
        "Warrant officer of the 109th Infantry Division. Helped Major Remarque adapt to the battlefield on his first real deployment.",
      "char.nickAlt": "Warrant Officer Nick Carraway",
      "system.label": "02 — CORE LOOP",
      "sys.01.title": "Intercept & Gather <span>INTERCEPT</span>",
      "sys.01.body":
        "When interception begins, the decoder turns enemy Morse into letters one by one. Players take dictation of the decoded content with <strong>Tap</strong>.",
      "sys.02.title": "Analyze Intel <span>ANALYZE</span>",
      "sys.02.body":
        "Interpret the intercepted messages to read the enemy's next move, contact time, and frequency.",
      "sys.03.title": "Send Orders <span>COMMAND</span>",
      "sys.03.body":
        "Using a Morse chart, transmit orders based on what you learned — move allied units or issue attacks.",
      "sys.04.title": "Prepare Next Tune <span>TUNE</span>",
      "sys.04.body":
        "Enter the next frequency and time on the radio and clock. Miss it and interception fails; missed intel only partially appears in the intel log.",
      "controls.label": "CONTROLS",
      "ctrl.dot": "Dot · create",
      "ctrl.dash": "Dash — create",
      "ctrl.enter": "Convert",
      "ctrl.enterEm": "Letter / Number",
      "ctrl.radio": "Radio",
      "ctrl.radioEm": "Frequency",
      "ctrl.clock": "Clock",
      "ctrl.clockEm": "Contact time",
      "ctrl.tap": "Notepad",
      "ctrl.tapEm": "Dictation",
      "screens.label": "INSIDE THE GAME — Trailer & Screenshots",
      "trailer.title": "War In The Dark — Indiecraft submission trailer",
      "trailer.caption": "TRAILER — Indiecraft submission",
      "screen.title": "TITLE — Main screen",
      "screen.titleAlt": "War In The Dark title screen",
      "screen.battle": "BATTLEFIELD — Command on the field",
      "screen.battleAlt": "Tactical battlefield — command units via Morse",
      "screen.radio": "RADIO — Interception frequency",
      "screen.radioAlt": "Radio screen for interception frequency",
      "screen.clock": "CLOCK — Interception time",
      "screen.clockAlt": "Clock screen for interception timing",
      "screen.ops": "OPERATIONS — Stage select",
      "screen.opsAlt": "Stage select — locked operations",
      "features.label": "03 — KEY FEATURES",
      "feat.01.title": "Combat built on cryptography",
      "feat.01.body":
        "Beyond combat-first play, the game stresses information warfare. Decode signals quickly and accurately to grasp enemy intent and control ground forces efficiently.",
      "feat.02.title": "Morse send & receive",
      "feat.02.body":
        "Allied orders and enemy intercepts arrive as Morse — not plain text. Decoding an unfamiliar format delivers a sharp sense of mastery.",
      "feat.03.title": "1-Bit Pixel Art",
      "feat.03.body":
        "Only two colors (<code>#222323</code> · <code>#F0F6F0</code>) create stark contrast. A monochrome battlefield conveys the urgency and coldness of war.",
      "units.label": "FIELD UNITS",
      "units.count": "More unit types coming",
      "unit.scout": "Scout <span>SCOUT</span>",
      "unit.scoutTrait": "Excels at scouting wide areas and locating enemies.",
      "unit.scoutAlt": "Scout sprite",
      "unit.infantry": "Infantry <span>INFANTRY</span>",
      "unit.infantryTrait": "High HP — strong in prolonged fights.",
      "unit.infantryAlt": "Infantry sprite",
      "unit.sniper": "Sniper <span>SNIPER</span>",
      "unit.sniperTrait": "Specialized in cardinal-direction long-range fire. Low HP.",
      "unit.sniperAlt": "Sniper sprite",
      "stat.move": "Move",
      "stat.atk": "Attack",
      "stat.range": "Range",
      "stat.hp": "HP",
      "stat.vision": "Vision",
      "roadmap.label": "04 — PROJECT ROAD MAP",
      "roadmap.count": "TO STEAM LAUNCH",
      "tl.01.body": "Stabilization & feedback — bug fixes and balance via patches.",
      "tl.02.body": "New stages — story and mechanics for stages 3, 4, and 5.",
      "tl.03.body": "Unit expansion — special units (e.g. special forces, medics): traits, stats, visuals.",
      "tl.04.body": "Extra modes — practice, endless, and more difficulties.",
      "tl.05.body": "The final mission begins. Full Steam launch and global release.",
      "awards.label": "AWARDS",
      "award.01": "Jeonbuk Indie Game Contest <strong>Excellence Award</strong> — Korea Mobile Game Association",
      "award.02": "Seoul SBA × Supervillain Labs Contest <strong>Excellence Award</strong> — SBA",
      "award.03": "Play X4 IndieSeed Challenge IR Pitching <strong>2nd</strong> — Distinct Presence Award",
      "award.04": "2026 Indiecraft Challenger Division — <strong>Top 20</strong>",
      "studio.label": "THE STUDIO",
      "studio.statement":
        "Sprout Studio is the workshop of solo developer <span>Sijun Kim</span>, who <em>loves plants and games</em>. Like a seed sprouting in the dark, we grow small ideas into deep worlds.",
      "studio.bio":
        "Born in 2002. Double-majoring in Plant Biotechnology and Game & Interactive Media at Chung-Ang University, with a minor in Software.",
      "contact.label": "GET IN TOUCH",
      "contact.title": "Together,<br />in the dark.",
      "footer.copy": "© 2026 SPROUT STUDIO · Sijun Kim. ALL RIGHTS RESERVED."
    },

    ja: {
      "meta.description":
        "スプラウトスタジオ（Sprout Studio）— ソロ開発者キム・シジュンのインディーゲームスタジオ。代表作『War In The Dark』は1950年代の架空の戦争を舞台にした1-bitターン制傍受シミュレーションです。",
      "meta.ogTitle": "スプラウトスタジオ — War In The Dark",
      "meta.ogDesc": "敵のモールス信号を傍受し、友軍を指揮せよ。1-bitターン制傍受シミュレーション。",
      "meta.title": "スプラウトスタジオ (Sprout Studio) — War In The Dark",
      "aria.home": "スプラウトスタジオ ホーム",
      "aria.lang": "言語選択",
      "aria.menu": "メニューを開く",
      "aria.scroll": "ゲームへスクロール",
      "hero.eyebrow": "INDEPENDENT GAME STUDIO — SOLO DEVELOPED",
      "hero.title": "We grow stories<br />in the dark.",
      "hero.sub":
        "敵のモールス信号を傍受し、友軍を指揮せよ。<br />1950年代の架空の戦争。<span>1-bitターン制傍受シミュレーション</span>。",
      "game.label": "FLAGSHIP TITLE",
      "game.count": "2026 — 2027",
      "game.logline":
        "1950年代の架空の戦争を舞台に、敵のモールス信号を傍受して友軍を指揮する<strong>1-bitターン制傍受シミュレーション</strong>。単なる戦闘ではなく、暗闇の情報戦の緊張を自ら解読する体験です。",
      "game.platform": "PLATFORM",
      "game.platformVal": "PC · Steam",
      "game.genre": "GENRE",
      "game.genreVal": "Turn-Based War · Military Strategy",
      "game.schedule": "SCHEDULE",
      "game.scheduleVal": "2026.10 1st CBT · 2027.01 2nd CBT · 2027 Steam",
      "game.cta": "WISHLIST & FOLLOW <span class=\"text-btn-arrow\">→</span>",
      "story.label": "01 — STORY",
      "story.text":
        "老兵<em>レマルク</em>は病床に横たわっている。孫の<em>アンダーソン</em>が持ってきた軍時代の色あせた写真一枚。その写真は、傍受と盗聴で名を馳せた指揮官時代の記憶を呼び起こす。孫に戦争の話を語る回想の中で、すべては彼が前方第5歩兵師団に初めて配属された日から再び始まる。",
      "story.caption": "回想が始まる場所 — 街を見下ろす病室",
      "story.sceneAlt": "街のスカイラインが見える病室 — 回想が始まる場所",
      "char.01": "CHARACTER 01",
      "char.remarque": "レマルク <span>REMARQUE</span>",
      "char.remarqueBio":
        "傍受・盗聴で名を馳せた指揮官。退役後に健康を害し病床に伏しながら、孫に自らの戦争を語る。この物語の語り手。",
      "char.remarqueAlt": "老年のレマルク",
      "char.02": "CHARACTER 02",
      "char.anderson": "アンダーソン <span>ANDERSON</span>",
      "char.andersonBio":
        "レマルクの孫。祖父の軍隊の話に興味を持ち耳を傾ける聞き手。回想の扉を開く人物。",
      "char.andersonAlt": "孫のアンダーソン",
      "char.03": "CHARACTER 03",
      "char.nick": "ニック・キャラウェイ <span>NICK CARRAWAY</span>",
      "char.nickBio":
        "第109歩兵師団の准尉。実戦が初めてのレマルク少佐が戦場に適応できるよう傍らで支えた人物。",
      "char.nickAlt": "ニック・キャラウェイ准尉",
      "system.label": "02 — CORE LOOP",
      "sys.01.title": "傍受 & 情報収集 <span>INTERCEPT</span>",
      "sys.01.body":
        "傍受が始まると、復号機が敵のモールス符号を一文字ずつ文字へ変換する。プレイヤーは<strong>Tap</strong>で変換内容を自ら書き取る。",
      "sys.02.title": "情報解析 <span>ANALYZE</span>",
      "sys.02.body":
        "収集した傍受内容を解析する。敵の次の行動、交信時間、周波数を読み取る。",
      "sys.03.title": "命令送信 <span>COMMAND</span>",
      "sys.03.body":
        "解析した情報をもとにモールス符号表を見ながら命令を送信する。友軍ユニットを移動させたり攻撃命令を出す。",
      "sys.04.title": "傍受準備 <span>TUNE</span>",
      "sys.04.body":
        "次の傍受のため、周波数と時間をラジオと時計に入力する。間違えれば傍受は失敗し、逃した情報は諜報欄で一部しか確認できない。",
      "controls.label": "CONTROLS",
      "ctrl.dot": "短点 · 生成",
      "ctrl.dash": "長点 — 生成",
      "ctrl.enter": "変換",
      "ctrl.enterEm": "文字 / 数字",
      "ctrl.radio": "ラジオ",
      "ctrl.radioEm": "周波数",
      "ctrl.clock": "時計",
      "ctrl.clockEm": "交信時間",
      "ctrl.tap": "メモ帳",
      "ctrl.tapEm": "書き取り",
      "screens.label": "INSIDE THE GAME — トレーラー & ゲーム画面",
      "trailer.title": "War In The Dark — インディクラフト出展映像",
      "trailer.caption": "TRAILER — インディクラフト出展映像",
      "screen.title": "TITLE — メイン画面",
      "screen.titleAlt": "War In The Dark タイトル画面",
      "screen.battle": "BATTLEFIELD — 戦場での指揮",
      "screen.battleAlt": "戦場戦術画面 — モールス命令でユニットを指揮する",
      "screen.radio": "RADIO — 傍受周波数設定",
      "screen.radioAlt": "傍受周波数設定ラジオ画面",
      "screen.clock": "CLOCK — 傍受時間設定",
      "screen.clockAlt": "傍受時間設定画面",
      "screen.ops": "OPERATIONS — ステージ選択",
      "screen.opsAlt": "ステージ選択画面 — ロックされた作戦",
      "features.label": "03 — KEY FEATURES",
      "feat.01.title": "暗号解読に基づく戦闘",
      "feat.01.body":
        "単なる戦闘中心のプレイから離れ、情報戦の重要性を強調します。信号を素早く正確に解読し敵の意図を掴み、地上部隊を効率的に統制する必要があります。",
      "feat.02.title": "モールス符号の送受信",
      "feat.02.body":
        "友軍命令と敵軍傍受が平文ではなくモールスという暗号化された形で進行します。見慣れない情報形式を自ら解読する強烈な快感を提供します。",
      "feat.03.title": "1-Bit Pixel Art",
      "feat.03.body":
        "わずか二色（<code>#222323</code> · <code>#F0F6F0</code>）のピクセルアートで、シンプルだが強烈なコントラストを実現。モノクロの戦場が戦争特有の緊迫と冷静さを伝えます。",
      "units.label": "FIELD UNITS",
      "units.count": "今後さまざまな兵科を拡張予定",
      "unit.scout": "偵察兵 <span>SCOUT</span>",
      "unit.scoutTrait": "広い範囲を探索し、敵の位置把握に有利。",
      "unit.scoutAlt": "偵察兵スプライト",
      "unit.infantry": "歩兵 <span>INFANTRY</span>",
      "unit.infantryTrait": "高い体力で敵との長期戦に有利。",
      "unit.infantryAlt": "歩兵スプライト",
      "unit.sniper": "狙撃手 <span>SNIPER</span>",
      "unit.sniperTrait": "上下左右の遠距離射撃に特化。体力は低い。",
      "unit.sniperAlt": "狙撃手スプライト",
      "stat.move": "移動",
      "stat.atk": "攻撃力",
      "stat.range": "攻撃範囲",
      "stat.hp": "体力",
      "stat.vision": "視界",
      "roadmap.label": "04 — PROJECT ROAD MAP",
      "roadmap.count": "TO STEAM LAUNCH",
      "tl.01.body": "安定化とフィードバック収集 — パッチによるバグ修正とバランス調整。",
      "tl.02.body": "新規ステージ制作 — ステージ3・4・5のストーリーとメカニクス実装。",
      "tl.03.body": "兵力システム拡張 — 特戦・衛生など特殊兵科の特性・ステータス・外見開発。",
      "tl.04.body": "追加コンテンツ — 練習モード、無限モードなど多様なモードと難易度。",
      "tl.05.body": "The final mission begins. 完成版のSteam発売とグローバル展開。",
      "awards.label": "AWARDS",
      "award.01": "全北インディーゲーム公募展 <strong>優秀賞</strong> — 韓国モバイルゲーム協会長賞",
      "award.02": "ソウル SBA × スーパーヴィランラブス コンテスト <strong>優秀賞</strong> — ソウル経済振興院長賞",
      "award.03": "Play X4 IndieSeed Challenge IR Pitching <strong>2位</strong> — 独歩的存在感賞",
      "award.04": "2026 インディクラフト『チャレンジャー部門』 <strong>20名</strong>",
      "studio.label": "THE STUDIO",
      "studio.statement":
        "スプラウトスタジオは、<em>植物とゲームを愛する</em>ソロ開発者<span>キム・シジュン</span>の作業場です。一粒の種が闇の中で芽吹くように、小さなアイデアを深い世界へ育てることに没頭しています。",
      "studio.bio":
        "2002年生まれ。中央大学校で植物生命工学とゲーム・インタラクティブメディアを複専攻し、ソフトウェア学を副専攻しています。",
      "contact.label": "GET IN TOUCH",
      "contact.title": "共に、<br />闇の中で。",
      "footer.copy": "© 2026 SPROUT STUDIO · キム・シジュン. ALL RIGHTS RESERVED."
    }
  };

  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    return "ko";
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "ko";
    var pack = dict[lang];
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!pack[key]) return;
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = pack[key];
      } else {
        el.textContent = pack[key];
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var raw = el.getAttribute("data-i18n-attr");
      if (!raw) return;
      raw.split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length < 2) return;
        var attr = parts[0].trim();
        var key = parts[1].trim();
        if (pack[key]) el.setAttribute(attr, pack[key]);
      });
    });

    if (pack["meta.title"]) document.title = pack["meta.title"];
    var desc = document.querySelector('meta[name="description"]');
    if (desc && pack["meta.description"]) desc.setAttribute("content", pack["meta.description"]);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && pack["meta.ogTitle"]) ogTitle.setAttribute("content", pack["meta.ogTitle"]);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && pack["meta.ogDesc"]) ogDesc.setAttribute("content", pack["meta.ogDesc"]);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function init() {
    var switcher = document.getElementById("langSwitcher");
    if (switcher) {
      switcher.addEventListener("click", function (e) {
        var btn = e.target.closest(".lang-btn");
        if (!btn) return;
        applyLang(btn.getAttribute("data-lang"));
      });
    }
    applyLang(getStoredLang());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.SproutI18n = { set: applyLang, get: getStoredLang };
})();
