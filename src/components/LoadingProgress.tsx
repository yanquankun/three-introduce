import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  easing: 'ease',
  speed: 500
});

const LoadingProgress = () => {
  useEffect(() => {
    NProgress.start();
    
    const handleLoad = () => {
      NProgress.done();
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
};

export default LoadingProgress;