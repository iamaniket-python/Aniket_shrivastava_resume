import { useEffect, useState } from 'react';
import api from '../../../api/axios';

const emptyForm = { degree: '', institution: '', startDate: '', endDate: '', description: '' };

function EducationTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await api.get('/education');
      setItems(res.data);
    } catch (err) {
      setError('Failed to load education');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/admin/education/${editingId}`, form);
      } else {
        await api.post('/admin/education', form);
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
      degree: item.degree,
      institution: item.institution,
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      description: item.description || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await api.delete(`/admin/education/${id}`);
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
      {/* <h3>Education</h3> */}
      {error && <div className="error-msg">{error}</div>}

      {!showForm && <button className="add-new-btn" onClick={() => setShowForm(true)}>+ Add Education</button>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div>
            <label>Degree</label>
            <input name="degree" value={form.degree} onChange={handleChange} required />
          </div>
          <div>
            <label>Institution</label>
            <input name="institution" value={form.institution} onChange={handleChange} required />
          </div>
          <div>
            <label>Start Date (text, e.g. Aug 2020)</label>
            <input name="startDate" value={form.startDate} onChange={handleChange} />
          </div>
          <div>
            <label>End Date (text, e.g. Sep 2022)</label>
            <input name="endDate" value={form.endDate} onChange={handleChange} />
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
              <strong>{item.degree}</strong>
              <span>{item.institution} · {item.startDate} — {item.endDate}</span>
            </div>
            <div className="admin-list-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No education yet.</p>}
      </div>
    </div>
  );
}

export default EducationTab;