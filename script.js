/* =========================
   一、角色数据模块
   每个角色绑定颜色、派系、立场、发言、投票倾向
   ========================= */
const roles = {
  province: {
    name: "省政府",
    faction: "求救派",
    color: "#1d4ed8",
    tendency: "approve",
    short: "强调金融稳定、公共服务连续性和中央财政兜底必要性。",
    statement: [
      "若本次不救助，全省城投融资成本将迅速抬升。",
      "金融稳定具有全国性外部性，不能完全由地方独自承担。",
      "300亿元相对于中央财政体量压力较小，却能避免系统性风险。",
      "已有遵义道桥156亿化债先例，本案也应获批特别再融资债。"
    ]
  },
  ministry: {
    name: "财政部",
    faction: "硬汉派",
    color: "#374151",
    tendency: "reject",
    short: "坚持预算纪律，反对形成中央兜底预期。",
    statement: [
      "中央兜底会强化地方政府和城投平台的预算软约束。",
      "依据47号文和《预算法》，地方债务应坚持谁借谁还。",
      "不能用全国纳税人税收为地方无序举债买单。",
      "一旦开口，各地城投可能跟风倒逼中央救助。"
    ]
  },
  platform: {
    name: "城投集团负责人",
    faction: "委屈派",
    color: "#f97316",
    tendency: "approve",
    short: "强调城投承担公共任务，自身并非完全自主举债。",
    statement: [
      "城投是地方政府融资载体，承担水务、供暖、地铁、棚改等民生业务。",
      "隐性担保和融资任务由地方政府长期催生。",
      "集团并无完全自主的举债决策权。",
      "若违约，将造成数万员工失业、工程承包商回款断裂。"
    ]
  },
  creditor: {
    name: "债券债权人",
    faction: "刚兑派",
    color: "#7c3aed",
    tendency: "approve",
    short: "主张维护刚性兑付，避免债市恐慌。",
    statement: [
      "发行时评级和承销机构均暗示存在政府隐性担保。",
      "若突然打破刚性兑付，可能引发全国债市信心崩塌。",
      "底层资金包含普通居民理财和养老退休资金。",
      "2020年永煤违约曾引发负面冲击，本次必须全额兑付。"
    ]
  },
  taxpayer: {
    name: "普通纳税人",
    faction: "问责派",
    color: "#16a34a",
    tendency: "reject",
    short: "质疑权责不对等，反对全体纳税人为地方债务买单。",
    statement: [
      "普通纳税人并未参与地方举债决策。",
      "地方人大未充分审议巨额城投债务。",
      "部分资金流向水司楼、空城等低效项目，并非真正惠民。",
      "举债者不用偿债，全体纳税人被动买单，权责明显不对等。"
    ]
  }
};

/* =========================
   二、辩论理论数据模块
   每轮对辩绑定公共经济学知识点解释
   ========================= */
const theoryRounds = [
  {
    title: "理论解读：财政风险外溢",
    text: "地方城投债务违约不仅影响本地，还可能通过债券市场、银行资产质量和投资者预期向其他地区扩散，这就是财政风险外溢。"
  },
  {
    title: "理论解读：预算软约束",
    text: "如果地方主体相信最终会由上级政府救助，就可能降低风险约束，继续扩大举债，这被称为预算软约束。"
  },
  {
    title: "理论解读：隐性担保与刚性兑付",
    text: "隐性担保会让投资者相信政府不会允许违约，刚性兑付则使债券风险被低估，长期可能扭曲金融资源配置。"
  },
  {
    title: "理论解读：纳税人负担与财政公平",
    text: "中央兜底意味着全国纳税人共同承担地方债务成本，涉及财政公平、地区间转移支付和公共责任边界问题。"
  }
];

/* =========================
   三、量化测算数据模块
   用本地JS静态数据模拟两种政策影响
   ========================= */
const policyResults = {
  approve: [
    "全省城投融资成本：预计下降80个基点",
    "全国纳税人新增财政负担：约300亿元本金压力",
    "民生服务中断风险：降至5%",
    "债市波动风险：短期降至10%",
    "失业冲击：预计控制在3000人以内"
  ],
  reject: [
    "全省城投融资成本：预计上升150个基点",
    "全国纳税人新增财政负担：短期接近0",
    "民生服务中断风险：升至45%",
    "债市波动风险：升至60%",
    "失业冲击：可能扩大至3万至5万人"
  ]
};

/* =========================
   四、获取页面元素
   ========================= */
const roleCards = document.getElementById("roleCards");
const hearingPanel = document.getElementById("hearingPanel");
const votePanel = document.getElementById("votePanel");
const resultPanel = document.getElementById("resultPanel");

const currentRoleLabel = document.getElementById("currentRoleLabel");
const roleStatement = document.getElementById("roleStatement");
const debateLog = document.getElementById("debateLog");
const nextDebateBtn = document.getElementById("nextDebateBtn");

const approveBtn = document.getElementById("approveBtn");
const rejectBtn = document.getElementById("rejectBtn");
const voteResultText = document.getElementById("voteResultText");

const approveMetrics = document.getElementById("approveMetrics");
const rejectMetrics = document.getElementById("rejectMetrics");

