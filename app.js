/* Dark Triad quick test (local-only).
 * M: Machiavellianism, N: Narcissism, P: Psychopathy (entertainment labels).
 */

const QUESTIONS = [
  { dim: 'M', text: '遇到目标明确的资源/机会，你更常用的方式是？', opts: ['按规则来，慢慢争取', '争取但尽量不冒犯别人', '会找捷径/关系提高成功率', '不惜操控局面也要拿到'] },
  { dim: 'M', text: '在合作中你更在意什么？', opts: ['长期关系', '公平交换', '我方收益最大化', '我掌控关键节点'] },
  { dim: 'M', text: '当你发现别人有弱点时你会？', opts: ['不提也不利用', '最多私下提醒', '视情况作为谈判筹码', '会系统性利用以获利'] },
  { dim: 'M', text: '你如何看待“善意的谎言”？', opts: ['尽量不说', '必要时说一点', '经常用来避免麻烦/达成目的', '只要有效就用，细节不重要'] },
  { dim: 'M', text: '当规则挡路时你会？', opts: ['遵守规则', '找替代路径', '找人/找漏洞', '直接改写规则或让别人背锅'] },
  { dim: 'M', text: '你更擅长的影响方式是？', opts: ['用事实说服', '用情绪共鸣', '用利益交换', '用信息差/立场操控'] },
  { dim: 'M', text: '遇到竞争对手，你会？', opts: ['良性竞争', '暗中提高自己', '有策略地打压对方', '让对方失去选择/站队'] },

  { dim: 'N', text: '你希望别人怎么看你？', opts: ['靠谱就行', '有点亮点', '很优秀/很特别', '独一无二、不可替代'] },
  { dim: 'N', text: '别人夸你时你通常？', opts: ['礼貌回应', '会开心但不当真', '会反复回味', '会觉得“本来就该这样”'] },
  { dim: 'N', text: '在群体中你更倾向于？', opts: ['不抢镜', '适度表达', '希望被注意到', '希望成为中心/话语权'] },
  { dim: 'N', text: '当别人不认可你时？', opts: ['想想是否自己有问题', '沟通解释', '觉得对方没眼光', '会想让对方“付出代价/后悔”'] },
  { dim: 'N', text: '你对“面子/人设”在意程度？', opts: ['几乎不在意', '偶尔在意', '比较在意', '非常在意，不能掉价'] },
  { dim: 'N', text: '你对“我值得更好的”这句话的感受？', opts: ['一般', '有时会这样想', '经常这样想', '强烈认同，这是底线'] },
  { dim: 'N', text: '你会主动展示成就/生活吗？', opts: ['几乎不', '偶尔', '经常', '会精心包装展示'] },

  { dim: 'P', text: '看到别人难过时你通常？', opts: ['会被带动，想安慰', '会同情但不太受影响', '会分析原因更重要', '会觉得“情绪是他们的问题”'] },
  { dim: 'P', text: '你对“内疚感”最接近哪种？', opts: ['很强，会反思', '有但可调节', '不常有', '几乎没有，做事只看结果'] },
  { dim: 'P', text: '冲突升级时你更像？', opts: ['努力降温', '能控制住但会较真', '容易变冷/切断联系', '会享受压制对方的感觉'] },
  { dim: 'P', text: '你对别人的边界感？', opts: ['很尊重', '大多尊重', '看关系远近', '我需要时会越界'] },
  { dim: 'P', text: '当你伤到别人时你更可能？', opts: ['立刻道歉补偿', '解释并修复', '觉得对方太敏感', '不解释，转身继续'] },
  { dim: 'P', text: '你对“风险/刺激”的态度？', opts: ['偏保守', '适度尝试', '喜欢刺激', '越刺激越兴奋，越界也无所谓'] },
];

const DIM_LABEL = {
  M: 'M（马基）',
  N: 'N（自恋）',
  P: 'P（精神变态倾向）',
};

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
function pct(v, max) { return Math.round((v / max) * 100); }

function levelOf(dim, score, max) {
  const p = score / max;
  if (p < 0.25) return '低';
  if (p < 0.5) return '中';
  if (p < 0.75) return '偏高';
  return '高';
}

function titleFrom(scores) {
  const dims = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = dims[0][0];
  const map = {
    M: '策略型影子玩家',
    N: '舞台中心感拉满',
    P: '冷静切割型人格',
  };
  return map[top] || '黑暗三角画像';
}

