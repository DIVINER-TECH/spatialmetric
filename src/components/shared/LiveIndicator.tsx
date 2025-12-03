import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  className?: string;
  label?: string;
}

export const LiveIndicator = ({ className, label = 'Live' }: LiveIndicatorProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
      </span>
      <span className="text-xs font-medium text-accent">{label}</span>
    </div>
  );
};
