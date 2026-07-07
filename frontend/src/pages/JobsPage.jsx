import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import DeleteModal from '../components/DeleteModal';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: '', jobType: '', sortBy: 'newest' });
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/jobs', { params: filters });
      setJobs(res.data);
    } catch (error) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => fetchJobs(), 300);
    return () => clearTimeout(timeout);
  }, [filters.search, filters.status, filters.jobType, filters.sortBy]);

  const handleDelete = async () => {
    try {
      await api.delete(`/jobs/${selectedJob._id}`);
      toast.success('Job deleted successfully');
      setModalOpen(false);
      fetchJobs();
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 style={{ margin: 0 }}>Your Applications</h1>
          <p style={{ margin: '6px 0 0', color: '#89a4bf' }}>Manage and review every opportunity in one place.</p>
        </div>
        <Link to="/jobs/new" className="btn-primary" style={{ display: 'inline-block' }}>+ Add Job</Link>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="form-grid">
          <div>
            <label>Search</label>
            <input placeholder="Company or role" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          </div>
          <div>
            <label>Status</label>
            <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All</option>
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
            <select value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}>
              <option value="">All</option>
              <option>Full-Time</option>
              <option>Internship</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Onsite</option>
            </select>
          </div>
          <div>
            <label>Sort</label>
            <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="card">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="empty-state card">No applications match your filters. Add one to get started.</div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.companyName}</td>
                  <td>{job.jobRole}</td>
                  <td><span className="badge">{job.status}</span></td>
                  <td>{job.jobType}</td>
                  <td>{new Date(job.applicationDate).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/jobs/${job._id}`} className="btn-secondary">View</Link>
                      <Link to={`/jobs/${job._id}/edit`} className="btn-secondary">Edit</Link>
                      <button className="btn-danger" onClick={() => { setSelectedJob(job); setModalOpen(true); }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleDelete} itemName={selectedJob?.companyName || 'this application'} />
    </div>
  );
}

export default JobsPage;