function topDim(scores) {
  const entries = Object.entries(scores);
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function shareCopy(scores, total100) {
  const maxM = 7 * 3;
  const maxN = 7 * 3;
  const maxP = 6 * 3;
  const lvM = levelOf('M', scores.M, maxM);
  const lvN = levelOf('N', scores.N, maxN);
  const lvP = levelOf('P', scores.P, maxP);

  const td = topDim(scores);

  const hooks = {
    M: '我测出来是【策略型影子玩家】——表面讲道理，心里在算账。',
    N: '我居然是【舞台中心感拉满】——没聚光灯也要自带追光。',
    P: '我是【冷静切割型人格】——情绪不多，但边界感很硬。',
  };

  const roast = {
    M: [
      'M：算盘打得响，情绪放一边',
      'N：不一定抢C位，但要掌控节奏',
      'P：冷静到像在开会',
    ],
    N: [
      'M：策略偶尔用，但更爱赢面子',
      'N：夸我！现在！',
      'P：冷脸不多，更多是“你不懂我”',
    ],
    P: [
      'M：能谈就谈，不能谈就走',
      'N：不爱抢C位，但别挡我路',
      'P：心软？偶尔，但不影响我关门',
    ],
  };

  const cta = {
    M: '敢不敢@一个“人畜无害但最会安排”的朋友来对照？',
    N: '评论区打“我最闪”我把链接丢你，顺便@一个爱装淡的人。',
    P: '@一个“表面淡淡，其实最狠”的人来测（别装）。',
  };

  return [
    hooks[td],
    `暗黑指数：${total100}/100`,
    `${roast[td][0]}\n${roast[td][1]}\n${roast[td][2]}`,
    `M(马基)：${scores.M}/${maxM}（${lvM}）  N(自恋)：${scores.N}/${maxN}（${lvN}）  P(冷静)：${scores.P}/${maxP}（${lvP}）`,
    cta[td],
    '仅供娱乐，不构成任何诊断。',
  ].join('\n');
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawRadar(canvas, scores) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.55;
  const R = Math.min(w, h) * 0.32;

  const dims = ['M', 'N', 'P'];
  const max = { M: 21, N: 21, P: 18 };
  const ang = (i) => (-Math.PI / 2) + (i * (2 * Math.PI / dims.length));

  // grid
  ctx.lineWidth = 1;
  for (let ring = 1; ring <= 4; ring++) {
    const rr = (R * ring) / 4;
    ctx.strokeStyle = 'rgba(242,242,245,0.12)';
    ctx.beginPath();
    dims.forEach((d, i) => {
      const a = ang(i);
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  }

  // axes + labels
  dims.forEach((d, i) => {
    const a = ang(i);
    const x = cx + Math.cos(a) * (R + 10);
    const y = cy + Math.sin(a) * (R + 10);
    ctx.strokeStyle = 'rgba(242,242,245,0.16)';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
    ctx.stroke();

    ctx.fillStyle = 'rgba(242,242,245,0.78)';
    ctx.font = '600 14px "IBM Plex Sans SC"';
    const label = d;
    ctx.textAlign = x < cx ? 'right' : (Math.abs(x - cx) < 8 ? 'center' : 'left');
    ctx.textBaseline = y < cy ? 'bottom' : 'top';
    ctx.fillText(label, x, y);
  });

  // polygon
  const pts = dims.map((d, i) => {
    const ratio = clamp(scores[d] / max[d], 0, 1);
    const a = ang(i);
    return [cx + Math.cos(a) * (R * ratio), cy + Math.sin(a) * (R * ratio)];
  });

  ctx.beginPath();
  pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,59,106,0.18)';
  ctx.strokeStyle = 'rgba(255,59,106,0.65)';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  // dots
  pts.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,184,77,0.9)';
    ctx.fill();
  });
}

const $ = (id) => document.getElementById(id);
const screenHome = $('screen-home');
const screenQuiz = $('screen-quiz');
const screenResult = $('screen-result');

const btnStart = $('btn-start');
const btnRandom = $('btn-random');
const btnPrev = $('btn-prev');
const btnExit = $('btn-exit');
const btnRetry = $('btn-retry');
const btnCopy = $('btn-copy');
const btnExport = $('btn-export');
const btnDownload = $('btn-download');
const btnCloseExport = $('btn-close-export');
const btnReset = $('btn-reset');

const qIndex = $('q-index');
const qTotal = $('q-total');
const qDim = $('q-dim');
const qText = $('q-text');
const opts = $('opts');
const barFill = $('bar-fill');

const resultTitle = $('result-title');
const scoreTotal = $('score-total');
const bars = $('bars');
const shareText = $('share-text');
const copyHint = $('copy-hint');
const exportWrap = $('export-wrap');
const exportImg = $('export-img');

const KEY = 'dt_test_v1';

let state = {
  i: 0,
  answers: Array(QUESTIONS.length).fill(null), // 0..3
};

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const obj = JSON.parse(raw);
    if (obj && Array.isArray(obj.answers) && typeof obj.i === 'number') state = obj;
  } catch {}
}

