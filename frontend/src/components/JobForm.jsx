import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  companyName: '',
  jobRole: '',
  location: '',
  applicationDate: '',
  status: 'Applied',
  jobType: 'Full-Time',
  salary: '',
  jobUrl: '',
  notes: ''
};

function JobForm({ initialData = null, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        applicationDate: initialData.applicationDate ? initialData.applicationDate.slice(0, 10) : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div>
          <label>Company Name</label>
          <input name="companyName" value={form.companyName} onChange={handleChange} required />
        </div>
        <div>
          <label>Job Role</label>
          <input name="jobRole" value={form.jobRole} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Application Date</label>
          <input type="date" name="applicationDate" value={form.applicationDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Online Assessment</option>
            <option>Interview</option>
            <option>HR Round</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label>Job Type</label>
          <select name="jobType" value={form.jobType} onChange={handleChange}>
            <option>Full-Time</option>
            <option>Internship</option>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </select>
        </div>
        <div>
          <label>Salary</label>
          <input name="salary" value={form.salary} onChange={handleChange} placeholder="Optional" />
        </div>
        <div>
          <label>Job URL</label>
          <input name="jobUrl" value={form.jobUrl} onChange={handleChange} placeholder="https://..." />
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} />
      </div>
      <div className="actions" style={{ marginTop: 20 }}>
        <button className="btn-primary" type="submit">{submitLabel}</button>
        <button className="btn-secondary" type="button" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </form>
  );
}

export default JobForm;
