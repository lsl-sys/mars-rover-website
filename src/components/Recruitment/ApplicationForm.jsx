import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ApplicationForm.css';
import { useState } from 'react';

// 表单验证规则
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('姓名不能为空')
    .min(2, '姓名至少需要2个字符'),
  studentId: Yup.string()
    .required('学号不能为空')
    .matches(/^\d{8,10}$/, '学号应为8-10位数字'),
  major: Yup.string().required('专业不能为空'),
  grade: Yup.string().required('年级不能为空'),
  email: Yup.string()
    .required('邮箱不能为空')
    .email('请输入有效的邮箱地址'),
  phone: Yup.string()
    .required('手机号不能为空')
    .matches(/^1[3-9]\d{9}$/, '请输入有效的手机号'),
  interestArea: Yup.string().required('请选择感兴趣的领域'),
  experience: Yup.string().max(500, '个人经历不能超过500个字符'),
  motivation: Yup.string()
    .max(1000, '申请原因不能超过1000个字符'),
  fileUpload: Yup.mixed()
    .nullable()
    .test('fileSize', '文件大小不能超过5MB', (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', '只支持PDF、Word和图片文件', (value) => {
      if (!value) return true;
      const supportedFormats = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      return supportedFormats.includes(value.type);
    })
});

const ApplicationForm = () => {
  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // 状态管理
  const [downloadableData, setDownloadableData] = useState(null);
  
  // 密码保护下载相关状态
  const [downloadPassword, setDownloadPassword] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  
  // 表单提交处理
  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      // 在实际项目中，这里会发送表单数据到服务器
      console.log('表单数据:', values);
      
      // 保存提交的数据以便下载
      setDownloadableData(values);
      
      // 模拟提交成功
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({ success: true });
      
      // 5秒后清除成功状态
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    } catch (error) {
      setStatus({ success: false, error: '提交失败，请稍后重试' });
    } finally {
      setSubmitting(false);
    }
  };
  
  // 打开密码输入模态框
  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };
  
  // 关闭密码输入模态框
  const closePasswordModal = () => {
    setPasswordModalOpen(false);
    setDownloadPassword('');
  };
  
  // 简单的加密/解密函数（实际应用中应使用更安全的加密方法）
  const simpleEncrypt = (data, password) => {
    // 使用简单的异或加密（仅用于演示，实际项目应使用更安全的加密库）
    try {
      const text = JSON.stringify(data);
      let result = '';
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) ^ password.charCodeAt(i % password.length);
        result += String.fromCharCode(charCode);
      }
      return btoa(result); // Base64编码确保数据可以被正确保存
    } catch (error) {
      console.error('加密失败:', error);
      return JSON.stringify({ error: '加密失败' });
    }
  };
  
  // 带密码验证的下载函数
  const downloadFormDataWithPassword = () => {
    if (!downloadableData || !downloadPassword) return;
    
    // 设置密码验证逻辑
    // 注意：在实际项目中，这里应该与后端配合进行密码验证
    const validPasswords = ['mars2025', 'rover2025']; // 示例密码，实际应用中应使用更安全的方式
    
    if (!validPasswords.includes(downloadPassword)) {
      alert('密码错误，请重试！');
      return;
    }
    
    // 加密数据
    const encryptedData = simpleEncrypt(downloadableData, downloadPassword);
    
    // 创建文件名（包含日期和申请人姓名）
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `火星车组织申请_${downloadableData.name || '匿名'}_${timestamp}_encrypted.json`;
    
    // 创建Blob和下载链接
    const blob = new Blob([encryptedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // 触发下载并清理
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // 关闭模态框
    closePasswordModal();
  };
  
  // 复制申请内容到剪贴板
  const copyApplicationData = async () => {
    if (!downloadableData) return;
    
    try {
      // 将数据转换为格式化的JSON字符串
      const jsonData = JSON.stringify(downloadableData, null, 2);
      await navigator.clipboard.writeText(jsonData);
      
      // 显示复制成功提示
      const originalText = document.querySelector('.copy-button')?.innerText;
      if (originalText) {
        const copyButton = document.querySelector('.copy-button');
        copyButton.innerText = '复制成功！';
        setTimeout(() => {
          copyButton.innerText = originalText;
        }, 2000);
      }
    } catch (error) {
      console.error('复制失败:', error);
      alert('复制失败，请手动复制申请内容');
    }
  };
  
  // 简单的解密函数（用于演示）
  const simpleDecrypt = (encryptedText, password) => {
    try {
      const decryptedText = atob(encryptedText); // Base64解码
      let result = '';
      for (let i = 0; i < decryptedText.length; i++) {
        const charCode = decryptedText.charCodeAt(i) ^ password.charCodeAt(i % password.length);
        result += String.fromCharCode(charCode);
      }
      return JSON.parse(result);
    } catch (error) {
      console.error('解密失败:', error);
      return { error: '解密失败，请检查密码是否正确' };
    }
  };

  return (
    <div className="application-form-container">
      <div className="application-form-header">
        <h1>火星车组织招新申请</h1>
        <p>加入我们的团队，一起探索火星车技术的无限可能</p>
      </div>
      
      <div className="application-form-content">
        <div className="application-form-sidebar">
          <h2>申请指南</h2>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">申请流程</div>
            <div className="sidebar-info-text">
              1. 填写个人基本信息<br/>
              2. 选择感兴趣的领域<br/>
              3. 提交相关经历和申请原因（可选）<br/>
              4. 上传简历（可选）<br/>
              5. 等待审核结果
            </div>
          </div>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">申请截止时间</div>
            <div className="sidebar-info-text">
              招新申请常年开放，我们会定期审核申请并与合适的申请者联系
            </div>
          </div>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">注意事项</div>
            <div className="sidebar-info-text">
              • 请确保填写的信息真实有效<br/>
              • 如有任何问题，请联系我们的招新负责人
            </div>
          </div>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">联系方式</div>
            <div className="sidebar-info-text">
              邮箱：<br/>
                  电控：m15397763602.com<br/>
              QQ： <br/>
                  电控：3513992041
            </div>
          </div>
        </div>
        
        <div className="application-form-main">
          <h2>火星车组织招新申请表</h2>
          <p>欢迎加入火星车组织！请填写以下信息完成申请。我们期待与您一起探索火星车技术的奇妙世界！</p>
          
          <Formik
            initialValues={{
              name: '',
              studentId: '',
              major: '',
              grade: '',
              email: '',
              phone: '',
              interestArea: '',
              experience: '',
              motivation: '',
              fileUpload: null
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status, setFieldValue, values }) => (
              <div>
                <Form>
                  {/* 个人基本信息 */}
                  <div className="form-section">
                    <h3>个人基本信息</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <Field type="text" id="name" name="name" placeholder="请输入您的姓名" />
                        <ErrorMessage name="name" component="div" className="error-message" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="studentId">学号</label>
                        <Field type="text" id="studentId" name="studentId" placeholder="请输入您的学号" />
                        <ErrorMessage name="studentId" component="div" className="error-message" />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="major">专业</label>
                        <Field type="text" id="major" name="major" placeholder="请输入您的专业" />
                        <ErrorMessage name="major" component="div" className="error-message" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="grade">年级</label>
                        <Field as="select" id="grade" name="grade">
                          <option value="">请选择年级</option>
                          <option value="freshman">大一</option>
                          <option value="sophomore">大二</option>
                        </Field>
                        <ErrorMessage name="grade" component="div" className="error-message" />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">邮箱</label>
                        <Field type="email" id="email" name="email" placeholder="请输入您的邮箱" />
                        <ErrorMessage name="email" component="div" className="error-message" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">手机号码</label>
                        <Field type="tel" id="phone" name="phone" placeholder="请输入您的手机号码" />
                        <ErrorMessage name="phone" component="div" className="error-message" />
                      </div>
                    </div>
                  </div>
                  
                  {/* 兴趣与经历 */}
                  <div className="form-section">
                    <h3>兴趣与经历</h3>
                    <div className="form-group">
                      <label htmlFor="interestArea">感兴趣的领域</label>
                      <Field as="select" id="interestArea" name="interestArea">
                        <option value="">请选择感兴趣的领域</option>
                        <option value="mechanical">机械设计</option>
                        <option value="electrical">电子电路</option>
                        <option value="programming">编程开发</option>
                        <option value="algorithm">控制理论</option>
                        <option value="control">运营</option>
                        <option value="other">其他</option>
                      </Field>
                      <ErrorMessage name="interestArea" component="div" className="error-message" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="experience">个人经历 <span className="optional">（选填）</span></label>
                      <Field as="textarea" id="experience" name="experience" placeholder="请简要描述您的相关经历（如竞赛、项目等）" rows="4" />
                      <ErrorMessage name="experience" component="div" className="error-message" />
                      <div className="char-count">{values.experience.length}/500</div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="motivation">申请原因 <span className="optional">（选填）</span></label>
                      <Field as="textarea" id="motivation" name="motivation" placeholder="请详细说明您为什么想加入火星车组织，以及您希望从中获得什么" rows="6" />
                      <ErrorMessage name="motivation" component="div" className="error-message" />
                      <div className="char-count">{values.motivation.length}/1000</div>
                    </div>
                  </div>
                  
                  {/* 文件上传 */}
                  <div className="form-section">
                    <h3>附件上传</h3>
                    <div className="file-upload-container">
                      <input
                        type="file"
                        id="fileUpload"
                        name="fileUpload"
                        onChange={(event) => {
                          setFieldValue('fileUpload', event.currentTarget.files[0]);
                        }}
                        className="file-input"
                      />
                      <label htmlFor="fileUpload" className="file-upload-label">
                        <div className="upload-icon">📎</div>
                        <div className="upload-text">
                          {values.fileUpload ? values.fileUpload.name : '点击上传简历或作品集（最大5MB）'}
                        </div>
                      </label>
                      <ErrorMessage name="fileUpload" component="div" className="error-message" />
                    </div>
                    <p className="file-format-hint">支持格式：PDF、Word文档、JPG、PNG</p>
                  </div>
                  
                  {/* 提交按钮 */}
                  <div className="form-actions">
                    <button type="submit" disabled={isSubmitting} className="submit-button">
                      {isSubmitting ? '提交中...' : '提交申请'}
                    </button>
                  </div>
                  
                  {/* 提交状态反馈 */}
                  {status && (
                    <div className={`status-message ${status.success ? 'success' : 'error'}`}>
                      {status.success 
                        ? (
                          <>
                            <div>申请提交成功！</div>
                            <div>🎉 太棒了！您已迈出加入火星车组织的第一步 🚀</div>
                            <div>我们的团队将在3个工作日内审核您的申请</div>
                            <div>请保持手机和邮箱畅通，我们会尽快与您联系！</div>
                          </>
                        ) 
                        : status.error || '提交失败，请稍后重试'}
                    </div>
                  )}
                </Form>
                
                {/* 表单下载按钮 - 提交成功后显示 */}
                {downloadableData && (
                  <div className="download-section">
                    <p className="download-hint">您可以：</p>
                    <div className="download-actions">
                      <button 
                        className="download-button"
                        onClick={openPasswordModal}
                      >
                        下载加密内容（管理员选项）
                      </button>
                      <button 
                        className="copy-button"
                        onClick={copyApplicationData}
                      >
                        复制申请内容
                      </button>
                    </div>
                    <p className="email-hint">
                      提示：如果申请失败，您可以将复制的内容通过邮件发送到 <strong>m15397763602.com</strong>
                    </p>
                  </div>
                )}
                
                {/* 密码输入模态框 */}
                {passwordModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3>密码保护下载</h3>
                        <button 
                          className="modal-close" 
                          onClick={closePasswordModal}
                        >
                          ×
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>请输入密码以下载加密的申请内容：</p>
                        <input
                          type="password"
                          value={downloadPassword}
                          onChange={(e) => setDownloadPassword(e.target.value)}
                          placeholder="请输入密码"
                          className="password-input"
                          onKeyPress={(e) => e.key === 'Enter' && downloadFormDataWithPassword()}
                        />
                        <p className="password-hint">此文件已加密，请妥善保管密码</p>
                      </div>
                      <div className="modal-footer">
                        <button 
                          className="cancel-button" 
                          onClick={closePasswordModal}
                        >
                          取消
                        </button>
                        <button 
                          className="confirm-button" 
                          onClick={downloadFormDataWithPassword}
                          disabled={!downloadPassword}
                        >
                          确认下载
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;