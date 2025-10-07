import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScreenSize } from '../hooks/useScreenSize';
import MobileHome from './MobileHome';
import LoadingSpinner from './Common/LoadingSpinner';
import './Home.css';



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
      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-gradient"></div>
        <div className="hero-overlay"></div>
        
        {/* 背景视频 */}
        <div className="background-video-container">           <video 
              className="background-video" 
              playsInline
              loop
              preload="metadata"
              poster="/mars_rover.jpg"
              ref={(video) => {
                if (video) {
                  // 自动尝试播放，失败则等待用户交互
                  const tryAutoPlay = async () => {
                    try {
                      await video.play();
                      console.log('自动播放成功');
                    } catch (error) {
                      console.log('自动播放失败，等待用户交互');
                      // 添加交互事件监听器
                      document.addEventListener('click', playOnInteraction);
                      document.addEventListener('scroll', playOnInteraction);
                      document.addEventListener('keydown', playOnInteraction);
                      document.addEventListener('touchstart', playOnInteraction);
                    }
                  };

                  const playOnInteraction = async () => {
                    try {
                      video.volume = 1;
                      await video.play();
                      console.log('用户交互后播放成功');
                      // 移除事件监听器
                      document.removeEventListener('click', playOnInteraction);
                      document.removeEventListener('scroll', playOnInteraction);
                      document.removeEventListener('keydown', playOnInteraction);
                      document.removeEventListener('touchstart', playOnInteraction);
                    } catch (error) {
                      console.error('用户交互后播放失败:', error);
                    }
                  };

                  // 页面加载完成后尝试自动播放
                  if (document.readyState === 'complete') {
                    tryAutoPlay();
                  } else {
                    window.addEventListener('load', tryAutoPlay);
                  }
                }
              }}
              onLoadedData={(e) => {
                e.target.currentTime = 0;
                console.log('视频数据加载完成');
              }}
              onLoadedMetadata={(e) => {
                console.log('视频元数据加载完成');
              }}
              onError={(e) => {
                console.error('视频加载错误:', e);
              }}
              onCanPlay={(e) => {
                console.log('视频可以播放');
              }}
              onPlay={(e) => {
                console.log('视频开始播放');
              }}
              onEnded={(e) => {
                console.log('视频播放结束');
              }}
            >
              <source src="/video.mp4" type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
        </div>
        
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <div className="hero-tagline">🚀 机器人技术与太空探索</div>
            <h1 className="hero-title">探索未知<br/>成就未来</h1>
            <p className="hero-description">
              加入未来智视科创团队<br/>
              与志同道合的伙伴一起<br/>
              突破技术边界，创造无限可能
            </p>
            <div className="cta-buttons">
              <Link to="/apply" className="btn-primary">立即加入我们</Link>
              <div className="secondary-buttons">
                <Link to="/schedule" className="btn-secondary">培训日程</Link>
                <Link to="/materials" className="btn-secondary">学习资料</Link>
              </div>
            </div>
          </div>
          

        </div>
        

      </section>

      {/* 组织介绍 */}
      <section className="about-section">
        <h2>关于我们</h2>
        <p>未来智视科创团队汇聚机器人技术与智能视觉精英，以技术创新为驱动，培养面向未来的科技人才。</p>
        <div className="team-gallery">
          <img src="/photo/b1.jpg" alt="团队协作" className="team-photo"/>
            <img src="/photo/b2.jpg" alt="技术研讨" className="team-photo"/>
            <img src="/photo/b3.jpg" alt="项目实践" className="team-photo"/>
        </div>
        <div className="features">
          <div className="feature-card">
            <h3>技术创新</h3>
            <p>突破机器人技术边界，引领行业未来发展</p>
          </div>
          <div className="feature-card">
            <h3>团队协作</h3>
            <p>跨学科融合，激发无限创新潜能</p>
          </div>
          <div className="feature-card">
            <h3>实践育人</h3>
            <p>真实项目历练，塑造未来科技领袖</p>
          </div>
          <div className="feature-card">
            <h3>创业孵化</h3>
            <p>技术商业化，成就科技创新梦想</p>
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className="projects-section">
        <h2>核心项目</h2>
        <div className="project-grid">
          <div className="project-card">
            <img src="/photo/火星车.jpg" alt="智能火星探测车" className="project-image"/>
            <div className="project-card-content">
              <h3>智能火星探测系统</h3>
              <p>融合AI算法与精密机械，打造适应极端环境的智能探测平台，为未来太空探索奠定技术基础。</p>
            </div>
          </div>
          <div className="project-card">
            <img src="/photo/c1.jpg" alt="机器人竞赛现场" className="project-image"/>
            <div className="project-card-content">
              <h3>国际机器人竞技</h3>
              <p>在全球顶级赛事中屡创佳绩，展现中国大学生的技术实力与创新精神。</p>
            </div>
          </div>
          <div className="project-card">
            <img src="/photo/c2.jpg" alt="技术研究成果" className="project-image"/>
            <div className="project-card-content">
              <h3>前沿技术研究</h3>
              <p>深耕机器人视觉、SLAM算法、路径规划等核心技术领域，推动行业技术进步。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;