import { useEffect, useState } from 'react';
import api from '../../../api/axios';

const emptyForm = { name: '', issuer: '', date: '', credentialUrl: '' };

function CertificatesTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await api.get('/certificates');
      setItems(res.data);
    } catch (err) {
      setError('Failed to load certificates');
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
        await api.put(`/admin/certificates/${editingId}`, form);
      } else {
        await api.post('/admin/certificates', form);
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
      name: item.name,
      issuer: item.issuer,
      date: item.date || '',
      credentialUrl: item.credentialUrl || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await api.delete(`/admin/certificates/${id}`);
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
      {/* <h3>Certificates</h3> */}
      {error && <div className="error-msg">{error}</div>}

      {!showForm && <button className="add-new-btn" onClick={() => setShowForm(true)}>+ Add Certificate</button>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Issuer</label>
            <input name="issuer" value={form.issuer} onChange={handleChange} required />
          </div>
          <div>
            <label>Date (e.g. March 2024)</label>
            <input name="date" value={form.date} onChange={handleChange} />
          </div>
          <div>
            <label>Credential URL</label>
            <input name="credentialUrl" value={form.credentialUrl} onChange={handleChange} />
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
              <strong>{item.name}</strong>
              <span>{item.issuer} · {item.date}</span>
            </div>
            <div className="admin-list-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No certificates yet.</p>}
      </div>
    </div>
  );
}

export default CertificatesTab;