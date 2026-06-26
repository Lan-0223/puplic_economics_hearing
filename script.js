const roles = {
  province: {
    name: "省政府",
    faction: "求救派",
    color: "#1d4ed8",
    tendency: "approve",
    short: "强调金融稳定、公共服务连续性和中央财政兜底必要性。",
    objective: "争取中央批准300亿特别再融资债，避免全省城投融资成本上升。",
    opening: "不救助会抬升全省城投融资成本，金融稳定具有外部性，中央财政不能完全置身事外。"
  },
  ministry: {
    name: "财政部",
    faction: "硬汉派",
    color: "#374151",
    tendency: "reject",
    short: "坚持预算纪律，反对形成中央兜底预期。",
    objective: "维护《预算法》纪律，防止地方形成向中央倒逼救助的预期。",
    opening: "中央兜底会强化预算软约束，不能用全国纳税人为地方无序举债买单。"
  },
  platform: {
    name: "城投集团负责人",
    faction: "委屈派",
    color: "#f97316",
    tendency: "approve",
    short: "强调城投承担公共任务，自身并非完全自主举债。",
    objective: "说明城投债务形成的政府任务属性，争取展期和再融资支持。",
    opening: "城投承担水务、供暖、地铁、棚改等民生业务，违约会冲击就业和公共服务。"
  },
  creditor: {
    name: "债券债权人",
    faction: "刚兑派",
    color: "#7c3aed",
    tendency: "approve",
    short: "主张维护刚性兑付，避免债市恐慌。",
    objective: "要求保护债券投资者权益，避免信用债市场信心崩塌。",
    opening: "发行时市场形成政府支持预期，突然打破刚兑会引发债市信心冲击。"
  },
  taxpayer: {
    name: "普通纳税人",
    faction: "问责派",
    color: "#16a34a",
    tendency: "reject",
    short: "质疑权责不对等，反对全体纳税人为地方债务买单。",
    objective: "要求公开审计、追责违规举债，并防止全国纳税人被动买单。",
    opening: "普通纳税人未参与举债决策，却可能承担成本，权责明显不对等。"
  }
};

const phases = [
  { title: "1. 开庭导入", instruction: "教师介绍案件背景，学生理解债务规模和公共服务风险。" },
  { title: "2. 角色入席", instruction: "学生分组选择角色，准备本方立场。" },
  { title: "3. 证据发放", instruction: "教师发放证据包，学生选择对本方有利的材料。" },
  { title: "4. 首轮陈述", instruction: "各角色用30秒说明本方主张。" },
  { title: "5. 交叉质询", instruction: "教师随机点名，各组回应质询。" },
  { title: "6. 危机推进", instruction: "教师投放突发事件，学生调整论证。" },
  { title: "7. 政策谈判", instruction: "学生提出配套条件，尝试形成可执行方案。" },
  { title: "8. 最终投票", instruction: "各组投票并生成课堂知识卡。" }
];

const evidenceCards = [
  { id: "spread", title: "城投债利差扩大", concept: "金融稳定", text: "全省城投债平均利差一个月内扩大120BP，新增融资成本快速上升。", fit: ["province", "creditor"], effects: { financialStability: 8, marketConfidence: 7, moralHazard: 3 } },
  { id: "law", title: "《预算法》约束", concept: "预算纪律", text: "地方政府不得违法违规举债，不得通过融资平台变相增加隐性债务。", fit: ["ministry", "taxpayer"], effects: { fiscalDiscipline: 10, taxpayerFairness: 6, moralHazard: -5 } },
  { id: "service", title: "民生服务清单", concept: "公共服务", text: "建投集团承担水务、供暖、轨道交通和棚改项目，覆盖300万市民。", fit: ["province", "platform"], effects: { serviceProtection: 10, publicSupport: 6, financialStability: 3 } },
  { id: "audit", title: "审计疑点", concept: "公共问责", text: "部分项目投资回报率低于贷款利率，存在低效投资和预算审议不足问题。", fit: ["ministry", "taxpayer"], effects: { fiscalDiscipline: 7, taxpayerFairness: 9, publicSupport: 3 } },
  { id: "workers", title: "就业与承包商链条", concept: "就业稳定", text: "集团及上下游承包商涉及约4.6万名员工，违约可能造成工资和工程款断裂。", fit: ["platform", "province"], effects: { serviceProtection: 6, publicSupport: 7, financialStability: 3 } },
  { id: "rating", title: "评级与承销材料", concept: "隐性担保", text: "债券发行材料多次提及地方政府支持，投资者据此形成政府兜底预期。", fit: ["creditor"], effects: { marketConfidence: 9, moralHazard: 6, financialStability: 4 } },
  { id: "tax", title: "跨地区纳税人负担", concept: "财政公平", text: "中央兜底意味着全国纳税人共同承担地方债务成本，涉及地区间财政公平。", fit: ["taxpayer", "ministry"], effects: { taxpayerFairness: 9, fiscalDiscipline: 5, moralHazard: -3 } },
  { id: "case", title: "遵义道桥化债案例", concept: "政策先例", text: "遵义道桥曾通过银行贷款重组和展期缓释债务压力，形成地方化债参考。", fit: ["province", "platform"], effects: { financialStability: 6, serviceProtection: 3, moralHazard: 3 } }
];

