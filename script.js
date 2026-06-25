/* =========================
   一、角色数据模块
   每个角色绑定颜色、立场、目标和默认投票倾向
   ========================= */
const roles = {
  province: {
    name: "省政府",
    faction: "求救派",
    color: "#1d4ed8",
    tendency: "approve",
    short: "强调金融稳定、公共服务连续性和中央财政兜底必要性。",
    objective: "争取中央批准300亿特别再融资债，避免全省城投融资成本上升。",
    opening: [
      "不救助会抬升全省城投融资成本。",
      "金融稳定具有全国性外部性，中央财政不能完全置身事外。",
      "300亿元对中央财政体量压力较小，却能避免系统性金融风险。",
      "已有遵义道桥156亿化债先例，本案应获批再融资债。"
    ]
  },
  ministry: {
    name: "财政部",
    faction: "硬汉派",
    color: "#374151",
    tendency: "reject",
    short: "坚持预算纪律，反对形成中央兜底预期。",
    objective: "维护《预算法》纪律，防止地方政府形成向中央倒逼救助的预期。",
    opening: [
      "中央兜底会强化地方和城投平台的预算软约束。",
      "依据47号文和《预算法》，地方债务应坚持谁借谁还。",
      "不能用全国纳税人为地方无序举债买单。",
      "一旦开口，各地城投可能跟风倒逼中央救助。"
    ]
  },
  platform: {
    name: "城投集团负责人",
    faction: "委屈派",
    color: "#f97316",
    tendency: "approve",
    short: "强调城投承担公共任务，自身并非完全自主举债。",
    objective: "说明城投债务形成的政府任务属性，争取债务展期和再融资支持。",
    opening: [
      "城投承担水务、供暖、地铁、棚改等民生业务。",
      "隐性担保和融资任务由地方政府长期催生。",
      "集团并无完全自主的举债决策权。",
      "若违约，将造成员工失业、承包商回款断裂和公共服务冲击。"
    ]
  },
  creditor: {
    name: "债券债权人",
    faction: "刚兑派",
    color: "#7c3aed",
    tendency: "approve",
    short: "主张维护刚性兑付，避免债市恐慌。",
    objective: "要求保护债券投资者权益，避免信用债市场信心崩塌。",
    opening: [
      "发行时评级和承销机构均暗示存在政府支持。",
      "突然打破刚性兑付，可能引发全国债市信心崩塌。",
      "底层资金包含普通居民理财和养老退休资金。",
      "参考永煤违约冲击，本次必须高度重视全额兑付。"
    ]
  },
  taxpayer: {
    name: "普通纳税人",
    faction: "问责派",
    color: "#16a34a",
    tendency: "reject",
    short: "质疑权责不对等，反对全体纳税人为地方债务买单。",
    objective: "要求公开审计、追责违规举债，并防止全国纳税人被动买单。",
    opening: [
      "普通纳税人并未参与地方举债决策。",
      "地方人大未充分审议巨额城投债务。",
      "部分资金流向低效形象工程，并非真正惠民。",
      "举债者不用偿债，全体纳税人被动买单，权责明显不对等。"
    ]
  }
};

/* =========================
   二、证据卡数据模块
   effects 会影响课堂观察指标
   ========================= */
