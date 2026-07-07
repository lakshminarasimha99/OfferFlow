import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import JobForm from '../components/JobForm';

function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleUpdate = async (form) => {
    try {
      await api.put(`/jobs/${id}`, form);
      toast.success('Job updated successfully');
      navigate(`/jobs/${id}`);
    } catch (error) {
      toast.error('Failed to update job');
    }
  };

  if (loading) {
    return <div className="card">Loading job...</div>;
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 style={{ margin: 0 }}>Edit Application</h1>
          <p style={{ margin: '6px 0 0', color: '#89a4bf' }}>Adjust the details as your process evolves.</p>
        </div>
      </div>
      {job ? <JobForm initialData={job} onSubmit={handleUpdate} submitLabel="Update Job" /> : <div className="card">Job not found.</div>}
    </div>
  );
}

export default EditJobPage;
