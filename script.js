const game = document.getElementById("game");
const scene = document.getElementById("scene");
const hero = document.getElementById("hero");
const enemyGroup = document.getElementById("enemyGroup");
const slashEffect = document.getElementById("slashEffect");
const slashFlash = document.getElementById("slashFlash");
const bloodSpark = document.getElementById("bloodSpark");
const judgement = document.getElementById("judgement");
const timingTip = document.getElementById("timingTip");
const startNotice = document.getElementById("startNotice");
const scoreBoard = document.getElementById("scoreBoard");
const finalScore = document.getElementById("finalScore");
const finalCombo = document.getElementById("finalCombo");
const finalPower = document.getElementById("finalPower");
const finalRank = document.getElementById("finalRank");
const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");
const timerText = document.getElementById("timerText");
const powerBar = document.getElementById("powerBar");
const powerText = document.getElementById("powerText");
const beatStatus = document.getElementById("beatStatus");
const rhythmLane = document.getElementById("rhythmLane");
const hitCircle = document.getElementById("hitCircle");
const noteContainer = document.getElementById("noteContainer");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const musicButton = document.getElementById("musicButton");
const musicInput = document.getElementById("musicInput");
const metronomeToggle = document.getElementById("metronomeToggle");
const bgm = document.getElementById("bgm");
const titleScreen = document.getElementById("titleScreen");
const titleStartButton = document.getElementById("titleStartButton");
const stageScreen = document.getElementById("stageScreen");
const stageOneCard = document.getElementById("stageOneCard");
const stageTwoCard = document.getElementById("stageTwoCard");
const stageThreeCard = document.getElementById("stageThreeCard");
const stageBackButton = document.getElementById("stageBackButton");
const stagePreviewHint = document.getElementById("stagePreviewHint");
const bossEnemy = document.getElementById("bossEnemy");
const bossHud = document.getElementById("bossHud");
const bossHpText = document.getElementById("bossHpText");
const bossHpBar = document.getElementById("bossHpBar");
const rankingBoard = document.getElementById("rankingBoard");
const rankingList = document.getElementById("rankingList");

const STORAGE_STAGE2_UNLOCKED = "gumMooJeongi_stage2_unlocked_v1";
const STORAGE_STAGE3_UNLOCKED = "gumMooJeongi_stage3_unlocked_v1";
const STORAGE_STAGE3_RANKING = "gumMooJeongi_stage3_rankings_v1";
const DEFAULT_STAGE_ID = 1;
const STAGE3_BOSS_MAX_HP = 4500;

const RAW_STAGE_TWO_CHART = [
  {
    "time": 1.138,
    "type": "tap"
  },
  {
    "time": 1.324,
    "type": "tap"
  },
  {
    "time": 1.881,
    "type": "tap"
  },
  {
    "time": 2.276,
    "type": "tap"
  },
  {
    "time": 2.647,
    "type": "tap"
  },
  {
    "time": 3.019,
    "type": "tap"
  },
  {
    "time": 3.204,
    "type": "tap"
  },
  {
    "time": 3.39,
    "type": "double"
  },
  {
    "time": 3.762,
    "type": "tap"
  },
  {
    "time": 3.947,
    "type": "tap"
  },
  {
    "time": 4.528,
    "type": "tap"
  },
  {
    "time": 4.899,
    "type": "tap"
  },
  {
    "time": 5.271,
    "type": "tap"
  },
  {
    "time": 5.457,
    "type": "tap"
  },
  {
    "time": 5.642,
    "type": "tap"
  },
  {
    "time": 6.385,
    "type": "hold",
    "duration": 0.62
  },
  {
    "time": 7.152,
    "type": "tap"
  },
  {
    "time": 7.895,
    "type": "tap"
  },
  {
    "time": 8.266,
    "type": "tap"
  },
  {
    "time": 8.638,
    "type": "tap"
  },
  {
    "time": 9.009,
    "type": "tap"
  },
  {
    "time": 9.381,
    "type": "tap"
  },
  {
    "time": 9.59,
    "type": "double"
  },
  {
    "time": 9.961,
    "type": "tap"
  },
  {
    "time": 10.147,
    "type": "tap"
  },
  {
    "time": 10.333,
    "type": "tap"
  },
  {
    "time": 10.704,
    "type": "tap"
  },
  {
    "time": 10.89,
    "type": "tap"
  },
  {
    "time": 11.633,
    "type": "hold",
    "duration": 0.62
  },
  {
    "time": 12.399,
    "type": "tap"
  },
  {
    "time": 12.585,
    "type": "tap"
  },
  {
    "time": 12.771,
    "type": "tap"
  },
  {
    "time": 13.142,
    "type": "tap"
  },
  {
    "time": 13.328,
    "type": "tap"
  },
  {
    "time": 13.886,
    "type": "tap"
  },
  {
    "time": 14.257,
    "type": "tap"
  },
  {
    "time": 15.023,
    "type": "tap"
  },
  {
    "time": 15.209,
    "type": "tap"
  },
  {
    "time": 15.395,
    "type": "double"
  },
  {
    "time": 15.766,
    "type": "tap"
  },
  {
    "time": 15.952,
    "type": "tap"
  },
  {
    "time": 16.324,
    "type": "tap"
  },
  {
    "time": 16.509,
    "type": "tap"
  },
  {
    "time": 16.881,
    "type": "tap"
  },
  {
    "time": 17.276,
    "type": "tap"
  },
  {
    "time": 17.461,
    "type": "tap"
  },
  {
    "time": 17.647,
    "type": "hold",
    "duration": 0.62
  },
  {
    "time": 18.39,
    "type": "tap"
  },
  {
    "time": 18.576,
    "type": "tap"
  },
  {
    "time": 18.762,
    "type": "tap"
  },
  {
    "time": 19.133,
    "type": "tap"
  },
  {
    "time": 19.9,
    "type": "tap"
  },
  {
    "time": 20.271,
    "type": "double"
  },
  {
    "time": 20.643,
    "type": "tap"
  },
  {
    "time": 21.014,
    "type": "tap"
  },
  {
    "time": 21.386,
    "type": "tap"
  },
  {
    "time": 21.571,
    "type": "hold",
    "duration": 0.72
  },
  {
    "time": 22.523,
    "type": "tap"
  },
  {
    "time": 22.895,
    "type": "tap"
  },
  {
    "time": 23.452,
    "type": "tap"
  },
  {
    "time": 23.638,
    "type": "tap"
  },
  {
    "time": 24.381,
    "type": "tap"
  },
  {
    "time": 24.59,
    "type": "double"
  },
  {
    "time": 25.147,
    "type": "tap"
  },
  {
    "time": 25.333,
    "type": "tap"
  },
  {
    "time": 25.89,
    "type": "tap"
  },
  {
    "time": 26.262,
    "type": "tap"
  },
  {
    "time": 26.633,
    "type": "tap"
  },
  {
    "time": 27.005,
    "type": "tap"
  },
  {
    "time": 27.585,
    "type": "hold",
    "duration": 0.72
  },
  {
    "time": 28.514,
    "type": "tap"
  },
  {
    "time": 28.886,
    "type": "tap"
  },
  {
    "time": 29.629,
    "type": "tap"
  }
];


function protectHoldSpacing(chart, options = {}) {
  const lead = options.lead ?? 1.36;
  const beforeGap = options.beforeGap ?? 0.18;
  const afterGap = options.afterGap ?? 0.12;
  const holds = chart.filter((note) => note.type === "hold");

  return chart
    .filter((note) => {
      if (note.type === "hold") return true;

      return !holds.some((hold) => {
        const holdStart = hold.time;
        const holdEnd = hold.time + (hold.duration || 0.6);
        const protectedStart = holdStart - beforeGap;
        const protectedEnd = holdEnd + lead + afterGap;
        return note.time >= protectedStart && note.time < protectedEnd;
      });
    })
    .sort((a, b) => a.time - b.time);
}

