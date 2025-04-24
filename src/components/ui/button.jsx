import React from 'react';

export const Button = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none';
  
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100',
  };
  
  const sizes = {
    md: 'px-4 py-2 text-base',
    sm: 'px-3 py-1 text-sm',
  };

  // Concatenate all the class names
  const buttonClass = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
