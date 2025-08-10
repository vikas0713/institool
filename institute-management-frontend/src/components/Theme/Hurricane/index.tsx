import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { logout } from '../../../features/auth/authSlice';
import Sidebar from './Sidebar';
import Header from './Header';
import './hurricane.css';

const HurricaneTheme: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [compactMenu, setCompactMenu] = useState(false);
  const [compactMenuOnHover, setCompactMenuOnHover] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [quickSearch, setQuickSearch] = useState(false);
  const [notificationsPanel, setNotificationsPanel] = useState(false);
  const [activitiesPanel, setActivitiesPanel] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleCompactMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setCompactMenu(!compactMenu);
  };

  const compactLayout = () => {
    if (window.innerWidth <= 1600) {
      setCompactMenu(true);
    }
  };

  useEffect(() => {
    compactLayout();
    window.onresize = () => {
      compactLayout();
    };
  }, []);

  return (
    <div className="hurricane min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        compactMenu={compactMenu}
        compactMenuOnHover={compactMenuOnHover}
        setCompactMenuOnHover={setCompactMenuOnHover}
        activeMobileMenu={activeMobileMenu}
        setActiveMobileMenu={setActiveMobileMenu}
        toggleCompactMenu={toggleCompactMenu}
        currentPath={location.pathname}
      />
      
      {/* Header */}
      <Header
        user={user}
        compactMenu={compactMenu}
        quickSearch={quickSearch}
        setQuickSearch={setQuickSearch}
        notificationsPanel={notificationsPanel}
        setNotificationsPanel={setNotificationsPanel}
        activitiesPanel={activitiesPanel}
        setActivitiesPanel={setActivitiesPanel}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div
        className={`transition-[margin,width] duration-100 px-5 xl:mr-2.5 mt-[75px] pt-[31px] pb-16 z-10 relative ${
          compactMenu ? 'xl:ml-[100px]' : 'xl:ml-[275px]'
        }`}
      >
        <div className="max-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HurricaneTheme;