const STAGE_TWO_CHART = protectHoldSpacing(RAW_STAGE_TWO_CHART, {
  lead: 1.36,
  beforeGap: 0.18,
  afterGap: 0.12
});


function buildStageThreeChart() {
  const bpm = 161.5;
  const beat = 60 / bpm;
  const chart = [];
  const gapPattern = [1, 1, 1.5, 1, 1.25, 1.75, 1, 1, 1.5, 2, 1, 1.25, 1.5, 1, 2.25];
  let index = 0;
  let t = 1.35;

  // v27: Stage 3 HOLD 보호구간 적용
  // HOLD 노트를 누르는 동안 다음 노트가 화면에 내려오지 않도록
  // HOLD 종료 + 노트 리드 시간만큼 뒤 노트를 비워둡니다.
  while (t < 30.15) {
    let type = "tap";
    let duration = 0;

    if (index % 14 === 5 || index % 18 === 11) {
      type = "hold";
      duration = index % 28 === 5 ? 0.64 : 0.74;
    } else if (index % 9 === 4 || index % 16 === 10) {
      type = "double";
    }

    chart.push({ time: Number(t.toFixed(3)), type, ...(duration ? { duration } : {}) });
    t += beat * gapPattern[index % gapPattern.length];
    index += 1;
  }

  return protectHoldSpacing(chart.sort((a, b) => a.time - b.time), {
    lead: 1.35,
    beforeGap: 0.2,
    afterGap: 0.14
  });
}

const STAGE_THREE_CHART = buildStageThreeChart();

const STAGES = {
  1: {
    id: 1,
    title: "검무전기",
    subtitle: "도장 안의 첫 수련",
    songName: "Steel Against Night",
    musicPath: "assets/Steel_Against_Night.mp3",
    fallbackPath: "Steel_Against_Night.mp3",
    bpm: 122,
    duration: 30.78,
    noteMode: "pattern",
    firstHitTime: 1.35,
    noteLead: 1.42,
    noteSpeed: 66,
    notePattern: [1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.25, 0.5, 1, 1.5],
    perfectWindow: 0.075,
    goodWindow: 0.17,
    backgroundClass: "stage-one-active",
    clearUnlocks: 2
  },
  2: {
    id: 2,
    title: "월하죽림",
    subtitle: "어두운 밤의 연무장",
    songName: "Steel Against Bamboo",
    musicPath: "assets/Steel_Against_Bamboo.mp3",
    fallbackPath: "Steel_Against_Bamboo.mp3",
    bpm: 161.5,
    duration: 30.78,
    noteMode: "chart",
    noteLead: 1.36,
    noteSpeed: 76,
    chart: STAGE_TWO_CHART,
    perfectWindow: 0.062,
    goodWindow: 0.145,
    backgroundClass: "stage-two-active",
    clearUnlocks: 3
  },
  3: {
    id: 3,
    title: "무림맹주 결전",
    subtitle: "시간 제한 없는 보스 스테이지",
    songName: "Seven Strikes of Honor",
    musicPath: "assets/Seven_Strikes_of_Honor.mp3",
    fallbackPath: "Seven_Strikes_of_Honor.mp3",
    bpm: 161.5,
    duration: null,
    chartLoopDuration: 31.07,
    noteMode: "chartLoop",
    noteLead: 1.35,
    noteSpeed: 82,
    chart: STAGE_THREE_CHART,
    perfectWindow: 0.064,
    goodWindow: 0.15,
    backgroundClass: "stage-three-active",
    bossMode: true,
    bossMaxHp: STAGE3_BOSS_MAX_HP,
    damageGood: 10,
    damagePerfect: 20,
    clearUnlocks: null
  }
};

const state = {
  running: false,
  paused: false,
  pauseStart: 0,
  gameOver: false,
  titleOpen: true,
  stageSelectOpen: false,
  selectedStage: null,
  currentStageId: null,
  currentStage: null,
  previewingStageId: null,
  startTime: 0,
  score: 0,
  combo: 0,
  maxCombo: 0,
  power: 100,
  bpm: STAGES[1].bpm,
  musicReady: true,
  selectedMusicName: STAGES[1].songName,
  audioContext: null,
  notes: [],
  nextNoteId: 0,
  nextHitTime: 0,
  patternIndex: 0,
  chartIndex: 0,
  enemies: [],
  lastEnemyRespawn: 0,
  stage2Unlocked: false,
  stage3Unlocked: false,
  bossHp: STAGE3_BOSS_MAX_HP,
  bossMaxHp: STAGE3_BOSS_MAX_HP,
  bossDefeated: false,
  lastDamageAt: 0,
  spaceDown: false,
  activeHoldNote: null
};

const BAD_INPUT_DAMAGE = 7;
const MISS_DAMAGE = 12;
const HOLD_EARLY_DAMAGE = 10;
const STAGE3_DAMAGE_COOLDOWN_MS = 620;
const HIT_X = 7;
const ENEMY_ROWS = [20, 54, 82, 35, 68];

function safeLocalStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.warn("진행도 저장 실패:", error);
  }
}

function loadProgress() {
  state.stage2Unlocked = safeLocalStorageGet(STORAGE_STAGE2_UNLOCKED) === "true";
  state.stage3Unlocked = safeLocalStorageGet(STORAGE_STAGE3_UNLOCKED) === "true";
}

function saveStage2Unlock() {
  state.stage2Unlocked = true;
  safeLocalStorageSet(STORAGE_STAGE2_UNLOCKED, "true");
  updateStageCards();
}

function saveStage3Unlock() {
  state.stage3Unlocked = true;
  safeLocalStorageSet(STORAGE_STAGE3_UNLOCKED, "true");
  updateStageCards();
}

function isStageUnlocked(stageId) {
  if (stageId === 1) return true;
  if (stageId === 2) return state.stage2Unlocked;
  if (stageId === 3) return state.stage3Unlocked;
  return false;
}

function getStage(stageId = state.currentStageId || DEFAULT_STAGE_ID) {
  return STAGES[stageId] || STAGES[DEFAULT_STAGE_ID];
}

function beatDuration() {
  const stage = getStage();
  return 60 / (stage.bpm || state.bpm || 122);
}

function getPerfectWindow() {
  return getStage().perfectWindow || 0.075;
}

