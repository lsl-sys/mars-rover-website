import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import AnimatedNumber from './Common/AnimatedNumber';

const Home = () => {
  return (
    <div className="home-container">
      {/* 英雄区域 - 包含宣传片 */}
      <section className="hero-section">
        <div className="hero-gradient"></div>
        <div className="hero-overlay"></div>
        <div className="hero-decor">
          <div className="decor-circle circle-1"></div>
          <div className="decor-circle circle-2"></div>
          <div className="decor-circle circle-3"></div>
        </div>
        
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <div className="hero-tagline">重邮-京东未来智能视觉联合研究实践基地</div>
            <h1 className="hero-title">探索未来 · 智造不凡</h1>
            <p className="hero-description">
              加入我们的火星车团队，一起探索人工智能与机器人技术的无限可能。
              从理论学习到实践创新，从个人成长到团队协作，这里是你梦想起航的地方。
            </p>
            
            {/* 宣传片视频 */}
            <div className="promo-video-container">
              <h2 className="promo-title">🎬 2025招新宣传片</h2>
              <div className="video-wrapper">
                <video 
                  className="promo-video" 
                  controls 
                  poster="/mars_rover.jpg"
                  preload="metadata"
                >
                  <source src="/video1.mp4" type="video/mp4" />
                  您的浏览器不支持视频播放。
                </video>
              </div>
              <p className="video-caption">
                观看我们的招新宣传片，了解团队风采与培养体系
              </p>
            </div>

            <div className="cta-buttons">
              <Link to="/apply" className="btn-primary hero-btn">
                🚀 立即报名
              </Link>
              <div className="secondary-buttons">
                <Link to="/schedule" className="btn-secondary">
                  📅 查看日程
                </Link>
                <Link to="/contact" className="btn-secondary">
                  💬 联系我们
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="hero-illustration">
              <div className="rover-icon">
                <div className="rover-body">
                  <div className="rover-top"></div>
                  <div className="rover-camera"></div>
                  <div className="rover-wheels">
                    <div className="wheel"></div>
                    <div className="wheel"></div>
                    <div className="wheel"></div>
                    <div className="wheel"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">
              <AnimatedNumber value={50} suffix="+" />
            </div>
            <div className="stat-label">团队成员</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <AnimatedNumber value={15} suffix="+" />
            </div>
            <div className="stat-label">创新项目</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <AnimatedNumber value={8} suffix="+" />
            </div>
            <div className="stat-label">技术方向</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <AnimatedNumber value={95} suffix="%" />
            </div>
            <div className="stat-label">就业率</div>
          </div>
        </div>
      </section>

      {/* 关于我们 */}
      <section className="about-section">
        <h2>关于我们</h2>
        <p>
          重邮-京东未来智能视觉联合研究实践基地是一个专注于人工智能、机器人技术和计算机视觉的创新团队。
          我们致力于培养具有创新精神和实践能力的高素质人才，为学生提供从理论学习到项目实践的全方位培养。
        </p>
        <div className="team-gallery">
          <img src="/photo/a1.jpg" alt="团队活动" className="team-photo" />
          <img src="/photo/b1.jpg" alt="项目展示" className="team-photo" />
          <img src="/photo/c1.jpg" alt="学习交流" className="team-photo" />
        </div>
        <div className="features">
          <div className="feature-card">
            <h3>💡 创新培养</h3>
            <p>从基础理论到前沿技术，系统化的培养体系让每位成员都能快速成长。</p>
          </div>
          <div className="feature-card">
            <h3>🤝 团队协作</h3>
            <p>多元化的团队文化，鼓励跨学科合作，培养解决复杂问题的能力。</p>
          </div>
          <div className="feature-card">
            <h3>🎓 实践导向</h3>
            <p>真实项目驱动，从需求分析到产品落地，完整体验工程开发流程。</p>
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className="projects-section">
        <h2>优秀项目展示</h2>
        <div className="project-grid">
          <div className="project-card">
            <img src="/rover_project.jpg" alt="火星车项目" className="project-image" />
            <div className="project-card-content">
              <h3>智能火星车</h3>
              <p>基于ROS系统的智能火星车，集成SLAM、路径规划和计算机视觉技术，实现自主导航和环境感知。</p>
            </div>
          </div>
          <div className="project-card">
            <img src="/robot_competition.jpg" alt="机器人竞赛" className="project-image" />
            <div className="project-card-content">
              <h3>机器人竞赛系统</h3>
              <p>参加全国大学生机器人竞赛，开发具备复杂任务执行能力的机器人系统，多次获得优异成绩。</p>
            </div>
          </div>
          <div className="project-card">
            <img src="/mars_rover.jpg" alt="AI视觉系统" className="project-image" />
            <div className="project-card-content">
              <h3>AI视觉识别</h3>
              <p>基于深度学习的视觉识别系统，实现物体检测、人脸识别、场景理解等功能。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;