import clsx from 'classnames';
import type { HTMLAttributes } from 'react';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('animate-pulse rounded-xl bg-gray-200', className)}
      {...props}
    />
  );
}

