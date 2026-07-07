import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const COLORS = ['#4f8cff', '#2dd4bf', '#f59e0b', '#f472b6', '#8b5cf6', '#fb7185'];

function DashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics');
        setAnalytics(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="card">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="card">Unable to load analytics.</div>;
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ margin: '6px 0 0', color: '#89a4bf' }}>Track your pipeline and monitor application progress.</p>
        </div>
        <Link to="/jobs/new" className="btn-primary" style={{ display: 'inline-block' }}>+ Add Job</Link>
      </div>

      <div className="grid grid-4">
        {[
          { title: 'Total Applications', value: analytics.summary.totalApplications },
          { title: 'Applied', value: analytics.summary.applied },
          { title: 'Interviews', value: analytics.summary.interview },
          { title: 'Offers', value: analytics.summary.offer }
        ].map((item) => (
          <div className="card summary-card" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <div className="value">{item.value}</div>
            </div>
            <div className="badge">Live</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginTop: 20 }}>
        <div className="card">
          <h3>Pipeline Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={analytics.statusData} dataKey="value" nameKey="name" outerRadius={90}>
                {analytics.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Job Type Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analytics.typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4f8cff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
