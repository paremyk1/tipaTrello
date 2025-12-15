import { cn } from '../../lib/utils';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({ className, color, ...props }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium text-white shadow-sm',
      className
    )}
    style={color ? { backgroundColor: color } : undefined}
    {...props}
  />
);
