export default function Section({ children, className = '', id = '' }) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  );
}
