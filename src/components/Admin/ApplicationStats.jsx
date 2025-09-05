import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';
import './ApplicationStats.css';

const ApplicationStats = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    try {
      // 从本地存储加载数据
      const data = JSON.parse(localStorage.getItem('marsRoverApplications') || '[]');
      setApplications(data);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = (id) => {
    if (window.confirm('确定要删除这条申请吗？')) {
      const updated = applications.filter(app => app.id !== id);
      localStorage.setItem('marsRoverApplications', JSON.stringify(updated));
      setApplications(updated);
    }
  };

  const exportToCSV = () => {
    if (applications.length === 0) {
      alert('暂无数据可导出');
      return;
    }

    const headers = [
      '姓名', '学号', '专业', '年级', '邮箱', '手机号', '兴趣方向', '相关经历', '申请动机', '提交时间'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredApplications.map(app => [
        `"${app.name || ''}"`,
        `"${app.studentId || ''}"`,
        `"${app.major || ''}"`,
        `"${app.grade || ''}"`,
        `"${app.email || ''}"`,
        `"${app.phone || ''}"`,
        `"${app.interestArea || ''}"`,
        `"${(app.experience || '').replace(/"/g, '""')}"`,
        `"${(app.motivation || '').replace(/"/g, '""')}"`,
        `"${new Date(app.timestamp).toLocaleString('zh-CN')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `招新申请统计_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const getInterestLabel = (interest) => {
    const labels = {
      'mechanical': '机械设计',
      'electrical': '电路设计',
      'programming': '编程开发',
      'control': '运营',
      'other': '其他'
    };
    return labels[interest] || interest;
  };

  const getGradeLabel = (grade) => {
    const labels = {
      'freshman': '2023级',
      'sophomore': '2024级',
      'junior': '2025级'
    };
    return labels[grade] || grade;
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.interestArea === filter;
    const matchesSearch = searchTerm === '' || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentId.includes(searchTerm) ||
      app.major.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: applications.length,
    mechanical: applications.filter(app => app.interestArea === 'mechanical').length,
    electrical: applications.filter(app => app.interestArea === 'electrical').length,
    programming: applications.filter(app => app.interestArea === 'programming').length,
    control: applications.filter(app => app.interestArea === 'control').length,
    other: applications.filter(app => app.interestArea === 'other').length
  };

  if (loading) {
    return (
      <div className="stats-loading">
        <LoadingSpinner size="large" text="正在加载统计数据..." />
      </div>
    );
  }

  return (
    <div className="application-stats-container">
      <div className="stats-header">
        <h1>📊 招新申请统计</h1>
        <div className="stats-actions">
          <button className="export-btn" onClick={exportToCSV}>
            📥 导出CSV
          </button>
          <button className="refresh-btn" onClick={loadApplications}>
            🔄 刷新数据
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">总申请数</div>
        </div>
        <div className="stat-card mechanical">
          <div className="stat-number">{stats.mechanical}</div>
          <div className="stat-label">机械设计</div>
        </div>
        <div className="stat-card electrical">
          <div className="stat-number">{stats.electrical}</div>
          <div className="stat-label">电路设计</div>
        </div>
        <div className="stat-card programming">
          <div className="stat-number">{stats.programming}</div>
          <div className="stat-label">编程开发</div>
        </div>
        <div className="stat-card control">
          <div className="stat-number">{stats.control}</div>
          <div className="stat-label">运营</div>
        </div>
        <div className="stat-card other">
          <div className="stat-number">{stats.other}</div>
          <div className="stat-label">其他</div>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="stats-filters">
        <input
          type="text"
          placeholder="🔍 搜索姓名、学号或专业..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">所有方向</option>
          <option value="mechanical">机械设计</option>
          <option value="electrical">电路设计</option>
          <option value="programming">编程开发</option>
          <option value="control">运营</option>
          <option value="other">其他</option>
        </select>
      </div>

      {/* 申请列表 */}
      <div className="applications-list">
        {filteredApplications.length === 0 ? (
          <div className="no-data">
            {applications.length === 0 ? '暂无申请数据' : '没有符合条件的申请'}
          </div>
        ) : (
          <table className="applications-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>学号</th>
                <th>专业</th>
                <th>年级</th>
                <th>邮箱</th>
                <th>手机号</th>
                <th>兴趣方向</th>
                <th>提交时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.name}</td>
                  <td>{app.studentId}</td>
                  <td>{app.major}</td>
                  <td>{getGradeLabel(app.grade)}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{getInterestLabel(app.interestArea)}</td>
                  <td>{new Date(app.timestamp).toLocaleString('zh-CN')}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteApplication(app.id)}
                      title="删除申请"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicationStats;