import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { toggleSidebar } from '../features/ui/uiSlice';

const Layout: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-800 text-white`}>
        <div className="p-4">
          <h2 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Institute MS</h2>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="mt-4 p-2 hover:bg-gray-700 rounded"
          >
            ☰
          </button>
        </div>
        
        <nav className="mt-8">
          <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
            {sidebarOpen ? 'Dashboard' : '📊'}
          </Link>
          <Link to="/students" className="block px-4 py-2 hover:bg-gray-700">
            {sidebarOpen ? 'Students' : '👥'}
          </Link>
          <Link to="/teachers" className="block px-4 py-2 hover:bg-gray-700">
            {sidebarOpen ? 'Teachers' : '👨‍🏫'}
          </Link>
          <Link to="/courses" className="block px-4 py-2 hover:bg-gray-700">
            {sidebarOpen ? 'Courses' : '📚'}
          </Link>
          <Link to="/settings" className="block px-4 py-2 hover:bg-gray-700">
            {sidebarOpen ? 'Settings' : '⚙️'}
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {user?.instituteName || 'Institute Management System'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;