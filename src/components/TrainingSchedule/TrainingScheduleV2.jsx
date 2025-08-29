import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './TrainingScheduleV2.css';

moment.locale('zh-cn');

// 重构后的培训日程组件
const TrainingScheduleV2 = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('list'); // 'week', 'month', 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟培训活动数据 - 更丰富的数据结构
  const trainingEvents = [
    {
      id: 1,
      title: '火星车基础认知',
      start: new Date(2025, 8, 1, 14, 0, 0),
      end: new Date(2025, 8, 1, 16, 0, 0),
      description: '深入了解火星车的基本结构、工作原理和发展历程，建立完整的认知框架',
      location: '实验楼 B301',
      trainer: '廖老师',
      category: '基础培训',
      color: '#3b82f6',
      icon: '📚',
      status: 'confirmed',
      materials: ['火星车结构图.pdf', '工作原理手册.docx']
    },
    {
      id: 2,
      title: '机械设计实战',
      start: new Date(2025, 8, 3, 10, 0, 0),
      end: new Date(2025, 8, 3, 12, 0, 0),
      description: '通过实际案例学习火星车机械结构设计的基本原则和方法，培养设计思维',
      location: '实验楼 B101',
      trainer: '李老师',
      category: '实践课程',
      color: '#f59e0b',
      icon: '🔧',
      status: 'confirmed',
      materials: ['设计图纸模板.dwg', 'SolidWorks教程.pdf']
    },
    {
      id: 3,
      title: '电子电路深度解析',
      start: new Date(2025, 8, 5, 14, 0, 0),
      end: new Date(2025, 8, 5, 17, 0, 0),
      description: '系统学习火星车电子系统设计和电路原理，掌握核心电子技术应用',
      location: '实验楼 A205',
      trainer: '刘老师',
      category: '技术培训',
      color: '#10b981',
      icon: '⚡',
      participants: 18,
      status: 'confirmed',
      materials: ['电路原理图.pdf', '元器件清单.xlsx']
    },
    {
      id: 4,
      title: '团队协作与项目管理',
      start: new Date(2025, 8, 8, 15, 0, 0),
      end: new Date(2025, 8, 8, 17, 0, 0),
      description: '掌握项目开发中的团队协作技巧，学习使用项目管理工具进行有效沟通',
      location: '实验楼 A101',
      trainer: '陈老师',
      category: '软技能培训',
      color: '#10b981',
      icon: '🤝',
      status: 'confirmed',
      materials: ['团队协作指南.pdf', '项目管理工具手册.docx']
    },
    {
      id: 5,
      title: '火星车测试与调试',
      start: new Date(2025, 8, 10, 13, 0, 0),
      end: new Date(2025, 8, 10, 16, 0, 0),
      description: '学习火星车系统的测试方法和调试技巧，确保系统稳定运行',
      location: '实验楼 B301',
      trainer: '廖老师',
      category: '实践培训',
      color: '#8b5cf6',
      icon: '🔍',
      status: 'confirmed',
      materials: ['测试用例模板.xlsx', '调试工具指南.pdf']
    },
    {
      id: 6,
      title: '火星车高级编程',
      start: new Date(2025, 8, 12, 9, 0, 0),
      end: new Date(2025, 8, 12, 12, 0, 0),
      description: '深入学习火星车的高级编程技术，包括AI算法和自主导航系统',
      location: '实验楼 B205',
      trainer: '王老师',
      category: '高级培训',
      color: '#f97316',
      icon: '🚀',
      status: 'confirmed',
      materials: ['高级编程指南.pdf', 'AI算法示例.py']
    },
    {
      id: 7,
      title: '3D建模与仿真',
      start: new Date(2025, 8, 15, 14, 0, 0),
      end: new Date(2025, 8, 15, 16, 0, 0),
      description: '使用专业软件进行火星车3D建模和仿真测试',
      location: '计算机房 B305',
      trainer: '陈老师',
      category: '实践课程',
      color: '#f59e0b',
      icon: '🎯',
      participants: 12,
      status: 'confirmed',
      materials: ['3D模型文件.obj', '仿真参数设置.txt']
    },
    {
      id: 8,
      title: '系统集成测试',
      start: new Date(2025, 8, 17, 10, 0, 0),
      end: new Date(2025, 8, 17, 12, 0, 0),
      description: '各子系统集成测试和整体性能评估',
      location: '测试实验室',
      trainer: '测试团队',
      category: '实践课程',
      color: '#f59e0b',
      icon: '🔬',
      participants: 25,
      status: 'confirmed',
      materials: ['测试报告模板.docx', '性能评估表.xlsx']
    }
  ];

  useEffect(() => {
    setEvents(trainingEvents);
  }, []);

  // 获取当前视图的事件
  const getFilteredEvents = () => {
    let filtered = events;
    
    // 按类别筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    // 按搜索关键词筛选
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.trainer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  // 获取当前周/月的事件
  const getCurrentEvents = () => {
    const filtered = getFilteredEvents();
    
    if (viewMode === 'week') {
      const startOfWeek = moment(currentDate).startOf('week');
      const endOfWeek = moment(currentDate).endOf('week');
      return filtered.filter(event => 
        moment(event.start).isBetween(startOfWeek, endOfWeek, null, '[]')
      );
    } else if (viewMode === 'month') {
      const startOfMonth = moment(currentDate).startOf('month');
      const endOfMonth = moment(currentDate).endOf('month');
      return filtered.filter(event => 
        moment(event.start).isBetween(startOfMonth, endOfMonth, null, '[]')
      );
    }
    
    return filtered;
  };

  // 获取即将开始的事件
  const getUpcomingEvents = () => {
    return getFilteredEvents()
      .filter(event => event.start > new Date())
      .sort((a, b) => a.start - b.start)
      .slice(0, 5);
  };

  // 导航到上/下周或月
  const navigatePeriod = (direction) => {
    const amount = direction === 'prev' ? -1 : 1;
    const unit = viewMode === 'week' ? 'week' : 'month';
    setCurrentDate(moment(currentDate).add(amount, unit).toDate());
  };

  // 跳转到今天
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // 获取当前显示的时间段文本
  const getDisplayPeriod = () => {
    if (viewMode === 'week') {
      const start = moment(currentDate).startOf('week').format('MM月DD日');
      const end = moment(currentDate).endOf('week').format('MM月DD日');
      return `${start} - ${end}`;
    }
    return moment(currentDate).format('YYYY年MM月');
  };

  // 渲染周视图
  const renderWeekView = () => {
    const weekDays = [];
    const startOfWeek = moment(currentDate).startOf('week');
    
    for (let i = 0; i < 7; i++) {
      const day = moment(startOfWeek).add(i, 'days');
      const dayEvents = getCurrentEvents().filter(event => 
        moment(event.start).isSame(day, 'day')
      );
      
      weekDays.push({
        date: day.toDate(),
        label: day.format('MM月DD日'),
        dayName: day.format('dddd'),
        events: dayEvents
      });
    }

    return (
      <div className="week-view">
        <div className="week-header">
          {weekDays.map((day, index) => (
            <div key={index} className="day-header">
              <div className="day-name">{day.dayName}</div>
              <div className="day-date">{day.label}</div>
            </div>
          ))}
        </div>
        <div className="week-grid">
          {weekDays.map((day, index) => (
            <div key={index} className="day-column">
              {day.events.map((event, eventIndex) => (
                <div
                  key={event.id}
                  className="event-card"
                  style={{ borderLeftColor: event.color }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-time">
                    {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
                  </div>
                  <div className="event-title">
                    <span className="event-icon">{event.icon}</span>
                    {event.title}
                  </div>
                  <div className="event-location">📍 {event.location}</div>
                  <div className="event-trainer">👨‍🏫 {event.trainer}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染月视图
  const renderMonthView = () => {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const startDate = moment(startOfMonth).startOf('week');
    const endDate = moment(endOfMonth).endOf('week');
    
    const weeks = [];
    let currentWeek = [];
    
    for (let date = moment(startDate); date.isBefore(endDate); date.add(1, 'day')) {
      const dayEvents = getCurrentEvents().filter(event => 
        moment(event.start).isSame(date, 'day')
      );
      
      currentWeek.push({
        date: date.clone(),
        events: dayEvents,
        isCurrentMonth: date.isSame(currentDate, 'month')
      });
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return (
      <div className="month-view">
        <div className="month-header">
          {['日', '一', '二', '三', '四', '五', '六'].map(day => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
        </div>
        <div className="month-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week-row">
              {week.map((day, dayIndex) => (
                <div 
                  key={dayIndex} 
                  className={`day-cell ${!day.isCurrentMonth ? 'other-month' : ''}`}
                >
                  <div className="day-number">{day.date.date()}</div>
                  <div className="day-events">
                    {day.events.slice(0, 3).map((event, index) => (
                      <div
                        key={event.id}
                        className="mini-event"
                        style={{ backgroundColor: event.color }}
                        onClick={() => setSelectedEvent(event)}
                        title={`${event.title} - ${moment(event.start).format('HH:mm')}`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {day.events.length > 3 && (
                      <div className="more-events">+{day.events.length - 3}更多</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染列表视图
  const renderListView = () => {
    const events = getUpcomingEvents();
    
    return (
      <div className="list-view">
        <div className="list-header">
          <h3>即将开始的培训 ({events.length})</h3>
        </div>
        <div className="list-events">
          {events.map(event => (
            <div
              key={event.id}
              className="list-event-card"
              style={{ borderLeftColor: event.color }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="event-date">
                <div className="event-month">{moment(event.start).format('MM月')}</div>
                <div className="event-day">{moment(event.start).format('DD')}</div>
                <div className="event-weekday">{moment(event.start).format('ddd')}</div>
              </div>
              <div className="event-content">
                <div className="event-title-row">
                  <span className="event-icon">{event.icon}</span>
                  <h4>{event.title}</h4>
                  <span className="event-category" style={{ backgroundColor: event.color }}>
                    {event.category}
                  </span>
                </div>
                <div className="event-details">
                  <span className="event-time">🕐 {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</span>
                  <span className="event-location">📍 {event.location}</span>
                  <span className="event-trainer">👨‍🏫 {event.trainer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染事件详情模态框
  const renderEventModal = () => {
    if (!selectedEvent) return null;

    return (
      <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
        <div className="event-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-icon">
              <span className="event-icon-large">{selectedEvent.icon}</span>
            </div>
            <div className="modal-title">
              <h2>{selectedEvent.title}</h2>
              <span className="modal-category" style={{ backgroundColor: selectedEvent.color }}>
                {selectedEvent.category}
              </span>
            </div>
            <button className="modal-close" onClick={() => setSelectedEvent(null)}>×</button>
          </div>
          
          <div className="modal-content">
            <div className="modal-info-grid">
              <div className="info-item">
                <div className="info-label">📅 日期</div>
                <div className="info-value">{moment(selectedEvent.start).format('YYYY年MM月DD日')}</div>
              </div>
              <div className="info-item">
                <div className="info-label">🕐 时间</div>
                <div className="info-value">{moment(selectedEvent.start).format('HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}</div>
              </div>
              <div className="info-item">
                <div className="info-label">📍 地点</div>
                <div className="info-value">{selectedEvent.location}</div>
              </div>
              <div className="info-item">
                <div className="info-label">👨‍🏫 讲师</div>
                <div className="info-value">{selectedEvent.trainer}</div>
              </div>

            </div>
            
            <div className="modal-description">
              <h3>培训内容</h3>
              <p>{selectedEvent.description}</p>
            </div>
            
            {selectedEvent.materials && selectedEvent.materials.length > 0 && (
              <div className="modal-materials">
                <h3>培训资料</h3>
                <div className="material-list">
                  {selectedEvent.materials.map((material, index) => (
                    <div key={index} className="material-item">
                      <span className="material-icon">📄</span>
                      <span className="material-name">{material}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="training-schedule-v2">
      {/* 页面标题 */}
      <div className="page-header">
        <div className="header-content">
          <h1>🚀 培训日程管理</h1>
          <p>系统化学习路径，助您快速掌握机器人技术与智能视觉核心技能</p>
        </div>
      </div>

      <div className="schedule-container">
        {/* 侧边栏 - 筛选和统计 */}
        <aside className="schedule-sidebar">
          {/* 快速操作 */}
          <div className="sidebar-section">
            <h3>快速操作</h3>
            <button className="action-btn today-btn" onClick={goToToday}>
              📅 回到今天
            </button>
          </div>

          {/* 搜索 */}
          <div className="sidebar-section">
            <h3>搜索培训</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="搜索培训内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* 类别筛选 */}
          <div className="sidebar-section">
            <h3>培训类别</h3>
            <div className="category-filters">
              <button
                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                全部
              </button>
              {['基础培训', '技术培训', '实践课程', '项目讨论'].map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 统计信息 */}
          <div className="sidebar-section">
            <h3>培训统计</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{getFilteredEvents().length}</div>
                <div className="stat-label">总培训</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{getUpcomingEvents().length}</div>
                <div className="stat-label">即将开始</div>
              </div>

            </div>
          </div>

          {/* 培训图例 */}
          <div className="sidebar-section">
            <h3>图例说明</h3>
            <div className="legend-items">
              {[
                { category: '基础培训', color: '#3b82f6', icon: '📚' },
                { category: '技术培训', color: '#10b981', icon: '⚡' },
                { category: '实践课程', color: '#f59e0b', icon: '🔧' },
                { category: '项目讨论', color: '#8b5cf6', icon: '🤝' }
              ].map(item => (
                <div key={item.category} className="legend-item">
                  <span className="legend-icon">{item.icon}</span>
                  <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-text">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="schedule-main">
          {/* 控制栏 */}
          <div className="controls-bar">
            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
                onClick={() => setViewMode('week')}
              >
                📅 周视图
              </button>
              <button
                className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
                onClick={() => setViewMode('month')}
              >
                📆 月视图
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                📋 列表视图
              </button>
            </div>

            <div className="navigation-controls">
              <button className="nav-btn" onClick={() => navigatePeriod('prev')}>
                ← 上{viewMode === 'week' ? '周' : viewMode === 'month' ? '月' : ''}
              </button>
              <div className="current-period">
                {viewMode === 'week' 
                  ? `${moment(currentDate).startOf('week').format('MM月DD日')} - ${moment(currentDate).endOf('week').format('MM月DD日')}`
                  : moment(currentDate).format('YYYY年MM月')
                }
              </div>
              <button className="nav-btn" onClick={() => navigatePeriod('next')}>
                下{viewMode === 'week' ? '周' : viewMode === 'month' ? '月' : ''} →
              </button>
            </div>
          </div>

          {/* 日程内容 */}
          <div className="schedule-content">
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'list' && renderListView()}
          </div>
        </main>
      </div>

      {/* 事件详情模态框 */}
      {renderEventModal()}
    </div>
  );
};

export default TrainingScheduleV2;