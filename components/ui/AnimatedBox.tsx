import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type AnimatedBoxProps = HTMLMotionProps<'div'>;

export const AnimatedBox = React.forwardRef<HTMLDivElement, AnimatedBoxProps>(
  (props, ref) => {
    return <motion.div {...props} ref={ref} />;
  }
);

AnimatedBox.displayName = 'AnimatedBox';