function getGoodWindow() {
  return getStage().goodWindow || 0.17;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setText(el, value) {
  if (el) el.textContent = value;
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.ceil(totalSeconds));
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const seconds = String(safeSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateTimer(gameTime = 0) {
  const stage = getStage();
  if (stage.bossMode || stage.duration === null) {
    if (timerText) {
      timerText.textContent = "BOSS";
      timerText.parentElement.classList.remove("timer-warning");
    }
    return;
  }

  const duration = stage.duration || 30.78;
  const remaining = Math.max(0, duration - gameTime);
  if (timerText) {
    timerText.textContent = formatTime(remaining);
    timerText.parentElement.classList.toggle("timer-warning", remaining <= 10);
  }
}

function getRank(score) {
  if (score >= 12000) return "천하제일";
  if (score >= 9000) return "절정고수";
  if (score >= 6500) return "일류검객";
  if (score >= 3500) return "무림검객";
  return "수련생";
}

function hideScoreBoard() {
  if (scoreBoard) scoreBoard.classList.add("hidden");
}

function updateStageCards() {
  const updateLockedCard = (card, stageId, guideSelector) => {
    if (!card) return;
    const unlocked = isStageUnlocked(stageId);
    card.classList.toggle("stage-card-locked", !unlocked);
    card.classList.toggle("stage-card-unlocked", unlocked);
    card.setAttribute("aria-disabled", unlocked ? "false" : "true");

    const guide = card.querySelector(guideSelector);
    const lockMark = card.querySelector(".stage-lock-mark");
    if (guide) {
      guide.textContent = unlocked
        ? "마우스를 올리면 미리듣기 · 클릭하면 시작"
        : `Stage ${stageId - 1} 클리어 후 해금`;
    }
    if (lockMark) lockMark.textContent = unlocked ? "解" : "🔒";
  };

  updateLockedCard(stageTwoCard, 2, ".stage-two-guide");
  updateLockedCard(stageThreeCard, 3, ".stage-three-guide");
}

function applyStageClass(stageId) {
  game.classList.remove("stage-one-active", "stage-two-active", "stage-three-active");
  const stage = getStage(stageId);
  if (stage.backgroundClass) game.classList.add(stage.backgroundClass);

  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    if (stageId === 3) subtitle.textContent = "Stage 3 · 무림맹주 보스전";
    else if (stageId === 2) subtitle.textContent = "Stage 2 · HOLD / 2연타 특수 노트";
    else subtitle.textContent = "Stage 1 · 기본 검기 노트";
  }
}

function applyStageMusic(stageId, preview = false) {
  if (!bgm) return false;

  const stage = getStage(stageId);
  const currentSrc = bgm.getAttribute("src");
  if (currentSrc !== stage.musicPath) {
    bgm.pause();
    bgm.setAttribute("src", stage.musicPath);
    bgm.load();
  }

  bgm.loop = preview;
  bgm.volume = preview ? 0.34 : 0.82;
  state.selectedMusicName = stage.songName;
  state.musicReady = true;
  return true;
}

function requireMusicBeforeStart(stageId) {
  return applyStageMusic(stageId, false);
}

function resetVisuals() {
  hero.classList.remove("slash", "hurt", "ready-glow", "input-flash");
  slashEffect.classList.remove("active", "weak");
  slashFlash.classList.remove("active");
  bloodSpark.classList.remove("active");
  scene.classList.remove("shake");
  game.classList.remove("flash-success", "flash-damage");
  hitCircle.classList.remove("pulse", "danger", "perfect-flash", "miss-flash");
}

function showJudgement(text, type = "") {
  judgement.className = "judgement";
  if (type) judgement.classList.add(type);
  judgement.textContent = text;
  void judgement.offsetWidth;
  judgement.classList.add("pop");
}

function hideTitleScreen() {
  state.titleOpen = false;
  if (!titleScreen) return;

  titleScreen.classList.add("hidden");
  titleScreen.setAttribute("aria-hidden", "true");
}

function showTitleScreen() {
  state.titleOpen = true;
  state.stageSelectOpen = false;
  stopStagePreview();

  if (stageScreen) {
    stageScreen.classList.add("hidden");
    stageScreen.setAttribute("aria-hidden", "true");
  }

  hideScoreBoard();
  hideRankingBoard();
  setBossVisible(false);

  if (titleScreen) {
    titleScreen.classList.remove("hidden");
    titleScreen.setAttribute("aria-hidden", "false");
  }
}

function showStageSelectScreen() {
  state.titleOpen = false;
  state.stageSelectOpen = true;
  state.selectedStage = null;
  stopStagePreview();
  updateStageCards();

  if (titleScreen) {
    titleScreen.classList.add("hidden");
    titleScreen.setAttribute("aria-hidden", "true");
  }

  if (stageScreen) {
    stageScreen.classList.remove("hidden");
    stageScreen.setAttribute("aria-hidden", "false");
  }

  if (startNotice) startNotice.classList.add("hidden");
  if (scoreBoard) scoreBoard.classList.add("hidden");
  hideRankingBoard();
  setBossVisible(false);
  showJudgement("STAGE SELECT", "good");
  timingTip.textContent = "Stage 1 → Stage 2 → Boss Stage 3 순서로 도전";
  beatStatus.textContent = "Stage 카드에 마우스를 올리면 해당 곡을 미리들을 수 있습니다";
}

function hideStageSelectScreen() {
  state.stageSelectOpen = false;
  if (!stageScreen) return;

  stageScreen.classList.add("hidden");
  stageScreen.setAttribute("aria-hidden", "true");
}

function updateStartNotice(mode = "ready") {
  if (!startNotice) return;

  const stage = getStage(state.currentStageId || DEFAULT_STAGE_ID);
  startNotice.classList.remove("hidden", "ready");

  if (mode === "hide") {
    startNotice.classList.add("hidden");
    return;
  }

  startNotice.classList.add("ready");
  startNotice.innerHTML = `
    <strong>전투 BGM 준비 완료</strong>
    <span>${stage.songName} · 스테이지 선택 후 클릭하면 음악과 함께 게임이 시작됩니다.</span>
  `;
}

function playStagePreview(stageId) {
  if (state.running) return;
  if (!isStageUnlocked(stageId)) {
    if (stagePreviewHint) {
      stagePreviewHint.textContent = stageId === 3
        ? "Stage 3는 Stage 2를 클리어해야 해금됩니다."
        : "Stage 2는 Stage 1을 클리어해야 해금됩니다.";
    }
    return;
  }
  if (!applyStageMusic(stageId, true)) return;

  try {
    bgm.pause();
    bgm.currentTime = 0;
    bgm.loop = true;
    bgm.volume = 0.34;
    state.previewingStageId = stageId;

    const playPromise = bgm.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        state.previewingStageId = null;
        if (stagePreviewHint) {
          stagePreviewHint.textContent = "브라우저가 미리듣기를 막았습니다. 스테이지를 클릭하면 음악과 함께 시작됩니다.";
        }
      });
    }

    if (stagePreviewHint) {
      const stage = getStage(stageId);
      stagePreviewHint.textContent = `${stage.songName} 미리듣기 중 · 클릭하면 처음부터 시작`;
    }
  } catch (error) {
    console.warn("스테이지 미리듣기 실패:", error);
  }
}

function stopStagePreview() {
  if (!bgm || state.running) return;

  if (state.previewingStageId !== null) {
    bgm.pause();
    bgm.currentTime = 0;
  }

  state.previewingStageId = null;
  if (stagePreviewHint && state.stageSelectOpen) {
    stagePreviewHint.textContent = "Stage 카드에 마우스를 올리면 해당 노래가 흘러나옵니다.";
  }
}

function selectStageAndStart(stageId) {
  if (!isStageUnlocked(stageId)) {
    showJudgement("잠김", "miss");
    if (stagePreviewHint) {
      stagePreviewHint.textContent = stageId === 3
        ? "Stage 2를 클리어하면 Boss Stage 3가 해금됩니다."
        : "Stage 1을 클리어하면 Stage 2가 해금됩니다.";
    }
    return;
  }

  state.selectedStage = stageId;
  stopStagePreview();
  startGame(stageId);
}

function handleStartFlow() {
  if (state.titleOpen) {
    showStageSelectScreen();
    return;
  }

  if (state.stageSelectOpen) return;

  if (state.running && !state.gameOver) {
    startGame(state.currentStageId || DEFAULT_STAGE_ID);
    return;
  }

  showStageSelectScreen();
}

function showScoreBoard(reason = "게임 종료") {
  if (!scoreBoard) return;
  if (startNotice) startNotice.classList.add("hidden");

  finalScore.textContent = `${state.score.toLocaleString("ko-KR")}점`;
  finalCombo.textContent = `${state.maxCombo}`;
  finalPower.textContent = `${state.power}`;
  finalRank.textContent = getRank(state.score);

  const title = scoreBoard.querySelector("strong");
  if (title) {
    if (reason === "수련 종료" && state.currentStageId === 1 && state.stage2Unlocked) {
      title.textContent = "Stage 1 Clear · Stage 2 해금";
    } else if (reason === "수련 종료" && state.currentStageId === 2) {
      title.textContent = "Stage 2 Clear · Boss Stage 3 해금";
    } else if (reason === "맹주 격파" && state.currentStageId === 3) {
      title.textContent = "Boss Clear · 무림맹주 격파";
    } else {
      title.textContent = reason === "수련 종료" ? "수련 종료" : "점수 보드";
    }
  }

  scoreBoard.classList.remove("hidden");
}

