import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Skills from '../../components/Skills';
import Projects from '../../components/Projects';
import Certificates from '../../components/Certificates';
import Contact from '../../components/Contact';

function Home() {
  const [data, setData] = useState({
    projects: [], skills: [], about: null, experience: [], education: [], certificates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [projects, skills, about, experience, education, certificates] = await Promise.all([
          api.get('/projects'), api.get('/skills'), api.get('/about'),
          api.get('/experience'), api.get('/education'), api.get('/certificates'),
        ]);
        setData({
          projects: projects.data, skills: skills.data, about: about.data,
          experience: experience.data, education: education.data, certificates: certificates.data,
        });
      } catch (err) {
        setError('Failed to load data. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div className="wrap" style={{ padding: '60px 0' }}>Loading...</div>;
  if (error) return <div className="wrap" style={{ padding: '60px 0' }}>{error}</div>;

  return (
    <>
      <Navbar />
      <Hero about={data.about} />
      <About about={data.about} />
      <Experience experience={data.experience} />
      <Education education={data.education} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Certificates certificates={data.certificates} />
      <Contact about={data.about} />
      <footer>© 2026 Aniket Shrivastava</footer>
    </>
  );
}

export default Home;