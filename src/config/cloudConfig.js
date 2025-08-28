// 腾讯问卷配置 - 火星车招新专用
export const TENCENT_WJ_CONFIG = {
  // ✅ 已配置：你的实际问卷ID
  SURVEY_ID: '23632150', // 从 https://wj.qq.com/s2/23632150/3985/ 获取
  
  // 腾讯问卷API配置
  API_KEY: 'YOUR_API_KEY_HERE', // 需要从腾讯问卷后台获取
  
  // 完整的腾讯问卷填写URL
  get FORM_URL() {
    return `https://wj.qq.com/s2/${this.SURVEY_ID}/3985.html`;
  },
  
  // 简化的问卷链接（无预览）
  get DIRECT_URL() {
    return `https://wj.qq.com/s2/${this.SURVEY_ID}/3985.html`;
  },
  
  // 腾讯问卷API端点
  get API_ENDPOINT() {
    return `https://wj.qq.com/api/survey/${this.SURVEY_ID}/responses`;
  }
};

// 字段映射配置 - 腾讯问卷字段映射
export const FIELD_MAP = {
  'name': 'field_1',        // 姓名
  'studentId': 'field_2',   // 学号
  'major': 'field_3',       // 专业
  'grade': 'field_4',       // 年级
  'email': 'field_5',       // 邮箱
  'phone': 'field_6',       // 电话
  'interestArea': 'field_7', // 兴趣领域
  'experience': 'field_8',  // 相关经验
  'motivation': 'field_9'   // 申请动机
};

// 启用开关
export const CLOUD_CONFIG = {
  USE_CLOUD_STORAGE: true,   // 启用云端存储
  CURRENT_SERVICE: 'TENCENT_WJ', // 使用腾讯问卷
  ENABLE_CLOUD_SYNC: true   // 启用云端同步
};

// 本地存储配置（作为备份）
export const LOCAL_CONFIG = {
  STORAGE_KEY: 'applications',
  BACKUP_KEY: 'applications_backup',
  SYNC_INTERVAL: 300000 // 5分钟同步一次
};