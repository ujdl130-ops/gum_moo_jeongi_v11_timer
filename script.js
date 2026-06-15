const gameArea = document.getElementById('gameArea');
const noteLayer = document.getElementById('noteLayer');
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const hpEl = document.getElementById('hp');
const timerEl = document.getElementById('timer');
const judgementText = document.getElementById('judgementText');
const slashEffect = document.getElementById('slashEffect');
const startOverlay = document.getElementById('startOverlay');
const startButton = document.getElementById('startButton');
const message = document.getElementById('message');
const keycap = document.querySelector('.keycap');
const swordsman = document.querySelector('.swordsman');
const musicInput = document.getElementById('musicInput');
const musicName = document.getElementById('musicName');
const resultBoard = document.getElementById('resultBoard');
const finalScoreEl = document.getElementById('finalScore');
const finalComboEl = document.getElementById('finalCombo');
const finalHpEl = document.getElementById('finalHp');
const finalRankEl = document.getElementById('finalRank');

let bgm = new Audio();
bgm.loop = false;
bgm.volume = 0.55;

const HIT_LINE_FROM_BOTTOM = 150;
const SPAWN_INTERVAL = 760;
const BASE_NOTE_SPEED = 300;
const NOTE_SPEED_VARIANTS = [0.82, 0.92, 1.0, 1.1, 1.22, 1.34];
const PERFECT_RANGE = 28;
const GOOD_RANGE = 68;
const MISS_RANGE = 105;
const MAX_HP = 5;
const GAME_DURATION = 180; // 3분

let notes = [];
let score = 0;
let combo = 0;
let bestCombo = 0;
let hp = MAX_HP;
let timeRemaining = GAME_DURATION;
let running = false;
let lastTime = 0;
let spawnTimer = 0;
let animationId = null;
let beatIndex = 0;

function getHitLineY() {
  return gameArea.clientHeight - HIT_LINE_FROM_BOTTOM;
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getRank(finalScore) {
  if (finalScore >= 12000) return 'S';
  if (finalScore >= 9000) return 'A';
  if (finalScore >= 6000) return 'B';
  if (finalScore >= 3000) return 'C';
  return 'D';
}

function loadDefaultMusic() {
  // assets/bgm.mp3 파일을 넣어두면 자동으로 기본 음악으로 사용합니다.
  bgm.src = 'assets/bgm.mp3';
  bgm.addEventListener('error', () => {
    if (!musicInput.files.length) {
      musicName.textContent = '기본 음악 없음';
    }
  }, { once: true });
}

function releaseFocusedButton() {
  // 시작 버튼을 클릭한 뒤 포커스가 버튼에 남아 있으면
  // Space 입력이 버튼 클릭으로 한 번 더 처리되어 게임/음악이 재시작될 수 있습니다.
  // 게임 영역으로 포커스를 옮겨 Space가 오직 베기 입력으로만 동작하게 합니다.
  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }

  if (gameArea && typeof gameArea.focus === 'function') {
    gameArea.focus({ preventScroll: true });
  }
}

function playMusic(restart = false) {
  if (!bgm.src) return;

  // 게임 시작 때만 음악을 처음으로 되돌립니다.
  // Space 입력으로 공격할 때는 이 함수를 호출하지 않도록 해서 음악이 끊기지 않게 합니다.
  if (restart) {
    bgm.currentTime = 0;
  }

  bgm.play().catch(() => {
    message.textContent = '브라우저 정책 때문에 음악 재생이 막혔습니다. 시작 버튼을 클릭해 다시 시작해보세요.';
  });
}

function stopMusic() {
  bgm.pause();
  bgm.currentTime = 0;
}

function resetGame() {
  notes.forEach(note => note.el.remove());
  notes = [];
  score = 0;
  combo = 0;
  bestCombo = 0;
  hp = MAX_HP;
  timeRemaining = GAME_DURATION;
  spawnTimer = 0;
  beatIndex = 0;
  lastTime = performance.now();
  timerEl.classList.remove('timer-warning');
  resultBoard.classList.add('hidden');
  updateUI();
  setJudgement('준비', false);
}

