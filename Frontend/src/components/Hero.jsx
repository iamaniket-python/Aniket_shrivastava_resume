import '../css/Hero.css';

function Hero({ about }) {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="eyebrow">Available for opportunities</div>
        <h1>Full Stack Developer building scalable, high-performance web apps.</h1>
        <p className="sub">
          I'm <b>Aniket Shrivastava</b>, a Full Stack Developer with <b>3 years</b> of experience across{' '}
          <b>Python, Django, React and REST APIs</b>, with hands-on work in AWS cloud deployment, CI/CD pipelines, and Agile development.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          {about?.resumeUrl && <a href={about.resumeUrl} download className="btn btn-ghost">Download CV</a>}
        </div>
      </div>
    </header>
  );
}

export default Hero;