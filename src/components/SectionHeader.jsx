export function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header reveal">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
