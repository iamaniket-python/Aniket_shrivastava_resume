import { useEffect, useState } from 'react';
import api from '../../../api/axios';

const emptyForm = { company: '', role: '', startDate: '', endDate: '', description: '' };

function ExperienceTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await api.get('/experience');
      setItems(res.data);
    } catch (err) {
      setError('Failed to load experience');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = { ...form, endDate: form.endDate || null };
    try {
      if (editingId) {
        await api.put(`/admin/experience/${editingId}`, payload);
      } else {
        await api.post('/admin/experience', payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    }
  };

  const handleEdit = (item) => {
    setForm({
      company: item.company,
      role: item.role,
      startDate: item.startDate,
      endDate: item.endDate || '',
      description: item.description || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try {
      await api.delete(`/admin/experience/${id}`);
      fetchItems();
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
      {/* <h3>Experience</h3> */}
      {error && <div className="error-msg">{error}</div>}

      {!showForm && <button className="add-new-btn" onClick={() => setShowForm(true)}>+ Add Experience</button>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div>
            <label>Company</label>
            <input name="company" value={form.company} onChange={handleChange} required />
          </div>
          <div>
            <label>Role</label>
            <input name="role" value={form.role} onChange={handleChange} required />
          </div>
          <div>
            <label>Start Date</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
          </div>
          <div>
            <label>End Date (leave empty if current)</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
          </div>
          <div>
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">{editingId ? 'Update' : 'Save'}</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {items.map((item) => (
          <div className="admin-list-item" key={item.id}>
            <div className="admin-list-item-info">
              <strong>{item.role} @ {item.company}</strong>
              <span>{item.startDate} — {item.endDate || 'Present'}</span>
            </div>
            <div className="admin-list-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No experience yet.</p>}
      </div>
    </div>
  );
}

export default ExperienceTab;