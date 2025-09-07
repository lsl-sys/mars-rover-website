import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './TrainingScheduleV2.css';

moment.locale('zh-cn');

// 重构后的培训日程组件
const TrainingScheduleV2 = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // 默认显示10月12日
  const [viewMode, setViewMode] = useState('list'); // 'week', 'month', 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 2025年秋季培训活动数据 - 从10月11日开始，持续8周
const trainingEvents = [
  // 第1周 (10月11-12日)
  {
    id: 1,
    title: '电控培训',
    start: new Date(2025, 9, 12, 9, 0, 0), // 10月12日(周六) 9:00
    end: new Date(2025, 9, 12, 11, 0, 0),  // 10月12日(周六) 11:00
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
    color: '#3b82f6',
    icon: '⚡',
    status: 'confirmed',
  },
  {
    id: 2,
    title: '硬件培训',
    start: new Date(2025, 9, 12, 14, 0, 0), // 9月12日(周六) 14:00
    end: new Date(2025, 9, 12, 16, 0, 0),   // 10月12日(周六) 16:00
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
    color: '#10b981',
    icon: '🔧',
    status: 'confirmed',
  },
  {
    id: 3,
    title: '机械培训',
    start: new Date(2025, 9, 12, 16, 10, 0), // 9月12日(周六) 16:9
    end: new Date(2025, 9, 12, 18, 10, 0),  // 10月12日(周六) 18:10
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
    color: '#f59e0b',
    icon: '🎯',
    status: 'confirmed',
  },
  {
    id: 4,
    title: '运营培训',
    start: new Date(2025,9, 12, 19, 0, 0), // 10月13日(周日) 14:00
    end: new Date(2025, 9, 12, 21, 0, 0),  // 10月13日(周日) 16:00
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
    color: '#8b5cf6',
    icon: '📊',
    status: 'confirmed',
  },

  // 第2周 (10月18-19日)
  {
    id: 5,
    title: '电控培训',
    start: new Date(2025, 9, 18, 9, 0, 0), // 10月18日(周六) 9:00
    end: new Date(2025, 9, 18, 11, 0, 0),  // 10月18日(周六) 11:00
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
    color: '#3b82f6',
    icon: '⚡',
    status: 'confirmed',

  },
  {
    id: 6,
    title: '硬件培训',
    start: new Date(2025, 9, 18, 14, 0, 0), // 10月19日(周六) 14:00
    end: new Date(2025, 9, 18, 16, 0, 0),   // 10月19日(周六) 16:00
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
    color: '#10b981',
    icon: '🔧',
    status: 'confirmed',
    materials: ['PCB设计指南.pdf', '焊接工艺手册.docx']
  },
  {
    id: 7,
    title: '机械培训',
    start: new Date(2025, 9, 18, 16, 10, 0), // 10月19日(周六) 16:10
    end: new Date(2025, 9, 18, 18, 10, 0),  // 10月19日(周六) 18:10
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
    color: '#f59e0b',
    icon: '🎯',
    status: 'confirmed',
    materials: ['加工工艺指南.pdf', '装配流程手册.docx']
  },
  {
    id: 8,
    title: '运营培训',
    start: new Date(2025, 9, 19, 14, 0, 0), // 10月20日(周日) 14:00
    end: new Date(2025, 9, 19, 16, 0, 0),  // 10月20日(周日) 16:00
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
    color: '#8b5cf6',
    icon: '📊',
    status: 'confirmed',
    materials: ['文档模板.pdf', '汇报技巧指南.docx']
  },

  // 第3周 (10月25-26日)
  {
    id: 9,
    title: '电控培训',
    start: new Date(2025, 9, 25, 9, 0, 0), // 10月26日(周六) 9:00
    end: new Date(2025, 9, 25, 11, 0, 0),  // 10月26日(周六) 11:00
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
    color: '#3b82f6',
    icon: '⚡',
    status: 'confirmed',
  },
  {
    id: 10,
    title: '硬件培训',
    start: new Date(2025, 9, 25, 14, 0, 0), // 10月26日(周六) 14:00
    end: new Date(2025, 9, 25, 16, 0, 0),   // 10月26日(周六) 16:00
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
    color: '#10b981',
    icon: '🔧',
    status: 'confirmed',
  },
  {
    id: 11,
    title: '机械培训',
    start: new Date(2025, 9, 25, 16, 10, 0), // 10月26日(周六) 16:10
    end: new Date(2025, 9, 25, 18, 10, 0),  // 10月26日(周六) 18:10
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
    color: '#f59e0b',
    icon: '🎯',
    status: 'confirmed',
  },
  {
    id: 12,
    title: '运营培训',
    start: new Date(2025, 9, 26, 14, 0, 0), // 10月27日(周日) 14:00
    end: new Date(2025, 9, 26, 16, 0, 0),  // 10月27日(周日) 16:00
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
    color: '#8b5cf6',
    icon: '📊',
    status: 'confirmed',
  },

  // 第4周 (11月1-2日)
  {
    id: 13,
    title: '电控培训',
    start: new Date(2025, 10, 1, 9, 0, 0), // 11月2日(周六) 9:00
    end: new Date(2025, 10, 1, 11, 0, 0),  // 11月2日(周六) 11:00
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
    color: '#3b82f6',
    icon: '⚡',
    status: 'confirmed',
  },
  {
    id: 14,
    title: '硬件培训',
    start: new Date(2025, 10, 1, 14, 0, 0), // 11月2日(周六) 14:00
    end: new Date(2025, 10, 1, 16, 0, 0),   // 11月2日(周六) 16:00
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
    color: '#10b981',
    icon: '🔧',
    status: 'confirmed',
  },
  {
    id: 15,
    title: '机械培训',
    start: new Date(2025, 10, 1, 16, 10, 0), // 11月2日(周六) 16:10
    end: new Date(2025, 10, 1, 18, 10, 0),  // 11月2日(周六) 18:10
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
    color: '#f59e0b',
    icon: '🎯',
    status: 'confirmed',
  },
  {
    id: 16,
    title: '运营培训',
    start: new Date(2025, 10, 2, 14, 0, 0), // 11月3日(周日) 14:00
    end: new Date(2025, 10, 2, 16, 0, 0),  // 11月3日(周日) 16:00
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
    color: '#8b5cf6',
    icon: '📊',
    status: 'confirmed',
  },

  // 第5周 (11月8-9日)
  {
    id: 17,
    title: '电控培训',
    start: new Date(2025, 10, 8, 9, 0, 0), // 11月9日(周六) 9:00
    end: new Date(2025, 10, 8, 11, 0, 0),  // 11月9日(周六) 11:00
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
    color: '#3b82f6',
    icon: '⚡',
    status: 'confirmed',
  },
  {
    id: 18,
    title: '硬件培训',
    start: new Date(2025, 10, 8, 14, 0, 0), // 11月9日(周六) 14:00
    end: new Date(2025, 10, 8, 16, 0, 0),   // 11月9日(周六) 16:00
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
    color: '#10b981',
    icon: '🔧',
    status: 'confirmed',
  },
  {
    id: 19,
    title: '机械培训',
    start: new Date(2025, 10, 8, 16, 10, 0), // 11月9日(周六) 16:10
    end: new Date(2025, 10, 8, 18, 10, 0),  // 11月9日(周六) 18:10
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
    color: '#f59e0b',
    icon: '🎯',
    status: 'confirmed',
  },
  {
    id: 20,
    title: '运营培训',
    start: new Date(2025, 10, 9, 14, 0, 0), // 11月10日(周日) 14:00
    end: new Date(2025, 10, 9, 16, 0, 0),  // 11月10日(周日) 16:00
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
    color: '#8b5cf6',
    icon: '📊',
    status: 'confirmed',
  },

  // 第6周 (11月15-16日)
  {
    id: 21,
    title: '电控培训',
    start: new Date(2025, 10, 15, 9, 0, 0), // 11月16日(周六) 9:00
    end: new Date(2025, 10, 15, 11, 0, 0),  // 11月16日(周六) 11:00
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
    color: '#3b82f6',
    icon: '⚡',
    status: 'confirmed',
  },
  {
    id: 22,
    title: '硬件培训',
    start: new Date(2025, 10, 15, 14, 0, 0), // 11月16日(周六) 14:00
    end: new Date(2025, 10, 15, 16, 0, 0),   // 11月16日(周六) 16:00
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
    color: '#10b981',
    icon: '🔧',
    status: 'confirmed',
  },
  {
    id: 23,
    title: '机械培训',
    start: new Date(2025, 10, 15, 16, 10, 0), // 11月16日(周六) 16:10
    end: new Date(2025, 10, 15, 18, 10, 0),  // 11月16日(周六) 18:10
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
    color: '#f59e0b',
    icon: '🎯',
    status: 'confirmed',
  },
  {
    id: 24,
    title: '运营培训',
    start: new Date(2025, 10, 16, 14, 0, 0), // 11月17日(周日) 14:00
    end: new Date(2025, 10, 16, 16, 0, 0),  // 11月17日(周日) 16:00
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
    color: '#8b5cf6',
    icon: '📊',
    status: 'confirmed',
  },

  // 第7周 (11月22-23日)
  {
    id: 25,
    title: '电控培训',
    start: new Date(2025, 10, 22, 9, 0, 0), // 11月23日(周六) 9:00
    end: new Date(2025, 10, 22, 11, 0, 0),  // 11月23日(周六) 11:00
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
    color: '#3b82f6',
    icon: '⚡',
    status: 'confirmed',
  },
  {
    id: 26,
    title: '硬件培训',
    start: new Date(2025, 10, 22, 14, 0, 0), // 11月23日(周六) 14:00
    end: new Date(2025, 10, 22, 16, 0, 0),   // 11月23日(周六) 16:00
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
    color: '#10b981',
    icon: '🔧',
    status: 'confirmed',
  },
  {
    id: 27,
    title: '机械培训',
    start: new Date(2025, 10, 22, 16, 10, 0), // 11月23日(周六) 16:10
    end: new Date(2025, 10, 22, 18, 10, 0),  // 11月23日(周六) 18:10
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
    color: '#f59e0b',
    icon: '🎯',
    status: 'confirmed',
  },
  {
    id: 28,
    title: '运营培训',
    start: new Date(2025, 10, 23, 14, 0, 0), // 11月24日(周日) 14:00
    end: new Date(2025, 10, 23, 16, 0, 0),  // 11月24日(周日) 16:00
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
    color: '#8b5cf6',
    icon: '📊',
    status: 'confirmed',
  },

  // 第8周 (11月29-30日)
  {
    id: 29,
    title: '电控培训',
    start: new Date(2025, 10, 29, 9, 0, 0), // 11月30日(周六) 9:00
    end: new Date(2025, 10, 29, 11, 0, 0),  // 11月30日(周六) 11:00
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
    color: '#3b82f6',
    icon: '⚡',
    status: 'confirmed',
  },
  {
    id: 30,
    title: '硬件培训',
    start: new Date(2025, 10, 29, 14, 0, 0), // 11月30日(周六) 14:00
    end: new Date(2025, 10, 29, 16, 0, 0),   // 11月30日(周六) 16:00
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
    color: '#10b981',
    icon: '🔧',
    status: 'confirmed',
  },
  {
    id: 31,
    title: '机械培训',
    start: new Date(2025, 10, 29, 16, 10, 0), // 11月30日(周六) 16:10
    end: new Date(2025, 10, 29, 18, 10, 0),  // 11月30日(周六) 18:10
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
    color: '#f59e0b',
    icon: '🎯',
    status: 'confirmed',
  },
  {
    id: 32,
    title: '运营培训',
    start: new Date(2025, 10, 30, 14, 0, 0), // 12月1日(周日) 14:00
    end: new Date(2025, 10, 30, 16, 0, 0),  // 12月1日(周日) 16:00
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
    color: '#8b5cf6',
    icon: '📊',
    status: 'confirmed',
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