function prepareStartOverlay() {
  startOverlay.querySelector('h1').textContent = '검무전기';
  startOverlay.querySelector('p').textContent = '음악을 선택한 뒤, 3분 동안 박자에 맞춰 자객들을 베어내는 웹 리듬 액션';
  startButton.textContent = '시작하기';
  resultBoard.classList.add('hidden');
}

function startGame() {
  releaseFocusedButton();
  prepareStartOverlay();
  resetGame();
  running = true;
  startOverlay.classList.add('hidden');
  message.textContent = '3분 동안 Space로 참격선의 자객을 베어내세요!';
  playMusic(true);
  if (animationId) cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(gameLoop);
}

function showResultBoard(reason) {
  const rank = getRank(score);
  finalScoreEl.textContent = `${score}점`;
  finalComboEl.textContent = `${bestCombo}연참`;
  finalHpEl.textContent = `${Math.max(0, hp)}`;
  finalRankEl.textContent = `등급 ${rank}`;
  resultBoard.classList.remove('hidden');

  if (reason === 'time') {
    startOverlay.querySelector('h1').textContent = '수련 종료';
    startOverlay.querySelector('p').textContent = '3분 수련이 끝났습니다. 아래 점수보드를 확인하세요.';
  } else {
    startOverlay.querySelector('h1').textContent = '게임오버';
    startOverlay.querySelector('p').textContent = '내공이 모두 소진되었습니다. 아래 점수보드를 확인하세요.';
  }

  startButton.textContent = '다시 시작하기';
}

function endGame(reason = 'hp') {
  if (!running && reason !== 'manual') return;

  running = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  stopMusic();

  if (reason === 'time') {
    setJudgement('수련 완료', true);
    message.textContent = `3분 종료 · 최종 점수 ${score}점 · Enter로 재도전`;
  } else {
    setJudgement('패배', true);
    message.textContent = `게임오버 · 최종 점수 ${score}점 · Enter로 재도전`;
  }

  timerEl.classList.remove('timer-warning');
  updateUI();
  showResultBoard(reason);
  startOverlay.classList.remove('hidden');
}

function spawnNote() {
  const el = document.createElement('div');
  el.className = 'enemy-note';

  const lanes = [0.36, 0.5, 0.64];
  const xRatio = lanes[beatIndex % lanes.length];
  const x = gameArea.clientWidth * xRatio;

  const speedMultiplier = NOTE_SPEED_VARIANTS[Math.floor(Math.random() * NOTE_SPEED_VARIANTS.length)];
  const difficultyBoost = Math.min(beatIndex * 1.5, 90);
  const speed = BASE_NOTE_SPEED * speedMultiplier + difficultyBoost;

  const note = {
    el,
    x,
    y: -40,
    speed,
    judged: false,
  };

  if (speedMultiplier >= 1.2) {
    el.classList.add('fast');
  } else if (speedMultiplier <= 0.92) {
    el.classList.add('slow');
  }

  el.style.left = `${x}px`;
  el.style.top = `${note.y}px`;
  noteLayer.appendChild(el);
  notes.push(note);
  beatIndex++;
}

function gameLoop(now) {
  if (!running) return;

  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  timeRemaining -= dt;
  spawnTimer += dt * 1000;

  if (timeRemaining <= 0) {
    timeRemaining = 0;
    updateUI();
    endGame('time');
    return;
  }

  if (spawnTimer >= SPAWN_INTERVAL) {
    spawnTimer -= SPAWN_INTERVAL;
    spawnNote();
  }

  const hitY = getHitLineY();

  for (const note of notes) {
    note.y += note.speed * dt;
    note.el.style.top = `${note.y}px`;

    if (!note.judged && note.y > hitY + MISS_RANGE) {
      note.judged = true;
      note.el.remove();
      registerMiss('피격');
    }
  }

  notes = notes.filter(note => !note.judged && note.y < gameArea.clientHeight + 90);

  if (hp <= 0) {
    endGame('hp');
    return;
  }

  updateUI();
  animationId = requestAnimationFrame(gameLoop);
}

