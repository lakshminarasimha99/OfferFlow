import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import JobForm from '../components/JobForm';

function AddJobPage() {
  const navigate = useNavigate();

  const handleCreate = async (form) => {
    try {
      await api.post('/jobs', form);
      toast.success('Job added successfully');
      navigate('/jobs');
    } catch (error) {
      toast.error('Failed to create job');
    }
  };

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 style={{ margin: 0 }}>Add New Application</h1>
          <p style={{ margin: '6px 0 0', color: '#89a4bf' }}>Capture the details of a new opportunity.</p>
        </div>
      </div>
      <JobForm onSubmit={handleCreate} submitLabel="Add Job" />
    </div>
  );
}

export default AddJobPage;
