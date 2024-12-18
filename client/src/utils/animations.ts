// utils/animation.ts
export const fadeInUp = {
  initial: {
    opacity: 0.5,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};
