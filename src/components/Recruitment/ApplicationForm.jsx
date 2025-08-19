import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ApplicationForm.css';

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
    .required('申请动机不能为空')
    .min(50, '申请动机至少需要50个字符')
    .max(1000, '申请动机不能超过1000个字符'),
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
  // 表单提交处理
  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      // 在实际项目中，这里会发送表单数据到服务器
      console.log('表单数据:', values);
      
      // 模拟提交成功
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({ success: true });
      resetForm();
      
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

  return (
    <div className="application-form-container">
      <h2>火星车组织招新申请表</h2>
      <p>欢迎加入火星车组织！请填写以下信息完成申请。</p>
      
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
                    <option value="junior">大三</option>
                    <option value="senior">大四</option>
                    <option value="postgraduate">研究生及以上</option>
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
                  <option value="algorithm">算法研究</option>
                  <option value="control">控制理论</option>
                  <option value="other">其他</option>
                </Field>
                <ErrorMessage name="interestArea" component="div" className="error-message" />
              </div>
              
              <div className="form-group">
                <label htmlFor="experience">个人经历</label>
                <Field as="textarea" id="experience" name="experience" placeholder="请简要描述您的相关经历（如竞赛、项目等）" rows="4" />
                <ErrorMessage name="experience" component="div" className="error-message" />
                <div className="char-count">{values.experience.length}/500</div>
              </div>
              
              <div className="form-group">
                <label htmlFor="motivation">申请动机</label>
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
                  ? '申请提交成功！我们会尽快与您联系。' 
                  : status.error || '提交失败，请稍后重试'}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApplicationForm;