import { Question } from '../types';

export const questionBank: Question[] = [
  {
    id: 1,
    question: "业务合规稽核应遵循什么理念？",
    options: [
      "事前预防、事中控制、事后稽核",
      "事前计划、事中执行、事后检查",
      "全员参与、全过程控制",
      "谁主管、谁负责"
    ],
    correctAnswer: 0,
    explanation: "根据第一章第一条：业务合规稽核应遵循“事前预防、事中控制、事后稽核”的理念。"
  },
  {
    id: 2,
    question: "一级自查与二级业务稽核回复率要求均为多少？",
    options: [
      "90%",
      "95%",
      "99%",
      "100%"
    ],
    correctAnswer: 3,
    explanation: "根据第一章第四条要求：一级自查与二级业务稽核回复率均为 100%。"
  },
  {
    id: 3,
    question: "欠费账龄小于多少年的用户禁止纳入坏账核销？",
    options: [
      "1年",
      "2年",
      "3年",
      "5年"
    ],
    correctAnswer: 0,
    explanation: "根据欠费管理规定，禁止纳入坏账核销的对象包括：欠费账龄小于1年用户。"
  },
  {
    id: 4,
    question: "业财核对中，政企业务以哪个域的数据为标准？",
    options: [
      "B域",
      "O域",
      "M域",
      "财务域"
    ],
    correctAnswer: 2,
    explanation: "根据业财差异对账要求：政企业务以 M 域数据为标准。"
  },
  {
    id: 5,
    question: "后付费用户欠费超过几个月不计列收入？",
    options: [
      "1个月",
      "3个月",
      "6个月",
      "12个月"
    ],
    correctAnswer: 1,
    explanation: "根据欠费收入计列原则：后付费用户欠费超过3个月不计列收入，回收当期计列。"
  },
  {
    id: 6,
    question: "全渠道无纸化率的考核指标是多少？",
    options: [
      "90%",
      "95%",
      "98%",
      "100%"
    ],
    correctAnswer: 3,
    explanation: "根据营业受理无纸化考核指标：全渠道无纸化率目标为 100%。"
  },
  {
    id: 7,
    question: "主要举报渠道中，12321平台是指什么？",
    options: [
      "网络不良与垃圾信息举报受理中心",
      "电信客服热线",
      "消费者权益保护热线",
      "工信部申诉平台"
    ],
    correctAnswer: 0,
    explanation: "文档中列出的主要举报渠道包括12321平台（即网络不良与垃圾信息举报受理中心）。"
  },
  {
    id: 8,
    question: "FTTR等高价值终端的回收率要求是多少？",
    options: [
      "80%",
      "90%",
      "95%",
      "100%"
    ],
    correctAnswer: 3,
    explanation: "根据固网终端管控规定：FTTR等高价值终端未按 100% 回收要求执行将受处罚。"
  },
  {
    id: 9,
    question: "新装用户多少个月内连续沉默且状态异常属于违规发展？",
    options: [
      "1个月",
      "2个月",
      "3个月",
      "6个月"
    ],
    correctAnswer: 2,
    explanation: "根据发展质量监控规定：新装用户 3 个月内连续沉默且状态异常属于违规。"
  },
  {
    id: 10,
    question: "佣金结算管理中，要求多少比例进入佣金系统？",
    options: [
      "80%",
      "90%",
      "95%",
      "100%"
    ],
    correctAnswer: 3,
    explanation: "根据佣金结算管理规则：佣金数据 100% 进入佣金系统并推送至 MSS 财务系统。"
  },
  {
    id: 11,
    question: "I类客户的定义不包括以下哪项？",
    options: [
      "信用度高",
      "客户价值大",
      "按月付费",
      "具备战略合作意义"
    ],
    correctAnswer: 2,
    explanation: "I类客户按季度、半年或一年付费，而非按月付费。"
  },
  {
    id: 12,
    question: "关于工号权限管理，原则上一个身份证在全省范围内仅能有多少个在用受理工号？",
    options: [
      "1个",
      "2个",
      "3个",
      "不限制"
    ],
    correctAnswer: 0,
    explanation: "根据工号管理特殊规定：原则上一个身份证在全省范围内仅能有 1 个在用受理工号。"
  },
  {
    id: 13,
    question: "携号转网业务中，代理商仅可支付多少元/笔的手续费？",
    options: [
      "3元",
      "5元",
      "10元",
      "0元"
    ],
    correctAnswer: 0,
    explanation: "根据佣金标准管控红线：携号转网业务禁止支付渠道支撑费，仅可支付 3 元/笔手续费。"
  },
  {
    id: 14,
    question: "营收资金稽核中，一级稽核（自有厅店及合作营业厅）应按什么周期完成？",
    options: [
      "按天",
      "按周",
      "按月",
      "按季度"
    ],
    correctAnswer: 0,
    explanation: "根据营收资金稽核要求：一级稽核为自有厅店及合作营业厅按天完成。"
  },
  {
    id: 15,
    question: "用户数据一致性对比中，以哪个系统数据为基准？",
    options: [
      "HLR",
      "HSS",
      "CRM",
      "计费系统"
    ],
    correctAnswer: 2,
    explanation: "根据用户数据一致性对比定义：以 CRM 系统数据为基准。"
  },
  {
    id: 16,
    question: "对于已开具增值税专用发票（可作废）的退费，应如何处理？",
    options: [
      "开具红字发票",
      "直接作废并收回全部联次",
      "只开具信息表",
      "无需处理"
    ],
    correctAnswer: 1,
    explanation: "根据退费发票管理要求：增值税专用发票（可作废）直接作废并收回全部联次。"
  },
  {
    id: 17,
    question: "靓号等级降档审批中，若需降三级及以上，审批层级需？",
    options: [
      "维持不变",
      "降低一层",
      "提高一层",
      "直接由集团审批"
    ],
    correctAnswer: 2,
    explanation: "根据靓号优惠审批要求：若需降三级及以上，审批层级需提高一层。"
  },
  {
    id: 18,
    question: "11888充值卡的面值不包括以下哪种？",
    options: [
      "30元",
      "50元",
      "100元",
      "300元"
    ],
    correctAnswer: 3,
    explanation: "文档中列出的11888充值卡面值为30、50、100、200、500元，不含300元。"
  },
  {
    id: 19,
    question: "集中受理订单占比的目标值是多少？",
    options: [
      "≥10%",
      "≥15%",
      "≥20%",
      "≥30%"
    ],
    correctAnswer: 2,
    explanation: "根据集中受理考核指标：集中受理订单占比目标值为 ≥20%。"
  },
  {
    id: 20,
    question: "业务合规稽核中的“预警单”处理，无需整改单是指？",
    options: [
      "错单",
      "正常单",
      "有事前审批或证明材料的单据",
      "系统自动修复单"
    ],
    correctAnswer: 2,
    explanation: "根据预警单分类：无需整改单是指有事前审批或证明材料的单据。"
  },
  {
    id: 21,
    question: "入网时必须签署什么文件，明确告知拨打骚扰电话将被停机？",
    options: [
      "入网协议",
      "信息安全承诺书",
      "实名制告知书",
      "反诈骗承诺书"
    ],
    correctAnswer: 1,
    explanation: "根据骚扰电话管理：入网时必须签署《信息安全承诺书》。"
  },
  {
    id: 22,
    question: "调账审批权限中，100万及以上的金额需要什么流程？",
    options: [
      "分公司审批",
      "省公司业务管理支撑部审批",
      "省公司副总经理签字+附件后电子流程",
      "集团公司审批"
    ],
    correctAnswer: 2,
    explanation: "根据调账审批权限分级：≥100万需分公司审核+省公司相关部门+副总经理签字+附件后电子流程提交。"
  },
  {
    id: 23,
    question: "实名制违规中，使用本人或熟人证件办理无真实使用需求的业务属于？",
    options: [
      "虚假竣工",
      "人证不符",
      "冲量",
      "伪造资料"
    ],
    correctAnswer: 2,
    explanation: "根据发展质量监控：用本人或熟人证件冲量属于违规发展行为。"
  },
  {
    id: 24,
    question: "携号转入的号码距离上次携号转网需满多少日？",
    options: [
      "60日",
      "90日",
      "120日",
      "180日"
    ],
    correctAnswer: 2,
    explanation: "根据携号转入规则：距离上次携号转网满 120 日。"
  },
  {
    id: 25,
    question: "IT需求统筹中，优先支撑什么样的需求？",
    options: [
      "个性化需求",
      "临时性需求",
      "全局性、共性、迫切的需求",
      "简单的需求"
    ],
    correctAnswer: 2,
    explanation: "根据IT需求统筹最大适用范围原则：优先支撑全局性、共性、迫切的需求。"
  }
];

// Helper to shuffle questions
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