function updateHud() {
  setText(scoreEl, state.score.toLocaleString("ko-KR"));
  setText(comboEl, state.combo);
  setText(powerText, state.power);
  powerBar.style.width = `${clamp(state.power, 0, 100)}%`;
}


function updateBossHud() {
  if (!bossHud || !bossHpText || !bossHpBar) return;

  if (state.currentStageId !== 3) {
    bossHud.classList.add("hidden");
    return;
  }

  bossHud.classList.remove("hidden");
  bossHpText.textContent = `${Math.max(0, state.bossHp)} / ${state.bossMaxHp}`;
  const hpRate = state.bossMaxHp ? clamp(state.bossHp / state.bossMaxHp, 0, 1) : 0;
  bossHpBar.style.width = `${Math.floor(hpRate * 100)}%`;
}

function setBossVisible(visible) {
  if (bossEnemy) {
    bossEnemy.classList.toggle("hidden", !visible);
    bossEnemy.classList.remove("boss-hit", "boss-attack");
  }
  if (!visible && bossHud) bossHud.classList.add("hidden");
}

function playBossHitAnimation() {
  if (!bossEnemy) return;
  bossEnemy.classList.remove("boss-hit");
  void bossEnemy.offsetWidth;
  bossEnemy.classList.add("boss-hit");
  setTimeout(() => bossEnemy.classList.remove("boss-hit"), 260);
}

function playBossAttackAnimation() {
  if (!bossEnemy || state.currentStageId !== 3) return;
  bossEnemy.classList.remove("boss-attack");
  void bossEnemy.offsetWidth;
  bossEnemy.classList.add("boss-attack");
  setTimeout(() => bossEnemy.classList.remove("boss-attack"), 390);
}

function getStageThreeDamage(kind, note) {
  const stage = getStage();
  if (!stage.bossMode) return 0;

  const quality = note?.hitQuality || (kind === "일섬" || kind === "쌍격" || kind === "장참" ? "perfect" : "good");
  return quality === "perfect" ? stage.damagePerfect : stage.damageGood;
}

function applyBossDamage(kind, note) {
  const stage = getStage();
  if (!stage.bossMode) return 0;

  const damage = getStageThreeDamage(kind, note);
  state.bossHp = clamp(state.bossHp - damage, 0, state.bossMaxHp);
  updateBossHud();
  playBossHitAnimation();

  if (state.bossHp <= 0 && !state.bossDefeated) {
    state.bossDefeated = true;
    setTimeout(() => endGame("맹주 격파"), 360);
  }

  return damage;
}

function readStage3Rankings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_STAGE3_RANKING);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveStage3Rankings(rankings) {
  try {
    window.localStorage.setItem(STORAGE_STAGE3_RANKING, JSON.stringify(rankings));
  } catch (error) {
    console.warn("랭킹 저장 실패:", error);
  }
}

function registerStage3Ranking() {
  const remainingHp = state.power;
  let nickname = window.prompt("무림맹주를 격파했습니다! 랭킹에 남길 닉네임을 입력하세요.", "무명검객");
  nickname = (nickname || "무명검객").trim().slice(0, 12) || "무명검객";

  const rankings = readStage3Rankings();
  rankings.push({
    name: nickname,
    hp: remainingHp,
    score: state.score,
    combo: state.maxCombo,
    date: new Date().toLocaleDateString("ko-KR")
  });

  rankings.sort((a, b) => (b.hp - a.hp) || (b.score - a.score) || (b.combo - a.combo));
  const top10 = rankings.slice(0, 10);
  saveStage3Rankings(top10);
  renderStage3Ranking(top10);
}

function renderStage3Ranking(rankings = readStage3Rankings()) {
  if (!rankingBoard || !rankingList) return;

  if (!rankings.length) {
    rankingList.innerHTML = `<li>아직 등록된 랭킹이 없습니다.</li>`;
  } else {
    rankingList.innerHTML = rankings.map((entry, index) => `
      <li><b>${index + 1}위</b> · ${entry.name} · <span>남은 HP ${entry.hp}</span> · ${Number(entry.score || 0).toLocaleString("ko-KR")}점</li>
    `).join("");
  }

  rankingBoard.classList.remove("hidden");
}

function hideRankingBoard() {
  if (rankingBoard) rankingBoard.classList.add("hidden");
}

function makeEnemy(index) {
  const enemy = document.createElement("div");
  enemy.className = "assassin";
  enemy.dataset.index = String(index);
  enemy.dataset.row = String(ENEMY_ROWS[index % ENEMY_ROWS.length]);
  enemy.dataset.scale = String(0.82 + (index % 3) * 0.06);
  enemy.style.zIndex = String(10 + index);
  enemy.innerHTML = `
    <div class="shadow"></div>
    <div class="head"><span class="eye"></span></div>
    <div class="body"></div>
    <div class="belt"></div>
    <div class="arm a1"></div>
    <div class="arm a2"></div>
    <div class="knife"></div>
    <div class="leg l1"></div>
    <div class="leg l2"></div>
  `;
  return enemy;
}

function spawnEnemySquad() {
  enemyGroup.innerHTML = "";
  state.enemies = [];
  if (getStage().bossMode) return;

  const count = state.currentStageId === 2
    ? (state.combo >= 20 ? 6 : 5)
    : (state.combo >= 18 ? 5 : 4);

  for (let i = 0; i < count; i += 1) {
    const enemy = makeEnemy(i);
    enemyGroup.appendChild(enemy);
    state.enemies.push(enemy);
  }
}

function activeEnemies() {
  return state.enemies.filter((enemy) => !enemy.classList.contains("defeated"));
}

function updateEnemySquad(gameTime) {
  if (getStage().bossMode) return;

  const unresolved = state.notes.filter((note) => !note.resolved);
  const nearest = unresolved.length
    ? Math.min(...unresolved.map((note) => Math.abs(note.hitTime - gameTime)))
    : 999;
  const pressure = clamp(1 - nearest / (state.currentStageId === 2 ? 0.82 : 1.0), 0, 1);

  state.enemies.forEach((enemy, index) => {
    if (enemy.classList.contains("defeated")) return;

    const row = Number(enemy.dataset.row);
    const baseScale = Number(enemy.dataset.scale);
    const baseX = state.currentStageId === 2 ? 68 + index * 5.6 : 70 + index * 6.3;
    const x = baseX - pressure * (state.currentStageId === 2 ? 12 + index * 1.4 : 8 + index * 1.1) + Math.sin(gameTime * 3.6 + index) * 0.7;
    const bob = Math.sin(gameTime * 11 + index) * 4;
    const scale = baseScale + pressure * (state.currentStageId === 2 ? 0.16 : 0.12);

    enemy.style.left = `${x}%`;
    enemy.style.bottom = `${row + bob}px`;
    enemy.style.transform = `scale(${scale})`;
    enemy.style.opacity = "1";
    enemy.style.filter = pressure > 0.72
      ? "brightness(1.22) drop-shadow(4px 8px 0 rgba(0,0,0,.26))"
      : "drop-shadow(4px 8px 0 rgba(0,0,0,.26))";
  });
}

function ensureAudioContext() {
  if (!state.audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioContext();
  }

  if (state.audioContext.state === "suspended") state.audioContext.resume();
  return state.audioContext;
}

function playTick(isTarget = false) {
  if (!metronomeToggle.checked) return;

  try {
    const ctx = ensureAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = isTarget ? "square" : "triangle";
    oscillator.frequency.value = isTarget ? 980 : 430;
    gain.gain.value = isTarget ? 0.07 : 0.032;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    oscillator.start(now);
    oscillator.stop(now + 0.07);
  } catch (error) {
    console.warn("박자음 재생 실패:", error);
  }
}

