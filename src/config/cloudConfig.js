// 腾讯问卷配置 - 火星车招新专用
export const TENCENT_WJ_CONFIG = {
  // ✅ 已配置：你的实际问卷ID
  SURVEY_ID: '23632150/3985', // 从 https://wj.qq.com/s2/23632150/3985/ 获取
  
  // 完整的腾讯问卷提交URL
  get SUBMIT_URL() {
    return `https://wj.qq.com/s2/${this.SURVEY_ID}.html`;
  },
  
  // 字段映射表 - 严格按照腾讯问卷题号对应
  FIELD_MAP: {
    name: 'q1',           // 姓名 → 第1题
    studentId: 'q2',      // 学号 → 第2题
    major: 'q3',          // 专业 → 第3题
    grade: 'q4',          // 年级 → 第4题
    email: 'q5',          // 邮箱 → 第5题
    phone: 'q6',          // 手机号 → 第6题
    interestArea: 'q7',   // 兴趣方向 → 第7题
    experience: 'q8',     // 相关经历 → 第8题
    motivation: 'q9'      // 申请动机 → 第9题
  },
  
  // 年级映射（腾讯问卷需要的格式）
  GRADE_OPTIONS: {
    '2023级': '2023级',
    '2024级': '2024级',
    '2025级': '2025级'
  },
  
  // 兴趣方向映射（腾讯问卷需要的格式）
  INTEREST_OPTIONS: {
    'mechanical': '机械设计',
    'electrical': '电路设计',
    'programming': '编程开发',
    'control': '运营',
    'other': '其他'
  }
};

// 启用开关
export const CLOUD_CONFIG = {
  USE_CLOUD_STORAGE: true,  // 改为true启用云端存储
  CURRENT_SERVICE: 'TENCENT_WJ' // 使用腾讯问卷
};