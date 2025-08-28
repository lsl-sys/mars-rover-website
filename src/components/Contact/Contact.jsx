import React from 'react';
import './Contact.css';

const Contact = () => {
  const contacts = [
    {
      title: '网站负责人',
      email: 'm15397763602',
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
                </div>
              )}
              {contact.qq && (
                <div className="contact-info">
                  <span className="contact-label">QQ：</span>
                  <span className="contact-value">{contact.qq}</span>
                </div>
              )}
            </div>
          ))}
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