const evidenceCards = [
  {
    id: "spread",
    title: "城投债利差扩大",
    concept: "金融稳定",
    text: "全省城投债平均利差一个月内扩大120BP，新增融资成本快速上升。",
    fit: ["province", "creditor"],
    effects: { financialStability: 8, marketConfidence: 7, moralHazard: 3 }
  },
  {
    id: "law",
    title: "《预算法》约束",
    concept: "预算纪律",
    text: "地方政府不得违法违规举债，不得通过融资平台变相增加隐性债务。",
    fit: ["ministry", "taxpayer"],
    effects: { fiscalDiscipline: 10, taxpayerFairness: 6, moralHazard: -5 }
  },
  {
    id: "service",
    title: "民生服务清单",
    concept: "公共服务",
    text: "建投集团承担全市水务、供暖、轨道交通和棚改项目，覆盖300万市民。",
    fit: ["province", "platform"],
    effects: { serviceProtection: 10, publicSupport: 6, financialStability: 3 }
  },
  {
    id: "audit",
    title: "审计疑点",
    concept: "公共问责",
    text: "部分项目投资回报率低于贷款利率，存在低效投资和预算审议不足问题。",
    fit: ["ministry", "taxpayer"],
    effects: { fiscalDiscipline: 7, taxpayerFairness: 9, publicSupport: 3 }
  },
  {
    id: "workers",
    title: "就业与承包商链条",
    concept: "就业稳定",
    text: "集团及上下游承包商涉及约4.6万名员工，违约可能造成工资和工程款断裂。",
    fit: ["platform", "province"],
    effects: { serviceProtection: 6, publicSupport: 7, financialStability: 3 }
  },
  {
    id: "rating",
    title: "评级与承销材料",
    concept: "隐性担保",
    text: "债券发行材料多次提及地方政府支持，投资者据此形成政府兜底预期。",
    fit: ["creditor"],
    effects: { marketConfidence: 9, moralHazard: 6, financialStability: 4 }
  },
  {
    id: "tax",
    title: "跨地区纳税人负担",
    concept: "财政公平",
    text: "中央兜底意味着全国纳税人共同承担地方债务成本，涉及地区间财政公平。",
    fit: ["taxpayer", "ministry"],
    effects: { taxpayerFairness: 9, fiscalDiscipline: 5, moralHazard: -3 }
  },
  {
    id: "case",
    title: "遵义道桥化债案例",
    concept: "政策先例",
    text: "遵义道桥曾通过银行贷款重组和展期缓释债务压力，形成地方化债参考。",
    fit: ["province", "platform"],
    effects: { financialStability: 6, serviceProtection: 3, moralHazard: 3 }
  },
  {
    id: "yongmei",
    title: "永煤违约冲击",
    concept: "债市波动",
    text: "永煤违约曾明显冲击信用债市场，说明国企和地方信用事件具有传染效应。",
    fit: ["creditor", "province"],
    effects: { marketConfidence: 8, financialStability: 6, moralHazard: 2 }
  }
];

/* =========================
   三、听证动作模块
   effects 会改变动态评分
   ========================= */
const hearingActions = {
  question: {
    label: "提出质询",
    theory: "质询机制体现公共决策中的信息披露与权力制衡，可以降低财政不透明带来的代理问题。",
    effects: { fiscalDiscipline: 5, taxpayerFairness: 4, publicSupport: 2 }
  },
  audit: {
    label: "要求审计",
    theory: "专项审计能识别隐性债务和低效投资，有利于强化预算约束和政府问责。",
    effects: { fiscalDiscipline: 8, taxpayerFairness: 7, moralHazard: -5 }
  },
  service: {
    label: "保护民生",
    theory: "基础公共服务具有准公共品属性，政府需要权衡财政纪律与公共服务连续性。",
    effects: { serviceProtection: 9, publicSupport: 7, financialStability: 4 }
  },
  extension: {
    label: "提出展期",
    theory: "展期可以缓解短期流动性风险，但如果没有配套改革，可能只是把风险推迟。",
    effects: { financialStability: 6, marketConfidence: 4, fiscalDiscipline: -2 }
  },
  accountability: {
    label: "要求问责",
    theory: "问责机制可以降低未来无序举债激励，回应纳税人对权责对等的要求。",
    effects: { taxpayerFairness: 8, fiscalDiscipline: 6, moralHazard: -6 }
  },
  payment: {
    label: "主张兑付",
    theory: "刚性兑付有助于短期稳定市场信心，但长期可能削弱投资者风险识别能力。",
    effects: { marketConfidence: 8, financialStability: 5, moralHazard: 7 }
  }
};

/* =========================
   四、配套条件模块
   学生投票前可以勾选，让最终政策更接近现实谈判
   ========================= */
const conditions = [
  {
    id: "publicAudit",
    label: "公布专项审计报告",
    effects: { fiscalDiscipline: 8, taxpayerFairness: 8, moralHazard: -4 }
  },
  {
    id: "assetSale",
    label: "城投出售低效资产",
    effects: { fiscalDiscipline: 6, financialStability: 3, taxpayerFairness: 4 }
  },
  {
    id: "spendingCut",
    label: "地方压缩非必要支出",
    effects: { fiscalDiscipline: 7, taxpayerFairness: 5 }
  },
  {
    id: "creditorExtension",
    label: "债权人接受部分展期",
    effects: { financialStability: 5, marketConfidence: -2, taxpayerFairness: 4 }
  },
  {
    id: "projectStop",
    label: "暂停新增低效基建项目",
    effects: { fiscalDiscipline: 6, moralHazard: -5, taxpayerFairness: 5 }
  },
  {
    id: "officialAccountability",
    label: "追责违规举债责任人",
    effects: { taxpayerFairness: 7, fiscalDiscipline: 5, moralHazard: -6 }
  }
];