const crisisEvents = [
  { id: "market", title: "债市恐慌", text: "省内另一家城投债利差一天上升80BP，投资者开始集中抛售弱资质城投债。", prompt: "请说明金融稳定是否足以成为中央财政介入的理由。", effects: { financialStability: -10, marketConfidence: -12, moralHazard: 3 } },
  { id: "winter", title: "供暖季临近", text: "X市即将进入供暖季，热力公司现金流紧张，市民担忧供暖服务中断。", prompt: "公共服务连续性能否压倒预算纪律？为什么？", effects: { serviceProtection: -12, publicSupport: -8, financialStability: -3 } },
  { id: "media", title: "低效项目曝光", text: "媒体曝光建投集团曾投资多个形象工程，部分项目利用率低、回报不足。", prompt: "如果债务中包含低效项目，纳税人是否仍应承担救助成本？", effects: { taxpayerFairness: -10, fiscalDiscipline: -8, moralHazard: 8 } },
  { id: "ministryLine", title: "财政部划红线", text: "财政部强调不得新增隐性债务，坚持谁借谁还，地方必须压实偿债责任。", prompt: "如何在不强化兜底预期的前提下避免系统性风险？", effects: { fiscalDiscipline: 10, taxpayerFairness: 6, marketConfidence: -3 } }
];

const actions = {
  statement: { label: "立场陈述", effects: { publicSupport: 2 }, theory: "立场陈述需要把角色利益转化为公共经济学论证。" },
  question: { label: "提出质询", effects: { fiscalDiscipline: 5, taxpayerFairness: 4 }, theory: "质询机制体现信息披露和权力制衡。" },
  audit: { label: "要求审计", effects: { fiscalDiscipline: 8, taxpayerFairness: 7, moralHazard: -5 }, theory: "专项审计有利于识别隐性债务和低效投资。" },
  service: { label: "保护民生", effects: { serviceProtection: 9, publicSupport: 7, financialStability: 3 }, theory: "基础公共服务具有准公共品属性。" },
  extension: { label: "提出展期", effects: { financialStability: 6, marketConfidence: 4, fiscalDiscipline: -2 }, theory: "展期缓解流动性风险，但可能推迟风险暴露。" },
  accountability: { label: "要求问责", effects: { taxpayerFairness: 8, fiscalDiscipline: 6, moralHazard: -6 }, theory: "问责回应权责对等，也能降低未来举债激励。" },
  payment: { label: "主张兑付", effects: { marketConfidence: 8, financialStability: 5, moralHazard: 7 }, theory: "刚性兑付稳定短期信心，但可能削弱风险定价。" }
};

const scoreNames = {
  financialStability: "金融稳定",
  fiscalDiscipline: "财政纪律",
  serviceProtection: "民生保障",
  taxpayerFairness: "纳税公平",
  moralHazard: "道德风险",
  marketConfidence: "债市信心",
  publicSupport: "公众支持"
};

const defaultScores = {
  financialStability: 55,
  fiscalDiscipline: 50,
  serviceProtection: 55,
  taxpayerFairness: 45,
  moralHazard: 55,
  marketConfidence: 50,
  publicSupport: 50
};

const state = {
  mode: "teacher",
  phaseIndex: 0,
  activeEventId: "",
  selectedRole: "",
  selectedEvidenceId: "",
  generatedSpeech: "",
  spotlightId: "",
  timerLeft: 180,
  timerInitial: 180,
  scores: Object.assign({}, defaultScores),
  submissions: [],
  votes: { approve: 0, reject: 0, conditional: 0 }
};

