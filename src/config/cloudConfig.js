// 腾讯问卷配置
export const TENCENT_WJ_CONFIG = {
  // 问卷ID - 从腾讯问卷链接中提取
  SURVEY_ID: '23632150',
  
  // 问卷填写页面URL
  FORM_URL: 'https://wj.qq.com/s2/23632150/3985.html',
  
  // 腾讯问卷API提交URL（正确格式）
  API_URL: 'https://wj.qq.com/surveys/23632150/submit',
  
  // 字段映射 - 将表单字段映射到腾讯问卷字段
  FIELD_MAP: {
    name: 'q1',        // 姓名
    studentId: 'q2',   // 学号
    major: 'q3',       // 专业
    grade: 'q4',       // 年级
    email: 'q5',       // 邮箱
    phone: 'q6',       // 手机号
    interestArea: 'q7', // 兴趣领域
    experience: 'q8',  // 相关经验
    motivation: 'q9'   // 申请动机
  },
  
  // 年级选项映射
  GRADE_OPTIONS: {
    freshman: '大一',
    sophomore: '大二',
    junior: '大三',
    senior: '大四',
    graduate: '研究生'
  },
  
  // 兴趣领域选项映射
  INTEREST_OPTIONS: {
    programming: '编程开发',
    hardware: '硬件设计',
    control: '控制算法',
    mechanical: '机械结构',
    ai: '人工智能',
    vision: '计算机视觉',
    sensors: '传感器技术',
    communication: '通信技术'
  }
};

// 云存储配置
export const CLOUD_CONFIG = {
  // 是否启用云存储（腾讯问卷）
  USE_CLOUD_STORAGE: true,
  
  // 本地备份模式
  USE_LOCAL_BACKUP: true,
  
  // 异步提交超时时间
  SUBMIT_TIMEOUT: 10000
};