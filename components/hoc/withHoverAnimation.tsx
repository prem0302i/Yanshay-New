import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

export function withHoverAnimation<P extends object>(
  Component: React.ComponentType<P>
) {
  const MotionComponent = motion(Component);

  const Result = React.forwardRef<any, P & HTMLMotionProps<'div'>>((props, ref) => (
    <MotionComponent
      ref={ref}
      whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
      {...props}
    />
  ));

  Result.displayName = `withHoverAnimation(${Component.displayName || Component.name || 'Component'})`;

  return Result;
}
