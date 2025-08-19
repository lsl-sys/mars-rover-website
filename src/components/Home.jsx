import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>探索未知，成就未来</h1>
          <p>加入火星车组织，一起参与激动人心的机器人技术与太空探索</p>
          <div className="cta-buttons">
            <Link to="/apply" className="btn-primary">立即申请</Link>
            <Link to="/schedule" className="btn-secondary">查看培训日程</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/mars_rover.svg" alt="NASA 火星车" style={{ display: 'none' }} />
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
            <img src="/rover_project.svg" alt="火星车项目" style={{ display: 'none' }} />
            <h3>智能火星车研发</h3>
            <p>开发适应复杂地形的智能火星探测车</p>
          </div>
          <div className="project-card">
            <img src="/robot_competition.svg" alt="机器人竞赛" style={{ display: 'none' }} />
            <h3>机器人竞赛</h3>
            <p>参与各类机器人竞赛，屡获佳绩</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;