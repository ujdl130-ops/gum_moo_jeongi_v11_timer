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

const state = {
  running: false,
  paused: false,
  pauseStart: 0,
  gameOver: false,
  startTime: 0,
  score: 0,
  combo: 0,
  maxCombo: 0,
  power: 100,
  bpm: 122,
  selectedMusicUrl: null,
  musicReady: false,
  selectedMusicName: "",
  audioContext: null,
  notes: [],
  nextNoteId: 0,
  nextHitTime: 0,
  patternIndex: 0,
  enemies: [],
  lastEnemyRespawn: 0,
};

const PERFECT_WINDOW = 0.075;
const GOOD_WINDOW = 0.17;
const BAD_INPUT_DAMAGE = 7;
const MISS_DAMAGE = 12;
const HIT_X = 7;
const NOTE_SPEED = 66;
const NOTE_LEAD = 1.42;
const NOTE_REMOVE_AFTER = 2.9;
const ENEMY_ROWS = [20, 54, 82, 35, 68];
const NOTE_PATTERN = [1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.25, 0.5, 1, 1.5];
const GAME_DURATION_SECONDS = 180;

function beatDuration() {
  return 60 / state.bpm;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setText(el, value) {
  el.textContent = value;
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.ceil(totalSeconds));
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const seconds = String(safeSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateTimer(gameTime = 0) {
  const remaining = Math.max(0, GAME_DURATION_SECONDS - gameTime);
  if (timerText) {
    timerText.textContent = formatTime(remaining);
    timerText.parentElement.classList.toggle("timer-warning", remaining <= 30);
  }
}

function getRank(score) {
  if (score >= 40000) return "천하제일";
  if (score >= 30000) return "절정고수";
  if (score >= 20000) return "일류검객";
  if (score >= 10000) return "무림검객";
  return "수련생";
}

function hideScoreBoard() {
  if (scoreBoard) scoreBoard.classList.add("hidden");
}

function showScoreBoard(reason = "게임 종료") {
  if (!scoreBoard) return;
  if (startNotice) startNotice.classList.add("hidden");

  finalScore.textContent = `${state.score.toLocaleString("ko-KR")}점`;
  finalCombo.textContent = `${state.maxCombo}`;
  finalPower.textContent = `${state.power}`;
  finalRank.textContent = getRank(state.score);

  scoreBoard.querySelector("strong").textContent = reason === "수련 종료" ? "수련 종료" : "점수 보드";
  scoreBoard.classList.remove("hidden");
}

function updateHud() {
  setText(scoreEl, state.score.toLocaleString("ko-KR"));
  setText(comboEl, state.combo);
  setText(powerText, state.power);
  powerBar.style.width = `${clamp(state.power, 0, 100)}%`;
}


function updateStartNotice(mode = "need") {
  if (!startNotice) return;

  startNotice.classList.remove("hidden", "ready");
  startButton.classList.remove("need-music");

  if (mode === "hide") {
    startNotice.classList.add("hidden");
    return;
  }

  if (mode === "ready") {
    startNotice.classList.add("ready");
    startNotice.innerHTML = `
      <strong>음악 선택 완료</strong>
      <span>${state.selectedMusicName || "선택한 음악"} · ENTER를 눌러 게임을 시작하세요.</span>
    `;
    return;
  }

  startButton.classList.add("need-music");
  startNotice.innerHTML = `
    <strong>게임음악을 골라주세요</strong>
    <span>음악 선택 버튼으로 MP3/WAV 파일을 고른 뒤 ENTER를 눌러 시작합니다.</span>
  `;
}

function requireMusicBeforeStart() {
  if (state.musicReady) return true;
  updateStartNotice("need");
  showJudgement("음악을 먼저 선택", "miss");
  timingTip.textContent = "게임 시작 전에 음악을 골라주세요";
  beatStatus.textContent = "음악 선택 버튼을 눌러 MP3 또는 WAV 파일을 선택하세요";
  return false;
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
  const count = state.combo >= 18 ? 5 : 4;

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
  const unresolved = state.notes.filter((note) => !note.resolved);
  const nearest = unresolved.length
    ? Math.min(...unresolved.map((note) => Math.abs(note.hitTime - gameTime)))
    : 999;
  const pressure = clamp(1 - nearest / 1.0, 0, 1);

  state.enemies.forEach((enemy, index) => {
    if (enemy.classList.contains("defeated")) return;

    const row = Number(enemy.dataset.row);
    const baseScale = Number(enemy.dataset.scale);
    const baseX = 70 + index * 6.3;
    const x = baseX - pressure * (8 + index * 1.1) + Math.sin(gameTime * 3.6 + index) * 0.7;
    const bob = Math.sin(gameTime * 11 + index) * 4;
    const scale = baseScale + pressure * 0.12;

    enemy.style.left = `${x}%`;
    enemy.style.bottom = `${row + bob}px`;
    enemy.style.transform = `scale(${scale})`;
    enemy.style.opacity = "1";
    enemy.style.filter = pressure > 0.72
      ? "brightness(1.22) drop-shadow(4px 8px 0 rgba(0,0,0,.26))"
      : "drop-shadow(4px 8px 0 rgba(0,0,0,.26))";
  });
}

function playTick(isTarget = false) {
  if (!metronomeToggle.checked) return;

  try {
    if (!state.audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      state.audioContext = new AudioContext();
    }

    const ctx = state.audioContext;
    if (ctx.state === "suspended") ctx.resume();

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

function tryPlayMusic() {
  if (!state.musicReady) return false;

  bgm.pause();
  bgm.currentTime = 0;

  const playPromise = bgm.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      beatStatus.textContent = "음악 재생이 막혔습니다. 음악 선택 후 ENTER로 다시 시작해보세요.";
    });
  }

  return true;
}

function createNote(hitTime) {
  const note = {
    id: state.nextNoteId,
    hitTime,
    resolved: false,
    scored: false,
    ticked: false,
    yOffset: 0,
    type: state.nextNoteId % 4 === 3 ? "heavy" : "normal",
    el: document.createElement("div"),
  };
  state.nextNoteId += 1;

  note.el.className = `ki-note ${note.type}`;
  note.el.innerHTML = `<span></span>`;
  note.el.style.top = "50%";
  noteContainer.appendChild(note.el);
  state.notes.push(note);
}

function scheduleNotes(gameTime) {
  while (state.nextHitTime - gameTime <= NOTE_LEAD) {
    createNote(state.nextHitTime);
    const intervalBeats = NOTE_PATTERN[state.patternIndex % NOTE_PATTERN.length];
    state.patternIndex += 1;
    state.nextHitTime += intervalBeats * beatDuration();
  }
}

function removeNote(note) {
  note.el.remove();
  state.notes = state.notes.filter((item) => item !== note);
}

function updateNotes(gameTime) {
  for (const note of [...state.notes]) {
    const diff = note.hitTime - gameTime;
    const x = HIT_X + diff * NOTE_SPEED;
    note.el.style.left = `${x}%`;

    const abs = Math.abs(diff);
    note.el.classList.toggle("near", abs <= GOOD_WINDOW && !note.resolved);
    note.el.classList.toggle("perfect-zone", abs <= PERFECT_WINDOW && !note.resolved);

    if (!note.ticked && gameTime >= note.hitTime - 0.018) {
      note.ticked = true;
      playTick(true);
      hitCircle.classList.remove("pulse");
      void hitCircle.offsetWidth;
      hitCircle.classList.add("pulse");
    }

    if (!note.resolved && gameTime > note.hitTime + GOOD_WINDOW) {
      resolveNoteMiss(note);
    }

    if (note.resolved && gameTime > note.hitTime + NOTE_REMOVE_AFTER) {
      removeNote(note);
    }
  }
}

function updateTimingText(gameTime) {
  const unresolved = state.notes.filter((note) => !note.resolved);
  if (!unresolved.length) {
    timingTip.textContent = "오른쪽에서 검기 노트가 온다";
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

  hitCircle.classList.toggle("danger", abs <= GOOD_WINDOW && !nearest.resolved);
  hero.classList.toggle("ready-glow", abs <= 0.28 && !nearest.resolved);

  if (abs <= PERFECT_WINDOW) timingTip.textContent = "지금! 검기를 날려라";
  else if (abs <= GOOD_WINDOW) timingTip.textContent = diff < 0 ? "조금만 더 기다려" : "조금 늦었다";
  else if (diff < -0.55) timingTip.textContent = "원형 노트가 판정원으로 접근 중";
  else if (diff < 0) timingTip.textContent = "곧 겹친다";
  else timingTip.textContent = "놓쳤다";
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

function resolveSuccess(note, kind, scoreGain) {
  if (note.resolved) return;

  note.resolved = true;
  note.scored = true;
  note.el.classList.add("hit", kind === "일섬" ? "perfect-hit" : "good-hit");

  state.combo += 1;
  state.maxCombo = Math.max(state.maxCombo, state.combo);
  const comboBonus = Math.floor(state.combo / 5) * 10;
  state.score += scoreGain + comboBonus;

  updateHud();
  launchSwordAura(false);
  bloodSpark.classList.add("active");
  game.classList.add("flash-success");
  hitCircle.classList.add("perfect-flash");
  defeatEnemies(kind === "일섬" ? 2 : 1);

  showJudgement(kind, kind === "일섬" ? "perfect" : "good");
  beatStatus.textContent = kind === "일섬"
    ? `검기가 꿰뚫었다! +${scoreGain + comboBonus}`
    : `자객을 밀어냈다. +${scoreGain + comboBonus}`;

  clearTimedVisuals();
}

function damagePlayer(message, damage) {
  state.combo = 0;
  state.power = clamp(state.power - damage, 0, 100);
  updateHud();

  hero.classList.remove("ready-glow");
  hero.classList.add("hurt", "input-flash");
  activeEnemies().slice(0, 2).forEach((enemy) => enemy.classList.add("attack"));
  scene.classList.add("shake");
  game.classList.add("flash-damage");
  hitCircle.classList.add("miss-flash");

  showJudgement(message, "miss");
  beatStatus.textContent = `내공 -${damage}`;

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

function resolveNoteMiss(note) {
  if (note.resolved) return;
  note.resolved = true;
  note.el.classList.add("miss");
  damagePlayer("피격", MISS_DAMAGE);
}

function resolveBadSlash() {
  launchSwordAura(true);
  damagePlayer("헛검기", BAD_INPUT_DAMAGE);
  clearTimedVisuals();
}

function startGame() {
  if (!requireMusicBeforeStart()) return;

  updateStartNotice("hide");
  state.running = true;
  state.paused = false;
  state.pauseStart = 0;
  state.gameOver = false;
  state.startTime = performance.now() + 350;
  state.score = 0;
  state.combo = 0;
  state.maxCombo = 0;
  state.power = 100;
  state.bpm = 122;
  state.notes = [];
  state.nextNoteId = 0;
  state.nextHitTime = 1.55;
  state.patternIndex = 0;
  noteContainer.innerHTML = "";

  hideScoreBoard();
  updateTimer(0);
  updateHud();
  resetVisuals();
  spawnEnemySquad();
  showJudgement("검기를 준비해라", "");
  timingTip.textContent = "노트가 왼쪽 끝 판정원에 겹칠 때 SPACE";
  beatStatus.textContent = "오른쪽에서 날아온 노트가 왼쪽 끝 판정원에 겹치면 SPACE";
  pauseButton.textContent = "일시정지";
  pauseButton.classList.remove("pause-active");

  tryPlayMusic();
  requestAnimationFrame(update);
}

function endGame(reason = "게임 종료") {
  if (state.gameOver && !state.running) return;

  state.running = false;
  state.paused = false;
  state.pauseStart = 0;
  state.gameOver = true;
  pauseButton.textContent = "일시정지";
  pauseButton.classList.remove("pause-active");
  updateStartNotice(state.musicReady ? "ready" : "need");
  bgm.pause();
  resetVisuals();
  noteContainer.innerHTML = "";
  enemyGroup.innerHTML = "";
  showJudgement(reason, reason === "수련 종료" ? "perfect" : "miss");
  beatStatus.textContent = `최종 점수 ${state.score.toLocaleString("ko-KR")}점 · ENTER로 재시작`;
  updateHud();
  showScoreBoard(reason);
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

function pulseSheath() {
  hero.classList.remove("input-flash");
  void hero.offsetWidth;
  hero.classList.add("input-flash");
  setTimeout(() => hero.classList.remove("input-flash"), 240);
}

function handleSlashInput() {
  if (!state.running || state.gameOver || state.paused) return;

  pulseSheath();

  const gameTime = (performance.now() - state.startTime) / 1000;
  if (gameTime < 0) return;

  const candidates = state.notes.filter((note) => !note.resolved);
  if (!candidates.length) {
    resolveBadSlash();
    return;
  }

  const closest = candidates.reduce((best, note) => {
    return Math.abs(note.hitTime - gameTime) < Math.abs(best.hitTime - gameTime) ? note : best;
  });
  const abs = Math.abs(closest.hitTime - gameTime);

  if (abs <= PERFECT_WINDOW) {
    resolveSuccess(closest, "일섬", 110);
  } else if (abs <= GOOD_WINDOW) {
    resolveSuccess(closest, "참격", 55);
  } else {
    resolveBadSlash();
  }
}

function update(now) {
  if (!state.running || state.paused) return;

  const gameTime = (now - state.startTime) / 1000;
  if (gameTime < 0) {
    requestAnimationFrame(update);
    return;
  }

  updateTimer(gameTime);
  if (gameTime >= GAME_DURATION_SECONDS) {
    updateTimer(GAME_DURATION_SECONDS);
    endGame("수련 종료");
    return;
  }

  scheduleNotes(gameTime);
  updateNotes(gameTime);
  updateEnemySquad(gameTime);
  updateTimingText(gameTime);

  requestAnimationFrame(update);
}

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);

musicButton.addEventListener("click", () => {
  musicInput.click();
});

musicInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (state.selectedMusicUrl) {
    URL.revokeObjectURL(state.selectedMusicUrl);
  }

  state.selectedMusicUrl = URL.createObjectURL(file);
  state.musicReady = true;
  state.selectedMusicName = file.name;
  bgm.src = state.selectedMusicUrl;
  bgm.load();
  updateStartNotice("ready");
  showJudgement("ENTER로 시작", "good");
  timingTip.textContent = "음악 선택 완료 · ENTER로 시작";
  beatStatus.textContent = `선택한 음악: ${file.name} · ENTER로 시작`;
});

bgm.addEventListener("ended", () => {
  if (state.running && !state.gameOver) {
    beatStatus.textContent = "음악이 끝났습니다 · 3분 수련은 계속 진행됩니다";
  }
});

window.addEventListener("keydown", (event) => {
  if (event.repeat) return;

  if (event.code === "Enter") {
    event.preventDefault();
    startGame();
  }

  if (event.code === "Escape") {
    event.preventDefault();
    togglePause();
  }

  if (event.code === "Space") {
    event.preventDefault();
    handleSlashInput();
  }
});

updateTimer(0);
updateHud();
spawnEnemySquad();
updateStartNotice("need");
showJudgement("음악을 골라주세요", "");
