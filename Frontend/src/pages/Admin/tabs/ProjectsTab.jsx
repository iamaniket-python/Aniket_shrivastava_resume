import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import '../../../css/ProjectsTab.css';
const emptyForm = { title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrl: '' };

function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, payload);
      } else {
        await api.post('/admin/projects', payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || '',
      description: project.description || '',
      techStack: (project.techStack || []).join(', '),
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      imageUrl: project.imageUrl || '',
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      fetchProjects();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
  
    <div className="projects-tab">
      {/* <h3>Projects</h3> */}
      {error && <div className="error-msg">{error}</div>}

      {!showForm && (
        <button className="add-new-btn" onClick={() => setShowForm(true)}>+ Add Project</button>
      )}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div>
            <label>Tech Stack (comma separated)</label>
            <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node, PostgreSQL" />
          </div>
          <div>
            <label>GitHub Link</label>
            <input name="githubLink" value={form.githubLink} onChange={handleChange} />
          </div>
          <div>
            <label>Live Link</label>
            <input name="liveLink" value={form.liveLink} onChange={handleChange} />
          </div>
          <div>
            <label>Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">{editingId ? 'Update' : 'Save'}</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {projects.map((project) => (
          <div className="admin-list-item" key={project.id}>
            <div className="admin-list-item-info">
              <strong>{project.title}</strong>
              <span>{project.techStack?.join(', ')}</span>
            </div>
            <div className="admin-list-actions">
              <button className="btn-edit" onClick={() => handleEdit(project)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p>No projects yet.</p>}
      </div>
    </div>
    
  );
}

export default ProjectsTab;