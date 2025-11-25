import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({
  title,
  subtitle,
  children,
  className = '',
  headerAction,
  padding = 'md'
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className={`border-b border-gray-200 ${paddingClasses[padding]} flex justify-between items-center`}>
          <div>
            {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </div>
  );
};

export default Card;