let timerId = null;

const teacherPanel = document.getElementById("teacherPanel");
const studentPanel = document.getElementById("studentPanel");
const teacherModeBtn = document.getElementById("teacherModeBtn");
const studentModeBtn = document.getElementById("studentModeBtn");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.getElementById("closeModalBtn");

function render() {
  renderMode();
  renderTeacher();
  renderStudent();
}

function renderMode() {
  teacherModeBtn.classList.toggle("active", state.mode === "teacher");
  studentModeBtn.classList.toggle("active", state.mode === "student");
  teacherPanel.classList.toggle("hidden", state.mode !== "teacher");
  studentPanel.classList.toggle("hidden", state.mode !== "student");
}

function renderTeacher() {
  const phase = phases[state.phaseIndex];
  const event = getActiveEvent();
  const spotlight = state.submissions.find(function (item) {
    return item.id === state.spotlightId;
  });

  teacherPanel.innerHTML = `
    <div class="panel-title">
      <div>
        <p class="section-kicker">Teacher Console</p>
        <h2>教师控制台</h2>
        <p>控制听证阶段、推送突发事件、点名发言、查看投票和生成课堂复盘。</p>
      </div>
      <span class="badge">当前阶段：${phase.title}</span>
    </div>

    <div class="teacher-layout">
      <div class="card">
        <h3>一、听证流程控制</h3>
        <div class="phase-list">
          ${phases.map(function (item, index) {
            return `<button class="phase-btn ${index === state.phaseIndex ? "active" : ""}" data-action="set-phase" data-index="${index}" type="button">${item.title}</button>`;
          }).join("")}
        </div>

        <div class="spotlight" style="margin-top:14px;">
          <strong>阶段任务：</strong>
          <p>${phase.instruction}</p>
        </div>

        <div class="action-row" style="margin-top:14px;">
          <button class="action-btn primary-btn" data-action="prev-phase" type="button">上一阶段</button>
          <button class="action-btn primary-btn" data-action="next-phase" type="button">下一阶段</button>
          <button class="action-btn danger-btn" data-action="reset-class" type="button">重置课堂</button>
        </div>
      </div>

      <div class="card">
        <h3>二、课堂计时</h3>
        <p><span class="timer-display">${formatSeconds(state.timerLeft)}</span></p>
        <div class="action-row">
          <button class="action-btn" data-action="timer-set" data-seconds="60" type="button">1分钟</button>
          <button class="action-btn" data-action="timer-set" data-seconds="180" type="button">3分钟</button>
          <button class="action-btn" data-action="timer-set" data-seconds="300" type="button">5分钟</button>
          <button class="action-btn primary-btn" data-action="timer-start" type="button">开始</button>
          <button class="action-btn" data-action="timer-pause" type="button">暂停</button>
          <button class="action-btn" data-action="timer-reset" type="button">重置</button>
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-top:16px;">
      <div class="card">
        <h3>三、危机推进器</h3>
        <p class="small-text">教师投放事件后，学生端会看到新的回应任务。</p>
        <div class="event-list">
          ${crisisEvents.map(function (item) {
            return `
              <button class="event-btn ${item.id === state.activeEventId ? "active" : ""}" data-action="set-event" data-id="${item.id}" type="button">
                <strong>${item.title}</strong>
                <small>${item.text}</small>
              </button>
            `;
          }).join("")}
        </div>
        <div class="action-row" style="margin-top:12px;">
          <button class="action-btn" data-action="clear-event" type="button">撤销突发事件</button>
        </div>
      </div>

      <div class="card">
        <h3>四、当前投屏提示</h3>
        <div class="spotlight">
          <strong>${event ? event.title : "暂无突发事件"}</strong>
          <p>${event ? event.text : "教师可在左侧选择一个突发事件，推动学生进行二轮回应。"}</p>
          <p><strong>追问：</strong>${event ? event.prompt : "本案中，财政稳定、金融稳定和纳税公平应如何排序？"}</p>
        </div>

        <h3 style="margin-top:18px;">课堂观察指标</h3>
        <div class="score-grid">${renderScoreBars()}</div>
      </div>
    </div>

    <div class="grid-2" style="margin-top:16px;">
      <div class="card">
        <h3>五、学生发言池</h3>
        <div class="action-row" style="margin-bottom:12px;">
          <button class="action-btn gold-btn" data-action="random-spotlight" type="button">随机点名投屏</button>
          <button class="action-btn" data-action="clear-spotlight" type="button">清空投屏</button>
        </div>
        <div class="record-log">
          ${state.submissions.length ? state.submissions.map(renderSubmissionItem).join("") : `<p class="small-text">暂无学生发言。请切换到学生端提交。</p>`}
        </div>
      </div>

      <div class="card">
        <h3>六、大屏展示区</h3>
        <div class="spotlight">
          ${spotlight ? `
            <strong>${spotlight.groupName} · ${roles[spotlight.roleKey].name}</strong>
            <p>${spotlight.speech}</p>
            <p><strong>理论锚点：</strong>${spotlight.theory}</p>
          ` : `
            <strong>等待投屏发言</strong>
            <p>教师可从学生发言池中选择某组发言，或点击“随机点名投屏”。</p>
          `}
        </div>

        <h3 style="margin-top:18px;">最终投票墙</h3>
        <div class="vote-bar-list">${renderVoteBars()}</div>
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <h3>七、课堂复盘知识卡</h3>
      <textarea class="knowledge-card" readonly>${buildTeacherArchive()}</textarea>
    </div>
  `;
}

