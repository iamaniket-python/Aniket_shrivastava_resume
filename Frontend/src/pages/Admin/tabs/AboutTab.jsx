import { useEffect, useState } from 'react';
import api from '../../../api/axios';

const emptyForm = { bio: '', resumeUrl: '', githubUrl: '', linkedinUrl: '', email: '' };

function AboutTab() {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about');
        if (res.data) {
          setForm({
            bio: res.data.bio || '',
            resumeUrl: res.data.resumeUrl || '',
            githubUrl: res.data.githubUrl || '',
            linkedinUrl: res.data.linkedinUrl || '',
            email: res.data.email || '',
          });
        }
      } catch (err) {
        setError('Failed to load about info');
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.put('/admin/about', form);
      setSuccess('Saved successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* <h3>About</h3> */}
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="admin-form" style={{ background: '#efe', color: '#2a2', padding: '0.6rem 1rem', maxWidth: 600 }}>{success}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div>
          <label>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} />
        </div>
        <div>
          <label>Resume URL</label>
          <input name="resumeUrl" value={form.resumeUrl} onChange={handleChange} />
        </div>
        <div>
          <label>GitHub URL</label>
          <input name="githubUrl" value={form.githubUrl} onChange={handleChange} />
        </div>
        <div>
          <label>LinkedIn URL</label>
          <input name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AboutTab;