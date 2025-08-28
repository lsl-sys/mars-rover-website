// 腾讯问卷配置 - 火星车招新专用
export const TENCENT_WJ_CONFIG = {
  // ✅ 已配置：你的实际问卷ID
  SURVEY_ID: '23632150', // 从 https://wj.qq.com/s2/23632150/3985/ 获取
  
  // 完整的腾讯问卷填写URL
  get FORM_URL() {
    return `https://wj.qq.com/s2/${this.SURVEY_ID}/3985.html`;
  },
  
  // 简化的问卷链接（无预览）
  get DIRECT_URL() {
    return `https://wj.qq.com/s2/${this.SURVEY_ID}/3985.html`;
  }
};

// 启用开关
export const CLOUD_CONFIG = {
  USE_CLOUD_STORAGE: false,  // 腾讯问卷模式，使用本地存储作为备份
  CURRENT_SERVICE: 'TENCENT_WJ' // 使用腾讯问卷
};