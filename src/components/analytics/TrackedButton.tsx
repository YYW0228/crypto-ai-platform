import * as gtag from '../../lib/gtag';

interface TrackedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  buttonName: string;
  location: string;
  className?: string;
  [key: string]: any;
}

export default function TrackedButton({ 
  children, 
  onClick, 
  href, 
  buttonName, 
  location, 
  className = '',
  ...props 
}: TrackedButtonProps) {
  const handleClick = () => {
    gtag.event({
      action: 'cta_click',
      category: 'User Engagement',
      label: `${buttonName} - ${location}`,
      value: 1
    });
    if (onClick) onClick();
  };

  if (href) {
    return (
      <a 
        href={href} 
        onClick={handleClick} 
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
