import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      {/* 导航栏 */}
      <header className="navbar">
        <div className="logo">
          <img src="/team_logo.jpg" alt="重邮-京东未来智能视觉联合研究实践基地 Logo" />
          <div className="logo-text">
            <h1>重邮-京东未来智能视觉联合研究实践基地</h1>
          </div>
        </div>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>首页</NavLink>
          <NavLink to="/apply" className={({ isActive }) => isActive ? 'active' : ''}>招新申请</NavLink>
          <NavLink to="/schedule" className={({ isActive }) => isActive ? 'active' : ''}>培训日程</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>联系我们</NavLink>
          <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>申请统计</NavLink>
        </nav>
      </header>

      {/* 主要内容区域 - 使用Outlet显示子路由内容 */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} 重邮-京东未来智能视觉联合研究实践基地. 保留所有权利.</p>
        <div className="social-links">
          <span>邮箱</span>
          <span>QQ</span>
          <span>GitHub</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;