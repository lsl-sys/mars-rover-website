import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScreenSize } from '../hooks/useScreenSize';
import MobileHome from './MobileHome';
import LoadingSpinner from './Common/LoadingSpinner';
import './Home.css';

const AnimatedNumber = ({ targetValue, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    const targetNum = parseInt(targetValue);
    const increment = targetNum / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCurrentValue(targetNum);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [targetValue, duration]);
  
  return <>{currentValue}{targetValue.includes('+') ? '+' : ''}</>;
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const { isMobile } = useScreenSize();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 模拟图片加载
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(loadTimer);
  }, []);

  // 如果是移动端，渲染专门的移动端组件
  if (isMobile) {
    return <MobileHome />;
  }

  if (isLoading) {
    return (
      <div className="home-loading">
        <LoadingSpinner size="large" text="正在加载精彩内容..." />
      </div>
    );
  }
  
  return (
    <div className="home-container">
      {/* 宣传片区域 - 放在最顶部 */}
      <section className="promo-section">
        <div className="promo-container">
          <h2 className="promo-title">
            🚀 2025火星车团队招新宣传片
          </h2>
          <div className="promo-video-wrapper">
            <video 
              className="promo-video"
              controls 
              poster="/recruitment_video_poster.jpg"
              preload="metadata"
            >
              <source src="/recruitment_video.mp4" type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
          </div>
          <p className="promo-description">
            加入我们，一起探索火星的奥秘！观看2025年火星车团队招新宣传片，
            了解我们的创新项目、技术突破和团队精神。
          </p>
          <div className="promo-actions">
            <a href="/recruitment" className="promo-btn-primary">
              🎯 立即报名
            </a>
            <a href="/about" className="promo-btn-secondary">
              📖 了解计划详情
            </a>
          </div>
        </div>
      </section>

      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🚀</span>
            <span className="badge-text">火星探索先锋</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">探索红色星球</span>
            <span className="title-line highlight">创造无限可能</span>
          </h1>
          <p className="hero-description">
            我们是一支充满激情的火星车研发团队，致力于推动中国深空探测技术发展。
            通过创新设计与精密工程，我们正在打造下一代火星探索机器人。
          </p>
          <div className="hero-actions">
            <a href="/projects" className="btn-primary large">
              探索我们的项目
              <span className="btn-arrow">→</span>
            </a>
            <div className="btn-group">
              <a href="/team" className="btn-secondary">
                <span>👥</span>
                认识团队
              </a>
              <a href="/contact" className="btn-secondary">
                <span>📧</span>
                联系我们
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="stats-section">
        <div className="stats-container">
          <h2 className="section-title">我们的成就</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-number">
                <AnimatedNumber value={15} />
              </div>
              <div className="stat-label">获奖项目</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👨‍💻</div>
              <div className="stat-number">
                <AnimatedNumber value={50} />
              </div>
              <div className="stat-label">团队成员</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-number">
                <AnimatedNumber value={3} />
              </div>
              <div className="stat-label">年研发经验</div>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我们 */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title">关于我们</h2>
          <p className="about-description">
            火星车团队汇聚了来自机械工程、电子工程、计算机科学、人工智能等多个领域的优秀人才。
            我们秉持着探索未知、追求卓越的精神，致力于开发能够在火星极端环境下稳定运行的智能机器人系统。
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                🤖
              </div>
              <div className="feature-content">
                <h3 className="feature-title">智能机器人技术</h3>
                <p className="feature-description">
                  开发具备自主导航、环境感知和任务执行能力的火星车系统
                </p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                🛰️
              </div>
              <div className="feature-content">
                <h3 className="feature-title">深空通信系统</h3>
                <p className="feature-description">
                  研究火星与地球之间的高效通信解决方案
                </p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                🔬
              </div>
              <div className="feature-content">
                <h3 className="feature-title">科学探测设备</h3>
                <p className="feature-description">
                  设计能够在火星环境下工作的科学探测仪器
                </p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                ⚡
              </div>
              <div className="feature-content">
                <h3 className="feature-title">能源管理系统</h3>
                <p className="feature-description">
                  优化火星车的能源利用效率和续航能力
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className="projects-section">
        <div className="projects-container">
          <h2 className="section-title">重点项目</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image-container">
                <img src="/project-mars-rover.jpg" alt="火星车原型" className="project-image" />
                <div className="project-overlay">
                  <div className="project-icon" style={{ background: 'rgba(59, 130, 246, 0.9)' }}>
                    🤖
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">火星车原型</h3>
                <p className="project-description">
                  基于真实火星环境需求设计的六轮驱动火星车原型，具备强大的越障能力和科学探测功能。
                </p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image-container">
                <img src="/project-ai-navigation.jpg" alt="AI导航系统" className="project-image" />
                <div className="project-overlay">
                  <div className="project-icon" style={{ background: 'rgba(16, 185, 129, 0.9)' }}>
                    🧠
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">AI导航系统</h3>
                <p className="project-description">
                  利用深度学习和计算机视觉技术，实现火星车在复杂地形中的自主导航和路径规划。
                </p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image-container">
                <img src="/project-solar-panel.jpg" alt="太阳能系统" className="project-image" />
                <div className="project-overlay">
                  <div className="project-icon" style={{ background: 'rgba(245, 158, 11, 0.9)' }}>
                    ☀️
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">高效太阳能系统</h3>
                <p className="project-description">
                  专为火星环境设计的太阳能发电系统，具备自动清洁和角度调节功能，确保稳定供电。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;