import Timeline from './Timeline';

function Education({ education }) {
  return (
    <Timeline
      title="Education"
      id="education"
      items={education}
      renderItem={(edu) => (
        <div className="tl-item" key={edu.id}>
          <div className="tl-date">{edu.startDate} — {edu.endDate}</div>
          <div>
            <div className="tl-role">{edu.degree}</div>
            <div className="tl-org">{edu.institution}</div>
            <div className="tl-desc">{edu.description}</div>
          </div>
        </div>
      )}
    />
  );
}

export default Education;