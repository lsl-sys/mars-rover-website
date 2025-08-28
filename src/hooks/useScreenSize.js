import { useState, useEffect } from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: window.innerWidth > 1024
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        height: window.innerHeight,
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024
      });
    };

    // 初始化时设置一次
    handleResize();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 清理监听器
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export const useIsMobile = () => {
  const { isMobile } = useScreenSize();
  return isMobile;
};