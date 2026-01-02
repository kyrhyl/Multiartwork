export default function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 border-0 cursor-pointer';
  
  const variants = {
    primary: 'bg-[#0066FF] text-white hover:bg-[#0052CC] hover:shadow-[0_8px_24px_rgba(0,102,255,0.3)] hover:-translate-y-0.5',
    secondary: 'bg-transparent text-white border-2 border-[#333] hover:border-[#0066FF] hover:bg-[rgba(0,102,255,0.1)]',
    outline: 'bg-transparent text-[#0066FF] border-2 border-[#0066FF] hover:bg-[rgba(0,102,255,0.1)]',
    ghost: 'bg-transparent text-white hover:bg-[#1A1A1A]',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-8 py-3.5 text-base rounded-lg',
    lg: 'px-10 py-4 text-lg rounded-lg',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
