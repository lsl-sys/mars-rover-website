import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TrainingSchedule.css';

// 配置本地化
const localizer = momentLocalizer(moment);
moment.locale('zh-cn');

// 2024年秋季培训活动数据 - 从10月11日开始，持续8周
const mockTrainingEvents = [
  // 第1周 (10月11-12日)
  {
    id: 1,
    title: '电控培训',
    start: new Date(2024, 9, 12, 9, 0, 0), // 10月12日(周六) 9:00
    end: new Date(2024, 9, 12, 11, 0, 0),  // 10月12日(周六) 11:00
    description: '电控系统基础知识和实践操作培训',
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
  },
  {
    id: 2,
    title: '硬件培训',
    start: new Date(2024, 9, 12, 14, 0, 0), // 10月12日(周六) 14:00
    end: new Date(2024, 9, 12, 16, 0, 0),   // 10月12日(周六) 16:00
    description: '硬件电路设计和元器件选型培训',
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
  },
  {
    id: 3,
    title: '机械培训',
    start: new Date(2024, 9, 12, 16, 10, 0), // 10月12日(周六) 16:10
    end: new Date(2024, 9, 12, 18, 10, 0),  // 10月12日(周六) 18:10
    description: '机械结构设计和3D建模培训',
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
  },
  {
    id: 4,
    title: '运营培训',
    start: new Date(2024, 9, 13, 14, 0, 0), // 10月13日(周日) 14:00
    end: new Date(2024, 9, 13, 16, 0, 0),  // 10月13日(周日) 16:00
    description: '项目管理和团队协作运营培训',
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
  },

  // 第2周 (10月18-19日)
  {
    id: 5,
    title: '电控培训',
    start: new Date(2024, 9, 19, 9, 0, 0), // 10月19日(周六) 9:00
    end: new Date(2024, 9, 19, 11, 0, 0),  // 10月19日(周六) 11:00
    description: '电控系统进阶知识和实践操作培训',
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
  },
  {
    id: 6,
    title: '硬件培训',
    start: new Date(2024, 9, 19, 14, 0, 0), // 10月19日(周六) 14:00
    end: new Date(2024, 9, 19, 16, 0, 0),   // 10月19日(周六) 16:00
    description: 'PCB设计和焊接工艺培训',
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
  },
  {
    id: 7,
    title: '机械培训',
    start: new Date(2024, 9, 19, 16, 10, 0), // 10月19日(周六) 16:10
    end: new Date(2024, 9, 19, 18, 10, 0),  // 10月19日(周六) 18:10
    description: '机械加工和装配工艺培训',
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
  },
  {
    id: 8,
    title: '运营培训',
    start: new Date(2024, 9, 20, 14, 0, 0), // 10月20日(周日) 14:00
    end: new Date(2024, 9, 20, 16, 0, 0),  // 10月20日(周日) 16:00
    description: '文档撰写和项目汇报技巧培训',
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
  },

  // 第3周 (10月25-26日)
  {
    id: 9,
    title: '电控培训',
    start: new Date(2024, 9, 26, 9, 0, 0), // 10月26日(周六) 9:00
    end: new Date(2024, 9, 26, 11, 0, 0),  // 10月26日(周六) 11:00
    description: '传感器应用和数据采集培训',
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
  },
  {
    id: 10,
    title: '硬件培训',
    start: new Date(2024, 9, 26, 14, 0, 0), // 10月26日(周六) 14:00
    end: new Date(2024, 9, 26, 16, 0, 0),   // 10月26日(周六) 16:00
    description: '电源管理和EMC设计培训',
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
  },
  {
    id: 11,
    title: '机械培训',
    start: new Date(2024, 9, 26, 16, 10, 0), // 10月26日(周六) 16:10
    end: new Date(2024, 9, 26, 18, 10, 0),  // 10月26日(周六) 18:10
    description: '材料力学和结构强度分析培训',
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
  },
  {
    id: 12,
    title: '运营培训',
    start: new Date(2024, 9, 27, 14, 0, 0), // 10月27日(周日) 14:00
    end: new Date(2024, 9, 27, 16, 0, 0),  // 10月27日(周日) 16:00
    description: '团队建设和沟通技巧培训',
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
  },

  // 第4周 (11月1-2日)
  {
    id: 13,
    title: '电控培训',
    start: new Date(2024, 10, 2, 9, 0, 0), // 11月2日(周六) 9:00
    end: new Date(2024, 10, 2, 11, 0, 0),  // 11月2日(周六) 11:00
    description: '控制算法和PID调参培训',
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
  },
  {
    id: 14,
    title: '硬件培训',
    start: new Date(2024, 10, 2, 14, 0, 0), // 11月2日(周六) 14:00
    end: new Date(2024, 10, 2, 16, 0, 0),   // 11月2日(周六) 16:00
    description: '通信接口和协议设计培训',
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
  },
  {
    id: 15,
    title: '机械培训',
    start: new Date(2024, 10, 2, 16, 10, 0), // 11月2日(周六) 16:10
    end: new Date(2024, 10, 2, 18, 10, 0),  // 11月2日(周六) 18:10
    description: '运动学和动力学分析培训',
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
  },
  {
    id: 16,
    title: '运营培训',
    start: new Date(2024, 10, 3, 14, 0, 0), // 11月3日(周日) 14:00
    end: new Date(2024, 10, 3, 16, 0, 0),  // 11月3日(周日) 16:00
    description: '风险管理和应急预案培训',
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
  },

  // 第5周 (11月8-9日)
  {
    id: 17,
    title: '电控培训',
    start: new Date(2024, 10, 9, 9, 0, 0), // 11月9日(周六) 9:00
    end: new Date(2024, 10, 9, 11, 0, 0),  // 11月9日(周六) 11:00
    description: '嵌入式系统开发和调试培训',
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
  },
  {
    id: 18,
    title: '硬件培训',
    start: new Date(2024, 10, 9, 14, 0, 0), // 11月9日(周六) 14:00
    end: new Date(2024, 10, 9, 16, 0, 0),   // 11月9日(周六) 16:00
    description: '信号完整性和时序分析培训',
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
  },
  {
    id: 19,
    title: '机械培训',
    start: new Date(2024, 10, 9, 16, 10, 0), // 11月9日(周六) 16:10
    end: new Date(2024, 10, 9, 18, 10, 0),  // 11月9日(周六) 18:10
    description: '精密制造和装配工艺培训',
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
  },
  {
    id: 20,
    title: '运营培训',
    start: new Date(2024, 10, 10, 14, 0, 0), // 11月10日(周日) 14:00
    end: new Date(2024, 10, 10, 16, 0, 0),  // 11月10日(周日) 16:00
    description: '项目评估和成果展示培训',
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
  },

  // 第6周 (11月15-16日)
  {
    id: 21,
    title: '电控培训',
    start: new Date(2024, 10, 16, 9, 0, 0), // 11月16日(周六) 9:00
    end: new Date(2024, 10, 16, 11, 0, 0),  // 11月16日(周六) 11:00
    description: '无线通信和远程控制培训',
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
  },
  {
    id: 22,
    title: '硬件培训',
    start: new Date(2024, 10, 16, 14, 0, 0), // 11月16日(周六) 14:00
    end: new Date(2024, 10, 16, 16, 0, 0),   // 11月16日(周六) 16:00
    description: '可靠性设计和测试方法培训',
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
  },
  {
    id: 23,
    title: '机械培训',
    start: new Date(2024, 10, 16, 16, 10, 0), // 11月16日(周六) 16:10
    end: new Date(2024, 10, 16, 18, 10, 0),  // 11月16日(周六) 18:10
    description: '创新设计和优化方法培训',
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
  },
  {
    id: 24,
    title: '运营培训',
    start: new Date(2024, 10, 17, 14, 0, 0), // 11月17日(周日) 14:00
    end: new Date(2024, 10, 17, 16, 0, 0),  // 11月17日(周日) 16:00
    description: '总结汇报和持续改进培训',
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
  },

  // 第7周 (11月22-23日)
  {
    id: 25,
    title: '电控培训',
    start: new Date(2024, 10, 23, 9, 0, 0), // 11月23日(周六) 9:00
    end: new Date(2024, 10, 23, 11, 0, 0),  // 11月23日(周六) 11:00
    description: '系统集成和整体调试培训',
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
  },
  {
    id: 26,
    title: '硬件培训',
    start: new Date(2024, 10, 23, 14, 0, 0), // 11月23日(周六) 14:00
    end: new Date(2024, 10, 23, 16, 0, 0),   // 11月23日(周六) 16:00
    description: '故障诊断和维修技能培训',
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
  },
  {
    id: 27,
    title: '机械培训',
    start: new Date(2024, 10, 23, 16, 10, 0), // 11月23日(周六) 16:10
    end: new Date(2024, 10, 23, 18, 10, 0),  // 11月23日(周六) 18:10
    description: '项目实战和案例分析培训',
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
  },
  {
    id: 28,
    title: '运营培训',
    start: new Date(2024, 10, 24, 14, 0, 0), // 11月24日(周日) 14:00
    end: new Date(2024, 10, 24, 16, 0, 0),  // 11月24日(周日) 16:00
    description: '职业规划和发展指导培训',
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
  },

  // 第8周 (11月29-30日)
  {
    id: 29,
    title: '电控培训',
    start: new Date(2024, 10, 30, 9, 0, 0), // 11月30日(周六) 9:00
    end: new Date(2024, 10, 30, 11, 0, 0),  // 11月30日(周六) 11:00
    description: '项目总结和成果展示培训',
    location: '实验楼 A108',
    trainer: '电控组',
    category: '技术培训',
  },
  {
    id: 30,
    title: '硬件培训',
    start: new Date(2024, 10, 30, 14, 0, 0), // 11月30日(周六) 14:00
    end: new Date(2024, 10, 30, 16, 0, 0),   // 11月30日(周六) 16:00
    description: '技术文档撰写和知识分享培训',
    location: '实验楼 A108',
    trainer: '硬件组',
    category: '技术培训',
  },
  {
    id: 31,
    title: '机械培训',
    start: new Date(2024, 10, 30, 16, 10, 0), // 11月30日(周六) 16:10
    end: new Date(2024, 10, 30, 18, 10, 0),  // 11月30日(周六) 18:10
    description: '创新项目设计和未来规划培训',
    location: '实验楼 A108',
    trainer: '机械组',
    category: '技术培训',
  },
  {
    id: 32,
    title: '运营培训',
    start: new Date(2024, 11, 1, 14, 0, 0), // 12月1日(周日) 14:00
    end: new Date(2024, 11, 1, 16, 0, 0),  // 12月1日(周日) 16:00
    description: '项目结题和成果汇报培训',
    location: '实验楼 A108',
    trainer: '运营组',
    category: '基础培训',
  },
];

const TrainingSchedule = () => {
  const [events, setEvents] = useState(mockTrainingEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 12)); // 默认显示10月12日

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
                站长：m15397763602@163.com<br/>
              QQ：<br/>
                基地总负责人:2177707887<br/>
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