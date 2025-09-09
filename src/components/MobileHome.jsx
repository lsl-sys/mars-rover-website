import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MobileHome-new.css';

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
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // 检测当前活跃区域
      const sections = ['hero', 'stats', 'about', 'projects', 'cta'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top < window.innerHeight / 2 && bottom > window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      });
    };

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

  const quickActions = [
    { icon: '📅', title: '培训日程', path: '/schedule', color: '#3b82f6' },
    { icon: '📚', title: '学习资料', path: '/materials', color: '#10b981' },
    { icon: '📝', title: '加入我们', path: '/apply', color: '#f59e0b' },
    { icon: '💬', title: '联系我们', path: '/contact', color: '#8b5cf6' }
  ];

  return (
    <div className="mobile-home-container">
      {/* 固定背景渐变 */}
      <div className="mobile-bg-gradient" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
      
      {/* 导航指示器 */}
      <div className="mobile-nav-indicator">
        {['hero', 'stats', 'about', 'projects', 'cta'].map((section) => (
          <div 
            key={section} 
            className={`nav-dot ${activeSection === section ? 'active' : ''}`}
            onClick={() => {
              const element = document.getElementById(section);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        ))}
      </div>

      {/* 快速操作栏 */}
      <div className="mobile-quick-actions">
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <Link 
              key={action.title} 
              to={action.path} 
              className="quick-action-card"
              style={{ '--accent-color': action.color }}
            >
              <div className="quick-action-icon">{action.icon}</div>
              <div className="quick-action-title">{action.title}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* 英雄区域 - 重构版 */}
      <section id="hero" className="mobile-hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="particle" style={{
                animationDelay: `${i * 0.5}s`,
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`
              }} />
            ))}
          </div>
        </div>
        
        <div className="hero-content">
          <ScrollReveal>
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">机器人技术与太空探索</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <h1 className="hero-title">
              <span className="title-line">探索未知</span>
              <span className="title-line highlight">成就未来</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <p className="hero-description">
              加入重邮-京东未来智能视觉联合研究实践基地，
              与志同道合的伙伴一起突破技术边界，创造无限可能
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            <div className="hero-actions">
              <Link to="/apply" className="hero-btn-primary">
                <span className="btn-text">立即加入我们</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">向下滚动探索</span>
        </div>
      </section>

      {/* 统计数据区域 - 重构版 */}
      <section id="stats" className="mobile-stats-section">
        <div className="stats-background">
          <div className="stats-grid-pattern"></div>
        </div>
        
        <ScrollReveal>
          <h2 className="section-title">团队成就</h2>
          <p className="section-subtitle">用数据见证我们的成长与突破</p>
        </ScrollReveal>
        
        <div className="stats-grid">
          <ScrollReveal delay={100}>
            <div className="stat-card">
              <div className="stat-icon">💡</div>
              <div className="stat-number">
                <AnimatedNumber targetValue="1000+" />
              </div>
              <div className="stat-label">创新项目</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '95%' }}></div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="stat-card">
              <div className="stat-icon">🔬</div>
              <div className="stat-number">
                <AnimatedNumber targetValue="50+" />
              </div>
              <div className="stat-label">技术突破</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '78%' }}></div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">
                <AnimatedNumber targetValue="100+" />
              </div>
              <div className="stat-label">团队成员</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 关于我们区域 - 重构版 */}
      <section id="about" className="mobile-about-section">
        <ScrollReveal>
          <h2 className="section-title">关于我们</h2>
          <p className="section-subtitle">了解我们的使命与愿景</p>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <div className="about-content">
            <p className="about-description">
              重邮-京东未来智能视觉联合研究实践基地汇聚机器人技术与智能视觉精英，
              以技术创新为驱动，培养面向未来的科技人才。
            </p>
            
            <div className="about-gallery">
              <div className="gallery-grid">
                <img src="/photo/b1.jpg" alt="团队协作" className="gallery-item" />
                <img src="/photo/b2.jpg" alt="技术研讨" className="gallery-item" />
                <img src="/photo/b3.jpg" alt="项目实践" className="gallery-item" />
              </div>
            </div>

            <div className="features-list">
              {features.map((feature, index) => (
                <ScrollReveal key={feature.title} delay={index * 100}>
                  <div className="feature-item" style={{ '--accent-color': feature.color }}>
                    <div className="feature-icon-wrapper">
                      <span className="feature-icon">{feature.icon}</span>
                    </div>
                    <div className="feature-content">
                      <h3 className="feature-name">{feature.title}</h3>
                      <p className="feature-desc">{feature.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 项目展示区域 - 重构版 */}
      <section id="projects" className="mobile-projects-section">
        <ScrollReveal>
          <h2 className="section-title">核心项目</h2>
          <p className="section-subtitle">探索我们的创新成果</p>
        </ScrollReveal>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 150}>
              <div className="project-card" style={{ '--accent-color': project.color }}>
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <div className="project-badge">
                      <span className="project-icon">{project.icon}</span>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    <span className="project-tag">创新</span>
                    <span className="project-tag">技术</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 底部号召行动 - 重构版 */}
      <section id="cta" className="mobile-cta-section">
        <div className="cta-background">
          <div className="cta-gradient"></div>
        </div>
        
        <ScrollReveal>
          <div className="cta-content">
            <h2 className="cta-title">准备开始你的技术之旅？</h2>
            <p className="cta-description">
              加入我们，与最优秀的技术团队一起成长，
              在机器人技术的星辰大海中探索无限可能。
            </p>
            
            <div className="cta-actions">
              <Link to="/apply" className="cta-btn-primary">
                <span className="btn-text">立即加入团队</span>
                <span className="btn-arrow">→</span>
              </Link>
              
              <div className="cta-info">
                <div className="info-item">
                  <span className="info-icon">📧</span>
                  <span className="info-text">邮箱咨询</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📱</span>
                  <span className="info-text">微信联系</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default MobileHome;