import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        toast.error('Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div className="card">Loading job details...</div>;
  if (!job) return <div className="card">Job not found.</div>;

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 style={{ margin: 0 }}>{job.companyName}</h1>
          <p style={{ margin: '6px 0 0', color: '#89a4bf' }}>{job.jobRole}</p>
        </div>
        <div className="actions">
          <Link to={`/jobs/${job._id}/edit`} className="btn-secondary">Edit</Link>
          <Link to="/jobs" className="btn-primary">Back to Jobs</Link>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Overview</h3>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Applied On:</strong> {new Date(job.applicationDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span className="badge">{job.status}</span></p>
          <p><strong>Job Type:</strong> {job.jobType}</p>
          <p><strong>Salary:</strong> {job.salary || 'Not provided'}</p>
          {job.jobUrl && <p><strong>Job URL:</strong> <a href={job.jobUrl} target="_blank" rel="noreferrer">Open link</a></p>}
        </div>
        <div className="card">
          <h3>Notes</h3>
          <p>{job.notes || 'No notes added.'}</p>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
