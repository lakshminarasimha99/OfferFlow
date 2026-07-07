import { NavLink } from 'react-router-dom';
import { FaChartPie, FaBriefcase, FaPlusCircle } from 'react-icons/fa';

function Layout({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>OfferFlow</h2>
        <p style={{ margin: 0, color: '#7c8fb2' }}>Job Application Tracker</p>
        <nav>
          <NavLink to="/" end>
            <FaChartPie style={{ marginRight: 8 }} /> Dashboard
          </NavLink>
          <NavLink to="/jobs">
            <FaBriefcase style={{ marginRight: 8 }} /> Jobs
          </NavLink>
          <NavLink to="/jobs/new">
            <FaPlusCircle style={{ marginRight: 8 }} /> Add Job
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
