import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MobileHome.css';

const AnimatedNumber = ({ targetValue, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [targetValue, duration, isVisible]);
  
  return <span ref={ref}>{currentValue}{targetValue.includes('+') ? '+' : ''}</span>;
};

const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const MobileHome = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '🚀',
      title: '技术创新',
      description: '突破机器人技术边界',
      color: '#10b981'
    },
    {
      icon: '👥',
      title: '团队协作',
      description: '跨学科融合创新',
      color: '#3b82f6'
    },
    {
      icon: '🎯',
      title: '实践育人',
      description: '真实项目历练',
      color: '#f59e0b'
    },
    {
      icon: '💡',
      title: '创业孵化',
      description: '技术商业化',
      color: '#8b5cf6'
    }
  ];

  const projects = [
    {
      icon: '🤖',
      title: '智能火星探测系统',
      description: '融合AI算法与精密机械，打造适应极端环境的智能探测平台，为未来太空探索奠定技术基础。',
      image: '/photo/火星车.jpg',
      color: '#10b981'
    },
    {
      icon: '🏆',
      title: '国际机器人竞技',
      description: '在全球顶级赛事中屡创佳绩，展现中国大学生的技术实力与创新精神。',
      image: '/photo/c1.jpg',
      color: '#f59e0b'
    },
    {
      icon: '🔬',
      title: '前沿技术研究',
      description: '深耕机器人视觉、SLAM算法、路径规划等核心技术领域，推动行业技术进步。',
      image: '/photo/c2.jpg',
      color: '#3b82f6'
    }
  ];

  return (
    <div className="mobile-home-container">
      {/* 固定背景渐变 */}
      <div className="mobile-bg-gradient" style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
      
      {/* 英雄区域 */}
      <section className="mobile-hero-section">
        <ScrollReveal>
          <div className="mobile-hero-badge">
            <span className="badge-icon">🚀</span>
            <span className="badge-text">机器人技术与太空探索</span>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <h1 className="mobile-hero-title">
            <span className="title-line">探索未知</span>
            <span className="title-line highlight">成就未来</span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={400}>
          <p className="mobile-hero-description">
            加入重邮-京东未来智能视觉联合研究实践基地，
            与志同道合的伙伴一起突破技术边界，创造无限可能
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={600}>
          <div className="mobile-hero-actions">
            <Link to="/apply" className="mobile-btn-primary">
              <span className="btn-text">立即加入我们</span>
              <span className="btn-arrow">→</span>
            </Link>
            <div className="mobile-btn-group">
              <Link to="/schedule" className="mobile-btn-secondary">
                <span>📅</span>
                培训日程
              </Link>
              <Link to="/materials" className="mobile-btn-secondary">
                <span>📚</span>
                学习资料
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 统计数据区域 */}
      <section className="mobile-stats-section">
        <ScrollReveal>
          <h2 className="section-title">团队成就</h2>
        </ScrollReveal>
        
        <div className="mobile-stats-grid">
          <ScrollReveal delay={100}>
            <div className="mobile-stat-card">
              <div className="stat-icon">💡</div>
              <div className="stat-number">
                <AnimatedNumber targetValue="1000+" />
              </div>
              <div className="stat-label">创新项目</div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="mobile-stat-card">
              <div className="stat-icon">🔬</div>
              <div className="stat-number">
                <AnimatedNumber targetValue="50+" />
              </div>
              <div className="stat-label">技术突破</div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <div className="mobile-stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">
                <AnimatedNumber targetValue="100+" />
              </div>
              <div className="stat-label">团队成员</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 关于我们区域 */}
      <section className="mobile-about-section">
        <ScrollReveal>
          <h2 className="section-title">关于我们</h2>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <p className="mobile-about-description">
            重邮-京东未来智能视觉联合研究实践基地汇聚机器人技术与智能视觉精英，
            以技术创新为驱动，培养面向未来的科技人才。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mobile-gallery">
            <img src="/photo/b1.jpg" alt="团队协作" className="mobile-gallery-item" />
            <img src="/photo/b2.jpg" alt="技术研讨" className="mobile-gallery-item" />
            <img src="/photo/b3.jpg" alt="项目实践" className="mobile-gallery-item" />
          </div>
        </ScrollReveal>

        <div className="mobile-features-grid">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <div className="mobile-feature-card" style={{ borderLeftColor: feature.color }}>
                <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 项目展示区域 */}
      <section className="mobile-projects-section">
        <ScrollReveal>
          <h2 className="section-title">核心项目</h2>
        </ScrollReveal>
        
        <div className="mobile-projects-grid">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 100}>
              <div className="mobile-project-card">
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <div className="project-icon" style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                      {project.icon}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 底部号召行动 */}
      <section className="mobile-footer-cta">
        <ScrollReveal>
          <div className="footer-cta-content">
            <h2 className="footer-title">准备开始你的技术之旅？</h2>
            <p className="footer-description">
              加入我们，与最优秀的技术团队一起成长，
              在机器人技术的星辰大海中探索无限可能。
            </p>
            <Link to="/apply" className="mobile-btn-primary large">
              <span className="btn-text">立即加入团队</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default MobileHome;