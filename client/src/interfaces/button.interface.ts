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
  icon?: React.ReactNode; // El ícono puede ser cualquier nodo de React
  iconPosition?: IconPosition;
  extraArgs?: string[]; // Clases adicionales de Tailwind
  onClick?: () => void; // Callback para manejar el evento click
}