function attack() {
  if (!running) return;

  animateAttack();

  const hitY = getHitLineY();
  let closest = null;
  let closestDistance = Infinity;

  for (const note of notes) {
    if (note.judged) continue;
    const distance = Math.abs(note.y - hitY);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = note;
    }
  }

  if (!closest || closestDistance > MISS_RANGE) {
    registerMiss('허공베기');
    return;
  }

  closest.judged = true;
  closest.el.remove();

  if (closestDistance <= PERFECT_RANGE) {
    score += 100 + combo * 3;
    combo += 1;
    bestCombo = Math.max(bestCombo, combo);
    setJudgement('일섬', true);
  } else if (closestDistance <= GOOD_RANGE) {
    score += 50 + combo;
    combo += 1;
    bestCombo = Math.max(bestCombo, combo);
    setJudgement('참격', true);
  } else {
    registerMiss('피격');
    return;
  }

  updateUI();
}

function registerMiss(text) {
  combo = 0;
  hp -= 1;
  setJudgement(text, true);
  updateUI();
}

function updateUI() {
  scoreEl.textContent = score;
  comboEl.textContent = combo;
  hpEl.textContent = Math.max(0, hp);
  timerEl.textContent = formatTime(timeRemaining);

  if (running && timeRemaining <= 30) {
    timerEl.classList.add('timer-warning');
  } else {
    timerEl.classList.remove('timer-warning');
  }
}

function setJudgement(text, pop) {
  judgementText.textContent = text;
  if (pop) {
    judgementText.classList.remove('pop');
    void judgementText.offsetWidth;
    judgementText.classList.add('pop');
  }
}

function animateAttack() {
  slashEffect.classList.remove('active');
  swordsman.classList.remove('attack');
  keycap.classList.add('pressed');
  void slashEffect.offsetWidth;
  slashEffect.classList.add('active');
  swordsman.classList.add('attack');
  setTimeout(() => keycap.classList.remove('pressed'), 90);
}

function handleMusicEnded() {
  // 게임 길이는 3분 타이머가 기준입니다.
  // 선택한 음악이 먼저 끝나도 게임은 타이머가 끝날 때까지 계속됩니다.
  if (running) {
    message.textContent = '음악 종료 · 남은 시간까지 계속 플레이됩니다.';
  }
}

musicInput.addEventListener('change', () => {
  const file = musicInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  bgm.pause();
  bgm = new Audio(url);
  bgm.loop = false;
  bgm.volume = 0.55;
  bgm.addEventListener('ended', handleMusicEnded);
  musicName.textContent = file.name;
  message.textContent = '음악 선택 완료 · Enter로 시작하세요';
});

bgm.addEventListener('ended', handleMusicEnded);

loadDefaultMusic();
updateUI();

function handleKeyDown(event) {
  if (event.code === 'Space') {
    event.preventDefault();
    event.stopPropagation();

    // Space를 꾹 누르고 있을 때 브라우저가 반복 입력을 발생시키면
    // 공격이 여러 번 들어가며 미스/게임오버가 빠르게 발생할 수 있으니 1회만 처리합니다.
    if (!event.repeat) {
      attack();
    }
    return;
  }

  if (event.code === 'Enter') {
    event.preventDefault();
    event.stopPropagation();

    if (!event.repeat) {
      startGame();
    }
  }
}

function handleKeyUp(event) {
  if (event.code === 'Space') {
    // 버튼이나 라벨에 포커스가 남아 있어도 Space가 클릭 이벤트로 번지지 않게 막습니다.
    event.preventDefault();
    event.stopPropagation();
  }
}

window.addEventListener('keydown', handleKeyDown, true);
window.addEventListener('keyup', handleKeyUp, true);

startButton.addEventListener('click', () => {
  releaseFocusedButton();
  startGame();
});

window.addEventListener('blur', () => {
  keycap.classList.remove('pressed');
});
