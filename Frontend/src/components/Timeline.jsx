import '../css/Timeline.css';

function Timeline({ title, id, items, renderItem }) {
  return (
    <section id={id}>
      <div className="wrap">
        <h2>{title}</h2>
        <div className="timeline">
          {items.map((item) => renderItem(item))}
          {items.length === 0 && <p>No {title.toLowerCase()} added yet.</p>}
        </div>
      </div>
    </section>
  );
}

export default Timeline;