/* =========================
   五、课堂观察指标初始值
   ========================= */
let scores = {
  financialStability: 55,
  fiscalDiscipline: 50,
  serviceProtection: 55,
  taxpayerFairness: 45,
  moralHazard: 55,
  marketConfidence: 50,
  publicSupport: 50
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

/* =========================
   六、页面元素获取
   ========================= */
const roleCards = document.getElementById("roleCards");
const hearingPanel = document.getElementById("hearingPanel");
const votePanel = document.getElementById("votePanel");
const resultPanel = document.getElementById("resultPanel");

const currentRoleLabel = document.getElementById("currentRoleLabel");
const roleStatement = document.getElementById("roleStatement");
const evidenceDeck = document.getElementById("evidenceDeck");
const scoreGrid = document.getElementById("scoreGrid");

const toneSelect = document.getElementById("toneSelect");
const goalSelect = document.getElementById("goalSelect");
const generatedSpeech = document.getElementById("generatedSpeech");
const hearingRecord = document.getElementById("hearingRecord");
const opponentReply = document.getElementById("opponentReply");
const finishDebateBtn = document.getElementById("finishDebateBtn");

const conditionList = document.getElementById("conditionList");
const approveBtn = document.getElementById("approveBtn");
const rejectBtn = document.getElementById("rejectBtn");
const voteResultText = document.getElementById("voteResultText");

const impactSummary = document.getElementById("impactSummary");
const approveMetrics = document.getElementById("approveMetrics");
const rejectMetrics = document.getElementById("rejectMetrics");
const teacherNote = document.getElementById("teacherNote");

const theoryModal = document.getElementById("theoryModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.getElementById("closeModalBtn");

/* =========================
   七、全局状态
   ========================= */
let currentRoleKey = "";
let selectedEvidenceId = "";
let recordList = [];
let roundCount = 0;

/* =========================
   八、初始化角色卡片
   ========================= */
function renderRoleCards() {
  roleCards.innerHTML = "";

  Object.keys(roles).forEach(function (key) {
    const role = roles[key];

    const card = document.createElement("button");
    card.className = "role-card";
    card.style.backgroundColor = role.color;
    card.innerHTML = `
      <h3>${role.name}</h3>
      <span class="tag">${role.faction}</span>
      <span class="tendency">${role.tendency === "approve" ? "倾向：支持兜底" : "倾向：拒绝兜底"}</span>
      <p>${role.short}</p>
    `;

    card.addEventListener("click", function () {
      selectRole(key);
    });

    roleCards.appendChild(card);
  });
}

/* =========================
   九、选择角色
   ========================= */
function selectRole(roleKey) {
  currentRoleKey = roleKey;
  selectedEvidenceId = "";
  recordList = [];
  roundCount = 0;

  scores = {
    financialStability: 55,
    fiscalDiscipline: 50,
    serviceProtection: 55,
    taxpayerFairness: 45,
    moralHazard: 55,
    marketConfidence: 50,
    publicSupport: 50
  };

  const role = roles[roleKey];

  currentRoleLabel.textContent = `当前身份：${role.name}（${role.faction}）`;

  roleStatement.innerHTML = `
    <h3 style="color:${role.color};">${role.name}立场陈述</h3>
    <p><strong>角色目标：</strong>${role.objective}</p>
    <ul class="stance-list">
      ${role.opening.map(function (item) {
        return `<li>${item}</li>`;
      }).join("")}
    </ul>
    <div class="role-objective">
      <strong>课堂任务：</strong>请使用证据、质询和妥协条件，让你的角色主张更有说服力。
    </div>
  `;

  generatedSpeech.textContent = "请选择一张证据卡，再点击一个听证动作。";
  hearingRecord.innerHTML = `<p class="empty-tip">尚未产生听证记录。</p>`;
  opponentReply.innerHTML = `<h4>对手回应</h4><p>等待第一轮发言。</p>`;
  voteResultText.textContent = "";

  hearingPanel.classList.remove("hidden");
  votePanel.classList.add("hidden");
  resultPanel.classList.add("hidden");

  markActiveRoleCard(roleKey);
  renderEvidenceCards();
  renderScores();
  renderConditions();

  hearingPanel.scrollIntoView({ behavior: "smooth" });
}

/* =========================
   十、高亮角色卡片
   ========================= */
function markActiveRoleCard(roleKey) {
  const cards = document.querySelectorAll(".role-card");
  const keys = Object.keys(roles);

  cards.forEach(function (card, index) {
    if (keys[index] === roleKey) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

/* =========================
   十一、渲染证据卡
   ========================= */
function renderEvidenceCards() {
  evidenceDeck.innerHTML = "";

  const sortedCards = evidenceCards.slice().sort(function (a, b) {
    const aFit = a.fit.includes(currentRoleKey) ? 1 : 0;
    const bFit = b.fit.includes(currentRoleKey) ? 1 : 0;
    return bFit - aFit;
  });

  sortedCards.forEach(function (card) {
    const btn = document.createElement("button");
    btn.className = "evidence-card";
    if (card.id === selectedEvidenceId) {
      btn.classList.add("active");
    }

    const recommendText = card.fit.includes(currentRoleKey) ? "推荐证据" : "可用证据";

    btn.innerHTML = `
      <span class="concept-tag">${recommendText}：${card.concept}</span>
      <h4>${card.title}</h4>
      <p>${card.text}</p>
    `;

    btn.addEventListener("click", function () {
      selectedEvidenceId = card.id;
      renderEvidenceCards();
      showTheoryModal("证据卡已选择", `你选择了“${card.title}”。它对应的课程知识点是：${card.concept}。`);
    });

    evidenceDeck.appendChild(btn);
  });
}

/* =========================
   十二、渲染课堂观察指标
   ========================= */
function renderScores() {
  scoreGrid.innerHTML = "";

  Object.keys(scores).forEach(function (key) {
    const value = clamp(scores[key], 0, 100);
    const item = document.createElement("div");
    item.className = "score-item";
    item.innerHTML = `
      <div class="score-label">
        <span>${scoreNames[key]}</span>
        <strong>${value}</strong>
      </div>
      <div class="score-bar">
        <div class="score-fill" style="width:${value}%; background:${getScoreColor(key, value)};"></div>
      </div>
    `;

    scoreGrid.appendChild(item);
  });
}

/* =========================
   十三、评分颜色
   ========================= */
function getScoreColor(key, value) {
  if (key === "moralHazard") {
    return value > 70 ? "#b91c1c" : value > 45 ? "#f97316" : "#16a34a";
  }

  if (value >= 70) {
    return "#16a34a";
  }

  if (value >= 45) {
    return "#1d4ed8";
  }

  return "#b91c1c";
}

/* =========================
   十四、听证动作按钮事件
   ========================= */
document.querySelectorAll(".action-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const actionKey = button.dataset.action;
    performHearingAction(actionKey);
  });
});

/* =========================
   十五、执行一轮听证发言
   ========================= */
function performHearingAction(actionKey) {
  if (!currentRoleKey) {
    alert("请先选择一个角色。");
    return;
  }

  if (!selectedEvidenceId) {
    alert("请先选择一张证据卡。");
    return;
  }

  const role = roles[currentRoleKey];
  const action = hearingActions[actionKey];
  const evidence = evidenceCards.find(function (item) {
    return item.id === selectedEvidenceId;
  });

  roundCount++;

  applyEffects(action.effects);
  applyEffects(evidence.effects);

  const speech = generateSpeech(role, action, evidence);
  const reply = generateOpponentReply(actionKey, evidence);

  generatedSpeech.textContent = speech;
  opponentReply.innerHTML = `
    <h4>对手回应</h4>
    <p>${reply}</p>
  `;

  recordList.push({
    round: roundCount,
    role: role.name,
    action: action.label,
    evidence: evidence.title,
    speech: speech,
    theory: action.theory
  });

  renderRecord();
  renderScores();

  showTheoryModal(`理论解读：${evidence.concept}`, action.theory);
}

/* =========================
   十六、生成学生角色发言
   ========================= */
function generateSpeech(role, action, evidence) {
  const studentName = document.getElementById("studentName").value.trim() || "本组代表";
  const tone = toneSelect.value;
  const goal = goalSelect.value;

  return `${studentName}以“${role.name}”身份进行${tone}：本方选择“${action.label}”，目标是“${goal}”。` +
    `我们引用的关键证据是“${evidence.title}”：${evidence.text}` +
    `基于${evidence.concept}视角，本方认为，听证会不能只讨论300亿元是否偿还，` +
    `更要讨论地方政府债务、隐性担保、财政纪律、金融稳定与纳税人公平之间的权衡。`;
}

/* =========================
   十七、生成对手回应
   ========================= */
function generateOpponentReply(actionKey, evidence) {
  const opponentKeys = Object.keys(roles).filter(function (key) {
    return key !== currentRoleKey;
  });

  const opponentKey = opponentKeys[roundCount % opponentKeys.length];
  const opponent = roles[opponentKey];

  const responseMap = {
    question: "你的质询提出了信息披露问题，但仍需说明短期违约风险由谁承担。",
    audit: "审计是必要的，但审计不能替代眼前的流动性安排。",
    service: "公共服务必须保护，但不能因此默认所有债务都由中央买单。",
    extension: "展期能缓解压力，但如果没有约束条件，可能只是推迟风险暴露。",
    accountability: "问责能够回应公众关切，但也要避免在危机中造成决策停摆。",
    payment: "全额兑付有利于市场信心，但也可能继续强化刚性兑付预期。"
  };

  return `${opponent.name}回应：${responseMap[actionKey]}围绕“${evidence.title}”这张证据，` +
    `本方认为还需要进一步区分公共服务责任、融资平台责任和投资者风险责任。`;
}

/* =========================
   十八、渲染听证记录
   ========================= */
function renderRecord() {
  hearingRecord.innerHTML = "";

  recordList.forEach(function (item) {
    const div = document.createElement("div");
    div.className = "record-item";
    div.innerHTML = `
      <strong>第${item.round}轮：${item.role} - ${item.action}</strong>
      <p><em>使用证据：</em>${item.evidence}</p>
      <p>${item.speech}</p>
      <p><em>理论锚点：</em>${item.theory}</p>
    `;
    hearingRecord.appendChild(div);
  });

  hearingRecord.scrollTop = hearingRecord.scrollHeight;
}

/* =========================
   十九、应用指标变化
   ========================= */
function applyEffects(effects) {
  Object.keys(effects).forEach(function (key) {
    scores[key] = clamp(scores[key] + effects[key], 0, 100);
  });
}

/* =========================
   二十、渲染配套条件
   ========================= */
function renderConditions() {
  conditionList.innerHTML = "";

  conditions.forEach(function (condition) {
    const label = document.createElement("label");
    label.className = "condition-item";
    label.innerHTML = `
      <input type="checkbox" value="${condition.id}" />
      <span>${condition.label}</span>
    `;

    conditionList.appendChild(label);
  });
}

/* =========================
   二十一、进入投票
   ========================= */
finishDebateBtn.addEventListener("click", function () {
  if (!currentRoleKey) {
    alert("请先选择角色。");
    return;
  }

  votePanel.classList.remove("hidden");
  votePanel.scrollIntoView({ behavior: "smooth" });
});

/* =========================
   二十二、投票事件
   ========================= */
approveBtn.addEventListener("click", function () {
  vote("approve");
});

rejectBtn.addEventListener("click", function () {
  vote("reject");
});

/* =========================
   二十三、投票并计算结果
   ========================= */
function vote(policy) {
  if (!currentRoleKey) {
    alert("请先选择角色。");
    return;
  }

  const finalScores = getScoresWithConditions();
  const role = roles[currentRoleKey];

  const policyName = policy === "approve"
    ? "批准300亿特别再融资债兜底"
    : "拒绝兜底，要求地方自行化债";

  const tendencyText = role.tendency === policy
    ? "该选择符合你的角色默认立场。"
    : "该选择偏离你的角色默认立场，适合用于课堂反思。";

  voteResultText.textContent = `你以“${role.name}”身份投票：${policyName}。${tendencyText}`;

  renderResults(policy, finalScores);
  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth" });
}

/* =========================
   二十四、叠加配套条件后的指标
   ========================= */
function getScoresWithConditions() {
  const finalScores = Object.assign({}, scores);
  const checked = document.querySelectorAll("#conditionList input:checked");

  checked.forEach(function (checkbox) {
    const condition = conditions.find(function (item) {
      return item.id === checkbox.value;
    });

    Object.keys(condition.effects).forEach(function (key) {
      finalScores[key] = clamp(finalScores[key] + condition.effects[key], 0, 100);
    });
  });

  return finalScores;
}

/* =========================
   二十五、结果测算
   ========================= */
function renderResults(policy, finalScores) {
  const approveCost = clamp(160 - finalScores.financialStability, 40, 180);
  const rejectCost = clamp(110 + finalScores.marketConfidence / 2, 120, 210);

  const approveTaxBurden = clamp(300 - finalScores.fiscalDiscipline / 4, 260, 300);
  const rejectTaxBurden = clamp(30 - finalScores.taxpayerFairness / 5, 0, 30);

  const approveServiceRisk = clamp(35 - finalScores.serviceProtection / 3, 3, 30);
  const rejectServiceRisk = clamp(65 - finalScores.serviceProtection / 4, 25, 70);

  const approveBondRisk = clamp(45 - finalScores.marketConfidence / 3, 5, 40);
  const rejectBondRisk = clamp(85 - finalScores.marketConfidence / 4, 35, 80);

  const approveMoralRisk = clamp(finalScores.moralHazard + 15, 30, 95);
  const rejectMoralRisk = clamp(finalScores.moralHazard - 20, 5, 75);

  const approveJobs = clamp(8000 - finalScores.serviceProtection * 60, 1500, 8000);
  const rejectJobs = clamp(65000 - finalScores.financialStability * 350, 25000, 65000);

  approveMetrics.innerHTML = `
    <li>全省融资成本变化：预计下降约${approveCost}个基点</li>
    <li>全国纳税人新增财政负担：约${Math.round(approveTaxBurden)}亿元</li>
    <li>民生服务中断风险：约${Math.round(approveServiceRisk)}%</li>
    <li>债市波动风险：约${Math.round(approveBondRisk)}%</li>
    <li>潜在失业与欠薪冲击：约${Math.round(approveJobs)}人</li>
    <li>道德风险指数：${Math.round(approveMoralRisk)} / 100</li>
  `;

  rejectMetrics.innerHTML = `
    <li>全省融资成本变化：预计上升约${Math.round(rejectCost)}个基点</li>
    <li>全国纳税人新增财政负担：约${Math.round(rejectTaxBurden)}亿元</li>
    <li>民生服务中断风险：约${Math.round(rejectServiceRisk)}%</li>
    <li>债市波动风险：约${Math.round(rejectBondRisk)}%</li>
    <li>潜在失业与欠薪冲击：约${Math.round(rejectJobs)}人</li>
    <li>道德风险指数：${Math.round(rejectMoralRisk)} / 100</li>
  `;

  const checkedCount = document.querySelectorAll("#conditionList input:checked").length;

  impactSummary.innerHTML = `
    <strong>本次听证会动态摘要：</strong>
    你共进行了 ${recordList.length} 轮实质发言，选择了 ${checkedCount} 项配套条件。
    当前模拟结果显示，${policy === "approve" ? "批准兜底更有利于短期稳定和公共服务连续性" : "拒绝兜底更有利于强化预算纪律和纳税公平"}。
    但无论选择哪一项，都需要处理金融稳定、财政纪律、民生保障和纳税公平之间的冲突。
  `;

  teacherNote.innerHTML = `
    <strong>课堂讨论提示：</strong>
    本案例没有唯一标准答案。公共经济学的关键不是简单判断“救”或“不救”，
    而是说明谁承担成本、谁获得收益、谁拥有决策权、风险是否外溢，以及制度如何防止下一轮隐性债务扩张。
  `;
}

/* =========================
   二十六、理论弹窗
   ========================= */
function showTheoryModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  theoryModal.classList.remove("hidden");
}

function closeTheoryModal() {
  theoryModal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeTheoryModal);

theoryModal.addEventListener("click", function (event) {
  if (event.target === theoryModal) {
    closeTheoryModal();
  }
});

/* =========================
   二十七、工具函数
   ========================= */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* =========================
   二十八、页面启动
   ========================= */
renderRoleCards();
renderScores();
renderConditions();