function renderStudent() {
  const role = state.selectedRole ? roles[state.selectedRole] : null;
  const event = getActiveEvent();
  const evidence = getSelectedEvidence();

  studentPanel.innerHTML = `
    <div class="panel-title">
      <div>
        <p class="section-kicker">Student Terminal</p>
        <h2>学生角色端</h2>
        <p>选择角色、领取证据、回应教师推送事件、提交发言并完成投票。</p>
      </div>
      <span class="badge">当前阶段：${phases[state.phaseIndex].title}</span>
    </div>

    <div class="card">
      <h3>教师当前指令</h3>
      <p>${phases[state.phaseIndex].instruction}</p>
      <div class="spotlight">
        <strong>${event ? event.title : "暂无突发事件"}</strong>
        <p>${event ? event.text : "请先根据本角色初始立场准备开场陈述。"}</p>
        <p><strong>教师追问：</strong>${event ? event.prompt : "你代表的角色为什么支持或反对中央兜底？"}</p>
      </div>
    </div>

    <div class="student-layout" style="margin-top:16px;">
      <div class="card">
        <h3>一、选择角色</h3>
        <div class="role-grid">
          ${Object.keys(roles).map(function (key) {
            const item = roles[key];
            return `
              <button class="role-btn ${state.selectedRole === key ? "active" : ""}" style="background:${item.color};" data-action="select-role" data-role="${key}" type="button">
                <h3>${item.name}</h3>
                <span>${item.faction}</span>
                <p>${item.short}</p>
              </button>
            `;
          }).join("")}
        </div>

        ${role ? `
          <div class="spotlight" style="margin-top:14px;">
            <strong>${role.name}任务</strong>
            <p>${role.objective}</p>
            <p><strong>初始立场：</strong>${role.opening}</p>
          </div>
        ` : ""}
      </div>

      <div class="card">
        <h3>二、选择证据</h3>
        <p class="small-text">推荐证据会优先显示，但你也可以选择其他证据进行反向论证。</p>
        <div class="evidence-grid">
          ${renderEvidenceButtons()}
        </div>

        ${evidence ? `
          <div class="spotlight" style="margin-top:14px;">
            <strong>${evidence.title}</strong>
            <p>${evidence.text}</p>
            <p><strong>知识点：</strong>${evidence.concept}</p>
          </div>
        ` : ""}
      </div>
    </div>

    <div class="grid-2" style="margin-top:16px;">
      <div class="card">
        <h3>三、生成并提交发言</h3>

        <div class="input-grid">
          <div>
            <label for="groupName">小组 / 学生姓名</label>
            <input id="groupName" type="text" placeholder="例如：第三组" />
          </div>
          <div>
            <label for="speechTone">发言语气</label>
            <select id="speechTone">
              <option value="理性陈述">理性陈述</option>
              <option value="强硬质询">强硬质询</option>
              <option value="民生诉求">民生诉求</option>
              <option value="协商谈判">协商谈判</option>
            </select>
          </div>
        </div>

        <div class="full-input">
          <label for="speechAction">发言动作</label>
          <select id="speechAction">
            ${Object.keys(actions).map(function (key) {
              return `<option value="${key}">${actions[key].label}</option>`;
            }).join("")}
          </select>
        </div>

        <div class="action-row" style="margin:12px 0;">
          <button class="action-btn primary-btn" data-action="generate-speech" type="button">生成发言</button>
          <button class="action-btn gold-btn" data-action="submit-speech" type="button">提交到教师端</button>
        </div>

        <textarea id="studentSpeech" placeholder="点击“生成发言”，也可以手动修改。">${state.generatedSpeech}</textarea>
      </div>

      <div class="card">
        <h3>四、角色投票</h3>
        <p class="small-text">投票会进入教师端投票墙。</p>
        <div class="vote-options">
          <button class="vote-btn primary-btn" data-action="student-vote" data-vote="approve" type="button">批准300亿特别再融资债兜底</button>
          <button class="vote-btn" data-action="student-vote" data-vote="reject" type="button">拒绝兜底，地方自行化债</button>
          <button class="vote-btn gold-btn" data-action="student-vote" data-vote="conditional" type="button">附条件救助：审计、展期、问责并行</button>
        </div>

        <h3 style="margin-top:18px;">课堂知识卡</h3>
        <textarea class="knowledge-card" readonly>${buildStudentArchive()}</textarea>
      </div>
    </div>
  `;
}