function playSwordCutSound(kind = "참격") {
  try {
    const ctx = ensureAudioContext();
    const now = ctx.currentTime;
    const isPerfect = kind === "일섬" || kind === "쌍격" || kind === "장참";
    const masterGain = ctx.createGain();
    const masterVolume = isPerfect ? 0.24 : 0.17;

    masterGain.gain.setValueAtTime(masterVolume, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    masterGain.connect(ctx.destination);

    const noiseLength = Math.floor(ctx.sampleRate * 0.24);
    const noiseBuffer = ctx.createBuffer(1, noiseLength, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);

    for (let i = 0; i < noiseLength; i += 1) {
      const progress = i / noiseLength;
      noiseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - progress, 2.4);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const highPass = ctx.createBiquadFilter();
    highPass.type = "highpass";
    highPass.frequency.setValueAtTime(isPerfect ? 950 : 760, now);

    const slashBand = ctx.createBiquadFilter();
    slashBand.type = "bandpass";
    slashBand.frequency.setValueAtTime(isPerfect ? 3200 : 2500, now);
    slashBand.Q.setValueAtTime(0.9, now);

    noise.connect(highPass);
    highPass.connect(slashBand);
    slashBand.connect(masterGain);
    noise.start(now);
    noise.stop(now + 0.24);

    const bladeTone = ctx.createOscillator();
    const bladeGain = ctx.createGain();
    bladeTone.type = "sawtooth";
    bladeTone.frequency.setValueAtTime(isPerfect ? 1650 : 1180, now);
    bladeTone.frequency.exponentialRampToValueAtTime(isPerfect ? 420 : 340, now + 0.28);
    bladeGain.gain.setValueAtTime(isPerfect ? 0.13 : 0.09, now);
    bladeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    bladeTone.connect(bladeGain);
    bladeGain.connect(masterGain);
    bladeTone.start(now);
    bladeTone.stop(now + 0.31);

    const metalRing = ctx.createOscillator();
    const ringGain = ctx.createGain();
    metalRing.type = "triangle";
    metalRing.frequency.setValueAtTime(isPerfect ? 2850 : 2300, now + 0.018);
    metalRing.frequency.exponentialRampToValueAtTime(isPerfect ? 920 : 760, now + 0.16);
    ringGain.gain.setValueAtTime(isPerfect ? 0.08 : 0.055, now + 0.018);
    ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    metalRing.connect(ringGain);
    ringGain.connect(masterGain);
    metalRing.start(now + 0.018);
    metalRing.stop(now + 0.22);
  } catch (error) {
    console.warn("칼 베기 효과음 재생 실패:", error);
  }
}

function tryPlayMusic(stageId = state.currentStageId || DEFAULT_STAGE_ID) {
  if (!applyStageMusic(stageId, false)) return false;

  bgm.pause();
  bgm.currentTime = 0;
  bgm.volume = 0.82;
  bgm.loop = Boolean(getStage(stageId).bossMode);

  const playPromise = bgm.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      beatStatus.textContent = "음악 재생이 막혔습니다. 화면을 한 번 클릭한 뒤 스테이지를 다시 선택해주세요.";
    });
  }

  return true;
}

function createNote(noteData) {
  const data = typeof noteData === "number" ? { time: noteData, type: "tap" } : noteData;
  const noteType = data.type || "tap";
  const note = {
    id: state.nextNoteId,
    hitTime: data.time,
    type: noteType,
    holdDuration: data.duration || 0,
    resolved: false,
    resolvedAt: null,
    scored: false,
    ticked: false,
    lockedX: null,
    holdStarted: false,
    holdStartTime: null,
    holdEndTime: null,
    holdClearedRate: 0,
    doubleStarted: false,
    doubleDeadline: null,
    tapCount: 0,
    el: document.createElement("div")
  };
  state.nextNoteId += 1;

  const visualTone = state.currentStageId >= 2 && state.nextNoteId % (state.currentStageId === 3 ? 2 : 3) === 0 ? "heavy" : "normal";
  note.el.className = `ki-note ${visualTone} note-${noteType}${state.currentStageId === 3 ? " boss-note" : ""}`;

  if (noteType === "hold") {
    note.el.innerHTML = `
      <span class="hold-body">
        <span class="hold-tail"></span>
        <span class="note-core"></span>
      </span>
      <span class="hold-clear-edge"></span>
      <span class="hold-label">HOLD</span>
    `;
    note.el.style.setProperty("--hold-clear", "0%");
  } else if (noteType === "double") {
    note.el.innerHTML = `
      <span class="note-core"></span>
      <span class="double-label">2x</span>
    `;
  } else {
    note.el.innerHTML = `<span class="note-core"></span>`;
  }

  note.el.style.top = "50%";
  noteContainer.appendChild(note.el);
  state.notes.push(note);
}

function scheduleNotes(gameTime) {
  const stage = getStage();
  const lead = stage.noteLead || 1.42;

  if (stage.noteMode === "chartLoop") {
    const chart = stage.chart || [];
    const loopDuration = stage.chartLoopDuration || stage.duration || 30.78;
    while (chart.length) {
      const source = chart[state.chartIndex % chart.length];
      const loop = Math.floor(state.chartIndex / chart.length);
      const noteTime = source.time + loop * loopDuration;
      if (noteTime - gameTime > lead) break;
      createNote({ ...source, time: noteTime });
      state.chartIndex += 1;
    }
    return;
  }

  if (stage.noteMode === "chart") {
    const chart = stage.chart || [];
    while (
      state.chartIndex < chart.length &&
      chart[state.chartIndex].time - gameTime <= lead
    ) {
      createNote(chart[state.chartIndex]);
      state.chartIndex += 1;
    }
    return;
  }

  while (
    state.nextHitTime - gameTime <= lead &&
    state.nextHitTime <= stage.duration - 0.4
  ) {
    createNote({ time: state.nextHitTime, type: "tap" });
    const pattern = stage.notePattern || STAGES[1].notePattern;
    const intervalBeats = pattern[state.patternIndex % pattern.length];
    state.patternIndex += 1;
    state.nextHitTime += intervalBeats * beatDuration();
  }
}

function removeNote(note) {
  note.el.remove();
  state.notes = state.notes.filter((item) => item !== note);
}

function updateHoldVisual(note, gameTime) {
  if (!note.holdStarted || note.resolved) return;

  note.lockedX = `${HIT_X}%`;
  note.el.style.left = note.lockedX;

  const safeDuration = Math.max(0.18, note.holdDuration || 0.6);
  const progress = clamp((gameTime - note.hitTime) / safeDuration, 0, 1);
  const clearRate = Math.floor(progress * 100);
  note.holdClearedRate = clearRate;
  note.el.style.setProperty("--hold-clear", `${clearRate}%`);
  note.el.style.setProperty("--hold-progress", `${clearRate}%`);

  if (state.spaceDown && progress >= 0.98) {
    resolveHoldSuccess(note);
    return;
  }

  if (!state.spaceDown && gameTime < note.holdEndTime - 0.08) {
    resolveNoteMiss(note, "조기 해제", HOLD_EARLY_DAMAGE);
  }
}

