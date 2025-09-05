import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';
import './ApplicationForm.css';

// 腾讯问卷配置
const TENCENT_WJ_CONFIG = {
  surveyId: '23632150',
  embedUrl: 'https://wj.qq.com/s2/23632150/3985/',
  width: '100%',
  height: '800px'
};

const ApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // 监听iframe加载完成
    const handleIframeLoad = () => {
      setIsLoading(false);
      setIframeLoaded(true);
    };

    // 模拟加载延迟
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 处理iframe加载完成
  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeLoaded(true);
  };
  

  

  


  return (
    <div className="application-form-container">
      <div className="form-header">
        <h2>火星车团队招新申请</h2>
        <p>加入我们，一起探索科技的无限可能！</p>
      </div>

      <div className="application-form-content">
        <div className="tencent-form-container">
          {isLoading ? (
            <div className="loading-container">
              <LoadingSpinner />
              <p>正在加载申请表单...</p>
            </div>
          ) : (
            <iframe
              src={TENCENT_WJ_CONFIG.embedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="auto"
              onLoad={handleIframeLoad}
            />
          )}
        </div>

        <div className="application-guide">
          <h3>申请指南</h3>
          <div className="guide-content">
            <h4>填写说明</h4>
            <p>请认真填写每一项内容，<strong>带*为必填项</strong>。我们将根据您的申请信息进行综合评估。</p>
            
            <h4>后续流程</h4>
            <ol>
              <li>提交申请后，我们会通过<strong>邮件</strong>通知面试安排</li>
              <li>面试包括<strong>技术能力</strong>和<strong>团队协作</strong>评估</li>
              <li>最终结果将在面试后3个工作日内通知</li>
            </ol>
            
            <h4>联系方式</h4>
            <p>如有疑问，请联系：</p>
            <ul>
              <li><strong>QQ群：942812409</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;