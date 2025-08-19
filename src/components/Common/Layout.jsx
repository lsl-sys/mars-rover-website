import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      {/* 导航栏 */}
      <header className="navbar">
        <div className="logo">
          <img src="/mars_rover_logo.svg" alt="火星车组织 Logo" />
          <h1>火星车</h1>
        </div>
        <nav className="nav-links">
          <Link to="/">首页</Link>
          <Link to="/apply">招新申请</Link>
          <Link to="/schedule">培训日程</Link>
          <Link to="/contact">联系我们</Link>
        </nav>
      </header>

      {/* 主要内容区域 - 使用Outlet显示子路由内容 */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} 火星车组织. 保留所有权利.</p>
        <div className="social-links">
          <a href="#">GitHub</a>
          <a href="#">微博</a>
          <a href="#">微信公众号</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;