import '../css/About.css';

function About({ about }) {
  return (
    <section id="about">
      <div className="wrap about">
        <h2>About</h2>
        <p>{about?.bio || 'Bio not added yet.'}</p>
      </div>
    </section>
  );
}

export default About;