// not in use
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

export const useWindowSize = (initialState, { ttl = 100 } = {}) => {
  // initialState is used before the component mounts client-side
  const [width, setWidth] = useState(initialState);

  useEffect(() => {
    const calculateWidth = debounce(() => {
      setWidth(String(window?.innerWidth));
    }, ttl);

    calculateWidth();
    window.addEventListener("resize", calculateWidth, { passive: true });

    return () => {
      // deregister event listener on component dismount
      window.removeEventListener("resize", calculateWidth);
    };
  }, [ttl]);

  return width;
};