import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_POSITIONS_KEY = 'scrollPositions';

function useScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollPositions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || '{}');
      const savedScrollY = scrollPositions[location.key];

      if (typeof savedScrollY === 'number') {
        window.scrollTo(0, savedScrollY);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [location.key]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPositions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || '{}');
      scrollPositions[location.key] = window.scrollY;
      sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(scrollPositions));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.key]);
}

export default useScrollRestoration;
