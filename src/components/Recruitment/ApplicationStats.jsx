import React, { useState, useEffect } from 'react';
import './ApplicationStats.css';

const ApplicationStats = () => {
  const [applications, setApplications] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // 管理员密码
  const ADMIN_PASSWORD = 'mars2025';

  // 从本地存储加载申请数据
  useEffect(() => {
    const loadApplications = () => {
      const savedData = localStorage.getItem('applications');
      if (savedData) {
        setApplications(JSON.parse(savedData));
      }
    };
    loadApplications();

    // 监听存储变化（支持多标签页同步）
    const handleStorageChange = (e) => {
      if (e.key === 'applications') {
        loadApplications();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 验证管理员密码
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPassword('');
    } else {
      alert('密码错误！');
    }
  };

  // 导出数据为CSV格式（WPS表格兼容）
  const exportData = () => {
    if (applications.length === 0) {
      alert('暂无申请数据');
      return;
    }

    // 定义CSV表头
    const headers = [
      '序号',
      '姓名',
      '学号',
      '专业',
      '年级',
      '邮箱',
      '手机号',
      '兴趣领域',
      '个人经历',
      '申请原因',
      '提交时间'
    ];

    // 将数据转换为CSV格式，使用制表符分隔和特殊格式处理
    const csvContent = [
      headers.join('\t'), // 使用制表符分隔，更适合Excel
      ...applications.map((app, index) => [
        index + 1,
        `"${app.name || ''}"`,
        `"=""${app.studentId || ''}"""`, // 强制文本格式，防止0被去掉
        `"${app.major || ''}"`,
        `"${app.displayGrade || app.grade || ''}"`,
        `"${app.email || ''}"`,
        `"=""${app.phone || ''}"""`, // 强制文本格式，防止手机号被转换
        `"${app.displayInterest || app.interestArea || ''}"`,
        `"${(app.experience || '').replace(/"/g, '""')}"`,
        `"${(app.motivation || '').replace(/"/g, '""')}"`,
        `"${new Date(app.timestamp).toLocaleString('zh-CN')}"`
      ].join('\t'))
    ].join('\n');

    // 创建UTF-8 BOM，确保中文正常显示
    const BOM = '\uFEFF';
    const tsvBlob = new Blob([BOM + csvContent], { 
      type: 'text/tab-separated-values;charset=utf-8;' 
    });
    
    const url = URL.createObjectURL(tsvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `火星车申请数据_${new Date().toISOString().split('T')[0]}.tsv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 清空数据
  const clearData = () => {
    if (window.confirm('确定要清空所有申请数据吗？此操作不可恢复！')) {
      localStorage.removeItem('applications');
      setApplications([]);
    }
  };

  // 年级标签转换
  const getGradeLabel = (grade) => {
    const gradeMap = {
      'freshman': '2023级',
      'sophomore': '2024级',
      'junior': '2025级'
    };
    return gradeMap[grade] || grade;
  };

  // 兴趣领域标签转换
  const getInterestLabel = (interest) => {
    const interestMap = {
      'mechanical': '机械设计',
      'electrical': '电路设计',
      'programming': '编程开发',
      'control': '运营',
      'other': '其他'
    };
    return interestMap[interest] || interest;
  };

  // 计算统计数据
  const stats = {
    total: applications.length,
    today: applications.filter(app => {
      const today = new Date().toDateString();
      const appDate = new Date(app.timestamp).toDateString();
      return today === appDate;
    }).length,
    byInterest: applications.reduce((acc, app) => {
      const interest = app.displayInterest || app.interestArea;
      acc[interest] = (acc[interest] || 0) + 1;
      return acc;
    }, {}),
    byGrade: applications.reduce((acc, app) => {
      const grade = app.displayGrade || app.grade;
      acc[grade] = (acc[grade] || 0) + 1;
      return acc;
    }, {})
  };

  // 按时间排序（最新的在前）
  const sortedApplications = [...applications].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  if (!isAuthenticated) {
    return (
      <div className="stats-container">
        <div className="stats-login">
          <h2>申请统计</h2>
          <p>请输入管理员密码查看申请数据</p>
          <div className="login-form">
            <input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && setShowPasswordModal(true)}
            />
            <button onClick={() => setShowPasswordModal(true)}>登录</button>
          </div>
        </div>

        {showPasswordModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>管理员登录</h3>
              <input
                type="password"
                placeholder="请输入管理员密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <div className="modal-actions">
                <button onClick={() => setShowPasswordModal(false)}>取消</button>
                <button onClick={handleLogin}>确认</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2>申请数据统计</h2>
        <div className="stats-actions">
          <button onClick={exportData} className="export-btn">导出表格文件</button>
          <button onClick={clearData} className="clear-btn">清空数据</button>
          <button onClick={() => setIsAuthenticated(false)} className="logout-btn">退出</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>总申请数</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>今日申请</h3>
          <div className="stat-number">{stats.today}</div>
        </div>
      </div>

      <div className="stats-section">
        <h3>按兴趣领域分布</h3>
        <div className="stats-bars">
          {Object.entries(stats.byInterest).map(([area, count]) => (
            <div key={area} className="stat-bar">
              <span className="bar-label">{getInterestLabel(area)}</span>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ width: `${(count / stats.total) * 100}%` }}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3>按年级分布</h3>
        <div className="stats-bars">
          {Object.entries(stats.byGrade).map(([grade, count]) => (
            <div key={grade} className="stat-bar">
              <span className="bar-label">{getGradeLabel(grade)}</span>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ width: `${(count / stats.total) * 100}%` }}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3>最新申请</h3>
        <div className="applications-list">
          {applications.slice(-5).reverse().map((app, index) => (
            <div key={app.id} className="application-item">
              <div className="app-info">
                <span className="app-name">{app.name}</span>
                <span className="app-major">{app.major}</span>
                <span className="app-interest">{getInterestLabel(app.interestArea)}</span>
              </div>
              <div className="app-time">
                {new Date(app.timestamp).toLocaleString('zh-CN')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 辅助函数
const getInterestLabel = (area) => {
  const labels = {
    mechanical: '机械设计',
    electrical: '电路设计',
    programming: '编程开发',
    algorithm: '控制理论',
    control: '运营',
    other: '其他'
  };
  return labels[area] || area;
};

const getGradeLabel = (grade) => {
  const labels = {
    freshman: '2023级',
    sophomore: '2024级',
    junior: '2025级'
  };
  return labels[grade] || grade;
};

export default ApplicationStats;