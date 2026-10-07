export const ALL_IMAGE_URLS = [
  '/images/coffee.jpeg',
  '/images/icecream.jpeg',
  '/images/harrys.jpeg',
  '/images/abi.jpeg',
  '/images/abi1.jpeg',
  '/images/abi2.jpeg',
  '/images/abi3.jpeg',
  '/images/abi4.jpeg',
  '/images/abi5.jpeg',
  '/images/abi6.jpeg',
  '/images/abi7.jpeg',
  '/images/abi8.jpeg',
  '/images/abi9.jpeg',
  '/images/abi10.jpeg',
  '/images/abi11.jpeg',
  '/images/abi12.jpeg',
  '/images/abi13.jpeg',
  '/images/abi14.jpeg',
  '/images/abi15.jpeg'
];

/**
 * Preloads all application images into browser cache so they appear immediately.
 */
export const preloadAllImages = (): Promise<void[]> => {
  if (typeof window === 'undefined') return Promise.resolve([]);

  const promises = ALL_IMAGE_URLS.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = src;
      img.decoding = 'async';
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // don't block
      }
    });
  });

  return Promise.all(promises);
};
