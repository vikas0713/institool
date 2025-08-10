import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HurricaneTheme from './components/Theme/Hurricane';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TestDashboard from './pages/TestDashboard';
import MenuConfiguration from './pages/admin/MenuConfiguration';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HurricaneTheme />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<TestDashboard />} />
            <Route path="dashboard-full" element={<Dashboard />} />
            <Route path="students/*" element={<div className="p-6">Students Section (Coming Soon)</div>} />
            <Route path="faculty/*" element={<div className="p-6">Faculty Section (Coming Soon)</div>} />
            <Route path="academics/*" element={<div className="p-6">Academics Section (Coming Soon)</div>} />
            <Route path="finance/*" element={<div className="p-6">Finance Section (Coming Soon)</div>} />
            <Route path="library/*" element={<div className="p-6">Library Section (Coming Soon)</div>} />
            <Route path="transport/*" element={<div className="p-6">Transport Section (Coming Soon)</div>} />
            <Route path="hostel/*" element={<div className="p-6">Hostel Section (Coming Soon)</div>} />
            <Route path="infrastructure/*" element={<div className="p-6">Infrastructure Section (Coming Soon)</div>} />
            <Route path="data/*" element={<div className="p-6">Data Management Section (Coming Soon)</div>} />
            <Route path="admin/menu-configuration" element={<MenuConfiguration />} />
            <Route path="admin/*" element={<div className="p-6">Administration Section (Coming Soon)</div>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;