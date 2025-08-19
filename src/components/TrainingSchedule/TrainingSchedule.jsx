import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TrainingSchedule.css';

// 配置本地化
const localizer = momentLocalizer(moment);
moment.locale('zh-cn');

// 模拟培训活动数据
const mockTrainingEvents = [
  {
    id: 1,
    title: '机械',
    start: new Date(2025, 8, 1, 14, 0, 0), // 9月1日 14:00
    end: new Date(2025, 8, 1, 16, 0, 0),   // 9月1日 16:00
    description: '介绍火星车的基本结构、工作原理和发展历程',
    location: '教学楼 B301',
    trainer: '廖',
    category: '基础培训',
  },
  {
    id: 2,
    title: '机械设计实践课',
    start: new Date(2025, 8, 3, 10, 0, 0), // 9月3日 10:00
    end: new Date(2025, 8, 3, 12, 0, 0),   // 9月3日 12:00
    description: '学习火星车机械结构设计的基本原则和方法',
    location: '教学楼 B101',
    trainer: '李',
    category: '实践课程',
  },
  {
    id: 3,
    title: '电子电路设计',
    start: new Date(2025, 8, 5, 14, 0, 0), // 9月5日 14:00
    end: new Date(2025, 8, 5, 17, 0, 0),   // 9月5日 17:00
    description: '学习火星车电子系统设计和电路原理',
    location: '教学楼 A205',
    trainer: '刘',
    category: '技术培训',
  },
  {
    id: 4,
    title: '教学楼 编程控制入门',
    start: new Date(2025, 8, 8, 14, 0, 0), // 9月8日 14:00
    end: new Date(2025, 8, 8, 16, 0, 0),   // 9月8日 16:00
    description: '介绍火星车控制系统的编程方法和常用算法',
    location: 'A302',
    trainer: '王',
    category: '技术培训',
  },
  {
    id: 5,
    title: '小组项目讨论',
    start: new Date(2025, 8, 10, 10, 0, 0), // 9月10日 10:00
    end: new Date(2025, 8, 10, 12, 0, 0),   // 9月10日 12:00
    description: '讨论项到的问题',
    location: '创新中心 会议室',
    trainer: '全体',
    category: '讨论',
  },
];

const TrainingSchedule = () => {
  const [events, setEvents] = useState(mockTrainingEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // 默认显示9月1日

  // 模拟数据加载
  useEffect(() => {
    // 在实际项目中，这里会从服务器获取培训日程数据
    console.log('加载培训日程数据');
  }, []);

  // 自定义事件样式
  const eventPropGetter = (event) => {
    let style = {}
    switch (event.category) {
      case '基础培训':
        style = { backgroundColor: '#3b82f6', color: 'white' };
        break;
      case '技术培训':
        style = { backgroundColor: '#10b981', color: 'white' };
        break;
      case '实践课程':
        style = { backgroundColor: '#f59e0b', color: 'white' };
        break;
      case '项目讨论':
        style = { backgroundColor: '#8b5cf6', color: 'white' };
        break;
      default:
        style = { backgroundColor: '#6b7280', color: 'white' };
    }
    return { style };
  };

  // 处理事件点击
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // 关闭事件详情弹窗
  const closeEventDetail = () => {
    setSelectedEvent(null);
  };

  // 自定义事件组件
  const EventComponent = ({ event }) => {
    return (
      <div className="custom-event">
        <div className="event-title">{event.title}</div>
        <div className="event-time">
          {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
        </div>
      </div>
    );
  };

  return (
    <div className="training-schedule-container">
      <h2>火星车组织培训日程</h2>
      <p>以下是我们的培训安排，欢迎准时参加！</p>

      {/* 日历控制栏 */}
      <div className="calendar-controls">
        <button 
          className="control-btn"
          onClick={() => setCurrentDate(moment(currentDate).subtract(1, view === 'week' ? 'week' : 'month').toDate())}
        >
          上{view === 'week' ? '周' : '月'}
        </button>
        <h3 className="current-date">
          {view === 'week' 
            ? `${moment(currentDate).startOf('week').format('YYYY年MM月DD日')} - ${moment(currentDate).endOf('week').format('YYYY年MM月DD日')}`
            : moment(currentDate).format('YYYY年MM月')
          }
        </h3>
        <button 
          className="control-btn"
          onClick={() => setCurrentDate(moment(currentDate).add(1, view === 'week' ? 'week' : 'month').toDate())}
        >
          下{view === 'week' ? '周' : '月'}
        </button>
        <div className="view-buttons">
          <button 
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            周视图
          </button>
          <button 
            className={`view-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            月视图
          </button>
        </div>
      </div>

      {/* 图例 */}
      <div className="legend">
        <h4>图例</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
            <span>基础培训</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
            <span>技术培训</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>实践课程</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
            <span>项目讨论</span>
          </div>
        </div>
      </div>

      {/* 日历组件 */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          view={view}
          views={['week', 'month']}
          date={currentDate}
          onNavigate={date => setCurrentDate(date)}
          onView={newView => setView(newView)}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventPropGetter}
          components={{ event: EventComponent }}
          step={60}
          timeslots={1}
          defaultTimedEventDuration={moment.duration(2, 'hours')}
          min={new Date(0, 0, 0, 8, 0, 0)} // 最早显示8:00
          max={new Date(0, 0, 0, 20, 0, 0)} // 最晚显示20:00
        />
      </div>

      {/* 事件详情弹窗 */}
      {selectedEvent && (
        <div className="event-detail-modal">
          <div className="event-detail-overlay" onClick={closeEventDetail}></div>
          <div className="event-detail-content">
            <button className="close-btn" onClick={closeEventDetail}>×</button>
            <h3>{selectedEvent.title}</h3>
            <div className="event-detail-info">
              <div className="info-row">
                <span className="info-label">时间：</span>
                <span className="info-value">
                  {moment(selectedEvent.start).format('YYYY年MM月DD日 HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">地点：</span>
                <span className="info-value">{selectedEvent.location}</span>
              </div>
              <div className="info-row">
                <span className="info-label">讲师：</span>
                <span className="info-value">{selectedEvent.trainer}</span>
              </div>
              <div className="info-row">
                <span className="info-label">类型：</span>
                <span className="info-value category-badge" style={{ backgroundColor: eventPropGetter(selectedEvent).style.backgroundColor }}>
                  {selectedEvent.category}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">描述：</span>
                <span className="info-value">{selectedEvent.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 即将开始的培训 */}
      <div className="upcoming-trainings">
        <h3>即将开始的培训</h3>
        <div className="upcoming-events">
          {events
            .filter(event => event.start >= new Date())
            .sort((a, b) => a.start - b.start)
            .slice(0, 3)
            .map(event => (
              <div key={event.id} className="upcoming-event-card">
                <div className="event-date">
                  {moment(event.start).format('MM/DD')}
                </div>
                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p>{moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')} | {event.location}</p>
                </div>
                <div 
                  className="event-category" 
                  style={{ backgroundColor: eventPropGetter(event).style.backgroundColor }}
                >
                  {event.category}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default TrainingSchedule;