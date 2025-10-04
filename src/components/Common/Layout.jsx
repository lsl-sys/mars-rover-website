import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import LoadingSpinner from './LoadingSpinner';
import './Layout.css';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);

  // 页面加载动画
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="large" text="正在加载..." />
      </div>
    );
  }

  return (
    <div className="layout-container">
      {/* 导航栏 */}
      <header className="navbar">
        <div className="logo">
          <img src="/photo/NEWLOGO.jpg" alt="未来智视科创团队 Logo" />
          <div className="logo-text">
            <h1>未来智视科创团队</h1>
          </div>
        </div>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>首页</NavLink>
          <NavLink to="/apply" className={({ isActive }) => isActive ? 'active' : ''}>招新申请</NavLink>
          <NavLink to="/schedule" className={({ isActive }) => isActive ? 'active' : ''}>培训日程</NavLink>
          <NavLink to="/materials" className={({ isActive }) => isActive ? 'active' : ''}>培训资料</NavLink>
          <NavLink to="/compiler" className={({ isActive }) => isActive ? 'active' : ''}>C语言编译器</NavLink>
          <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>📊 申请统计</NavLink>
        </nav>
      </header>

      {/* 主要内容区域 - 使用Outlet显示子路由内容 */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>© {new Date().getFullYear()} 未来智视科创团队. 保留所有权利.</p>
            <p>地址：重庆市南岸区崇文路2号重庆邮电大学</p>
          </div>
          <div className="social-links">
            <a href="mailto:m15397763602@163.com" className="social-link" title="发送邮件">📧</a>
            <a href="https://github.com" className="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">🐙</a>
            <a href="https://space.bilibili.com" className="social-link" title="B站" target="_blank" rel="noopener noreferrer">📺</a>
          </div>
        </div>
      </footer>
      
      {/* 回到顶部按钮 */}
      <ScrollToTop />
    </div>
  );
};

export default Layout;