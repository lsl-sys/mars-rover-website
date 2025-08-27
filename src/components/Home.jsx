import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-gradient"></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <div className="hero-tagline">🚀 探索与创新的起点</div>
            <h1 className="hero-title">探索未知<br/>成就未来</h1>
            <p className="hero-description">
              加入火星车组织，一起参与激动人心的机器人技术与太空探索<br/>
              无论你是机械爱好者、编程达人还是小白，我们都欢迎你的加入
            </p>
            <div className="cta-buttons">
              <Link to="/apply" className="btn-primary">立即申请加入</Link>
              <div className="secondary-buttons">
                <Link to="/schedule" className="btn-secondary">查看培训日程</Link>
                <Link to="/materials" className="btn-secondary">查看培训资料</Link>
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
              <div className="hero-decor">
                <div className="decor-circle circle-1"></div>
                <div className="decor-circle circle-2"></div>
                <div className="decor-circle circle-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">5000+</div>
            <div className="stat-label">项目小时</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">获奖经历</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <div className="stat-label">团队成员</div>
          </div>
        </div>
      </section>

      {/* 组织介绍 */}
      <section className="about-section">
        <h2>关于我们</h2>
        <p>火星车组织是一个致力于机器人技术研发和太空探索的创新团队。我们的成员来自不同背景，但都怀揣着对科技的热爱和对未知的好奇。</p>
        <div className="features">
          <div className="feature-card">
            <h3>技术创新</h3>
            <p>我们不断探索前沿技术，研发先进的机器人系统</p>
          </div>
          <div className="feature-card">
            <h3>团队协作</h3>
            <p>多元化的团队成员共同协作，解决复杂挑战</p>
          </div>
          <div className="feature-card">
            <h3>实践育人</h3>
            <p>通过实际项目培养成员的技术能力和创新思维</p>
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className="projects-section">
        <h2>我们的项目</h2>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-card-content">
              <h3>智能火星车研发</h3>
              <p>开发适应复杂地形的智能火星探测车，搭载先进的传感器系统和自主导航算法，能够在极端环境中完成科学探测任务。</p>
            </div>
          </div>
          <div className="project-card">
            <div className="project-card-content">
              <h3>机器人竞赛</h3>
              <p>参与各类机器人竞赛，包括FRC、RoboMaster等国际赛事，屡获佳绩，展示我们的技术实力和团队协作精神。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;