function updateNotes(gameTime) {
  const stage = getStage();
  const speed = stage.noteSpeed || 66;
  const goodWindow = getGoodWindow();

  for (const note of [...state.notes]) {
    const diff = note.hitTime - gameTime;
    const x = HIT_X + diff * speed;

    if (note.resolved && note.lockedX) {
      note.el.style.left = note.lockedX;
    } else if (note.lockedX) {
      note.el.style.left = note.lockedX;
    } else {
      note.el.style.left = `${x}%`;
    }

    const abs = Math.abs(diff);
    note.el.classList.toggle("near", abs <= goodWindow && !note.resolved);
    note.el.classList.toggle("perfect-zone", abs <= getPerfectWindow() && !note.resolved);

    if (!note.ticked && gameTime >= note.hitTime - 0.018) {
      note.ticked = true;
      playTick(true);
      hitCircle.classList.remove("pulse");
      void hitCircle.offsetWidth;
      hitCircle.classList.add("pulse");
    }

    if (
      note.type === "hold" &&
      !note.holdStarted &&
      !state.activeHoldNote &&
      state.spaceDown &&
      abs <= goodWindow
    ) {
      startHoldNote(note, gameTime, abs <= getPerfectWindow());
    }

    if (note.type === "hold" && note.holdStarted && !note.resolved) {
      updateHoldVisual(note, gameTime);
    }

    if (note.type === "double" && note.doubleStarted && !note.resolved && gameTime > note.doubleDeadline) {
      resolveNoteMiss(note, "2연타 실패", MISS_DAMAGE);
    }

    if (!note.resolved && !note.holdStarted && !note.doubleStarted && gameTime > note.hitTime + goodWindow) {
      resolveNoteMiss(note);
    }

    const removeAfter = note.resolvedAt ?? note.hitTime;
    if (note.resolved && gameTime > removeAfter + 1.65) {
      removeNote(note);
    }
  }
}

function updateTimingText(gameTime) {
  const unresolved = state.notes.filter((note) => !note.resolved);
  if (!unresolved.length) {
    timingTip.textContent = state.currentStageId === 3
      ? "무림맹주가 틈을 노리고 있다"
      : state.currentStageId === 2
        ? "대나무 그림자 사이로 검기 노트가 온다"
        : "오른쪽에서 검기 노트가 온다";
    hitCircle.classList.remove("danger");
    return;
  }

  const nearest = unresolved.reduce((best, note) => {
    const a = Math.abs(note.hitTime - gameTime);
    const b = Math.abs(best.hitTime - gameTime);
    return a < b ? note : best;
  });
  const diff = gameTime - nearest.hitTime;
  const abs = Math.abs(diff);
  const goodWindow = getGoodWindow();

  hitCircle.classList.toggle("danger", abs <= goodWindow && !nearest.resolved);
  hero.classList.toggle("ready-glow", abs <= 0.28 && !nearest.resolved);

  if (nearest.type === "hold" && abs <= goodWindow && !nearest.holdStarted) {
    timingTip.textContent = "HOLD! SPACE를 누른 채 유지";
  } else if (nearest.type === "hold" && nearest.holdStarted) {
    timingTip.textContent = "앞부분부터 사라지는 동안 계속 누르고 있어라";
  } else if (nearest.type === "double" && nearest.doubleStarted) {
    timingTip.textContent = "한 번 더! SPACE 2연타";
  } else if (nearest.type === "double" && abs <= goodWindow) {
    timingTip.textContent = "2연타 노트! 빠르게 두 번";
  } else if (abs <= getPerfectWindow()) {
    timingTip.textContent = "지금! 검기를 날려라";
  } else if (abs <= goodWindow) {
    timingTip.textContent = diff < 0 ? "조금만 더 기다려" : "조금 늦었다";
  } else if (diff < -0.55) {
    timingTip.textContent = "원형 노트가 판정원으로 접근 중";
  } else if (diff < 0) {
    timingTip.textContent = "곧 겹친다";
  } else {
    timingTip.textContent = "놓쳤다";
  }
}

function clearTimedVisuals() {
  setTimeout(() => {
    hero.classList.remove("slash", "input-flash");
    slashEffect.classList.remove("active", "weak");
    slashFlash.classList.remove("active");
    bloodSpark.classList.remove("active");
    game.classList.remove("flash-success");
    hitCircle.classList.remove("perfect-flash", "miss-flash");
  }, 500);
}

function launchSwordAura(isWeak = false) {
  hero.classList.remove("slash", "input-flash");
  slashEffect.classList.remove("active", "weak");
  slashFlash.classList.remove("active");
  void hero.offsetWidth;

  hero.classList.add("slash", "input-flash");
  slashEffect.classList.add("active");
  if (isWeak) slashEffect.classList.add("weak");
  if (!isWeak) slashFlash.classList.add("active");
}

function defeatEnemies(count = 1) {
  if (getStage().bossMode) return;

  const targets = activeEnemies().slice(0, count);
  targets.forEach((enemy, index) => {
    setTimeout(() => enemy.classList.add("defeated"), index * 55);
  });

  setTimeout(() => {
    if (state.running && !state.paused && activeEnemies().length < 2) {
      spawnEnemySquad();
    }
  }, 760);
}

function playNoteVerticalSliceEffect(note, kind) {
  if (!note?.el) return;

  const isPerfect = kind === "일섬" || kind === "쌍격" || kind === "장참";

  note.lockedX = `${HIT_X}%`;
  note.el.style.left = note.lockedX;
  note.el.classList.remove("near", "perfect-zone", "good-hit", "perfect-hit", "hold-active", "double-armed");
  note.el.classList.add(
    "hit",
    "vertical-sliced",
    isPerfect ? "slice-perfect" : "slice-good"
  );

  note.el.innerHTML = `
    <span class="cut-chang">챙!</span>
    <span class="note-cut-vertical"></span>
    <span class="note-half note-half-left"><span class="half-core"></span></span>
    <span class="note-half note-half-right"><span class="half-core"></span></span>
    <span class="cut-spark spark-1"></span>
    <span class="cut-spark spark-2"></span>
    <span class="cut-spark spark-3"></span>
    <span class="cut-spark spark-4"></span>
    <span class="cut-spark spark-5"></span>
    <span class="cut-spark spark-6"></span>
  `;
}

function resolveSuccess(note, kind, scoreGain) {
  if (note.resolved || state.gameOver) return;

  note.resolved = true;
  note.resolvedAt = (performance.now() - state.startTime) / 1000;
  note.scored = true;
  if (state.activeHoldNote === note) state.activeHoldNote = null;
  playNoteVerticalSliceEffect(note, kind);
  playSwordCutSound(kind);

  const bossDamage = applyBossDamage(kind, note);
  const baseGain = getStage().bossMode ? bossDamage * 10 : scoreGain;

  state.combo += 1;
  state.maxCombo = Math.max(state.maxCombo, state.combo);
  const comboBonus = Math.floor(state.combo / 5) * (state.currentStageId === 3 ? 18 : state.currentStageId === 2 ? 14 : 10);
  state.score += baseGain + comboBonus;

  updateHud();
  launchSwordAura(false);
  bloodSpark.classList.add("active");
  game.classList.add("flash-success");
  hitCircle.classList.add("perfect-flash");
  defeatEnemies(kind === "일섬" || kind === "쌍격" || kind === "장참" ? 2 : 1);

  showJudgement(kind, kind === "일섬" || kind === "쌍격" || kind === "장참" ? "perfect" : "good");
  beatStatus.textContent = getStage().bossMode
    ? `${kind} 성공! 보스 HP -${bossDamage}`
    : `${kind} 성공! +${baseGain + comboBonus}`;

  clearTimedVisuals();
}

function damagePlayer(message, damage) {
  state.combo = 0;

  let finalDamage = damage;
  if (getStage().bossMode) {
    const now = performance.now();
    if (now - state.lastDamageAt < STAGE3_DAMAGE_COOLDOWN_MS) {
      finalDamage = 0;
    } else {
      state.lastDamageAt = now;
    }
  }

  state.power = clamp(state.power - finalDamage, 0, 100);
  updateHud();

  hero.classList.remove("ready-glow");
  hero.classList.add("hurt", "input-flash");
  playBossAttackAnimation();
  activeEnemies().slice(0, 2).forEach((enemy) => enemy.classList.add("attack"));
  scene.classList.add("shake");
  game.classList.add("flash-damage");
  hitCircle.classList.add("miss-flash");

  showJudgement(message, "miss");
  beatStatus.textContent = finalDamage > 0 ? `내공 -${finalDamage}` : "연속 피격 보호";

  setTimeout(() => {
    hero.classList.remove("hurt", "input-flash");
    state.enemies.forEach((enemy) => enemy.classList.remove("attack"));
    scene.classList.remove("shake");
    game.classList.remove("flash-damage");
    hitCircle.classList.remove("miss-flash");
  }, 450);

  if (state.power <= 0) {
    setTimeout(() => endGame("내공 고갈"), 520);
  }
}

