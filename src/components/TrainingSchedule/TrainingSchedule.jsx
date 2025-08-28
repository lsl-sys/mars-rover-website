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
    description: '讨论项目进展和遇到的技术问题',
    location: '创新中心 会议室',
    trainer: '全体',
    category: '项目讨论',
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
      <div className="schedule-header">
        <h1>重邮-京东未来智能视觉联合研究实践基地培训日程</h1>
        <p>系统化的培训计划，助您快速掌握机器人技术与智能视觉核心技能</p>
      </div>
      
      <div className="schedule-content">
        <div className="schedule-sidebar">
          <h2>培训信息</h2>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">培训类型</div>
            <div className="sidebar-info-text">
              • 基础培训：火星车基础知识介绍<br/>
              • 技术培训：专业技能深入学习<br/>
              • 实践课程：动手操作与实践<br/>
              • 项目讨论：团队协作与项目规划
            </div>
          </div>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">参与须知</div>
            <div className="sidebar-info-text">
              • 请提前5分钟到达培训地点<br/>
              • 带好笔记本和相关学习资料<br/>
              • 技术培训建议自带电脑<br/>
            </div>
          </div>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">培训讲师</div>
            <div className="sidebar-info-text">
              我们的培训讲师由经验丰富的团队成员担任，涵盖机械、电子、编程等多个领域，确保您获得专业的指导。
            </div>
          </div>
          
          <div className="legend">
            <h3>图例</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                <span className="legend-text">基础培训</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                <span className="legend-text">技术培训</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="legend-text">实践课程</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
                <span className="legend-text">培训讨论</span>
              </div>
            </div>
          </div>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">联系我们</div>
            <div className="sidebar-info-text">
              如有任何疑问，请联系培训负责人：<br/>
              邮箱：<br/>
                站长：m15397763602.com<br/>
              QQ：<br/>
                机械：2046349636<br/>
                硬件：1211056910<br/>
                电控：3513992041<br/>
            </div>
          </div>
        </div>
        
        <div className="schedule-main">
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

          {/* 即将开始的培训 */}
          <div className="upcoming-trainings">
            <h2>即将开始的培训</h2>
            <ul className="upcoming-events">
              {events
                .filter(event => event.start >= new Date())
                .sort((a, b) => a.start - b.start)
                .slice(0, 3)
                .map(event => (
                  <li key={event.id} className="upcoming-event">
                    <h3>{event.title}</h3>
                    <p><span className="event-time">{moment(event.start).format('YYYY年MM月DD日 HH:mm')} - {moment(event.end).format('HH:mm')}</span></p>
                    <p>{event.location}</p>
                    <p>讲师：{event.trainer}</p>
                    <p>类型：<span style={{ color: eventPropGetter(event).style.backgroundColor, fontWeight: 'bold' }}>{event.category}</span></p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>

      {/* 事件详情弹窗 */}
      {selectedEvent && (
        <div className="event-detail-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <button className="close-button" onClick={closeEventDetail}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-detail">
                <span className="modal-label">时间：</span>
                <span className="modal-value">
                  {moment(selectedEvent.start).format('YYYY年MM月DD日 HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}
                </span>
              </div>
              <div className="modal-detail">
                <span className="modal-label">地点：</span>
                <span className="modal-value">{selectedEvent.location}</span>
              </div>
              <div className="modal-detail">
                <span className="modal-label">讲师：</span>
                <span className="modal-value">{selectedEvent.trainer}</span>
              </div>
              <div className="modal-detail">
                <span className="modal-label">类型：</span>
                <span className="modal-value" style={{ color: eventPropGetter(selectedEvent).style.backgroundColor, fontWeight: 'bold' }}>
                  {selectedEvent.category}
                </span>
              </div>
              <div className="modal-detail">
                <span className="modal-label">描述：</span>
                <span className="modal-value">{selectedEvent.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSchedule;