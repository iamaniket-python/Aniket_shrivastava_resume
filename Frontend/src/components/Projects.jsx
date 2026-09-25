import '../css/Projects.css';

const thumbColors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

function Projects({ projects }) {
  return (
    <section id="projects">
      <div className="wrap" style={{ maxWidth: '860px' }}>
        <h2>Projects</h2>
        <div className="proj-grid">
          {projects.map((proj, i) => (
            <div className="proj-card" key={proj.id}>
              <div className={`proj-thumb ${thumbColors[i % thumbColors.length]}`}>
                {proj.title.slice(0, 2).toUpperCase()}
              </div>
              <div className="proj-body">
                <div className="proj-title">
                  {proj.githubLink ? (
                    <a href={proj.githubLink} target="_blank" rel="noopener noreferrer">{proj.title}</a>
                  ) : proj.title}
                </div>
                <div className="proj-desc">{proj.description}</div>
                <div className="proj-tags">
                  {proj.techStack?.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
                <div className="proj-links">
                  {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer">Live ↗</a>}
                  {proj.githubLink && proj.liveLink && <span>·</span>}
                  {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer">Code ↗</a>}
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p>No projects added yet.</p>}
        </div>
      </div>
    </section>
  );
}

export default Projects;