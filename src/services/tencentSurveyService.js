// 腾讯问卷统计服务
class TencentSurveyService {
  constructor() {
    this.surveyId = '23632150';
    this.surveyPath = '23632150/3985';
    this.baseUrl = 'https://wj.qq.com/s2';
  }

  // 获取问卷统计数据
  async getSurveyStats() {
    try {
      // 腾讯问卷公开统计API（模拟，实际需要通过官方API）
      // 由于腾讯问卷没有公开REST API，我们使用iframe嵌入方式
      const statsUrl = `${this.baseUrl}/${this.surveyPath}/`;
      return {
        surveyUrl: statsUrl,
        embedUrl: `${this.baseUrl}/${this.surveyPath}/stat/`,
        directUrl: `https://wj.qq.com/manage/survey/${this.surveyId}/statistics`
      };
    } catch (error) {
      console.error('获取腾讯问卷统计失败:', error);
      throw error;
    }
  }

  // 获取问卷链接
  getSurveyLinks() {
    return {
      publicUrl: `https://wj.qq.com/s2/${this.surveyPath}/`,
      adminUrl: `https://wj.qq.com/manage/survey/${this.surveyId}/statistics`,
      embedUrl: `https://wj.qq.com/s2/${this.surveyPath}/`
    };
  }

  // 检查是否可以直接访问腾讯问卷统计
  checkSurveyAccess() {
    return {
      hasAdminAccess: false, // 需要腾讯问卷管理员权限
      canEmbed: true,
      requiresLogin: true
    };
  }
}

export const tencentSurveyService = new TencentSurveyService();