function renderEvidenceButtons() {
  const sorted = evidenceCards.slice().sort(function (a, b) {
    const aFit = state.selectedRole && a.fit.includes(state.selectedRole) ? 1 : 0;
    const bFit = state.selectedRole && b.fit.includes(state.selectedRole) ? 1 : 0;
    return bFit - aFit;
  });

  return sorted.map(function (item) {
    const recommended = state.selectedRole && item.fit.includes(state.selectedRole);
    return `
      <button class="evidence-btn ${state.selectedEvidenceId === item.id ? "active" : ""}" data-action="select-evidence" data-id="${item.id}" type="button">
        <strong>${item.title}</strong>
        <small>${recommended ? "推荐证据" : "可用证据"} · ${item.concept}</small>
      </button>
    `;
  }).join("");
}

function renderScoreBars() {
  return Object.keys(state.scores).map(function (key) {
    const value = clamp(state.scores[key], 0, 100);
    return `
      <div>
        <div class="score-label">
          <span>${scoreNames[key]}</span>
          <strong>${value}</strong>
        </div>
        <div class="score-bar">
          <div class="score-fill" style="width:${value}%; background:${getScoreColor(key, value)};"></div>
        </div>
      </div>
    `;
  }).join("");
}

function renderSubmissionItem(item) {
  const role = roles[item.roleKey];
  return `
    <div class="record-item">
      <strong>${item.groupName} · ${role.name} · ${item.actionLabel}</strong>
      <p>${item.speech}</p>
      <div class="action-row">
        <button class="mini-btn" data-action="spotlight" data-id="${item.id}" type="button">投屏展示</button>
      </div>
    </div>
  `;
}

function renderVoteBars() {
  const labels = {
    approve: "批准兜底",
    reject: "拒绝兜底",
    conditional: "附条件救助"
  };
  const colors = {
    approve: "#1d4ed8",
    reject: "#374151",
    conditional: "#8a6f3d"
  };
  const total = state.votes.approve + state.votes.reject + state.votes.conditional;

  return Object.keys(labels).map(function (key) {
    const count = state.votes[key];
    const percent = total ? Math.round(count / total * 100) : 0;
    return `
      <div class="vote-row">
        <span>${labels[key]}</span>
        <div class="vote-track">
          <div class="vote-fill" style="width:${percent}%; background:${colors[key]};"></div>
        </div>
        <strong>${count}票</strong>
      </div>
    `;
  }).join("");
}

function buildTeacherArchive() {
  const event = getActiveEvent();
  const totalVotes = state.votes.approve + state.votes.reject + state.votes.conditional;
  const topVote = getTopVote();

  return [
    "【X市建投集团300亿债务危机课堂复盘】",
    "",
    `当前阶段：${phases[state.phaseIndex].title}`,
    `突发事件：${event ? event.title : "暂无"}`,
    `学生发言数：${state.submissions.length}条`,
    `总投票数：${totalVotes}票`,
    `当前多数意见：${topVote}`,
    "",
    "公共经济学复盘：",
    "本案的关键不是简单判断救或不救，而是分析谁决策、谁受益、谁承担成本，以及债务风险是否会通过金融市场和公共服务外溢。",
    "若批准兜底，需要配套审计、问责和资产处置，以压低道德风险。",
    "若拒绝兜底，需要设计流动性缓冲和公共服务保障，避免风险扩散。"
  ].join("\n");
}

