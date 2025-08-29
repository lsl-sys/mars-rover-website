import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contacts = [
    {
      title: '网站负责人',
      email: 'm15397763602@163.com',
      type: 'email'
    },
    {
      title: '重邮-京东未来智能视觉联合研究实践基地总负责人',
      qq: '2177707887',
      type: 'qq'
    },
    {
      title: '机械设计负责人',
      qq: '2046349636',
      type: 'qq'
    },
    {
      title: '电路设计负责人',
      qq: '1211056910',
      type: 'qq'
    },
    {
      title: '电控负责人',
      qq: '3513992041',
      type: 'qq'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('sending');

    // 模拟发送邮件
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type === 'email' ? '邮箱' : 'QQ号'}已复制到剪贴板`);
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>联系我们</h1>
        <p>欢迎与重邮-京东未来智能视觉联合研究实践基地取得联系，我们将竭诚为您服务</p>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          {contacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <div className="contact-icon">
                {contact.type === 'email' ? '📧' : '💬'}
              </div>
              <h3>{contact.title}</h3>
              {contact.email && (
                <div className="contact-info">
                <span className="contact-label">邮箱：</span>
                <a href={`mailto:${contact.email}`} className="contact-link">
                  {contact.email}
                </a>
                <button 
                  className="copy-btn"
                  onClick={() => handleCopyToClipboard(contact.email, 'email')}
                  title="复制邮箱地址"
                >
                  📋
                </button>
              </div>
            )}
            {contact.qq && (
              <div className="contact-info">
                <span className="contact-label">QQ：</span>
                <span className="contact-value">{contact.qq}</span>
                <button 
                  className="copy-btn"
                  onClick={() => handleCopyToClipboard(contact.qq, 'qq')}
                  title="复制QQ号"
                >
                  📋
                </button>
              </div>
            )}
          </div>
        ))}
        </div>

        {/* 联系表单 */}
        <div className="contact-form-section">
          <h2>快速联系</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">姓名 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="请输入您的姓名"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">邮箱 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="请输入您的邮箱地址"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">主题 *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="请输入联系主题"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">消息内容 *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="请详细描述您的问题或需求"
              />
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? '发送中...' : '发送消息'}
            </button>
            
            {submitStatus && (
              <div className={`status-message ${submitStatus}`}>
                {submitStatus === 'success' && '✅ 消息发送成功！我们会尽快回复您'}
                {submitStatus === 'error' && '❌ 发送失败，请稍后重试'}
                {submitStatus === 'sending' && '📧 正在发送消息...'}
              </div>
            )}
          </form>
        </div>

        <div className="teacher-contact">
          <div className="teacher-card">
            <div className="teacher-icon">👨‍🏫</div>
            <h3>指导老师</h3>
            <p className="teacher-description">
              如需联系指导老师，请通过上述任一负责人进行联系，
              我们将为您安排与指导老师的沟通。
            </p>
          </div>
        </div>

        <div className="contact-footer">
          <p>工作时间：周一至周五 9:00-17:00</p>
          <p>我们会在收到消息后的24小时内回复您</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;