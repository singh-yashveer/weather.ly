export const debounce = (func: () => void, delay: number) => {
  const debounceTimeout = setTimeout(func, delay);
  return debounceTimeout;
};

// eslint-disable-next-line no-unused-vars
export const throttle = <F extends (...args: Parameters<F>) => void>(
  func: F,
  limit: number
) => {
  let inThrottle: boolean;
  return (...args: Parameters<F>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
