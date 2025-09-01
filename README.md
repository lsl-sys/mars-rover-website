# 火星车招新网站 🚀

一个现代化的火星车团队招新网站，采用React + Vite构建，提供完整的招新流程管理和数据统计功能。

## ✨ 项目特色

### 🎯 核心功能
- **在线招新申请**：集成腾讯问卷系统，支持在线填写申请
- **实时数据统计**：申请数据实时统计和可视化展示
- **培训资源中心**：完整的培训资料和课程安排
- **响应式设计**：完美支持桌面端和移动端

### 📊 数据管理
- **本地数据统计**：总申请数、今日申请、分布分析
- **腾讯问卷集成**：实时同步问卷数据
- **数据导出**：支持Excel格式的数据导出
- **权限控制**：管理员密码验证系统

### 🎨 用户体验
- **现代化UI**：渐变色彩、卡片式布局、流畅动画
- **移动端优化**：专为手机和平板设计的响应式界面
- **快速加载**：基于Vite的极速构建和优化

## 🛠️ 技术架构

### 核心技术栈
- **前端框架**：React 18.3.1
- **构建工具**：Vite 6.0.0
- **样式方案**：CSS3 + Flexbox + Grid
- **图标系统**：React Icons
- **部署方案**：静态部署优化

### 项目结构
```
火星车网站/
├── 📁 public/                    # 静态资源
│   ├── 🖼️ photo/                # 团队照片集
│   ├── 🎨 mars_rover.*          # 品牌视觉元素
│   └── 📄 各类SVG图标和Logo
├── 📁 src/                      # 源代码
│   ├── 🧩 components/           # 功能组件
│   │   ├── 🏠 Home.jsx         # 首页组件
│   │   ├── 📝 Recruitment/     # 招新系统
│   │   │   ├── ApplicationForm.jsx    # 申请表单
│   │   │   ├── ApplicationStats.jsx   # 数据统计
│   │   │   └── Recruitment.jsx        # 招新主页
│   │   ├── 📚 TrainingMaterials/     # 培训资料
│   │   ├── 📅 TrainingSchedule/      # 培训计划
│   │   └── 📞 Contact/                # 联系我们
│   ├── ⚙️ config/               # 配置文件
│   │   └── cloudConfig.js       # 云端服务配置
│   ├── 🪝 hooks/                # 自定义Hook
│   │   └── useScreenSize.js     # 响应式检测
│   └── 🔧 services/             # 服务层
│       └── tencentSurveyService.js # 腾讯问卷服务
├── 📄 PDF/                      # 培训资料PDF
└── 📋 项目文档/
    ├── 腾讯问卷部署指南.md
    └── 招新数据统计使用说明.md
```

## 🚀 快速开始

### 环境准备
```bash
# 克隆项目
git clone [项目地址]

# 进入项目目录
cd 火星车网站

# 安装依赖
npm install
```

### 开发启动
```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 生产部署
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## ⚙️ 配置指南

### 腾讯问卷配置
编辑 `src/config/cloudConfig.js`：

```javascript
export const TENCENT_SURVEY_CONFIG = {
  surveyId: '23632150',           // 你的问卷ID
  publicUrl: 'https://wj.qq.com/s2/23632150/3985/',  // 问卷链接
  adminUrl: 'https://wj.qq.com/stat/1/overview?sid=23632150'  // 统计链接
}
```

### 管理员设置
编辑 `src/components/Recruitment/ApplicationStats.jsx`：
```javascript
const ADMIN_PASSWORD = 'mars2025';  // 设置管理员密码
```

## 📱 响应式设计

### 断点系统
- **桌面端**：> 768px
- **移动端**：≤ 768px

### 适配特性
- **弹性布局**：Flexbox + CSS Grid
- **图片响应**：自适应图片尺寸
- **触摸优化**：移动端手势支持
- **字体适配**：动态字体大小

## 🎨 设计系统

### 色彩方案
- **主色调**：火星红 (#ff4757)
- **背景色**：深空黑 (#2f3542)
- **强调色**：科技蓝 (#3742fa)
- **中性色**：月灰 (#a4b0be)

### 视觉元素
- **渐变背景**：现代化渐变效果
- **卡片设计**：清晰的信息层级
- **图标系统**：统一的图标风格
- **动画过渡**：流畅的页面切换

## 📊 功能详解

### 招新申请流程
1. **访问申请页面**：用户通过网站进入申请系统
2. **填写腾讯问卷**：嵌入的腾讯问卷表单
3. **实时数据同步**：申请数据实时更新到统计系统
4. **管理员审核**：通过密码验证查看详细数据

### 数据统计功能
- **实时计数**：总申请数和今日申请数
- **分布分析**：
  - 按兴趣领域：机械设计、电路设计、编程开发、控制理论等
  - 按年级分布：2023级、2024级、2025级
- **时间趋势**：每日申请趋势分析
- **数据导出**：支持TSV格式导出到Excel

### 培训资源管理
- **资料分类**：电控、机械、编程等分类展示
- **PDF预览**：在线PDF文档预览
- **下载功能**：支持培训材料下载
- **更新机制**：动态内容更新

## 🔐 安全特性

### 数据保护
- **本地存储**：申请数据本地加密存储
- **权限验证**：管理员功能密码保护
- **输入验证**：表单数据有效性检查
- **访问控制**：分级权限管理系统

### 隐私保护
- **数据匿名**：敏感信息脱敏处理
- **访问日志**：操作记录追踪
- **安全传输**：HTTPS加密传输

## 🌐 部署方案

### 静态托管（推荐）
```bash
# 构建命令
npm run build

# 部署到Netlify
drag and drop dist/ folder

# 部署到Vercel
vercel --prod
```

### 支持平台
- ✅ Netlify
- ✅ Vercel
- ✅ GitHub Pages
- ✅ 阿里云OSS
- ✅ 腾讯云COS
- ✅ 本地服务器

## 📈 性能优化

### 构建优化
- **代码分割**：按需加载组件
- **图片优化**：自动压缩和格式转换
- **缓存策略**：浏览器缓存优化
- **CDN加速**：静态资源CDN分发

### 运行时优化
- **懒加载**：图片和组件懒加载
- **预加载**：关键资源预加载
- **压缩优化**：Gzip/Brotli压缩
- **缓存利用**：本地存储缓存

## 🐛 常见问题

### Q: 如何修改管理员密码？
A: 在 `src/components/Recruitment/ApplicationStats.jsx` 中修改 `ADMIN_PASSWORD` 常量。

### Q: 如何更换腾讯问卷？
A: 更新 `src/config/cloudConfig.js` 中的问卷ID和链接。

### Q: 移动端显示异常怎么办？
A: 检查浏览器兼容性，或使用响应式调试工具。

### Q: 如何添加新的培训资料？
A: 将PDF文件放入 `PDF/` 目录，更新对应组件的引用。

## 🤝 贡献指南

### 开发规范
- **代码风格**：ESLint + Prettier
- **提交规范**：Conventional Commits
- **文件命名**：小写+连字符命名法
- **组件设计**：函数组件 + Hooks

### 参与方式
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) 开源协议。

## 📞 联系我们

- **团队邮箱**：marsrover@example.com
- **微信公众号**：火星车团队
- **QQ群**：123456789
- **技术支持**：微信 MarsRoverTech

---

<div align="center">
  <p>⭐ 如果这个项目对你有帮助，请给个Star！</p>
  <p>🚀 <strong>火星车团队 - 探索无限可能</strong></p>
</div>
