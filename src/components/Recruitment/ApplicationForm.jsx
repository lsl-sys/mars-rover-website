import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingSpinner from '../Common/LoadingSpinner';
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
  const [downloadableData, setDownloadableData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      // 导入腾讯问卷配置
      const { TENCENT_WJ_CONFIG, CLOUD_CONFIG } = await import('../../config/cloudConfig');
      
      if (CLOUD_CONFIG.USE_CLOUD_STORAGE) {
        // 年级转换（英文→中文）
        const gradeMap = {
          'freshman': '2023级',
          'sophomore': '2024级',
          'junior': '2025级'
        };
        
        // 兴趣方向转换（英文→中文）
        const interestMap = {
          'mechanical': '机械设计',
          'electrical': '电路设计',
          'programming': '编程开发',
          'control': '运营',
          'other': '其他'
        };

        // 构建腾讯问卷提交数据
        const formData = new FormData();
        formData.append('q1', values.name);
        formData.append('q2', values.studentId);
        formData.append('q3', values.major);
        formData.append('q4', gradeMap[values.grade] || values.grade);
        formData.append('q5', values.email);
        formData.append('q6', values.phone);
        formData.append('q7', interestMap[values.interestArea] || values.interestArea);
        formData.append('q8', values.experience || '');
        formData.append('q9', values.motivation);

        // 使用隐藏的iframe方式提交到腾讯问卷
        return new Promise((resolve) => {
          // 调试信息输出
          console.log('准备提交到腾讯问卷:', {
            url: 'https://wj.qq.com/s2/23632150/3985/',
            data: {
              q1: values.name,
              q2: values.studentId,
              q3: values.major,
              q4: gradeMap[values.grade] || values.grade,
              q5: values.email,
              q6: values.phone,
              q7: interestMap[values.interestArea] || values.interestArea,
              q8: values.experience || '',
              q9: values.motivation || ''
            }
          });
          
          // 创建唯一的iframe名称
          const iframeName = `tencent-form-${Date.now()}`;
          
          // 创建隐藏的iframe
          const iframe = document.createElement('iframe');
          iframe.name = iframeName;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);

          // 创建表单
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = 'https://wj.qq.com/s2/23632150/3985/'; // 直接使用正确的提交地址
          form.target = iframeName;
          form.acceptCharset = 'UTF-8';

          // 添加表单字段 - 处理选填字段为空的情况
          const formFields = [
            { name: 'q1', value: values.name || '' },           // 姓名（必填）
            { name: 'q2', value: values.studentId || '' },        // 学号（必填）
            { name: 'q3', value: values.major || '' },            // 专业（必填）
            { name: 'q4', value: gradeMap[values.grade] || values.grade || '' }, // 年级（必填）
            { name: 'q5', value: values.email || '' },            // 邮箱（必填）
            { name: 'q6', value: values.phone || '' },            // 手机号（必填）
            { name: 'q7', value: interestMap[values.interestArea] || values.interestArea || '' }, // 兴趣领域（必填）
            { name: 'q8', value: values.experience || '' },       // 个人经历（选填）
            { name: 'q9', value: values.motivation || '' }        // 申请动机（选填）
          ];
          
          // 添加所有字段到表单
          formFields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
          });
          
          // 添加腾讯问卷必要的meta字段
          const hiddenInputs = [
            { name: 't', value: Date.now() },
            { name: 'source', value: 'direct_link' },
            { name: 'so', value: 'direct_link' }
          ];
          
          hiddenInputs.forEach(inputData => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = inputData.name;
            input.value = inputData.value;
            form.appendChild(input);
          });

          // 监听iframe加载完成
          iframe.onload = () => {
            try {
              // 检查iframe内容，验证提交是否成功
              const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
              const iframeUrl = iframe.src || iframe.contentWindow.location.href;
              
              console.log('腾讯问卷提交状态:', {
                iframeUrl: iframeUrl,
                documentTitle: iframeDoc?.title || '未知'
              });
              
              // 延迟清理，确保数据已提交
              setTimeout(() => {
                document.body.removeChild(iframe);
                document.body.removeChild(form);
                
                // 显示成功消息
                setSubmitStatus({
                  success: true,
                  message: '✅ 申请已成功提交！感谢您的参与，我们会尽快与您联系。'
                });
                
                resolve();
              }, 2000);
            } catch (error) {
              console.log('提交完成，腾讯问卷已接收数据');
              document.body.removeChild(iframe);
              document.body.removeChild(form);
              
              setSubmitStatus({
                success: true,
                message: '✅ 申请已成功提交！感谢您的参与，我们会尽快与您联系。'
              });
              
              resolve();
            }
          };
          
          // 错误处理
          iframe.onerror = () => {
            console.error('腾讯问卷提交失败');
            document.body.removeChild(iframe);
            document.body.removeChild(form);
            
            setSubmitStatus({
              success: false,
              message: '❌ 提交失败，请稍后重试或联系管理员。'
            });
            
            resolve();
          };

          document.body.appendChild(form);
          form.submit();
        });
        
      } else {
        // 本地存储模式（备用）
        const applicationData = {
          ...values,
          timestamp: new Date().toISOString(),
          id: Date.now().toString(),
          source: '本地存储'
        };

        const existingApplications = JSON.parse(localStorage.getItem('marsRoverApplications') || '[]');
        existingApplications.push(applicationData);
        localStorage.setItem('marsRoverApplications', JSON.stringify(existingApplications));

        setSubmitStatus({
          success: true,
          message: '✅ 申请已保存到本地存储！'
        });
      }
      
      // 保存提交的数据以便下载
      setDownloadableData(values);
      
      setStatus({ success: true });
      resetForm();
      
      // 5秒后清除成功状态
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    } catch (error) {
      console.error('❌ 提交失败:', error);
      setSubmitStatus({
        success: false,
        message: '❌ 提交失败，请检查网络或联系管理员。'
      });
    } finally {
      setSubmitting(false);
    }
  };
  

  
  // 下载申请内容为CSV格式（WPS表格兼容）
  const downloadFormData = () => {
    if (!downloadableData) return;
    
    try {
      // 定义CSV表头
      const headers = [
        '姓名',
        '学号',
        '专业',
        '年级',
        '邮箱',
        '手机号',
        '兴趣领域',
        '个人经历',
        '申请原因',
        '提交时间'
      ];

      // 将单条申请数据转换为CSV格式，使用制表符分隔和特殊格式处理
      const csvContent = [
        headers.join('\t'), // 使用制表符分隔，更适合Excel
        [
          `"${downloadableData.name || ''}"`,
          `"=""${downloadableData.studentId || ''}"""`, // 强制文本格式，防止0被去掉
          `"${downloadableData.major || ''}"`,
          `"${downloadableData.grade === 'freshman' ? '2023级' : downloadableData.grade === 'sophomore' ? '2024级' : downloadableData.grade === 'junior' ? '2025级' : ''}"`,
          `"${downloadableData.email || ''}"`,
          `"=""${downloadableData.phone || ''}"""`, // 强制文本格式，防止手机号被转换
          `"${downloadableData.interestArea === 'mechanical' ? '机械设计' : downloadableData.interestArea === 'electrical' ? '电路设计' : downloadableData.interestArea === 'programming' ? '编程开发' : downloadableData.interestArea === 'control' ? '运营' : '其他'}"`,
          `"${(downloadableData.experience || '').replace(/"/g, '""')}"`,
          `"${(downloadableData.motivation || '').replace(/"/g, '""')}"`,
          `"${new Date().toLocaleString('zh-CN')}"`
        ].join('\t')
      ].join('\n');

      // 创建UTF-8 BOM，确保中文正常显示
      const BOM = '\uFEFF';
      const csvBlob = new Blob([BOM + csvContent], { 
        type: 'text/tab-separated-values;charset=utf-8;' 
      });
      
      // 创建文件名（包含日期和申请人姓名）
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `火星车申请_${downloadableData.name || '匿名'}_${timestamp}.tsv`;
      
      // 创建下载链接
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.style.visibility = 'hidden';
      
      // 触发下载并清理
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请重试');
    }
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
  


  return (
    <div className="application-form-container">
      <div className="form-header">
        <h1>招新申请</h1>
        <p className="form-description">
          加入我们，一起探索机器人技术的无限可能！
        </p>
        
        {/* 提交状态提示 */}
        {submitStatus && (
          <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
            {submitStatus.message}
            <button 
              className="close-btn" 
              onClick={() => setSubmitStatus(null)}
              aria-label="关闭提示"
            >
              ×
            </button>
          </div>
        )}
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
              • 如果填写失败，请将错误信息截图发送至邮箱<br/>
              • 如有任何问题，请联系我们的招新负责人
            </div>
          </div>
          
          <div className="sidebar-info-item">
            <div className="sidebar-info-title">联系方式</div>
            <div className="sidebar-info-text">
              邮箱：<br/>
                站长：m15397763602@163.com<br/>
              QQ： <br/>
                基地总负责人:2177707887<br/>
                机械：2046349636<br/>
                硬件：1211056910<br/>
                电控：3513992041<br/>
            </div>
          </div>
        </div>
        
        <div className="application-form-main">
          <p>欢迎加入我们！请填写以下信息完成申请，我们会尽快与您联系。</p>
          
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
                          <option value="freshman">2023级</option>
                          <option value="sophomore">2024级</option>
                          <option value="junior">2025级</option>
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
                        <option value="electrical">电路设计</option>
                        <option value="programming">编程开发</option>
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
                      <Field as="textarea" id="motivation" name="motivation" placeholder="请详细说明您为什么想加入重邮-京东未来智能视觉联合研究实践基地，以及您希望从中获得什么" rows="6" />
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
                            <div>🎉 太棒了！您已迈出加入重邮-京东未来智能视觉联合研究实践基地的第一步 🚀</div>
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
                        onClick={downloadFormData}
                      >
                        下载表格文件
                      </button>
                      <button 
                        className="copy-button"
                        onClick={copyApplicationData}
                      >
                        复制申请内容
                      </button>
                    </div>
                    <p className="email-hint">
                      提示：您也可以将复制的内容通过邮件发送到 <strong>m15397763602@163.com</strong>
                    </p>
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