import { useEffect, useState } from 'react';
import api from '../../../api/axios';

const emptyForm = { name: '', category: '', proficiency: 80 };

function SkillsTab() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/admin/skills/${editingId}`, form);
      } else {
        await api.post('/admin/skills', form);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchSkills();
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    }
  };

  const handleEdit = (skill) => {
    setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency });
    setEditingId(skill.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.delete(`/admin/skills/${id}`);
      fetchSkills();
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
    <div>
      {/* <h3>Skills</h3> */}
      {error && <div className="error-msg">{error}</div>}

      {!showForm && <button className="add-new-btn" onClick={() => setShowForm(true)}>+ Add Skill</button>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Category</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="Frontend / Backend / Tools" required />
          </div>
          <div>
            <label>Proficiency (1-100)</label>
            <input type="number" name="proficiency" value={form.proficiency} onChange={handleChange} min="1" max="100" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">{editingId ? 'Update' : 'Save'}</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {skills.map((skill) => (
          <div className="admin-list-item" key={skill.id}>
            <div className="admin-list-item-info">
              <strong>{skill.name}</strong>
              <span>{skill.category}</span>
            </div>
            <div className="admin-list-actions">
              <button className="btn-edit" onClick={() => handleEdit(skill)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(skill.id)}>Delete</button>
            </div>
          </div>
        ))}
        {skills.length === 0 && <p>No skills yet.</p>}
      </div>
    </div>
  );
}

export default SkillsTab;