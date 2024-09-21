import { ButtonProps } from '../../interfaces/button.interface';
import { motion } from 'framer-motion';

const Button: React.FC<ButtonProps> = ({
  text,
  className = '',
  fontSize = 'text-base',
  type,
  size = 'md',
  icon,
  disabled = false,
  iconPosition = 'left',
  extraArgs = [],
  onClick,
}) => {
  const sizeClasses = {
    xxl: 'py-3 px-6 text-lg',
    xl: 'py-2.5 px-5 text-md',
    md: 'py-2 px-4 text-sm',
    sm: 'py-1.5 px-3 text-xs',
  };

  const classes = [
    'bg-blue-500 text-white rounded',
    sizeClasses[size],
    fontSize,
    className,
    ...extraArgs,
  ].join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {text}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};

export default Button;