function resolveNoteMiss(note, message = "피격", damage = MISS_DAMAGE) {
  if (note.resolved) return;
  note.resolved = true;
  note.resolvedAt = (performance.now() - state.startTime) / 1000;
  if (state.activeHoldNote === note) state.activeHoldNote = null;
  note.el.classList.add("miss");
  damagePlayer(message, damage);
}

function resolveBadSlash() {
  launchSwordAura(true);
  damagePlayer("헛검기", BAD_INPUT_DAMAGE);
  clearTimedVisuals();
}

function startHoldNote(note, gameTime, isPerfect) {
  note.holdStarted = true;
  note.hitQuality = isPerfect ? "perfect" : "good";
  note.holdStartTime = gameTime;
  note.holdEndTime = note.hitTime + Math.max(0.18, note.holdDuration || 0.6);
  note.lockedX = `${HIT_X}%`;
  state.activeHoldNote = note;
  note.el.classList.remove("near", "perfect-zone");
  note.el.classList.add("hold-active");
  note.el.style.setProperty("--hold-clear", "0%");
  note.el.style.setProperty("--hold-progress", "0%");
  launchSwordAura(false);
  playSwordCutSound(isPerfect ? "일섬" : "참격");
  showJudgement("장참 시작", isPerfect ? "perfect" : "good");
  beatStatus.textContent = "HOLD 중에는 다음 노트가 나오지 않으며 앞부분부터 사라집니다";
}

function resolveHoldSuccess(note) {
  resolveSuccess(note, "장참", 170);
}

function handleDoubleNote(note, gameTime, abs) {
  const goodWindow = getGoodWindow();

  if (!note.doubleStarted) {
    if (abs > goodWindow) {
      resolveBadSlash();
      return;
    }

    note.doubleStarted = true;
    note.hitQuality = abs <= getPerfectWindow() ? "perfect" : "good";
    note.tapCount = 1;
    note.doubleDeadline = gameTime + (state.currentStageId === 3 ? 0.34 : 0.34);
    note.lockedX = `${HIT_X}%`;
    note.el.classList.add("double-armed");
    launchSwordAura(true);
    playSwordCutSound("참격");
    showJudgement("한 번 더!", "good");
    beatStatus.textContent = "2연타 노트 · SPACE를 한 번 더!";
    clearTimedVisuals();
    return;
  }

  if (gameTime <= note.doubleDeadline) {
    resolveSuccess(note, "쌍격", 145);
  } else {
    resolveNoteMiss(note, "2연타 실패", MISS_DAMAGE);
  }
}

function handleSlashInput() {
  if (!state.running || state.gameOver || state.paused || state.bossDefeated) return;

  pulseSheath();

  const gameTime = (performance.now() - state.startTime) / 1000;
  if (gameTime < 0) return;

  if (state.activeHoldNote && !state.activeHoldNote.resolved) {
    return;
  }

  const candidates = state.notes.filter((note) => !note.resolved);
  if (!candidates.length) {
    resolveBadSlash();
    return;
  }

  const closest = candidates.reduce((best, note) => {
    return Math.abs(note.hitTime - gameTime) < Math.abs(best.hitTime - gameTime) ? note : best;
  });
  const abs = Math.abs(closest.hitTime - gameTime);
  const perfectWindow = getPerfectWindow();
  const goodWindow = getGoodWindow();

  if (closest.type === "hold") {
    if (!closest.holdStarted && abs <= goodWindow) {
      startHoldNote(closest, gameTime, abs <= perfectWindow);
    } else {
      resolveBadSlash();
    }
    return;
  }

  if (closest.type === "double") {
    handleDoubleNote(closest, gameTime, abs);
    return;
  }

  if (abs <= perfectWindow) {
    closest.hitQuality = "perfect";
    resolveSuccess(closest, "일섬", state.currentStageId === 3 ? 200 : state.currentStageId === 2 ? 125 : 110);
  } else if (abs <= goodWindow) {
    closest.hitQuality = "good";
    resolveSuccess(closest, "참격", state.currentStageId === 3 ? 100 : state.currentStageId === 2 ? 65 : 55);
  } else {
    resolveBadSlash();
  }
}

function handleSpaceRelease() {
  if (!state.running || state.gameOver || state.paused) return;

  const note = state.activeHoldNote;
  if (!note || note.resolved) return;

  const gameTime = (performance.now() - state.startTime) / 1000;
  if (gameTime >= note.holdEndTime - 0.08) {
    resolveHoldSuccess(note);
  } else {
    resolveNoteMiss(note, "조기 해제", HOLD_EARLY_DAMAGE);
  }
}

function pulseSheath() {
  hero.classList.remove("input-flash");
  void hero.offsetWidth;
  hero.classList.add("input-flash");
  setTimeout(() => hero.classList.remove("input-flash"), 240);
}

function startGame(stageId = state.selectedStage || DEFAULT_STAGE_ID) {
  const stage = getStage(stageId);
  if (!isStageUnlocked(stageId)) {
    showJudgement("잠김", "miss");
    if (stagePreviewHint) {
      stagePreviewHint.textContent = stageId === 3
        ? "Stage 2를 클리어하면 Stage 3 보스전에 도전할 수 있습니다."
        : "Stage 1을 클리어하면 Stage 2를 플레이할 수 있습니다.";
    }
    return;
  }

  if (!requireMusicBeforeStart(stageId)) return;

  hideTitleScreen();
  hideStageSelectScreen();
  stopStagePreview();

  state.running = true;
  state.paused = false;
  state.pauseStart = 0;
  state.gameOver = false;
  state.currentStageId = stageId;
  state.currentStage = stage;
  state.selectedStage = stageId;
  state.startTime = performance.now();
  state.score = 0;
  state.combo = 0;
  state.maxCombo = 0;
  state.power = 100;
  state.bossMaxHp = stage.bossMaxHp || STAGE3_BOSS_MAX_HP;
  state.bossHp = state.bossMaxHp;
  state.bossDefeated = false;
  state.lastDamageAt = 0;
  state.bpm = stage.bpm;
  state.notes = [];
  state.nextNoteId = 0;
  state.nextHitTime = stage.firstHitTime || 1.35;
  state.patternIndex = 0;
  state.chartIndex = 0;
  state.spaceDown = false;
  state.activeHoldNote = null;
  noteContainer.innerHTML = "";

  applyStageClass(stageId);
  setBossVisible(Boolean(stage.bossMode));
  updateBossHud();
  hideScoreBoard();
  hideRankingBoard();
  updateStartNotice("hide");
  updateTimer(0);
  updateHud();
  resetVisuals();
  spawnEnemySquad();
  showJudgement(stageId === 3 ? "맹주 출현" : stageId === 2 ? "월하죽림" : "검기를 준비해라", "");
  timingTip.textContent = stageId === 3
    ? "보스 HP 4500 · HOLD는 저지박스에서 누르고 있으면 앞부분부터 사라짐"
    : stageId === 2
      ? "HOLD 중 다음 노트 없음 · 2x는 빠르게 두 번"
      : "노트가 왼쪽 끝 판정원에 겹칠 때 SPACE";
  beatStatus.textContent = `${stage.songName} · ${stage.subtitle}`;
  pauseButton.textContent = "일시정지";
  pauseButton.classList.remove("pause-active");

  tryPlayMusic(stageId);
  requestAnimationFrame(update);
}

