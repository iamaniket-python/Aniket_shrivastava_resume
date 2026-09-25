import '../css/Skills.css';

function Skills({ skills }) {
  return (
    <section id="skills">
      <div className="wrap">
        <h2>Skills</h2>
        <div className="skills">
          {skills.map((skill) => (
            <div className="skill" key={skill.id}>
              <span>{skill.name}</span>
            </div>
          ))}
          {skills.length === 0 && <p>No skills added yet.</p>}
        </div>
      </div>
    </section>
  );
}

export default Skills;