function reset() {
  state = { i: 0, answers: Array(QUESTIONS.length).fill(null) };
  save();
}

function show(screen) {
  [screenHome, screenQuiz, screenResult].forEach((el) => el.classList.add('hidden'));
  screen.classList.remove('hidden');
}

function renderQuiz() {
  const i = clamp(state.i, 0, QUESTIONS.length - 1);
  const q = QUESTIONS[i];
  qIndex.textContent = String(i + 1);
  qTotal.textContent = String(QUESTIONS.length);
  qDim.textContent = q.dim;
  qText.textContent = q.text;
  barFill.style.width = `${Math.round(((i) / QUESTIONS.length) * 100)}%`;

  opts.innerHTML = '';
  const sel = state.answers[i];
  q.opts.forEach((t, idx) => {
    const b = document.createElement('button');
    b.className = 'opt' + (sel === idx ? ' sel' : '');
    b.type = 'button';
    b.textContent = `${String.fromCharCode(65 + idx)}. ${t}`;
    b.addEventListener('click', () => {
      state.answers[i] = idx;
      save();
      if (i < QUESTIONS.length - 1) {
        state.i = i + 1;
        renderQuiz();
      } else {
        renderResult();
      }
    });
    opts.appendChild(b);
  });

  btnPrev.disabled = i === 0;
}

function computeScores() {
  const scores = { M: 0, N: 0, P: 0 };
  QUESTIONS.forEach((q, idx) => {
    const a = state.answers[idx];
    if (a === null || a === undefined) return;
    scores[q.dim] += a; // 0..3
  });
  return scores;
}

function renderBars(scores) {
  bars.innerHTML = '';
  const max = { M: 21, N: 21, P: 18 };
  const colors = { M: 'rgba(255,59,106,0.95)', N: 'rgba(255,184,77,0.95)', P: 'rgba(94,242,194,0.95)' };

  ['M', 'N', 'P'].forEach((d) => {
    const row = document.createElement('div');
    row.className = 'brow';

    const tag = document.createElement('div');
    tag.className = 'btag';
    tag.textContent = d;

    const track = document.createElement('div');
    track.className = 'track';
    const fill = document.createElement('div');
    fill.className = 'fill';
    fill.style.background = `linear-gradient(90deg, ${colors[d]}, rgba(255,255,255,0.08))`;
    fill.style.width = `${pct(scores[d], max[d])}%`;
    track.appendChild(fill);

    const val = document.createElement('div');
    val.className = 'bval';
    val.textContent = `${scores[d]}/${max[d]}`;

    row.appendChild(tag);
    row.appendChild(track);
    row.appendChild(val);

    bars.appendChild(row);
  });
}

