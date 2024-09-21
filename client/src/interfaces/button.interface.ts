// src/interfaces/button.interface.ts
export type ButtonSize = 'xxl' | 'xl' | 'md' | 'sm';
export type IconPosition = 'left' | 'right';

export interface ButtonProps {
  text: string;
  className?: string;
  fontSize?: string;
  type: 'submit' | 'reset' | 'button';
  size?: ButtonSize;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  extraArgs?: string[];
  iconClassName?: string;
  iconSize?: number;
  onClick?: () => void;
}
