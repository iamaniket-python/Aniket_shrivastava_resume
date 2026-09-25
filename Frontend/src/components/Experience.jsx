import Timeline from './Timeline';

function Experience({ experience }) {
  return (
    <Timeline
      title="Experience"
      id="experience"
      items={experience}
      renderItem={(exp) => (
        <div className="tl-item" key={exp.id}>
          <div className="tl-date">{exp.startDate} — {exp.endDate || 'Present'}</div>
          <div>
            <div className="tl-role">{exp.role}</div>
            <div className="tl-org">{exp.company}</div>
            <div className="tl-desc">{exp.description}</div>
          </div>
        </div>
      )}
    />
  );
}

export default Experience;