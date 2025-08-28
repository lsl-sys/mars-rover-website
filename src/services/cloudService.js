// 云端服务 - 腾讯问卷数据同步
import { TENCENT_WJ_CONFIG, CLOUD_CONFIG, FIELD_MAP } from '../config/cloudConfig.js';

class CloudService {
  constructor() {
    this.cache = new Map();
    this.lastSyncTime = null;
    this.syncInterval = null;
  }

  // 获取腾讯问卷数据
  async fetchTencentData() {
    if (!CLOUD_CONFIG.USE_CLOUD_STORAGE) {
      console.log('云端存储未启用');
      return [];
    }

    try {
      // 注意：腾讯问卷API需要申请权限，这里使用模拟数据演示
      // 实际使用时需要替换为真实的API调用
      console.log('正在获取腾讯问卷数据...');
      
      // 模拟API响应数据
      const mockData = await this.getMockTencentData();
      
      // 转换数据格式
      const formattedData = this.formatTencentData(mockData);
      
      // 缓存数据
      this.cache.set('tencent_data', formattedData);
      this.lastSyncTime = new Date().toISOString();
      
      return formattedData;
    } catch (error) {
      console.error('获取腾讯问卷数据失败:', error);
      // 返回缓存数据或空数组
      return this.cache.get('tencent_data') || [];
    }
  }

  // 模拟腾讯问卷数据（实际使用时替换为真实API调用）
  async getMockTencentData() {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 'resp_001',
        create_time: '2024-01-15T10:30:00Z',
        ip: '192.168.1.100',
        answers: {
          field_1: '张三',
          field_2: '20231234',
          field_3: '计算机科学与技术',
          field_4: '大一',
          field_5: 'zhangsan@example.com',
          field_6: '13800138000',
          field_7: '编程开发',
          field_8: '有Python编程经验，参与过小型项目开发',
          field_9: '希望加入火星车团队学习更多工程实践经验'
        }
      },
      {
        id: 'resp_002',
        create_time: '2024-01-15T14:20:00Z',
        ip: '192.168.1.101',
        answers: {
          field_1: '李四',
          field_2: '20235678',
          field_3: '电子信息工程',
          field_4: '大二',
          field_5: 'lisi@example.com',
          field_6: '13900139000',
          field_7: '硬件设计',
          field_8: '熟悉Arduino开发，有电路设计经验',
          field_9: '对火星车的硬件系统很感兴趣，想深入学习'
        }
      }
    ];
  }

  // 格式化腾讯问卷数据
  formatTencentData(rawData) {
    return rawData.map(item => ({
      id: item.id,
      name: item.answers[FIELD_MAP.name] || '',
      studentId: item.answers[FIELD_MAP.studentId] || '',
      major: item.answers[FIELD_MAP.major] || '',
      grade: this.mapGrade(item.answers[FIELD_MAP.grade]),
      email: item.answers[FIELD_MAP.email] || '',
      phone: item.answers[FIELD_MAP.phone] || '',
      interestArea: this.mapInterest(item.answers[FIELD_MAP.interestArea]),
      experience: item.answers[FIELD_MAP.experience] || '',
      motivation: item.answers[FIELD_MAP.motivation] || '',
      timestamp: item.create_time,
      source: 'tencent',
      displayGrade: item.answers[FIELD_MAP.grade] || '',
      displayInterest: item.answers[FIELD_MAP.interestArea] || ''
    }));
  }

  // 年级映射
  mapGrade(gradeText) {
    const gradeMap = {
      '大一': 'freshman',
      '大二': 'sophomore',
      '大三': 'junior',
      '大四': 'senior',
      '研究生': 'graduate'
    };
    return gradeMap[gradeText] || 'other';
  }

  // 兴趣领域映射
  mapInterest(interestText) {
    const interestMap = {
      '编程开发': 'programming',
      '硬件设计': 'hardware',
      '机械结构': 'mechanical',
      '项目管理': 'management',
      '测试调试': 'testing'
    };
    return interestMap[interestText] || 'other';
  }

  // 合并本地和云端数据
  async mergeLocalAndCloudData(localData = []) {
    const cloudData = await this.fetchTencentData();
    
    // 合并数据，云端数据优先
    const merged = [...cloudData];
    
    // 添加本地独有的数据
    localData.forEach(localItem => {
      const exists = cloudData.some(cloudItem => 
        cloudItem.studentId === localItem.studentId || 
        cloudItem.email === localItem.email
      );
      if (!exists) {
        merged.push({ ...localItem, source: 'local' });
      }
    });
    
    // 按时间排序
    return merged.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // 获取统计数据
  async getStatistics() {
    const allData = await this.mergeLocalAndCloudData();
    
    const stats = {
      total: allData.length,
      byGrade: {},
      byInterest: {},
      bySource: {},
      recent: allData.slice(0, 5),
      lastSync: this.lastSyncTime
    };
    
    allData.forEach(item => {
      // 按年级统计
      stats.byGrade[item.grade] = (stats.byGrade[item.grade] || 0) + 1;
      
      // 按兴趣领域统计
      stats.byInterest[item.interestArea] = (stats.byInterest[item.interestArea] || 0) + 1;
      
      // 按来源统计
      stats.bySource[item.source] = (stats.bySource[item.source] || 0) + 1;
    });
    
    return stats;
  }

  // 开始自动同步
  startAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    
    this.syncInterval = setInterval(async () => {
      console.log('自动同步云端数据...');
      await this.fetchTencentData();
    }, 5 * 60 * 1000); // 每5分钟同步一次
  }

  // 停止自动同步
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // 手动同步
  async manualSync() {
    console.log('手动同步云端数据...');
    return await this.fetchTencentData();
  }

  // 检查云端连接状态
  async checkConnection() {
    try {
      // 模拟连接检查
      await new Promise(resolve => setTimeout(resolve, 500));
      return { connected: true, message: '云端连接正常' };
    } catch (error) {
      return { connected: false, message: error.message };
    }
  }
}

// 创建单例实例
export const cloudService = new CloudService();

// 初始化云端服务
export const initCloudService = () => {
  if (CLOUD_CONFIG.ENABLE_CLOUD_SYNC) {
    cloudService.startAutoSync();
    console.log('云端服务已启动');
  }
};