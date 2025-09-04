import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ value, suffix = '', duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const targetValue = parseInt(value);
    const increment = targetValue / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCurrentValue(targetValue);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {currentValue}{suffix}
    </span>
  );
};

export default AnimatedNumber;