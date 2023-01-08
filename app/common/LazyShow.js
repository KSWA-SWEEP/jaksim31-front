'use client';

import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import { motion, useAnimation } from 'framer-motion';

function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
      let currentRef = null;
      const observer = new IntersectionObserver(([entry]) => {
          if (entry === null || entry === void 0 ? void 0 : entry.isIntersecting)
              setIntersecting(entry === null || entry === void 0 ? void 0 : entry.isIntersecting);
      }, {
          rootMargin,
      });
      if (ref && (ref === null || ref === void 0 ? void 0 : ref.current)) {
          currentRef = ref.current;
          observer.observe(currentRef);
      }
      return () => {
          observer.unobserve(currentRef);
      };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}

const LazyShow = ({ children, delay }) => {
  const controls = useAnimation();
  const rootRef = useRef(null);
  const onScreen = useOnScreen(rootRef);

  useEffect(() => {
    if (onScreen) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          delay: delay,
          duration: 0.5,
          ease: 'easeOut',
        },
      });
    }
  }, [onScreen, controls]);
  return (
    <motion.div
      className="lazy-div"
      ref={rootRef}
      initial={{ opacity: 0, x: -50 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default LazyShow;