function buildPoster(scores, total100) {
  // HiDPI export
  const W = 1080;
  const H = 1440;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#07070a');
  g.addColorStop(1, '#0b0b12');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Orbs
  function orb(x, y, r, c0, c1) {
    const gr = ctx.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, c0);
    gr.addColorStop(1, c1);
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  orb(220, 260, 420, 'rgba(255,59,106,0.22)', 'rgba(255,59,106,0)');
  orb(920, 1160, 460, 'rgba(255,184,77,0.18)', 'rgba(255,184,77,0)');

  // Card
  const pad = 72;
  const cx = pad;
  const cy = 160;
  const cw = W - pad * 2;
  const ch = H - 260;
  ctx.fillStyle = 'rgba(18,18,26,0.72)';
  ctx.strokeStyle = 'rgba(242,242,245,0.12)';
  ctx.lineWidth = 2;
  roundRect(ctx, cx, cy, cw, ch, 36);
  ctx.fill();
  ctx.stroke();

  // Title
  ctx.fillStyle = 'rgba(242,242,245,0.72)';
  ctx.font = '500 26px "IBM Plex Sans SC"';
  ctx.fillText('ENTERTAINMENT ONLY', cx + 44, cy + 70);

  ctx.fillStyle = '#f2f2f5';
  ctx.font = '700 60px "Noto Serif SC"';
  ctx.fillText('黑暗三角人格', cx + 44, cy + 140);

  // Result title + score
  const rTitle = titleFrom(scores);
  ctx.fillStyle = 'rgba(242,242,245,0.88)';
  ctx.font = '700 44px "Noto Serif SC"';
  ctx.fillText(rTitle, cx + 44, cy + 220);

  ctx.fillStyle = '#ffb84d';
  ctx.font = '700 120px "Noto Serif SC"';
  const s = String(total100);
  ctx.fillText(s, cx + cw - 44 - ctx.measureText(s).width, cy + 230);
  ctx.fillStyle = 'rgba(242,242,245,0.72)';
  ctx.font = '600 24px "IBM Plex Sans SC"';
  ctx.fillText('暗黑指数 / 100', cx + cw - 44 - 190, cy + 265);

  // Radar
  const radar = document.createElement('canvas');
  radar.width = 780;
  radar.height = 520;
  drawRadar(radar, scores);
  ctx.drawImage(radar, cx + 44, cy + 260);

  // Bars
  const max = { M: 21, N: 21, P: 18 };
  const dims = ['M', 'N', 'P'];
  const startY = cy + 820;
  const rowH = 110;
  dims.forEach((d, i) => {
    const y = startY + i * rowH;
    ctx.fillStyle = 'rgba(242,242,245,0.9)';
    ctx.font = '700 34px "Noto Serif SC"';
    ctx.fillText(d, cx + 44, y);

    ctx.fillStyle = 'rgba(242,242,245,0.66)';
    ctx.font = '500 24px "IBM Plex Sans SC"';
    ctx.fillText(DIM_LABEL[d], cx + 90, y);

    // track
    const tx = cx + 44;
    const ty = y + 26;
    const tw = cw - 88;
    const th = 20;
    ctx.fillStyle = 'rgba(242,242,245,0.10)';
    roundRect(ctx, tx, ty, tw, th, 999);
    ctx.fill();

    const p = clamp(scores[d] / max[d], 0, 1);
    const fw = Math.max(12, tw * p);
    const fg = ctx.createLinearGradient(tx, 0, tx + tw, 0);
    fg.addColorStop(0, 'rgba(94,242,194,0.95)');
    fg.addColorStop(0.6, 'rgba(255,184,77,0.95)');
    fg.addColorStop(1, 'rgba(255,59,106,0.95)');
    ctx.fillStyle = fg;
    roundRect(ctx, tx, ty, fw, th, 999);
    ctx.fill();

    ctx.fillStyle = 'rgba(242,242,245,0.72)';
    ctx.font = '600 24px "IBM Plex Sans SC"';
    const tv = `${scores[d]}/${max[d]}（${levelOf(d, scores[d], max[d])}）`;
    ctx.fillText(tv, cx + cw - 44 - ctx.measureText(tv).width, y);
  });

  // Footer
  ctx.fillStyle = 'rgba(242,242,245,0.60)';
  ctx.font = '500 24px "IBM Plex Sans SC"';
  ctx.fillText('仅供娱乐，不构成任何诊断。', cx + 44, cy + ch - 70);

  return canvas.toDataURL('image/png');
}

function renderResult() {
  const scores = computeScores();
  const totalRaw = scores.M + scores.N + scores.P; // max 60
  const total100 = Math.round((totalRaw / 60) * 100);

  resultTitle.textContent = titleFrom(scores);
  scoreTotal.textContent = String(total100);

  renderBars(scores);
  drawRadar($('radar'), scores);

  shareText.value = shareCopy(scores, total100);
  copyHint.textContent = '';

  // Hide export panel when re-rendering.
  exportWrap.classList.add('hidden');
  exportImg.removeAttribute('src');
  btnDownload.setAttribute('href', '#');

  // Cache for export
  renderResult._last = { scores, total100 };

  show(screenResult);
}

function start() {
  load();
  show(screenQuiz);
  renderQuiz();
}

btnStart.addEventListener('click', () => {
  reset();
  start();
});

btnRandom.addEventListener('click', () => {
  reset();
  // random answers
  state.answers = state.answers.map(() => Math.floor(Math.random() * 4));
  save();
  renderResult();
});

btnPrev.addEventListener('click', () => {
  state.i = clamp(state.i - 1, 0, QUESTIONS.length - 1);
  save();
  renderQuiz();
});

btnExit.addEventListener('click', () => {
  show(screenHome);
});

btnRetry.addEventListener('click', () => {
  reset();
  start();
});

btnCopy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shareText.value);
    copyHint.textContent = '已复制，可直接去小红书粘贴。';
  } catch {
    shareText.select();
    document.execCommand('copy');
    copyHint.textContent = '已复制（兼容模式）。';
  }
});

btnExport.addEventListener('click', () => {
  const last = renderResult._last;
  if (!last) return;
  const dataUrl = buildPoster(last.scores, last.total100);
  exportImg.src = dataUrl;
  btnDownload.href = dataUrl;
  exportWrap.classList.remove('hidden');
  copyHint.textContent = '海报已生成：可下载/保存后发小红书。';
});

btnCloseExport.addEventListener('click', () => {
  exportWrap.classList.add('hidden');
});

btnReset.addEventListener('click', (e) => {
  e.preventDefault();
  reset();
  copyHint.textContent = '进度已清空。';
});

// Load existing progress if any.
load();