function buildStudentArchive() {
  if (!state.selectedRole) {
    return "请先选择角色。";
  }

  const role = roles[state.selectedRole];
  const evidence = getSelectedEvidence();
  const event = getActiveEvent();

  return [
    `【${role.name}课堂知识卡】`,
    "",
    `角色派系：${role.faction}`,
    `核心立场：${role.opening}`,
    `当前证据：${evidence ? evidence.title : "尚未选择"}`,
    `突发事件：${event ? event.title : "暂无"}`,
    "",
    "分析框架：",
    "事实：X市建投集团存在1500亿总债务，其中300亿半年内集中到期。",
    `机制：${evidence ? evidence.concept : "隐性担保、金融稳定、预算约束"}影响各方行为。`,
    "规范：需要权衡纳税公平、公共服务连续性和权责对等。",
    "政策：本组应提出是否兜底及其配套条件。"
  ].join("\n");
}

function generateSpeech() {
  if (!state.selectedRole) {
    showModal("请先选择角色", "学生端需要先选择一个听证会角色。");
    return;
  }

  if (!state.selectedEvidenceId) {
    showModal("请先选择证据", "发言必须基于至少一张证据卡。");
    return;
  }

  const groupName = getInputValue("groupName") || "本组";
  const tone = getInputValue("speechTone") || "理性陈述";
  const actionKey = getInputValue("speechAction") || "statement";
  const role = roles[state.selectedRole];
  const evidence = getSelectedEvidence();
  const event = getActiveEvent();
  const action = actions[actionKey];

  state.generatedSpeech =
    `${groupName}以“${role.name}”身份进行${tone}。` +
    `本方采取“${action.label}”策略。` +
    `事实层面，我们引用“${evidence.title}”：${evidence.text}` +
    `机制层面，该证据指向“${evidence.concept}”。` +
    (event ? `面对教师推送的“${event.title}”事件，本方认为必须回应：${event.prompt}` : "") +
    `规范层面，本案应同时考虑金融稳定、财政纪律、民生保障与纳税公平。` +
    `政策层面，本方主张在明确责任边界和配套条件后推进决策。`;

  render();
}

function submitSpeech() {
  if (!state.selectedRole || !state.selectedEvidenceId) {
    showModal("无法提交", "请先选择角色和证据，并生成发言。");
    return;
  }

  const textArea = document.getElementById("studentSpeech");
  const speech = textArea ? textArea.value.trim() : state.generatedSpeech;

  if (!speech) {
    showModal("暂无发言", "请先生成或手动填写发言内容。");
    return;
  }

  const groupName = getInputValue("groupName") || "未命名小组";
  const actionKey = getInputValue("speechAction") || "statement";
  const action = actions[actionKey];
  const evidence = getSelectedEvidence();

  state.generatedSpeech = speech;
  state.submissions.unshift({
    id: String(Date.now()),
    groupName: groupName,
    roleKey: state.selectedRole,
    evidenceId: state.selectedEvidenceId,
    actionLabel: action.label,
    speech: speech,
    theory: action.theory
  });

  applyEffects(action.effects);
  applyEffects(evidence.effects);

  showModal("提交成功", "发言已进入教师端发言池，老师可以点名投屏。");
  render();
}

function studentVote(voteType) {
  if (!state.selectedRole) {
    showModal("请先选择角色", "投票前需要先选择你的角色身份。");
    return;
  }

  state.votes[voteType]++;
  showModal("投票成功", "你的投票已进入教师端投票墙。");
  render();
}

function applyEffects(effects) {
  Object.keys(effects).forEach(function (key) {
    state.scores[key] = clamp(state.scores[key] + effects[key], 0, 100);
  });
}

function setEvent(eventId) {
  state.activeEventId = eventId;
  const event = getActiveEvent();
  if (event) {
    applyEffects(event.effects);
    showModal("教师推送突发事件", `${event.title}：${event.prompt}`);
  }
  render();
}

