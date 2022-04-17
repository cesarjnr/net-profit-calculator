import { MouseEventHandler } from 'react';
import classNames from 'classnames';

export enum ButtonVariant {
  Contained = 'contained',
  Outlined = 'outlined'
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit'
}

interface Props {
  variant: ButtonVariant;
  type: ButtonType;
  text: string;
  fullWidth?: boolean;
  onClick?: MouseEventHandler;
}

export default function Button({ variant, type, text, fullWidth, onClick }: Props) {
  const classes = classNames(
    'px-5',
    'py-2',
    'rounded-md',
    'transition',
    'duration-300',
    {
      'bg-primary-800': variant === ButtonVariant.Contained,
      'text-secondary-400': variant === ButtonVariant.Contained,
      'shadow-lg': variant === ButtonVariant.Contained,
      'hover:bg-primary-900': variant === ButtonVariant.Contained,
      'border': variant === ButtonVariant.Outlined,
      'border-primary-100': variant === ButtonVariant.Outlined,
      'text-primary-800': variant === ButtonVariant.Outlined,
      'hover:border-primary-800': variant === ButtonVariant.Outlined,
      'hover:bg-primary-50': variant === ButtonVariant.Outlined,
      'w-full': !!fullWidth
    }
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
