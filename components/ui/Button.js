export default function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 border-0 cursor-pointer';
  
  const variants = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)] hover:-translate-y-0.5',
    secondary: 'bg-transparent text-white border-2 border-[#333] hover:border-[#2563EB] hover:bg-[rgba(37,99,235,0.1)]',
    outline: 'bg-white text-[#2563EB] border-2 border-white hover:bg-[rgba(255,255,255,0.9)]',
    ghost: 'bg-transparent text-white hover:bg-[#1A1A1A]',
    light: 'bg-white text-[#2563EB] hover:bg-[#F3F4F6] hover:-translate-y-0.5',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-8 py-3.5 text-base rounded-lg',
    lg: 'px-10 py-4 text-lg rounded-lg',
    large: 'px-10 py-4 text-lg rounded-lg',
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