const theoryModal = document.getElementById("theoryModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.getElementById("closeModalBtn");

/* =========================
   五、全局状态变量
   ========================= */
let currentRoleKey = "";
let debateRound = 0;
let opponentKeys = [];

/* =========================
   六、初始化角色卡片
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
      <p>${role.short}</p>
    `;

    card.addEventListener("click", function () {
      selectRole(key);
    });

    roleCards.appendChild(card);
  });
}

/* =========================
   七、选择角色并进入听证会
   ========================= */
function selectRole(roleKey) {
  currentRoleKey = roleKey;
  debateRound = 0;
  opponentKeys = Object.keys(roles).filter(function (key) {
    return key !== currentRoleKey;
  });

  const selectedRole = roles[currentRoleKey];

  currentRoleLabel.textContent = `当前身份：${selectedRole.name}（${selectedRole.faction}）`;

  roleStatement.innerHTML = `
    <h3 style="color:${selectedRole.color};">${selectedRole.name}立场陈述</h3>
    <p><strong>决策倾向：</strong>${selectedRole.tendency === "approve" ? "支持中央兜底" : "反对中央兜底"}</p>
    <ul class="stance-list">
      ${selectedRole.statement.map(function (item) {
        return `<li>${item}</li>`;
      }).join("")}
    </ul>
  `;

  debateLog.innerHTML = `<p class="empty-tip">你已选择${selectedRole.name}。点击按钮开始对辩。</p>`;
  nextDebateBtn.disabled = false;
  nextDebateBtn.textContent = "开启下一轮对辩";

  hearingPanel.classList.remove("hidden");
  votePanel.classList.add("hidden");
  resultPanel.classList.add("hidden");
  voteResultText.textContent = "";

  markActiveRoleCard(roleKey);
  hearingPanel.scrollIntoView({ behavior: "smooth" });
}

/* =========================
   八、高亮当前角色卡片
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
   九、生成多轮对辩内容
   ========================= */
function runNextDebate() {
  if (!currentRoleKey) {
    alert("请先选择一个角色。");
    return;
  }

  if (debateRound >= opponentKeys.length) {
    nextDebateBtn.disabled = true;
    nextDebateBtn.textContent = "对辩已结束，请进入投票";
    votePanel.classList.remove("hidden");
    votePanel.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const currentRole = roles[currentRoleKey];
  const opponent = roles[opponentKeys[debateRound]];

  if (debateRound === 0) {
    debateLog.innerHTML = "";
  }

  const currentSpeech = currentRole.statement[debateRound % currentRole.statement.length];
  const opponentSpeech = opponent.statement[debateRound % opponent.statement.length];

  const speechBlock = document.createElement("div");
  speechBlock.className = "speech";
  speechBlock.innerHTML = `
    <strong style="color:${currentRole.color};">${currentRole.name}：</strong>
    <p>${currentSpeech}</p>
    <strong style="color:${opponent.color};">${opponent.name}回应：</strong>
    <p>${opponentSpeech}</p>
  `;

  debateLog.appendChild(speechBlock);
  debateLog.scrollTop = debateLog.scrollHeight;

  showTheoryModal(theoryRounds[debateRound]);

  debateRound++;

  if (debateRound >= opponentKeys.length) {
    nextDebateBtn.textContent = "完成对辩，进入政策投票";
  }
}

/* =========================
   十、理论解读弹窗
   ========================= */
function showTheoryModal(theory) {
  modalTitle.textContent = theory.title;
  modalText.textContent = theory.text;
  theoryModal.classList.remove("hidden");
}

function closeTheoryModal() {
  theoryModal.classList.add("hidden");
}

/* =========================
   十一、投票并展示结果测算
   ========================= */
function vote(policy) {
  if (!currentRoleKey) {
    alert("请先选择角色。");
    return;
  }

  const role = roles[currentRoleKey];
  const policyName = policy === "approve"
    ? "批准300亿特别再融资债兜底"
    : "拒绝兜底，要求地方自行化债";

  const tendencyText = role.tendency === policy
    ? "该投票符合你的角色立场倾向。"
    : "该投票偏离你的角色默认立场，适合课堂讨论角色反思。";

  voteResultText.textContent = `你以“${role.name}”身份投票：${policyName}。${tendencyText}`;

  renderPolicyResults();
  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth" });
}

/* =========================
   十二、渲染政策结果测算
   ========================= */
function renderPolicyResults() {
  approveMetrics.innerHTML = policyResults.approve.map(function (item) {
    return `<li>${item}</li>`;
  }).join("");

  rejectMetrics.innerHTML = policyResults.reject.map(function (item) {
    return `<li>${item}</li>`;
  }).join("");
}

/* =========================
   十三、绑定事件
   ========================= */
nextDebateBtn.addEventListener("click", runNextDebate);

approveBtn.addEventListener("click", function () {
  vote("approve");
});

rejectBtn.addEventListener("click", function () {
  vote("reject");
});

closeModalBtn.addEventListener("click", closeTheoryModal);

theoryModal.addEventListener("click", function (event) {
  if (event.target === theoryModal) {
    closeTheoryModal();
  }
});

/* =========================
   十四、页面启动
   ========================= */
renderRoleCards();