function clearStageUnlocks(reason) {
  if (reason === "수련 종료" && state.currentStageId === 1 && !state.stage2Unlocked) {
    saveStage2Unlock();
  }

  if (reason === "수련 종료" && state.currentStageId === 2 && !state.stage3Unlocked) {
    saveStage3Unlock();
  }
}

function endGame(reason = "게임 종료") {
  if (state.gameOver && !state.running) return;

  clearStageUnlocks(reason);
  const stage3Cleared = reason === "맹주 격파" && state.currentStageId === 3;

  state.running = false;
  state.paused = false;
  state.pauseStart = 0;
  state.gameOver = true;
  state.spaceDown = false;
  state.activeHoldNote = null;
  pauseButton.textContent = "일시정지";
  pauseButton.classList.remove("pause-active");
  updateStartNotice("ready");
  bgm.pause();
  resetVisuals();
  noteContainer.innerHTML = "";
  enemyGroup.innerHTML = "";
  if (!stage3Cleared) setBossVisible(false);
  showJudgement(reason, reason === "수련 종료" || stage3Cleared ? "perfect" : "miss");
  beatStatus.textContent = stage3Cleared
    ? `무림맹주 격파 · 남은 HP ${state.power} · 랭킹 등록 완료`
    : reason === "수련 종료" && state.currentStageId === 1
      ? "Stage 1 Clear · Stage 2가 해금되었습니다 · ENTER로 스테이지 선택"
      : reason === "수련 종료" && state.currentStageId === 2
        ? "Stage 2 Clear · Boss Stage 3가 해금되었습니다 · ENTER로 스테이지 선택"
        : `최종 점수 ${state.score.toLocaleString("ko-KR")}점 · ENTER로 스테이지 선택`;
  updateHud();
  showScoreBoard(reason);
  if (stage3Cleared) registerStage3Ranking();
}

function pauseGame() {
  if (!state.running || state.gameOver || state.paused) return;

  state.paused = true;
  state.pauseStart = performance.now();
  bgm.pause();
  pauseButton.textContent = "계속하기";
  pauseButton.classList.add("pause-active");
  hero.classList.remove("ready-glow");
  showJudgement("일시정지", "");
  timingTip.textContent = "ESC 또는 계속하기 버튼으로 재개";
  beatStatus.textContent = "검객이 호흡을 고르는 중";
}

function resumeGame() {
  if (!state.running || state.gameOver || !state.paused) return;

  const pauseDuration = performance.now() - state.pauseStart;
  state.startTime += pauseDuration;
  state.paused = false;
  state.pauseStart = 0;
  pauseButton.textContent = "일시정지";
  pauseButton.classList.remove("pause-active");
  showJudgement("다시 집중", "");
  beatStatus.textContent = "왼쪽 끝 판정원에 겹치면 SPACE";

  const playPromise = bgm.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      beatStatus.textContent = "음악은 멈춘 상태입니다. 박자음으로 진행합니다.";
    });
  }

  requestAnimationFrame(update);
}

function togglePause() {
  if (!state.running || state.gameOver) return;
  if (state.paused) resumeGame();
  else pauseGame();
}

function update(now) {
  if (!state.running || state.paused) return;

  const gameTime = (now - state.startTime) / 1000;
  if (gameTime < 0) {
    requestAnimationFrame(update);
    return;
  }

  const stage = getStage();
  updateTimer(gameTime);
  if (!stage.bossMode && stage.duration !== null && gameTime >= stage.duration) {
    updateTimer(stage.duration);
    endGame("수련 종료");
    return;
  }

  scheduleNotes(gameTime);
  updateNotes(gameTime);
  updateEnemySquad(gameTime);
  updateTimingText(gameTime);

  requestAnimationFrame(update);
}

startButton.addEventListener("click", handleStartFlow);
if (titleStartButton) titleStartButton.addEventListener("click", showStageSelectScreen);

if (stageOneCard) {
  stageOneCard.addEventListener("mouseenter", () => playStagePreview(1));
  stageOneCard.addEventListener("focus", () => playStagePreview(1));
  stageOneCard.addEventListener("mouseleave", stopStagePreview);
  stageOneCard.addEventListener("blur", stopStagePreview);
  stageOneCard.addEventListener("click", () => selectStageAndStart(1));
}

if (stageTwoCard) {
  stageTwoCard.addEventListener("mouseenter", () => playStagePreview(2));
  stageTwoCard.addEventListener("focus", () => playStagePreview(2));
  stageTwoCard.addEventListener("mouseleave", stopStagePreview);
  stageTwoCard.addEventListener("blur", stopStagePreview);
  stageTwoCard.addEventListener("click", () => selectStageAndStart(2));
}

if (stageThreeCard) {
  stageThreeCard.addEventListener("mouseenter", () => playStagePreview(3));
  stageThreeCard.addEventListener("focus", () => playStagePreview(3));
  stageThreeCard.addEventListener("mouseleave", stopStagePreview);
  stageThreeCard.addEventListener("blur", stopStagePreview);
  stageThreeCard.addEventListener("click", () => selectStageAndStart(3));
}

if (stageBackButton) stageBackButton.addEventListener("click", showTitleScreen);
pauseButton.addEventListener("click", togglePause);

if (musicButton) {
  musicButton.disabled = true;
  musicButton.title = "스테이지별 고정 곡을 사용합니다.";
}

if (musicInput) {
  musicInput.addEventListener("change", () => {
    showJudgement("곡 고정", "good");
    beatStatus.textContent = "Stage 1은 Night, Stage 2는 Bamboo, Stage 3는 Seven Strikes of Honor로 고정되어 있습니다.";
  });
}

bgm.addEventListener("error", () => {
  const stage = getStage(state.previewingStageId || state.currentStageId || DEFAULT_STAGE_ID);
  if (bgm.getAttribute("src") === stage.fallbackPath) return;

  bgm.setAttribute("src", stage.fallbackPath);
  bgm.load();

  if (state.running && !state.paused && !state.gameOver) {
    bgm.play().catch(() => {
      beatStatus.textContent = `${stage.songName} 파일 위치를 확인해주세요. assets 폴더 또는 루트 폴더에 필요합니다.`;
    });
  }
});

bgm.addEventListener("ended", () => {
  if (state.previewingStageId !== null) {
    bgm.currentTime = 0;
    bgm.play().catch(() => {});
    return;
  }

  if (state.running && !state.gameOver) {
    const stage = getStage();
    if (stage.bossMode || stage.duration > ((performance.now() - state.startTime) / 1000) + 0.25) {
      bgm.currentTime = 0;
      bgm.play().catch(() => {
        beatStatus.textContent = "음악 반복 재생이 막혔습니다. 박자음으로 진행합니다.";
      });
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.repeat) return;

  if (event.code === "Enter") {
    event.preventDefault();

    if (state.titleOpen) {
      showStageSelectScreen();
      return;
    }

    if (state.stageSelectOpen) {
      return;
    }

    handleStartFlow();
    return;
  }

  if (event.code === "Escape") {
    event.preventDefault();
    togglePause();
  }

  if (event.code === "Space") {
    event.preventDefault();
    state.spaceDown = true;
    handleSlashInput();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    state.spaceDown = false;
    handleSpaceRelease();
  }
});

loadProgress();
updateStageCards();
updateTimer(0);
updateHud();
spawnEnemySquad();
setBossVisible(false);
hideRankingBoard();
applyStageMusic(1, false);
updateStartNotice("ready");
showJudgement("ENTER로 시작", "good");
timingTip.textContent = "ENTER를 누르면 스테이지 선택으로 이동";
beatStatus.textContent = "Stage 1은 Night, Stage 2는 Bamboo, Stage 3는 Seven Strikes of Honor 곡으로 분리되어 있습니다";

// v27: Stage 2/3 HOLD 보호구간 추가 - HOLD 중 다른 노트가 내려오지 않도록 차트 간격 정리
