import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import JobDetailsPage from './pages/JobDetailsPage';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/new" element={<AddJobPage />} />
          <Route path="/jobs/:id/edit" element={<EditJobPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
        </Routes>
      </Layout>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
