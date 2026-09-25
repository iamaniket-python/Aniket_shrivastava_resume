import '../css/Contact.css';

function Contact({ about }) {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <h2>Contact</h2>
        <p>Open to Full Stack Developer roles and interesting product work.</p>
        <div className="contact-links">
          {about?.email && <a href={`mailto:${about.email}`} className="btn btn-primary">Email me</a>}
          {about?.githubUrl && <a href={about.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>}
          {about?.linkedinUrl && <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>}
        </div>
      </div>
    </section>
  );
}

export default Contact;