function randomSpotlight() {
  if (!state.submissions.length) {
    showModal("暂无发言", "请先让学生端提交至少一条发言。");
    return;
  }

  const randomIndex = Math.floor(Math.random() * state.submissions.length);
  state.spotlightId = state.submissions[randomIndex].id;
  render();
}

function startTimer() {
  if (timerId) return;

  timerId = setInterval(function () {
    state.timerLeft = Math.max(0, state.timerLeft - 1);
    renderTeacher();

    if (state.timerLeft === 0) {
      pauseTimer();
      showModal("讨论时间到", "请学生用一句话说明本轮最核心的公共经济学冲突。");
    }
  }, 1000);
}

function pauseTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function resetTimer() {
  pauseTimer();
  state.timerLeft = state.timerInitial;
  render();
}

function resetClass() {
  pauseTimer();
  state.phaseIndex = 0;
  state.activeEventId = "";
  state.selectedRole = "";
  state.selectedEvidenceId = "";
  state.generatedSpeech = "";
  state.spotlightId = "";
  state.timerLeft = 180;
  state.timerInitial = 180;
  state.scores = Object.assign({}, defaultScores);
  state.submissions = [];
  state.votes = { approve: 0, reject: 0, conditional: 0 };
  render();
}

function getActiveEvent() {
  return crisisEvents.find(function (item) {
    return item.id === state.activeEventId;
  });
}

function getSelectedEvidence() {
  return evidenceCards.find(function (item) {
    return item.id === state.selectedEvidenceId;
  });
}

function getInputValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function getTopVote() {
  const voteMap = {
    approve: "批准兜底",
    reject: "拒绝兜底",
    conditional: "附条件救助"
  };

  const keys = Object.keys(state.votes);
  let topKey = keys[0];

  keys.forEach(function (key) {
    if (state.votes[key] > state.votes[topKey]) {
      topKey = key;
    }
  });

  if (state.votes[topKey] === 0) {
    return "尚未形成多数意见";
  }

  return voteMap[topKey];
}

function getScoreColor(key, value) {
  if (key === "moralHazard") {
    return value > 70 ? "#b91c1c" : value > 45 ? "#f97316" : "#16a34a";
  }
  if (value >= 70) return "#16a34a";
  if (value >= 45) return "#1d4ed8";
  return "#b91c1c";
}

function formatSeconds(seconds) {
  const minute = String(Math.floor(seconds / 60)).padStart(2, "0");
  const second = String(seconds % 60).padStart(2, "0");
  return `${minute}:${second}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function showModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

teacherModeBtn.addEventListener("click", function () {
  state.mode = "teacher";
  render();
});

studentModeBtn.addEventListener("click", function () {
  state.mode = "student";
  render();
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("click", function (event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "set-phase") {
    state.phaseIndex = Number(target.dataset.index);
    render();
  }

  if (action === "prev-phase") {
    state.phaseIndex = Math.max(0, state.phaseIndex - 1);
    render();
  }

  if (action === "next-phase") {
    state.phaseIndex = Math.min(phases.length - 1, state.phaseIndex + 1);
    render();
  }

  if (action === "set-event") {
    setEvent(target.dataset.id);
  }

  if (action === "clear-event") {
    state.activeEventId = "";
    render();
  }

  if (action === "timer-set") {
    state.timerInitial = Number(target.dataset.seconds);
    state.timerLeft = state.timerInitial;
    resetTimer();
  }

  if (action === "timer-start") {
    startTimer();
  }

  if (action === "timer-pause") {
    pauseTimer();
  }

  if (action === "timer-reset") {
    resetTimer();
  }

  if (action === "random-spotlight") {
    randomSpotlight();
  }

  if (action === "clear-spotlight") {
    state.spotlightId = "";
    render();
  }

  if (action === "spotlight") {
    state.spotlightId = target.dataset.id;
    render();
  }

  if (action === "reset-class") {
    resetClass();
  }

  if (action === "select-role") {
    state.selectedRole = target.dataset.role;
    state.selectedEvidenceId = "";
    state.generatedSpeech = "";
    render();
  }

  if (action === "select-evidence") {
    state.selectedEvidenceId = target.dataset.id;
    render();
  }

  if (action === "generate-speech") {
    generateSpeech();
  }

  if (action === "submit-speech") {
    submitSpeech();
  }

  if (action === "student-vote") {
    studentVote(target.dataset.vote);
  }
});

render();
