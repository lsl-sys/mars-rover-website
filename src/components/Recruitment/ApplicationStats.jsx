import React, { useState, useEffect } from 'react';
import './ApplicationStats.css';
import { cloudService } from '../../services/cloudService.js';
import { CLOUD_CONFIG } from '../../config/cloudConfig.js';

const ApplicationStats = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [applications, setApplications] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [dataSource, setDataSource] = useState('all'); // 'all', 'cloud', 'local'

  const ADMIN_PASSWORD = 'mars2025';

  // 初始化
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, dataSource]);

  // 加载数据
  const loadData = async () => {
    setLoading(true);
    try {
      const allData = await cloudService.mergeLocalAndCloudData(
        JSON.parse(localStorage.getItem('applications') || '[]')
      );
      
      const stats = await cloudService.getStatistics();
      
      // 根据数据源筛选
      let filteredData = allData;
      if (dataSource === 'cloud') {
        filteredData = allData.filter(app => app.source === 'tencent');
      } else if (dataSource === 'local') {
        filteredData = allData.filter(app => app.source === 'local');
      }
      
      setApplications(filteredData);
      setStatistics(stats);
      setSyncStatus(`最后同步: ${stats.lastSync || '从未同步'}`);
    } catch (error) {
      console.error('加载数据失败:', error);
      // 降级到本地数据
      loadLocalData();
    }
    setLoading(false);
  };

  // 加载本地数据（降级方案）
  const loadLocalData = () => {
    const localData = JSON.parse(localStorage.getItem('applications') || '[]');
    setApplications(localData);
    
    const stats = {
      total: localData.length,
      byGrade: {},
      byInterest: {},
      bySource: { local: localData.length },
      recent: localData.slice(0, 5),
      lastSync: null
    };
    
    localData.forEach(item => {
      stats.byGrade[item.grade] = (stats.byGrade[item.grade] || 0) + 1;
      stats.byInterest[item.interestArea] = (stats.byInterest[item.interestArea] || 0) + 1;
    });
    
    setStatistics(stats);
    setSyncStatus('使用本地数据');
  };

  // 处理登录
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('密码错误，请重试');
    }
  };

  // 手动同步
  const handleSync = async () => {
    setSyncStatus('同步中...');
    try {
      await cloudService.manualSync();
      await loadData();
      setSyncStatus('同步完成');
    } catch (error) {
      setSyncStatus('同步失败');
    }
  };

  // 导出CSV
  const exportToCSV = () => {
    if (applications.length === 0) {
      alert('暂无数据可导出');
      return;
    }

    const headers = [
      '姓名',
      '学号',
      '专业',
      '年级',
      '邮箱',
      '电话',
      '兴趣领域',
      '相关经验',
      '申请动机',
      '提交时间',
      '数据来源'
    ];

    const csvContent = [
      headers.join(','),
      ...applications.map(app => [
        `"${app.name || ''}"`,
        `"${app.studentId || ''}"`,
        `"${app.major || ''}"`,
        `"${app.displayGrade || app.grade || ''}"`,
        `"${app.email || ''}"`,
        `"${app.phone || ''}"`,
        `"${app.displayInterest || app.interestArea || ''}"`,
        `"${(app.experience || '').replace(/"/g, '""')}"`,
        `"${(app.motivation || '').replace(/"/g, '""')}"`,
        `"${new Date(app.timestamp).toLocaleString('zh-CN')}"`,
        `"${app.source === 'tencent' ? '腾讯问卷' : '本地提交'}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `火星车招新申请_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 获取年级显示名称
  const getGradeDisplayName = (grade) => {
    const gradeMap = {
      freshman: '大一',
      sophomore: '大二',
      junior: '大三',
      senior: '大四',
      graduate: '研究生',
      other: '其他'
    };
    return gradeMap[grade] || grade;
  };

  // 获取兴趣领域显示名称
  const getInterestDisplayName = (interest) => {
    const interestMap = {
      programming: '编程开发',
      hardware: '硬件设计',
      mechanical: '机械结构',
      management: '项目管理',
      testing: '测试调试',
      other: '其他'
    };
    return interestMap[interest] || interest;
  };

  // 登录界面
  if (!isAuthenticated) {
    return (
      <div className="application-stats-container">
        <div className="stats-login">
          <h2>申请统计管理</h2>
          <p>请输入管理员密码查看申请统计数据</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="password-input"
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
            <button type="submit" className="login-button">
              登录
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="application-stats-container">
      <div className="stats-header">
        <h1>申请统计管理</h1>
        <div className="stats-controls">
          <div className="data-source-selector">
            <label>数据来源：</label>
            <select 
              value={dataSource} 
              onChange={(e) => setDataSource(e.target.value)}
              disabled={loading}
            >
              <option value="all">全部数据</option>
              <option value="cloud">云端数据</option>
              <option value="local">本地数据</option>
            </select>
          </div>
          
          <div className="sync-controls">
            <span className="sync-status">{syncStatus}</span>
            <button onClick={handleSync} disabled={loading} className="sync-button">
              {loading ? '加载中...' : '同步数据'}
            </button>
            <button onClick={exportToCSV} className="export-button" disabled={applications.length === 0}>
              导出CSV
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>正在加载数据...</p>
        </div>
      )}

      {statistics && !loading && (
        <>
          <div className="stats-overview">
            <div className="stat-card">
              <h3>总申请数</h3>
              <div className="stat-number">{statistics.total}</div>
            </div>
            
            <div className="stat-card">
              <h3>云端数据</h3>
              <div className="stat-number">{statistics.bySource.tencent || 0}</div>
            </div>
            
            <div className="stat-card">
              <h3>本地数据</h3>
              <div className="stat-number">{statistics.bySource.local || 0}</div>
            </div>
          </div>

          <div className="stats-breakdown">
            <div className="stats-section">
              <h3>年级分布</h3>
              <div className="stats-grid">
                {Object.entries(statistics.byGrade).map(([grade, count]) => (
                  <div key={grade} className="stat-item">
                    <span className="stat-label">{getGradeDisplayName(grade)}</span>
                    <span className="stat-value">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stats-section">
              <h3>兴趣领域分布</h3>
              <div className="stats-grid">
                {Object.entries(statistics.byInterest).map(([interest, count]) => (
                  <div key={interest} className="stat-item">
                    <span className="stat-label">{getInterestDisplayName(interest)}</span>
                    <span className="stat-value">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recent-applications">
            <h3>最新申请</h3>
            {applications.length > 0 ? (
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th>学号</th>
                    <th>专业</th>
                    <th>年级</th>
                    <th>兴趣领域</th>
                    <th>提交时间</th>
                    <th>来源</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 10).map((app) => (
                    <tr key={app.id}>
                      <td>{app.name}</td>
                      <td>{app.studentId}</td>
                      <td>{app.major}</td>
                      <td>{getGradeDisplayName(app.grade)}</td>
                      <td>{getInterestDisplayName(app.interestArea)}</td>
                      <td>{new Date(app.timestamp).toLocaleString('zh-CN')}</td>
                      <td>
                        <span className={`source-badge ${app.source}`}>
                          {app.source === 'tencent' ? '云端' : '本地'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">暂无申请数据</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationStats;